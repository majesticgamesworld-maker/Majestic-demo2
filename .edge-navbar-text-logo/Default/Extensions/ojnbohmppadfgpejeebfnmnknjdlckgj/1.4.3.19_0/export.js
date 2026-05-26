import { ExportFilePrefix, ExportHeaderPrefix } from './config.js';

import { getUserOpenAI } from './utils.js';

/**
 * The Exporter class provides functionality to export the current chat as a markdown file.
 *
 * It includes methods to generate markdown content, process chat blocks, and handle different types of messages and additional content.
 */
export class Exporter {
  /** @type {import('./config.js').ExportConfig['Config']} */
  ExportConfig = null;

  /** @param {import('./config.js').Config} config */
  constructor(config) {
    this.Config = config;
    this.ExportConfig = config.getExportConfig();
  }

  /**
   * Exports the current chat as a markdown file.
   */
  exportCurrentChat() {
    const markdown = this.generateMarkdown();

    if (!markdown) {
      return;
    }

    const header = this.createHeader();

    this.downloadMarkdown(header + '\n\n\n' + markdown.join('\n\n---\n\n'));
  }

  /**
   * Generates markdown from chat blocks.
   *
   * @returns {Array<string>} An array of markdown strings generated from chat blocks.
   */
  generateMarkdown() {
    const enableExportChatV2 =
      this.Config.getPromptTemplatesConfig().EnableExportChatV2;

    const selectorConfig = this.Config.getSelectorConfig();

    const blocks = this.getChatBlocks(selectorConfig.ChatLogContainer);

    let markdown = blocks.map((block) =>
      this.processBlock(block, selectorConfig, enableExportChatV2)
    );

    return markdown.filter((b) => b);
  }

  /**
   * Retrieves all child elements (chat blocks) from containers matching the specified selector.
   *
   * @param {string} containerSelector - The CSS selector for the containers.
   * @returns {HTMLElement[]} An array of child elements from the matched containers.
   */
  getChatBlocks(containerSelector) {
    return [
      ...[...document.querySelectorAll(containerSelector)].reduce(
        (acc, container) => {
          acc.push(...container.children);
          return acc;
        },
        []
      ),
    ];
  }

  /**
   * Processes a block element based on the provided selector configuration and export version.
   *
   * @param {HTMLElement} block - The block element to process.
   * @param {import('./config.js').SelectorConfig} selectorConfig - The configuration object containing selector strings.
   * @param {boolean} enableExportChatV2 - Flag to determine whether to use the new export version (V2) or the old export version.
   * @returns {string} The processed block content as a string.
   */
  processBlock(block, selectorConfig, enableExportChatV2) {
    const wrapper = block.querySelector(
      selectorConfig.ConversationResponseWrapper
    );

    // no wrapper found - return empty string
    if (!wrapper) {
      return '';
    }

    // new export
    if (enableExportChatV2) {
      return this.processV2Block(block, selectorConfig);
    }

    // old export
    return this.processOldBlock(wrapper, selectorConfig);
  }

  /**
   * Processes a V2 block by selecting all response parts based on the provided selector configuration.
   *
   * @param {HTMLElement} block - The block element containing the responses to be processed.
   * @param {import('./config.js').SelectorConfig} selectorConfig - The configuration object containing the selectors for extracting responses.
   * @returns {string} A string containing the extracted messages, joined by a delimiter.
   */
  processV2Block(block, selectorConfig) {
    // select all response parts for V2
    const wrappers = [
      ...block.querySelectorAll(selectorConfig.ConversationResponseWrapper),
    ];

    return wrappers
      .map((wrp) => this.extractMessage(wrp, selectorConfig))
      .filter((msg) => msg)
      .join('\n\n---\n\n');
  }

  /**
   * Extracts the message text from a React component wrapper based on the provided selector configuration.
   *
   * @param {HTMLElement} wrapper - The React component wrapper containing the message.
   * @param {import('./config.js').SelectorConfig} selectorConfig - Configuration object containing the React Fiber property key.
   * @returns {string} The extracted and formatted message text. Returns an empty string if the React Fiber property or props are not found.
   */
  extractMessage(wrapper, selectorConfig) {
    // find React props
    const reactFiberKey = Object.keys(wrapper).find((key) =>
      key?.includes(selectorConfig.ReactFiberPropertyKey)
    );

    // no React Fiber property found in the message - return empty string (we can't extract the message)
    if (!reactFiberKey) {
      console.error('Failed to find React Fiber property in the message');
      return '';
    }

    const props = wrapper?.[reactFiberKey]?.return?.memoizedProps ?? null;

    // no props found in the message - return empty string (we can't extract the message)
    if (!props) {
      console.error('Failed to find props in the message');
      return '';
    }

    // find message text
    let text = this.getMessageText(props);

    // add additional content, content references, and sources
    text = this.addAdditionalContent(props, text);
    text = this.addContentReferences(props, text);
    text = this.addSources(props, text);

    // process messageGroups & chunks with grouped subsections (thoughts, sources, queries, analyses)
    text = this.processMessageGroups(props, text);

    // format message text
    return this.formatMessage(props, text);
  }

