/* ============================================================
   MAJESTIC GAMES & TOYS WORLD - Vanilla JavaScript Engine
   Replaces: React useState, useEffect, routing, context, hooks
   Features: SPA navigation, cart, search, hero slider,
             game finder, quick view modal, toast notifications
   ============================================================ */

'use strict';

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   CART STATE  (replaces CartContext / useState)
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
var cart = [];
var CART_STORAGE_KEY = 'mgw_cart';
var wishlist = [];
var WISHLIST_STORAGE_KEY = 'mgw_wishlist';

function loadCart() {
  // Always start with empty cart to avoid stale data
  cart = [];
  try {
    var saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      var parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        cart = parsed;
      }
    }
  } catch(e) {
    cart = [];
  }
}

function saveCart() {
  try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch (e) {}
}

function getCartTotal() {
  return cart.reduce(function(sum, item) { return sum + item.price * item.qty; }, 0);
}

function getCartCount() {
  return cart.reduce(function(sum, item) { return sum + item.qty; }, 0);
}

function addToCart(product) {
  var existing = cart.find(function(i) { return i.id === product.id; });
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1, img: getProductThumbSrc(getProductImg(product)) });
  }
  saveCart();
  updateCartUI();
  showToast('Added to cart!', product.name + ' Ã— 1', 'ðŸ›’');
  confettiBurst();
}

function removeFromCart(id) {
  cart = cart.filter(function(i) { return i.id !== id; });
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateQty(id, delta) {
  var item = cart.find(function(i) { return i.id === id; });
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  renderCartItems();
}

function loadWishlist() {
  wishlist = [];
  try {
    var saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    var parsed = saved ? JSON.parse(saved) : [];
    wishlist = Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch (e) {
    wishlist = [];
  }
}

function saveWishlist() {
  try { localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist)); } catch (e) {}
}

function isWishlisted(id) {
  return wishlist.indexOf(id) !== -1;
}

function updateWishlistButtons() {
  document.querySelectorAll('[data-wishlist-id]').forEach(function(btn) {
    var id = btn.getAttribute('data-wishlist-id');
    var active = isWishlisted(id);
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    btn.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Save product');
  });
}

function toggleWishlist(id, btn) {
  var product = getProductById(id);
  if (!product) return;
  var index = wishlist.indexOf(id);
  var added = index === -1;
  if (added) {
    wishlist.push(id);
  } else {
    wishlist.splice(index, 1);
  }
  saveWishlist();
  updateWishlistButtons();
  showToast(added ? 'Saved to wishlist' : 'Removed from wishlist', product.name, added ? '&#9829;' : '&#9825;');
}

function initTopBanner() {
  var tracks = document.querySelectorAll('.top-banner .marquee-track');
  if (!tracks.length) return;
  var items = [
    '&#128666; Same-day Nairobi delivery',
    '&#127873; Free delivery over KES 8,000',
    '&#127922; Curated games, toys, puzzles and gifts',
    '&#128172; WhatsApp recommendations before you buy',
    '&#11088; New favourites added often',
    '&#128722; Easy ordering via WhatsApp'
  ];
  var markup = items.concat(items).map(function(item) {
    return '<span>' + item + '</span>';
  }).join('');
  tracks.forEach(function(track) {
    track.innerHTML = markup;
  });
  initMobileTopBannerScroll(tracks);
}

