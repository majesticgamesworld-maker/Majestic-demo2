import { sanitizeInput } from './utils.js';

/** @enum {string} */
const ItemGroup = {
  MODELS: 'Models',
  FAVORITES: 'Favorites',
  CUSTOM_LISTS: 'Custom Lists',
  OWN: 'Own',
  PUBLIC: 'Public',
};

/** @enum {string} */
const ItemType = {
  PROMPT: 'prompt',
  MODEL: 'model',
};

// Prompt panel with quick search and selection of prompts in the chat input
export class PromptPanel {
  /**
   * @param {Element} inputField
   * @param {import("./list").Lists} lists
   * @param {import("./client").Quota} userQuota
   * @param {() => import('./inject').Prompt[]} getAllPromptsCallback
   * @param {(template: import('./inject').Prompt) => Promise<void>} selectPromptCallback
   * @param {string} triggerKey
   * @param {() => import('./inject').ModelConfig[]} getModelsConfigCallback
   */
  constructor(
    inputField,
    lists,
    userQuota,
    getAllPromptsCallback,
    selectPromptCallback,
    triggerKey,
    getModelsConfigCallback
  ) {
    if (!inputField?.parentNode?.parentNode) {
      console.error(
        'AIPRM Prompt Panel - input field not found/structure changed'
      );
      return;
    }

    this.inputField = inputField;

    this.promptPanel = document.getElementById('AIPRM__PromptPanel');

    this.getModelsConfigCallback = getModelsConfigCallback;

    // if prompt panel already exists, do not create another one
    if (this.promptPanel) {
      return;
    }

    // create the prompt panel container
    this.promptPanel = document.createElement('div');
    this.promptPanel.id = 'AIPRM__PromptPanel';
    this.promptPanel.classList =
      'AIPRM__absolute AIPRM__bottom-16 AIPRM__z-20 AIPRM__w-full AIPRM__space-y-2 AIPRM__hidden !AIPRM__-ml-4';

    this.promptPanel.innerHTML = /*html*/ `
          <div class="AIPRM__rounded-2xl AIPRM__border AIPRM__border-black/[0.1] dark:AIPRM__border-white/[0.1] AIPRM__p-2 AIPRM__shadow-lg AIPRM__bg-white dark:AIPRM__bg-gray-800">
            <input id="AIPRM__PromptPanel__search-input" autocomplete="off" placeholder="Search AIPRM prompts or models" class="AIPRM__mb-1 AIPRM__w-full AIPRM__border-0 AIPRM__white AIPRM__p-2 AIPRM__text-sm AIPRM__outline-none focus:AIPRM__outline-none focus:AIPRM__ring-0 focus:AIPRM__shadow-none focus:AIPRM__border-0 dark:AIPRM__bg-gray-800">
            <div class="AIPRM__prompt-list AIPRM__max-h-40 AIPRM__overflow-y-auto"></div>
          </div>`;

    // inject it before the parent node of the input field parent
    inputField.parentNode.parentNode.insertBefore(
      this.promptPanel,
      inputField.parentNode
    );

    this.triggerKey = triggerKey;

    this.searchInput = this.promptPanel.querySelector(
      '#AIPRM__PromptPanel__search-input'
    );

    this.promptList = this.promptPanel.querySelector('.AIPRM__prompt-list');

    this.getAllPrompts = getAllPromptsCallback;
    this.selectPromptCallback = selectPromptCallback;

    /**
     * @typedef {import("./inject").Prompt & { Group: ItemGroup, Type?: ItemType }} ItemWithGroup
     */

    /** @type {ItemWithGroup[]} */
    this.prompts = [];

    // Models that matched search
    /** @type {ItemWithGroup[]} */
    this.models = [];

    // Final rendered items (models + prompts)
    /** @type {ItemWithGroup[]} */
    this.renderedItems = [];

    this.lists = lists;
    this.userQuota = userQuota;

    this.selectedIndex = -1;
    this.debounceTimer = null;

    this.inputField.addEventListener('input', this.handleInput.bind(this));

    this.searchInput.addEventListener(
      'input',
      this.handleSearchInput.bind(this)
    );
    this.searchInput.addEventListener(
      'keydown',
      this.handleSearchInputKeyDown.bind(this)
    );
    this.searchInput.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    this.handleDocumentClickBound = this.handleDocumentClick.bind(this);
  }

