/* Core site shell, routing, rendering, contact pages, footer, and startup. */
var currentPage = null;
var currentCategory = null;
var currentProduct = null;
var siteHeaderTemplateHtml = '';
var imageZoomScale = 1;
var imageZoomGallery = [];
var imageZoomIndex = 0;
var SITE_ORIGIN = 'https://majesticgames.co.ke';
var SITE_SCRIPT_EL = document.currentScript || document.querySelector('script[src*="script.js"]');
var SITE_ASSET_BASE = new URL('.', SITE_SCRIPT_EL && SITE_SCRIPT_EL.src ? SITE_SCRIPT_EL.src : document.baseURI).href;
var BRANDING_ASSET_BASE = new URL('images/branding/', SITE_ASSET_BASE).href;
var DEFAULT_OG_IMAGE = new URL('LOGOF2.png', BRANDING_ASSET_BASE).href;
var LOGO_TRANSPARENT_SRC = new URL('LOGOF2-transparent.png', BRANDING_ASSET_BASE).href;
var PRODUCT_LOGO_SRC = LOGO_TRANSPARENT_SRC;
var lastFocusedBeforeCheckout = null;
var cartFocusTrap = null;
var quickViewFocusTrap = null;
var imageZoomFocusTrap = null;

var CATEGORY_BG_MAP = {
  'board-games': 'images/background images/Board games.webp',
  'card-games': 'images/background images/card games.webp',
  'christian-games': 'images/background images/christian games.webp',
  'couples-games': 'images/background images/card games.webp',
  'dolls': 'images/background images/dolls.webp',
  'drinking-games': 'images/background images/drinking games.webp',
  'family-games': 'images/background images/family games.webp',
  'infant-toys': 'images/background images/infant toys.webp',
  'kids-games': 'images/background images/kids games.webp',
  'lego-collectible': 'images/background images/LEGO collectibles.webp',
  'musical-toys': 'images/background images/musical toys.webp',
  'party-games': 'images/background images/party games.webp',
  'puzzles': 'images/background images/puzzles.webp',
  'stem-toys': 'images/background images/stem toys.webp',
  'trivia-games': 'images/background images/trivia games.webp'
};

var CATEGORY_CARD_ART_MAP = {
  'board-games': 'images/category-art/board-games.webp',
  'card-games': 'images/category-art/card-games.webp',
  'christian-games': 'images/category-art/christian-games.webp',
  'couples-games': 'images/category-art/couples-games.webp',
  'dolls': 'images/category-art/dolls.webp',
  'drinking-games': 'images/category-art/drinking-games.webp',
  'family-games': 'images/category-art/family-games.webp',
  'infant-toys': 'images/category-art/infant-toys.webp',
  'kids-games': 'images/category-art/kids-games.webp',
  'lego-collectible': 'images/category-art/lego-collectible.webp',
  'musical-toys': 'images/category-art/musical-toys.webp',
  'party-games': 'images/category-art/party-games.webp',
  'puzzles': 'images/category-art/puzzles.webp',
  'stem-toys': 'images/category-art/stem-toys.webp',
  'trivia-games': 'images/category-art/trivia-games.webp'
};

var CATEGORY_HERO_COPY = {
  'board-games': 'Strategy classics, family favorites, and modern tabletop picks for game nights that feel memorable.',
  'card-games': 'Fast, portable games for travel, parties, and easy play when you want quick fun with friends.',
  'christian-games': 'Faith-friendly games and activities for families, fellowships, youth groups, and thoughtful gifting.',
  'couples-games': 'Playful picks for date nights, bonding, conversation, and shared moments at home.',
  'dolls': 'Characterful dolls and pretend-play gifts chosen for imagination, comfort, and everyday play.',
  'drinking-games': 'Adult party games built for lively groups, bold laughs, and responsible 18+ fun.',
  'family-games': 'Easy-to-teach games that bring kids, teens, parents, and guests around the same table.',
  'infant-toys': 'Soft, safe early-play toys for sensory discovery, movement, comfort, and first milestones.',
  'kids-games': 'Bright, age-friendly games and toys that make learning, sharing, and playtime feel natural.',
  'lego-collectible': 'Buildable sets, collectible pieces, and display-worthy gifts for creative hands and collectors.',
  'musical-toys': 'Rhythm, sound, and music toys that make play more expressive for curious young learners.',
  'party-games': 'Crowd-pleasers for birthdays, hangouts, office socials, and high-energy group fun.',
  'puzzles': 'Relaxing puzzle picks for focus, gifting, family downtime, and satisfying screen-free challenges.',
  'stem-toys': 'Hands-on toys that support curiosity, problem solving, building, experiments, and creative learning.',
  'trivia-games': 'Question-led games for sharp minds, friendly competition, and groups that love a challenge.'
};

var INFO_PAGES = {
  'faqs': {
    kicker: 'Helpful answers',
    title: 'Frequently Asked Questions',
    intro: 'Quick answers about shopping with Majestic Games & Toys World, from product selection to delivery, payments, pickup, and after-sales help.',
    sections: [
      { title: 'Ordering', body: ['You can shop online, add products to cart, and contact us on WhatsApp when you need help confirming stock or choosing the right game.', 'For recommendations, tell us the age range, number of players, occasion, and budget. We will suggest options that fit the group and explain why they work.'] },
      { title: 'Delivery and pickup', body: ['Delivery options depend on location, order size, rider availability, and confirmation time. Store pickup is available from Commerce House, Moi Avenue, Nairobi.', 'Countrywide delivery can be arranged through courier partners. Timelines vary by town and product size.'] },
      { title: 'Payments', body: ['We support common local payment methods including M-Pesa, plus card and other checkout options where available.', 'Orders are processed after payment or confirmation, depending on the chosen fulfilment option.'] },
      { title: 'Product help', body: ['If a product has many versions, age ratings, or player-count differences, ask before checkout and we will help you choose the best fit.', 'Some adult or mature party games may not be suitable for children. Please check age guidance before buying.'] }
    ]
  },
  'privacy-policy': {
    kicker: 'Your information',
    title: 'Privacy Policy',
    intro: 'This page explains how Majestic Games & Toys World handles customer information when you browse, contact us, place an order, or ask for support.',
    sections: [
      { title: 'Information we collect', body: ['We may collect your name, phone number, delivery location, order details, messages, and payment confirmation details needed to process your order.', 'We may also use basic site analytics to understand product interest and improve the shopping experience.'] },
      { title: 'How we use information', body: ['Customer information is used to confirm orders, arrange delivery or pickup, respond to enquiries, recommend products, provide support, and prevent fraud.', 'We do not sell customer contact details. Information is shared only where needed to complete the service, such as with delivery or payment partners.'] },
      { title: 'Data care', body: ['We keep customer details only as long as needed for order records, support, legal, tax, or operational purposes.', 'You may contact us to update or request deletion of your personal information where retention is not required for legitimate business or legal reasons.'] },
      { title: 'Third-party links', body: ['The site may link to WhatsApp, social platforms, maps, payment services, and couriers. Their own privacy practices apply when you use those services.'] }
    ]
  },
  'refund-return-policy': {
    kicker: 'After-sales care',
    title: 'Refund & Return Policy',
    intro: 'We want every order to feel right. This policy covers returns, exchanges, damaged items, incorrect items, and refund handling.',
    sections: [
      { title: 'Return window', body: ['Please contact us as soon as possible after receiving your order if something is damaged, incorrect, incomplete, or not as expected.', 'Items should be unused, complete, and in original packaging unless the issue is damage or a fulfilment mistake.'] },
      { title: 'Damaged or wrong items', body: ['Send clear photos or videos of the item, packaging, and order details. We will review the issue and advise on replacement, exchange, refund, or return steps.', 'If we sent the wrong item or the product arrived damaged, we will work with you on a fair resolution.'] },
      { title: 'Non-returnable cases', body: ['Opened, used, incomplete, personalised, hygiene-sensitive, or customer-damaged items may not qualify for return.', 'Adult games, clearance items, and items bought for events may be limited to exchange or store credit depending on condition and timing.'] },
      { title: 'Refunds', body: ['Approved refunds are processed through the original or agreed payment method. Processing time may depend on the payment provider.', 'Delivery fees may be non-refundable unless the return is caused by our error or a damaged delivery.'] }
    ]
  },
  'terms-conditions': {
    kicker: 'Shopping terms',
    title: 'Terms & Conditions',
    intro: 'These terms guide use of the Majestic Games & Toys World website, product information, orders, pricing, delivery, and customer responsibilities.',
    sections: [
      { title: 'Website use', body: ['By using this website or placing an order, you agree to use the site lawfully and provide accurate order, contact, and delivery details.', 'Product images, descriptions, prices, and availability may change as stock changes or suppliers update packaging.'] },
      { title: 'Orders and pricing', body: ['Orders are subject to confirmation of stock, price, payment, and delivery availability.', 'If a pricing, stock, or description error occurs, we may contact you to correct the order, offer alternatives, or cancel and refund where appropriate.'] },
      { title: 'Delivery', body: ['Delivery estimates are provided in good faith and may be affected by location, traffic, courier schedules, weather, public holidays, and customer availability.', 'Customers should provide accurate delivery details and be reachable during fulfilment. Failed delivery attempts may attract additional charges.'] },
      { title: 'Liability', body: ['Games and toys should be used according to age guidance and safety instructions. Adult supervision may be required for children.', 'Majestic Games & Toys World is not liable for misuse of products, incorrect age selection, or losses beyond the value of the purchased item where permitted by law.'] }
    ]
  }
};

