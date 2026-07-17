/* ------------------------------------------------------------------ */
/*  Somara Labs theme — vanilla JS replacing the old React contexts.   */
/*  Handles: theme toggle, mobile menu, header scroll, cart + search   */
/*  drawers (Shopify AJAX Cart + Section Rendering API).               */
/* ------------------------------------------------------------------ */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* -------------------- Theme (light / dark) -------------------- */
  function applyTheme(t) {
    document.documentElement.classList.toggle("dark", t === "dark");
    try { localStorage.setItem("somara-theme", t); } catch (e) {}
  }
  function currentTheme() {
    try { return localStorage.getItem("somara-theme") || "dark"; } catch (e) { return "dark"; }
  }
  document.addEventListener("click", (e) => {
    const set = e.target.closest("[data-set-theme]");
    if (set) { applyTheme(set.getAttribute("data-set-theme")); return; }
    const toggle = e.target.closest("[data-theme-toggle]");
    if (toggle) { applyTheme(currentTheme() === "dark" ? "light" : "dark"); }
  });

  /* -------------------- Header scroll behaviour ----------------- */
  const header = $("[data-site-header]");
  const pill = $("[data-nav-pill]");
  function onScroll() {
    if (!header) return;
    const scrolled = window.scrollY > 24;
    // Swap between the two translate classes so only one is ever applied
    // (both set the same Tailwind translate var) — this hides the marquee on scroll.
    header.classList.toggle("-translate-y-10", scrolled);
    header.classList.toggle("translate-y-0", !scrolled);
    if (pill) {
      pill.classList.toggle("border-[var(--color-border-soft)]", scrolled);
      pill.classList.toggle("bg-[var(--color-surface-soft)]", scrolled);
      pill.classList.toggle("shadow-[0_12px_42px_var(--color-card-shadow)]", scrolled);
      pill.classList.toggle("backdrop-blur-2xl", scrolled);
      pill.classList.toggle("border-transparent", !scrolled);
      pill.classList.toggle("bg-transparent", !scrolled);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -------------------- Mobile menu ----------------------------- */
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-mobile-toggle]")) {
      const menu = $("[data-mobile-menu]");
      if (menu) menu.classList.toggle("hidden");
    }
  });

  /* -------------------- Generic drawer open/close --------------- */
  function openDrawer(root, panel, scrim) {
    if (!root) return;
    root.classList.remove("pointer-events-none");
    root.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
      if (scrim) scrim.classList.replace("opacity-0", "opacity-100");
      if (panel) {
        panel.classList.remove("translate-x-full", "-translate-y-full");
      }
    });
    document.body.style.overflow = "hidden";
  }
  function closeDrawer(root, panel, scrim, hiddenClass) {
    if (!root) return;
    if (scrim) scrim.classList.replace("opacity-100", "opacity-0");
    if (panel) panel.classList.add(hiddenClass);
    root.setAttribute("aria-hidden", "true");
    setTimeout(() => root.classList.add("pointer-events-none"), 300);
    document.body.style.overflow = "";
  }

  /* -------------------- Cart drawer ----------------------------- */
  const cartRoot = $("[data-cart-root]");
  const cartPanel = $("[data-cart-panel]");
  const cartScrim = $("[data-cart-scrim]");

  function openCart() { openDrawer(cartRoot, cartPanel, cartScrim); }
  function closeCart() { closeDrawer(cartRoot, cartPanel, cartScrim, "translate-x-full"); }

  async function refreshCart() {
    try {
      const res = await fetch(`${window.location.pathname}?sections=cart-drawer`, { headers: { "X-Requested-With": "XMLHttpRequest" } });
      const data = await res.json();
      const html = data["cart-drawer"];
      if (!html) return;
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      const newBody = $("[data-cart-body]", tmp);
      const newFooter = $("[data-cart-footer]", tmp);
      if (newBody) $("[data-cart-body]").innerHTML = newBody.innerHTML;
      if (newFooter) {
        const footer = $("[data-cart-footer]");
        footer.innerHTML = newFooter.innerHTML;
        footer.className = newFooter.className;
      }
    } catch (e) { /* fall back to a hard navigation if needed */ }

    // Update the header bag counter from the cart JSON.
    try {
      const cart = await (await fetch("/cart.js")).json();
      const badge = $("[data-cart-count]");
      if (badge) {
        badge.textContent = cart.item_count;
        badge.classList.toggle("hidden", cart.item_count === 0);
      }
    } catch (e) {}
  }

  function showCartError(form, msg) {
    if (!form) { return; }
    let el = form.querySelector("[data-cart-error]");
    if (!el) {
      el = document.createElement("p");
      el.setAttribute("data-cart-error", "");
      el.className = "mt-3 text-sm text-[var(--color-brand-danger)]";
      form.appendChild(el);
    }
    el.textContent = msg;
  }

  async function cartAdd(id, quantity, form) {
    if (!id) { showCartError(form, "Please choose an option first."); return; }
    if (form) showCartError(form, "");
    try {
      const res = await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ id: id, quantity: quantity || 1 }),
      });
      if (!res.ok) {
        let msg = "Sorry, this item can't be added right now.";
        try { const data = await res.json(); if (data && data.description) msg = data.description; } catch (e) {}
        showCartError(form, msg);
        return;
      }
      await refreshCart();
      openCart();
    } catch (err) {
      showCartError(form, "Network error — please try again.");
    }
  }

  async function cartChange(line, quantity) {
    await fetch("/cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ line, quantity }),
    });
    await refreshCart();
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-cart]")) { e.preventDefault(); openCart(); return; }
    if (e.target.closest("[data-close-cart]") || e.target.closest("[data-cart-scrim]")) { closeCart(); return; }

    const plus = e.target.closest("[data-cart-plus]");
    const minus = e.target.closest("[data-cart-minus]");
    const remove = e.target.closest("[data-cart-remove]");
    if (plus || minus || remove) {
      const el = plus || minus || remove;
      const line = parseInt(el.getAttribute("data-line"), 10);
      const li = el.closest("[data-line-item]");
      const qtyEl = li ? $("span.min-w-4", li) : null;
      const current = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      let next = current;
      if (plus) next = current + 1;
      if (minus) next = current - 1;
      if (remove) next = 0;
      cartChange(line, next);
    }
  });

  // Intercept any product add-to-cart form so it uses the drawer instead of reloading.
  document.addEventListener("submit", (e) => {
    const form = e.target.closest("form[action*='/cart/add']");
    if (!form) return;
    e.preventDefault();
    const idField = form.querySelector("[name='id']");
    const qtyField = form.querySelector("[name='quantity']");
    if (!idField) return;

    // Brief "Adding…" feedback on the submit button.
    const btn = form.querySelector("[type='submit']");
    let original;
    if (btn) { original = btn.textContent; btn.textContent = "Adding…"; btn.disabled = true; }

    Promise.resolve(cartAdd(idField.value, qtyField ? parseInt(qtyField.value, 10) : 1, form))
      .finally(() => { if (btn) { btn.textContent = original; btn.disabled = false; } });
  });

  /* -------------------- Search drawer --------------------------- */
  const searchRoot = $("[data-search-root]");
  const searchPanel = $("[data-search-panel]");
  const searchScrim = $("[data-search-scrim]");
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-search]")) {
      e.preventDefault();
      openDrawer(searchRoot, searchPanel, searchScrim);
      setTimeout(() => { const i = $("[data-search-input]"); if (i) i.focus(); }, 320);
      return;
    }
    if (e.target.closest("[data-close-search]") || e.target.closest("[data-search-scrim]")) {
      closeDrawer(searchRoot, searchPanel, searchScrim, "-translate-y-full");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeDrawer(searchRoot, searchPanel, searchScrim, "-translate-y-full");
    }
  });

  /* -------------------- FAQ accordion --------------------------- */
  document.addEventListener("click", (e) => {
    const toggle = e.target.closest("[data-faq-toggle]");
    if (!toggle) return;
    const item = toggle.parentElement;
    const panel = $("[data-faq-panel]", item);
    const icon = $("[data-faq-icon]", toggle);
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    // Close siblings (single-open accordion, matching the original default).
    const root = toggle.closest("[data-faq]");
    if (root) {
      $$("[data-faq-toggle]", root).forEach((t) => {
        if (t === toggle) return;
        t.setAttribute("aria-expanded", "false");
        const p = $("[data-faq-panel]", t.parentElement);
        const ic = $("[data-faq-icon]", t);
        if (p) { p.classList.remove("grid-rows-[1fr]", "pt-4", "opacity-100"); p.classList.add("grid-rows-[0fr]", "opacity-0"); }
        if (ic) ic.classList.remove("rotate-45");
      });
    }
    toggle.setAttribute("aria-expanded", String(!isOpen));
    if (panel) {
      panel.classList.toggle("grid-rows-[1fr]", !isOpen);
      panel.classList.toggle("pt-4", !isOpen);
      panel.classList.toggle("opacity-100", !isOpen);
      panel.classList.toggle("grid-rows-[0fr]", isOpen);
      panel.classList.toggle("opacity-0", isOpen);
    }
    if (icon) icon.classList.toggle("rotate-45", !isOpen);
  });

  /* -------------------- Carousels (auto-slide + prev/next) ------ */
  function initCarousels() {
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    $$("[data-carousel]").forEach((car) => {
      const track = $("[data-carousel-track]", car);
      if (!track) return;

      const step = () => {
        const first = track.querySelector(":scope > *");
        const w = first ? first.getBoundingClientRect().width : 320;
        const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "24") || 24;
        return w + gap;
      };
      const prev = $("[data-carousel-prev]", car);
      const next = $("[data-carousel-next]", car);
      if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
      if (next) next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));

      // Gentle infinite auto-slide. Recycle the first slide to the end as it
      // scrolls out, so the loop never ends and never jumps.
      const auto = car.getAttribute("data-carousel-auto") !== "false";
      const designMode = window.Shopify && window.Shopify.designMode;
      if (!auto || reduced || designMode) return;
      if (track.children.length < 2) return;

      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "24") || 24;
      const speed = parseFloat(car.getAttribute("data-carousel-speed")) || 0.5; // px per frame ≈ 30px/s
      track.style.overflowAnchor = "none";
      let paused = false;
      // Accumulate the scroll position as a float — scrollLeft rounds to an
      // integer, so sub-pixel increments must be tracked separately.
      let pos = track.scrollLeft;
      const resume = () => { paused = false; pos = track.scrollLeft; };
      car.addEventListener("mouseenter", () => { paused = true; });
      car.addEventListener("mouseleave", resume);
      car.addEventListener("focusin", () => { paused = true; });
      car.addEventListener("focusout", resume);
      track.addEventListener("touchstart", () => { paused = true; }, { passive: true });
      track.addEventListener("touchend", () => { setTimeout(resume, 2500); }, { passive: true });

      function tick() {
        if (!paused && track.scrollWidth > track.clientWidth + 4) {
          pos += speed;
          const first = track.firstElementChild;
          if (first) {
            const firstW = first.getBoundingClientRect().width + gap;
            if (pos >= firstW) {
              track.appendChild(first);
              pos -= firstW;
            }
          }
          track.scrollLeft = pos;
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* -------------------- Custom cursor (dot + trailing ring) ----- */
  function initCursor() {
    const dot = $("[data-cursor-dot]");
    const ring = $("[data-cursor-ring]");
    if (!dot || !ring) return;
    // Skip on touch / coarse pointers — nothing to follow.
    if (window.matchMedia && window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let dx = mx, dy = my, rx = mx, ry = my;
    let ds = 1, rs = 1;
    let hovering = false, visible = false;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      visible = true;
    }, { passive: true });

    window.addEventListener("mouseover", (e) => {
      const t = e.target;
      hovering = !!(t && t.closest && (t.closest("a") || t.closest("button") || t.closest("[role='button']") || t.closest("label[for]")));
    }, { passive: true });

    document.addEventListener("mouseleave", () => { visible = false; });

    const lerp = (a, b, n) => a + (b - a) * n;
    function frame() {
      // Dot tracks tightly; ring trails more slowly (mirrors the spring feel).
      dx = lerp(dx, mx, 0.35); dy = lerp(dy, my, 0.35);
      rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18);
      ds = lerp(ds, hovering ? 2.5 : 1, 0.2);
      rs = lerp(rs, hovering ? 1.5 : 1, 0.2);
      dot.style.transform = "translate(" + dx + "px," + dy + "px) translate(-50%,-50%) scale(" + ds + ")";
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%) scale(" + rs + ")";
      dot.style.opacity = visible ? "1" : "0";
      ring.style.opacity = visible ? "0.3" : "0";
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* -------------------- Scroll reveal (IntersectionObserver) ---- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "-80px", threshold: 0.05 });
    els.forEach((el) => io.observe(el));
  }

  /* -------------------- Hero video alternator ------------------ */
  function initHeroVideo() {
    const v = $("[data-hero-video]");
    if (!v) return;
    const a = v.getAttribute("data-video-1");
    const b = v.getAttribute("data-video-2");
    v.addEventListener("ended", () => {
      const current = v.getAttribute("src");
      v.setAttribute("src", current === a ? b : a);
      v.load();
      v.play().catch(() => {});
    });
  }

  /* -------------------- Scroll progress bar -------------------- */
  function initScrollProgress() {
    const bar = $(".scroll-progress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, scrolled))})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  if (document.readyState !== "loading") { initReveal(); initScrollProgress(); initHeroVideo(); initCursor(); initCarousels(); }
  else document.addEventListener("DOMContentLoaded", () => { initReveal(); initScrollProgress(); initHeroVideo(); initCursor(); initCarousels(); });
})();
