import { getPreferredSupportedLang } from './utils.js';

// Change the currentEnvironment variable to switch between environments (local, test, production)
const currentEnvironment = 'production';

// Define environment-specific constants (API endpoints, etc.)
const getEnvironmentConfig = () => {
  switch (currentEnvironment) {
    case 'production':
      return {
        StaticEndpoint: 'https://api.aiprm.com/',
        APIEndpoint: 'https://api.aiprm.com/api9',
        APIEndpointAPP: 'https://app.aiprm.com/api',
        AppAccountURL: 'https://app.aiprm.com/account',
        AppPricingURL: 'https://app.aiprm.com/pricing',
        AppSignupURL: 'https://app.aiprm.com/signup',
        AppTeamURL: 'https://app.aiprm.com/teams',
        WebsiteURL: 'https://www.aiprm.com',
        OAuth2: {
          ConnectURL: 'https://app.aiprm.com/api/ext-connect',
          ExchangeURL: 'https://app.aiprm.com/api/ext-connect/exchange',
          ConnectSuccessURL: 'https://app.aiprm.com/connect-success',
          DisconnectSuccessURL: 'https://app.aiprm.com/disconnect-success',
        },
      };
    case 'test':
        return {
          StaticEndpoint: 'https://test-api.aiprmtest1.com/',
          APIEndpoint: 'https://test-api.aiprmtest1.com/api9',
          APIEndpointAPP: 'https://test-app.aiprmtest1.com/api',
          AppAccountURL: 'https://test-app.aiprmtest1.com/account',
          AppPricingURL: 'https://test-app.aiprmtest1.com/pricing',
          AppSignupURL: 'https://test-app.aiprmtest1.com/signup',
          AppTeamURL: 'https://test-app.aiprmtest1.com/teams',
          WebsiteURL: 'https://devtest-www.aiprmtest.com/',
          OAuth2: {
            ConnectURL: 'https://test-app.aiprmtest1.com/api/ext-connect',
            ExchangeURL: 'https://test-app.aiprmtest1.com/api/ext-connect/exchange',
            ConnectSuccessURL: 'https://test-app.aiprmtest1.com/connect-success',
            DisconnectSuccessURL: 'https://test-app.aiprmtest1.com/disconnect-success',
          },
     };
    case 'local':
      return {
        StaticEndpoint: 'https://dev-api.aiprm.com/',
        APIEndpoint: 'https://dev-api.aiprm.com/api4',
        APIEndpointAPP: 'https://dev-app.aiprm.com/api',
        AppAccountURL: 'https://dev-app.aiprm.com/account',
        AppPricingURL: 'https://dev-app.aiprm.com/pricing',
        AppSignupURL: 'https://dev-app.aiprm.com/signup',
        AppTeamURL: 'https://dev-app.aiprm.com/teams',
        WebsiteURL: 'https://devtest-www.aiprmtest.com',
        OAuth2: {
          ConnectURL: 'https://dev-app.aiprm.com/api/ext-connect',
          ExchangeURL: 'https://dev-app.aiprm.com/api/ext-connect/exchange',
          ConnectSuccessURL: 'https://dev-app.aiprm.com/connect-success',
          DisconnectSuccessURL: 'https://dev-app.aiprm.com/disconnect-success',
        },
      };
    default:
      return {
        StaticEndpoint: 'https://api.aiprm.com/',
        APIEndpoint: 'https://api.aiprm.com/api7',
        APIEndpointAPP: 'https://app.aiprm.com/api',
        AppAccountURL: 'https://app.aiprm.com/account',
        AppPricingURL: 'https://app.aiprm.com/pricing',
        AppSignupURL: 'https://app.aiprm.com/signup',
        AppTeamURL: 'https://app.aiprm.com/teams',
        WebsiteURL: 'https://www.aiprm.com',
        OAuth2: {
          ConnectURL: 'https://app.aiprm.com/api/ext-connect',
          ExchangeURL: 'https://app.aiprm.com/api/ext-connect/exchange',
          ConnectSuccessURL: 'https://app.aiprm.com/connect-success',
          DisconnectSuccessURL: 'https://app.aiprm.com/disconnect-success',
        },
      };
  }
};

