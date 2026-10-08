/* =========================================================
   IDEC WIKI — interaction + paper-cut artwork
   No build step, no external requests. Works from file://
   ---------------------------------------------------------
   Contents
     1.  SVG sprite (all paper-cut artwork lives here)
     2.  Torn-paper clip generator
     3.  Loading screen
     4.  Header / drawer navigation
     5.  Reveal, parallax, counters
     6.  Scroll-healing ocean scene
     7.  Photo flip (Team)
     8.  Small helpers (slots, toast, scroll-spy, progress)
   ========================================================= */

(function () {
  'use strict';

  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* =======================================================
     1. SVG sprite
     ======================================================= */
  var SPRITE = [
    '<svg id="idec-sprite" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">',

    /* fish: paper-cut, swims to the right */
    '<symbol id="fish-swim" viewBox="0 0 120 92">',
    '  <g>',
    '    <path d="M12 48C18 30 40 20 62 22 78 24 90 34 94 48 90 62 78 72 62 74 40 76 18 66 12 48Z" transform="translate(-4,-4)" style="fill:var(--paper,#f7f1e2)"/>',
    '    <path d="M94 48 118 28 109 48 118 68Z" transform="translate(-4,-4)" style="fill:var(--paper,#f7f1e2)"/>',
    '    <path d="M42 26 50 3 66 25Z" transform="translate(-4,-4)" style="fill:var(--paper,#f7f1e2)"/>',
    '    <path d="M94 48 118 27 109 48 118 69Z" style="fill:var(--c2,#e2664a)"/>',
    '    <path d="M12 48C18 30 40 20 62 22 78 24 90 34 94 48 90 62 78 72 62 74 40 76 18 66 12 48Z" style="fill:var(--c1,#efa94c)"/>',
    '    <path d="M42 26 50 3 66 25Z" style="fill:var(--c2,#e2664a)"/>',
    '    <path d="M44 71 52 90 66 72Z" style="fill:var(--c2,#e2664a)"/>',
    '    <path d="M46 24 55 25 50 72 42 71Z" opacity=".9" style="fill:var(--paper,#f7f1e2)"/>',
    '    <path d="M64 24 73 27 70 71 62 72Z" opacity=".75" style="fill:var(--paper,#f7f1e2)"/>',
    '    <path d="M78 26 86 32 84 68 76 70Z" opacity=".45" style="fill:var(--paper,#f7f1e2)"/>',
    '    <circle cx="31" cy="43" r="7.5" fill="#f7f1e2"/>',
    '    <circle cx="32" cy="44" r="3.4" fill="#12262f"/>',
    '    <path d="M40 30C36 40 36 56 40 66" stroke-width="3" fill="none" stroke-linecap="round" style="stroke:rgba(0,0,0,.14)"/>',
    '  </g>',
    '</symbol>',

    /* fish silhouette */
    '<symbol id="fish-sil" viewBox="0 0 124 72">',
    '  <path d="M8 36C16 20 36 12 58 14 76 16 90 25 96 36 90 47 76 56 58 58 36 60 16 52 8 36Z" fill="currentColor"/>',
    '  <path d="M96 36 122 20 113 36 122 52Z" fill="currentColor"/>',
    '  <circle cx="28" cy="32" r="2.6" style="fill:var(--paper,#f7f1e2)"/>',
    '</symbol>',

    /* jellyfish */
    '<symbol id="jelly" viewBox="0 0 100 130">',
    '  <path d="M10 56C10 26 28 8 50 8C72 8 90 26 90 56C74 50 62 60 50 50C38 60 26 50 10 56Z" transform="translate(-3,-3)" style="fill:var(--paper,#f7f1e2)"/>',
    '  <path d="M10 56C10 26 28 8 50 8C72 8 90 26 90 56C74 50 62 60 50 50C38 60 26 50 10 56Z" opacity=".92" style="fill:var(--c1,#e2664a)"/>',
    '  <path d="M22 56C14 76 12 96 18 118" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85" style="stroke:var(--c1,#e2664a)"/>',
    '  <path d="M38 58C34 80 36 100 32 122" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7" style="stroke:var(--c1,#e2664a)"/>',
    '  <path d="M62 58C68 80 66 100 70 122" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7" style="stroke:var(--c1,#e2664a)"/>',
    '  <path d="M78 56C86 78 86 98 80 118" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85" style="stroke:var(--c1,#e2664a)"/>',
    '  <circle cx="36" cy="34" r="4" fill="#f7f1e2" opacity=".7"/>',
    '  <circle cx="62" cy="30" r="3" fill="#f7f1e2" opacity=".55"/>',
    '</symbol>',

    /* kelp */
    '<symbol id="kelp" viewBox="0 0 90 180">',
    '  <path d="M44 178C30 140 58 118 40 84C26 56 52 34 42 4" stroke-width="11" fill="none" stroke-linecap="round" style="stroke:var(--c1,#3f9a5f)"/>',
    '  <path d="M42 152C22 146 10 128 12 106C34 110 44 128 42 152Z" style="fill:var(--c2,#8ed07a)"/>',
    '  <path d="M44 112C64 104 74 84 70 62C48 70 40 90 44 112Z" style="fill:var(--c2,#8ed07a)"/>',
    '  <path d="M44 74C24 66 16 46 20 24C42 32 48 52 44 74Z" style="fill:var(--c1,#3f9a5f)"/>',
    '</symbol>',

    /* fan coral */
    '<symbol id="coral-fan" viewBox="0 0 130 130">',
    '  <path d="M65 18C30 18 8 44 8 70C8 96 34 112 65 112C96 112 122 96 122 70C122 44 100 18 65 18Z" transform="translate(-3,-3)" style="fill:var(--paper,#f7f1e2)"/>',
    '  <path d="M65 18C30 18 8 44 8 70C8 96 34 112 65 112C96 112 122 96 122 70C122 44 100 18 65 18Z" style="fill:var(--c1,#e2664a)"/>',
    '  <g stroke-width="3" fill="none" opacity=".85" style="stroke:var(--paper,#f7f1e2)">',
    '    <path d="M65 112V26"/><path d="M65 112 30 44"/><path d="M65 112 100 44"/>',
    '    <path d="M65 112 16 74"/><path d="M65 112 114 74"/><path d="M65 112 46 28"/><path d="M65 112 84 28"/>',
    '  </g>',
    '  <path d="M65 112 65 130M56 122 52 130M74 122 78 130" stroke-width="6" stroke-linecap="round" style="stroke:var(--c2,#c14a33)"/>',
    '</symbol>',

    /* branching coral */
    '<symbol id="coral-branch" viewBox="0 0 130 130">',
    '  <g style="fill:var(--c1,#efa94c)">',
    '    <path d="M60 128 60 62 48 40 54 34 66 56 76 30 84 34 74 62 74 128Z"/>',
    '    <path d="M26 128 26 92 14 70 22 66 36 92 36 128Z"/>',
    '    <path d="M96 128 96 96 108 74 116 78 102 100 102 128Z"/>',
    '  </g>',
    '  <g opacity=".55" style="fill:var(--paper,#f7f1e2)">',
    '    <circle cx="51" cy="36" r="5"/><circle cx="80" cy="28" r="5"/><circle cx="18" cy="66" r="4"/><circle cx="112" cy="70" r="4"/>',
    '  </g>',
    '</symbol>',

    /* shell */
    '<symbol id="shell" viewBox="0 0 100 100">',
    '  <path d="M50 88C22 88 6 68 6 46C6 24 26 8 50 8C74 8 94 24 94 46C94 68 78 88 50 88Z" transform="translate(-3,-3)" style="fill:var(--paper,#f7f1e2)"/>',
    '  <path d="M50 88C22 88 6 68 6 46C6 24 26 8 50 8C74 8 94 24 94 46C94 68 78 88 50 88Z" style="fill:var(--c1,#f7d472)"/>',
    '  <g stroke-width="2.5" fill="none" style="stroke:rgba(0,0,0,.18)">',
    '    <path d="M50 88V10"/><path d="M50 88 24 14"/><path d="M50 88 76 14"/><path d="M50 88 10 40"/><path d="M50 88 90 40"/>',
    '  </g>',
    '</symbol>',

    /* paper cloud */
    '<symbol id="cloud-paper" viewBox="0 0 180 96">',
    '  <path d="M34 74C14 74 4 62 6 50C8 38 20 32 32 34C34 18 48 8 64 10C78 12 88 22 90 34C104 24 124 28 130 42C144 38 162 46 164 60C166 72 154 80 140 80L40 80Z" transform="translate(-3,-3)" opacity=".8" style="fill:var(--paper,#f7f1e2)"/>',
    '  <path d="M34 74C14 74 4 62 6 50C8 38 20 32 32 34C34 18 48 8 64 10C78 12 88 22 90 34C104 24 124 28 130 42C144 38 162 46 164 60C166 72 154 80 140 80L40 80Z" style="fill:var(--c1,#e6f4f2)"/>',
    '</symbol>',

    /* substrate / cofactor / product chips */
    '<symbol id="chip-h2s" viewBox="0 0 120 44">',
    '  <rect x="2" y="2" width="116" height="40" rx="10" style="fill:var(--c1,#c14a33)"/>',
    '  <text x="60" y="28" text-anchor="middle" font-family="Georgia, serif" font-size="19" font-weight="700" fill="#f7f1e2">H<tspan font-size="12" dy="5">2</tspan><tspan font-size="19" dy="-5">S</tspan></text>',
    '</symbol>',
    '<symbol id="chip-mesh" viewBox="0 0 120 44">',
    '  <rect x="2" y="2" width="116" height="40" rx="10" style="fill:var(--c1,#b8891b)"/>',
    '  <text x="60" y="28" text-anchor="middle" font-family="Georgia, serif" font-size="19" font-weight="700" fill="#f7f1e2">MeSH</text>',
    '</symbol>',
    '<symbol id="chip-sam" viewBox="0 0 120 44">',
    '  <rect x="2" y="2" width="116" height="40" rx="10" style="fill:var(--c1,#0d5f6b)"/>',
    '  <text x="60" y="28" text-anchor="middle" font-family="Georgia, serif" font-size="19" font-weight="700" fill="#f7f1e2">SAM</text>',
    '</symbol>',
    '<symbol id="chip-dmsp" viewBox="0 0 120 44">',
    '  <rect x="2" y="2" width="116" height="40" rx="10" style="fill:var(--c1,#3f9a5f)"/>',
    '  <text x="60" y="28" text-anchor="middle" font-family="Georgia, serif" font-size="19" font-weight="700" fill="#f7f1e2">DMSP</text>',
    '</symbol>',
    '<symbol id="chip-dms" viewBox="0 0 108 44">',
    '  <rect x="2" y="2" width="104" height="40" rx="10" style="fill:var(--c1,#efa94c)"/>',
    '  <text x="54" y="28" text-anchor="middle" font-family="Georgia, serif" font-size="19" font-weight="700" fill="#12262f">DMS</text>',
    '</symbol>',

    /* logo mark */
    '<symbol id="mark" viewBox="0 0 100 100">',
    '  <circle cx="50" cy="50" r="46" style="fill:var(--c1,#0d5f6b)"/>',
    '  <path d="M6 60C20 52 32 68 46 60C60 52 72 68 94 58L94 92C72 98 60 84 46 92C32 100 20 86 6 92Z" style="fill:var(--c2,#13a189)"/>',
    '  <path d="M26 46C30 36 42 30 54 31C64 32 72 38 75 46C72 54 64 60 54 61C42 62 30 56 26 46Z" fill="#f7f1e2"/>',
    '  <path d="M75 46 90 34 84 46 90 58Z" fill="#f7f1e2"/>',
    '  <circle cx="38" cy="43" r="2.6" fill="#12262f"/>',
    '</symbol>',

    /* gold corner ornament */
    '<symbol id="corner" viewBox="0 0 40 40">',
    '  <path d="M2 2H38M2 2V38" stroke="currentColor" stroke-width="2" fill="none"/>',
    '  <path d="M9 9C9 17 17 25 25 25" stroke="currentColor" stroke-width="1.4" fill="none" opacity=".8"/>',
    '  <circle cx="30" cy="30" r="2.4" fill="currentColor"/>',
    '  <path d="M9 20C13 20 16 23 16 27" stroke="currentColor" stroke-width="1.2" fill="none" opacity=".6"/>',
    '</symbol>',

    /* small icons */
    '<symbol id="ic-mail" viewBox="0 0 24 24"><path d="M3 6.5h18v11H3z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m3.6 7.2 8.4 6 8.4-6" fill="none" stroke="currentColor" stroke-width="1.7"/></symbol>',
    '<symbol id="ic-pin" viewBox="0 0 24 24"><path d="M12 21c4.6-5.1 7-8.5 7-11.6A7 7 0 0 0 5 9.4C5 12.5 7.4 15.9 12 21Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="9.5" r="2.6" fill="none" stroke="currentColor" stroke-width="1.7"/></symbol>',
    '<symbol id="ic-phone" viewBox="0 0 24 24"><path d="M6 3.5h3l1.6 4-2 1.4a12 12 0 0 0 6.5 6.5l1.4-2 4 1.6v3c0 1.1-.9 2-2 2A16.5 16.5 0 0 1 4 5.5c0-1.1.9-2 2-2Z" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>',
    '<symbol id="ic-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.6V12l3 2" fill="none" stroke="currentColor" stroke-width="1.7"/></symbol>',
    '<symbol id="ic-download" viewBox="0 0 24 24"><path d="M12 3.5v11m0 0 4.2-4.2M12 14.5 7.8 10.3M4.5 19.5h15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></symbol>',
    '<symbol id="ic-note" viewBox="0 0 24 24"><path d="M6 3.5h8.5L20 9v11.5H6z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M14 3.6V9h5.6M9 13h7M9 16.5h7" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>',
    '<symbol id="ic-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 10.6V17M12 7.6v.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></symbol>',
    '<symbol id="ic-up" viewBox="0 0 24 24"><path d="M12 19V6m0 0L6.5 11.5M12 6l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></symbol>',
    '<symbol id="ic-arrow" viewBox="0 0 24 24"><path d="M4.5 12h14m0 0-5.4-5.4M18.5 12l-5.4 5.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></symbol>',
    '<symbol id="ic-eye" viewBox="0 0 24 24"><path d="M2.5 12S6.4 6 12 6s9.5 6 9.5 6-3.9 6-9.5 6-9.5-6-9.5-6Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.7"/></symbol>',
    '<symbol id="ic-flip" viewBox="0 0 24 24"><path d="M4.5 9.5A7.5 7.5 0 0 1 19 11M19.5 14.5A7.5 7.5 0 0 1 5 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M19 6.6V11h-4.4M5 17.4V13h4.4" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>',

    /* house crests */
    '<symbol id="crest-leaf" viewBox="0 0 32 32"><path d="M26 6C14 6 8 13 8 21c0 2 .5 3.6.5 3.6S10 22 13 20c-1 3-1.6 4-1.6 4s9 1 13-7c1.6-3.4 1.6-11 1.6-11Z" fill="currentColor"/><path d="M9 26C11 18 17 12 25 8" stroke-width="1.6" fill="none" style="stroke:var(--paper,#f7f1e2)"/></symbol>',
    '<symbol id="crest-gear" viewBox="0 0 32 32"><path d="M16 3l2.2 3.4 4-.6 1 3.9 3.7 1.6-1.4 3.8 2 3.4-3.3 2.3.2 4-4 .7-1.9 3.5-3.5-2-3.6 1.7-1.7-3.6-4-.9.5-4-3.1-2.5 2.3-3.3-1.5-3.7 3.6-1.9-.3-4 4-.3Z" fill="currentColor"/><circle cx="16" cy="16" r="3.6" style="fill:var(--paper,#f7f1e2)"/></symbol>',
    '<symbol id="crest-pen" viewBox="0 0 32 32"><path d="M6 26l1.6-5L22 6.6 26 10.6 11.6 25 6 26Z" fill="currentColor"/><path d="M19.6 9l3.6 3.6" stroke-width="1.8" style="stroke:var(--paper,#f7f1e2)"/></symbol>',
    '<symbol id="crest-wave" viewBox="0 0 32 32"><path d="M4 19c4-5 8-5 12 0s8 5 12 0v5c-4 5-8 5-12 0s-8-5-12 0Z" fill="currentColor"/><circle cx="16" cy="9" r="5" fill="currentColor"/></symbol>',

    /* impact icons */
    '<symbol id="ic-climate" viewBox="0 0 64 64">',
    '  <circle cx="22" cy="21" r="11" fill="#f7d472"/>',
    '  <g stroke="#f7d472" stroke-width="3.4" stroke-linecap="round"><path d="M22 3v5M22 34v5M4 21h5M35 21h5M9 8l3.6 3.6M31.4 30.4 35 34M35 8l-3.6 3.6M12.6 30.4 9 34"/></g>',
    '  <path d="M30 40c-6 0-10-4-10-9s5-9 10-8c2-6 14-7 17 0 7 0 11 5 10 10-1 4-5 7-11 7Z" fill="#e6f4f2"/>',
    '  <path d="M24 48c1.5 3-1.5 4 0 7M34 48c1.5 3-1.5 4 0 7M44 48c1.5 3-1.5 4 0 7" stroke="#13a189" stroke-width="3" fill="none" stroke-linecap="round"/>',
    '</symbol>',
    '<symbol id="ic-eco" viewBox="0 0 64 64">',
    '  <path d="M2 42c8-8 16-8 24 0s16 8 24 0v8c-8 8-16 8-24 0S10 42 2 42Z" fill="#0d5f6b"/>',
    '  <path d="M14 36c2-8 12-12 20-8 5 2 8 7 8 12-6 4-12 3-16-1-3-3-8-4-12-3Z" fill="#efa94c"/>',
    '  <path d="M42 40 56 30 50 40 56 50Z" fill="#e2664a"/>',
    '  <circle cx="24" cy="32" r="2.4" fill="#12262f"/>',
    '  <path d="M10 54c4-4 6-6 8-11 3 5 4 7 8 9-4 1-6 1-8 4-2-2-4-2-8-2Z" fill="#e2664a"/>',
    '</symbol>',
    '<symbol id="ic-cycle" viewBox="0 0 64 64">',
    '  <path d="M32 6a26 26 0 0 1 22 12" fill="none" stroke="#13a189" stroke-width="5" stroke-linecap="round"/>',
    '  <path d="M32 58A26 26 0 0 1 10 46" fill="none" stroke="#efa94c" stroke-width="5" stroke-linecap="round"/>',
    '  <path d="M50 8l6 10H44Z" fill="#13a189"/>',
    '  <path d="M14 56 8 46h12Z" fill="#efa94c"/>',
    '  <text x="32" y="39" text-anchor="middle" font-family="Georgia, serif" font-size="20" font-weight="700" fill="#12262f">S</text>',
    '</symbol>'
  ].join('');

  function mountSprite() {
    if (document.getElementById('idec-sprite')) return;
    var holder = document.createElement('div');
    holder.innerHTML = SPRITE;
    document.body.insertBefore(holder.firstChild, document.body.firstChild);
  }

  /* =======================================================
     2. Torn-paper clip generator
     Every [data-torn] element receives a jagged polygon.
       data-torn        points per edge (default 12)
       data-torn-edges  "top" | "bottom" | "all" (default all)
       data-torn-x/y    jitter in % of width / height
       data-torn-var    CSS variable name (default --clip)
     ======================================================= */
  function hashStr(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildTornClip(el, index) {
    var edges = (el.getAttribute('data-torn-edges') || 'all');
    var n = parseInt(el.getAttribute('data-torn') || '12', 10);
    var jx = parseFloat(el.getAttribute('data-torn-x') || '1.1');
    var jy = parseFloat(el.getAttribute('data-torn-y') || '1.5');
    var seedAttr = el.getAttribute('data-torn-seed');
    var seed = hashStr(seedAttr || (el.className || 'torn') + '#' + index);
    var rnd = mulberry32(seed);

    var onTop = edges === 'all' || edges.indexOf('top') > -1;
    var onBottom = edges === 'all' || edges.indexOf('bottom') > -1;
    var onLeft = edges === 'all' || edges.indexOf('left') > -1;
    var onRight = edges === 'all' || edges.indexOf('right') > -1;

    var pts = [];
    var i, x, y;

    for (i = 0; i <= n; i++) {
      x = (i / n) * 100;
      y = onTop ? -Math.abs(rnd()) * jy : 0;
      pts.push([x, y]);
    }
    for (i = 1; i <= n; i++) {
      y = (i / n) * 100;
      x = onRight ? 100 + Math.abs(rnd()) * jx : 100;
      pts.push([x, y]);
    }
    for (i = n - 1; i >= 0; i--) {
      x = (i / n) * 100;
      y = onBottom ? 100 + Math.abs(rnd()) * jy : 100;
      pts.push([x, y]);
    }
    for (i = n - 1; i >= 1; i--) {
      y = (i / n) * 100;
      x = onLeft ? -Math.abs(rnd()) * jx : 0;
      pts.push([x, y]);
    }

    var polygon = 'polygon(' + pts.map(function (p) {
      return p[0].toFixed(2) + '% ' + p[1].toFixed(2) + '%';
    }).join(',') + ')';

    var varName = el.getAttribute('data-torn-var') || '--clip';
    el.style.setProperty(varName, polygon);
  }

  function applyTornStrips() {
    $$('[data-torn]').forEach(function (el, i) { buildTornClip(el, i); });
  }

  /* =======================================================
     3. Loading screen
     ======================================================= */
  /* Any element marked [data-img-slot] shows its dashed hint until a real
     image file is present at the given path. */
  function initImageSlots(scope) {
    $$('[data-img-slot]', scope || document).forEach(function (slot) {
      var img = slot.querySelector('img');
      if (!img) { slot.classList.add('is-empty'); return; }
      var mark = function (ok) {
        slot.classList.toggle('is-filled', ok);
        slot.classList.toggle('is-empty', !ok);
      };
      /* member-07-a.jpg 与 member-7-a.jpg 互相兼容：少写一个 0 也能显示出来 */
      var swapNumberPadding = function (src) {
        var alt = src.replace(/-0(\d)([.-])/, '-$1$2');
        if (alt === src) alt = src.replace(/-(\d)([.-])/, '-0$1$2');
        return alt;
      };
      img.addEventListener('load', function () { mark(img.naturalWidth > 0); });
      img.addEventListener('error', function () {
        var src = img.getAttribute('src') || '';
        if (!img.dataset.triedAlt) {
          var alt = swapNumberPadding(src);
          if (alt !== src) {
            img.dataset.triedAlt = '1';
            slot.setAttribute('data-slot', alt);
            img.setAttribute('src', alt);
            return; /* 等新地址的 load / error 再决定 */
          }
        }
        mark(false);
      });
      if (img.complete) mark(img.naturalWidth > 0); else mark(false);
    });
  }

  function initLoader() {
    var loader = $('#loader');
    if (!loader) return;
    document.body.classList.add('is-locked');

    /* rising bubbles */
    var bubbleBox = $('.loader__bubbles');
    if (bubbleBox && !RM) {
      for (var b = 0; b < 14; b++) {
        var i = document.createElement('i');
        var size = 5 + Math.random() * 14;
        i.style.left = (Math.random() * 100) + '%';
        i.style.width = size + 'px';
        i.style.height = size + 'px';
        i.style.animationDuration = (7 + Math.random() * 8).toFixed(1) + 's';
        i.style.animationDelay = (-Math.random() * 8).toFixed(1) + 's';
        i.style.setProperty('--drift', (Math.random() * 120 - 60).toFixed(0) + 'px');
        bubbleBox.appendChild(i);
      }
    }

    var bar = $('.loader__bar i');
    var pct = 8;
    var startedAt = Date.now();
    var finished = false;

    var setPct = function (v) {
      pct = v;
      if (bar) bar.style.setProperty('--p', v.toFixed(1) + '%');
    };
    setPct(pct);

    var timer = window.setInterval(function () {
      if (finished) return;
      setPct(Math.min(pct + (Math.random() * 9 + 3), 92));
    }, 170);

    function finish() {
      if (finished) return;
      finished = true;
      window.clearInterval(timer);
      setPct(100);
      window.setTimeout(function () {
        loader.classList.add('is-done');
        document.body.classList.add('is-ready');
        document.body.classList.remove('is-locked');
        window.setTimeout(function () {
          loader.setAttribute('aria-hidden', 'true');
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 800);
      }, 380);
    }

    function scheduleFinish() {
      var elapsed = Date.now() - startedAt;
      var wait = Math.max(0, (RM ? 400 : 1500) - elapsed);
      window.setTimeout(finish, wait);
    }

    if (document.readyState === 'complete') scheduleFinish();
    else window.addEventListener('load', scheduleFinish, { once: true });
    window.setTimeout(finish, 4200); /* safety net */
  }

  /* =======================================================
     4. Header + drawer
     ======================================================= */
  function initNav() {
    var header = $('.site-header');
    var burger = $('.burger');
    var drawer = $('#drawer');

    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-stuck', window.scrollY > 40);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    if (!burger || !drawer) return;

    var openDrawer = function () {
      drawer.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-locked');
      var first = drawer.querySelector('.drawer__link');
      if (first) first.focus({ preventScroll: true });
    };
    var closeDrawer = function () {
      drawer.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
    };

    burger.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) closeDrawer(); else openDrawer();
    });
    $$('.drawer__scrim, .drawer a', drawer).forEach(function (el) {
      el.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    var here = location.pathname.split('/').pop() || 'index.html';
    $$('.drawer__link', drawer).forEach(function (a) {
      var target = (a.getAttribute('href') || '').split('/').pop();
      if (target === here) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* =======================================================
     5. Reveal / parallax / counters / progress
     ======================================================= */
  function initReveal() {
    var items = $$('[data-reveal]');
    if (!items.length) return;

    if (RM || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    items.forEach(function (el, i) {
      if (!el.style.getPropertyValue('--d')) {
        el.style.setProperty('--d', ((i % 4) * 90) + 'ms');
      }
      io.observe(el);
    });
  }

  function initParallax() {
    var items = $$('[data-parallax]');
    if (!items.length || RM) return;
    var ticking = false;

    var update = function () {
      var vh = window.innerHeight;
      items.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.12;
        var rect = el.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var offset = (center - vh / 2) * -speed;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
      ticking = false;
    };

    var request = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
  }

  function initCounters() {
    var counters = $$('[data-count]');
    if (!counters.length) return;

    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var from = parseFloat(el.getAttribute('data-from') || '0');
      if (isNaN(target)) return;
      if (RM) { el.textContent = from.toFixed(decimals) + suffix; return; }
      var start = performance.now();
      var dur = 1400;
      var step = function (now) {
        var t = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (from + (target - from) * eased).toFixed(decimals) + suffix;
        if (t < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) { counters.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  }

  function initReadProgress() {
    var bar = $('.read-progress');
    if (!bar) return;
    var update = function () {
      var h = document.documentElement;
      var max = (h.scrollHeight - h.clientHeight) || 1;
      var p = Math.min(Math.max(window.scrollY / max, 0), 1) * 100;
      bar.style.setProperty('--p', p.toFixed(2) + '%');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  function initToTop() {
    var btn = $('.to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 700);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' });
    });
  }

  /* floating paper bubbles (hero + anything marked .bubble-field) */
  function initBubbles(selector, count, maxSize) {
    var box = $(selector);
    if (!box || RM) return;
    for (var i = 0; i < count; i++) {
      var b = document.createElement('i');
      var size = 5 + Math.random() * (maxSize - 5);
      b.style.left = (Math.random() * 100) + '%';
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.animationDuration = (9 + Math.random() * 10).toFixed(1) + 's';
      b.style.animationDelay = (-Math.random() * 12).toFixed(1) + 's';
      b.style.setProperty('--drift', (Math.random() * 140 - 70).toFixed(0) + 'px');
      box.appendChild(b);
    }
  }

  /* =======================================================
     6. Scroll-healing ocean scene
     ======================================================= */
  function hexToRgb(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mix(a, b, t) {
    var ca = hexToRgb(a), cb = hexToRgb(b);
    return 'rgb(' +
      Math.round(ca[0] + (cb[0] - ca[0]) * t) + ',' +
      Math.round(ca[1] + (cb[1] - ca[1]) * t) + ',' +
      Math.round(ca[2] + (cb[2] - ca[2]) * t) + ')';
  }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function seg(p, a, b) { return clamp01((p - a) / (b - a)); }

  function initScene() {
    var section = $('#heal-scene') || $('#heal') || $('.scene-section');
    if (!section) return;
    var svg = section.querySelector('.scene-svg svg');
    if (!svg) return;

    var el = function (id) { return svg.querySelector('#' + id); };
    var parts = {
      skyTop: el('sky-top'),
      skyBottom: el('sky-bottom'),
      skyFadeA: el('sky-fade-a'),
      skyFadeB: el('sky-fade-b'),
      sun: el('sun'),
      sunGlow: el('sunGlow'),
      haze: el('haze'),
      hillFar: el('hill-far'),
      hillMid: el('hill-mid'),
      volcano: el('volcano'),
      volcanoVeins: el('volcano-veins'),
      chimney: el('chimneys'),
      smoke: $$('#smoke circle', svg),
      seaFar: el('sea-far'),
      seaMid: el('sea-mid'),
      seaNear: el('sea-near'),
      foam: $$('#foam path', svg),
      life: el('life'),
      lifeGroups: $$('#life > g', svg),
      molWrap: el('molecules'),
      molecules: $$('#molecules > g', svg),
      cloud: el('scene-cloud'),
      birds: el('birds'),
      labelA: el('scene-label-a'),
      labelB: el('scene-label-b'),
      rail: $('.scene-rail', section)
    };

    var steps = $$('.scene-step', section);
    var lastP = -1;
    var ticking = false;

    /* centre point of a node, so scaling / rotating never flings it away */
    var centreOf = function (node) {
      try {
        var b = node.getBBox();
        return [b.x + b.width / 2, b.y + b.height / 2];
      } catch (e) {
        return [0, 0];
      }
    };
    var smokeC = parts.smoke.map(function (c) {
      return [parseFloat(c.getAttribute('cx') || '0'), parseFloat(c.getAttribute('cy') || '0')];
    });
    var lifeC = parts.lifeGroups.map(centreOf);
    var molC = parts.molecules.map(centreOf);

    var around = function (tx, ty, kind, c, angle, scale) {
      var pivot = 'translate(' + c[0].toFixed(1) + ',' + c[1].toFixed(1) + ')';
      var back = 'translate(' + (-c[0]).toFixed(1) + ',' + (-c[1]).toFixed(1) + ')';
      var mid = kind === 'rotate'
        ? 'rotate(' + angle.toFixed(2) + ')'
        : 'scale(' + scale.toFixed(3) + ')';
      return 'translate(' + tx.toFixed(1) + ',' + ty.toFixed(1) + ') ' + pivot + ' ' + mid + ' ' + back;
    };

    function render(p) {
      if (parts.skyTop) parts.skyTop.setAttribute('fill', mix('#3f3c34', '#0e6d80', Math.pow(p, .8)));
      var air = mix('#6d6a5e', '#a7e4dc', Math.pow(p, .9));
      if (parts.skyFadeA) parts.skyFadeA.setAttribute('stop-color', air);
      if (parts.skyFadeB) parts.skyFadeB.setAttribute('stop-color', air);
      if (parts.sun) {
        parts.sun.setAttribute('fill', mix('#c9c2ac', '#f7d472', seg(p, .05, .6)));
        parts.sun.setAttribute('r', (58 + 16 * seg(p, .1, 1)).toFixed(1));
      }
      if (parts.sunGlow) parts.sunGlow.setAttribute('opacity', (0.1 + 0.55 * seg(p, .1, .8)).toFixed(3));
      if (parts.haze) parts.haze.setAttribute('opacity', (0.72 * (1 - seg(p, 0, .55))).toFixed(3));

      if (parts.hillFar) parts.hillFar.setAttribute('fill', mix('#4a4740', '#4f9a86', seg(p, .1, .9)));
      if (parts.hillMid) parts.hillMid.setAttribute('fill', mix('#3a3832', '#2f7f63', seg(p, .1, .9)));
      if (parts.volcano) parts.volcano.setAttribute('fill', mix('#33322d', '#4a7a45', seg(p, .18, .95)));
      if (parts.volcanoVeins) parts.volcanoVeins.setAttribute('opacity', (0.5 * (1 - seg(p, .1, .55))).toFixed(3));
      if (parts.chimney) parts.chimney.setAttribute('fill', mix('#2b2a26', '#3d6b46', seg(p, .25, 1)));

      parts.smoke.forEach(function (c, i) {
        var local = seg(p, 0, 0.45 + i * 0.04);
        c.setAttribute('opacity', (0.85 * (1 - local)).toFixed(3));
        c.setAttribute('transform', around(
          local * (60 + i * 26),
          -local * (150 + i * 30),
          'scale', smokeC[i], 0, 1 + local * 0.7
        ));
      });

      if (parts.seaFar) parts.seaFar.setAttribute('fill', mix('#545147', '#0e8f83', seg(p, .08, .92)));
      if (parts.seaMid) parts.seaMid.setAttribute('fill', mix('#43413a', '#12a58e', seg(p, .08, .92)));
      if (parts.seaNear) parts.seaNear.setAttribute('fill', mix('#2e2d29', '#0a6f6a', seg(p, .08, .92)));

      parts.foam.forEach(function (f, i) {
        f.setAttribute('opacity', (seg(p, .3 + i * .07, .95) * 0.85).toFixed(3));
      });

      if (parts.life) {
        parts.life.setAttribute('opacity', seg(p, .3, .85).toFixed(3));
        parts.life.setAttribute('transform', 'translate(0,' + ((1 - seg(p, .3, .9)) * 46).toFixed(1) + ')');
      }
      parts.lifeGroups.forEach(function (g, i) {
        var local = seg(p, .3 + i * .035, .8 + i * .03);
        g.setAttribute('transform', around(0, (1 - local) * 40, 'scale', lifeC[i], 0, 0.72 + local * 0.28));
        g.setAttribute('opacity', local.toFixed(3));
      });

      parts.molecules.forEach(function (g, i) {
        var start = 0.42 + i * 0.05;
        var local = seg(p, start, start + 0.4);
        g.setAttribute('opacity', (local * 0.95).toFixed(3));
        /* 底物在近海面小幅上浮，产物 DMS 飞得更高，去参与大气化学 */
        g.setAttribute('transform', around(0, -local * (70 + i * 45), 'rotate', molC[i], (-8 + i * 5) * local, 1));
      });

      if (parts.cloud) {
        var c = seg(p, .66, .98);
        parts.cloud.setAttribute('opacity', (c * 0.95).toFixed(3));
        parts.cloud.setAttribute('transform', 'translate(0,' + ((1 - c) * 40).toFixed(1) + ') scale(' + (0.85 + c * 0.15).toFixed(3) + ')');
      }
      if (parts.birds) parts.birds.setAttribute('opacity', (seg(p, .72, 1) * .8).toFixed(3));
      if (parts.labelA) parts.labelA.setAttribute('opacity', (1 - seg(p, .06, .3)).toFixed(3));
      if (parts.labelB) parts.labelB.setAttribute('opacity', seg(p, .62, .84).toFixed(3));

      /* caption chapters are spread evenly over the scroll, however many there are */
      var active = Math.min(steps.length - 1, Math.floor(p * steps.length));
      steps.forEach(function (s, i) { s.classList.toggle('is-active', i === active); });

      if (parts.rail) parts.rail.style.setProperty('--p', (p * 100).toFixed(1) + '%');
      section.style.setProperty('--p', (p * 100).toFixed(1) + '%');
    }

    function update() {
      var rect = section.getBoundingClientRect();
      var total = section.offsetHeight - window.innerHeight;
      var p = clamp01(total > 0 ? -rect.top / total : 0);
      if (Math.abs(p - lastP) > 0.004) {
        lastP = p;
        render(p);
      }
      ticking = false;
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    render(0);
    if (parts.molWrap) parts.molWrap.setAttribute('opacity', '1');
    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
  }

  /* =======================================================
     7. Photo flip (Team)
     ======================================================= */
  function initPortraits() {
    /* 只有真正的按钮相框才翻面；致谢区的静态照片卡不受影响 */
    $$('button.portrait__frame').forEach(function (frame) {
      var flip = function () {
        var on = frame.classList.toggle('is-flipped');
        frame.setAttribute('aria-pressed', on ? 'true' : 'false');
      };
      /* <button> already fires click for Enter / Space, so one listener is enough */
      frame.addEventListener('click', flip);
    });
  }

  /* =======================================================
     8. Helpers
     ======================================================= */
  function toast(message) {
    var box = $('.toast');
    if (!box) {
      box = document.createElement('div');
      box.className = 'toast';
      document.body.appendChild(box);
    }
    box.textContent = message;
    box.classList.add('is-visible');
    window.clearTimeout(box._t);
    box._t = window.setTimeout(function () { box.classList.remove('is-visible'); }, 3600);
  }

  function initDownloads() {
    $$('[data-file]').forEach(function (el) {
      el.addEventListener('click', function () {
        var path = el.getAttribute('data-file');
        if (!path) return;
        toast('Downloading ' + path + ' — if your browser blocks local downloads, open the file directly from the assets/files/ folder.');
      });
    });
    $$('[data-copy]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var text = el.getAttribute('data-copy');
        if (!text) return;
        if (!navigator.clipboard) {
          toast('Contact details: ' + text);
          return;
        }
        e.preventDefault();
        navigator.clipboard.writeText(text).then(function () {
          toast('Copied: ' + text);
        }, function () {
          toast(text);
        });
      });
    });
  }

  function initScrollSpy() {
    var links = $$('.side-tabs a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

    targets.forEach(function (t) { io.observe(t); });
  }

  function initSmoothAnchors() {
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 92;
        window.scrollTo({ top: top, behavior: RM ? 'auto' : 'smooth' });
        try {
          if (history.replaceState) history.replaceState(null, '', id);
        } catch (err) {
          /* file:// documents may refuse history updates — the scroll still worked */
        }
      });
    });
  }

  function initYear() {
    $$('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* =======================================================
     boot
     ======================================================= */
  function boot() {
    mountSprite();
    applyTornStrips();
    initImageSlots(document);
    initLoader();
    initNav();
    initReveal();
    initParallax();
    initCounters();
    initReadProgress();
    initToTop();
    initBubbles('.hero__bubbles', 14, 26);
    initScene();
    initPortraits();
    initDownloads();
    initScrollSpy();
    initSmoothAnchors();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