function initMobileTopBannerScroll(tracks) {
  var mobileQuery = window.matchMedia ? window.matchMedia('(max-width: 767px)') : null;
  var activeTracks = Array.prototype.slice.call(tracks);
  var rafId = 0;
  var lastTime = 0;
  var offsets = activeTracks.map(function() { return 0; });
  var speed = 34;

  function resetTrack(track) {
    track.style.removeProperty('animation');
    track.style.removeProperty('transform');
    track.style.removeProperty('will-change');
  }

  function stop() {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
    lastTime = 0;
    offsets = activeTracks.map(function() { return 0; });
    activeTracks.forEach(resetTrack);
  }

  function tick(time) {
    if (!lastTime) lastTime = time;
    var delta = Math.min(time - lastTime, 64) / 1000;
    lastTime = time;

    activeTracks.forEach(function(track, i) {
      offsets[i] += speed * delta;
      var loopWidth = track.scrollWidth / 2;
      if (loopWidth > 0 && offsets[i] >= loopWidth) offsets[i] -= loopWidth;
      track.style.setProperty('animation', 'none', 'important');
      track.style.setProperty('will-change', 'transform', 'important');
      track.style.setProperty('transform', 'translate3d(-' + offsets[i].toFixed(2) + 'px, 0, 0)', 'important');
    });

    rafId = window.requestAnimationFrame(tick);
  }

  function start() {
    stop();
    if (mobileQuery && !mobileQuery.matches) return;
    rafId = window.requestAnimationFrame(tick);
  }

  start();

  if (mobileQuery) {
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', start);
    } else if (mobileQuery.addListener) {
      mobileQuery.addListener(start);
    }
  }

  window.addEventListener('resize', start);
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   CART UI UPDATE
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function updateCartUI() {
  var count = getCartCount();
  var total = getCartTotal();

  // Header badge
  var badge = document.getElementById('header-cart-badge');
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  }

  // Drawer badge
  var drawerBadge = document.getElementById('cart-count-badge');
  if (drawerBadge) {
    drawerBadge.textContent = count + ' item' + (count !== 1 ? 's' : '');
    drawerBadge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  // Total
  var totalEl = document.getElementById('cart-total-display');
  if (totalEl) totalEl.textContent = 'KES ' + total.toLocaleString();

  // Free delivery bar
  var freeBar = document.getElementById('free-delivery-bar');
  var freeText = document.getElementById('free-delivery-text');
  var freeFill = document.getElementById('free-delivery-fill');
  if (freeBar) {
    if (count > 0) {
      freeBar.style.display = 'block';
      var pct = Math.min(100, Math.round((total / FREE_DELIVERY_THRESHOLD) * 100));
      if (freeFill) { freeFill.style.width = pct + '%'; freeFill.classList.toggle('full', pct >= 100); }
      if (freeText) {
        if (total >= FREE_DELIVERY_THRESHOLD) {
          freeText.textContent = 'ðŸšš You qualify for FREE delivery!';
          freeText.className = 'free-delivery-text achieved';
        } else {
          var remaining = FREE_DELIVERY_THRESHOLD - total;
          freeText.textContent = 'Add KES ' + remaining.toLocaleString() + ' more for FREE delivery';
          freeText.className = 'free-delivery-text pending';
        }
      }
    } else {
      freeBar.style.display = 'none';
    }
  }

  // Footer visibility
  var footer = document.getElementById('cart-footer');
  var emptyEl = document.getElementById('cart-empty');
  if (footer) footer.style.display = count > 0 ? 'block' : 'none';
  if (emptyEl) emptyEl.style.display = count > 0 ? 'none' : 'flex';

  // WhatsApp order link
  var waBtn = document.getElementById('cart-wa-btn');
  if (waBtn) {
    waBtn.href = buildCartWhatsAppURL();
    waBtn.onclick = openCheckoutDetailsModal;
  }
}

function buildCartWhatsAppURL() {
  return buildCartWhatsAppURLWithDetails({});
}

function buildCartWhatsAppURLWithDetails(details) {
  details = details || {};
  var lines = ['Hi Majestic Games World! I\'d like to order from the website cart:\n'];
  cart.forEach(function(item) {
    var product = getProductById(item.id);
    var productUrl = product ? getAbsoluteRouteUrl('product', product.id) : window.location.href;
    lines.push('- ' + item.name + ' x ' + item.qty + ' = KES ' + (item.price * item.qty).toLocaleString());
    lines.push('  SKU: ' + item.id);
    lines.push('  Link: ' + productUrl);
    lines.push('â€¢ ' + item.name + ' Ã— ' + item.qty + ' = KES ' + (item.price * item.qty).toLocaleString());
  });
  lines = lines.filter(function(line) {
    return line.indexOf(' = KES ') === -1 || line.indexOf(' x ') !== -1;
  });
  lines.push('\nTotal: KES ' + getCartTotal().toLocaleString());
  lines.push('\nPlease confirm availability, delivery fee, payment steps, and fastest fulfilment option.');
  lines.push('Delivery area: ' + sanitizeCartMessageText(details.deliveryArea || '', 500));
  lines.push('Needed by: ' + sanitizeCartMessageText(details.neededDate || '', 40));
  lines.push('Payment preference: ' + sanitizeCartMessageText(details.paymentPreference || '', 80));
  return buildWhatsAppURL(lines.join('\n'));
}