// Get environment-specific constants
const environmentConfig = getEnvironmentConfig();

let SUPPORTED_UI_LANGS = new Set(['de', 'en', 'es', 'fr', 'pt']);

/**
 * Get the 2-letter language code for extension UI localization.
 * Walks the user's preferred languages and returns the first supported one.
 * During module initialization utils.js may not yet be available
 * (circular dependency), so we fall back to navigator.language.
 * @returns {string}
 */
function getAppLangCode() {
  try {
    return getPreferredSupportedLang(SUPPORTED_UI_LANGS);
  } catch {
    return (navigator.language || 'en').split('-')[0];
  }
}

/**
 * Append lang parameter to a URL, using ? or & as appropriate.
 * @param {string} url
 * @returns {string}
 */
function appendLangParam(originalURL) {
  const langCode = getAppLangCode();
  try {
    const parsed = new URL(originalURL);
    if (!parsed.searchParams.has('lang')) {
      parsed.searchParams.set('lang', langCode);
    }
    return parsed.toString();
  } catch {
    const separator = originalURL.includes('?') ? '&' : '?';
    return `${originalURL}${separator}lang=${langCode}`;
  }
}

/**
 * Safely append query-parameter string to a URL, using ? or & as appropriate.
 * @param {string} url
 * @param {string} params - bare query-param string without leading ? (e.g. 'utm_source=ext&utm_medium=btn')
 * @returns {string}
 */
function appendUrlParams(url, params) {
  if (!params) return url;
  try {
    const parsed = new URL(url);
    for (const [key, value] of new URLSearchParams(params)) {
      parsed.searchParams.set(key, value);
    }
    return parsed.toString();
  } catch {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params}`;
  }
}

const ContentURLLangPrefix = {
  en: '',
  de: 'de',
  es: 'es',
  fr: 'fr',
  pt: 'pt-br',
};

const WwwSitemapURL = currentEnvironment === 'production'
  ? 'https://www.aiprm.com/sitemap-tutorials-main.xml'
  : 'https://devtest-www.aiprmtest.com/sitemap-tutorials-main.xml';

let wwwURLMap = null;

const HreflangFromAppLang = {
  en: 'en', de: 'de', es: 'es', fr: 'fr', pt: 'pt-br',
};

/**
 * Fetch and parse the www.aiprm.com sitemap to build an en-URL -> hreflang alternates map.
 * Only fetches once per session; subsequent calls are no-ops.
 * @param {string} cacheBuster - cache-busting token appended as ?v= query parameter
 */
async function fetchWwwURLMap(cacheBuster) {
  if (wwwURLMap !== null) return;
  try {
    const response = await fetch(`${WwwSitemapURL}?v=${cacheBuster}`);
    if (!response.ok) return;
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, 'application/xml');

    // Normalize map keys to the canonical www.aiprm.com origin so that
    // lookups using ContentURLEnglish (which always uses www.aiprm.com) match.
    // Alternate href values keep the original sitemap origin so links point
    // to the correct environment (e.g. stage-www3 in test).
    // Sitemap loc/href may use http:// or https://, so match either scheme.
    const sitemapHost = new URL(WwwSitemapURL).host;
    const canonicalOrigin = 'https://www.aiprm.com';
    const needsNormalization = sitemapHost !== 'www.aiprm.com';
    const sitemapOriginPattern = needsNormalization
      ? new RegExp(`^https?://${sitemapHost.replace(/[.]/g, '\\.')}`)
      : null;
    const normalizeKey = needsNormalization
      ? (url) => url.replace(sitemapOriginPattern, canonicalOrigin)
      : (url) => url;

    const map = new Map();
    for (const urlEl of doc.getElementsByTagNameNS(
      'http://www.sitemaps.org/schemas/sitemap/0.9', 'url')) {
      const loc = urlEl.getElementsByTagNameNS(
        'http://www.sitemaps.org/schemas/sitemap/0.9', 'loc')[0]?.textContent;
      if (!loc) continue;
      const alternates = {};
      for (const link of urlEl.getElementsByTagNameNS(
        'http://www.w3.org/1999/xhtml', 'link')) {
        alternates[link.getAttribute('hreflang')?.toLowerCase()] = link.getAttribute('href');
      }
      map.set(normalizeKey(loc), alternates);
    }
    wwwURLMap = map;
  } catch (e) {
    console.error('Could not fetch www sitemap for URL localization', e);
  }
}

