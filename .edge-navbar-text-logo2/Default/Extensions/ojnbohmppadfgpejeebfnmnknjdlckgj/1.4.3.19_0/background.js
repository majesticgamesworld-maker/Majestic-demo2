'use strict';

import { registerChatGPTComContentScript } from './utils.js';
import { VERSION } from './version.js';
import { OAuth2Config, replaceEnvironmentURLs } from './config.js';
import { ReactionNo } from './rxn.js';

/**
 * Maps Chrome identity API error strings to OAuth2 RXN codes.
 * Keys are the exact strings from chrome.runtime.lastError.message.
 * @see https://chromium.googlesource.com/chromium/src.git/+/main/chrome/browser/extensions/api/identity/identity_constants.cc
 */
const ChromeErrorToRXN = {
  'The user did not approve access.':
    ReactionNo.RXN_AIPRM_OAUTH2_USER_CANCELLED,
  'Authorization page could not be loaded.':
    ReactionNo.RXN_AIPRM_OAUTH2_PAGE_LOAD_FAILED,
  'Authorization page load timed out.':
    ReactionNo.RXN_AIPRM_OAUTH2_PAGE_LOAD_TIMEOUT,
  'User interaction required.':
    ReactionNo.RXN_AIPRM_OAUTH2_INTERACTION_REQUIRED,
  "Couldn't create a window.": ReactionNo.RXN_AIPRM_OAUTH2_CANNOT_CREATE_WINDOW,
  'Identity API is disabled in incognito windows.':
    ReactionNo.RXN_AIPRM_OAUTH2_INCOGNITO,
  'Did not redirect to the right URL.':
    ReactionNo.RXN_AIPRM_OAUTH2_INVALID_REDIRECT,
};

/**
 * Resolve an error message to an OAuth2 RXN code.
 * Tries exact match first, then partial match for Chrome errors
 * that may append additional details.
 *
 * @param {string} errorMessage
 * @returns {number} RXN code
 */
function getOAuth2ErrorRXN(errorMessage) {
  if (!errorMessage) {
    return ReactionNo.RXN_AIPRM_OAUTH2_UNKNOWN_ERROR;
  }

  if (ChromeErrorToRXN[errorMessage]) {
    return ChromeErrorToRXN[errorMessage];
  }

  for (const [key, rxn] of Object.entries(ChromeErrorToRXN)) {
    if (errorMessage.includes(key)) {
      return rxn;
    }
  }

  return ReactionNo.RXN_AIPRM_OAUTH2_UNKNOWN_ERROR;
}

// OAuth2 PKCE state (in-memory, persisted to session storage for service worker restarts)
let oauth2State = {
  codeVerifier: null,
  state: null,
};

/**
 * Generate a cryptographically random string for PKCE code verifier
 * @param {number} length - Length of the string (43-128 characters recommended)
 * @returns {string} Random string
 */
function generateRandomString(length = 64) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  // Convert to URL-safe base64
  return toBase64URL(btoa(String.fromCharCode.apply(null, array))).substring(
    0,
    length
  );
}

/** Convert standard base64 to base64url (RFC 4648 §5). */
function toBase64URL(base64) {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Generate SHA-256 hash for PKCE code challenge
 * @param {string} verifier - The code verifier
 * @returns {Promise<string>} Base64URL-encoded SHA-256 hash
 */
async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  // Convert to base64url
  return toBase64URL(
    btoa(String.fromCharCode.apply(null, new Uint8Array(hash)))
  );
}

/**
 * Initiate OAuth2 login flow with PKCE
 * Uses chrome.identity.launchWebAuthFlow to authenticate via AIPRM APP,
 * then exchanges the code for AIPRM access/refresh tokens.
 * @param {{lang?: string}} loginParams
 * @returns {Promise<{success: boolean, tokens?: {AccessToken: string, RefreshToken: string, UserERID: string, Email: string}, rxn?: number}>}
 */