function getCategoryCardArtwork(catId) {
  var imgPath = CATEGORY_CARD_ART_MAP[catId] || CATEGORY_BG_MAP[catId];
  return imgPath ? encodeURI(imgPath) : '';
}

function setPageHeroBackground(el, imgPath) {
  if (!el || !imgPath) return;
  el.style.setProperty('--page-hero-bg', "url('" + encodeURI(imgPath) + "')");
  el.style.setProperty('--cat-bg-image', "url('" + encodeURI(imgPath) + "')");
}

function handleRouteClick(evt, page, id) {
  if (evt && (evt.button !== 0 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey)) {
    return true;
  }
  if (evt) evt.preventDefault();
  navigate(page, id);
  return false;
}

function handleActionClick(evt, action) {
  if (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  if (typeof action === 'function') action();
  return false;
}

function renderCategoryCard(cat, extraStyle) {
  var bgImage = getCategoryCardArtwork(cat.id);
  var style = "--cat-bg-image:url('" + bgImage + "');";
  if (extraStyle) style += extraStyle;

  return '<a href="' + getRouteUrl('category', cat.id) + '" class="cat-card-link" style="' + style + '" onclick="return handleRouteClick(event,\'category\',\'' + cat.id + '\')">' +
    '<span class="cat-icon">' + cat.icon + '</span>' +
    '<span class="cat-label">' + cat.label + '</span>' +
    '<span class="cat-count-label">' + cat.count + ' items</span>' +
  '</a>';
}

var HOME_CATEGORY_MENU = [
  { id: 'board-games', type: 'category', art: 'images/category-art/generated/home-board-games.png', countLabel: '72+ Games', iconKey: 'dice' },
  {
    id: 'card-games',
    label: 'Card Games',
    icon: 'Cards',
    iconKey: 'cards',
    type: 'group',
    art: 'images/category-art/generated/home-card-games.png',
    fallbackArt: 'images/background images/card games.webp',
    countLabel: '38+ Games',
    subcategories: ['family-games', 'trivia-games', 'christian-games']
  },
  { id: 'kids-games', type: 'category', art: 'images/category-art/generated/home-kids-games.png', countLabel: '25+ Games', iconKey: 'bear' },
  {
    id: 'toys',
    label: 'STEM Toys',
    icon: 'Toys',
    iconKey: 'robot',
    type: 'group',
    art: 'images/category-art/generated/home-toys.png',
    countLabel: '30+ Toys',
    subcategories: ['stem-toys', 'lego-collectible', 'infant-toys', 'musical-toys', 'dolls']
  },
  { id: 'puzzles', type: 'category', art: 'images/category-art/generated/home-puzzles.png', countLabel: '11+ Puzzles', iconKey: 'puzzle' },
  { id: 'couples-games', type: 'category', art: 'images/category-art/generated/home-couples-games.png', countLabel: '38+ Games', iconKey: 'heart' },
  { id: 'party-games', type: 'category', art: 'images/category-art/generated/home-party-games.png', countLabel: '27+ Games', iconKey: 'party' },
  { id: 'drinking-games', type: 'category', art: 'images/category-art/generated/home-drinking-games.png', countLabel: '29+ Games', iconKey: 'cup' }
];

var CATEGORY_GROUP_PAGES = {
  'card-games': {
    id: 'card-games',
    label: 'Card games',
    icon: 'Cards',
    countLabel: '3 options',
    art: 'images/category-art/card-games.webp',
    bg: 'images/background images/card games.webp',
    copy: 'Choose the type of card game you want to browse.',
    subcategories: ['family-games', 'trivia-games', 'christian-games']
  },
  'toys': {
    id: 'toys',
    label: 'TOYS',
    icon: 'Toys',
    countLabel: '5 options',
    art: 'images/background images/stem toys.webp',
    bg: 'images/background images/stem toys.webp',
    copy: 'Choose a toy category to browse.',
    subcategories: ['stem-toys', 'lego-collectible', 'infant-toys', 'musical-toys', 'dolls']
  }
};

function getCategoryById(catId) {
  return CATEGORIES.find(function(cat) { return cat.id === catId; });
}

function getCategoryCount(catId) {
  var cat = getCategoryById(catId);
  return cat && cat.count ? cat.count : 0;
}

function getHomeCategoryMenuCount(item) {
  if (!item || item.type !== 'group') return getCategoryCount(item.id);
  return item.subcategories.reduce(function(total, catId) {
    return total + getCategoryCount(catId);
  }, 0);
}

function getHomeCategoryIcon(iconKey) {
  var sharedAttrs = 'viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"';
  var icons = {
    dice: '<svg ' + sharedAttrs + '><path d="M32 7 51 17.5v22.8L32 57 13 40.3V17.5L32 7z"/><path d="M13 17.5 32 28l19-10.5"/><path d="M32 28v29"/><path d="M21.5 23.8v.1"/><path d="M28 20v.1"/><path d="M42.5 23.8v.1"/><path d="M41.5 36v.1"/><path d="M41.5 44v.1"/><path d="M22.5 36v.1"/><path d="M22.5 44v.1"/></svg>',
    cards: '<svg ' + sharedAttrs + '><path d="M18 18.5 35.7 11l14 33.4L32 52 18 18.5z"/><path d="M13.5 23.3 31 15.8 43.8 46"/><path d="M28.7 25.6c2-5.4 9.9-3.1 8.2 2.7-1 3.4-4.1 5.5-7.1 7.8-4-1.2-7.7-2.6-9.1-5.8-2.3-5.4 5.4-8.7 8-4.7z"/></svg>',
    bear: '<svg ' + sharedAttrs + '><circle cx="20.5" cy="19.3" r="8"/><circle cx="43.5" cy="19.3" r="8"/><path d="M16 36c0-11 7-18 16-18s16 7 16 18-7 18-16 18-16-7-16-18z"/><path d="M26 34v.1"/><path d="M38 34v.1"/><path d="M29 41h6"/><path d="M27 45c3 2.5 7 2.5 10 0"/></svg>',
    robot: '<svg ' + sharedAttrs + '><path d="M32 15V8"/><path d="M32 8v.1"/><rect x="18" y="18" width="28" height="26" rx="5"/><path d="M23 44v6"/><path d="M41 44v6"/><path d="M18 30h-6"/><path d="M52 30h-6"/><path d="M26 30v.1"/><path d="M38 30v.1"/><path d="M26 38h12"/><path d="M22 23h20"/></svg>',
    puzzle: '<svg ' + sharedAttrs + '><path d="M22 12h15v11h5c5 0 5 9 0 9h-5v9H26v5c0 5-9 5-9 0v-5H10V29h8v-4c-5 0-5-9 0-9h4v-4z"/></svg>',
    heart: '<svg ' + sharedAttrs + '><path d="M55 22c-4.6-8.2-15.4-8.6-21.1-1.7L32 22.6l-1.9-2.3C24.4 13.4 13.6 13.8 9 22c-4.8 8.5 1.4 17 7.2 22.2L32 56l15.8-11.8C53.6 39 59.8 30.5 55 22z"/></svg>',
    party: '<svg ' + sharedAttrs + '><path d="M12 52 25 14l25 25-38 13z"/><path d="m22 24 18 18"/><path d="M41 10c5 0 8 3 8 8"/><path d="M51 27c3-1 7 0 9 3"/><path d="M29 7c-1 4-4 7-8 8"/><path d="M52 9v.1"/><path d="M57 19v.1"/><path d="M43 27v.1"/></svg>',
    cup: '<svg ' + sharedAttrs + '><path d="M18 22h27l-2 20c-.6 6.2-5.3 10-11.2 10h-1.6C24.3 52 19.6 48.2 19 42l-1-20z"/><path d="M45 27h5c9 0 9 15 0 15h-6"/><path d="M23 14h16"/><path d="M27 14v8"/><path d="M35 14v8"/><path d="M24 32h15"/></svg>'
  };
  return icons[iconKey] || icons.dice;
}

function renderHomeCategoryCard(config) {
  var cat = getCategoryById(config.id);
  var label = config.label || (cat && cat.label) || config.id;
  var countLabel = config.countLabel || ((cat && cat.count) || getHomeCategoryMenuCount(config)) + '+ Games';
  var bgImage = encodeURI(config.art || CATEGORY_CARD_ART_MAP[config.id] || CATEGORY_BG_MAP[config.id] || '');

  return '<a href="' + getRouteUrl('category', config.id) + '" class="cat-card-link home-category-card' + (config.type === 'group' ? ' cat-card-group' : '') + '" style="--cat-bg-image:url(\'' + bgImage + '\');" onclick="return handleRouteClick(event,\'category\',\'' + config.id + '\')">' +
    '<span class="cat-icon" aria-hidden="true">' + getHomeCategoryIcon(config.iconKey) + '</span>' +
    '<span class="cat-label">' + escHtml(label) + '</span>' +
    '<span class="cat-count-label">' + escHtml(countLabel) + '</span>' +
    '<span class="cat-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg></span>' +
  '</a>';
}

function renderHomeCategoryMenuItem(item) {
  var cat = item.type === 'category' ? getCategoryById(item.id) : null;
  if (item.type === 'category' && !cat) return '';
  return renderHomeCategoryCard(item);
}

function getAppBasePath() {
  if (window.location.protocol === 'file:') return '';

  var path = window.location.pathname || '/';
  var segments = path.split('/').filter(Boolean);
  var decodedSegments = segments.map(function(part) {
    try { return decodeURIComponent(part); } catch (err) { return part; }
  });
  var pages = ['shop', 'bestsellers', 'new-arrivals', 'gift-picks', 'cart', 'contact', 'blog', 'faqs', 'privacy-policy', 'refund-return-policy', 'terms-conditions'];
  var productIndex = decodedSegments.indexOf('products');
  var categoryIndex = decodedSegments.indexOf('category');
  var routeIndex = productIndex !== -1 ? productIndex : categoryIndex;

  if (routeIndex !== -1) {
    return '/' + segments.slice(0, routeIndex).join('/') + (routeIndex ? '/' : '');
  }

  var last = decodedSegments[decodedSegments.length - 1] || '';
  if (/index\.html$/i.test(last)) {
    return '/' + segments.slice(0, -1).join('/') + (segments.length > 1 ? '/' : '');
  }
  if (pages.indexOf(last) !== -1) {
    return '/' + segments.slice(0, -1).join('/') + (segments.length > 1 ? '/' : '');
  }
  if (typeof path === 'string' && path.slice(-1) === '/') return path;

  return '/';
}

function getRouteUrl(page, param) {
  var isLocalStatic = window.location.protocol === 'file:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '::1';

  if (isLocalStatic) {
    var localBase = window.location.protocol === 'file:' ? '' : getAppBasePath();
    if (page === 'home') return localBase || '#home';
    if (page === 'product' && param) return localBase + '#product/' + encodeURIComponent(param);
    if (page === 'category' && param) return localBase + '#category/' + encodeURIComponent(param);
    return localBase + '#' + encodeURIComponent(page);
  }

  var base = getAppBasePath();
  var needsStaticEntryRoute = window.location.hostname.slice(-10) === '.github.io';
  if (needsStaticEntryRoute) {
    if (page === 'home') return base;
    if (page === 'product' && param) return base + '?product=' + encodeURIComponent(param);
    if (page === 'category' && param) return base + '?category=' + encodeURIComponent(param);
    return base + '?page=' + encodeURIComponent(page);
  }

  if (page === 'home') return base;
  if (page === 'product' && param) {
    var product = getProductById(param);
    return base + 'products/' + encodeURIComponent((product && product.slug) || param) + '/';
  }
  if (page === 'category' && param) return base + 'category/' + encodeURIComponent(param) + '/';
  return base + encodeURIComponent(page) + '/';
}

function getRouteFromLocation() {
  var params = new URLSearchParams(window.location.search || '');
  if (params.get('product')) return { page: 'product', param: params.get('product') };
  if (params.get('category')) return { page: 'category', param: params.get('category') };
  if (params.get('page')) return { page: params.get('page'), param: null };

  var cleanPath = (window.location.pathname || '').replace(/\/$/, '');
  var pathParts = cleanPath.split('/').filter(Boolean);
  var productIndex = pathParts.indexOf('products');
  if (productIndex !== -1 && pathParts[productIndex + 1]) {
    return { page: 'product', param: decodeURIComponent(pathParts[productIndex + 1]) };
  }
  var categoryIndex = pathParts.indexOf('category');
  if (categoryIndex !== -1 && pathParts[categoryIndex + 1]) {
    return { page: 'category', param: decodeURIComponent(pathParts[categoryIndex + 1]) };
  }
  var lastPart = pathParts[pathParts.length - 1];
  if (lastPart && !/index\.html$/i.test(lastPart)) {
    var pages = ['shop', 'bestsellers', 'new-arrivals', 'gift-picks', 'cart', 'contact', 'blog', 'faqs', 'privacy-policy', 'refund-return-policy', 'terms-conditions'];
    if (pages.indexOf(lastPart) !== -1) return { page: lastPart, param: null };
  }

  var hash = window.location.hash.replace('#', '');
  if (hash) {
    var parts = hash.split('/');
    return { page: parts[0] || 'home', param: parts[1] || null };
  }

  return { page: 'home', param: null };
}

function captureSiteHeaderTemplate() {
  var header = document.getElementById('site-header');
  if (header) siteHeaderTemplateHtml = header.outerHTML;
}

function ensureSiteHeader() {
  var header = document.getElementById('site-header');
  if (header) return header;
  if (!siteHeaderTemplateHtml) return null;

  var wrap = document.createElement('div');
  wrap.innerHTML = siteHeaderTemplateHtml;
  header = wrap.firstElementChild;
  var anchor = document.getElementById('site-header-anchor') || document.body;
  anchor.appendChild(header);
  initSearch();
  updateCartUI();
  return header;
}

function placeSiteHeader(page) {
  if (page === 'product') {
    var productHeader = ensureSiteHeader();
    if (!productHeader) return;
    var productAnchor = document.getElementById('site-header-anchor');
    if (productAnchor && productHeader.parentElement !== productAnchor) {
      productAnchor.appendChild(productHeader);
    }
    setHeaderLogoForPage(page);
    return;
  }

  var header = ensureSiteHeader();
  if (!header) return;

  if (page === 'home') {
    var hero = document.getElementById('hero-section');
    if (hero && header.parentElement !== hero) {
      hero.insertBefore(header, hero.firstChild);
    } else if (hero && hero.firstElementChild !== header) {
      hero.insertBefore(header, hero.firstChild);
    }
    return;
  }

  if (page === 'category') {
    var categoryHero = document.getElementById('category-hero-section');
    if (categoryHero && header.parentElement !== categoryHero) {
      categoryHero.insertBefore(header, categoryHero.firstChild);
    } else if (categoryHero && categoryHero.firstElementChild !== header) {
      categoryHero.insertBefore(header, categoryHero.firstChild);
    }
    return;
  }

  if (page === 'blog') {
    var blogHero = document.querySelector('#page-blog .blog-hero');
    if (blogHero && header.parentElement !== blogHero) {
      blogHero.insertBefore(header, blogHero.firstChild);
    } else if (blogHero && blogHero.firstElementChild !== header) {
      blogHero.insertBefore(header, blogHero.firstChild);
    }
    return;
  }

  var pageHeaderPages = ['shop', 'bestsellers', 'new-arrivals', 'gift-picks', 'cart', 'contact'];
  if (pageHeaderPages.indexOf(page) >= 0) {
    var pageHero = document.querySelector('#page-' + page + ' .page-header');
    if (pageHero && header.parentElement !== pageHero) {
      pageHero.insertBefore(header, pageHero.firstChild);
    } else if (pageHero && pageHero.firstElementChild !== header) {
      pageHero.insertBefore(header, pageHero.firstChild);
    }
    return;
  }

  if (INFO_PAGES[page]) {
    var infoHero = document.querySelector('#page-' + page + ' .info-hero');
    if (infoHero && header.parentElement !== infoHero) {
      infoHero.insertBefore(header, infoHero.firstChild);
    } else if (infoHero && infoHero.firstElementChild !== header) {
      infoHero.insertBefore(header, infoHero.firstChild);
    }
    return;
  }

  var anchor = document.getElementById('site-header-anchor');
  if (anchor && header.parentElement !== anchor) {
    anchor.appendChild(header);
  }
}

function navigate(page, param, skipHistory) {
  document.documentElement.removeAttribute('data-initial-page');

  if (currentPage === page && (page !== 'product' && page !== 'category' || (currentProduct === param || currentCategory === param))) {
    placeSiteHeader(page);
    updateSeoMeta(page, param);
    return;
  }

  if (!skipHistory) {
    window.history.pushState({ page: page, param: param }, '', getRouteUrl(page, param));
  }

  // Hide all pages
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });

  // Close overlays
  closeCart();
  closeMobileNav();
  closeShopDropdown();
  closeSearch();

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.classList.toggle('active', link.getAttribute('data-page') === page);
  });

  currentPage = page;
  document.body.setAttribute('data-page', page);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Show the right page
  switch (page) {
    case 'home':
      showPage('home');
      break;
    case 'shop':
      showPage('shop');
      renderShop();
      break;
    case 'bestsellers':
      showPage('bestsellers');
      renderProductGrid('bestsellers-grid', getBestsellers(), 40);
      break;
    case 'new-arrivals':
      showPage('new-arrivals');
      renderProductGrid('new-arrivals-grid', getNewArrivals(), 40);
      break;
    case 'gift-picks':
      showPage('gift-picks');
      renderProductGrid('gift-picks-grid', getGiftPicks(), 40);
      break;
    case 'blog':
      showPage('blog');
      break;
    case 'faqs':
    case 'privacy-policy':
    case 'refund-return-policy':
    case 'terms-conditions':
      renderInfoPage(page);
      showPage(page);
      break;
    case 'category':
      currentCategory = param;
      showPage('category');
      renderCategoryPage(param);
      break;
    case 'product':
      currentProduct = param;
      showPage('product');
      renderProductPage(param);
      break;
    case 'cart':
      showPage('cart');
      renderCartPage();
      break;
    case 'contact':
      showPage('contact');
      renderContactPage();
      break;
    default:
      showPage('404');
  }

  // Some page renderers rebuild their page body, so seat the shared navbar
  // only after rendering to avoid destroying the header during innerHTML updates.
  placeSiteHeader(page);
  updateSeoMeta(page, param);
}

