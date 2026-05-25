/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   HERO SLIDER
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
var heroSlides = [
  {
    bg: 'images/branding/hero-banner.jpg',
    badge: 'Kenya\'s #1 board games store',
    titleMain: 'More than games.',
    titleSub: 'Moments that bring us together.',
    desc: 'Discover board games, puzzles, toys, and gifts for every age and every occasion.',
    feature: {
      id: 'catan',
      image: 'images/catan-board-game-nairobi.webp',
      label: 'Bestseller',
      title: 'Catan Board Game',
      copy: 'A modern classic for trading, strategy, and one-more-round energy.',
      price: 'KES 2,699'
    },
    ctas: [
      { label: 'Shop on WhatsApp', color: '#ffbf22', page: 'contact' },
      { label: 'Find the Perfect Game', color: 'rgba(9,12,18,0.42)', page: 'shop' }
    ]
  },
  {
    bg: 'images/branding/couples-banner.webp',
    badge: 'Cozy date-night games',
    titleMain: 'Play Closer',
    titleSub: 'Together',
    desc: 'Card games, conversation starters, and playful challenges for couples who want an easy night in.',
    feature: {
      id: 'the-ultimate-game-for-couples',
      image: 'images/the-ultimate-game-for-couples-game-nairobi.webp',
      label: 'Date night pick',
      title: 'Ultimate Game for Couples',
      copy: 'Light, fun prompts for connection, laughter, and better conversations.',
      price: 'KES 1,999'
    },
    ctas: [
      { label: 'Couples Games', color: '#e03b87', page: 'category', param: 'couples-games' },
      { label: 'Gift Picks', color: 'rgba(255,255,255,0.14)', page: 'gift-picks' }
    ]
  },
  {
    bg: 'images/branding/kids-banner.webp',
    badge: 'Bright screen-free play',
    titleMain: 'Kids Learn',
    titleSub: 'Through Play',
    desc: 'Colorful blocks, puzzles, board games, and toys that keep curious hands busy while learning feels natural.',
    feature: {
      id: 'beat-the-parents',
      image: 'images/beat-the-parents-kids-game-nairobi.webp',
      label: 'Family favorite',
      title: 'Beat the Parents',
      copy: 'Easy-to-teach family competition that gets everyone involved.',
      price: 'KES 2,499'
    },
    ctas: [
      { label: 'Kids Games', color: '#16a34a', page: 'category', param: 'kids-games' },
      { label: 'TOYS', color: 'rgba(255,255,255,0.14)', page: 'category', param: 'stem-toys' }
    ]
  },
  {
    bg: 'images/branding/gift-banner-generated.webp',
    badge: 'Gift-ready games and toys',
    titleMain: 'Find The',
    titleSub: 'Perfect Gift',
    desc: 'Wrapped surprises, family games, puzzles, and toys chosen for birthdays, holidays, rewards, and thoughtful moments.',
    feature: {
      id: 'azul',
      image: 'images/azul-board-game-nairobi.webp',
      label: 'Premium table pick',
      title: 'Azul Board Game',
      copy: 'Beautiful strategy, easy rules, and an elegant table presence.',
      price: 'KES 2,499'
    },
    ctas: [
      { label: 'View Gift Picks', color: '#d4a843', page: 'gift-picks' },
      { label: 'Ask For Help', color: 'rgba(255,255,255,0.14)', page: 'contact' }
    ]
  }
];

var currentHeroSlide = 0;
var heroTimer = null;

function initHero() {
  var section = document.getElementById('hero-section');
  if (!section) return;

  // Create slide backgrounds
  section.querySelectorAll('.hero-slide').forEach(function(slide) {
    slide.remove();
  });
  var firstHeroChild = section.firstChild;
  heroSlides.forEach(function(slide, i) {
    var slideEl = document.createElement('div');
    slideEl.className = 'hero-slide' + (i === 0 ? ' active' : '');
    slideEl.innerHTML = '<div class="hero-bg" style="background-image:url(\'' + slide.bg + '\')"></div><div class="hero-overlay"></div>';
    section.insertBefore(slideEl, firstHeroChild);
  });

  // Create dots
  var dotsEl = document.getElementById('hero-dots');
  if (dotsEl) {
    dotsEl.innerHTML = heroSlides.map(function(_, i) {
      return '<button class="hero-dot' + (i === 0 ? ' active' : '') + '" onclick="goToHeroSlide(' + i + ')" aria-label="Slide ' + (i+1) + '"></button>';
    }).join('');
  }

  updateHeroContent(0);
  startHeroTimer();
}

function updateHeroContent(idx) {
  var slide = heroSlides[idx];

  var badgeEl = document.getElementById('hero-badge');
  if (badgeEl) badgeEl.textContent = slide.badge;

  var titleMain = document.getElementById('hero-title-main');
  if (titleMain) titleMain.textContent = slide.titleMain;

  var titleSub = document.getElementById('hero-subtitle');
  if (titleSub) titleSub.textContent = slide.titleSub;

  var desc = document.getElementById('hero-desc');
  if (desc) desc.textContent = slide.desc;

  var ctas = document.getElementById('hero-ctas');
  if (ctas) {
    ctas.innerHTML = slide.ctas.map(function(cta) {
      var onclick = cta.param
        ? 'navigate(\'' + cta.page + '\',\'' + cta.param + '\')'
        : 'navigate(\'' + cta.page + '\')';
      return '<a href="#" class="hero-cta-btn" style="background:' + cta.color + '" onclick="' + onclick + '">' + cta.label + '</a>';
    }).join('');
  }

  var feature = slide.feature || {};
  var featureLink = document.getElementById('hero-feature-link');
  var featureImg = document.getElementById('hero-feature-img');
  var featureKicker = document.getElementById('hero-feature-kicker');
  var featureTitle = document.getElementById('hero-feature-title');
  var featureCopy = document.getElementById('hero-feature-copy');
  var featurePrice = document.getElementById('hero-feature-price');
  var featureBtn = document.getElementById('hero-feature-btn');
  if (featureLink) featureLink.onclick = function() { navigate('product', feature.id); return false; };
  if (featureImg) {
    featureImg.src = feature.image;
    featureImg.alt = feature.title || 'Featured game';
  }
  if (featureKicker) featureKicker.textContent = feature.label || '';
  if (featureTitle) featureTitle.textContent = feature.title || '';
  if (featureCopy) featureCopy.textContent = feature.copy || '';
  if (featurePrice) featurePrice.textContent = feature.price || '';
  if (featureBtn) featureBtn.onclick = function() { navigate('product', feature.id); };
}

function goToHeroSlide(idx) {
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dot');

  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); });
  dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });

  currentHeroSlide = idx;
  updateHeroContent(idx);
}

function heroSlide(dir) {
  var next = (currentHeroSlide + dir + heroSlides.length) % heroSlides.length;
  goToHeroSlide(next);
  resetHeroTimer();
}

function startHeroTimer() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  heroTimer = setInterval(function() {
    heroSlide(1);
  }, 8000);
}