const ContentURLEnglish = {
  tutorials: 'https://www.aiprm.com/tutorials/',
  firstPrompt:
    'https://www.aiprm.com/tutorials/quick-start-guide/how-to-run-your-first-prompt/',
  exampleUseCases: 'https://www.aiprm.com/tutorials/example-use-cases/',
};

const LocalizedNavLabels = {
  en: { tutorials: 'AIPRM Tutorials', exampleUseCases: 'Example Use\u00a0Cases' },
  de: { tutorials: 'AIPRM Tutorials', exampleUseCases: 'Anwendungsbeispiele' },
  es: { tutorials: 'Tutoriales de AIPRM', exampleUseCases: 'Ejemplos de\u00a0Uso' },
  fr: { tutorials: 'Tutoriels AIPRM', exampleUseCases: "Exemples d'utilisation" },
  pt: { tutorials: 'Tutoriais do AIPRM', exampleUseCases: 'Exemplos de\u00a0Uso' },
};

function getLocalizedNavLabel(key) {
  return (
    LocalizedNavLabels[getAppLangCode()]?.[key] ||
    LocalizedNavLabels['en'][key]
  );
}

let NavTutorialsLabel = getLocalizedNavLabel('tutorials');
let NavExampleUseCasesLabel = getLocalizedNavLabel('exampleUseCases');

/**
 * Get a localized content URL by key via sitemap-based hreflang lookup.
 * @param {string} key - One of 'tutorials', 'firstPrompt', 'exampleUseCases'
 * @returns {string}
 */
function getLocalizedContentURL(key) {
  return localizeWwwURL(ContentURLEnglish[key]);
}

/**
 * Rewrite a www.aiprm.com URL to its localized and environment-specific equivalent.
 * Uses sitemap-based hreflang lookup (exact match, then longest-prefix match).
 * Returns the environment-specific URL unchanged when no localized version
 * exists in the sitemap, or for English / unknown languages.
 * @param {string} url
 * @returns {string}
 */
function localizeWwwURL(url) {
  const langCode = getAppLangCode();
  const prefix = ContentURLLangPrefix[langCode];
  if (!prefix) return replaceEnvironmentURLs(url);

  const hreflang = HreflangFromAppLang[langCode];
  if (!hreflang || !wwwURLMap) {
    // Sitemap unavailable — return original URL unchanged (not all pages are translated)
    // see https://deliverwows.slack.com/archives/C04HY4C2W3V/p1772028100706259
    return replaceEnvironmentURLs(url);
  }

  // Separate base URL from fragment and query string
  let baseURL = url;
  let suffix = '';
  const hashIdx = url.indexOf('#');
  if (hashIdx !== -1) { suffix = url.slice(hashIdx); baseURL = url.slice(0, hashIdx); }
  const qIdx = baseURL.indexOf('?');
  let query = '';
  if (qIdx !== -1) { query = baseURL.slice(qIdx); baseURL = baseURL.slice(0, qIdx); }

  // Ensure trailing slash for consistent matching
  const lookupURL = baseURL.endsWith('/') ? baseURL : baseURL + '/';

  // Exact match
  const alternates = wwwURLMap.get(lookupURL);
  if (alternates?.[hreflang]) {
    return replaceEnvironmentURLs(alternates[hreflang] + query + suffix);
  }

  // Longest-prefix match (for sub-page anchors or paths not individually in sitemap)
  let bestMatch = '';
  let bestAlternates = null;
  for (const [enURL, alts] of wwwURLMap) {
    if (lookupURL.startsWith(enURL) && enURL.length > bestMatch.length && alts[hreflang]) {
      bestMatch = enURL;
      bestAlternates = alts;
    }
  }
  if (bestAlternates) {
    return replaceEnvironmentURLs(
      bestAlternates[hreflang] + lookupURL.slice(bestMatch.length) + query + suffix
    );
  }

  // No sitemap match — return original URL unchanged (not all pages are translated)
  // see https://deliverwows.slack.com/archives/C04HY4C2W3V/p1772028100706259
  return replaceEnvironmentURLs(url);
}