async function initiateOAuth2(loginParams = {}) {
  if (!OAuth2Config) {
    return { success: false, rxn: ReactionNo.RXN_AIPRM_OAUTH2_NOT_CONFIGURED };
  }

  // Recover PKCE state from session storage after service worker restart
  if (!oauth2State.codeVerifier) {
    const stored = await chrome.storage.session.get('oauth2State');
    if (stored.oauth2State) {
      oauth2State = stored.oauth2State;
    }
  }

  // Clear stale PKCE state from a previous flow (e.g. after timeout or retry)
  if (oauth2State.codeVerifier) {
    console.warn('[AIPRM OAuth2] clearing stale PKCE state from previous flow');
    oauth2State = { codeVerifier: null, state: null };
    await chrome.storage.session.remove('oauth2State');
  }

  try {
    // Generate PKCE parameters
    oauth2State.codeVerifier = generateRandomString(64);
    oauth2State.state = generateRandomString(32);

    // Persist PKCE state to survive service worker restarts
    await chrome.storage.session.set({ oauth2State });

    const codeChallenge = await generateCodeChallenge(oauth2State.codeVerifier);

    const redirectURL = chrome.identity.getRedirectURL('callback');

    // Build the connect URL
    const connectParams = new URLSearchParams({
      state: oauth2State.state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      redirect_uri: redirectURL,
    });

    if (loginParams.lang) {
      connectParams.set('lang', loginParams.lang);
    }

    const connectURL = `${OAuth2Config.ConnectURL}?${connectParams.toString()}`;

    console.log('[AIPRM OAuth2] starting flow, connect URL:', connectURL);
    console.log('[AIPRM OAuth2] redirect URL:', redirectURL);

    // Launch the OAuth2 flow
    const responseURL = await new Promise((resolve, reject) => {
      chrome.identity.launchWebAuthFlow(
        {
          url: connectURL,
          interactive: true,
        },
        (responseUrl) => {
          if (chrome.runtime.lastError) {
            console.error(
              '[AIPRM OAuth2] launchWebAuthFlow failed:',
              chrome.runtime.lastError.message
            );
            reject(new Error(chrome.runtime.lastError.message));
          } else if (!responseUrl) {
            reject(new Error('No response URL received'));
          } else {
            resolve(responseUrl);
          }
        }
      );
    });

    // Parse the response URL
    const url = new URL(responseURL);
    const code = url.searchParams.get('code');
    const returnedState = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    const rxn = url.searchParams.get('rxn');

    if (rxn) {
      console.log('[AIPRM OAuth2] rxn:', rxn);

      const rxnNumber = parseInt(rxn, 10);

      if (isNaN(rxnNumber)) {
        return {
          success: false,
          rxn: ReactionNo.RXN_AIPRM_OAUTH2_UNKNOWN_ERROR,
        };
      }

      return { success: false, rxn: rxnNumber };
    }

    if (error) {
      console.error('[AIPRM OAuth2] error:', error);
      return { success: false, rxn: getOAuth2ErrorRXN(error) };
    }

    // Validate state
    if (returnedState !== oauth2State.state) {
      console.error('[AIPRM OAuth2] state mismatch');
      return {
        success: false,
        rxn: ReactionNo.RXN_AIPRM_OAUTH2_STATE_MISMATCH,
      };
    }

    if (!code) {
      return { success: false, rxn: ReactionNo.RXN_AIPRM_OAUTH2_NO_CODE };
    }

    // Exchange code for tokens
    const codeVerifier = oauth2State.codeVerifier;

    let exchangeResponse;

    try {
      exchangeResponse = await fetch(OAuth2Config.ExchangeURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Code: code, CodeVerifier: codeVerifier }),
      });
    } catch (e) {
      console.error('[AIPRM OAuth2] exchange network error:', e);
      return {
        success: false,
        rxn: ReactionNo.RXN_AIPRM_OAUTH2_EXCHANGE_NETWORK_ERROR,
      };
    }

    if (!exchangeResponse.ok) {
      let rxn = ReactionNo.RXN_AIPRM_OAUTH2_EXCHANGE_FAILED;

      try {
        const errorBody = await exchangeResponse.json();

        if (errorBody?.ReactionNo) {
          rxn = errorBody.ReactionNo;
        }
      } catch (_) {
        // ignore JSON parse error — use default RXN
      }

      console.error(
        '[AIPRM OAuth2] exchange failed (HTTP %d): rxn=%d',
        exchangeResponse.status,
        rxn
      );

      return { success: false, rxn };
    }

    let tokens;

    try {
      tokens = await exchangeResponse.json();
    } catch (e) {
      console.error('[AIPRM OAuth2] exchange response parse error:', e);
      return {
        success: false,
        rxn: ReactionNo.RXN_AIPRM_OAUTH2_EXCHANGE_FAILED,
      };
    }

    console.log(
      '[AIPRM OAuth2] exchange successful, UserERID:',
      tokens.UserERID
    );

    return { success: true, tokens };
  } catch (e) {
    console.error('[AIPRM OAuth2] login error:', e);
    return { success: false, rxn: getOAuth2ErrorRXN(e.message) };
  } finally {
    // Clear PKCE state
    oauth2State = { codeVerifier: null, state: null };
    await chrome.storage.session.remove('oauth2State');
  }
}