function showPage(name) {
  var el = document.getElementById('page-' + name);
  if (!el && INFO_PAGES[name]) {
    el = document.createElement('div');
    el.id = 'page-' + name;
    el.className = 'page';
    var footer = document.querySelector('.site-footer');
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(el, footer);
    } else {
      document.body.appendChild(el);
    }
  }
  if (el) el.classList.add('active');

  setHeaderLogoForPage(name);
}

function setHeaderLogoForPage(page) {
  var nextLogo = page === 'product' ? PRODUCT_LOGO_SRC : LOGO_TRANSPARENT_SRC;
  document.querySelectorAll('.logo-img, .mobile-nav-logo img').forEach(function(logoImg) {
    logoImg.src = nextLogo;
  });
}

function updateSeoMeta(page, param) {
  var title = 'Majestic Games & Toys World - Board Games, Toys & Puzzles in Kenya';
  var desc = 'Shop board games, card games, puzzles, toys and party games in Kenya. Same-day delivery available in Nairobi from Majestic Games & Toys World.';
  var keywords = 'board games Kenya, card games Nairobi, puzzles Kenya, toys Nairobi, party games Kenya';
  var product = null;

  if (page === 'product') {
    product = getProductById(param);
    if (product) {
      title = product.name + ' | Buy Online in Kenya | Majestic Games';
      desc = (product.metaDescription || product.shortDescription || product.desc || '').slice(0, 155);
      keywords = (product.seoKeywords || []).join(', ');
    }
  } else if (page === 'category') {
    var cat = CATEGORIES.find(function(c) { return c.id === param; }) || CATEGORY_GROUP_PAGES[param];
    if (cat) {
      title = cat.label + ' in Kenya | Majestic Games & Toys World';
      desc = 'Shop ' + cat.label.toLowerCase() + ' in Nairobi and across Kenya. Browse prices, gift picks and game-night favorites from Majestic Games & Toys World.';
      keywords = cat.label + ' Kenya, ' + cat.label + ' Nairobi, buy games online Kenya, Majestic Games';
    }
  } else if (page === 'shop') {
    title = 'Shop Games & Toys in Kenya | Majestic Games & Toys World';
  } else if (page === 'bestsellers') {
    title = 'Best Board Games & Toys in Kenya | Majestic Games Bestsellers';
  } else if (page === 'new-arrivals') {
    title = 'New Board Games, Card Games & Toys in Kenya | Majestic Games';
  } else if (page === 'gift-picks') {
    title = 'Gift Games & Toys in Kenya | Majestic Games Gift Picks';
  } else if (INFO_PAGES[page]) {
    title = INFO_PAGES[page].title + ' | Majestic Games & Toys World';
    desc = INFO_PAGES[page].intro;
    keywords = INFO_PAGES[page].title + ', Majestic Games Kenya, board games Nairobi, toys Kenya';
  }

  document.title = title;
  setMetaContent('description', desc);
  setMetaContent('keywords', keywords);
  var canonicalUrl = getAbsoluteSeoRouteUrl(page, param);
  var ogImage = product ? getAbsoluteSiteUrl(getProductImg(product)) : DEFAULT_OG_IMAGE;
  setMetaProperty('og:title', title);
  setMetaProperty('og:description', desc);
  setMetaProperty('og:image', ogImage);
  setMetaProperty('og:url', canonicalUrl);
  setMetaContent('twitter:card', 'summary_large_image');
  setMetaContent('twitter:title', title);
  setMetaContent('twitter:description', desc);
  setMetaContent('twitter:image', ogImage);
  setCanonical(getSeoRouteUrl(page, param));
  updateProductJsonLd(product);
  updateCollectionJsonLd(page, param);
}