/**
 * Replace production app URLs and /modal/ paths with environment-specific values.
 * @param {string} content - HTML or text content
 * @returns {string}
 */
function replaceEnvironmentURLs(content) {
  if (!content || typeof content !== 'string') return content || '';
  let result = content;
  // Replace app.aiprm.com with environment-specific base (from AppPricingURL origin)
  const appBase = new URL(AppPricingURL).origin;
  result = result.replaceAll('https://app.aiprm.com', appBase);
  // Replace www.aiprm.com (production WebsiteURL) with environment-specific WebsiteURL
  const websiteBase = new URL(WebsiteURL).origin;
  result = result.replaceAll('https://www.aiprm.com', websiteBase);
  // Replace /modal/ with /testmodal/ for non-production
  if (currentEnvironment === 'test' || currentEnvironment === 'local') {
    result = result.replaceAll('/modal/', '/testmodal/');
  }
  return result;
}

// Define global constants based on environment-specific constants
const APIEndpoint = environmentConfig.APIEndpoint;
const APIEndpointAPP = environmentConfig.APIEndpointAPP;
let AppAccountURL = appendLangParam(environmentConfig.AppAccountURL);
let AppPricingURL = appendLangParam(environmentConfig.AppPricingURL);
let AppSignupURL = appendLangParam(environmentConfig.AppSignupURL);
let AppTeamURL = appendLangParam(environmentConfig.AppTeamURL);
const AppTeamBaseURL = environmentConfig.AppTeamURL;
const OAuth2Config = environmentConfig.OAuth2;
const StaticEndpoint = environmentConfig.StaticEndpoint;
const WebsiteURL = environmentConfig.WebsiteURL;

// Define global constants
const PromptPlaceholder = '[PROMPT]';
const PromptPlaceholder1 = '[PROMPT1]';
const TargetLanguagePlaceholder = '[TARGETLANGUAGE]';
const CrawledTextPlaceholder = '[CRAWLEDTEXT]';
const CrawledSourcePlaceholder = '[CRAWLEDSOURCE]';
const VariablePlaceholder = '[VARIABLE{idx}]';
const VariableDefinition = /\[VARIABLE([1-6]):(.+?)(:.*?)?(:.*?)?\]/g;
const LanguageFeedURL = StaticEndpoint + 'csv/languages-20230119.csv?v=';
const TopicFeedURL = StaticEndpoint + 'csv/topics-20230123.csv?v=';
const ActivityFeedURL = StaticEndpoint + 'csv/activities-20230124.csv?v=';
const ToneFeedURL = StaticEndpoint + 'csv/tones-v2-20230216.csv?v=';
const WritingStyleFeedURL =
  StaticEndpoint + 'csv/writing_styles-v2-20230216.csv?v=';
const ContinueActionsFeedURL =
  StaticEndpoint + 'csv/continue_actions-20230216.csv?v=';
const ModelFeedURL = StaticEndpoint + 'csv/models-20240710.csv?v=';
const PromptBuilderFeedURL =
  StaticEndpoint + 'csv/prompt_builder-20230811.csv?v=';
const AppShort = 'AIPRM';
const AppName = 'AIPRM for ChatGPT';
const AppSlogan = 'AIPRM - ChatGPT Prompts';
const AppSloganPremium = 'AIPRM Premium - ChatGPT Prompts';
const AppURL = replaceEnvironmentURLs(
  'https://www.aiprm.com/?via=chatgpt&utm_campaign=powered&utm_source=chatgpt&utm_medium=navlink&utm_content=AIPRMpowered'
);
const ExportFilePrefix = 'AIPRM-export-chatgpt-thread_';
const ExportHeaderPrefix = replaceEnvironmentURLs(
  '\n```\nExported with AIPRM https://www.aiprm.com by '
);
const AnonOperatorERIDPrefix = 'ua-';
const QuotaMessagesURL =
  StaticEndpoint + 'json/quota-messages-20251110.json?v=';