function resetHeroTimer() {
  clearInterval(heroTimer);
  startHeroTimer();
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   GAME FINDER
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
var finderAnswers = {};
var finderStep = 0;

var categoryToTypes = {
  'board-games': ['strategy', 'party', 'family'],
  'card-games': ['strategy', 'party', 'fun'],
  'couples-games': ['romantic', 'intimate'],
  'family-games': ['family', 'fun'],
  'kids-games': ['educational', 'kids', 'family'],
  'party-games': ['party', 'fun'],
  'drinking-games': ['party', 'fun', 'adult'],
  'trivia-games': ['knowledge', 'fun'],
  'christian-games': ['faith', 'family'],
  'puzzles': ['puzzle', 'educational'],
  'lego-collectible': ['building', 'collectible'],
  'dolls': ['play', 'kids'],
  'infant-toys': ['baby', 'kids'],
  'musical-toys': ['music', 'fun'],
  'stem-toys': ['educational', 'science']
};

function initGameFinder() {
  finderAnswers = {};
  finderStep = 0;
  renderFinderStep();
}

function getFinderTypeOptions(audience, partyKind, adultConfirmed) {
  if (audience === 'kids') {
    return [
      { label: 'Learning / STEM', value: 'educational' },
      { label: 'Puzzle', value: 'puzzle' },
      { label: 'Active fun', value: 'active' },
      { label: 'Classic game', value: 'classic' }
    ];
  }
  if (audience === 'teens') {
    return [
      { label: 'Strategy', value: 'strategy' },
      { label: 'Puzzle', value: 'puzzle' },
      { label: 'Group fun', value: 'party' },
      { label: 'Classic game', value: 'classic' }
    ];
  }
  if (audience === 'family' || partyKind === 'family-party') {
    return [
      { label: 'Family night', value: 'family' },
      { label: 'Easy group play', value: 'party' },
      { label: 'Educational', value: 'educational' },
      { label: 'Puzzle / quiet play', value: 'puzzle' }
    ];
  }
  if (audience === 'couples' && adultConfirmed === 'yes') {
    return [
      { label: 'Romantic', value: 'romantic' },
      { label: 'Conversation', value: 'conversation' },
      { label: 'Strategy for two', value: 'strategy' },
      { label: 'Giftable date night', value: 'gift' }
    ];
  }
  if (audience === 'couples') {
    return [
      { label: 'Conversation', value: 'conversation' },
      { label: 'Strategy for two', value: 'strategy' },
      { label: 'Puzzle', value: 'puzzle' }
    ];
  }
  if (partyKind === 'adult-party' || audience === 'adults') {
    return [
      { label: 'Strategy', value: 'strategy' },
      { label: 'Party game', value: 'party' },
      { label: 'Conversation', value: 'conversation' },
      { label: 'Puzzle', value: 'puzzle' },
      { label: 'Drinking game', value: 'drinking' }
    ];
  }
  return [
    { label: 'Family-safe', value: 'family' },
    { label: 'Strategy', value: 'strategy' },
    { label: 'Puzzle', value: 'puzzle' },
    { label: 'Giftable classic', value: 'gift' }
  ];
}

function getFinderQuestions() {
  var questions = [{
    q: 'Who are we choosing for today?',
    key: 'audience',
    options: [
      { label: 'Kids', value: 'kids' },
      { label: 'Teens', value: 'teens' },
      { label: 'Family', value: 'family' },
      { label: 'Adults', value: 'adults' },
      { label: 'Couples', value: 'couples' },
      { label: 'Party', value: 'party' },
      { label: 'Gift', value: 'gift' }
    ]
  }];

  if (!finderAnswers.audience) return questions;

  if (finderAnswers.audience === 'gift') {
    questions.push({
      q: 'Who will receive the gift?',
      key: 'giftAudience',
      options: [
        { label: 'Kids', value: 'kids' },
        { label: 'Teens', value: 'teens' },
        { label: 'Family', value: 'family' },
        { label: 'Adults', value: 'adults' },
        { label: 'Couples', value: 'couples' }
      ]
    });
  }

  var effectiveAudience = finderAnswers.giftAudience || finderAnswers.audience;

  if (effectiveAudience === 'couples') {
    questions.push({
      q: 'Are all players 18+?',
      key: 'adultConfirmed',
      options: [
        { label: 'Yes, everyone is 18+', value: 'yes' },
        { label: 'No / Not sure', value: 'no' }
      ]
    });
  }

  if (finderAnswers.audience === 'party') {
    questions.push({
      q: 'What kind of party is it?',
      key: 'partyKind',
      options: [
        { label: 'Family-friendly party', value: 'family-party' },
        { label: 'Adults-only party', value: 'adult-party' }
      ]
    });
    if (finderAnswers.partyKind === 'adult-party') {
      questions.push({
        q: 'Are all players 18+?',
        key: 'adultConfirmed',
        options: [
          { label: 'Yes, everyone is 18+', value: 'yes' },
          { label: 'No / Not sure', value: 'no' }
        ]
      });
    }
  }

  var typeOptions = getFinderTypeOptions(effectiveAudience, finderAnswers.partyKind, finderAnswers.adultConfirmed);
  if (typeOptions.length) {
    questions.push({ q: 'What should the game feel like?', key: 'type', options: typeOptions });
  }

  if (finderAnswers.type === 'drinking' && finderAnswers.adultConfirmed !== 'yes') {
    questions.push({
      q: 'Are all players 18+?',
      key: 'adultConfirmed',
      options: [
        { label: 'Yes, everyone is 18+', value: 'yes' },
        { label: 'No / Not sure', value: 'no' }
      ]
    });
  }

  questions.push({
    q: 'How many people will play?',
    key: 'players',
    options: [
      { label: '1 player', value: '1' },
      { label: '2 players', value: '2' },
      { label: '3-4 players', value: '3-4' },
      { label: '5+ players', value: '5+' }
    ]
  });

  if (finderAnswers.players && (finderAnswers.players === '5+' || finderAnswers.players === '3-4')) {
    questions.push({
      q: 'How long should the game take?',
      key: 'duration',
      options: [
        { label: 'Quick (under 30 mins)', value: 'quick' },
        { label: 'Medium (30-60 mins)', value: 'medium' },
        { label: 'Long (1+ hour)', value: 'long' }
      ]
    });
  }

  if (!finderAnswers.budget) {
    questions.push({
      q: 'What\'s your budget?',
      key: 'budget',
      options: [
        { label: 'Under KES 1,500', value: 'budget' },
        { label: 'KES 1,500 - 3,000', value: 'mid' },
        { label: 'KES 3,000+', value: 'premium' }
      ]
    });
  }

  return questions;
}

function getFinderOptionDetails(key, value, label) {
  var details = {
    audience: {
      kids: ['K', 'Safe, bright picks for younger players'],
      teens: ['T', 'Social, smart games with a bit more challenge'],
      family: ['F', 'Easy-to-teach picks for mixed ages'],
      adults: ['A', 'Strategy, party, and grown-up game nights'],
      couples: ['2', 'Two-player picks, with adult filters when needed'],
      party: ['P', 'Group games for birthdays and hangouts'],
      gift: ['G', 'Reliable presents by age, budget, and occasion']
    },
    giftAudience: {
      kids: ['K', 'Child-friendly gifting'],
      teens: ['T', 'Cooler picks for older kids'],
      family: ['F', 'Games a whole household can share'],
      adults: ['A', 'Gifts for grown-up players'],
      couples: ['2', 'Date-night and two-player gifts']
    },
    adultConfirmed: {
      yes: ['18+', 'Adult-only categories may be included'],
      no: ['Safe', 'Adult, drinking, and intimate picks stay hidden']
    },
    partyKind: {
      'family-party': ['All', 'Clean group games for mixed ages'],
      'adult-party': ['18+', 'Bolder party options with age confirmation']
    },
    type: {
      educational: ['STEM', 'Learning, problem solving, and discovery'],
      puzzle: ['Grid', 'Quiet focus and satisfying challenges'],
      active: ['Move', 'Energetic play for busy hands'],
      classic: ['Classic', 'Familiar games that are easy to recommend'],
      strategy: ['Think', 'Planning, tactics, and clever decisions'],
      party: ['Laugh', 'Fast group fun and easy icebreakers'],
      family: ['Table', 'Shared table play for mixed ages'],
      romantic: ['Date', 'Adults-only date-night energy'],
      conversation: ['Chat', 'Prompts, bonding, and light interaction'],
      gift: ['Gift', 'Polished, easy-to-give choices'],
      drinking: ['18+', 'Adults-only drinking game picks']
    },
    duration: {
      quick: ['âš¡', 'Fast games under 30 minutes'],
      medium: ['â±', 'Standard games 30-60 minutes'],
      long: ['ðŸŽ®', 'Epic games over 1 hour']
    },
    budget: {
      budget: ['ðŸ’°', 'Great value under KES 1,500'],
      mid: ['ðŸ’Ž', 'Quality games KES 1,500-3,000'],
      premium: ['âœ¨', 'Premium picks over KES 3,000']
    },
    players: {
      '1': ['Solo', 'Puzzles, builds, and focused play'],
      '2': ['Duo', 'Best for pairs and head-to-head games'],
      '3-4': ['Small', 'A flexible small group setup'],
      '5+': ['Group', 'Bigger tables, teams, and party games']
    }
  };
  var item = details[key] && details[key][value];
  var iconFallback = (label && typeof label === 'string' && label.length) ? label.charAt(0) : '?';
  return {
    icon: item ? item[0] : iconFallback,
    hint: item ? item[1] : 'A good path for this recommendation'
  };
}

function getFinderAnswerLabel(key, value) {
  var questions = getFinderQuestions();
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].key !== key) continue;
    for (var j = 0; j < questions[i].options.length; j++) {
      if (questions[i].options[j].value === value) return questions[i].options[j].label;
    }
  }
  return value;
}

function getFinderAnswerChips() {
  return Object.keys(finderAnswers).map(function(key) {
    return '<span class="finder-answer-chip">' + escHtml(getFinderAnswerLabel(key, finderAnswers[key])) + '</span>';
  }).join('');
}

function getFinderScoredMatches(answers) {
  return PRODUCTS.map(function(p) {
    var meta = inferProductMeta(p);
    if (!isProductAllowedForAnswers(p, answers, meta)) return null;
    var result = getProductScore(p, answers, meta);
    return { product: p, score: result.score, reasons: result.reasons, meta: meta };
  }).filter(Boolean);
}

function getFinderLiveMatchCount() {
  if (!Object.keys(finderAnswers).length) return PRODUCTS.filter(function(p) { return !p.adult; }).length;
  return getFinderScoredMatches(finderAnswers).filter(function(item) { return item.score > 0; }).length;
}

function finderQuickAdd(id, event, btn) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  handleAddToCart(id, btn);
}

function getFinderAudienceIconHtml(value) {
  var icons = {
    kids: '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="finderIconKids" x1="10" y1="9" x2="54" y2="56" gradientUnits="userSpaceOnUse"><stop stop-color="#fff4a8"/><stop offset=".52" stop-color="#ff8eb5"/><stop offset="1" stop-color="#9587ff"/></linearGradient></defs><path d="M39 28c0 10-7.5 18-17 18S5 38 5 28 12.5 10 22 10s17 8 17 18Z" fill="url(#finderIconKids)" stroke="#071126" stroke-width="3"/><path d="M15 27c1-2 3-2 4 0M26 27c1-2 3-2 4 0M17 35c4 4 10 4 14 0" fill="none" stroke="#071126" stroke-width="3" stroke-linecap="round"/><path d="M39 32h12v24H39zM28 40h11v16H28zM51 43h8v13h-8z" fill="#ffe28a" stroke="#071126" stroke-width="3"/><path d="M31 53h25" stroke="#8d82ff" stroke-width="5" stroke-linecap="round"/></svg>',
    teens: '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="finderIconTeens" x1="8" y1="12" x2="57" y2="55" gradientUnits="userSpaceOnUse"><stop stop-color="#fff7b8"/><stop offset=".55" stop-color="#f4a4c7"/><stop offset="1" stop-color="#9c8cff"/></linearGradient></defs><path d="M8 36c0-14 10-24 23-24s23 10 23 24" fill="#fffbe9" stroke="#071126" stroke-width="3"/><path d="M9 34h8v18H9zM47 34h8v18h-8z" fill="url(#finderIconTeens)" stroke="#071126" stroke-width="3"/><path d="M54 20h5v34H41V20h13Z" fill="url(#finderIconTeens)" stroke="#071126" stroke-width="3" stroke-linejoin="round"/><path d="M46 26h8M49 49h2" stroke="#071126" stroke-width="3" stroke-linecap="round"/></svg>',
    family: '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="finderIconFamily" x1="8" y1="9" x2="58" y2="56" gradientUnits="userSpaceOnUse"><stop stop-color="#fff3a5"/><stop offset=".56" stop-color="#ff9db7"/><stop offset="1" stop-color="#8c84ff"/></linearGradient></defs><path d="M11 55V31c0-7 4-12 10-12s10 5 10 12v24M33 55V33c0-6 4-10 9-10s9 4 9 10v22" fill="url(#finderIconFamily)" stroke="#071126" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="21" cy="12" r="7" fill="#fff7c8" stroke="#071126" stroke-width="3"/><circle cx="42" cy="16" r="6" fill="#ffd8a6" stroke="#071126" stroke-width="3"/><path d="M42 38l11-10 9 8v19H42Z" fill="#ffb985" stroke="#071126" stroke-width="3" stroke-linejoin="round"/></svg>',
    adults: '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="finderIconAdults" x1="12" y1="10" x2="52" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#fff0a6"/><stop offset=".58" stop-color="#f5a3c1"/><stop offset="1" stop-color="#9388ff"/></linearGradient></defs><circle cx="32" cy="16" r="10" fill="#ffe4ab" stroke="#071126" stroke-width="3"/><path d="M13 57V45c0-12 8-20 19-20s19 8 19 20v12" fill="url(#finderIconAdults)" stroke="#071126" stroke-width="3" stroke-linejoin="round"/><path d="M25 28l7 10 7-10M28 56l3-15h2l3 15M22 31l10 10 10-10" fill="none" stroke="#071126" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    couples: '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="finderIconCouples" x1="7" y1="10" x2="58" y2="55" gradientUnits="userSpaceOnUse"><stop stop-color="#fff7b6"/><stop offset=".55" stop-color="#ff91b5"/><stop offset="1" stop-color="#9a8cff"/></linearGradient></defs><path d="M30 22c-5-11-22-7-22 7 0 11 15 20 22 25 7-5 22-14 22-25 0-14-17-18-22-7Z" fill="url(#finderIconCouples)" stroke="#071126" stroke-width="3" stroke-linejoin="round"/><path d="M30 22c5-10 20-6 20 6" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M40 43h18M43 52h13M48 32h8v11h-8zM42 34c2-3 2-5 0-8M51 27c2-3 2-5 0-8" fill="none" stroke="#071126" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    party: '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="finderIconParty" x1="9" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse"><stop stop-color="#fff1a3"/><stop offset=".55" stop-color="#ff9ab9"/><stop offset="1" stop-color="#9588ff"/></linearGradient></defs><path d="M9 19c8 8 15 8 23 0M18 10l7 7M35 12l-5 8M48 8l5 5M12 34c7 0 12 5 12 12v9H0v-9c0-7 5-12 12-12Z" fill="url(#finderIconParty)" stroke="#071126" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="27" r="6" fill="#ffdca2" stroke="#071126" stroke-width="3"/><path d="M34 32c8 0 14 6 14 14v9H20v-9c0-8 6-14 14-14Z" fill="url(#finderIconParty)" stroke="#071126" stroke-width="3"/><circle cx="34" cy="24" r="7" fill="#d8c0ff" stroke="#071126" stroke-width="3"/><path d="M51 36c6 1 10 6 10 12v7H46" fill="url(#finderIconParty)" stroke="#071126" stroke-width="3"/><circle cx="51" cy="29" r="6" fill="#ffdca2" stroke="#071126" stroke-width="3"/></svg>',
    gift: '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="finderIconGift" x1="10" y1="10" x2="54" y2="57" gradientUnits="userSpaceOnUse"><stop stop-color="#fff3a6"/><stop offset=".55" stop-color="#ff9cba"/><stop offset="1" stop-color="#9188ff"/></linearGradient></defs><path d="M10 28h44v28H10zM7 20h50v10H7z" fill="url(#finderIconGift)" stroke="#071126" stroke-width="3" stroke-linejoin="round"/><path d="M32 20v36M10 33h44" stroke="#071126" stroke-width="3"/><path d="M32 20c-10-12-22-2-11 6M32 20c10-12 22-2 11 6" fill="none" stroke="#071126" stroke-width="3" stroke-linecap="round"/><path d="M55 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#ffd66c"/></svg>'
  };
  return icons[value] || '<span>' + escHtml((typeof value === 'string' && value.length) ? value.charAt(0).toUpperCase() : '?') + '</span>';
}