  /**
   * Processes message groups and adds additional content to the text
   *
   * @param {Object} props - The properties object containing message groups.
   * @param {string} text - The initial text to which additional content will be added.
   * @returns {string} - The text with additional content appended.
   */
  processMessageGroups(props, text) {
    if (props?.chunks?.length > 0) {
      // no message groups - try to process chunks instead as a fallback
      return this.processChunks(props, text);
    }

    props.messageGroups?.forEach((group) => {
      const thoughts = [];
      const sources = [];
      const queries = [];
      const analyses = [];

      // each message group can have multiple messages
      (group.messages || []).forEach((msg) => {
        // thoughts
        if (
          msg.content?.content_type === this.ExportConfig.ContentTypeThoughts
        ) {
          msg.content.thoughts?.forEach((thought) => {
            const contentLines = thought.content
              .split('\n')
              .map((line) => '  ' + line)
              .join('\n');
            thoughts.push(`- **${thought.summary}**\n${contentLines}`);
          });
        }

        // sources
        if (
          msg.author?.name === this.ExportConfig.AuthorNameWebRun &&
          msg.metadata?.search_result_groups
        ) {
          msg.metadata.search_result_groups.forEach((resultGroup) =>
            resultGroup.entries?.forEach((entry) => {
              sources.push(`- [${entry.title}](${entry.url})`);
            })
          );
        }

        // search queries
        if (msg.metadata?.search_queries) {
          msg.metadata.search_queries.forEach((query) => {
            if (query.type === this.ExportConfig.SearchQueryType && query.q) {
              queries.push(`- ${query.q}`);
            }
          });
        }

        // python analysis - code and output
        if (
          msg.author?.name === this.ExportConfig.AuthorNamePython &&
          msg.content?.content_type ===
            this.ExportConfig.ContentTypeExecutionOutput
        ) {
          const code = msg.metadata?.aggregate_result?.code;

          if (code) {
            analyses.push('```python\n' + code.trim() + '\n```');
          }

          const output = msg.content?.text?.trim();

          if (output) {
            analyses.push('```\n' + output + '\n```');
          }
        }
      });

      if (thoughts.length) {
        text += '\n\n**Thoughts:**\n' + thoughts.join('\n');
      }

      if (queries.length) {
        text += '\n\n**Search Queries:**\n' + queries.join('\n');
      }

      if (sources.length) {
        text += '\n\n**Sources:**\n' + sources.join('\n');
      }

      if (analyses.length) {
        text += '\n\n**Analysis:**\n' + analyses.join('\n\n');
      }
    });

    return text;
  }

