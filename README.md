# Pinch-N-Peel Crawfish — Website Redesign Concept

An unsolicited, static **redesign concept** for **Pinch-N-Peel Crawfish**, a boiled-seafood
drive-thru in Denham Springs, LA (Best of 225 nominee, two years running). It is **not** the
business's official website.

## Why this concept

Pinch-N-Peel currently has **no website** — customers find them only via Facebook and delivery
apps (DoorDash / Uber Eats). That means:

- No single place to see the **full menu** and current pricing.
- No clear explanation of the **drive-thru / order-ahead** flow.
- No home for their **Best of 225** recognition and glowing local reviews.
- Discovery depends entirely on third-party apps and social feeds.

This concept fixes that with a fast, mobile-first, single-page site built around their real
menu, real story, and one clear call to action: **order ahead by phone**.

## What's here

- `index.html` — the full page (hero, market board, full menu, how-it-works, gallery, reviews, hours/location, big-order form).
- `styles.css` — bold Louisiana crawfish-boil art direction (crawfish red + Cajun gold + kraft warmth).
- `script.js` — mobile nav, sticky/shrinking header, scroll-reveal, concept form handling. No dependencies.
- `assets/crawfish.svg` — hand-built crawfish illustration used throughout.

## How to view

Double-click `index.html`, or open it in any browser. No build step, no npm, no external
frameworks. Works fully offline (one Google Fonts `<link>` is the only network reference; it
degrades gracefully to system fonts).

## Real data & honesty notes

- **Menu, prices, address, phone, hours, reviews, and story quotes** are sourced from public
  listings (Postmates/Uber Eats, DoorDash, mymenuweb, Restaurant Guru, 225 Live Events, Google).
- Crawfish is seasonal and **market-priced**; the site says so plainly and pushes "call to confirm."
- Items that couldn't be fully verified online are flagged in the HTML with `<!-- TODO -->`,
  `<!-- MENU-INCOMPLETE -->`, or `<!-- IMG-NEEDED -->`.
- **Photos:** their real food/drive-thru photos live on Facebook/DoorDash behind hotlink-blocking.
  Rather than ship fake or hotlinked images, the hero and gallery use designed CSS/SVG stand-ins,
  clearly marked `IMG-NEEDED` where real photos should be dropped in.
- The big-order form is a **styled concept** — it does not submit anywhere; it directs to the phone.

## Contact (as published)

- **Phone:** (337) 573-8549
- **Address:** 8475 Magnolia Blvd, Denham Springs, LA 70726 *(one listing shows 7755 Magnolia Beach Rd — confirm)*
- **Hours:** Open daily, 4:30–8:30 PM *(some listings vary — confirm)*