const ConfigURL = StaticEndpoint + 'json/config-20260224.json?v=';

let NavTutorialsURL = appendUrlParams(
  getLocalizedContentURL('tutorials'),
  'utm_source=extension&utm_medium=navlink&utm_campaign=AIPRMtutorials');
let NavExampleUseCasesURL = appendUrlParams(
  getLocalizedContentURL('exampleUseCases'),
  'utm_source=extension&utm_medium=navlink&utm_campaign=AIPRMexamples');

const AuxIndexLookupDefinition = /^\$\[(\w+::)?(\w+)(\(\d+\))?:([^\n]+)\]$/gm;
const QuickStartOnboardingURL =
  'https://api.aiprm.com/img/quick-start-onboarding.png';
const QuickStartOnboardingDarkURL =
  'https://api.aiprm.com/img/quick-start-onboarding-dark.png';
let QuickStartTutorialURL = getLocalizedContentURL('firstPrompt');
let TutorialsURL = getLocalizedContentURL('tutorials');

/**
 * Re-compute localized nav/tutorial URLs after sitemap data is available.
 * Must be called after fetchWwwURLMap() completes successfully.
 */
function updateLocalizedURLs() {
  NavTutorialsURL = appendUrlParams(
    localizeWwwURL(ContentURLEnglish.tutorials),
    'utm_source=extension&utm_medium=navlink&utm_campaign=AIPRMtutorials');
  NavExampleUseCasesURL = appendUrlParams(
    localizeWwwURL(ContentURLEnglish.exampleUseCases),
    'utm_source=extension&utm_medium=navlink&utm_campaign=AIPRMexamples');
  QuickStartTutorialURL = localizeWwwURL(ContentURLEnglish.firstPrompt);
  TutorialsURL = localizeWwwURL(ContentURLEnglish.tutorials);
}

/**
 * Update SUPPORTED_UI_LANGS from remote config and recompute all
 * language-dependent module-level values that were set at import time.
 * @param {string[]} langs - array of 2-letter language codes
 */
function updateSupportedUILangs(langs) {
  if (!Array.isArray(langs) || langs.length === 0) return;

  SUPPORTED_UI_LANGS = new Set(langs);

  AppAccountURL = appendLangParam(environmentConfig.AppAccountURL);
  AppPricingURL = appendLangParam(environmentConfig.AppPricingURL);
  AppSignupURL = appendLangParam(environmentConfig.AppSignupURL);
  AppTeamURL = appendLangParam(environmentConfig.AppTeamURL);
  NavTutorialsLabel = getLocalizedNavLabel('tutorials');
  NavExampleUseCasesLabel = getLocalizedNavLabel('exampleUseCases');
  NavTutorialsURL = appendUrlParams(
    localizeWwwURL(ContentURLEnglish.tutorials),
    'utm_source=extension&utm_medium=navlink&utm_campaign=AIPRMtutorials');
  NavExampleUseCasesURL = appendUrlParams(
    localizeWwwURL(ContentURLEnglish.exampleUseCases),
    'utm_source=extension&utm_medium=navlink&utm_campaign=AIPRMexamples');
  QuickStartTutorialURL = localizeWwwURL(ContentURLEnglish.firstPrompt);
  TutorialsURL = localizeWwwURL(ContentURLEnglish.tutorials);
}

const ValidateVariableMaxCount = 6;
const ValidateVariablePlaceholder = /\[VARIABLE([0-9]+)\]/g;
const ValidateVariableDefinition = /\[VARIABLE([0-9]+):(.+?)(:.*?)?(:.*?)?\]/g;

const MaxSeenMessages = 10;