  /**
   * Processes message chunks and adds additional content to the text (alternative to message groups).
   *
   * @param {Object} props - The properties object containing message chunks.
   * @param {string} text - The initial text to which additional content will be added.
   * @returns {string} - The text with additional content appended.
   */
  processChunks(props, text) {
    if (!props.chunks) {
      return text;
    }

    props.chunks.forEach((group) => {
      // per-chunk collectors
      const thoughts = [];
      const queries = [];
      const sources = [];
      const analyses = [];
      const browsing = [];

      // thought
      if (group.type === this.ExportConfig.ChunkTypeThought && group.thought) {
        const { summary, content } = group.thought;

        const lines = content
          .split('\n')
          .map((l) => '  ' + l)
          .join('\n');

        thoughts.push(`- **${summary}**\n${lines}`);
      }

      // recap
      else if (
        group.type === this.ExportConfig.ChunkTypeRecap &&
        typeof group.content === 'string'
      ) {
        thoughts.push(`- ${group.content}`);
      }

      // search
      else if (group.type === this.ExportConfig.ChunkTypeSearch) {
        // queries
        Array.isArray(group.queries) &&
          group.queries.forEach((query) => {
            if (query.type === this.ExportConfig.SearchQueryType && query.q) {
              queries.push(`- ${query.q}`);
            }
          });

        // sources (array of search_result_group)
        Array.isArray(group.sources) &&
          group.sources.forEach((resultGroup) => {
            resultGroup.entries?.forEach((entry) => {
              sources.push(`- [${entry.title}](${entry.url})`);
            });
          });
      }

      // browsing/reading documents
      else if (
        group.type === this.ExportConfig.ChunkTypeBrowsing &&
        group.isRetrieval
      ) {
        browsing.push('- Reading documents');

        // Add any available sources (array of strings)
        Array.isArray(group.sources) &&
          group.sources.forEach((source) => {
            browsing.push(`  - ${source}`);
          });
      }

      // code or image analysis
      else if (
        [
          this.ExportConfig.ChunkTypeCodeAnalysis,
          this.ExportConfig.ChunkTypeImageAnalysis,
        ].includes(group.type) &&
        Array.isArray(group.messages)
      ) {
        group.messages.forEach((msg) => {
          // python analysis
          if (
            msg.author?.name === this.ExportConfig.AuthorNamePython &&
            msg.content?.content_type ===
              this.ExportConfig.ContentTypeExecutionOutput
          ) {
            const code = msg.metadata?.aggregate_result?.code;

            if (code) {
              analyses.push('```python\n' + code.trim() + '\n```');
            }

            const output = msg.content.text?.trim();

            if (output) {
              analyses.push('```\n' + output + '\n```');
            }
          }
        });
      }

      // emit each non-empty section exactly once per chunk
      if (thoughts.length) {
        text += '\n\n**Thoughts:**\n' + thoughts.join('\n');
      }
      if (queries.length) {
        text += '\n\n**Search Queries:**\n' + queries.join('\n');
      }
      if (sources.length) {
        text += '\n\n**Sources:**\n' + sources.join('\n');
      }
      if (browsing.length) {
        text += '\n\n**Browsing:**\n' + browsing.join('\n');
      }
      if (analyses.length) {
        text += '\n\n**Analysis:**\n' + analyses.join('\n\n');
      }
    });

    return text;
  }

  /**
   * Processes the message text by removing citation placeholders and formatting the text parts.
   *
   * @param {Object} props - The properties object containing display parts.
   * @returns {string} - The processed message text with citations removed and parts formatted.
   */
  getMessageText(props) {
    // 1) Unwrap product_entity, capturing only the product name
    const productsPattern = new RegExp(this.ExportConfig.ProductsPattern, 'g');

    // 2) Citations pattern (other than product_entity)
    const citationsPattern = new RegExp(
      this.ExportConfig.CitationsPattern,
      'g'
    );

    return (
      props?.displayParts
        ?.map((part) => {
          // prefix any non-text parts
          const prefix =
            part.type && part.type !== this.ExportConfig.ContentTypeText
              ? `[${part.type}]\n`
              : '';

          // do the two-step replace on the text
          const cleaned = (part.text ?? '')
            // step 1: unwrap product_entity - leaves only the name in group $1
            .replace(productsPattern, '$1')
            // step 2: strip all remaining citations
            .replace(citationsPattern, '');

          return prefix + cleaned;
        })
        .join('\n') ?? ''
    );
  }

