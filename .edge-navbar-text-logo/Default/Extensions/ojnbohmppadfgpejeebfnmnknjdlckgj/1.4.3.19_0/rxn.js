/** @enum {number} */
const ReactionNo = {
  RXN_AIPRM_ACCESS_FORBIDDEN: 70005,

  RXN_AIPRM_OVER_LIMIT_PROMPTS: 70009,
  RXN_AIPRM_QUOTA_EXCEEDED: 70010,
  RXN_AIPRM_PROMPT_NOT_FOUND: 70002,
  RXN_AIPRM_INVALID_ID: 70003,

  RXN_AIPRM_INVALID_PROMPT_TITLE_LANG: 70100,
  RXN_AIPRM_INVALID_PROMPT_TEASER_LANG: 70101,
  RXN_AIPRM_INVALID_PROMPT_HINT_LANG: 70102,
  RXN_AIPRM_INVALID_PROMPT_TITLE_UPPERCASE: 70103,
  RXN_AIPRM_INVALID_PROMPT_TITLE_WORD_COUNT: 70104,
  RXN_AIPRM_INVALID_PROMPT_TEASER_UPPERCASE: 70105,
  RXN_AIPRM_INVALID_PROMPT_HINT_UPPERCASE: 70106,
  RXN_AIPRM_INVALID_PROMPT_TITLE_TOO_SHORT: 70112,

  RXN_AIPRM_LIST_NOT_FOUND: 70301,

  RXN_AIPRM_REFERRALS_NO_OFFER: 74001,
  RXN_AIPRM_REFERRALS_MAX_REDEMPTIONS: 74002,

  RXN_AIPRM_EXTENSION_INSTALL_CHATGPT: 70401,
	RXN_AIPRM_EXTENSION_UNINSTALL_CHATGPT: 70402,
	RXN_AIPRM_EXTENSION_INSTALL_CLAUDE: 70403,
	RXN_AIPRM_EXTENSION_UNINSTALL_CLAUDE: 70404,

  RXN_AIPRM_CHATGPT_ACCOUNT_CONNECTED: 70804,
  RXN_AIPRM_CHATGPT_ACCOUNT_DISCONNECTED: 70805,
  RXN_AIPRM_CLAUDE_ACCOUNT_CONNECTED: 70806,
  RXN_AIPRM_CLAUDE_ACCOUNT_DISCONNECTED: 70807,
  RXN_AIPRM_CHATGPT_ACCOUNT_CONNECTING: 70808,
  RXN_AIPRM_CLAUDE_ACCOUNT_CONNECTING: 70809,

  RXN_AIPRM_SIGNUP_MUST_CONFIRM_EMAIL: 70212,

  RXN_AIPRM_OAUTH2_INVALID_CODE: 70810,
  RXN_AIPRM_OAUTH2_PKCE_FAILED: 70811,
  RXN_AIPRM_OAUTH2_USER_NOT_FOUND: 70812,
  RXN_AIPRM_OAUTH2_EXCHANGE_FAILED: 70813,
  RXN_AIPRM_OAUTH2_EXCHANGE_NETWORK_ERROR: 70814,

  RXN_AIPRM_OAUTH2_CHATGPT_ACCOUNT_CONNECTED: 70815,
  RXN_AIPRM_OAUTH2_CHATGPT_ACCOUNT_DISCONNECTED: 70816,
  RXN_AIPRM_OAUTH2_CLAUDE_ACCOUNT_CONNECTED: 70817,
  RXN_AIPRM_OAUTH2_CLAUDE_ACCOUNT_DISCONNECTED: 70818,
  RXN_AIPRM_CHATGPT_ACCOUNT_DISCONNECTED_ANY: 70819,

  RXN_AIPRM_OAUTH2_USER_CANCELLED: 70820,
  RXN_AIPRM_OAUTH2_PAGE_LOAD_FAILED: 70821,
  RXN_AIPRM_OAUTH2_PAGE_LOAD_TIMEOUT: 70822,
  RXN_AIPRM_OAUTH2_INTERACTION_REQUIRED: 70823,
  RXN_AIPRM_OAUTH2_CANNOT_CREATE_WINDOW: 70824,
  RXN_AIPRM_OAUTH2_INCOGNITO: 70825,
  RXN_AIPRM_OAUTH2_INVALID_REDIRECT: 70826,
  RXN_AIPRM_OAUTH2_NO_RESPONSE: 70827,
  RXN_AIPRM_OAUTH2_NOT_CONFIGURED: 70828,
  RXN_AIPRM_OAUTH2_ALREADY_IN_PROGRESS: 70829,
  RXN_AIPRM_OAUTH2_STATE_MISMATCH: 70830,
  RXN_AIPRM_OAUTH2_NO_CODE: 70831,
  RXN_AIPRM_OAUTH2_TIMED_OUT: 70832,
  RXN_AIPRM_OAUTH2_UNKNOWN_ERROR: 70833,

  RXN_AIPRM_DOCUMENT_INDEX_NOT_FOUND: 80001,
  RXN_AIPRM_DOCUMENT_INDEX_INCORRECT_PLAN: 80005,
};