export {
  PromptPlaceholder,
  PromptPlaceholder1,
  TargetLanguagePlaceholder,
  CrawledTextPlaceholder,
  CrawledSourcePlaceholder,
  VariablePlaceholder,
  VariableDefinition,
  LanguageFeedURL,
  AppShort,
  AppName,
  AppSlogan,
  AppSloganPremium,
  AppURL,
  ExportFilePrefix,
  ExportHeaderPrefix,
  APIEndpoint,
  TopicFeedURL,
  ActivityFeedURL,
  ToneFeedURL,
  WritingStyleFeedURL,
  ContinueActionsFeedURL,
  ModelFeedURL,
  PromptBuilderFeedURL,
  APIEndpointAPP,
  AppAccountURL,
  AppPricingURL,
  AppSignupURL,
  QuotaMessagesURL,
  ConfigURL,
  AppTeamURL,
  AppTeamBaseURL,
  appendLangParam,
  appendUrlParams,
  ValidateVariableMaxCount,
  ValidateVariablePlaceholder,
  ValidateVariableDefinition,
  AuxIndexLookupDefinition,
  MaxSeenMessages,
  QuickStartOnboardingURL,
  QuickStartOnboardingDarkURL,
  QuickStartTutorialURL,
  TutorialsURL,
  AnonOperatorERIDPrefix,
  OAuth2Config,
  localizeWwwURL,
  fetchWwwURLMap,
  updateLocalizedURLs,
  updateSupportedUILangs,
  getAppLangCode,
  NavTutorialsURL,
  NavExampleUseCasesURL,
  NavTutorialsLabel,
  NavExampleUseCasesLabel,
  replaceEnvironmentURLs,
};

/** @typedef {{Enabled: boolean, Config: {APIEndpointURL: string, MaxCharacters: number, MaxWords: number, CrawledTextPrompt: string, CrawledSourcePrompt: string}}} LiveCrawlingConfig */

/** @typedef {{Enabled: boolean, Config: {Selectors: Object.<string, string>}} WatermarkConfig */

/** @typedef {{Config: {CitationsPattern: string, ProductsPattern: string, CanvasRecipients: string[], DataAnalysisContentTypes: string[], ChainOfThoughtAuthorNames: string[], ContentTypeText: string, ContentTypeVideo: string, ContentTypeWebpageExtended: string, ContentTypeHidden: string, ContentTypeImageInline: string, ContentTypeThoughts: string, ContentTypeExecutionOutput: string, AuthorNameWebRun: string, AuthorNamePython: string, SearchQueryType: string, RecipientResearchKickoffTool: string, ChunkTypeThought: number, ChunkTypeRecap: number, ChunkTypeSearch: number, ChunkTypeCodeAnalysis: number, ChunkTypeImageAnalysis: number, ChunkTypeBrowsing: number, MaxFilenameLength: number }}} ExportConfig */

/**
 * @typedef {Object} SelectorConfig
 * @property {string} FirstPrompt
 * @property {string} FirstPromptButtons
 * @property {string} ChatLogContainer
 * @property {string} ConversationResponse
 * @property {string} ModelSelectorContainer
 * @property {string} ShareButton
 * @property {string} SuggestedPrompts
 * @property {string} DashboardTitle
 * @property {string} Sidebar
 * @property {string} ExportButton
 * @property {string} ExportButtonChatStarted
 * @property {string} PromptTextarea
 * @property {string} PromptSubmitButton
 * @property {string} ConversationResponseWrapper
 * @property {string} NewChatSidebar
 * @property {string} NewChatSidebarButton
 * @property {string} NewChatSidebarButtonText
 * @property {string} NewChatTopbar
 * @property {string} NewChatTopbarButton
 * @property {string} ElementAddedSidebarID1
 * @property {string} ElementAddedSidebarID2
 * @property {string[]} ElementAddedSidebarClassNames
 * @property {string} ElementAddedExportButtonDisable
 * @property {string} ElementAddedExportButtonEnable
 * @property {string} ElementAddedSavePromptAsTemplate
 * @property {string} LangWrapperSpacer
 * @property {string} SavePromptAsTemplatePromptText
 * @property {string} GizmosTitle
 * @property {number} GizmosTitleIndex
 * @property {string} GizmosContentContainer
 * @property {string[]} GizmosContentContainers
 * @property {string} CurrentGizmoTitle
 * @property {string} CurrentGizmoPromptStarters
 * @property {string} NewComposerTextarea
 * @property {string} ReactFiberPropertyKey
 * @property {string} IgnoreElementAdditionByID
 * @property {string[]} IgnoreByParentID
 * @property {string[]} IgnoreByParentClassPrefix
 * @property {string[]} IgnoreByElementClassPrefix
 * @property {string[]} IgnoreByTag
 * @property {boolean} IgnoreElementsWithoutIdentifiers
 * @property {string} ResponseButtonsBlock
 * @property {string} ComposerContainer
 * @property {string} ToolboxButtonsContainer
 * @property {string} SubmitButtonContainer
 * @property {string} ComposerDictationOverlay
 * @property {string} ConversationTitle
 * @property {string} SavePromptAsTemplateContainer
 */

