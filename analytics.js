/* Analytics hooks for commerce events.
   Kept intentionally small so tracking can be expanded without touching cart,
   search, filters, Buddy, or recommendation logic. */
(function() {
  window.MGWAnalytics = window.MGWAnalytics || {
    track: function(eventName, payload) {
      if (window.dataLayer && typeof window.dataLayer.push === 'function') {
        window.dataLayer.push({ event: eventName, payload: payload || {} });
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, payload || {});
      }
    }
  };
})();