/** @enum {string} */
const ReactionMessage = {
  [ReactionNo.RXN_AIPRM_ACCESS_FORBIDDEN]:
    'The requested action is not allowed.',

  [ReactionNo.RXN_AIPRM_OVER_LIMIT_PROMPTS]:
    "You can only create new public prompts if all your public prompts have more than 5 upvotes.<br><br>You can only create new private prompts if you didn't reach the limit of max. allowed private prompts. <br><br> Please try again in a few seconds, in case you just unpublished or deleted another public prompt, or deleted another private prompt.",

  [ReactionNo.RXN_AIPRM_QUOTA_EXCEEDED]:
    'Quota exceeded - please upgrade your account.',

  [ReactionNo.RXN_AIPRM_INVALID_PROMPT_TITLE_LANG]:
    'The prompt title is not in English.',
  [ReactionNo.RXN_AIPRM_INVALID_PROMPT_TEASER_LANG]:
    'The prompt teaser is not in English.',
  [ReactionNo.RXN_AIPRM_INVALID_PROMPT_HINT_LANG]:
    'The prompt hint is not in English.',
  [ReactionNo.RXN_AIPRM_INVALID_PROMPT_TITLE_UPPERCASE]:
    'The prompt title has too many uppercase letters.',
  [ReactionNo.RXN_AIPRM_INVALID_PROMPT_TITLE_WORD_COUNT]:
    'The prompt title is too long.',
  [ReactionNo.RXN_AIPRM_INVALID_PROMPT_TEASER_UPPERCASE]:
    'The prompt teaser has too many uppercase letters.',
  [ReactionNo.RXN_AIPRM_INVALID_PROMPT_HINT_UPPERCASE]:
    'The prompt hint has too many uppercase letters.',
  [ReactionNo.RXN_AIPRM_INVALID_PROMPT_TITLE_TOO_SHORT]:
    'The prompt title is too short.',

  [ReactionNo.RXN_AIPRM_LIST_NOT_FOUND]: 'The list was not found.',

  [ReactionNo.RXN_AIPRM_SIGNUP_MUST_CONFIRM_EMAIL]:
    "You're almost there! Please check your email inbox and click the confirmation link we sent you.",

  [ReactionNo.RXN_AIPRM_OAUTH2_INVALID_CODE]:
    'Your connection request has expired. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_PKCE_FAILED]:
    'Something went wrong during the connection. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_USER_NOT_FOUND]:
    "We couldn't find your account. Please make sure you have an account at app.aiprm.com and try again.",
  [ReactionNo.RXN_AIPRM_OAUTH2_EXCHANGE_FAILED]:
    'Something went wrong during the connection. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_EXCHANGE_NETWORK_ERROR]:
    'A network error occurred while connecting your account. Please try again.',

  [ReactionNo.RXN_AIPRM_OAUTH2_USER_CANCELLED]:
    'Connection was cancelled. Click "Retry" when you\'re ready to try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_PAGE_LOAD_FAILED]:
    'The sign-in page could not be loaded. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_PAGE_LOAD_TIMEOUT]:
    'The sign-in page took too long to load. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_INTERACTION_REQUIRED]:
    'Sign-in requires your interaction. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_CANNOT_CREATE_WINDOW]:
    'Could not open the sign-in window. Please close some windows or tabs and try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_INCOGNITO]:
    'Account connection is not available in Incognito mode. Please use a regular browser window.',
  [ReactionNo.RXN_AIPRM_OAUTH2_INVALID_REDIRECT]:
    'Something went wrong during sign-in. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_NO_RESPONSE]:
    'No response was received from the sign-in page. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_NOT_CONFIGURED]:
    'Account connection is not available right now. Please try again later.',
  [ReactionNo.RXN_AIPRM_OAUTH2_ALREADY_IN_PROGRESS]:
    'A connection is already in progress. Please wait for it to complete.',
  [ReactionNo.RXN_AIPRM_OAUTH2_STATE_MISMATCH]:
    'The sign-in session could not be verified. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_NO_CODE]:
    'Sign-in did not complete. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_TIMED_OUT]:
    'The connection timed out. Please try again.',
  [ReactionNo.RXN_AIPRM_OAUTH2_UNKNOWN_ERROR]:
    'Something went wrong during the connection. Please try again.',

  [ReactionNo.RXN_AIPRM_DOCUMENT_INDEX_NOT_FOUND]:
    'Document Index does not exist.',

  [ReactionNo.RXN_AIPRM_DOCUMENT_INDEX_INCORRECT_PLAN]:
    'Incorrect subscription plan for Custom Index feature.',
};

class Reaction extends Error {
  /** @type {string} - mapped reaction message shown to user */
  message = '';

  /** @type {ReactionNo} - reaction number */
  ReactionNo;

  /** @param {string} message */
  constructor(message, ReactionNo) {
    super(message);

    this.message = message;
    this.ReactionNo = ReactionNo;
  }

  /**
   * Maps a ReactionNo to a ReactionMessage and returns a new Reaction
   *
   * @param {ReactionNo} currentReactionNo
   * @returns {Reaction}
   */
  static mapReactionNo(currentReactionNo) {
    return new Reaction(
      ReactionMessage[currentReactionNo]
        ? ReactionMessage[currentReactionNo]
        : 'Something went wrong, please try again later.',
      currentReactionNo
    );
  }
}

export { Reaction, ReactionNo, ReactionMessage };