  /**
   * Adds additional content to the provided text based on the previous grouped messages in the props.
   *
   * @param {Object} props - The properties object containing previous grouped messages.
   * @param {string} text - The initial text to which additional content will be added.
   * @returns {string} - The text with additional content appended.
   */
  addAdditionalContent(props, text) {
    // user canvas content
    if (
      props.isUserTurn &&
      props.messages?.[0]?.metadata?.canvas?.user_created_textdocs?.[0]
        ?.content &&
      props.messages?.[0]?.metadata?.canvas?.user_created_textdocs?.[0]?.title
    ) {
      const content =
        props.messages[0].metadata.canvas.user_created_textdocs[0].content;
      const title =
        props.messages[0].metadata.canvas.user_created_textdocs[0].title;

      text += `\n\n\`\`\`\n# ${title}\n\n${content}\n\`\`\``;

      return text;
    }

    // no previous grouped messages - return the text as is
    if (!props.prevGroupedMessages) {
      return text;
    }

    props.prevGroupedMessages.forEach((group) => {
      const msg = group?.message ?? group;

      // research_kickoff_tool.start_research_task
      if (
        msg.recipient &&
        msg.recipient === this.ExportConfig.RecipientResearchKickoffTool
      ) {
        // skip - duplicated content in export
        return;
      }

      // canvas content
      if (
        msg.recipient &&
        this.ExportConfig.CanvasRecipients.includes(msg.recipient) &&
        (msg.content?.parts?.[0] || msg.content?.text)
      ) {
        const content = JSON.parse(
          msg.content?.parts?.[0] || msg.content?.text
        );

        // check if content has name and content - if not, skip
        if (!content?.name || !content?.content) {
          return;
        }

        text += `\n\n\`\`\`\n# ${content.name}\n\n${content.content}\n\`\`\``;
        return;
      }

      // data analysis
      if (
        msg.content?.content_type &&
        this.ExportConfig.DataAnalysisContentTypes.includes(
          msg.content?.content_type
        ) &&
        msg.content?.text
      ) {
        text += `\n\n\`\`\`\n${msg.content.text}\n\`\`\``;
        return;
      }

      // chain-of-thought summary
      if (
        msg.author?.name &&
        this.ExportConfig.ChainOfThoughtAuthorNames.includes(
          msg.author?.name
        ) &&
        msg.content?.content_type === this.ExportConfig.ContentTypeText &&
        msg.content?.parts?.[0]
      ) {
        const part = msg.content.parts[0];
        text += `\n\n\`\`\`\n${part}\n\`\`\``;
      }
    });

    return text;
  }

  /**
   * Adds content references to the provided text.
   *
   * @param {Object} props - The properties object containing content references.
   * @param {string} text - The initial text to which content references will be added.
   * @returns {string} The text with added content references.
   */
  addContentReferences(props, text) {
    props.contentReferences?.forEach((ref) => {
      // check if reference has a prompt text - if so, add it to the text
      if (ref.prompt_text) {
        text += '\n\n' + ref.prompt_text;
        return;
      }

      // otherwise, check if reference is a video - if so, add video thumbnail and URL
      if (ref.type === this.ExportConfig.ContentTypeVideo) {
        text += `\n\n[![${ref.title}](${ref.thumbnail_url})](${ref.url})`;
      }

      // replace citation placeholders with the reference URL
      if (
        ref.type === this.ExportConfig.ContentTypeWebpageExtended &&
        ref.matched_text &&
        ref.url &&
        ref.attribution
      ) {
        text = text.replace(
          ref.matched_text,
          ` ([${ref.attribution}](${ref.url}))`
        );
      }

      // remove ref.type=hidden
      if (ref.type === this.ExportConfig.ContentTypeHidden) {
        text = text.replace(ref.matched_text, '');
      }

      // include inline images
      if (
        ref.type === this.ExportConfig.ContentTypeImageInline &&
        ref.asset_pointer_links?.length
      ) {
        let inlineImages = '';

        ref.asset_pointer_links.forEach((asset) => {
          try {
            const imageURL = new URL(asset)?.searchParams?.get('url');

            if (imageURL) {
              inlineImages += `\n![](${imageURL})\n`;
            }
          } catch (error) {
            console.error('Failed to parse image URL:', error);
          }
        });

        // replace matched text with inline images
        text = text.replace(ref.matched_text, inlineImages);
      }
    });

    return text;
  }

  /**
   * Adds sources to the provided text based on the metadata in the props object.
   *
   * @param {Object} props - The properties object containing messages and metadata.
   * @param {string} text - The text to which sources will be added.
   * @returns {string} The text with added sources if available.
   */
  addSources(props, text) {
    const searchResultGroups =
      props.messages?.[0]?.message?.metadata?.search_result_groups ||
      props.messages?.[0]?.metadata?.search_result_groups;

    if (!searchResultGroups) {
      return text;
    }

    text += '\n\n**Sources:**\n';

    searchResultGroups.forEach((group) => {
      group.entries.forEach((entry) => {
        text += `\n\n- [${entry.title}](${entry.url})\n\n  ${entry.snippet}`;
      });
    });

    return text;
  }

