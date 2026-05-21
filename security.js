/* Central client-side security helpers.
   These do not replace server/edge controls, but they keep dynamic HTML,
   search text, and WhatsApp payloads consistently bounded and escaped. */
(function() {
  'use strict';

  var CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

  function normalizeText(value, maxLength) {
    var text = value == null ? '' : String(value);
    text = text.replace(CONTROL_CHARS, '').replace(/\s+/g, ' ').trim();
    if (maxLength && text.length > maxLength) text = text.slice(0, maxLength).trim();
    return text;
  }

  function escapeHtml(value) {
    return normalizeText(value, 10000)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeSearchQuery(value) {
    return normalizeText(value, 80);
  }

  function sanitizeWhatsAppText(value) {
    return normalizeText(value, 500);
  }

  function sanitizeId(value) {
    return normalizeText(value, 80).replace(/[^a-zA-Z0-9_-]/g, '');
  }

  window.MGWSecurity = {
    escapeHtml: escapeHtml,
    normalizeText: normalizeText,
    sanitizeSearchQuery: sanitizeSearchQuery,
    sanitizeWhatsAppText: sanitizeWhatsAppText,
    sanitizeId: sanitizeId
  };
})();