function sanitizeCartMessageText(value, maxLength) {
  if (window.MGWSecurity && window.MGWSecurity.normalizeText) {
    return window.MGWSecurity.normalizeText(value, maxLength || 500);
  }
  return String(value || '').replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, maxLength || 500);
}

function getAbsoluteRouteUrl(page, param) {
  return new URL(getRouteUrl(page, param), window.location.href).href;
}

function getSeoRouteUrl(page, param) {
  var base = '/';
  if (page === 'home') return base;
  if (page === 'product' && param) {
    var product = getProductById(param);
    return '/products/' + encodeURIComponent((product && product.slug) || param) + '/';
  }
  if (page === 'category' && param) return '/category/' + encodeURIComponent(param) + '/';
  return '/' + encodeURIComponent(page) + '/';
}

function getAbsoluteSeoRouteUrl(page, param) {
  return getAbsoluteSiteUrl(getSeoRouteUrl(page, param));
}

function buildWhatsAppURL(message) {
  return 'https://wa.me/254710707973?text=' + encodeURIComponent(message);
}

function ensureCheckoutDetailsModal() {
  var existing = document.getElementById('checkout-details-modal');
  if (existing) return existing;
  var zonePicker = renderCheckoutDeliverySelect();
  var paymentPicker = renderCheckoutPaymentSelect();
  var modal = document.createElement('div');
  modal.id = 'checkout-details-modal';
  modal.className = 'checkout-details-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML =
    '<div class="checkout-details-backdrop" data-checkout-close></div>' +
    '<form class="checkout-details-card" aria-labelledby="checkout-details-title">' +
      '<button type="button" class="checkout-details-close" data-checkout-close aria-label="Close checkout details">Ã—</button>' +
      '<h2 id="checkout-details-title">Delivery details</h2>' +
      '<p>Tell us where and when you need the order before we open WhatsApp.</p>' +
      '<fieldset class="checkout-zone-picker">' +
        '<legend>Choose delivery area</legend>' +
        zonePicker +
        '<div id="checkout-zone-fee" class="checkout-zone-fee" aria-live="polite">Select a delivery area to see fee and timing.</div>' +
      '</fieldset>' +
      '<label for="checkout-delivery-area">Building, street or extra directions</label>' +
      '<input id="checkout-delivery-area" name="deliveryArea" placeholder="Sarit Centre, apartment name, office floor..." autocomplete="shipping address-line1" />' +
      '<label for="checkout-needed-date">Needed date</label>' +
      '<input id="checkout-needed-date" name="neededDate" required type="date" />' +
      '<label for="checkout-payment-preference">Payment preference</label>' +
      paymentPicker +
      '<button type="submit" class="checkout-details-submit">Continue to WhatsApp</button>' +
    '</form>';
  document.body.appendChild(modal);
  modal.addEventListener('click', handleCheckoutDetailsClick);
  modal.querySelector('.checkout-details-card').addEventListener('submit', submitCheckoutDetails);
  return modal;
}

function getCheckoutDeliveryGroups() {
  var groups = [{
    label: 'Store Pickup',
    fee: 0,
    time: 'Pickup',
    areas: ['Commerce House, Moi Avenue']
  }];
  if (typeof DELIVERY_ZONES !== 'undefined' && Array.isArray(DELIVERY_ZONES)) {
    groups = groups.concat(DELIVERY_ZONES.map(function(zone) {
      return {
        label: zone.label,
        fee: zone.fee,
        time: zone.time,
        areas: zone.areas.split(',').map(function(area) { return area.trim(); }).filter(Boolean)
      };
    }));
  }
  return groups.concat([
    { label: 'Central - KES 500', fee: 500, time: '1-2 days', areas: ['Thika', 'Kiambu', 'Limuru'] },
    { label: 'Coast - KES 700', fee: 700, time: '2-3 days', areas: ['Mombasa', 'Malindi', 'Kilifi'] },
    { label: 'Western - KES 600', fee: 600, time: '2-3 days', areas: ['Kisumu', 'Eldoret', 'Nakuru'] },
    { label: 'Eastern - KES 600', fee: 600, time: '2-3 days', areas: ['Meru', 'Embu', 'Machakos'] },
    { label: 'Other towns - KES 800', fee: 800, time: '3-4 days', areas: ['Other town'] }
  ]);
}

