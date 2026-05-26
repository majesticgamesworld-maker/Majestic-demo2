import { AnonOperatorERIDPrefix } from './config.js';
import { SystemNo } from './enums.js';
import { ReactionNo } from './rxn.js';
import { getUserOpenAI } from './utils.js';

export class OAuth2 {
  /**
   * @param {import('./client.js').AIPRMClient} client
   * @param {import('./config.js').Config} config
   */
  constructor(client, config) {
    this.client = client;
    this.config = config;
  }

  // --- Protocol ---

  /**
   * Send a message to the background script and wait for a response event.
   * @param {string} eventName - CustomEvent name to listen for (e.g. 'AIPRM.oauth2LoginResult')
   * @param {object} messageData - data payload for window.postMessage
   * @param {number} timeoutMs - timeout in milliseconds
   * @param {{success: boolean, rxn?: number}} timeoutResult - value to resolve with on timeout
   * @returns {Promise<object>}
   */
  sendAndAwaitEvent(eventName, messageData, timeoutMs, timeoutResult) {
    return new Promise((resolve) => {
      const handler = (event) => {
        document.removeEventListener(eventName, handler);
        resolve(event.detail);
      };

      document.addEventListener(eventName, handler);

      window.postMessage(
        { from: 'AIPRM', data: messageData },
        window.location.origin
      );

      setTimeout(() => {
        document.removeEventListener(eventName, handler);
        resolve(timeoutResult);
      }, timeoutMs);
    });
  }

  /**
   * Initiate OAuth2 login via background script
   * @returns {Promise<{success: boolean, tokens?: {AccessToken: string, RefreshToken: string, UserERID: string, Email: string}, rxn?: number}>}
   */
  initiateLogin() {
    if (!this.isEnabled()) {
      return Promise.resolve({
        success: false,
        rxn: ReactionNo.RXN_AIPRM_OAUTH2_NOT_CONFIGURED,
      });
    }

    const lang = (navigator.language || 'en').split('-')[0];

    return this.sendAndAwaitEvent(
      'AIPRM.oauth2LoginResult',
      { type: 'AIPRM.oauth2Login', lang },
      300000,
      { success: false, rxn: ReactionNo.RXN_AIPRM_OAUTH2_TIMED_OUT }
    );
  }

  // --- Rollout ---

  /**
   * @param {string} OperatorERID
   * @returns {number|null}
   */
  getRolloutBucket(OperatorERID) {
    if (!OperatorERID) {
      return null;
    }

    let hash = 0;
    for (let i = 0; i < OperatorERID.length; i++) {
      hash = (hash * 31 + OperatorERID.charCodeAt(i)) >>> 0;
    }

    return hash % 100;
  }

  /** @returns {{OperatorERID: string, SystemNo: number}|null} */
  getCurrentOperatorContext() {
    const userOpenAI = getUserOpenAI();

    if (userOpenAI?.id) {
      console.log(
        '[AIPRM OAuth2 rollout] operator context from ChatGPT session',
        {
          OperatorERID: userOpenAI.id,
          SystemNo: SystemNo.CHATGPT,
        }
      );
      return {
        OperatorERID: userOpenAI.id,
        SystemNo: SystemNo.CHATGPT,
      };
    }

    if (this.client.User?.OperatorERID && this.client.User?.SystemNo) {
      console.log('[AIPRM OAuth2 rollout] operator context from Client.User', {
        OperatorERID: this.client.User.OperatorERID,
        SystemNo: this.client.User.SystemNo,
      });
      return {
        OperatorERID: this.client.User.OperatorERID,
        SystemNo: this.client.User.SystemNo,
      };
    }

    console.warn('[AIPRM OAuth2 rollout] operator context unavailable');
    return null;
  }

  /** @returns {import('./config.js').OAuth2FeatureConfig|null} */
  getFeatureConfig() {
    return this.config?.getOAuth2FeatureConfig?.() ?? null;
  }

  /** @returns {boolean} */
  isEnabled() {
    return this.getFeatureConfig()?.Enabled ?? false;
  }