function syncDesktopBuddyReferenceLayout() {
  if (!document.body || document.body.getAttribute('data-page') !== 'home') return;
  if (!window.matchMedia || !window.matchMedia('(min-width: 1024px)').matches) return;
  var section = document.querySelector('.game-finder-section');
  var card = section && section.querySelector('.container');
  var hero = section && section.querySelector('.buddy-reference-hero');
  var intro = section && section.querySelector('.buddy-reference-intro');
  var mascot = section && section.querySelector('.buddy-reference-mascot');
  var title = section && section.querySelector('.buddy-reference-title');
  var titleText = section && section.querySelector('.buddy-reference-title .finder-title');
  var finder = document.getElementById('finder-container');
  if (!card || !finder) return;

  function set(el, prop, value) {
    if (el) el.style.setProperty(prop, value, 'important');
  }

  set(card, 'position', 'relative');
  set(card, 'display', 'block');
  set(card, 'min-height', '236px');
  set(card, 'max-height', '236px');
  set(card, 'padding', '18px 18px 18px 22px');
  set(card, 'overflow', 'hidden');
  set(hero, 'position', 'static');
  set(hero, 'display', 'block');
  set(hero, 'min-height', '0');
  set(hero, 'margin', '0');
  set(intro, 'position', 'absolute');
  set(intro, 'left', '20px');
  set(intro, 'bottom', '0');
  set(intro, 'width', '222px');
  set(intro, 'display', 'block');
  set(mascot, 'display', 'block');
  set(mascot, 'width', '220px');
  set(mascot, 'height', '220px');
  set(mascot, 'object-fit', 'contain');
  set(mascot, 'object-position', 'bottom left');
  set(title, 'position', 'absolute');
  set(title, 'left', '246px');
  set(title, 'top', '30px');
  set(title, 'width', '292px');
  set(title, 'max-width', '292px');
  set(title, 'margin', '0');
  set(title, 'text-align', 'left');
  set(titleText, 'font-size', '23px');
  set(titleText, 'line-height', '1.08');
  set(titleText, 'max-width', '292px');
  set(finder, 'position', 'absolute');
  set(finder, 'right', '20px');
  set(finder, 'top', '45px');
  set(finder, 'width', '610px');
  set(finder, 'max-width', '610px');
  set(finder, 'margin', '0');
  set(finder, 'z-index', '4');
}

if (!window.desktopBuddyReferenceSyncBound) {
  window.desktopBuddyReferenceSyncBound = true;
  window.addEventListener('resize', syncDesktopBuddyReferenceLayout);
  window.addEventListener('DOMContentLoaded', function() {
    window.setTimeout(syncDesktopBuddyReferenceLayout, 100);
    window.setTimeout(syncDesktopBuddyReferenceLayout, 500);
  });
}

function renderFinderStep() {
  var container = document.getElementById('finder-container');
  if (!container) return;

  var finderQuestions = getFinderQuestions();
  if (finderStep >= finderQuestions.length) {
    renderFinderResults();
    return;
  }

  var q = finderQuestions[finderStep];
  var total = finderQuestions.length;
  var percent = Math.round((finderStep / Math.max(total, 1)) * 100);
  var answerChips = getFinderAnswerChips();
  var liveMatches = getFinderLiveMatchCount();
  var isAudienceStep = q.key === 'audience' && finderStep === 0;

  if (isAudienceStep) {
    container.innerHTML =
      '<div class="buddy-reference-stepper" aria-label="Majestic Buddy steps">' +
        '<span class="active"><b>1</b> Who\'s playing?</span>' +
        '<span><b>2</b> Vibe check</span>' +
        '<span><b>3</b> Time & duration</span>' +
        '<span><b>4</b> Budget</span>' +
      '</div>' +
      '<div class="buddy-reference-grid">' +
        '<aside class="buddy-panel buddy-reference-side" aria-label="Majestic Buddy">' +
          '<div class="buddy-panel-top"><span class="buddy-avatar">MB</span><span class="buddy-status">Online now</span></div>' +
          '<h3>Majestic Buddy <em>AI</em></h3>' +
          '<p>Fast, fun & friendly game picks for Nairobi deliveries, gifts, families, parties and date nights.</p>' +
          '<ul class="buddy-reference-list"><li>Safety aware</li><li>Budget aware</li><li>Same-day friendly</li></ul>' +
          '<a class="buddy-human-card" href="https://wa.me/' + WHATSAPP_NUMBER + '" target="_blank" rel="noopener noreferrer"><span>Need a human?</span><b>Chat with our team</b></a>' +
        '</aside>' +
        '<div class="finder-card finder-wizard-card finder-audience-stage buddy-start-shell">' +
          '<div class="buddy-choice-panel">' +
            '<div class="buddy-panel-heading"><span class="buddy-magic-icon">AI</span><div><h3>Start here</h3><p>The more you tell me, the better I can match!</p></div></div>' +
            '<h3 class="finder-question">' + escHtml(q.q) + '</h3>' +
            '<div class="finder-options finder-wizard-options finder-audience-options">' +
              q.options.map(function(opt) {
                var sub = opt.value === 'kids' ? 'Ages 3-12' : opt.value === 'teens' ? 'Ages 13-19' : opt.value === 'family' ? 'All ages' : opt.value === 'adults' ? '18+ only' : opt.value === 'couples' ? '2 players' : opt.value === 'party' ? 'Group fun' : 'Perfect for gifting';
                return '<button type="button" class="finder-option finder-wizard-option finder-audience-option buddy-option-' + escHtml(opt.value) + '" data-finder-answer="' + escHtml(opt.value) + '" aria-label="' + escHtml(opt.label) + '">' +
                  '<span class="finder-option-icon">' + getFinderAudienceIconHtml(opt.value) + '</span>' +
                  '<span class="finder-option-copy"><span class="finder-option-label">' + escHtml(opt.label) + '</span><span class="finder-option-hint">' + escHtml(sub) + '</span></span>' +
                '</button>';
              }).join('') +
            '</div>' +
            '<div class="buddy-filter-row">' +
              '<label>Who is playing?<select><option>Select players</option><option>Family</option><option>Kids</option><option>Couples</option><option>Party group</option></select></label>' +
              '<label>Age group<select><option>Select age</option><option>All ages</option><option>Ages 3 - 12</option><option>Teens</option><option>Adults 18+</option></select></label>' +
              '<label>Occasion<select><option>Select occasion</option><option>Game night</option><option>Birthday</option><option>Gift</option><option>Date night</option></select></label>' +
              '<label>Budget<select><option>Select budget</option><option>Under KES 1,000</option><option>KES 1,000 - 2,000</option><option>KES 2,000+</option></select></label>' +
              '<label>Game type<select><option>Any type</option><option>Board games</option><option>Card games</option><option>Puzzles</option><option>STEM toys</option></select></label>' +
              '<button type="button" class="buddy-find-btn" data-finder-answer="family"><span class="buddy-find-spark" aria-hidden="true"></span>Find My Game<span class="buddy-find-arrow" aria-hidden="true"></span></button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<aside class="buddy-picks-panel" aria-label="Buddy top picks">' +
          '<h3>Buddy\'s Top Picks</h3><p>Handpicked just for you</p>' +
          '<article><img src="images/catan-board-game-nairobi.webp" alt="Catan Board Game" loading="lazy" /><div><b>Catan</b><span>Strategy Family</span><small>Build, trade & settle the island.</small><strong>KES 2,499</strong></div></article>' +
          '<article><img src="images/dixit-board-game-nairobi.webp" alt="Dixit Board Game" loading="lazy" /><div><b>Dixit</b><span>Creative Storytelling</span><small>A picture is worth a thousand stories.</small><strong>KES 1,999</strong></div></article>' +
          '<article><img src="images/azul-board-game-nairobi.webp" alt="Azul Board Game" loading="lazy" /><div><b>Azul</b><span>Strategy Gift</span><small>Beautiful tile strategy for all ages.</small><strong>KES 2,499</strong></div></article>' +
          '<button type="button" data-finder-answer="family">View All Matches</button>' +
        '</aside>' +
      '</div>' +
      '<div class="buddy-benefit-rail"><span>Same-day delivery in Nairobi</span><span>Budget-friendly picks</span><span>Perfect for gifts & parties</span><span>Trusted by 1000+ game nights</span></div>';
    syncDesktopBuddyReferenceLayout();
    return;
  }

  container.innerHTML =
    '<div class="finder-card finder-wizard-card">' +
      '<div class="finder-shell-head">' +
        '<div><span class="finder-kicker">Majestic Buddy - Question ' + (finderStep + 1) + ' of ' + total + '</span><h3 class="finder-question">' + escHtml(q.q) + '</h3></div>' +
        '<div class="finder-score-dial"><strong>' + percent + '%</strong><span>complete</span></div>' +
      '</div>' +
      '<div class="finder-progress finder-progress-track"><span style="width:' + percent + '%"></span></div>' +
      '<div class="finder-live-count" aria-live="polite"><strong>' + liveMatches + '</strong><span>safe matches currently fit your answers</span></div>' +
      (answerChips ? '<div class="finder-answer-tray">' + answerChips + '</div>' : '<div class="finder-answer-tray"><span class="finder-answer-chip">Start with who will play</span></div>') +
      '<div class="finder-options finder-wizard-options">' +
        q.options.map(function(opt) {
          var detail = getFinderOptionDetails(q.key, opt.value, opt.label);
          return '<button type="button" class="finder-option finder-wizard-option" data-finder-answer="' + escHtml(opt.value) + '">' +
            '<span class="finder-option-icon">' + escHtml(detail.icon) + '</span>' +
            '<span class="finder-option-copy"><span class="finder-option-label">' + escHtml(opt.label) + '</span><span class="finder-option-hint">' + escHtml(detail.hint) + '</span></span>' +
          '</button>';
        }).join('') +
      '</div>' +
      '<div class="finder-nav-row">' +
        (finderStep > 0 ? '<button type="button" class="finder-nav-btn" data-finder-back>Back</button>' : '<span></span>') +
        '<button type="button" class="finder-reset-btn finder-reset-inline" data-finder-reset>Reset wizard</button>' +
      '</div>' +
    '</div>';
}

