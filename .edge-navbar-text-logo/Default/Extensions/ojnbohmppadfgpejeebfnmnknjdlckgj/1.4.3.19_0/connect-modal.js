import { AccessTypeNo, NotificationSeverity } from './enums.js';
import { getAppLangCode, replaceEnvironmentURLs } from './config.js';
import { replaceLegalURLs } from './utils.js';

const CONNECT_MODAL_ID = 'connectModal';
const CONNECT_MODAL_MESSAGE_PARENT_ID = 'connectModalMessageParent';
const CONNECT_MODAL_MESSAGE_ID = 'connectModalMessage';
const CONNECT_MODAL_TITLE_ID = 'connectModalTitle';
const CONNECT_MODAL_SPINNER_ID = 'connectModalSpinner';
const CONNECT_MODAL_BUTTONS_ID = 'connectModalButtons';
const CONNECT_MODAL_CONNECT_ID = 'connectModalConnect';
const CONNECT_MODAL_RETRY_ID = 'connectModalRetry';
const CONNECT_MODAL_START_ID = 'connectModalStart';
const CONNECT_MODAL_CANCEL_ID = 'connectModalCancel';

export class ConnectModalHelper {
  /** @type {import('./config.js').Config} */
  #config;

  /** @type {import('./auth.js').OAuth2} */
  #oauth2;

  /** @type {string} */
  #lastDisconnectKey;

  /** @type {import('./client.js').User} */
  #user;

  /** @type {Object|null} */
  #selectedVariant = null;

  /**
   * @param {import('./config.js').Config} config
   * @param {import('./auth.js').OAuth2} oauth2
   * @param {string} lastDisconnectKey
   * @param {import('./client.js').User} user
   */
  constructor(config, oauth2, lastDisconnectKey, user) {
    this.#config = config;
    this.#oauth2 = oauth2;
    this.#lastDisconnectKey = lastDisconnectKey;
    this.#user = user;
  }

  /**
   * Select and cache a variant based on user locale and config.
   *
   * @returns {Object|null}
   */
  getVariant() {
    if (this.#selectedVariant) {
      return this.#selectedVariant;
    }

    const oauth2Config = this.#config?.getOAuth2FeatureConfig?.() ?? null;

    if (!oauth2Config?.Config?.ConnectVariants) {
      return null;
    }

    const connectVariants = oauth2Config.Config.ConnectVariants;
    const lang = getAppLangCode();

    let variants = connectVariants[lang];
    if (!variants || !variants.length) {
      variants = connectVariants['en'];
    }

    if (!variants || !variants.length) {
      return null;
    }

    this.#selectedVariant =
      variants[Math.floor(Math.random() * variants.length)];

    return this.#selectedVariant;
  }

  /**
   * Show OAuth2 connect modal
   */
  showModal() {
    const variant = this.getVariant();

    if (variant) {
      this.showModalInternal(variant, true);
    }
  }

