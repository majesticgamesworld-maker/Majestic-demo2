# CSS Ownership Map

The site had grown a large responsive override layer. Mobile support existed, but many files controlled the same components. The current structure keeps cascade order explicit while making ownership easier to follow.

## Loaded CSS Order

1. `base.css` - tokens, resets, base utilities, shared primitives.
2. `header.css` - site header, nav, dropdown, mobile menu, search shell.
3. `home.css` - homepage sections and footer base styling.
4. `product-layout.css` - product cards, shop/category/product page layout.
5. `buddy.css` - Majestic Buddy and finder component styling.
6. `product-components.css` - product detail components and quick-view/product UI pieces.
7. `recommendation.css` - recommendation rails, related products, detail tabs.
8. `product-mobile.css` - product-page mobile and late PDP safeguards.
9. `cart.css` - cart drawer/page and checkout modal styling.
10. `responsive-*.css` - ordered viewport/page-specific overrides split by ownership.

## Responsive Files

- `responsive-core.css` - shared viewport fixes, image zoom, early home category overrides.
- `responsive-navigation-shell.css` - navbar, hero, footer, blog, and broad page-shell breakpoints.
- `responsive-catalog.css` - collection heroes, product grids, shop rows, and footer normalization.
- `responsive-mobile-pages.css` - mobile footer stack, contact, shop, category, and product containment.
- `responsive-product.css` - final PDP mobile and product-navbar guard rules.
- `responsive-home-contact.css` - generated collection art, home hero, contact hero, category cards.
- `responsive-buddy.css` - Majestic Buddy layouts and Buddy alignment guards.
- `responsive-cross-page.css` - final page nav guards, home category density, shared rhythm rules.
- `responsive-mobile-audit.css` - final Mobile Layout Review fixes: `100dvh`, touch targets, compact mobile header, very-small-phone category layout, modal height, overflow containment, and tablet layout guards.

## Compatibility Files

- `products.css` is now a manifest for the product CSS split.
- `responsive.css` is now a manifest for the responsive CSS split.
- `styles.css` and `styles.min.css` are legacy bundles and are not loaded by `index.html`; do not edit them for live styling unless the build/deploy process is changed to use them.

## Rule Of Thumb

Put base component styling in the component file. Put viewport corrections in the matching `responsive-*` file. Avoid adding new sitewide rules to `responsive-cross-page.css` unless the rule genuinely must override multiple page families after every other responsive module.