  // show/hide prompt panel based on input
  handleInput() {
    const query =
      this.inputField.tagName === 'TEXTAREA'
        ? this.inputField.value
        : this.inputField.innerText;

    if (query.startsWith(this.triggerKey) && query.length === 1) {
      this.showPromptPanel();
      this.focusSearchInput();

      // update textarea value
      this.inputField.tagName === 'TEXTAREA'
        ? (this.inputField.value = query)
        : (this.inputField.innerText = query);
    }
  }

  // search prompts based on input with debounce
  handleSearchInput() {
    const query = this.searchInput.value;

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.searchPrompts(query);
    }, 300);
  }

  // handle keyboard navigation in prompt panel and apply selected prompt or hide panel
  handleSearchInputKeyDown(event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectPreviousPrompt();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectNextPrompt();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.applySelectedPrompt();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.hidePromptPanel();
    } else if (event.key === 'Backspace' && this.searchInput.value === '') {
      event.preventDefault();
      this.hidePromptPanel();
    }
  }

  // search Models and Prompts based on query, then unify them for final rendering
  async searchPrompts(query) {
    // Filter models by search query
    this.models = this.getModelsConfigCallback()
      .filter(
        (model) =>
          !query ||
          model.ID.toLowerCase().includes(query.toLowerCase()) ||
          model.Title.toLowerCase().includes(query.toLowerCase()) ||
          model.Description.toLowerCase().includes(query.toLowerCase())
      )
      // add Type and group to models
      .map((model) => {
        model.Type = ItemType.MODEL;
        model.Group = ItemGroup.MODELS;
        return model;
      });

    // 2) Filter prompts based on query
    //    (the existing approach)
    /** @type {PromptWithGroup[]} */
    let allPrompts = this.getAllPrompts().filter(
      (prompt) =>
        !query || prompt.Title.toLowerCase().includes(query.toLowerCase())
    );

    // get hidden, favorites, custom lists and the prompts in them
    const hidden = (await this.lists.getHidden()?.getPromptIDS()) || [];
    const favorites = (await this.lists.getFavorites()?.getPromptIDS()) || [];
    let customLists = this.lists.getCustom(this.userQuota);

    customLists =
      (
        await Promise.all(
          customLists.map(async (list) => await list.getPromptIDS())
        )
      )?.flat() || [];

    // remove hidden prompts
    if (hidden.length > 0) {
      allPrompts = allPrompts.filter((prompt) => !hidden.includes(prompt.ID));
    }

    // define "group" for each prompt - Favorites, Custom Lists, Own, Public
    if (favorites.length > 0 || customLists.length > 0) {
      allPrompts = allPrompts.map((prompt) => {
        if (favorites.includes(prompt.ID)) {
          prompt.Group = ItemGroup.FAVORITES;
        } else if (customLists.includes(prompt.ID)) {
          prompt.Group = ItemGroup.CUSTOM_LISTS;
        } else {
          prompt.Group = prompt.OwnPrompt ? ItemGroup.OWN : ItemGroup.PUBLIC;
        }
        prompt.Type = ItemType.PROMPT;
        return prompt;
      });
    } else {
      // only show Own and Public prompts if there are no favorites or custom lists
      allPrompts = allPrompts.map((prompt) => {
        prompt.Group = prompt.OwnPrompt ? ItemGroup.OWN : ItemGroup.PUBLIC;
        prompt.Type = ItemType.PROMPT;
        return prompt;
      });
    }

    // sort by Group - Models (first), then Favorites, Custom Lists, Own, Public
    // We'll handle the "Models" group separately or put them at top anyway
    // but let's just finish sorting for the prompt items themselves:
    allPrompts = allPrompts.sort((a, b) => {
      // We only sort among the prompts themselves
      if (a.Group === b.Group) {
        return 0;
      }
      if (a.Group === ItemGroup.FAVORITES) {
        return -1;
      }
      if (b.Group === ItemGroup.FAVORITES) {
        return 1;
      }
      if (a.Group === ItemGroup.CUSTOM_LISTS) {
        return -1;
      }
      if (b.Group === ItemGroup.CUSTOM_LISTS) {
        return 1;
      }
      if (a.Group === ItemGroup.OWN) {
        return -1;
      }
      if (b.Group === ItemGroup.OWN) {
        return 1;
      }
      return 0;
    });

    // limit the number of prompts to show (10) so as not to reduce or increase
    allPrompts = allPrompts.slice(0, 10);
    this.prompts = allPrompts;

    // 3) Combine Models (unlimited) + sorted limited Prompts for final rendering
    //    Models should appear on top in "Models" section
    this.renderedItems = [...this.models, ...this.prompts];

    // 4) Render them
    this.renderPrompts();

    // 5) Select the first item, if any
    this.selectPrompt(0);
  }

  // render models + prompts in the panel
  renderPrompts() {
    this.promptList.innerHTML = '';

    if (this.renderedItems.length === 0) {
      this.promptList.innerHTML =
        '<div class="AIPRM__px-4 AIPRM__py-2 AIPRM__text-gray-600">No matches found.</div>';
      return;
    }

    let currentGroup = '';
    let index = 0;

    this.renderedItems.forEach((item) => {
      // Check if group changed
      if (item.Group !== currentGroup) {
        currentGroup = item.Group;
        const groupElement = document.createElement('div');
        groupElement.className =
          'AIPRM__px-2 AIPRM__py-1 AIPRM__text-xs AIPRM__font-semibold AIPRM__text-gray-500';
        groupElement.textContent = currentGroup;
        this.promptList.appendChild(groupElement);
      }

      const itemElement = document.createElement('div');
      itemElement.tabIndex = index;
      itemElement.className =
        'AIPRM__group AIPRM__flex AIPRM__h-10 AIPRM__items-center AIPRM__gap-2 AIPRM__rounded-lg AIPRM__px-2 AIPRM__font-medium hover:AIPRM__bg-gray-100 AIPRM__text-sm AIPRM__text-gray-950 dark:AIPRM__text-gray-100 dark:hover:AIPRM__bg-gray-600';

      // For "model" items, we have Title + Description
      // For "prompt" items, we have Title + optional Author
      if (item.Type === ItemType.MODEL) {
        // Model item
        itemElement.innerHTML = `
          <div class="AIPRM__flex AIPRM__h-fit AIPRM__grow AIPRM__flex-row AIPRM__justify-between AIPRM__space-x-2 AIPRM__overflow-hidden AIPRM__text-ellipsis AIPRM__whitespace-nowrap">
            <div class="AIPRM__flex AIPRM__flex-row AIPRM__space-x-2 AIPRM__truncate">
              <span class="AIPRM__truncate dark:AIPRM__text-gray-100 AIPRM__shrink-0 AIPRM__max-w-full">${sanitizeInput(
                item.Title
              )}</span>
              ${
                item.Description
                  ? `<span class="AIPRM__flex-grow AIPRM__truncate AIPRM__text-sm AIPRM__font-light AIPRM__text-gray-400 sm:AIPRM__max-w-xs lg:AIPRM__max-w-md AIPRM__hidden sm:AIPRM__block">${sanitizeInput(
                      item.Description
                    )}</span>`
                  : ''
              }
            </div>
          </div>
        `;
      } else {
        // Prompt item
        itemElement.innerHTML = `
          <div class="AIPRM__flex AIPRM__h-fit AIPRM__grow AIPRM__flex-row AIPRM__justify-between AIPRM__space-x-2 AIPRM__overflow-hidden AIPRM__text-ellipsis AIPRM__whitespace-nowrap">
            <div class="AIPRM__flex AIPRM__flex-row AIPRM__space-x-2 AIPRM__truncate">
              <span class="AIPRM__truncate dark:AIPRM__text-gray-100 AIPRM__shrink-0 AIPRM__max-w-full">${sanitizeInput(
                item.Title
              )}</span>
              ${
                item.AuthorName
                  ? `<span class="AIPRM__flex-grow AIPRM__truncate AIPRM__text-sm AIPRM__font-light AIPRM__text-gray-400 sm:AIPRM__max-w-xs lg:AIPRM__max-w-md AIPRM__hidden sm:AIPRM__block">by ${sanitizeInput(
                      item.AuthorName
                    )}</span>`
                  : ''
              }
            </div>
          </div>
        `;
      }

      const itemIndex = index;

      // On click, apply / select
      itemElement.addEventListener('click', () => {
        this.selectPrompt(itemIndex);
        this.applySelectedPrompt();
      });

      this.promptList.appendChild(itemElement);
      index++;
    });
  }

  // hide prompt panel when clicked outside
  handleDocumentClick(event) {
    if (!this.promptPanel.contains(event.target)) {
      this.hidePromptPanel();
    }
  }

  // show prompt panel and search items based on input
  async showPromptPanel() {
    this.promptPanel.classList.remove('AIPRM__hidden');
    await this.searchPrompts(this.searchInput.value);

    document.addEventListener('click', this.handleDocumentClickBound);
  }

  // hide prompt panel and reset selected index
  hidePromptPanel() {
    this.promptPanel.classList.add('AIPRM__hidden');
    this.selectedIndex = -1;
    this.searchInput.value = '';
    this.inputField.focus();

    document.removeEventListener('click', this.handleDocumentClickBound);
  }

  // focus on search input and set cursor at the end
  focusSearchInput() {
    this.searchInput.focus();
    this.searchInput.selectionStart = this.searchInput.selectionEnd =
      this.searchInput.value.length;
  }

  // select previous item (model or prompt)
  selectPreviousPrompt() {
    if (this.selectedIndex > 0) {
      this.selectPrompt(this.selectedIndex - 1);
    }
  }

  // select next item (model or prompt)
  selectNextPrompt() {
    if (this.selectedIndex < this.renderedItems.length - 1) {
      this.selectPrompt(this.selectedIndex + 1);
    }
  }

  // select an item in the panel based on index and scroll to it
  selectPrompt(index) {
    const promptItems = this.promptPanel.querySelectorAll('.AIPRM__group');

    if (this.selectedIndex !== -1) {
      promptItems?.[this.selectedIndex]?.classList?.remove(
        'AIPRM__bg-gray-100',
        'dark:AIPRM__bg-gray-600'
      );
    }

    this.selectedIndex = index;

    if (this.selectedIndex >= 0 && promptItems[this.selectedIndex]) {
      promptItems[this.selectedIndex].classList.add(
        'AIPRM__bg-gray-100',
        'dark:AIPRM__bg-gray-600'
      );

      this.scrollToSelectedPrompt();
    }
  }

  // scroll to selected item in the panel
  scrollToSelectedPrompt() {
    const promptItems = this.promptList.querySelectorAll('.AIPRM__group');
    const selectedPrompt = promptItems?.[this.selectedIndex];

    if (this.selectedIndex === 0) {
      this.promptList.scrollTop = 0;
    } else {
      selectedPrompt?.scrollIntoView({ block: 'nearest' });
    }
  }

  // apply selected item (model or prompt) and hide prompt panel
  applySelectedPrompt() {
    if (this.selectedIndex !== -1) {
      const selectedItem = this.renderedItems[this.selectedIndex];

      // If it's a model selection, navigate to ?model=...
      if (selectedItem.Type === ItemType.MODEL) {
        // Keep AIPRM_PromptID if present
        const currentParams = new URLSearchParams(window.location.search);
        // set or overwrite model param
        currentParams.set('model', selectedItem.ID);

        // Rebuild final query
        window?.__reactRouterDataRouter?.navigate?.(
          '?' + currentParams.toString()
        );

        // Clear the chat input field
        this.inputField.tagName === 'TEXTAREA'
          ? (this.inputField.value = '')
          : (this.inputField.innerText = '');

        // Hide
        this.hidePromptPanel();

        return;
      }

      // Otherwise, it's a prompt -> use existing logic
      this.selectPromptCallback(selectedItem);

      // Clear the chat input field
      this.inputField.tagName === 'TEXTAREA'
        ? (this.inputField.value = '')
        : (this.inputField.innerText = '');

      this.hidePromptPanel();
    }
  }
}