function setMetaContent(name, content) {
  var el = document.querySelector('meta[name="' + name + '"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
}

function setMetaProperty(prop, content) {
  var el = document.querySelector('meta[property="' + prop + '"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', prop);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
}

function setCanonical(path) {
  var el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', getAbsoluteSiteUrl(path));
}

function getAbsoluteSiteUrl(path) {
  return new URL(path || '/', SITE_ORIGIN + '/').href;
}

function updateProductJsonLd(product) {
  var id = 'product-json-ld';
  var existing = document.getElementById(id);
  if (!product) {
    if (existing) existing.remove();
    return;
  }
  var cat = CATEGORIES.find(function(c) { return c.id === product.cat; });
  var facts = inferProductFacts(product, cat);
  var availability = product.availability === 'Out of Stock' ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock';
  var productUrl = getAbsoluteSeoRouteUrl('product', product.id);
  var categoryUrl = getAbsoluteSeoRouteUrl('category', product.cat);
  var images = getProductImgAll(product).map(function(src) { return getAbsoluteSiteUrl(src); });
  var script = existing || document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': productUrl + '#product',
        name: product.name,
        image: images,
        description: facts.benefitDescription,
        sku: product.id,
        category: facts.categoryLabel,
        brand: { '@type': 'Brand', name: 'Majestic Games & Toys World' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'KES',
          price: product.price,
          availability: availability,
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: '2027-12-31',
          url: productUrl,
          seller: { '@type': 'Organization', name: 'Majestic Games & Toys World' },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'KE' },
            shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'KES' },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
              transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 4, unitCode: 'DAY' }
            }
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'KE',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 7,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility'
          }
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': productUrl + '#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN + '/' },
          { '@type': 'ListItem', position: 2, name: facts.categoryLabel, item: categoryUrl },
          { '@type': 'ListItem', position: 3, name: product.name, item: productUrl }
        ]
      }
    ]
  });
  if (!existing) document.head.appendChild(script);
}

