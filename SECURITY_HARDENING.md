# Security Hardening Notes

## CSP Status

The site now ships a Content Security Policy through `vercel.json`, `.htaccess`, and a fallback meta tag in `index.html`.

Current CSP is transitional because the app still contains legacy inline `onclick`, `oninput`, inline styles, and one small inline boot script. Once those are migrated to delegated `addEventListener` handlers and static CSS classes, remove:

- `'unsafe-inline'` from `script-src`
- `script-src-attr 'unsafe-inline'`
- `'unsafe-inline'` from `style-src`

Recommended strict target:

```http
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; img-src 'self' https: data:; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src https://maps.google.com https://www.google.com; connect-src 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests
```

## Inline JavaScript Migration

Started migration to delegated event listeners for:

- Checkout delivery modal controls
- Shop filter chips
- Search result routing
- Majestic Buddy finder answer/back/reset buttons

Continue replacing inline attributes with `data-*` attributes and a delegated listener per surface.

## Input Sanitization

`security.js` provides shared helpers:

- `MGWSecurity.escapeHtml`
- `MGWSecurity.sanitizeSearchQuery`
- `MGWSecurity.sanitizeWhatsAppText`
- `MGWSecurity.sanitizeId`

Search input, shop filters, Buddy search, and checkout WhatsApp details now use bounded/sanitized values.

## Bot Protection And Rate Limiting

This static frontend cannot enforce true rate limiting by itself. Configure this at the CDN/WAF layer.

Cloudflare recommendations:

- Enable Bot Fight Mode or Super Bot Fight Mode.
- Add a rate limit for `/`, `/shop/`, `/category/*`, and `/products/*` such as challenge after unusually high request volume per IP.
- Add a stricter rule for repeated requests to product/category pages to reduce inventory scraping.
- Challenge suspicious ASNs/countries only if analytics show abuse.
- Cache static assets aggressively and keep HTML on a short revalidation policy.
- Monitor 403/challenge rates before making rules stricter.
