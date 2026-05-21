var searchOpen = false;

function toggleSearch() {
  var container = document.getElementById('search-container');
  var input = document.getElementById('search-input');
  searchOpen = !searchOpen;
  if (container) container.classList.toggle('search-active', searchOpen);
  var panel = document.getElementById('search-panel');
  if (panel) panel.classList.toggle('open', searchOpen && !!(input && input.value.trim()));
  if (searchOpen) {
    setTimeout(function() {
      if (input) input.focus();
    }, 100);
  }
}

function closeSearch() {
  searchOpen = false;
  var container = document.getElementById('search-container');
  if (container) container.classList.remove('search-active');
  var panel = document.getElementById('search-panel');
  if (panel) panel.classList.remove('open');
}

function clearSearch() {
  var input = document.getElementById('search-input');
  if (input) { input.value = ''; input.focus(); }
  var clearBtn = document.getElementById('search-clear-btn');
  if (clearBtn) clearBtn.style.display = 'none';
  document.getElementById('search-results-panel').innerHTML = '';
}

function initSearch() {
  var input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', function() {
    var q = window.MGWSecurity ? window.MGWSecurity.sanitizeSearchQuery(this.value) : this.value.trim().slice(0, 80);
    var container = document.getElementById('search-container');
    var clearBtn = document.getElementById('search-clear-btn');
    var panel = document.getElementById('search-results-panel');
    var searchPanel = document.getElementById('search-panel');
    if (container) container.classList.add('search-active');
    if (clearBtn) clearBtn.style.display = q ? '' : 'none';
    if (searchPanel) {
      searchOpen = !!q;
      searchPanel.classList.toggle('open', !!q);
    }

    if (!q) {
      if (panel) panel.innerHTML = '';
      return;
    }

    var results = searchProducts(q).slice(0, 6);
    if (!panel) return;

    if (results.length === 0) {
      panel.innerHTML = '<div class="search-no-results">No results for "<strong>' + escHtml(q) + '</strong>"</div>';
      return;
    }

    panel.innerHTML =
      '<div class="search-results">' +
        results.map(function(p) {
          return '<a href="' + getRouteUrl('product', p.id) + '" class="search-result-item" data-search-product="' + escHtml(p.id) + '">' +
            '<img class="search-result-img" src="' + getProductImg(p) + '" alt="' + escHtml(p.name) + '" loading="lazy" />' +
            '<div>' +
              '<div class="search-result-name">' + escHtml(p.name) + '</div>' +
              '<div class="search-result-price">KES ' + p.price.toLocaleString() + '</div>' +
            '</div>' +
          '</a>';
        }).join('') +
      '</div>' +
      '<div class="search-results-footer">' +
        '<a href="' + getRouteUrl('shop') + '" data-search-all="' + escHtml(q) + '">See all results for "' + escHtml(q) + '" â†’</a>' +
      '</div>';
  });

  var resultsPanel = document.getElementById('search-results-panel');
  if (resultsPanel && !resultsPanel.dataset.securityDelegated) {
    resultsPanel.dataset.securityDelegated = 'true';
    resultsPanel.addEventListener('click', function(event) {
      var productLink = event.target.closest && event.target.closest('[data-search-product]');
      if (productLink) {
        if (handleRouteClick(event, 'product', productLink.getAttribute('data-search-product')) === false) {
          closeSearch();
          return false;
        }
        return true;
      }
      var allLink = event.target.closest && event.target.closest('[data-search-all]');
      if (allLink && handleRouteClick(event, 'shop') === false) {
        shopSearch = window.MGWSecurity ? window.MGWSecurity.sanitizeSearchQuery(allLink.getAttribute('data-search-all')) : (allLink.getAttribute('data-search-all') || '').slice(0, 80);
        renderShop();
        closeSearch();
        return false;
      }
    });
  }

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSearch();
  });
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    CONTACT PAGE - DELIVERY ZONES
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