function updateCollectionJsonLd(page, param) {
  var id = 'collection-json-ld';
  var existing = document.getElementById(id);
  var products = [];
  var name = '';
  var url = getAbsoluteSeoRouteUrl(page, param);

  if (page === 'category' && param) {
    var cat = CATEGORIES.find(function(c) { return c.id === param; });
    products = getByCategory(param).slice(0, 24);
    name = cat ? cat.label + ' in Kenya' : 'Category products';
  } else if (page === 'shop') {
    products = PRODUCTS.slice(0, 24);
    name = 'Shop Games & Toys in Kenya';
  } else if (page === 'bestsellers') {
    products = getBestsellers().slice(0, 24);
    name = 'Best Board Games & Toys in Kenya';
  } else if (page === 'new-arrivals') {
    products = getNewArrivals().slice(0, 24);
    name = 'New Board Games, Card Games & Toys in Kenya';
  } else if (page === 'gift-picks') {
    products = getGiftPicks().slice(0, 24);
    name = 'Gift Games & Toys in Kenya';
  }

  if (!products.length) {
    if (existing) existing.remove();
    return;
  }

  var script = existing || document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url + '#collection',
    name: name,
    url: url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map(function(product, index) {
        return {
          '@type': 'ListItem',
          position: index + 1,
          url: getAbsoluteSeoRouteUrl('product', product.id),
          name: product.name
        };
      })
    }
  });
  if (!existing) document.head.appendChild(script);
}
/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   PRODUCT CARD RENDERER
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function getProductBadgeMarkup(product, inlineStyle) {
  var styleAttr = inlineStyle ? ' style="' + inlineStyle + '"' : '';
  var badges = '';

  if (product.badge === 'BESTSELLER') badges += '<span class="badge-bestseller"' + styleAttr + '>Bestseller</span>';
  else if (product.badge === 'NEW') badges += '<span class="badge-new"' + styleAttr + '>New Arrival</span>';
  else if (product.badge === 'GIFT PICKS') badges += '<span class="badge-gift"' + styleAttr + '>Gift Pick</span>';

  if (product.adult) badges += '<span class="badge-adult"' + styleAttr + '>18+</span>';

  return badges;
}

function renderProductCard(product) {
  var imgSrc = getProductImg(product);
  var badge = getProductBadgeMarkup(product);
  var facts = inferProductFacts(product);
  var availability = product.availability !== undefined ? product.availability : 'In Stock';
  var availClass = availability === 'Out of Stock' ? ' product-avail-out' : (availability === 'Low Stock' ? ' product-avail-low' : ' product-avail-in');
  var catLabel = (CATEGORIES.find(function(c) { return c.id === product.cat; }) || {}).label || product.cat;
  var productUrl = getRouteUrl('product', product.id);
  var popularity = product.badge === 'BESTSELLER' ? 'Customer favorite'
    : product.badge === 'GIFT PICKS' ? 'Popular gift pick'
    : product.cat === 'kids-games' || product.cat === 'family-games' ? 'Popular with families'
    : 'Popular pick';

  return '<article class="product-card">' +
    '<div class="product-img-wrap">' +
      '<a href="' + productUrl + '" class="product-card-media-link" onclick="return handleRouteClick(event,\'product\',\'' + product.id + '\')" aria-label="View ' + escHtml(product.name) + '">' +
        '<img class="product-img" src="' + imgSrc + '" alt="' + escHtml(product.name) + '" loading="lazy" />' +
        '<div class="product-img-gradient"></div>' +
      '</a>' +
      '<div class="product-badges">' + badge + '</div>' +
      '<div class="product-quick-view">' +
        '<button class="quick-view-btn" onclick="return handleActionClick(event,function(){openQuickView(\'' + product.id + '\')})" aria-label="Quick view ' + escHtml(product.name) + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' +
          'Quick View' +
        '</button>' +
      '</div>' +
      '<div class="product-cat-label">' + catLabel + '</div>' +
    '</div>' +
    '<div class="product-info">' +
      '<h3 class="product-name"><a href="' + productUrl + '" onclick="return handleRouteClick(event,\'product\',\'' + product.id + '\')">' + escHtml(product.name) + '</a></h3>' +
      (product.shortDescription ? '<p class="product-card-desc">' + escHtml(product.shortDescription) + '</p>' : '') +
      '<div class="product-card-play-meta">' +
        '<span>' + escHtml(facts.ageRange) + '</span>' +
        '<span>' + escHtml(facts.players) + '</span>' +
      '</div>' +
      '<div class="product-availability' + availClass + '">' + availability + '</div>' +
      '<div class="product-popularity">' + popularity + '</div>' +
      '<div class="product-footer">' +
        '<span class="product-price">KES ' + product.price.toLocaleString() + '</span>' +
        '<button class="add-to-cart-btn" onclick="return handleActionClick(event,function(){handleAddToCart(\'' + product.id + '\',this)}.bind(this))">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>' +
          'Add' +
        '</button>' +
      '</div>' +
    '</div>' +
  '</article>';
}
function handleAddToCart(id, btn) {
  var product = getProductById(id);
  if (!product) return;
  if (btn) {
    btn.classList.add('adding');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Added!';
  }
  addToCart(product);
  setTimeout(function() {
    if (!btn) return;
    btn.classList.remove('adding');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg> Add';
  }, 1500);
}