function finderAnswer(answer) {
  answer = window.MGWSecurity ? window.MGWSecurity.sanitizeId(answer) : String(answer || '').replace(/[^a-zA-Z0-9_-]/g, '');
  var finderQuestions = getFinderQuestions();
  var key = finderQuestions[finderStep].key;
  finderAnswers[key] = answer;
  finderStep++;

  localStorage.setItem('gamePreferences', JSON.stringify(finderAnswers));

  renderFinderStep();
}

document.addEventListener('click', function(event) {
  var answer = event.target.closest && event.target.closest('[data-finder-answer]');
  if (answer) {
    event.preventDefault();
    finderAnswer(answer.getAttribute('data-finder-answer'));
    return;
  }
  if (event.target.closest && event.target.closest('[data-finder-back]')) {
    event.preventDefault();
    finderBack();
    return;
  }
  if (event.target.closest && event.target.closest('[data-finder-reset]')) {
    event.preventDefault();
    initGameFinder();
  }
});

function finderBack() {
  if (finderStep <= 0) return;
  var finderQuestions = getFinderQuestions();
  var currentKey = finderQuestions[finderStep] && finderQuestions[finderStep].key;
  if (currentKey && finderAnswers[currentKey]) delete finderAnswers[currentKey];
  finderStep--;
  var previousQuestions = getFinderQuestions();
  var previousKey = previousQuestions[finderStep] && previousQuestions[finderStep].key;
  if (previousKey && finderAnswers[previousKey]) delete finderAnswers[previousKey];
  renderFinderStep();
}

function getProductSearchText(product) {
  return [product.name, product.desc, product.cat, product.sub, product.slug, (product.seoKeywords || []).join(' ')].filter(Boolean).join(' ').toLowerCase();
}

function hasAnyTerm(text, terms) {
  return terms.some(function(term) { return text.indexOf(term) !== -1; });
}

function inferPlayerRange(product, text) {
  var source = text || getProductSearchText(product);
  var rangeMatch = source.match(/(\d+)\s*(?:-|-|-|to)\s*(\d+)\s*players?/i);
  if (rangeMatch) return { min: parseInt(rangeMatch[1], 10), max: parseInt(rangeMatch[2], 10), label: rangeMatch[1] + '-' + rangeMatch[2] + ' players' };
  var upToMatch = source.match(/up to\s*(\d+)\s*players?/i);
  if (upToMatch) return { min: 2, max: parseInt(upToMatch[1], 10), label: 'Up to ' + upToMatch[1] + ' players' };
  var singleMatch = source.match(/for\s*(\d+)\s*players?/i);
  if (singleMatch) {
    var players = parseInt(singleMatch[1], 10);
    return { min: players, max: players, label: players + ' players' };
  }
  if (product.cat === 'couples-games') return { min: 2, max: 2, label: '2 players' };
  if (product.cat === 'party-games' || product.cat === 'drinking-games') return { min: 3, max: 10, label: 'Group play' };
  if (product.cat === 'puzzles' || product.cat === 'stem-toys' || product.cat === 'dolls' || product.cat === 'infant-toys') return { min: 1, max: 2, label: '1-2 players' };
  return { min: 2, max: 4, label: '2-4 players' };
}

function inferProductMeta(product) {
  var text = getProductSearchText(product);
  var cat = product.cat || '';
  var isRomanticOrIntimate = cat === 'couples-games' || hasAnyTerm(text, ['couples', 'couple', 'romantic', 'intimate', 'intimacy', 'date night', 'flirt', 'sex', 'naughty', 'bedroom', 'bondage', 'desire', 'x rated', 'x-rated', 'his and hers']);
  var isDrinking = cat === 'drinking-games' || hasAnyTerm(text, ['drinking', 'drink', 'drunk', 'beer pong', 'buzzed', 'sotally', 'truth or drink', 'do or drink', 'black out', 'bottle']);
  var isAdultOnly = product.adult === true || isDrinking || hasAnyTerm(text, ['18+', 'adult', 'adults only', 'nsfw', 'after dark', 'x-rated', 'x rated', 'sex', 'naughty', 'dirty', 'explicit', 'disturbed', 'drinking', 'drink', 'drunk']);
  var isEducational = cat === 'stem-toys' || hasAnyTerm(text, ['educational', 'learning', 'stem', 'science', 'math', 'spelling', 'junior', 'kids', 'memory', 'alphabet', 'school']);
  var isPuzzle = cat === 'puzzles' || hasAnyTerm(text, ['puzzle', 'jigsaw', 'tangram', 'ubongo', 'tetris']);
  var isStrategy = hasAnyTerm(text, ['strategy', 'chess', 'catan', 'azul', 'risk', 'sequence', 'monopoly', 'scrabble', 'rummikub', 'qwirkle', 'backgammon', 'mancala']) || product.sub === 'strategy';
  var audience = [];
  if (cat === 'kids-games' || cat === 'stem-toys' || cat === 'infant-toys' || cat === 'dolls' || hasAnyTerm(text, ['kids', 'junior', 'children', 'child', 'baby', 'infant', 'paw patrol', 'frozen', 'barbie', 'lol surprise'])) audience.push('kids');
  if (hasAnyTerm(text, ['teens', 'teen', 'marvel', 'bts']) || (!isAdultOnly && (isStrategy || isPuzzle || cat === 'card-games' || cat === 'board-games'))) audience.push('teens');
  if (cat === 'family-games' || hasAnyTerm(text, ['family', 'families', 'all ages', 'whole family', 'parents']) || (!isAdultOnly && ['board-games', 'card-games', 'trivia-games', 'puzzles', 'christian-games'].indexOf(cat) !== -1)) audience.push('family');
  if (cat === 'party-games' || cat === 'drinking-games' || hasAnyTerm(text, ['party', 'charades', 'bingo', 'meme', 'friends', 'group', 'ice breaker', 'icebreaker'])) audience.push('party');
  if (cat === 'couples-games' || isRomanticOrIntimate) audience.push('couples');
  if (!isAdultOnly) audience.push('all-ages');
  if (isAdultOnly || cat === 'party-games' || cat === 'drinking-games' || cat === 'couples-games') audience.push('adults');
  audience = audience.filter(function(value, index, arr) { return arr.indexOf(value) === index; });
  return {
    ageGroup: isAdultOnly ? 'adults' : (audience.indexOf('kids') !== -1 ? 'kids' : (audience.indexOf('teens') !== -1 ? 'teens' : 'all')),
    audience: audience,
    isAdultOnly: isAdultOnly,
    isRomanticOrIntimate: isRomanticOrIntimate,
    isDrinking: isDrinking,
    isEducational: isEducational,
    isPuzzle: isPuzzle,
    isStrategy: isStrategy,
    isFamilySafe: !isAdultOnly && !isRomanticOrIntimate && !isDrinking,
    players: inferPlayerRange(product, text)
  };
}

function getEffectiveFinderAudience(answers) {
  if (answers.giftAudience) return answers.giftAudience;
  if (answers.partyKind === 'family-party') return 'family';
  if (answers.partyKind === 'adult-party') return 'adults';
  return answers.audience || 'family';
}

function isProductAllowedForAnswers(product, answers, meta) {
  var audience = getEffectiveFinderAudience(answers);
  var safeAudience = audience === 'kids' || audience === 'teens' || audience === 'family' || audience === 'all';
  if (safeAudience && (meta.isAdultOnly || meta.isDrinking || meta.isRomanticOrIntimate || product.cat === 'couples-games' || product.cat === 'drinking-games')) return false;
  if (audience === 'kids' && meta.audience.indexOf('kids') === -1 && !meta.isEducational && !meta.isPuzzle && product.cat !== 'kids-games' && product.cat !== 'stem-toys') return false;
  if (audience === 'teens' && meta.audience.indexOf('teens') === -1 && meta.audience.indexOf('family') === -1 && meta.audience.indexOf('all-ages') === -1) return false;
  if (audience === 'family' && !meta.isFamilySafe) return false;
  if ((answers.audience === 'couples' || audience === 'couples' || answers.type === 'romantic') && answers.adultConfirmed !== 'yes') return !meta.isAdultOnly && !meta.isRomanticOrIntimate && product.cat !== 'couples-games';
  if ((answers.type === 'drinking' || meta.isDrinking) && answers.adultConfirmed !== 'yes') return false;
  if (answers.type === 'romantic' && (answers.adultConfirmed !== 'yes' || product.cat !== 'couples-games')) return false;
  if (answers.type === 'drinking' && product.cat !== 'drinking-games' && !meta.isDrinking) return false;
  return true;
}

function playerChoiceFits(choice, players) {
  if (!choice) return true;
  if (choice === '1') return players.min <= 1 && players.max >= 1;
  if (choice === '2') return players.min <= 2 && players.max >= 2;
  if (choice === '3-4') return players.max >= 3 && players.min <= 4;
  if (choice === '5+') return players.max >= 5;
  return true;
}

function getProductScore(product, answers, meta) {
  var score = 0;
  var reasons = [];
  var productTypes = categoryToTypes[product.cat] || [];
  var audience = getEffectiveFinderAudience(answers);
  if (meta.audience.indexOf(audience) !== -1 || (audience === 'adults' && meta.audience.indexOf('adults') !== -1)) score += 5;
  if (answers.audience === 'gift' && product.badge === 'GIFT PICKS') { score += 2; reasons.push('Gift-ready'); }
  if (productTypes.includes(answers.type) || (answers.type === 'party' && (product.cat === 'party-games' || product.cat === 'card-games' || meta.audience.indexOf('party') !== -1))) { score += 4; reasons.push('Matches your game style'); }
  if (answers.type === 'educational' && meta.isEducational) { score += 4; reasons.push('Educational'); }
  if (answers.type === 'romantic' && meta.isRomanticOrIntimate) { score += 4; reasons.push('Romantic'); }
  if (answers.type === 'puzzle' && meta.isPuzzle) { score += 4; reasons.push('Puzzle pick'); }
  if (answers.type === 'strategy' && meta.isStrategy) { score += 4; reasons.push('Strategy'); }
  if (answers.type === 'drinking' && meta.isDrinking) { score += 4; reasons.push('Adults-only party'); }
  if (playerChoiceFits(answers.players, meta.players)) { score += 3; reasons.push(meta.players.label); }
  
  // Duration scoring
  if (answers.duration) {
    var gamePrice = product.price || 0;
    var gameDifficulty = product.difficulty || 'Medium';
    var isDurationMatch = false;
    if (answers.duration === 'quick' && (product.cat === 'card-games' || /quick|fast|speed|rapid|express/.test((product.name || '').toLowerCase()))) { isDurationMatch = true; }
    else if (answers.duration === 'medium' && (product.cat === 'board-games' || product.cat === 'family-games')) { isDurationMatch = true; }
    else if (answers.duration === 'long' && (product.cat === 'board-games' || /strategy|epic|campaign|long/.test((product.name || '').toLowerCase()))) { isDurationMatch = true; }
    if (isDurationMatch) { score += 2; reasons.push(answers.duration + ' game'); }
  }
  
  // Budget scoring
  if (answers.budget) {
    var price = product.price || 0;
    var budgetMatch = false;
    if (answers.budget === 'budget' && price < 1500) budgetMatch = true;
    else if (answers.budget === 'mid' && price >= 1500 && price <= 3000) budgetMatch = true;
    else if (answers.budget === 'premium' && price > 3000) budgetMatch = true;
    if (budgetMatch) { score += 2; reasons.push('In your budget'); }
  }
  
  if (product.badge === 'BESTSELLER' || product.badge === 'POPULAR') { score += 1; reasons.push('Popular pick'); }
  return { score: score, reasons: reasons };
}

