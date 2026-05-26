import { hideModal, svg } from './utils.js';
import {
  getAppLangCode,
  QuickStartOnboardingDarkURL,
  QuickStartOnboardingURL,
  QuickStartTutorialURL,
  TutorialsURL,
} from './config.js';

const onboardingShownKey = 'AIPRM_onboardingShown';
const onboardingModalID = 'onboardingModal';

const onboardingStrings = {
  en: {
    heading: 'AIPRM Quick start tutorial',
    viewTutorials: 'View tutorials',
    viewTutorialsTitle: 'View AIPRM tutorials for more information',
    getStarted: 'Get started with AIPRM',
    getStartedTitle: 'Close this dialog and start using AIPRM',
  },
  de: {
    heading: 'AIPRM Schnellstart-Anleitung',
    viewTutorials: 'Tutorials ansehen',
    viewTutorialsTitle: 'AIPRM-Tutorials für weitere Informationen ansehen',
    getStarted: 'Mit AIPRM starten',
    getStartedTitle: 'Diesen Dialog schließen und AIPRM nutzen',
  },
  es: {
    heading: 'Tutorial de inicio rápido de AIPRM',
    viewTutorials: 'Ver tutoriales',
    viewTutorialsTitle: 'Ver tutoriales de AIPRM para más información',
    getStarted: 'Comenzar con AIPRM',
    getStartedTitle: 'Cerrar este diálogo y comenzar a usar AIPRM',
  },
  fr: {
    heading: 'Tutoriel de démarrage rapide AIPRM',
    viewTutorials: 'Voir les tutoriels',
    viewTutorialsTitle: "Voir les tutoriels AIPRM pour plus d'informations",
    getStarted: 'Commencer avec AIPRM',
    getStartedTitle: 'Fermer cette fenêtre et commencer à utiliser AIPRM',
  },
  pt: {
    heading: 'Tutorial de início rápido do AIPRM',
    viewTutorials: 'Ver tutoriais',
    viewTutorialsTitle: 'Ver tutoriais do AIPRM para mais informações',
    getStarted: 'Começar com o AIPRM',
    getStartedTitle: 'Fechar este diálogo e começar a usar o AIPRM',
  },
};

function onboardingT(key) {
  return onboardingStrings[getAppLangCode()]?.[key] || onboardingStrings['en'][key];
}

const showOnboarding = (cacheBuster, isLinkedUser) => {
  if (!isLinkedUser) {
    return false;
  }

  const wasShown = getOnboardingShown();

  if (wasShown) {
    return false;
  }

  let modal = document.getElementById(onboardingModalID);

  // if modal does not exist, create it, add event listener on submit and append it to body
  if (!modal) {
    modal = document.createElement('div');
    modal.id = onboardingModalID;
    document.body.appendChild(modal);
  }

  modal.innerHTML = /*html*/ `
        <div class="AIPRM__fixed AIPRM__inset-0 AIPRM__text-center AIPRM__transition-opacity AIPRM__z-50">
            <div class="AIPRM__absolute AIPRM__bg-black/50 dark:AIPRM__bg-black/80 AIPRM__inset-0"></div>

            <div class="AIPRM__fixed AIPRM__inset-0 AIPRM__overflow-y-auto">
                <div class="AIPRM__fixed AIPRM__inset-0 AIPRM__text-center AIPRM__transition-opacity AIPRM__z-50">
                    <div class="AIPRM__flex AIPRM__items-center AIPRM__justify-center AIPRM__min-h-full">
                        <div class="AIPRM__align-center AIPRM__bg-white dark:AIPRM__bg-gray-900 dark:AIPRM__text-gray-200 AIPRM__inline-block AIPRM__overflow-hidden sm:AIPRM__rounded-lg AIPRM__shadow-xl sm:AIPRM__align-middle AIPRM__text-left AIPRM__transform AIPRM__transition-all"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                            <div class="AIPRM__bg-white dark:AIPRM__bg-gray-900 AIPRM__px-4 AIPRM__pt-5 AIPRM__pb-4 sm:AIPRM__p-6 sm:AIPRM__pb-4">
                                <div class="AIPRM__flex AIPRM__gap-4 AIPRM__border-b AIPRM__border-gray-200 dark:AIPRM__border-gray-700 AIPRM__my-4">
                                    <h3 class="AIPRM__m-0 AIPRM__text-gray-900 dark:AIPRM__text-gray-100 AIPRM__text-xl AIPRM__whitespace-nowrap">${onboardingT('heading')}</h3>
                                    <div class="AIPRM__text-right AIPRM__w-full">
                                        <button id="AIPRM__onboardingCloseButton">${svg(
                                          'CrossLarge'
                                        )}</button>
                                    </div>
                                </div>

                                <a href="${QuickStartTutorialURL}" target="_blank" rel="noopener noreferrer">
                                    <img src="${QuickStartOnboardingURL}?v=${cacheBuster}" title="${onboardingT('heading')}" alt="${onboardingT('heading')}" class="AIPRM__max-h-60vh AIPRM__my-4 dark:AIPRM__hidden" />
                                    <img src="${QuickStartOnboardingDarkURL}?v=${cacheBuster}" title="${onboardingT('heading')}" alt="${onboardingT('heading')}" class="AIPRM__max-h-60vh AIPRM__my-4 AIPRM__hidden dark:AIPRM__block" />
                                </a>
                            </div>

                            <div class="AIPRM__bg-gray-200 dark:AIPRM__bg-gray-850 AIPRM__px-4 AIPRM__py-3 AIPRM__text-right">
                                <a href="${TutorialsURL}" target="_blank" rel="noopener noreferrer" title="${onboardingT('viewTutorialsTitle')}"
                                    class="AIPRM__bg-blue-600 hover:AIPRM__bg-blue-700 AIPRM__mr-2 AIPRM__px-4 AIPRM__py-2 AIPRM__rounded AIPRM__text-white">${onboardingT('viewTutorials')}
                                </a>
                                <button id="AIPRM__onboardingOkButton" type="button" title="${onboardingT('getStartedTitle')}"
                                    class="AIPRM__bg-green-600 hover:AIPRM__bg-green-700 AIPRM__mr-2 AIPRM__px-4 AIPRM__py-2 AIPRM__rounded AIPRM__text-white">${onboardingT('getStarted')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  const keydownListener = (e) => {
    if (e.key === 'Escape') {
      finish();
    }
  };

  const finish = () => {
    hideModal(onboardingModalID);

    try {
      localStorage.setItem(onboardingShownKey, true);
    } catch (error) {
      console.error(
        'Could not update onboarding status in local storage',
        error
      );
    }

    document.removeEventListener('keydown', keydownListener);
  };

  const onboardingOkButton = document.getElementById(
    'AIPRM__onboardingOkButton'
  );
  onboardingOkButton.onclick = () => {
    finish();
  };

  const onboardingCloseButton = document.getElementById(
    'AIPRM__onboardingCloseButton'
  );
  onboardingCloseButton.onclick = () => {
    finish();
  };

  modal.style = 'display: block;';

  // add event listener to close the modal on ESC
  document.addEventListener('keydown', keydownListener);

  return true;
};

const getOnboardingShown = () => {
  try {
    return localStorage.getItem(onboardingShownKey) === 'true';
  } catch (error) {
    console.error('Could not get onboarding status from local storage', error);
  }

  return false;
};

export { showOnboarding };