  isReconnectCooloff() {
    if (!this.#lastDisconnectKey) {
      return false;
    }

    const oauth2Config = this.#config?.getOAuth2FeatureConfig?.() ?? null;
    const reconnectCoolOffPeriod =
      oauth2Config?.Config?.ReconnectCoolOffPeriod || 300; //default 300s

    const lastDisconnect = localStorage.getItem(this.#lastDisconnectKey);
    if (lastDisconnect) {
      const lastDisconnectTime = new Date(lastDisconnect);
      const expiresAt = new Date(
        lastDisconnectTime.getTime() + reconnectCoolOffPeriod * 1000
      );
      const now = new Date();

      if (now < expiresAt) {
        return true;
      } else {
        localStorage.removeItem(this.#lastDisconnectKey);
        return false;
      }
    }

    return false;
  }

  replaceParamPlaceholders(text) {
    if (!text) {
      return '';
    }

    if (!this.#user) {
      return '';
    }

    let updatedText = text;
    updatedText = updatedText.replaceAll(
      '{{OperatorERID}}',
      this.#user.OperatorERID
    );
    updatedText = updatedText.replaceAll(
      '{{OperatorPlanType}}',
      this.#user.OperatorPlanType
    );
    updatedText = updatedText.replaceAll(
      '{{SystemNo}}',
      this.#user.SystemNo
    );

    return updatedText;
  }

  /**
   * Show modal with message and action URL to redirect user to after clicking on "Continue" button
   *
   * @param {Object} messageVariant
   * @param {boolean} showMessages
   */
  showModalInternal(messageVariant, showMessages = false) {
    let modal = document.getElementById(CONNECT_MODAL_ID);

    // if modal does not exist, create it, add event listener on submit and append it to body
    if (!modal) {
      modal = document.createElement('div');
      modal.id = CONNECT_MODAL_ID;

      document.body.appendChild(modal);
    }

    const isReconnectCooloff = this.isReconnectCooloff();
    const hideCancel = !isReconnectCooloff && this.#oauth2?.isConnectRequired();

    modal.innerHTML = /*html*/ `
      <style>
        @keyframes connectModalSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="AIPRM__fixed AIPRM__inset-0 AIPRM__text-center AIPRM__transition-opacity" style="z-index:10000">
        <div class="AIPRM__absolute AIPRM__bg-black/50 dark:AIPRM__bg-black/80 AIPRM__inset-0">
        </div>

        <div class="AIPRM__fixed AIPRM__inset-0 AIPRM__overflow-y-auto">
          <div class="AIPRM__flex AIPRM__items-center AIPRM__justify-center AIPRM__min-h-full">
            <div
              class="AIPRM__align-center AIPRM__bg-white dark:AIPRM__bg-gray-900 dark:AIPRM__text-gray-200 AIPRM__inline-block AIPRM__overflow-hidden sm:AIPRM__rounded-lg AIPRM__shadow-xl sm:AIPRM__align-middle sm:AIPRM__max-w-lg sm:AIPRM__my-8 sm:AIPRM__w-full AIPRM__text-left AIPRM__transform AIPRM__transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline">

              ${
                hideCancel
                  ? replaceEnvironmentURLs(replaceLegalURLs(this.replaceParamPlaceholders(
                      messageVariant?.ConnectRequired
                    ), this.#config, this.#user?.Reseller))
                  : replaceEnvironmentURLs(replaceLegalURLs(this.replaceParamPlaceholders(
                      messageVariant?.ConnectOptional
                    ), this.#config, this.#user?.Reseller))
              }

              <div id="${CONNECT_MODAL_MESSAGE_PARENT_ID}" class="AIPRM__bg-white dark:AIPRM__bg-gray-900 AIPRM__px-4 AIPRM__pt-5 AIPRM__pb-4 sm:AIPRM__p-6 sm:AIPRM__pb-4">
                <div id="${CONNECT_MODAL_TITLE_ID}">${replaceEnvironmentURLs(replaceLegalURLs(messageVariant.Title, this.#config, this.#user?.Reseller))}</div>
                <div id="${CONNECT_MODAL_MESSAGE_ID}" class="AIPRM__my-4">${replaceEnvironmentURLs(replaceLegalURLs(messageVariant.Body, this.#config, this.#user?.Reseller))}</div>
                <div id="${CONNECT_MODAL_SPINNER_ID}" class="AIPRM__hidden" style="display:none; justify-content:center; padding:12px 0;">
                  <div style="width:36px; height:36px; border:4px solid rgba(0,0,0,0.1); border-top-color:#10b981; border-radius:50%; animation:connectModalSpin 0.8s linear infinite;"></div>
                </div>
              </div>

              <div id="${CONNECT_MODAL_BUTTONS_ID}" class="AIPRM__bg-gray-200 dark:AIPRM__bg-gray-850 AIPRM__px-4 AIPRM__py-3 AIPRM__text-right">
                ${
                  hideCancel
                    ? ''
                    : '<button id="' +
                      CONNECT_MODAL_CANCEL_ID +
                      '" type="button" class="AIPRM__bg-gray-600 hover:AIPRM__bg-gray-800 AIPRM__mr-2 AIPRM__px-4 AIPRM__py-2 AIPRM__rounded AIPRM__text-white">' +
                      messageVariant.CancelButton +
                      '</button>'
                }  
              
                <button id="${CONNECT_MODAL_CONNECT_ID}" onclick="window.AIPRM.oauth2Login();" class="AIPRM__bg-green-600 hover:AIPRM__bg-green-700 AIPRM__mr-2 AIPRM__px-4 AIPRM__py-2 AIPRM__rounded AIPRM__text-white">${messageVariant.ConnectButton}</button>
                <button id="${CONNECT_MODAL_RETRY_ID}" onclick="window.AIPRM.oauth2Login();" class="AIPRM__hidden AIPRM__bg-green-600 hover:AIPRM__bg-green-700 AIPRM__mr-2 AIPRM__px-4 AIPRM__py-2 AIPRM__rounded AIPRM__text-white">${messageVariant.RetryButton}</button>
                <button id="${CONNECT_MODAL_START_ID}" class="AIPRM__hidden AIPRM__bg-green-600 hover:AIPRM__bg-green-700 AIPRM__mr-2 AIPRM__px-4 AIPRM__py-2 AIPRM__rounded AIPRM__text-white">${messageVariant.StartButton}</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    // add event listener to close the modal on ESC
    const keydownListener = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (!hideCancel) {
      document.addEventListener('keydown', keydownListener);
    }

    // close modal
    const closeModal = () => {
      window.AIPRM.hideModal(CONNECT_MODAL_ID, showMessages);
      document.removeEventListener('keydown', keydownListener);
    };

    const startButton = document.getElementById(CONNECT_MODAL_START_ID);
    if (startButton) {
      startButton.addEventListener('click', closeModal);
    }

    const cancelButton = document.getElementById(CONNECT_MODAL_CANCEL_ID);
    if (cancelButton) {
      cancelButton.addEventListener('click', closeModal);
    }

    // show modal
    modal.style = 'display: block;';

    // Track connect CTA shown
    window.AIPRM?.trackConnectEvent?.(AccessTypeNo.ConnectCTAShown);
  }

  /**
   * @param {NotificationSeverity} severity
   * @param {string} message
   * @param {string} [title] - optional title HTML to replace the modal title
   */
  updateState(severity = NotificationSeverity.SUCCESS, message, title) {
    const messageParentElement = document.getElementById(
      CONNECT_MODAL_MESSAGE_PARENT_ID
    );
    if (messageParentElement) {
      // Reset all severity backgrounds
      messageParentElement.classList.remove(
        'AIPRM__bg-green-500',
        'AIPRM__bg-orange-500',
        'AIPRM__bg-red-500'
      );

      if (severity === NotificationSeverity.SUCCESS) {
        messageParentElement.classList.add('AIPRM__bg-green-500');
        messageParentElement.classList.remove(
          'AIPRM__bg-white',
          'dark:AIPRM__bg-gray-900'
        );
      } else if (severity === NotificationSeverity.WARNING) {
        messageParentElement.classList.add('AIPRM__bg-orange-500');
        messageParentElement.classList.remove(
          'AIPRM__bg-white',
          'dark:AIPRM__bg-gray-900'
        );
      } else if (severity === NotificationSeverity.ERROR) {
        messageParentElement.classList.add('AIPRM__bg-red-500');
        messageParentElement.classList.remove(
          'AIPRM__bg-white',
          'dark:AIPRM__bg-gray-900'
        );
      } else {
        messageParentElement.classList.add(
          'AIPRM__bg-white',
          'dark:AIPRM__bg-gray-900'
        );
      }
    }

    if (title) {
      const titleElement = document.getElementById(CONNECT_MODAL_TITLE_ID);
      if (titleElement) {
        titleElement.innerHTML = title;
      }
    }

    const messageElement = document.getElementById(CONNECT_MODAL_MESSAGE_ID);
    if (messageElement) {
      messageElement.innerHTML = message;
    }

    // Toggle spinner: show during INFO (loading), hide otherwise
    const spinnerElement = document.getElementById(CONNECT_MODAL_SPINNER_ID);
    if (spinnerElement) {
      if (severity === NotificationSeverity.INFO) {
        spinnerElement.classList.remove('AIPRM__hidden');
        spinnerElement.style.display = 'flex';
      } else {
        spinnerElement.classList.add('AIPRM__hidden');
        spinnerElement.style.display = 'none';
      }
    }

    const connectButton = document.getElementById(CONNECT_MODAL_CONNECT_ID);
    if (connectButton) {
      connectButton.classList.add('AIPRM__hidden');
    }

    const cancelButton = document.getElementById(CONNECT_MODAL_CANCEL_ID);
    if (cancelButton) {
      if (
        severity === NotificationSeverity.WARNING ||
        severity === NotificationSeverity.ERROR
      ) {
        cancelButton.classList.remove('AIPRM__hidden');
      } else {
        cancelButton.classList.add('AIPRM__hidden');
      }
    }

    const startButton = document.getElementById(CONNECT_MODAL_START_ID);
    if (startButton) {
      if (severity === NotificationSeverity.SUCCESS) {
        startButton.classList.remove('AIPRM__hidden');
      } else {
        startButton.classList.add('AIPRM__hidden');
      }
    }

    const connectRetryButton = document.getElementById(CONNECT_MODAL_RETRY_ID);
    if (connectRetryButton) {
      if (
        severity === NotificationSeverity.WARNING ||
        severity === NotificationSeverity.ERROR
      ) {
        connectRetryButton.classList.remove('AIPRM__hidden');
      } else {
        connectRetryButton.classList.add('AIPRM__hidden');
      }
    }

    const buttonsElement = document.getElementById(CONNECT_MODAL_BUTTONS_ID);
    if (buttonsElement) {
      if (severity === NotificationSeverity.INFO) {
        buttonsElement.classList.add('AIPRM__hidden');
      } else {
        buttonsElement.classList.remove('AIPRM__hidden');
      }
    }
  }
}