function getFinderReason(product, answers, meta, reasons) {
  var audience = getEffectiveFinderAudience(answers);
  var parts = [];
  if (audience === 'kids') parts.push('Safe kids pick');
  else if (audience === 'family') parts.push('Best for family night');
  else if (answers.type === 'romantic' || product.cat === 'couples-games') parts.push('Adults-only couples pick');
  else if (answers.type === 'drinking') parts.push('Adults-only party pick');
  else if (answers.audience === 'party') parts.push('Party pick');
  else if (audience === 'teens') parts.push('Teen-friendly pick');
  else parts.push('Closest match');
  if (meta.isEducational) parts.push('Educational');
  if (meta.isPuzzle && parts.length < 3) parts.push('Puzzle');
  if (meta.isStrategy && parts.length < 3) parts.push('Strategy');
  if (meta.isFamilySafe && parts.length < 3) parts.push('Family-friendly');
  if (meta.isRomanticOrIntimate && parts.length < 3) parts.push('Romantic');
  if (meta.players && parts.length < 3) parts.push(meta.players.label);
  (reasons || []).forEach(function(reason) { if (parts.length < 3 && parts.indexOf(reason) === -1) parts.push(reason); });
  return parts.slice(0, 3).join(' â€¢ ');
}

function renderFinderResults() {
  var container = document.getElementById('finder-container');
  if (!container) return;
  var answers = finderAnswers;
  var scored = getFinderScoredMatches(answers);
  var results = scored.filter(function(item) { return item.score > 0; }).sort(function(a, b) { return b.score - a.score; }).slice(0, 6);
  if (results.length < 3) {
    var audience = getEffectiveFinderAudience(answers);
    results = results.concat(scored.filter(function(item) {
      return !results.some(function(r) { return r.product.id === item.product.id; }) && (item.meta.audience.indexOf(audience) !== -1 || (audience === 'family' && item.meta.isFamilySafe));
    }).sort(function(a, b) {
      var badgeA = a.product.badge === 'BESTSELLER' || a.product.badge === 'GIFT PICKS' ? 1 : 0;
      var badgeB = b.product.badge === 'BESTSELLER' || b.product.badge === 'GIFT PICKS' ? 1 : 0;
      return badgeB - badgeA || b.score - a.score;
    }).slice(0, 6 - results.length));
  }
  var progress = getFinderQuestions().map(function() { return '<div class="finder-progress-bar filled"></div>'; }).join('');
  var answerChips = getFinderAnswerChips();
  
  // Build summary of user answers
  var answerSummary = [];
  var questions = getFinderQuestions();
  Object.keys(answers).forEach(function(key) {
    var value = answers[key];
    var label = getFinderAnswerLabel(key, value);
    if (label) answerSummary.push(label);
  });
  var summaryText = answerSummary.length > 0 ? 'Based on: ' + answerSummary.join(' â€¢ ') : 'Based on your preferences';
  
  var resultsHtml = results.length ? results.map(function(r, index) {
    var p = r.product;
    var imgSrc = getProductImg(p);
    var reasonText = getFinderReason(p, answers, r.meta, r.reasons);
    var whyText = r.reasons && r.reasons.length ? r.reasons[0] : (r.meta.players ? r.meta.players.label : 'Closest overlap');
    var safetyText = r.meta.isAdultOnly ? '18+ only' : (r.meta.isFamilySafe ? 'Family-safe' : 'Check suitability');
    return '<article class="finder-result-card' + (index === 0 ? ' finder-result-card-best' : '') + '">' +
      '<span class="finder-match-badge">' + (index === 0 ? 'Strongest match' : 'Good match') + '</span>' +
      '<span class="finder-why-badge">Why: ' + escHtml(whyText) + '</span>' +
      '<img src="' + getProductThumbSrc(imgSrc) + '" data-full-src="' + imgSrc + '" alt="' + escHtml(p.name) + '" loading="lazy" decoding="async" class="finder-result-img" />' +
      '<div class="finder-result-info"><span class="finder-result-name">' + escHtml(p.name) + '</span><span class="finder-result-reason">' + escHtml(reasonText) + '</span><span class="finder-result-meta"><span>KES ' + p.price.toLocaleString() + '</span><span>' + escHtml(safetyText) + '</span><span>' + escHtml(r.meta.players.label) + '</span></span><div class="finder-result-actions"><button type="button" class="finder-result-action" onclick="navigate(\'product\',\'' + p.id + '\')">View match</button><button type="button" class="finder-result-add" onclick="finderQuickAdd(\'' + p.id + '\', event, this)">Quick Add</button></div></div>' +
    '</article>';
  }).join('') : '<div class="finder-empty"><strong>No safe close matches yet.</strong><span>Try broadening your answers or ask our WhatsApp team for a human recommendation.</span><div><button type="button" onclick="initGameFinder()">Broaden filters</button><a href="https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent('Hi Majestic Games World, I used the Game Finder but need help choosing a safe match.') + '" target="_blank" rel="noopener noreferrer">Ask WhatsApp Support</a></div></div>';
  
  container.innerHTML =
    '<div class="finder-card finder-results-card">' +
      '<div class="finder-results-hero">' +
        '<div><span class="finder-kicker">Majestic Buddy complete</span><h3 class="finder-results-title">ðŸŽ¯ Perfect matches found!</h3><p class="finder-results-copy">' + escHtml(summaryText) + '</p></div>' +
        '<button type="button" class="finder-reset-btn finder-reset-inline" data-finder-reset>Start Over</button>' +
      '</div>' +
      '<div class="finder-progress finder-progress-track"><span style="width:100%"></span></div>' +
      (answerChips ? '<div class="finder-answer-tray">' + answerChips + '</div>' : '') +
      '<div class="finder-results-grid">' + resultsHtml + '</div>' +
      '<p class="finder-trust-note">âœ“ Safety filter active: adult, romantic, drinking, and couples-only games are excluded when Kids, Teens, or Family is selected.</p>' +
    '</div>';
}

var smartShopState = {
  vibe: 'Chill',
  players: '4 players',
  occasion: 'Birthday',
  budget: '1000-2000'
};

function getSmartShopHintHtml() {
  var hints = [
    { label: 'UNO', query: 'uno' },
    { label: 'Puzzles', cat: 'puzzles' },
    { label: 'Monopoly', query: 'monopoly' },
    { label: 'Party games', cat: 'party-games' }
  ];
  return '<div class="smart-shop-search-hint"><span>Trending searches</span><div class="smart-shop-hint-buttons">' + hints.map(function(hint) {
    if (hint.cat) return '<button type="button" onclick="runSmartShopAction({cat:&quot;' + escHtml(hint.cat) + '&quot;})">' + escHtml(hint.label) + '</button>';
    return '<button type="button" onclick="updateShopDiscoverySearch(&quot;' + escHtml(hint.query) + '&quot;)">' + escHtml(hint.label) + '</button>';
  }).join('') + '</div></div>';
}

function findMegaMenuProduct(patterns) {
  patterns = Array.isArray(patterns) ? patterns : [patterns];
  return PRODUCTS.find(function(product) {
    return patterns.some(function(pattern) {
      return pattern.test(product.name || '') || pattern.test(product.slug || '');
    });
  }) || null;
}

function renderMegaProductCard(config) {
  var product = config.product;
  var title = config.title || (product ? product.name : '');
  var price = config.price || (product ? product.price : 0);
  var image = product ? getProductImg(product) : config.image;
  var action = product ? "navigate('product','" + product.id + "');closeShopDropdown()" : "runSmartShopAction({page:'bestsellers'})";
  return '<article class="attached-mega-product" role="menuitem" tabindex="0" onclick="' + action + '" onkeydown="if(event.key===\'Enter\'){this.click()}">' +
    '<span class="attached-mega-badge ' + escHtml(config.badgeClass || '') + '">' + escHtml(config.badge) + '</span>' +
    '<div class="attached-mega-product-img"><img src="' + escHtml(getProductThumbSrc(image)) + '" data-full-src="' + escHtml(image) + '" alt="' + escHtml(title) + '" loading="lazy" decoding="async" /></div>' +
    '<h5>' + escHtml(title) + '</h5>' +
    '<div class="attached-mega-rating"><span>â˜…â˜…â˜…â˜…â˜…</span><small>' + escHtml(config.reviews) + '</small></div>' +
    '<strong>KES ' + Number(price || 0).toLocaleString() + '</strong>' +
  '</article>';
}