// open permission page on redirect to chatgpt.com, if optional permission is not granted
chrome.webRequest.onBeforeRedirect.addListener(
  function (details) {
    // Check the target URL of the redirect
    const targetURL = details?.redirectUrl;

    if (targetURL?.includes('https://chatgpt.com')) {
      // check permissions
      chrome.permissions.contains(
        { origins: ['https://chatgpt.com/*'] },
        function (hasPermission) {
          if (!hasPermission) {
            // open permissions page
            openPermissions();
          }
        }
      );
    }
  },
  { urls: ['https://chat.openai.com/*'], types: ['main_frame'] }
);

function openChatGPT() {
  chrome.tabs.create({ url: 'https://chat.openai.com/' });
}

function openPermissions() {
  chrome.tabs.create({ url: 'permissions.html' });
}

// open success page on successful install in the background
function openSuccessPage(reason) {
  if (reason !== 'install') {
    return;
  }

  chrome.tabs.create({
    url: replaceEnvironmentURLs(
      `https://www.aiprm.com/success/install-chatgpt?utm_campaign=success-install&utm_content=${VERSION}&utm_source=chatgpt&utm_medium=extension&success=${ReactionNo.RXN_AIPRM_EXTENSION_INSTALL_CHATGPT}`
    ),
    active: false,
  });
}

chrome.runtime.onInstalled.addListener(function (details) {
  // only verify permissions on install and update
  if (!['install', 'update'].includes(details.reason)) {
    return;
  }

  // set uninstall URL with version
  chrome.runtime.setUninstallURL(
    replaceEnvironmentURLs(
      `https://www.aiprm.com/success/uninstall-chatgpt?utm_campaign=success-uninstall&utm_content=${VERSION}&utm_source=chatgpt&utm_medium=extension&success=${ReactionNo.RXN_AIPRM_EXTENSION_UNINSTALL_CHATGPT}`
    )
  );

  // check if optional permission for chatgpt.com is granted
  chrome.permissions.contains(
    { origins: ['https://chatgpt.com/*'] },
    function (hasPermission) {
      if (!hasPermission) {
        // if permission for chatgpt.com is not granted open permissions
        openPermissions();

        openSuccessPage(details.reason);
      } else {
        // re-register content script
        registerChatGPTComContentScript();

        // if permission is granted and it is an install event open chatgpt.com
        if (details.reason !== 'install') {
          return;
        }

        openChatGPT();

        openSuccessPage(details.reason);
      }
    }
  );
});

// open permissions page on icon click or ChatGPT if optional permission is granted already
chrome.action.onClicked.addListener(() => {
  chrome.permissions.contains(
    { origins: ['https://chatgpt.com/*'] },
    function (hasPermission) {
      if (!hasPermission) {
        // if permission for chatgpt.com is not granted open permissions
        openPermissions();
      } else {
        // re-register content script
        registerChatGPTComContentScript();

        // if permission is granted open ChatGPT
        openChatGPT();
      }
    }
  );
});

let connections = [];