  /** @returns {import('./config.js').OAuth2FeatureConfig['Config']['Rollout']|undefined} */
  getRolloutConfig() {
    return this.getFeatureConfig()?.Config?.Rollout;
  }

  /** @returns {string} */
  getCurrentOperatorERID() {
    return (
      this.client.User?.OperatorERID ||
      this.getCurrentOperatorContext()?.OperatorERID ||
      ''
    );
  }

  /**
   * @param {string} OperatorERID
   * @param {number} rolloutPercent
   * @param {string} rolloutName
   * @returns {boolean}
   */
  isOperatorInRolloutCohort(OperatorERID, rolloutPercent, rolloutName) {
    if (rolloutPercent >= 100) {
      console.log('[AIPRM OAuth2 rollout] rollout percent includes all users', {
        rolloutName,
        rolloutPercent,
      });
      return true;
    }

    const rolloutBucket = this.getRolloutBucket(OperatorERID);
    const inCohort = rolloutBucket !== null && rolloutBucket < rolloutPercent;

    console.log('[AIPRM OAuth2 rollout] cohort evaluation', {
      rolloutName,
      OperatorERID,
      rolloutBucket,
      rolloutPercent,
      inCohort,
    });

    return inCohort;
  }

  /** @returns {boolean} */
  isLinkingEligible() {
    if (!this.isEnabled()) {
      console.log('[AIPRM OAuth2 rollout] OAuth2 disabled');
      return false;
    }

    if (this.client.User?.IsLinked === true) {
      console.log(
        '[AIPRM OAuth2 rollout] skipping cohort check for linked user'
      );
      return false;
    }

    const OperatorERID = this.getCurrentOperatorERID();

    if (!OperatorERID) {
      console.log(
        '[AIPRM OAuth2 rollout] OperatorERID unavailable, skipping rollout'
      );
      return false;
    }

    const isAnonOperator = OperatorERID.startsWith(AnonOperatorERIDPrefix);
    const rollout = this.getRolloutConfig();

    const rolloutPercent = isAnonOperator
      ? (rollout?.Linking?.AnonOperator ?? 0)
      : (rollout?.Linking?.KnownOperator ?? 0);

    if (rolloutPercent <= 0) {
      console.log('[AIPRM OAuth2 rollout] linking rollout disabled', {
        isAnonOperator,
        rolloutPercent,
      });
      return false;
    }

    return this.isOperatorInRolloutCohort(
      OperatorERID,
      rolloutPercent,
      isAnonOperator ? 'LinkingAnonOperator' : 'LinkingKnownOperator'
    );
  }

  /** @returns {boolean} */
  isConnectRequired() {
    if (!this.isEnabled()) {
      console.log(
        '[AIPRM OAuth2 rollout] connect required disabled because OAuth2 is disabled'
      );
      return false;
    }

    if (this.client.User?.IsLinked === true) {
      console.log(
        '[AIPRM OAuth2 rollout] connect required skipped for linked user'
      );
      return false;
    }

    const OperatorERID = this.getCurrentOperatorERID();

    if (!OperatorERID) {
      console.log(
        '[AIPRM OAuth2 rollout] OperatorERID unavailable, skipping connect required rollout'
      );
      return false;
    }

    const isAnonOperator = OperatorERID.startsWith(AnonOperatorERIDPrefix);
    const rollout = this.getRolloutConfig();
    const rolloutPercent = isAnonOperator
      ? (rollout?.ConnectRequired?.AnonOperator ?? 0)
      : (rollout?.ConnectRequired?.KnownOperator ?? 0);

    if (rolloutPercent <= 0) {
      console.log('[AIPRM OAuth2 rollout] connect required rollout disabled', {
        isAnonOperator,
        rolloutPercent,
      });
      return false;
    }

    return this.isOperatorInRolloutCohort(
      OperatorERID,
      rolloutPercent,
      isAnonOperator
        ? 'ConnectRequiredAnonOperator'
        : 'ConnectRequiredKnownOperator'
    );
  }
}
