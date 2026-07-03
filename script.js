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
  if (toggle && navList) {
    var setOpen = function (open) {
      navList.classList.toggle("open", open);
      if (scrim) {
        scrim.classList.toggle("open", open);
        scrim.hidden = !open;
      }
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
      // When the drawer is open, force the header (and thus the toggle) visible.
      // The scroll handler is also guarded to not re-hide it while open.
      if (open && headerEl) headerEl.classList.remove("hide");
    };
    toggle.addEventListener("click", function () {
      setOpen(!navList.classList.contains("open"));
    });
    // Close after clicking a link
    navList.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });
    // Close via the always-visible X inside the drawer panel
    if (navClose) navClose.addEventListener("click", function () {
      setOpen(false);
      toggle.focus();
    });
    // Close on scrim tap
    if (scrim) scrim.addEventListener("click", function () { setOpen(false); });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navList.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });
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