// listen for connections from content scripts
chrome.runtime.onConnect.addListener(function (port) {
  // only accept connections from our extension
  if (port.name !== 'AIPRM') {
    return;
  }

  // add connection to list of connections with tab id as key
  connections[port.sender.tab.id] = port;

  // add disconnect listener to remove connection from list
  port.onDisconnect.addListener(function () {
    delete connections[port.sender.tab.id];
  });

  // listen for messages from content script
  port.onMessage.addListener(async function (message) {
    // only accept messages from our extension
    if (message.from !== 'AIPRM') {
      return;
    }

    if (message.data?.type === 'AIPRM.favoritePrompts') {
      // remove all context menu items
      chrome.contextMenus.removeAll();

      // insert new context menu items
      insertContextMenuItems(message.data.favoritePrompts);
    }

    // OAuth2 login request
    if (message.data?.type === 'AIPRM.oauth2Login') {
      const result = await initiateOAuth2({
        lang: message.data.lang,
      });
      port.postMessage({
        type: 'oauth2LoginResult',
        ...result,
      });
    }
  });
});

// listen for messages from AIPRM APP
chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
    // only accept messages from our extension with tokens
    if (!request.tokens) {
      sendResponse({ success: false });
      return;
    }

    // no connections available
    if (!connections.length) {
      sendResponse({ success: false });
      return;
    }

    // send to connections
    for (let tabId in connections) {
      connections[tabId].postMessage({
        type: 'tokens',
        tokens: request.tokens,
      });
    }

    sendResponse({ success: true });
  }
);

// mapping of prompt IDs to context menu item IDs
const contextMenuPromptMap = {
  AIPRM_MIDJOURNEY_V5_LIVE: '1837526819881603072',
  AIPRM_OUTRANK_ARTICLE: '1000101',
  AIPRM_OUTRANK_ARTICLE_LIVE: '1806246638470299648',
  AIPRM_SUMMARIZE: '1783773498066604032',
  AIPRM_SUMMARIZE_LIVE: '1837503888648581120',
  AIPRM_FIND_QUESTIONS: '1000109',
  AIPRM_FIND_QUESTIONS_LIVE: '1837517873166934016',
  AIPRM_SOCIAL_MEDIA_POSTS_LIVE: '1837511372687810560',
  AIPRM_SPELLING_GRAMMAR: '1788887681418391552',
  AIPRM_CUSTOM: '',
};

// Handle context menu item clicks
chrome.contextMenus.onClicked.addListener(function (info) {
  let prompt = `${[info.selectionText || '', info.pageUrl].join('\n\n')}`;
  let promptID =
    info.menuItemId === 'AIPRM_CUSTOM'
      ? ''
      : contextMenuPromptMap[info.menuItemId] || info.menuItemId;

  // remove _LIVE suffix
  promptID = promptID.replace('_LIVE', '');

  // menu item ID ends with _LIVE = live crawling
  if (info.menuItemId.endsWith('_LIVE')) {
    prompt = info.pageUrl;
  }

  // open new tab with AIPRM and prefill AIPRM_Prompt and AIPRM_PromptID
  chrome.tabs.create(
    {
      url: `https://chat.openai.com/${
        promptID ? `?AIPRM_PromptID=${promptID}` : ''
      }`,
    },
    function (newTab) {
      sendPromptMessageToTab(prompt, newTab.id);
    }
  );
});

// send prompt message to tab ID
function sendPromptMessageToTab(prompt, tabID) {
  chrome.tabs.sendMessage(
    tabID,
    {
      type: 'AIPRM.prompt',
      prompt,
    },
    function () {
      if (chrome.runtime.lastError) {
        // retry sending message
        setTimeout(function () {
          sendPromptMessageToTab(prompt, tabID);
        }, 1000);
      }
    }
  );
}

// Pre-fill prompt input with user input using omnibox
chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.tabs.create({
    url: `https://chat.openai.com/?AIPRM_Prompt=${encodeURIComponent(text)}`,
  });
});