function renderAttachedShopDropdown(menu, dropdown, btn) {
  var categories = [
    { id: 'board-games', icon: 'board-games.webp', label: 'Board Games', count: '72+ games' },
    { id: 'family-games', icon: 'card-games.webp', label: 'Card Games', count: '38+ games' },
    { id: 'kids-games', icon: 'kids-games.webp', label: 'Kids Games', count: '25+ games' },
    { id: 'stem-toys', icon: 'stem-toys.webp', label: 'TOYS', count: '30+ toys' },
    { id: 'puzzles', icon: 'puzzles.webp', label: 'Puzzles', count: '11+ puzzles' },
    { id: 'party-games', icon: 'party-games.webp', label: 'Party Games', count: '27+ games' },
    { id: 'drinking-games', icon: 'drinking-games.webp', label: 'Drinking Games', count: '29+ games' },
    { id: 'couples-games', icon: 'couples-games.webp', label: "Couple's Games", count: '38+ games' }
  ];
  var ages = [
    { icon: 'age-kids.webp', label: '3 - 6 years', text: 'Fun & learning', payload: "{cat:'kids-games'}" },
    { icon: 'age-tweens.webp', label: '7 - 12 years', text: 'Kids favorites', payload: "{cat:'stem-toys'}" },
    { icon: 'age-teens.webp', label: '13 - 19 years', text: 'Teens & youth', payload: "{cat:'party-games'}" },
    { icon: 'age-adults.webp', label: 'Adults (18+)', text: 'For grown-ups', payload: "{cat:'drinking-games'}" },
    { icon: 'age-family.webp', label: 'Family (All ages)', text: 'Everyone together', payload: "{cat:'family-games'}" }
  ];
  var occasions = [
    { label: 'Family Game Night', cat: 'family-games' },
    { label: 'Parties', cat: 'party-games' },
    { label: 'Gifts', page: 'gift-picks' },
    { label: 'Birthdays', page: 'gift-picks' },
    { label: 'Travel & Fun', query: 'travel game' },
    { label: 'School & Learning', cat: 'stem-toys' }
  ];
  var categoryHtml = categories.map(function(item) {
    return '<button type="button" class="reference-mega-category" role="menuitem" onclick="runSmartShopAction({cat:\'' + item.id + '\'})">' +
      '<img src="images/mega-menu-icons/' + item.icon + '" alt="" loading="lazy" decoding="async" />' +
      '<span><b>' + escHtml(item.label) + '</b><small>' + escHtml(item.count) + '</small></span><i aria-hidden="true">&#8250;</i>' +
    '</button>';
  }).join('');
  var ageHtml = ages.map(function(item) {
    return '<button type="button" class="reference-mega-age" role="menuitem" onclick="runSmartShopAction(' + item.payload + ')">' +
      '<img src="images/mega-menu-icons/' + item.icon + '" alt="" loading="lazy" decoding="async" />' +
      '<span><b>' + escHtml(item.label) + '</b><small>' + escHtml(item.text) + '</small></span>' +
    '</button>';
  }).join('');
  var occasionHtml = occasions.map(function(item) {
    var payload = item.cat ? "{cat:'" + item.cat + "'}" : item.query ? "{query:'" + item.query + "'}" : "{page:'" + item.page + "'}";
    return '<button type="button" role="menuitem" onclick="runSmartShopAction(' + payload + ')">' + escHtml(item.label) + '</button>';
  }).join('');
  var products = [
    { product: findMegaMenuProduct(/Catan/i), title: 'Catan Base Game', image: 'images/thumbs/catan-board-game-nairobi.webp', fallbackPrice: 5500 },
    { product: findMegaMenuProduct(/Azul/i), title: 'Azul Board Game', image: 'images/thumbs/azul-board-game-nairobi.webp', fallbackPrice: 3200 },
    { product: findMegaMenuProduct(/30 Seconds/i), title: '30 Seconds Board Game', image: 'images/thumbs/30-seconds-board-game-nairobi.webp', fallbackPrice: 4800 },
    { product: findMegaMenuProduct(/Monopoly Original|Monopoly Classic/i), title: 'Monopoly Original', image: 'images/thumbs/monopoly-original-board-game-nairobi.webp', fallbackPrice: 3999 },
    { product: findMegaMenuProduct(/Scrabble Original|Scrabble Large/i), title: 'Scrabble Original', image: 'images/thumbs/scrabble-large-board-game-nairobi.webp', fallbackPrice: 1999 }
  ];
  var productHtml = products.map(function(item) {
    var product = item.product;
    var image = product ? getProductThumbSrc(getProductImg(product)) : item.image;
    var title = product && product.name ? product.name : item.title;
    var price = product && typeof product.price === 'number' ? product.price : item.fallbackPrice;
    var action = product ? "navigate('product','" + product.id + "');closeShopDropdown()" : "runSmartShopAction({page:'bestsellers'})";
    return '<button type="button" class="reference-mega-pick" role="menuitem" onclick="' + action + '">' +
      '<img src="' + escHtml(image) + '" alt="" loading="lazy" decoding="async" />' +
      '<span><b>' + escHtml(title) + '</b><small>KES ' + Number(price).toLocaleString() + '</small></span>' +
    '</button>';
  }).join('');

  menu.innerHTML =
    '<div class="reference-mega-menu" role="presentation">' +
      '<section class="reference-mega-column reference-mega-categories" aria-label="Shop by category"><h4>Shop by Category</h4><div>' + categoryHtml + '</div></section>' +
      '<section class="reference-mega-column reference-mega-picks" aria-label="Popular picks"><h4>Popular Picks</h4><div>' + productHtml + '</div><button type="button" class="reference-mega-view" onclick="runSmartShopAction({page:\'shop\'})">View All Products <span aria-hidden="true">&#8594;</span></button></section>' +
      '<section class="reference-mega-column reference-mega-guides" aria-label="Shopping guides"><div><h4>Shop by Age</h4>' + ageHtml + '</div><div class="reference-mega-occasions"><h4>Shop by Occasion</h4><div>' + occasionHtml + '</div></div></section>' +
      '<aside class="reference-mega-buddy"><strong><span aria-hidden="true">&#10024;</span> Majestic Buddy</strong><b>Not sure what to pick?</b><p>Get personalized game recommendations in seconds!</p><img src="images/branding/majestic-buddy-royal.png" alt="" loading="lazy" decoding="async" /><a href="#game-finder" onclick="closeShopDropdown()">Try Majestic Buddy <span aria-hidden="true">&#8594;</span></a></aside>' +
    '</div>';

  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    if (!btn.dataset.shopKeyReady) {
      btn.addEventListener('keydown', handleShopDropdownKeydown);
      btn.dataset.shopKeyReady = 'true';
    }
  }
  if (!menu.dataset.shopKeyReady) {
    menu.addEventListener('keydown', handleShopDropdownKeydown);
    menu.dataset.shopKeyReady = 'true';
  }
  if (dropdown && !dropdown.dataset.smartShopReady) {
    dropdown.dataset.smartShopReady = 'true';
  }
}

function toggleMegaCategoryGroup(button) {
  var group = button && button.closest ? button.closest('.attached-mega-cat-group') : null;
  if (!group) return;
  var isOpen = group.classList.toggle('open');
  button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  var indicator = button.querySelector('i');
  if (indicator) indicator.textContent = isOpen ? '-' : '+';
}

function initShopDropdown() {
  var menu = document.getElementById('shop-dropdown-menu');
  var dropdown = document.getElementById('shop-dropdown');
  var btn = document.getElementById('shop-dropdown-btn');
  if (!menu) return;
  renderAttachedShopDropdown(menu, dropdown, btn);
  return;

  var moods = [
    { label: 'Family Night', icon: '??', cat: 'family-games' },
    { label: 'Couple Night', icon: '?', cat: 'couples-games' },
    { label: 'Kids Learning', icon: '??', cat: 'kids-games' },
    { label: 'Party Games', icon: '??', cat: 'party-games' },
    { label: 'Brain Challenge', icon: '??', cat: 'puzzles' },
    { label: 'Gifts Under Budget', icon: '??', page: 'gift-picks' },
    { label: 'School Group', icon: '??', query: 'school church group family games' }
  ];
  var categories = [
    { id: 'board-games', badge: 'Premium' },
        { id: 'family-games', badge: 'Hot' },
    { id: 'kids-games', badge: 'Kids Love' },
    { id: 'puzzles', badge: '' },
    { id: 'party-games', badge: '' }
  ].map(function(item) {
    var cat = CATEGORIES.find(function(c) { return c.id === item.id; });
    return cat ? { cat: cat, badge: item.badge } : null;
  }).filter(Boolean);
  var needs = [
    { icon: '?', title: 'Premium Strategy', text: 'For collectors and serious players.', cat: 'board-games' },
    { icon: '??', title: 'Party Starters', text: 'Fast, loud, replayable fun.', cat: 'party-games' },
    { icon: '??', title: 'Family Classics', text: 'Safe picks everyone enjoys.', cat: 'family-games' },
    { icon: '??', title: 'Learning Gifts', text: 'Smart toys, puzzles and STEM.', cat: 'stem-toys' }
  ];
  var vibeOptions = ['Chill', 'Competitive', 'Funny', 'Romantic', 'Chaotic'];
  var playerOptions = ['2 players', '4 players', '6 players', '8+ players'];
  var occasionOptions = ['Birthday', 'Couple Night', 'School Event', 'House Party', 'Family Gathering'];
  var budgetOptions = ['Under 1000', '1000-2000', '2000-5000', 'Premium'];
  var conciergeMessage = 'Hi Majestic Games World, help me choose a game. My budget is __, age/group is __, and occasion is __.';
  var conciergeUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(conciergeMessage);

  menu.innerHTML = '<div class="smart-shop-v2" role="presentation">' +
    '<div class="smart-shop-v2-close-row"><button type="button" onclick="closeShopDropdown(true)" aria-label="Close Smart Shop">Close</button></div>' +
    '<div class="smart-shop-v2-top"><div class="smart-shop-v2-intro"><span>Smart Shop Discovery</span><h3>Your game night, decoded.</h3><p>Pick a mood, group size or occasion. Majestic Buddy narrows the shelf for you.</p></div><div class="smart-shop-proof"><span>Trending in Nairobi</span><span>Popular tonight</span><span>Often bought together</span><span>Same-day delivery available</span></div></div>' +
    '<div class="smart-shop-v2-search"><input id="smart-shop-search-input" type="search" placeholder="Search by game, mood, age, or occasion..." autocomplete="off" oninput="updateShopDiscoverySearch(this.value)" aria-label="Search by game, mood, age, or occasion" /><div class="smart-shop-search-chips"><button onclick="updateShopDiscoverySearch(\'family night\')">Family night</button><button onclick="updateShopDiscoverySearch(\'birthday gift\')">Birthday gift</button><button onclick="updateShopDiscoverySearch(\'party games\')">Party games</button><button onclick="updateShopDiscoverySearch(\'kids learning\')">Kids learning</button></div><div id="smart-shop-search-results" class="smart-shop-search-results" aria-live="polite">' + getSmartShopHintHtml() + '</div></div>' +
    '<div class="smart-shop-v2-main">' +
      '<section class="smart-shop-v2-panel smart-shop-v2-moods"><h4>Mood shopping</h4><div class="smart-shop-v2-pills">' + moods.map(function(item) { return '<button type="button" role="menuitem" onclick="runSmartShopAction(' + escHtml(JSON.stringify(item)) + ')"><span>' + item.icon + '</span>' + escHtml(item.label) + '</button>'; }).join('') + '</div></section>' +
      '<section class="smart-shop-v2-panel smart-shop-v2-cats"><h4>Main categories</h4><div>' + categories.map(function(item) { return '<a role="menuitem" href="' + getRouteUrl('category', item.cat.id) + '" onclick="if(handleRouteClick(event,\'category\',\'' + item.cat.id + '\') === false){closeShopDropdown();return false;} return true;"><span>' + item.cat.icon + '</span><b>' + escHtml(item.cat.label) + '</b><small>' + item.cat.count + ' items</small>' + (item.badge ? '<em>' + escHtml(item.badge) + '</em>' : '') + '</a>'; }).join('') + '</div></section>' +
      '<section class="smart-shop-v2-panel smart-shop-v2-needs"><h4>Need something for...</h4><div>' + needs.map(function(item) { return '<button type="button" role="menuitem" onclick="runSmartShopAction(' + escHtml(JSON.stringify(item)) + ')"><span>' + item.icon + '</span><b>' + escHtml(item.title) + '</b><small>' + escHtml(item.text) + '</small></button>'; }).join('') + '</div></section>' +
    '</div>' +
    '<div class="smart-shop-v2-assistant"><section class="smart-shop-v2-lab"><button type="button" class="smart-shop-panel-toggle" aria-expanded="false" aria-controls="smart-ai-lab-panel" onclick="toggleSmartShopPanel(\'smart-ai-lab-panel\', this)"><span>AI-style discovery lab</span><b>Build a Game Night</b></button><div class="smart-shop-expand-panel" id="smart-ai-lab-panel">' +
      '<div class="smart-shop-v2-control"><label>Tonight\'s Vibe</label><div>' + vibeOptions.map(function(vibe) { return '<button type="button" data-smart-vibe="' + escHtml(vibe) + '" onmouseenter="setSmartShopVibe(\'' + escHtml(vibe) + '\')" onclick="setSmartShopVibe(\'' + escHtml(vibe) + '\')">' + escHtml(vibe) + '</button>'; }).join('') + '</div></div>' +
      '<div class="smart-shop-v2-control smart-shop-player-wheel"><label>Multiplayer Wheel</label><div>' + playerOptions.map(function(players) { return '<button type="button" data-smart-players="' + escHtml(players) + '" onclick="setSmartShopPlayers(\'' + escHtml(players) + '\')">' + escHtml(players) + '</button>'; }).join('') + '</div></div>' +
      '<div class="smart-shop-v2-control"><label>Occasion</label><div>' + occasionOptions.map(function(occasion) { return '<button type="button" data-smart-occasion="' + escHtml(occasion) + '" onmouseenter="setSmartShopOccasion(\'' + escHtml(occasion) + '\')" onclick="setSmartShopOccasion(\'' + escHtml(occasion) + '\')">' + escHtml(occasion) + '</button>'; }).join('') + '</div></div>' +
      '<div class="smart-shop-v2-control"><label>Budget</label><div>' + budgetOptions.map(function(budget) { return '<button type="button" data-smart-budget="' + escHtml(budget) + '" onclick="setSmartShopBudget(\'' + escHtml(budget) + '\')">' + escHtml(budget) + '</button>'; }).join('') + '</div></div>' +
      '</div><div class="smart-shop-v2-setup" id="smart-match-card"><small>Majestic Match Engine</small><span id="smart-setup-title">Tonight\'s Match</span><strong id="smart-match-products"></strong><p id="smart-setup-copy"></p><a id="smart-setup-wa" target="_blank" rel="noopener noreferrer" href="#">Reserve this setup on WhatsApp</a></div></section>' +
      '<section class="smart-shop-v2-strip"><div class="smart-shop-v2-trending"><button class="smart-shop-panel-toggle" aria-expanded="false" aria-controls="smart-recs-panel" onclick="toggleSmartShopPanel(\'smart-recs-panel\', this)"><span>Open recommendations</span><b>Trending and popular picks</b></button><div class="smart-shop-expand-panel" id="smart-recs-panel"><button onclick="runSmartShopAction({page:\'bestsellers\'})"><span>Popular tonight</span><b>Bestsellers</b></button><button onclick="runSmartShopAction({page:\'new-arrivals\'})"><span>Fresh shelf</span><b>New Arrivals</b></button><button onclick="runSmartShopAction({page:\'gift-picks\'})"><span>Best gift</span><b>Gift Picks</b></button></div></div>' +
      '<div class="smart-shop-v2-gift"><button class="smart-shop-panel-toggle" aria-expanded="false" aria-controls="smart-gift-panel" onclick="toggleSmartShopPanel(\'smart-gift-panel\', this)"><span>Open gift finder</span><b>Find a gift by age and budget</b></button><div class="smart-shop-expand-panel" id="smart-gift-panel"><select id="smart-gift-age"><option>Kids</option><option>Teens</option><option>Adults</option><option>Family</option></select><select id="smart-gift-budget"><option>Under 1000</option><option>1000-2000</option><option>2000-5000</option><option>Premium</option></select><select id="smart-gift-occasion"><option>Birthday</option><option>Family Night</option><option>School Event</option><option>House Party</option></select><button onclick="runSmartGiftFinder()">Show ideas</button></div></div>' +
      '<aside class="smart-shop-v2-concierge"><div class="smart-shop-wa-orbit">WA</div><span><i></i> Majestic Buddy Online</span><h4>Not sure what to pick?</h4><p>Usually replies in 2-5 mins with options matched to your budget, age group and occasion.</p><a role="menuitem" href="' + conciergeUrl + '" target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a></aside></section></div>' +
  '</div>';

  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    if (!btn.dataset.shopKeyReady) {
      btn.addEventListener('keydown', handleShopDropdownKeydown);
      btn.dataset.shopKeyReady = 'true';
    }
  }
  if (!menu.dataset.shopKeyReady) {
    menu.addEventListener('keydown', handleShopDropdownKeydown);
    menu.dataset.shopKeyReady = 'true';
  }
  if (dropdown && !dropdown.dataset.smartShopReady) {
    dropdown.dataset.smartShopReady = 'true';
  }
  updateSmartShopAssistant();
}