function renderCheckoutDeliverySelect() {
  return '<div class="checkout-zone-select" id="checkout-zone-select">' +
    '<input id="checkout-delivery-zone" name="deliveryChoice" type="hidden" />' +
    '<button type="button" class="checkout-zone-trigger" data-checkout-toggle="zone" aria-expanded="false" aria-controls="checkout-zone-menu">' +
      '<span id="checkout-zone-label">-- Select your delivery area --</span>' +
      '<span aria-hidden="true">v</span>' +
    '</button>' +
    '<div id="checkout-zone-menu" class="checkout-zone-menu" role="listbox" aria-label="Delivery areas">' +
    getCheckoutDeliveryGroups().map(function(group) {
      var feeText = group.fee === 0 ? 'FREE' : 'KES ' + group.fee;
      var groupSummary = group.label + ' - ' + feeText + ' - ' + group.time;
      return '<div class="checkout-zone-group" role="group" aria-label="' + escHtml(groupSummary) + '">' +
        '<div class="checkout-zone-heading">' + escHtml(groupSummary) + '</div>' +
        group.areas.map(function(area) {
          var value = group.label + ' | ' + area + ' | ' + feeText + ' | ' + group.time;
          var summary = area + ' - ' + feeText + ' - ' + group.time;
          return '<button type="button" class="checkout-zone-option" role="option" data-value="' + escHtml(value) + '" data-summary="' + escHtml(summary) + '" data-checkout-zone-option>' + escHtml(area) + '</button>';
        }).join('') +
      '</div>';
    }).join('') +
    '</div>' +
  '</div>';
}

function renderCheckoutPaymentSelect() {
  var options = ['M-Pesa', 'Cash on delivery', 'Card', 'Bank transfer'];
  return '<div class="checkout-payment-select" id="checkout-payment-select">' +
    '<input id="checkout-payment-preference" name="paymentPreference" type="hidden" />' +
    '<button type="button" class="checkout-payment-trigger" data-checkout-toggle="payment" aria-expanded="false" aria-controls="checkout-payment-menu">' +
      '<span id="checkout-payment-label">Choose payment</span>' +
      '<span aria-hidden="true">v</span>' +
    '</button>' +
    '<div id="checkout-payment-menu" class="checkout-payment-menu" role="listbox" aria-label="Payment preference">' +
      options.map(function(option) {
        return '<button type="button" class="checkout-payment-option" role="option" data-value="' + escHtml(option) + '" data-checkout-payment-option>' + escHtml(option) + '</button>';
      }).join('') +
    '</div>' +
  '</div>';
}

function handleCheckoutDetailsClick(event) {
  if (event.target.closest('[data-checkout-close]')) {
    closeCheckoutDetailsModal();
    return;
  }
  var toggle = event.target.closest('[data-checkout-toggle]');
  if (toggle) {
    if (toggle.getAttribute('data-checkout-toggle') === 'zone') toggleCheckoutZoneMenu();
    if (toggle.getAttribute('data-checkout-toggle') === 'payment') toggleCheckoutPaymentMenu();
    return;
  }
  var zoneOption = event.target.closest('[data-checkout-zone-option]');
  if (zoneOption) {
    selectCheckoutDeliveryArea(zoneOption);
    return;
  }
  var paymentOption = event.target.closest('[data-checkout-payment-option]');
  if (paymentOption) selectCheckoutPayment(paymentOption);
}