function insertContextMenuItems(favoritePrompts = []) {
  // Create a context menu item "AIPRM" with icon with sub-items
  chrome.contextMenus.create({
    id: 'AIPRM',
    title: 'AIPRM for ChatGPT',
    contexts: ['selection', 'page'],
  });

  // Favorites
  if (favoritePrompts.length > 0) {
    chrome.contextMenus.create({
      id: 'AIPRM_FAVORITES',
      parentId: 'AIPRM',
      title: 'Favorites',
      contexts: ['selection', 'page'],
      enabled: false,
    });
  }

  favoritePrompts?.forEach((prompt) => {
    chrome.contextMenus.create({
      id: prompt.ID,
      parentId: 'AIPRM',
      title: prompt.Title,
      contexts: ['selection', 'page'],
    });
  });

  if (favoritePrompts.length > 0) {
    // Separator
    chrome.contextMenus.create({
      id: 'AIPRM_SEPARATOR_FAVORITES',
      parentId: 'AIPRM',
      type: 'separator',
      contexts: ['selection', 'page'],
    });
  }

  // Non-Live Crawling context menu items
  chrome.contextMenus.create({
    id: 'AIPRM_HEADER',
    parentId: 'AIPRM',
    title: 'Suggested',
    contexts: ['selection', 'page'],
    enabled: false,
  });

  chrome.contextMenus.create({
    id: 'AIPRM_FIND_QUESTIONS',
    parentId: 'AIPRM',
    title: 'Find Questions',
    contexts: ['selection', 'page'],
  });

  chrome.contextMenus.create({
    id: 'AIPRM_OUTRANK_ARTICLE',
    parentId: 'AIPRM',
    title: 'Outrank Article',
    contexts: ['selection', 'page'],
  });

  chrome.contextMenus.create({
    id: 'AIPRM_SPELLING_GRAMMAR',
    parentId: 'AIPRM',
    title: 'Spelling and Grammar',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'AIPRM_SUMMARIZE',
    parentId: 'AIPRM',
    title: 'Summarize',
    contexts: ['selection'],
  });

  // Separator
  chrome.contextMenus.create({
    id: 'AIPRM_LIVE_CRAWLING',
    parentId: 'AIPRM',
    type: 'separator',
    contexts: ['selection', 'page'],
  });

  // Live Crawling context menu items
  chrome.contextMenus.create({
    id: 'AIPRM_LIVE_CRAWLING_HEADER',
    parentId: 'AIPRM',
    title: 'Live Crawling',
    contexts: ['selection', 'page'],
    enabled: false,
  });

  chrome.contextMenus.create({
    id: 'AIPRM_FIND_QUESTIONS_LIVE',
    parentId: 'AIPRM',
    title: 'Find Questions',
    contexts: ['selection', 'page'],
  });

  chrome.contextMenus.create({
    id: 'AIPRM_MIDJOURNEY_V5_LIVE',
    parentId: 'AIPRM',
    title: 'Midjourney V5 Prompts',
    contexts: ['selection', 'page'],
  });

  chrome.contextMenus.create({
    id: 'AIPRM_OUTRANK_ARTICLE_LIVE',
    parentId: 'AIPRM',
    title: 'Outrank Article',
    contexts: ['selection', 'page'],
  });

  chrome.contextMenus.create({
    id: 'AIPRM_SOCIAL_MEDIA_POSTS_LIVE',
    parentId: 'AIPRM',
    title: 'Social Media Posts',
    contexts: ['selection', 'page'],
  });

  chrome.contextMenus.create({
    id: 'AIPRM_SUMMARIZE_LIVE',
    parentId: 'AIPRM',
    title: 'Summarize',
    contexts: ['selection', 'page'],
  });

  // Separator
  chrome.contextMenus.create({
    id: 'AIPRM_SEPARATOR_CUSTOM',
    parentId: 'AIPRM',
    type: 'separator',
    contexts: ['selection', 'page'],
  });

  chrome.contextMenus.create({
    id: 'AIPRM_CUSTOM_HEADER',
    parentId: 'AIPRM',
    title: 'Custom',
    contexts: ['selection', 'page'],
    enabled: false,
  });

  // Custom Prompt context menu item
  chrome.contextMenus.create({
    id: 'AIPRM_CUSTOM',
    parentId: 'AIPRM',
    title: 'Custom Prompt',
    contexts: ['selection', 'page'],
  });
}
