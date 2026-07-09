# Somara Labs — Shopify Theme

A Shopify (Liquid) theme being ported 1:1 from the original Next.js custom design
(`../sample-code/Auveria-Portfolio-main`). The goal is a visually identical storefront
that runs fully inside Shopify, so all backend management (products, orders, payments,
shipping, customers) is handled by Shopify.

The original Next.js project is kept untouched as the **design reference**. We copy its
look from there into Liquid.

---

## What's done

**Foundation**
- ✅ Design tokens (all CSS variables from `globals.css`) ported to `src/theme.css`
- ✅ Tailwind v4 build → compiles to `assets/theme.css`
- ✅ Dark theme by default + light/dark toggle (replaces the React ThemeProvider)
- ✅ Framer Motion re-created in plain JS/CSS: scroll-reveal, scroll-progress bar,
  hero video alternator, FAQ accordion, marquees
- ✅ Header (marquee + glassy pill navbar, dropdowns, mobile menu, scroll behaviour)
- ✅ Footer with newsletter signup
- ✅ Cart drawer (Shopify AJAX cart + Section Rendering API) + search drawer

**Pages (ported 1:1 from the Next.js app)**
- ✅ **Homepage** — exact port: split hero (alternating video), "As seen in",
  product showcase, red-light banner, benefits grid, two feature rows, big "3" stat,
  reviews, FAQ, trust badges. Fully editable in the theme editor.
- ✅ Red Light Panels landing → `templates/product.red-light.liquid`
- ✅ Dry Sauna landing → `templates/product.sauna.liquid`
- ✅ About, Contact (Shopify form), FAQ, Testimonials/Reviews, Privacy, Terms
- ✅ Blog + article, collection grid, standard product page, cart, search, 404
- ✅ Customer pages: login, register, account, addresses, order, reset/activate password

Marketing media (images + the smaller videos) is bundled in `assets/`.

### Changing homepage videos from the theme editor

Every homepage video can be replaced without touching code. In **Customize → Home**:
- **Hero video 1** and **Hero video 2** — the hero alternates between these two.
- **Red light banner → Banner video** — upload to add motion (otherwise a still shows).
- Each **Feature row → Video (upload)** — replaces that row's video.

Click the setting, upload your MP4 (Shopify hosts it on its CDN — no 20 MB asset limit),
and it takes priority over the bundled default. The two originally-oversized videos
(red_light/redlight.mp4 27 MB, sauna/hero_vid.mp4 54 MB) can now simply be uploaded here.

---

## Prerequisites (one-time setup)

1. **Install Node.js** (v18+) — https://nodejs.org
2. **Install the Shopify CLI** (this is what previews and uploads the theme):
   ```powershell
   npm install -g @shopify/cli@latest
   ```
   Verify:
   ```powershell
   shopify version
   ```

## Running the theme locally (live preview against your store)

From inside this folder (`d:\Somara\shopify-theme`):

```powershell
# 1. Install build dependencies (first time only)
npm install

# 2. Build the CSS once...
npm run css
#    ...or keep it rebuilding automatically while you work:
npm run css:watch

# 3. Start the live preview. Opens a browser, asks you to log in to your store
#    the first time, then hot-reloads as you edit Liquid files.
npm run dev
#    (this runs `shopify theme dev`)
```

`shopify theme dev` gives you a temporary preview URL backed by your real store data
(products, collections, cart, checkout). Nothing is published to customers until you push.

> Always run `npm run css` (or `css:watch`) before/while previewing — the compiled
> `assets/theme.css` is what the theme actually loads. The `src/theme.css` is only the source.

## Publishing

```powershell
npm run css:build      # minified production CSS
npm run push           # uploads the theme to your store (shopify theme push)
```

Then in **Shopify admin → Online Store → Themes**, publish it when ready.

---

## Store setup checklist (do this in Shopify admin)

The homepage looks complete out of the box (bundled media + default content). To make
the whole store functional and wire every link, set up the following.

1. **Products** — fastest path: import `..\products.csv` (in the project root) via
   **Products → Import**. It creates the 3 sample products with the right handles,
   prices, and variants:
   - `red-light-panels` (Quarter $799 / Half $1,199 / Full Body $1,599)
   - `dry-sauna` ($1,999)
   - `compression-boots` ($899)
   The CSV doesn't include images (they need public URLs) — after importing, open each
   product and upload its photos from `sample-code/.../public/` (red_light, sauna,
   compression boots folders). The first image shows on the card; the second is the
   hover image on the homepage.

   Then assign the custom landing templates (Product → Theme template dropdown):
   - `red-light-panels` → **product.red-light**
   - `dry-sauna` → **product.sauna**
   - Other products use the default **product** template.

   **Homepage products:** the showcase shows exactly 3 products you choose. It's
   pre-wired to `red-light-panels`, `dry-sauna`, `compression-boots`, so they appear
   automatically after import. To change them: Customize → Home → Product showcase →
   Product 1 / 2 / 3.
