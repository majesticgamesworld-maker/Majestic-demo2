var shopSearch = '';

function initShopPage() {
  // Filter chips
  var chips = document.getElementById('shop-filter-chips');
  if (chips) {
    var allChips = [{ id: 'all', label: 'All Products' }].concat(CATEGORIES);
    chips.innerHTML = allChips.map(function(cat) {
      return '<button type="button" class="filter-chip' + (shopFilter === cat.id ? ' active' : '') + '" data-shop-filter="' + escHtml(cat.id) + '">' +
        (cat.icon ? escHtml(cat.icon) + ' ' : '') + escHtml(cat.label) +
      '</button>';
    }).join('');
    chips.onclick = function(event) {
      var chip = event.target.closest && event.target.closest('[data-shop-filter]');
      if (!chip) return;
      setShopFilter(chip.getAttribute('data-shop-filter'));
    };
  }

  // Search input
  var searchInput = document.getElementById('shop-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      shopSearch = window.MGWSecurity ? window.MGWSecurity.sanitizeSearchQuery(this.value) : this.value.trim().slice(0, 80);
      renderShop();
    });
    searchInput.value = shopSearch;
  }
}

function setShopFilter(catId) {
  shopFilter = catId;
  renderShop();
  // Update chip active states
  document.querySelectorAll('.filter-chip').forEach(function(chip, i) {
    var allCats = [{ id: 'all' }].concat(CATEGORIES);
    chip.classList.toggle('active', allCats[i] && allCats[i].id === catId);
  });
}

function clearShopFilters() {
  shopFilter = 'all';
  shopSearch = '';
  var input = document.getElementById('shop-search-input');
  if (input) input.value = '';
  renderShop();
}

function renderShop() {
  var sort = document.getElementById('shop-sort-select');
  var sortVal = sort ? sort.value : 'default';

  var products = shopFilter === 'all' ? PRODUCTS.slice() : getByCategory(shopFilter);

  if (shopSearch) {
    var q = shopSearch.toLowerCase();
    products = products.filter(function(p) {
      return p.name.toLowerCase().includes(q) || (p.desc && p.desc.toLowerCase().includes(q));
    });
  }

  // Sort
  if (sortVal === 'price-asc') products.sort(function(a, b) { return a.price - b.price; });
  else if (sortVal === 'price-desc') products.sort(function(a, b) { return b.price - a.price; });
  else if (sortVal === 'name') products.sort(function(a, b) { return a.name.localeCompare(b.name); });

  var grid = document.getElementById('shop-products-grid');
  var emptyState = document.getElementById('shop-empty-state');
  var countEl = document.getElementById('shop-result-count');

  if (countEl) countEl.textContent = products.length + ' product' + (products.length !== 1 ? 's' : '');

  if (products.length === 0) {
    if (grid) grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    if (grid) grid.innerHTML = products.map(renderProductCard).join('');
  }
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   CATEGORY PAGE
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function renderCategoryPage(catId) {
  if (CATEGORY_GROUP_PAGES[catId]) {
    renderCategoryGroupPage(catId);
    return;
  }

  var cat = CATEGORIES.find(function(c) { return c.id === catId; });
  if (!cat) { navigate('404'); return; }
  var heroBg = CATEGORY_BG_MAP[catId];

  var titleEl = document.getElementById('category-page-title');
  var subEl = document.getElementById('category-page-sub');
  var breadEl = document.getElementById('category-breadcrumb-name');
  var copyEl = document.getElementById('category-hero-copy');
  var headerEl = document.getElementById('category-page-header');
  var heroEl = document.getElementById('category-hero-section');
  var heroBgImg = document.getElementById('category-hero-bg');

  if (titleEl) titleEl.textContent = '';
  if (subEl) subEl.textContent = '';
  if (breadEl) breadEl.textContent = cat.label;
  if (copyEl) copyEl.textContent = CATEGORY_HERO_COPY[catId] || 'Explore curated picks selected for better play, easier gifting, and memorable moments.';
  setPageHeroBackground(headerEl, heroBg);
  setPageHeroBackground(heroEl, heroBg);
  if (heroBgImg && heroBg) heroBgImg.src = heroBg;

  // Adult warning
  var warning = document.getElementById('category-adult-warning');
  if (warning) warning.style.display = (catId === 'drinking-games' || catId === 'couples-games') ? 'block' : 'none';

  renderCategory();
}

function renderCategoryGroupPage(catId) {
  var group = CATEGORY_GROUP_PAGES[catId];
  if (!group) { navigate('404'); return; }

  var titleEl = document.getElementById('category-page-title');
  var subEl = document.getElementById('category-page-sub');
  var breadEl = document.getElementById('category-breadcrumb-name');
  var copyEl = document.getElementById('category-hero-copy');
  var headerEl = document.getElementById('category-page-header');
  var heroEl = document.getElementById('category-hero-section');
  var heroBgImg = document.getElementById('category-hero-bg');
  var warning = document.getElementById('category-adult-warning');
  var grid = document.getElementById('category-products-grid');
  var emptyEl = document.getElementById('category-empty');
  var countEl = document.getElementById('category-count');
  var sort = document.getElementById('category-sort-select');

  if (titleEl) titleEl.textContent = '';
  if (subEl) subEl.textContent = '';
  if (breadEl) breadEl.textContent = group.label;
  if (copyEl) copyEl.textContent = group.copy;
  setPageHeroBackground(headerEl, group.bg);
  setPageHeroBackground(heroEl, group.bg);
  if (heroBgImg && group.bg) heroBgImg.src = group.bg;
  if (warning) warning.style.display = 'none';
  if (emptyEl) emptyEl.style.display = 'none';
  if (sort) sort.style.display = 'none';
  if (countEl) countEl.textContent = group.countLabel;

  if (grid) {
    grid.classList.add('category-selector-grid');
    grid.innerHTML = group.subcategories.map(function(catId) {
      var cat = getCategoryById(catId);
      return cat ? renderCategoryCard(cat) : '';
    }).join('');
  }
}

function renderCategory() {
  if (!currentCategory) return;
  var sort = document.getElementById('category-sort-select');
  var sortVal = sort ? sort.value : 'default';

  var products = getByCategory(currentCategory).slice();
  if (sortVal === 'price-asc') products.sort(function(a, b) { return a.price - b.price; });
  else if (sortVal === 'price-desc') products.sort(function(a, b) { return b.price - a.price; });

  var grid = document.getElementById('category-products-grid');
  var emptyEl = document.getElementById('category-empty');
  var countEl = document.getElementById('category-count');

  if (sort) sort.style.display = '';
  if (grid) grid.classList.remove('category-selector-grid');
  if (countEl) countEl.textContent = products.length + ' product' + (products.length !== 1 ? 's' : '');

  if (products.length === 0) {
    if (grid) grid.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
  } else {
    if (emptyEl) emptyEl.style.display = 'none';
    if (grid) grid.innerHTML = products.map(renderProductCard).join('');
  }
}