function toggleCheckoutZoneMenu() {
  var wrap = document.getElementById('checkout-zone-select');
  var trigger = document.querySelector('.checkout-zone-trigger');
  if (!wrap || !trigger) return;
  closeCheckoutPaymentMenu();
  var isOpen = wrap.classList.toggle('open');
  trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function closeCheckoutZoneMenu() {
  var wrap = document.getElementById('checkout-zone-select');
  var trigger = document.querySelector('.checkout-zone-trigger');
  if (!wrap || !trigger) return;
  wrap.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
}

function selectCheckoutDeliveryArea(option) {
  var input = document.getElementById('checkout-delivery-zone');
  var label = document.getElementById('checkout-zone-label');
  if (!option || !input || !label) return;
  input.value = option.getAttribute('data-value') || '';
  label.textContent = option.textContent;
  document.querySelectorAll('.checkout-zone-option.selected').forEach(function(item) {
    item.classList.remove('selected');
    item.setAttribute('aria-selected', 'false');
  });
  option.classList.add('selected');
  option.setAttribute('aria-selected', 'true');
  updateCheckoutZoneFee(option.getAttribute('data-summary') || input.value);
  closeCheckoutZoneMenu();
}

function toggleCheckoutPaymentMenu() {
  var wrap = document.getElementById('checkout-payment-select');
  var trigger = document.querySelector('.checkout-payment-trigger');
  if (!wrap || !trigger) return;
  closeCheckoutZoneMenu();
  var isOpen = wrap.classList.toggle('open');
  trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function closeCheckoutPaymentMenu() {
  var wrap = document.getElementById('checkout-payment-select');
  var trigger = document.querySelector('.checkout-payment-trigger');
  if (!wrap || !trigger) return;
  wrap.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
}

function selectCheckoutPayment(option) {
  var input = document.getElementById('checkout-payment-preference');
  var label = document.getElementById('checkout-payment-label');
  if (!option || !input || !label) return;
  input.value = option.getAttribute('data-value') || '';
  label.textContent = input.value || 'Choose payment';
  document.querySelectorAll('.checkout-payment-option.selected').forEach(function(item) {
    item.classList.remove('selected');
    item.setAttribute('aria-selected', 'false');
  });
  option.classList.add('selected');
  option.setAttribute('aria-selected', 'true');
  closeCheckoutPaymentMenu();
}

function updateCheckoutZoneFee(value) {
  var feeEl = document.getElementById('checkout-zone-fee');
  if (!feeEl) return;
  if (!value) {
    feeEl.textContent = 'Select a delivery area to see fee and timing.';
    return;
  }
  feeEl.textContent = value.indexOf('|') === -1 ? value : value.split('|').map(function(part) { return part.trim(); }).slice(1).join(' - ');
}

function openCheckoutDetailsModal(event) {
  if (event) event.preventDefault();
  if (cart.length === 0) return;
  lastFocusedBeforeCheckout = document.activeElement;
  var modal = ensureCheckoutDetailsModal();
  var dateInput = document.getElementById('checkout-needed-date');
  if (dateInput && !dateInput.value) dateInput.value = new Date().toISOString().slice(0, 10);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  setTimeout(function() {
    var trigger = document.querySelector('.checkout-zone-trigger');
    if (trigger) trigger.focus();
  }, 30);
}

function closeCheckoutDetailsModal() {
  var modal = document.getElementById('checkout-details-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (lastFocusedBeforeCheckout && typeof lastFocusedBeforeCheckout.focus === 'function') lastFocusedBeforeCheckout.focus();
  lastFocusedBeforeCheckout = null;
}

function submitCheckoutDetails(event) {
  event.preventDefault();
  var form = event.currentTarget;
  var deliveryZone = sanitizeCartMessageText(form.deliveryChoice.value, 220);
  var deliveryArea = sanitizeCartMessageText(form.deliveryArea.value, 220);
  var details = {
    deliveryArea: deliveryZone + (deliveryArea ? ' | Details: ' + deliveryArea : ''),
    neededDate: sanitizeCartMessageText(form.neededDate.value, 40),
    paymentPreference: sanitizeCartMessageText(form.paymentPreference.value, 80)
  };
  if (!deliveryZone || !details.neededDate || !details.paymentPreference) {
    updateCheckoutZoneFee(deliveryZone || 'Please choose your delivery area before continuing.');
    return;
  }
  closeCheckoutDetailsModal();
  window.open(buildCartWhatsAppURLWithDetails(details), '_blank', 'noopener,noreferrer');
}

function buildProductWhatsAppMessage(product, qty, source) {
  qty = qty || 1;
  var cat = CATEGORIES.find(function(c) { return c.id === product.cat; });
  return [
    'Hi Majestic Games World! I need help ordering this item:',
    'Product: ' + product.name,
    'SKU: ' + product.id,
    'Category: ' + (cat ? cat.label : product.cat),
    'Quantity: ' + qty,
    'Price: KES ' + product.price.toLocaleString(),
    'Product link: ' + getAbsoluteRouteUrl('product', product.id),
    'Source: ' + (source || currentPage || 'website'),
    '',
    'Please confirm availability, delivery fee, payment steps, and fastest fulfilment option.',
    'Delivery area: ',
    'Needed by: '
  ].join('\n');
}

var EXACT_PRODUCT_METADATA_IDS = ['bg001', 'bg014', 'bg022', 'bg023', 'kg003', 'kg004'];

function getProductMetadataStatus(product) {
  var exact = product && EXACT_PRODUCT_METADATA_IDS.indexOf(product.id) !== -1;
  return {
    exact: exact,
    label: exact ? 'Exactly researched product details' : 'Catalogue guidance, not edition-verified',
    note: exact
      ? 'This description was individually researched for the title. Packaging, local stock and edition details should still be confirmed on WhatsApp before purchase.'
      : 'This description is based on the product title, category and safe catalogue assumptions. Exact edition, contents and packaging have not been individually verified yet.'
  };
}

function inferProductFacts(product, cat) {
  var text = [
    product.name,
    product.cat,
    product.ageGroup,
    product.difficulty,
    (product.tags || []).join(' '),
    (product.bestFor || []).join(' ')
  ].join(' ').toLowerCase();
  var adult = product.adult || product.safety === 'adult-only' || /adult|couple|romantic|intimate|drinking|bondage/.test(text);
  var kids = product.ageGroup === 'kids' || /kid|child|stem|doll|infant|toy/.test(text);
  var strategy = /chess|catan|azul|qwirkle|scrabble|monopoly|strategy|sequence|rummikub|risk/.test(text);
  var party = /party|taboo|articulate|seconds|bingo|cards|group|friends/.test(text);
  var couples = /couple|romantic|date|love/.test(text);
  var bestFor = (product.bestFor || []).slice(0, 4);
  if (!bestFor.length) {
    if (couples) bestFor = ['date nights', 'couples', 'anniversary gifts'];
    else if (kids) bestFor = ['kids', 'birthday gifts', 'screen-free play'];
    else if (strategy) bestFor = ['strategy lovers', 'family game nights', 'thoughtful gifts'];
    else if (party) bestFor = ['friends', 'parties', 'large groups'];
    else bestFor = ['home play', 'gifting', 'casual game nights'];
  }
  var occasion = couples ? 'Date night or couple gifting'
    : kids ? 'Birthdays, school breaks and family time'
    : party ? 'Parties, hangouts and team bonding'
    : strategy ? 'Family game night or strategy practice'
    : 'Gifts, weekend play and casual gatherings';
  var benefit = product.shortDescription || product.desc || product.description || '';
  if (!benefit || /for shoppers comparing physical games/.test(benefit)) {
    benefit = product.name + ' gives you a ready-to-play choice for ' + bestFor.slice(0, 2).join(' and ') + ', with simple buying support through WhatsApp and fast Nairobi delivery options.';
  }
  return {
    ageRange: product.age || (adult ? '18+' : kids ? '3-10 years' : '8+ years'),
    players: product.players || (couples ? '2 players' : strategy ? '2-4 players' : party ? '3+ players' : '2+ players'),
    playtime: product.playtime || (strategy ? '30-60 minutes' : party ? '15-30 minutes' : '20-40 minutes'),
    occasion: product.occasion || occasion,
    bestFor: bestFor,
    benefitDescription: benefit,
    categoryLabel: cat ? cat.label : product.cat
  };
}

function renderCartItems() {
  var list = document.getElementById('cart-items-list');
  if (!list) return;
  if (cart.length === 0) { list.innerHTML = ''; return; }

  list.innerHTML = cart.map(function(item) {
    return '<div class="cart-item" id="cart-item-' + item.id + '">' +
      '<div class="cart-item-img-wrap">' +
        '<img class="cart-item-img" src="' + item.img + '" alt="' + escHtml(item.name) + '" loading="lazy" />' +
      '</div>' +
      '<div class="cart-item-info">' +
        '<div class="cart-item-name">' + escHtml(item.name) + '</div>' +
        '<div class="cart-item-price">KES ' + item.price.toLocaleString() + '</div>' +
        '<div class="cart-item-controls">' +
          '<button class="qty-btn" onclick="updateQty(\'' + item.id + '\',-1)" aria-label="Decrease">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '</button>' +
          '<span class="qty-display">' + item.qty + '</span>' +
          '<button class="qty-btn" onclick="updateQty(\'' + item.id + '\',1)" aria-label="Increase">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '</button>' +
          '<button class="remove-item-btn" onclick="removeFromCart(\'' + item.id + '\')" aria-label="Remove">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   CART DRAWER
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
function openCart() {
  var drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  drawer.classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
  if (cartFocusTrap) cartFocusTrap(false);
  cartFocusTrap = focusTrap(drawer);
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
  if (cartFocusTrap) cartFocusTrap();
  cartFocusTrap = null;
}

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
   SPA NAVIGATION  (replaces React Router)
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