2. **Collections** — create collections with these handles (nav/footer links use them):
   - `red-light-panels`, `dry-sauna`, `compression-boots`, `sale`
   - `all` is automatic (Shopify's "All products").
3. **Pages** (Online Store → Pages) — create each and assign its template:
   | Page handle | Template to assign |
   | --- | --- |
   | `about` | page.about |
   | `contact` | page.contact |
   | `faq` | page.faq |
   | `reviews` | page.testimonials |
   | `privacy-policy` | page.privacy |
   | `terms-of-service` | page.terms |
   | `technology`, `shipping`, `benefits`, `benefits-*` | page (default) |
4. **Blog** — create a blog with handle `news` (Shopify's default).
5. **Customer accounts** — Settings → Customer accounts → use **Classic** accounts for
   the bundled login/register/account templates to render (new customer accounts are
   Shopify-hosted and bypass theme templates).
6. **Payments / Shipping / Taxes** — Settings → Payments, Shipping, Taxes.

### Navigation menu (Online Store → Navigation)

The navbar is now driven by a Shopify menu (editable in admin — no code). Create a menu
named **main-menu** with this structure to match the original site (it supports 3 levels):

- **Home** → `/`
- **SHOP SALE** → `/collections/sale`
- **Browse All** → `/collections/all`
- **Learn More** → `/` (parent label only)
  - **Benefits of Somara Labs** → `/pages/benefits`
    - Skin Health → `/pages/benefits-skin`
    - Pain Relief → `/pages/benefits-pain`
    - Mood → `/pages/benefits-mood`
    - Sleep → `/pages/benefits-sleep`
    - Muscle Recovery → `/pages/benefits-muscle`
    - Hair Growth → `/pages/benefits-hair`
    - Fat Loss → `/pages/benefits-fat`
    - Female Health → `/pages/benefits-female`
    - Male Health → `/pages/benefits-male`
  - **Reviews** → `/pages/reviews`
  - **Blog** → `/blogs/news`
- **Contact** → `/pages/contact`

Then Customize → Header → "Navigation menu" and confirm **main-menu** is selected.

The **footer** columns are also menu-driven. Create three menus to match the original:

- **footer-shop** (handle `footer-shop`): All Products → `/collections/all`, Red Light Panels → `/collections/red-light-panels`, At-Home Dry Sauna → `/collections/dry-sauna`, Compression Boots → `/collections/compression-boots`
- **footer-company** (handle `footer-company`): Our Story → `/pages/about`, Technology → `/pages/technology`, Reviews → `/pages/reviews`
- **footer-support** (handle `footer-support`): Contact Us → `/pages/contact`, Shipping & Returns → `/pages/shipping`, FAQ → `/pages/faq`

Each footer column's title and menu can be changed in Customize → Footer.

### Buy buttons on the landing pages

The Red Light Panels and Dry Sauna landing pages now include a purchase module (price +
variant picker + quantity + add-to-cart) that opens the cart drawer. The hero button
("Shop …") scrolls down to it. These work once the matching products exist and the
custom templates are assigned.

## Page → source map

| Storefront page | Theme file | Ported from |
| --- | --- | --- |
| Homepage | `sections/home.liquid` + `templates/index.json` | `marketing/home-sections.tsx` |
| Red Light Panels | `templates/product.red-light.liquid` | `products/red-light-panels/page.tsx` |
| Dry Sauna | `templates/product.sauna.liquid` | `products/dry-sauna/page.tsx` |
| About | `templates/page.about.liquid` | `about/page.tsx` |
| Contact | `templates/page.contact.liquid` | `contact/page.tsx` |
| FAQ | `templates/page.faq.liquid` | `faq/page.tsx` |
| Reviews | `templates/page.testimonials.liquid` | `testimonials/page.tsx` |
| Privacy / Terms | `templates/page.privacy.liquid` / `page.terms.liquid` | `privacy-policy` / `terms-of-service` |
| Blog / Article | `templates/blog.liquid` / `article.liquid` | `blog/page.tsx` |
| Login / Register / Account | `templates/customers/*` | `login` / `register` / `profile` |

## Folder map

| Folder | What it holds |
| --- | --- |
| `layout/theme.liquid` | The HTML shell wrapping every page |
| `sections/` | Header, footer, drawers, hero, product, collection sections |
| `snippets/` | Small reusable bits (icon, product-card, cart-items) |
| `templates/` | One file per page type (index, product, collection, cart, page, blog...) |
| `assets/` | Compiled `theme.css` + `global.js` |
| `config/` | Theme settings shown in the Shopify editor |
| `locales/` | Translatable strings |
| `src/theme.css` | Tailwind **source** (edit this, then run `npm run css`) |