/** @typedef {{Selector: string, Add: string[], Remove: string[]}} LayoutChangeConfig */

/** @typedef {{PromptTemplates: LayoutChangeConfig[], General: LayoutChangeConfig[]}} LayoutChangesConfig */

/** @typedef {{Enabled: boolean, Config: {EndpointConversation: string, EndpointMessageFeedback: string, EndpointConversationChatMessages: string, FeedbackTextField: string, FeedbackRatingField: string, FeedbackThumbsDown: string, FeedbackThumbsUp: string, GizmoCodePattern: string, GizmoMagicCreatePattern: string, UnselectPromptOnURLChange: boolean, EnablePromptSendQuota: boolean, EnableConversationMessagesModification: boolean, EnableTextDecoderMessagesFilter: boolean, TextDecoderMessagesSkipContentTypes: string[], EnableDuplicateStylesheetMonitor: boolean, EnableExportChatV2: boolean}}} PromptTemplatesConfig */

/** @typedef {{Title: string, NoOffer: string, MaxRedemptions: string, NewFeatureBadge: string}} ReferralsConfig */

/** @typedef {{Enabled: boolean, Config: {PlaceholderText: string, TriggerKey: string, ModelsConfigEndpoint: string, EnableModelsConfig: boolean}}} PromptPanelConfig */

/** @typedef {{Enabled: boolean, DismissedTimeout: number}} UserLicenseWarningConfig */

/**
 * @typedef {{
 *   Enabled: boolean,
 *   Config: {
 *     Rollout?: {
 *       Linking?: {
 *         KnownOperator?: number,
 *         AnonOperator?: number
 *       },
 *       ConnectRequired?: {
 *         KnownOperator?: number,
 *         AnonOperator?: number
 *       }
 *     },
 *    ReconnectCoolOffPeriod?: number,
 *    AppConnectParams?: { [lang: string]: string },
 *    LegacyConnectVariant?: {
 *      [lang: string]: {
 *        ID: string,
 *        ConnectParams?: string,
 *        ConnectLegacy?: string
 *      }
 *    },
 *    ConnectVariants?: {
 *      [lang: string]: {
 *        ID: string,
 *        ConnectParams?: string,
 *        ConnectRequired?: string,
 *        ConnectOptional?: string,
 *        Title: string,
 *        Body: string,
 *        ConnectButton: string,
 *        RetryButton: string,
 *        StartButton: string,
 *        CancelButton: string,
 *        ConnectingMessage: string,
 *        WaitingMessage: string,
 *        ErrorProfileMessage: string,
 *        ErrorConnectionMessage: string,
 *        ErrorConnectionPrefix: string,
 *        SuccessTitle: string,
 *        SuccessMessage: string
 *      }[]
 *     }
 *   }
 * }} OAuth2FeatureConfig
 */