  /**
   * Formats a message with author and timestamp.
   *
   * @param {Object} props - The properties object.
   * @param {string} text - The text of the message to format.
   * @returns {string} The formatted message string.
   */
  formatMessage(props, text) {
    // empty message
    if (!text) {
      return '';
    }

    const author = props?.isUserTurn ? 'User' : 'ChatGPT';

    let createTimeValue =
      props?.messages?.[0]?.message?.create_time ??
      props?.messages?.[0]?.create_time;

    // fallback for props.messageGroups
    if (!createTimeValue && props?.messageGroups?.[0]?.messages?.[0]) {
      createTimeValue = props?.messageGroups?.[0]?.messages?.[0]?.create_time;
    }

    const createTime = createTimeValue
      ? ` (${new Date(createTimeValue * 1000).toISOString()})`
      : '';

    // formatted message as "Author (Timestamp): Message"
    return `**${author}${createTime}:**\n` + text;
  }

  /**
   * Processes an old message block and formats it based on whether it is a user's message or an assistant's message.
   *
   * @param {HTMLElement} wrapper - The HTML element containing the message block.
   * @param {import('./config.js').SelectorConfig} selectorConfig - Configuration object containing CSS selectors.
   * @returns {string} - Formatted message string indicating whether it is from the user or the assistant.
   */
  processOldBlock(wrapper, selectorConfig) {
    // wrapper doesn't match conversation response selector - it's user's message
    if (!wrapper.querySelector(selectorConfig.ConversationResponse)) {
      return '**User:**\n' + wrapper.innerText;
    }

    // pass this point is assistant's message
    const assistantWrapper = wrapper.firstChild;

    return (
      '**ChatGPT:**\n' +
      [...assistantWrapper.children]
        .map((node) => this.formatOldMessage(node))
        .join('\n')
    );
  }

  /**
   * Formats the content of a given DOM node into a string.
   *
   * If the node is a <pre> element, it extracts the programming language from the
   * class of the <code> element inside it and formats the content as a code block.
   * Otherwise, it returns the inner HTML of the node.
   *
   * @param {HTMLElement} node - The DOM node to format.
   * @returns {string} The formatted content of the node.
   */
  formatOldMessage(node) {
    let language;

    if (node.nodeName === 'PRE') {
      language =
        node.getElementsByTagName('code')[0]?.classList[2]?.split('-')[1] || '';

      return `\`\`\`${language}\n${node.innerText
        .replace(/^.*\n?Copy code/g, '')
        .trim()}\n\`\`\``;
    }

    return `${node.innerHTML}`;
  }

  /**
   * Creates a header string containing user information and the current date and time.
   *
   * @returns {string} The constructed header string.
   */
  createHeader() {
    let header = '';

    try {
      header =
        ExportHeaderPrefix +
        (getUserOpenAI()?.name || getUserOpenAI()?.email || '') +
        ' on ' +
        new Date().toLocaleString() +
        '\n```\n\n---';
    } catch {
      console.error(
        'Failed to get user name from getUserOpenAI(). Using default header instead.'
      );
    }

    return header;
  }

  /**
   * Gets the conversation title from the DOM
   *
   * @returns {string} Conversation title or empty string if not found
   */
  getConversationTitle() {
    try {
      return (
        document
          .querySelector(this.Config.getSelectorConfig().ConversationTitle)
          ?.textContent?.trim() || ''
      );
    } catch (error) {
      console.error('Error getting conversation title:', error);
      return '';
    }
  }

  /**
   * Sanitizes a filename to remove characters that are invalid in filenames
   *
   * @param {string} filename The filename to sanitize
   * @returns {string} Sanitized filename
   */
  sanitizeFilename(filename) {
    if (!filename) {
      return '';
    }

    // Convert any non-alphanumeric character to a hyphen
    let sanitized = filename
      .replace(/[^a-z0-9]/gi, '-') // Convert non-alphanumeric to hyphens
      .replace(/-+/g, '-') // Collapse multiple hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    // Default for empty names
    if (!sanitized) {
      sanitized = '';
    }

    return sanitized.substring(0, this.ExportConfig.MaxFilenameLength);
  }

  /**
   * Downloads the given content as a Markdown (.md) file.
   *
   * @param {string} content - The content to be downloaded as a Markdown file.
   */
  downloadMarkdown(content) {
    const blob = new Blob([content], { type: 'text/plain' });

    const a = document.createElement('a');

    // Get conversation title
    const sanitizedTitle = this.sanitizeFilename(this.getConversationTitle());

    // Create filename with conversation title if available
    const filename =
      ExportFilePrefix +
      (sanitizedTitle ? sanitizedTitle + '_' : '') +
      new Date().toISOString() +
      '.md';

    a.href = URL.createObjectURL(blob);
    a.download = filename;

    document.body.appendChild(a);

    a.click();
  }
}
