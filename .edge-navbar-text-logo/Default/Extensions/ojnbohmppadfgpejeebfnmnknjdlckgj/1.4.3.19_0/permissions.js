import { registerChatGPTComContentScript } from './utils.js';

const AVAILABLE_LOCALES = ['de', 'en', 'es', 'fr', 'pt_BR'];

/**
 * Load the best-matching locale messages based on navigator.languages,
 * falling back to chrome.i18n (Chrome UI language) per message key.
 *
 * @returns {Promise<{messages: Object|null, selectedLocale: string|null}>}
 */
async function loadPreferredLocaleMessages() {
  const langs = navigator.languages || [navigator.language || 'en'];

  for (const lang of langs) {
    // Try exact match (e.g. "pt-BR" -> "pt_BR"), then base language (e.g. "de-AT" -> "de")
    const candidates = [lang.replace('-', '_'), lang.split('-')[0]];

    for (const candidate of candidates) {
      if (!AVAILABLE_LOCALES.includes(candidate)) continue;

      try {
        const url = chrome.runtime.getURL(
          `_locales/${candidate}/messages.json`
        );
        const resp = await fetch(url);
        return {
          messages: await resp.json(),
          selectedLocale: candidate,
        };
      } catch (e) {
        console.warn(`[AIPRM] Failed to load locale ${candidate}:`, e);
      }
    }
  }

  return {
    messages: null,
    selectedLocale: null,
  };
}

/**
 * Get a single translated message with navigator.languages -> chrome.i18n fallback.
 *
 * @param {Object|null} messages - preloaded messages object (may be null)
 * @param {string} key - message key
 * @returns {string}
 */
function getMessage(messages, key) {
  return messages?.[key]?.message || chrome.i18n.getMessage(key) || '';
}

document.addEventListener('DOMContentLoaded', async function () {
  // Toggle dark mode based on user's system preference
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isDarkMode) {
    document.querySelector('html').classList.add('dark');
  }

  // Set up i18n — prefer navigator.languages, fall back to chrome.i18n (Chrome UI language)
  const { messages, selectedLocale } = await loadPreferredLocaleMessages();

  const pageLang = (
    selectedLocale ||
    chrome.i18n.getUILanguage?.() ||
    'en'
  ).replace(/_/g, '-');

  document.documentElement.setAttribute('lang', pageLang);

  const elements = document.querySelectorAll('[data-i18n]');

  for (const element of elements) {
    const messageKey = element.getAttribute('data-i18n');
    const msg = getMessage(messages, messageKey);

    if (!msg) {
      console.error(`No message found for key: ${messageKey}`);
      continue;
    }

    element.innerHTML = msg;
  }

  // Button click event for requesting permission
  document
    .getElementById('requestPermission')
    .addEventListener('click', function () {
      chrome.permissions.request(
        {
          origins: ['https://chatgpt.com/*'],
        },
        function (granted) {
          if (granted) {
            // Register content script
            registerChatGPTComContentScript();

            // Open ChatGPT in the same tab
            window.location.href = 'https://chat.openai.com/';
          } else {
            // Handle denial
            console.error('ChatGPT.com - Permission denied.');

            alert(getMessage(messages, 'permissionsDenied'));
          }
        }
      );
    });

  // check if optional permission for chatgpt.com is granted on load
  chrome.permissions.contains(
    { origins: ['https://chatgpt.com/*'] },
    function (hasPermission) {
      // if permission for chatgpt.com is granted -> redirect to ChatGPT
      if (hasPermission) {
        // re-register content script
        registerChatGPTComContentScript();

        // if permission is granted -> redirect to ChatGPT
        window.location.href = 'https://chat.openai.com/';
      }
      // if permission for chatgpt.com is not granted -> show request permission button (needs user interaction)
    }
  );
});