function toggleShopDropdown() {
  var menu = document.getElementById('shop-dropdown-menu');
  if (menu && menu.classList.contains('open')) closeShopDropdown();
  else openShopDropdown();
}

function openShopDropdown() {
  var btn = document.getElementById('shop-dropdown-btn');
  var menu = document.getElementById('shop-dropdown-menu');
  if (!btn || !menu) return;
  positionSmartShopMenu();
  menu.classList.add('open');
  btn.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
}

function positionSmartShopMenu() {
  var dropdown = document.getElementById('shop-dropdown');
  var menu = document.getElementById('shop-dropdown-menu');
  if (!dropdown || !menu) return;
  var panelWidth = Math.min(1144, Math.max(320, window.innerWidth - 96));
  var dropdownRect = dropdown.getBoundingClientRect();
  var dropdownLeft = dropdownRect.left;
  var left = Math.max(28, (window.innerWidth - panelWidth) / 2) - dropdownLeft;
  menu.style.width = panelWidth + 'px';
  menu.style.left = left + 'px';
  menu.style.top = Math.max(dropdownRect.height + 10, 48) + 'px';
}

function closeShopDropdown(returnFocus) {
  var btn = document.getElementById('shop-dropdown-btn');
  var menu = document.getElementById('shop-dropdown-menu');
  var wasOpen = menu && menu.classList.contains('open');
  if (btn) {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
  if (menu) menu.classList.remove('open');
  if (returnFocus && wasOpen && btn) btn.focus();
}

function runSmartShopAction(action) {
  if (!action) return;
  if (action.cat) navigate('category', action.cat);
  else if (action.page) navigate(action.page);
  else if (action.query) {
    shopSearch = action.query;
    navigate('shop');
    renderShop();
  }
  closeShopDropdown();
  closeMobileNav();
}

function runSmartGiftFinder() {
  var age = document.getElementById('smart-gift-age');
  var budget = document.getElementById('smart-gift-budget');
  var occasion = document.getElementById('smart-gift-occasion');
  shopSearch = [
    age ? age.value : '',
    budget ? budget.value : '',
    occasion ? occasion.value : '',
    'gift'
  ].join(' ').trim();
  navigate('gift-picks');
  closeShopDropdown();
  closeMobileNav();
}

function updateShopDiscoverySearch(query) {
  var resultsEl = document.getElementById('smart-shop-search-results');
  if (!resultsEl) return;
  query = window.MGWSecurity ? window.MGWSecurity.sanitizeSearchQuery(query).toLowerCase() : (query || '').trim().toLowerCase().slice(0, 80);
  if (!query) {
    resultsEl.innerHTML = getSmartShopHintHtml();
    return;
  }
  var catMatches = CATEGORIES.filter(function(cat) {
    return (cat.label + ' ' + cat.id).toLowerCase().indexOf(query) !== -1;
  }).slice(0, 3);
  var productMatches = PRODUCTS.filter(function(product) {
    return [product.name, product.shortDescription, product.cat, product.slug].join(' ').toLowerCase().indexOf(query) !== -1;
  }).slice(0, 4);
  var html = catMatches.map(function(cat) {
    return '<button type="button" role="menuitem" onclick="navigate(\'category\',\'' + cat.id + '\');closeShopDropdown()"><span>Category</span><b>' + escHtml(cat.label) + '</b></button>';
  }).join('');
  html += productMatches.map(function(product) {
    return '<button type="button" role="menuitem" onclick="navigate(\'product\',\'' + product.id + '\');closeShopDropdown()"><span>KES ' + product.price.toLocaleString() + '</span><b>' + escHtml(product.name) + '</b></button>';
  }).join('');
  resultsEl.innerHTML = html || '<div class="smart-shop-no-results">No instant matches. Try a broader word.</div>';
}

function handleShopDropdownKeydown(e) {
  var menu = document.getElementById('shop-dropdown-menu');
  var isOpen = menu && menu.classList.contains('open');
  if (e.key === 'Tab' && isOpen) {
    closeShopDropdown(false);
    return;
  }
  if (e.key === 'Escape' && isOpen) {
    e.preventDefault();
    closeShopDropdown(true);
    return;
  }
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Home' && e.key !== 'End') return;
  if (!isOpen && e.key === 'ArrowDown') openShopDropdown();
  var focusables = Array.prototype.slice.call(document.querySelectorAll('#shop-dropdown-menu a, #shop-dropdown-menu button, #shop-dropdown-menu input, #shop-dropdown-menu select'))
    .filter(function(el) { return !el.disabled && el.offsetParent !== null; });
  if (!focusables.length) return;
  e.preventDefault();
  var idx = focusables.indexOf(document.activeElement);
  if (e.key === 'Home') idx = 0;
  else if (e.key === 'End') idx = focusables.length - 1;
  else if (e.key === 'ArrowDown') idx = idx < focusables.length - 1 ? idx + 1 : 0;
  else idx = idx > 0 ? idx - 1 : focusables.length - 1;
  focusables[idx].focus();
}

function setSmartShopVibe(vibe) {
  smartShopState.vibe = vibe;
  updateSmartShopAssistant();
}

function setSmartShopPlayers(players) {
  smartShopState.players = players;
  updateSmartShopAssistant();
}

function setSmartShopOccasion(occasion) {
  smartShopState.occasion = occasion;
  updateSmartShopAssistant();
}

function setSmartShopBudget(budget) {
  smartShopState.budget = budget;
  updateSmartShopAssistant();
}

function toggleSmartShopPanel(panelId, trigger) {
  var panel = document.getElementById(panelId);
  if (!panel) return;
  var isOpen = panel.classList.toggle('open');
  if (trigger) {
    trigger.classList.toggle('open', isOpen);
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  positionSmartShopMenu();
}

function getSmartShopRecommendation() {
  var vibe = smartShopState.vibe;
  if (smartShopState.occasion === 'Couple Night' || vibe === 'Romantic') return { title: 'Tonight\'s Match', picks: 'Conversation Cards + Monopoly Deal + Puzzle', copy: 'Perfect for ' + smartShopState.players + ' | ' + vibe + ' vibe | ' + smartShopState.occasion + '.' };
  if (smartShopState.occasion === 'School Event') return { title: 'Tonight\'s Match', picks: 'UNO + Jenga + Snakes & Ladders', copy: 'Perfect for groups that need simple rules, quick rounds and durable choices.' };
  if (vibe === 'Chaotic' || smartShopState.occasion === 'House Party') return { title: 'Tonight\'s Match', picks: 'Exploding Kittens + UNO + 5 Seconds', copy: 'Perfect for ' + smartShopState.players + ' | funny pressure | house-party energy.' };
  if (vibe === 'Competitive') return { title: 'Tonight\'s Match', picks: 'Catan + Codenames + Chess', copy: 'Perfect for players who want tension, skill and replay value.' };
  if (vibe === 'Funny') return { title: 'Tonight\'s Match', picks: 'Codenames + Exploding Kittens + UNO', copy: 'Perfect for ' + smartShopState.players + ' | Funny vibe | ' + smartShopState.occasion + '.' };
  return { title: 'Tonight\'s Match', picks: 'Jenga + UNO + Family Board Game', copy: 'Perfect for relaxed play, gifting and same-day Nairobi delivery.' };
}

function updateSmartShopAssistant() {
  var rec = getSmartShopRecommendation();
  var title = document.getElementById('smart-setup-title');
  var picks = document.getElementById('smart-match-products');
  var copy = document.getElementById('smart-setup-copy');
  var wa = document.getElementById('smart-setup-wa');
  var card = document.getElementById('smart-match-card');
  if (card) {
    card.classList.remove('is-morphing');
    void card.offsetWidth;
    card.classList.add('is-morphing');
  }
  if (title) title.textContent = rec.title;
  if (picks) picks.textContent = rec.picks;
  if (copy) copy.textContent = rec.copy + ' Budget: ' + smartShopState.budget + '.';
  if (wa) {
    var message = 'Hi Majestic Games World, reserve this game night setup: ' + rec.picks + '. Players: ' + smartShopState.players + ', vibe: ' + smartShopState.vibe + ', occasion: ' + smartShopState.occasion + ', budget: ' + smartShopState.budget + '.';
    wa.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }
  document.querySelectorAll('[data-smart-vibe]').forEach(function(el) {
    el.classList.toggle('active', el.getAttribute('data-smart-vibe') === smartShopState.vibe);
  });
  document.querySelectorAll('[data-smart-players]').forEach(function(el) {
    el.classList.toggle('active', el.getAttribute('data-smart-players') === smartShopState.players);
  });
  document.querySelectorAll('[data-smart-occasion]').forEach(function(el) {
    el.classList.toggle('active', el.getAttribute('data-smart-occasion') === smartShopState.occasion);
  });
  document.querySelectorAll('[data-smart-budget]').forEach(function(el) {
    el.classList.toggle('active', el.getAttribute('data-smart-budget') === smartShopState.budget);
  });
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   MOBILE NAV
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function initMobileNav() {
  var nav = document.getElementById('mobile-nav');
  if (!nav) return;
  nav.innerHTML =
    '<div class="mobile-nav-art" aria-hidden="true"></div>' +
    '<button class="mobile-nav-close" onclick="closeMobileNav(true)" aria-label="Close navigation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
    '<div class="mobile-nav-header"><img src="images/branding/LOGOF2-transparent.png" alt="Majestic Games & Toys World" class="mobile-nav-logo" loading="eager" /></div>' +
    '<div class="mobile-nav-body">' +
      '<section class="mobile-nav-welcome" aria-label="Majestic Buddy welcome"><img src="images/branding/majestic-buddy-royal.png" alt="" loading="lazy" /><div><span>Welcome to</span><strong>Majestic Games World!</strong><small>Play better, shop smarter.</small></div></section>' +
      '<nav class="mobile-nav-list" aria-label="Mobile menu">' +
        '<a href="./" class="mobile-nav-link active" data-mobile-page="home" onclick="if(handleRouteClick(event,\'home\') === false){closeMobileNav();return false;} return true;"><span class="mobile-nav-icon"><img src="images/mobile-menu-icons/home.png" alt="" loading="lazy" /></span><span>Home</span><i aria-hidden="true">&#8250;</i></a>' +
        '<a href="?page=shop" class="mobile-nav-link" data-mobile-page="shop" onclick="if(handleRouteClick(event,\'shop\') === false){closeMobileNav();return false;} return true;"><span class="mobile-nav-icon"><img src="images/mobile-menu-icons/shop.png" alt="" loading="lazy" /></span><span>Shop</span><i aria-hidden="true">&#8250;</i></a>' +
        '<button type="button" class="mobile-nav-link mobile-nav-toggle" data-mobile-page="category" aria-expanded="false" onclick="toggleMobileCategoryPreview(this)"><span class="mobile-nav-icon"><img src="images/mobile-menu-icons/categories.png" alt="" loading="lazy" /></span><span>Categories</span><i aria-hidden="true">&#8964;</i></button>' +
        '<div id="mobile-nav-cats" class="mobile-nav-cats"></div>' +
        '<a href="?page=gift-picks" class="mobile-nav-link" data-mobile-page="gift-picks" onclick="if(handleRouteClick(event,\'gift-picks\') === false){closeMobileNav();return false;} return true;"><span class="mobile-nav-icon"><img src="images/mobile-menu-icons/gift.png" alt="" loading="lazy" /></span><span>Gift Guide</span><i aria-hidden="true">&#8250;</i></a>' +
        '<a href="?page=bestsellers" class="mobile-nav-link" data-mobile-page="bestsellers" onclick="if(handleRouteClick(event,\'bestsellers\') === false){closeMobileNav();return false;} return true;"><span class="mobile-nav-icon mobile-nav-icon-calendar" aria-hidden="true"></span><span>Game Night</span><i aria-hidden="true">&#8250;</i></a>' +
        '<a href="./#game-finder" class="mobile-nav-link" data-mobile-page="buddy" onclick="navigate(\'home\'); closeMobileNav(); window.setTimeout(function(){var el=document.getElementById(\'game-finder\'); if(el) el.scrollIntoView({behavior:\'smooth\', block:\'start\'});}, 120); return false;"><span class="mobile-nav-icon mobile-nav-icon-bot" aria-hidden="true"></span><span>Majestic Buddy</span><b>NEW</b><i aria-hidden="true">&#8250;</i></a>' +
        '<a href="?page=faqs" class="mobile-nav-link" data-mobile-page="faqs" onclick="if(handleRouteClick(event,\'faqs\') === false){closeMobileNav();return false;} return true;"><span class="mobile-nav-icon mobile-nav-icon-info" aria-hidden="true"></span><span>About Us</span><i aria-hidden="true">&#8250;</i></a>' +
        '<a href="?page=contact" class="mobile-nav-link" data-mobile-page="contact" onclick="if(handleRouteClick(event,\'contact\') === false){closeMobileNav();return false;} return true;"><span class="mobile-nav-icon mobile-nav-icon-phone" aria-hidden="true"></span><span>Contact Us</span><i aria-hidden="true">&#8250;</i></a>' +
      '</nav>' +
      '<a href="https://wa.me/254710707973" target="_blank" rel="noopener noreferrer" class="mobile-delivery-card"><span><strong>FREE delivery in Nairobi</strong><small>On orders 2,500+ KES</small></span><i aria-hidden="true">&#8250;</i><img src="images/mobile-menu-icons/delivery.png" alt="" loading="lazy" /></a>' +
      '<section class="mobile-nav-trust" aria-label="Why shop with us"><h3>Why shop with us?</h3><div><span class="trust-shield" aria-hidden="true"></span><strong>Authentic Products</strong><small>100% quality checked</small></div><div><span class="trust-family" aria-hidden="true"></span><strong>Trusted by 1000+ Families</strong><small>Across Kenya</small></div><div><span class="trust-whatsapp" aria-hidden="true"></span><strong>WhatsApp Support</strong><small>Fast & friendly help</small></div></section>' +
      '<a href="https://wa.me/254710707973" target="_blank" rel="noopener noreferrer" class="mobile-nav-whatsapp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.940 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg><span>Order on WhatsApp</span><i aria-hidden="true">&#8594;</i></a>' +
      '<div class="mobile-nav-socials"><strong>Follow us</strong><a href="https://www.instagram.com/majesticgamesworld" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="images/branding/instagram.png" alt="" loading="lazy" /></a><a href="https://tiktok.com/@majesticgamesworld" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><img src="images/branding/tiktok.png" alt="" loading="lazy" /></a><a href="https://www.facebook.com/share/1859yTLwx3/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="images/branding/facebook.png" alt="" loading="lazy" /></a><a href="https://wa.me/254710707973" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><img src="images/branding/whatsapp.png" alt="" loading="lazy" /></a></div>' +
    '</div>';
  var catsEl = document.getElementById('mobile-nav-cats');
  if (!catsEl) return;
  var featuredCatIds = ['board-games', 'family-games', 'kids-games', 'puzzles', 'party-games', 'trivia-games'];
  var featuredCats = featuredCatIds.map(function(id) {
    return CATEGORIES.find(function(cat) { return cat.id === id; });
  }).filter(Boolean);
  catsEl.innerHTML = featuredCats.map(function(cat) {
    return '<a href="' + getRouteUrl('category', cat.id) + '" class="mobile-nav-cat-link" onclick="if(handleRouteClick(event,\'category\',\'' + cat.id + '\') === false){closeMobileNav();return false;} return true;"><span>' + cat.icon + '</span><span>' + escHtml(cat.label) + '</span></a>';
  }).join('') +
    '<a href="' + getRouteUrl('shop') + '" class="mobile-nav-cat-link mobile-nav-all-link" onclick="if(handleRouteClick(event,\'shop\') === false){closeMobileNav();return false;} return true;"><span>+</span><span>View All Products</span></a>';
  updateMobileNavActiveState();
}

function updateMobileNavActiveState(page) {
  var nav = document.getElementById('mobile-nav');
  if (!nav) return;
  var activePage = page || currentPage || document.body.getAttribute('data-page') || 'home';
  nav.querySelectorAll('[data-mobile-page]').forEach(function(item) {
    var target = item.getAttribute('data-mobile-page');
    item.classList.toggle('active', target === activePage || (target === 'category' && activePage === 'category'));
  });
}

function toggleMobileCategoryPreview(trigger) {
  var catsEl = document.getElementById('mobile-nav-cats');
  if (!catsEl || !trigger) return;
  var isOpen = catsEl.classList.toggle('open');
  trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function updateMobileSmartSearch(query) {
  var resultsEl = document.getElementById('mobile-smart-search-results');
  if (!resultsEl) return;
  query = window.MGWSecurity ? window.MGWSecurity.sanitizeSearchQuery(query).toLowerCase() : (query || '').trim().toLowerCase().slice(0, 80);
  if (!query) {
    resultsEl.innerHTML = '';
    return;
  }
  var productMatches = PRODUCTS.filter(function(product) {
    return [product.name, product.shortDescription, product.cat, product.slug].join(' ').toLowerCase().indexOf(query) !== -1;
  }).slice(0, 4);
  var categoryMatches = CATEGORIES.filter(function(cat) {
    return (cat.label + ' ' + cat.id).toLowerCase().indexOf(query) !== -1;
  }).slice(0, 2);
  var html = categoryMatches.map(function(cat) {
    return '<button type="button" onclick="navigate(\'category\',\'' + cat.id + '\');closeMobileNav()"><span>Category</span><b>' + escHtml(cat.label) + '</b></button>';
  }).join('');
  html += productMatches.map(function(product) {
    return '<button type="button" onclick="navigate(\'product\',\'' + product.id + '\');closeMobileNav()"><span>KES ' + product.price.toLocaleString() + '</span><b>' + escHtml(product.name) + '</b></button>';
  }).join('');
  resultsEl.innerHTML = html || '<p>No instant matches. Try a broader word.</p>';
}

function runMobileSmartGiftFinder() {
  var age = document.getElementById('mobile-smart-age');
  var budget = document.getElementById('mobile-smart-budget');
  var occasion = document.getElementById('mobile-smart-occasion');
  shopSearch = [
    age ? age.value : '',
    budget ? budget.value : '',
    occasion ? occasion.value : '',
    'gift'
  ].join(' ').trim();
  navigate('gift-picks');
  closeMobileNav();
}

function toggleMobileNav() {
  var nav = document.getElementById('mobile-nav');
  var overlay = document.getElementById('mobile-overlay');
  var btn = document.getElementById('hamburger-btn');
  var hamburger = document.getElementById('hamburger-icon');
  var closeIcon = document.getElementById('close-icon');
  if (!nav || !overlay) return;
  var isOpen = nav.classList.contains('open');

  nav.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

  if (hamburger) hamburger.style.display = isOpen ? '' : 'none';
  if (closeIcon) closeIcon.style.display = isOpen ? 'none' : '';
  if (!isOpen) {
    window.setTimeout(function() {
      var closeBtn = nav.querySelector('.mobile-nav-close');
      if (closeBtn) closeBtn.focus();
      else nav.focus();
    }, 250);
  } else if (btn) {
    btn.focus();
  }
}

function closeMobileNav(returnFocus) {
  var nav = document.getElementById('mobile-nav');
  var overlay = document.getElementById('mobile-overlay');
  var btn = document.getElementById('hamburger-btn');
  var hamburger = document.getElementById('hamburger-icon');
  var closeIcon = document.getElementById('close-icon');
  if (!nav || !overlay) return;
  var wasOpen = nav.classList.contains('open');

  nav.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  if (btn) btn.setAttribute('aria-expanded', 'false');

  if (hamburger) hamburger.style.display = '';
  if (closeIcon) closeIcon.style.display = 'none';
  if (returnFocus && wasOpen && btn) btn.focus();
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   SEARCH
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