function renderProductGrid(containerId, products, limit) {
  var el = document.getElementById(containerId);
  if (!el) return;
  if (el.getAttribute('data-prerendered') === 'true' && el.children.length) return;
  var items = limit ? products.slice(0, limit) : products;
  if (items.length === 0) {
    el.innerHTML = '<div class="empty-state"><div class="empty-state-icon">BG</div><h3 class="empty-state-title">No products found</h3></div>';
    return;
  }
  el.innerHTML = items.map(renderProductCard).join('');
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   HOME PAGE RENDERING
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function renderHomePage() {
  // Categories grid
  var catGrid = document.getElementById('home-categories-grid');
  if (catGrid) {
    catGrid.innerHTML = HOME_CATEGORY_MENU.map(renderHomeCategoryMenuItem).join('');
  }

  // Bestsellers (10 cards)
  renderProductGrid('home-bestsellers-grid', getBestsellers(), 10);

  // New Arrivals (10 cards)
  renderProductGrid('home-new-arrivals-grid', getNewArrivals(), 10);

  // Gift Picks (10 cards)
  renderProductGrid('home-gift-picks-grid', getGiftPicks(), 10);

  // Delivery zones
  var dzGrid = document.getElementById('delivery-zones-grid');
  if (dzGrid) {
    dzGrid.innerHTML = DELIVERY_ZONES.map(function(zone) {
      return '<div class="zone-card">' +
        '<div class="zone-label">' + zone.label + '</div>' +
        '<div class="zone-meta">' +
          '<span class="zone-fee">KES ' + zone.fee + '</span>' +
          '<span>Ã¢ÂÂ± ' + zone.time + '</span>' +
        '</div>' +
      '</div>';
    }).join('');
  }
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   SHOP PAGE
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
var shopFilter = 'all';
function renderContactPage() {
  var page = document.getElementById('page-contact');
  if (!page) return;

  page.innerHTML =
    '<section class="page-header collection-hero collection-hero-contact">' +
      '<div class="container">' +
        '<span class="hero-kicker">Talk to Majestic Games</span>' +
        '<h1 class="page-header-title">Contact Us</h1>' +
        '<p class="page-header-sub">Need help choosing a game, confirming stock, planning delivery, or picking a gift? Reach us before you buy and we will help match the right product to the people, age range, budget, and occasion.</p>' +
        '<div class="hero-points">' +
          '<span>WhatsApp recommendations</span>' +
          '<span>Nairobi delivery support</span>' +
          '<span>Store pickup guidance</span>' +
        '</div>' +
      '</div>' +
    '</section>' +
    '<section class="contact-section contact-section-modern">' +
      '<div class="container">' +
        '<div class="contact-modern-grid">' +
          '<div class="contact-main-column">' +
            '<div class="contact-banner">' +
              '<div class="contact-banner-icon">KES</div>' +
              '<div><strong>Free Nairobi delivery over KES 8,000</strong><p>Add enough games or toys to your cart and qualify for complimentary Nairobi delivery.</p></div>' +
            '</div>' +
            '<div class="contact-info-card contact-modern-card">' +
              '<div class="contact-card-head"><span>Delivery</span><h2>Choose how you receive your order</h2></div>' +
              '<div class="delivery-option-grid">' +
                renderDeliveryOption('Pickup', 'Free', 'Commerce House, Moi Avenue. Best if you want to inspect or collect fast.') +
                renderDeliveryOption('Same-day', 'Nairobi', 'Available for confirmed orders before 2PM, depending on rider availability.') +
                renderDeliveryOption('Next-day', 'Flexible', 'Ideal for late orders, bulky games, or areas outside central Nairobi.') +
                renderDeliveryOption('Countrywide', '2-4 days', 'We send orders to towns across Kenya using reliable courier options.') +
              '</div>' +
            '</div>' +
            '<div class="contact-info-card contact-modern-card">' +
              '<div class="contact-card-head"><span>Nairobi zones</span><h2>Delivery fees by area</h2></div>' +
              '<div id="contact-delivery-zones-nairobi" class="contact-zone-grid"></div>' +
            '</div>' +
            '<div class="contact-info-card contact-modern-card">' +
              '<div class="contact-card-head"><span>Outside Nairobi</span><h2>Countrywide delivery guide</h2></div>' +
              '<div class="delivery-table-wrap">' +
                '<table class="delivery-table">' +
                  '<thead><tr><th>Region</th><th>Towns</th><th>Fee</th><th>Time</th></tr></thead>' +
                  '<tbody>' +
                    '<tr><td>Central</td><td>Thika, Kiambu, Limuru</td><td>KES 500</td><td>1-2 days</td></tr>' +
                    '<tr><td>Coast</td><td>Mombasa, Malindi, Kilifi</td><td>KES 700</td><td>2-3 days</td></tr>' +
                    '<tr><td>Western</td><td>Kisumu, Eldoret, Nakuru</td><td>KES 600</td><td>2-3 days</td></tr>' +
                    '<tr><td>Eastern</td><td>Meru, Embu, Machakos</td><td>KES 600</td><td>2-3 days</td></tr>' +
                    '<tr><td>Other towns</td><td>All other towns</td><td>KES 800</td><td>3-4 days</td></tr>' +
                  '</tbody>' +
                '</table>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<aside class="contact-side-column">' +
            '<div class="contact-info-card contact-modern-card contact-sticky-card">' +
              '<div class="contact-card-head"><span>Get in touch</span><h2>Contact details</h2></div>' +
              '<div class="contact-list">' +
                renderContactItem('WhatsApp', '+254 710 707 973', 'https://wa.me/254710707973') +
                renderContactItem('Phone', '+254 710 707 973', 'tel:+254710707973') +
                renderContactItem('Location', 'Commerce House, Moi Avenue, Nairobi', 'https://www.google.com/maps/search/?api=1&query=Commerce+House,+Moi+Avenue,+Nairobi') +
                '<div class="contact-list-item"><span>Hours</span><strong>Mon-Sat: 8am-8pm</strong></div>' +
              '</div>' +
            '</div>' +
            '<div class="contact-info-card contact-modern-card">' +
              '<div class="contact-card-head"><span>Visit us</span><h2>Find the store</h2></div>' +
              '<div class="contact-map-wrap"><iframe src="https://maps.google.com/maps?q=Commerce+House+Moi+Avenue+Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
              '<a class="contact-map-link" href="https://www.google.com/maps/search/?api=1&query=Commerce+House,+Moi+Avenue,+Nairobi" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>' +
            '</div>' +
            '<div class="contact-info-card contact-modern-card">' +
              '<div class="contact-card-head"><span>Social</span><h2>Follow Majestic</h2></div>' +
              '<div class="social-link-grid">' +
                '<a href="https://www.instagram.com/majesticgamesworld" target="_blank" rel="noopener noreferrer">Instagram<span>@majesticgamesworld</span></a>' +
                '<a href="https://tiktok.com/@majesticgamesworld" target="_blank" rel="noopener noreferrer">TikTok<span>@majesticgamesworld</span></a>' +
                '<a href="https://www.facebook.com/share/1859yTLwx3/" target="_blank" rel="noopener noreferrer">Facebook<span>Majestic Games World</span></a>' +
              '</div>' +
            '</div>' +
            '<div class="contact-help-card">' +
              '<h2>Not sure what to buy?</h2>' +
              '<p>Tell us the age, group size, budget, and occasion. We will suggest games that fit.</p>' +
              '<a href="https://wa.me/254710707973?text=Hi%20Majestic%20Games%20World!%20Please%20recommend%20a%20game%20for%20me." target="_blank" rel="noopener noreferrer">Ask for a recommendation</a>' +
            '</div>' +
          '</aside>' +
        '</div>' +
      '</div>' +
    '</section>';

  renderContactDelivery();
}

function renderInfoPage(pageId) {
  var data = INFO_PAGES[pageId];
  if (!data) return;

  var page = document.getElementById('page-' + pageId);
  if (!page) {
    page = document.createElement('div');
    page.id = 'page-' + pageId;
    page.className = 'page';
    var footer = document.querySelector('.site-footer');
    if (footer && footer.parentNode) footer.parentNode.insertBefore(page, footer);
    else document.body.appendChild(page);
  }

  page.innerHTML =
    '<section class="info-hero">' +
      '<div class="container">' +
        '<div class="breadcrumb">' +
          '<a href="' + getRouteUrl('home') + '" onclick="return handleRouteClick(event,\'home\')">Home</a>' +
          '<span>&#8250;</span>' +
          '<span>' + escHtml(data.title) + '</span>' +
        '</div>' +
        '<span class="hero-kicker">' + escHtml(data.kicker) + '</span>' +
        '<h1 class="page-header-title">' + escHtml(data.title) + '</h1>' +
        '<p class="page-header-sub">' + escHtml(data.intro) + '</p>' +
      '</div>' +
    '</section>' +
    '<section class="info-section">' +
      '<div class="container">' +
        '<div class="info-layout">' +
          '<aside class="info-sidebar">' +
            '<span>Majestic Guide</span>' +
            '<a href="' + getRouteUrl('faqs') + '" onclick="return handleRouteClick(event,\'faqs\')">FAQs</a>' +
            '<a href="' + getRouteUrl('privacy-policy') + '" onclick="return handleRouteClick(event,\'privacy-policy\')">Privacy Policy</a>' +
            '<a href="' + getRouteUrl('refund-return-policy') + '" onclick="return handleRouteClick(event,\'refund-return-policy\')">Refund & Return Policy</a>' +
            '<a href="' + getRouteUrl('terms-conditions') + '" onclick="return handleRouteClick(event,\'terms-conditions\')">Terms & Conditions</a>' +
            '<a href="' + getRouteUrl('blog') + '" onclick="return handleRouteClick(event,\'blog\')">Blog</a>' +
          '</aside>' +
          '<div class="info-content">' +
            data.sections.map(function(section) {
              return '<article class="info-card">' +
                '<h2>' + escHtml(section.title) + '</h2>' +
                section.body.map(function(paragraph) {
                  return '<p>' + escHtml(paragraph) + '</p>';
                }).join('') +
              '</article>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
}

function renderDeliveryOption(title, meta, copy) {
  return '<div class="delivery-option-card"><span>' + title + '</span><strong>' + meta + '</strong><p>' + copy + '</p></div>';
}

function renderContactItem(label, value, href) {
  var target = href.indexOf('http') === 0 ? ' target="_blank" rel="noopener noreferrer"' : '';
  return '<a class="contact-list-item" href="' + href + '"' + target + '><span>' + label + '</span><strong>' + value + '</strong></a>';
}

function renderContactDelivery() {
  var el = document.getElementById('contact-delivery-zones-nairobi');
  if (!el) return;
  
  var zones = DELIVERY_ZONES.slice(0, 5);
  var colors = ['#FF4D2E','#FF6B35','#FF8C42','#2EBFB0','#7C3AED'];
  
  el.innerHTML = zones.map(function(zone, i) {
    var color = colors[i % colors.length];
    var areas = zone.areas.split(',').map(function(a) { return a.trim(); });
    return '<div style="border-radius:16px;overflow:hidden;border:2px solid #111;box-shadow:3px 3px 0 #111">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:' + color + ';color:white">' +
        '<div style="display:flex;align-items:center;gap:12px">' +
          '<span style="background:rgba(255,255,255,0.25);padding:4px 12px;border-radius:20px;font-weight:700;font-size:0.75rem">Zone ' + String.fromCharCode(65+i) + '</span>' +
          '<span style="font-weight:600;font-size:0.95rem">' + zone.label.split('-')[0].trim() + '</span>' +
        '</div>' +
        '<span style="font-weight:800;font-size:1.1rem">KES ' + zone.fee + '</span>' +
      '</div>' +
      '<div style="padding:14px;font-size:0.8rem;color:#475569;line-height:1.6">' + 
        '<div style="font-weight:600;color:#111;margin-bottom:8px">Areas:</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:6px">' + 
          areas.map(function(area) { 
            return '<span style="background:#f3f4f6;border:1px solid #e5e7eb;padding:4px 10px;border-radius:20px;font-size:0.75rem;color:#374151">' + area + '</span>'; 
          }).join('') + 
        '</div>' +
      '</div>' +
      '<div style="padding:10px 16px;background:#111;color:white;border-top:2px solid #111;font-size:0.75rem;font-weight:600">Delivery: ' + zone.time + '</div>' +
    '</div>';
  }).join('');
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   FOOTER
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function initFooter() {
  var footer = document.querySelector('.site-footer');
  if (footer) {
    footer.innerHTML =
      '<div class="footer-wave-top" aria-hidden="true"></div>' +
      '<div class="footer-curvy-main">' +
        '<div class="footer-orbit" aria-hidden="true"><span></span><span></span><span></span></div>' +
        '<div class="footer-curvy-inner">' +
          '<section class="footer-brand-panel" aria-label="Majestic Games footer">' +
            '<a href="#" class="footer-logo-mark" onclick="navigate(\'home\')" aria-label="Back to Majestic Games home">' +
              '<img src="' + LOGO_TRANSPARENT_SRC + '" alt="Majestic Games & Toys World" loading="lazy" />' +
            '</a>' +
             '<div class="footer-brand-copy">' +
              '<div class="footer-brand-text">' +
                '<h2>play better <span class="footer-highlight">shop smarter</span></h2>' +
              '</div>' +
              '<div class="footer-right-section">' +
                '<div class="footer-socials" aria-label="Social links">' +
                  '<a href="https://www.instagram.com/majesticgamesworld" target="_blank" rel="noopener noreferrer" class="footer-social-link instagram" aria-label="Instagram">' +
                    '<img src="' + BRANDING_ASSET_BASE + 'instagram.png" alt="Instagram" loading="lazy" />' +
                    '<span class="social-tooltip">Instagram</span>' +
                  '</a>' +
                  '<a href="https://tiktok.com/@majesticgamesworld" target="_blank" rel="noopener noreferrer" class="footer-social-link tiktok" aria-label="TikTok">' +
                    '<img src="' + BRANDING_ASSET_BASE + 'tiktok.png" alt="TikTok" loading="lazy" />' +
                    '<span class="social-tooltip">TikTok</span>' +
                  '</a>' +
                  '<a href="https://www.facebook.com/share/1859yTLwx3/" target="_blank" rel="noopener noreferrer" class="footer-social-link facebook" aria-label="Facebook">' +
                    '<img src="' + BRANDING_ASSET_BASE + 'facebook.png" alt="Facebook" loading="lazy" />' +
                    '<span class="social-tooltip">Facebook</span>' +
                  '</a>' +
                  '<a href="https://wa.me/254710707973" target="_blank" rel="noopener noreferrer" class="footer-social-link whatsapp" aria-label="WhatsApp">' +
                    '<img src="' + BRANDING_ASSET_BASE + 'whatsapp.png" alt="WhatsApp" loading="lazy" />' +
                    '<span class="social-tooltip">WhatsApp</span>' +
                  '</a>' +
                '</div>' +
                '<div class="footer-contact-info">' +
                  '<span class="footer-get-in-touch">Get in Touch: 0748472002 | 0710707973</span>' +
                '</div>' +
              '</div>' +
             '</div>' +
           '</section>' +
           '<div class="footer-ribbon">' +
             '<nav class="footer-policy-nav" aria-label="Footer pages">' +
               '<a href="' + getRouteUrl('faqs') + '" onclick="return handleRouteClick(event,\'faqs\')">FAQs</a>' +
               '<span class="footer-pipe"> | </span>' +
               '<a href="' + getRouteUrl('blog') + '" onclick="return handleRouteClick(event,\'blog\')">Blog</a>' +
               '<span class="footer-pipe"> | </span>' +
               '<a href="' + getRouteUrl('privacy-policy') + '" onclick="return handleRouteClick(event,\'privacy-policy\')">Privacy Policy</a>' +
               '<span class="footer-pipe"> | </span>' +
               '<a href="' + getRouteUrl('refund-return-policy') + '" onclick="return handleRouteClick(event,\'refund-return-policy\')">Refund &amp; Return Policy</a>' +
               '<span class="footer-pipe"> | </span>' +
               '<a href="' + getRouteUrl('terms-conditions') + '" onclick="return handleRouteClick(event,\'terms-conditions\')">Terms &amp; Conditions</a>' +
             '</nav>' +
           '</div>' +
           '<div class="footer-bottom-inner">' +
             '<p class="footer-copyright" id="footer-copyright"></p>' +
             '<div class="footer-accept">' +
               '<span>Secure checkout</span>' +
               '<span class="payment-chip mpesa">M-Pesa</span>' +
               '<span class="payment-chip mastercard"><i></i><b></b></span>' +
               '<span class="payment-chip visa">VISA</span>' +
               '<span class="payment-chip paypal">PayPal</span>' +
             '</div>' +
           '</div>' +
         '</div>' +
       '</div>';
  }

  var linksEl = document.getElementById('footer-shop-links');
  if (linksEl) {
    linksEl.innerHTML = CATEGORIES.slice(0, 8).map(function(cat) {
      return '<a href="#" class="footer-link" onclick="navigate(\'category\',\'' + cat.id + '\')">' +
        '<span>&#8250;</span> ' + cat.label +
      '</a>';
    }).join('') + '<a href="#" class="footer-link footer-link-strong" onclick="navigate(\'shop\')"><span>&#128717;</span> All Products</a>';
  }

  // Copyright
  var copyrightEl = document.getElementById('footer-copyright');
  if (copyrightEl) {
    copyrightEl.textContent = 'Copyright ' + new Date().getFullYear() + ' Majestic Games & Toys World. All rights reserved.';
  }
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   NEWSLETTER
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function showToast(title, desc, icon) {
  var container = document.getElementById('toast-container');
  if (!container) return;

  var toast = document.createElement('div');
  toast.className = 'toast success';
  toast.innerHTML =
    '<span class="toast-icon">' + (icon || 'OK') + '</span>' +
    '<div class="toast-body">' +
      '<div class="toast-title">' + escHtml(title) + '</div>' +
      (desc ? '<div class="toast-desc">' + escHtml(desc) + '</div>' : '') +
    '</div>';

  container.appendChild(toast);

  setTimeout(function() {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
  }, 3000);
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   CONFETTI BURST
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
var confettiColors = ['#e8521a','#2ebfb0','#d4a843','#c9a14c','#4a1211','#25D366'];

function confettiBurst() {
  for (var i = 0; i < 12; i++) {
    (function(i) {
      setTimeout(function() {
        var piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = '-10px';
        piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        piece.style.animationDuration = (1.5 + Math.random()) + 's';
        piece.style.animationDelay = (Math.random() * 0.3) + 's';
        document.body.appendChild(piece);
        setTimeout(function() { if (piece.parentNode) piece.parentNode.removeChild(piece); }, 2500);
      }, i * 50);
    })(i);
  }
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   HEADER SCROLL EFFECT
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function initHeaderScroll() {
  window.addEventListener('scroll', function() {
    var header = document.getElementById('site-header');
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
    var menu = document.getElementById('shop-dropdown-menu');
    if (menu && menu.classList.contains('open')) positionSmartShopMenu();
  }, { passive: true });
  window.addEventListener('resize', function() {
    var menu = document.getElementById('shop-dropdown-menu');
    if (menu && menu.classList.contains('open')) positionSmartShopMenu();
  }, { passive: true });
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   CLOSE DROPDOWNS ON OUTSIDE CLICK
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function initOutsideClickHandlers() {
  document.addEventListener('click', function(e) {
    // Shop dropdown
    var dropdown = document.getElementById('shop-dropdown');
    if (dropdown && !dropdown.contains(e.target)) closeShopDropdown();

    // Search panel
    var searchContainer = document.getElementById('search-container');
    if (searchContainer && !searchContainer.contains(e.target)) closeSearch();
  });

  // ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSearch();
      closeShopDropdown(true);
      closeMobileNav(true);
      closeCart();
      closeQuickView();
      closeImageZoom();
    }
  });
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   UTILITY
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function escHtml(str) {
  if (window.MGWSecurity && window.MGWSecurity.escapeHtml) {
    return window.MGWSecurity.escapeHtml(str);
  }
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, function(ch) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
  });
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    INIT - runs on DOMContentLoaded
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(event) {
    var link = event.target.closest && event.target.closest('a[href="#"]');
    if (link) event.preventDefault();
  }, true);

  captureSiteHeaderTemplate();

  // Load persisted cart if valid
  loadCart();
  loadWishlist();
  updateCartUI();

  // Init dark mode (check saved preference)
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  function toggleDarkMode() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateDarkModeIcon();
  }
  window.toggleDarkMode = toggleDarkMode;

  function updateDarkModeIcon() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var icon = document.getElementById('dark-mode-icon');
    if (icon) {
      if (isDark) {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
      } else {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
      }
    }
  }
  updateDarkModeIcon();

  // Initialize all components
  initTopBanner();
  initHero();
  renderHomePage();
  initGameFinder();
  initShopDropdown();
  initMobileNav();
  initSearch();
  initFooter();
  initHeaderScroll();
  initOutsideClickHandlers();
  initShopPage();

  // Restore direct product/category/page URLs such as ?product=azul.
  var initialRoute = getRouteFromLocation();
  navigate(initialRoute.page, initialRoute.param, true);
  var prettyRoute = new URLSearchParams(window.location.search || '').get('pretty');
  if (prettyRoute && initialRoute.page === prettyRoute && window.history && window.history.replaceState) {
    window.history.replaceState({ page: initialRoute.page, param: initialRoute.param || null }, '', getRouteUrl(initialRoute.page, initialRoute.param));
  }

  // Handle browser back/forward (history management)
  var pageHistory = [{ page: 'home', param: null }];

  window.addEventListener('hashchange', function() {
    var route = getRouteFromLocation();
    navigate(route.page, route.param);
  });

  window.addEventListener('popstate', function(e) {
    if (e.state && e.state.page) {
      navigate(e.state.page, e.state.param, true);
    } else {
      var route = getRouteFromLocation();
      navigate(route.page, route.param, true);
    }
  });

  function navigateWithHistory(page, param) {
    if (currentPage !== page || currentCategory !== param) {
      pageHistory.push({ page: page, param: param });
      window.history.pushState({ page: page, param: param }, '', getRouteUrl(page, param));
    }
    navigate(page, param);
  }

  console.log('%cMajestic Games & Toys World', 'color:#e8521a;font-size:1.2rem;font-weight:bold');
  console.log('%c' + PRODUCTS.length + ' products loaded', 'color:#2ebfb0;font-size:0.9rem');
});
