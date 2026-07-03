(function () {
  "use strict";

  // ---- Current year in footer ----
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile nav toggle (drawer + scrim) ----
  var toggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("nav-list");
  var scrim = document.querySelector(".nav-scrim");
  var navClose = document.querySelector(".nav-close");
  var headerEl = document.querySelector(".site-header");
  var mobileNav = document.querySelector(".mobile-nav");
  var mq = window.matchMedia("(max-width: 760px)");
  if (toggle && navList) {
    // Elements outside the drawer that we mark inert/aria-hidden while open.
    var backdropEls = [headerEl, document.querySelector("main"),
      document.querySelector(".site-footer")].filter(Boolean);

    var focusables = function () {
      return Array.prototype.slice.call(
        navList.querySelectorAll('a[href], button:not([disabled])')
      ).filter(function (el) { return el.offsetParent !== null || el === navClose; });
    };

    var onKeydown = function (e) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.focus();
        return;
      }
      if (e.key !== "Tab") return;
      var items = focusables();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!navList.contains(document.activeElement)) {
        // Focus escaped the drawer entirely — pull it back in.
        e.preventDefault();
        first.focus();
      }
    };

    // Keep off-canvas drawer links out of the tab order whenever the drawer
    // isn't presented as an open overlay (closed, or at desktop widths).
    var syncInert = function () {
      var overlay = mq.matches && navList.classList.contains("open");
      if (mobileNav) {
        if (overlay) mobileNav.removeAttribute("inert");
        else mobileNav.setAttribute("inert", "");
      }
    };

    var setOpen = function (open) {
      navList.classList.toggle("open", open);
      if (scrim) {
        scrim.classList.toggle("open", open);
        scrim.hidden = !open;
      }
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.documentElement.style.overflow = open ? "hidden" : "";
      document.body.style.overflow = open ? "hidden" : "";
      // When the drawer is open, force the header (and thus the toggle) visible.
      if (open && headerEl) headerEl.classList.remove("hide");
      // Mark the rest of the page inert while the drawer is open.
      backdropEls.forEach(function (el) {
        if (open) { el.setAttribute("inert", ""); el.setAttribute("aria-hidden", "true"); }
        else { el.removeAttribute("inert"); el.removeAttribute("aria-hidden"); }
      });
      syncInert();
      if (open) {
        document.addEventListener("keydown", onKeydown, true);
        var items = focusables();
        if (items.length) items[0].focus();
      } else {
        document.removeEventListener("keydown", onKeydown, true);
      }
    };

    // Initial state: drawer closed, so keep it out of the tab order.
    syncInert();

    toggle.addEventListener("click", function () {
      setOpen(!navList.classList.contains("open"));
    });
    // Close after clicking a link
    navList.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { setOpen(false); toggle.focus(); }
    });
    // Close via the always-visible X inside the drawer panel
    if (navClose) navClose.addEventListener("click", function () {
      setOpen(false);
      toggle.focus();
    });
    // Close on scrim tap
    if (scrim) scrim.addEventListener("click", function () { setOpen(false); toggle.focus(); });

    // Reset drawer + toggle state when crossing the desktop breakpoint.
    var onMqChange = function () {
      if (!mq.matches && navList.classList.contains("open")) {
        setOpen(false);
      } else {
        syncInert();
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", onMqChange);
    else if (mq.addListener) mq.addListener(onMqChange);
  }

  // ---- Sticky header: shrink + hide-on-scroll-down / reveal-on-scroll-up ----
  var header = document.querySelector(".site-header");
  if (header) {
    var lastY = window.scrollY;
    var onScroll = function () {
      var y = window.scrollY;
      if (y > 40) header.classList.add("shrink");
      else header.classList.remove("shrink");

      // Reveal on ANY upward scroll; hide only when scrolling down past the header.
      // Never hide while the mobile drawer is open (the toggle must stay reachable).
      var navOpen = navList && navList.classList.contains("open");
      if (!navOpen && y > lastY && y > 120) {
        header.classList.add("hide");
      } else if (y < lastY) {
        header.classList.remove("hide");
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- Scroll reveal via IntersectionObserver ----
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // ---- Catering form: concept only, no backend ----
  var form = document.querySelector(".catering-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) {
        note.innerHTML =
          "Thanks! This is a concept form and doesn't send yet — " +
          'please call <a href="tel:+13375738549">(337) 573-8549</a> to lock in your big order.';
        note.style.color = "var(--red-dark)";
        note.style.fontWeight = "800";
      }
    });
  }
})();