/** @typedef {{Features: {LiveCrawling: LiveCrawlingConfig, Watermark: WatermarkConfig, PromptTemplates: PromptTemplatesConfig, Referrals: ReferralsConfig, PromptPanel: PromptPanelConfig, UserLicenseWarning: UserLicenseWarningConfig, Export: ExportConfig, OAuth2?: OAuth2FeatureConfig}, EndpointGizmos: string, PatternOperatorERID: string, SuppressMessagesPathPattern?: string, MessageDelayMinutes?: number, ShowMessagesOnPromptSubmit?: boolean, Selectors: SelectorConfig, LayoutChanges: LayoutChangesConfig, NewPromptDefaultText: string, SupportedUILangs?: string[], MessageConfirmImage?: Object.<string, string>}} RemoteConfig */

export class Config {
  /** @type {RemoteConfig} */
  #config;

  /** @param {RemoteConfig} config */
  constructor(config) {
    this.#config = config;
  }

  /** @returns {boolean} */
  isLiveCrawlingEnabled() {
    return this.#config.Features.LiveCrawling.Enabled === true;
  }

  /** @returns {LiveCrawlingConfig['Config']} */
  getLiveCrawlingConfig() {
    return this.#config.Features.LiveCrawling.Config;
  }

  /** @returns {boolean} */
  arePromptTemplatesEnabled() {
    return this.#config.Features.PromptTemplates.Enabled === true;
  }

  /** @returns {PromptTemplatesConfig['Config']} */
  getPromptTemplatesConfig() {
    return this.#config.Features.PromptTemplates.Config;
  }

  /** @returns {boolean} */
  isWatermarkEnabled() {
    return this.#config.Features.Watermark.Enabled === true;
  }

  /** @returns {WatermarkConfig['Config']} */
  getWatermarkConfig() {
    return this.#config.Features.Watermark.Config;
  }

  /** @returns {ReferralsConfig} */
  getReferralsConfig() {
    return this.#config.Features.Referrals;
  }

  /** @returns {EndpointGizmos} */
  getEndpointGizmos() {
    return this.#config.EndpointGizmos;
  }

  /** @returns {string} */
  getPatternOperatorERID() {
    return this.#config.PatternOperatorERID;
  }

  /** @returns {SelectorConfig} */
  getSelectorConfig() {
    return this.#config.Selectors;
  }

  /** @returns {LayoutChangesConfig} */
  getLayoutChangesConfig() {
    return this.#config.LayoutChanges;
  }

  // boolean isPromptPanelEnabled() {
  /** @returns {boolean} */
  isPromptPanelEnabled() {
    return this.#config.Features.PromptPanel.Enabled === true;
  }

  /** @returns {PromptPanelConfig['Config']} */
  getPromptPanelConfig() {
    return this.#config.Features.PromptPanel.Config;
  }

  /** @returns {NewPromptDefaultText} */
  getNewPromptDefaultText() {
    return this.#config.NewPromptDefaultText;
  }

  isPromptSendQuotaEnabled() {
    return (
      this.#config.Features.PromptTemplates.Config.EnablePromptSendQuota ===
      true
    );
  }

  /** @returns {UserLicenseWarningConfig} */
  getUserLicenseWarningConfig() {
    return this.#config.Features.UserLicenseWarning;
  }

  /** @returns {ExportConfig['Config']} */
  getExportConfig() {
    return this.#config.Features.Export.Config;
  }

  /** @returns {OAuth2FeatureConfig|null} */
  getOAuth2FeatureConfig() {
    return this.#config.Features?.OAuth2 ?? null;
  }

  /** @returns {string[]|undefined} */
  getSupportedUILangs() {
    return this.#config.SupportedUILangs;
  }

  /** @returns {Object|null} */
  getLegalURLsConfig() {
    return this.#config.LegalURLs ?? null;
  }

  /** @returns {string} */
  getSuppressMessagesPathPattern() {
    return this.#config.SuppressMessagesPathPattern ?? '';
  }

  /** @returns {number} */
  getMessageDelayMinutes() {
    return this.#config.MessageDelayMinutes ?? 0;
  }

  /** @returns {boolean} */
  isShowMessagesOnPromptSubmitEnabled() {
    return this.#config.ShowMessagesOnPromptSubmit === true;
  }

  /** @returns {Object.<string, string>|null} */
  getMessageConfirmImageConfig() {
    return this.#config.MessageConfirmImage ?? null;
  }
}
