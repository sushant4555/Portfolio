/* ==========================================================================
   APP: renders the sections from window.PORTFOLIO and runs the interactions.
   Load order: js/config.js first, then this file.
   ========================================================================== */
(function () {
  'use strict';

  var P = window.PORTFOLIO;
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function clamp(n, a, b) { return Math.min(b, Math.max(a, n)); }

  /* ---------- Icons ---------- */
  var FILLED = { github: 1, linkedin: 1 };
  var ICONS = {
    chip: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    iot: '<circle cx="12" cy="12" r="1.8"/><path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6M5.3 5.3a9.5 9.5 0 0 0 0 13.4M18.7 5.3a9.5 9.5 0 0 1 0 13.4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    term: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m7 10 3 2-3 2M13 15h4"/>',
    brain: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="8" cy="18" r="2"/><circle cx="17" cy="17" r="2"/><path d="m7.8 6.4 8.4 1.2M6.6 8l1 8M10 17.7l5-.6M17.6 10l-.4 5"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    ur: '<path d="M7 17 17 7M8 7h9v9"/>',
    r: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    github: '<path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r=".7" fill="currentColor"/>',
    linkedin: '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>'
  };
  function icon(name, cls) {
    var f = FILLED[name];
    return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" ' + (f ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"') + ' aria-hidden="true" focusable="false">' + (ICONS[name] || '') + '</svg>';
  }

  /* ---------- Link helpers ---------- */
  // Real URL -> opens in a new tab. Empty URL -> friendly placeholder toast instead of a dead link.
  function ext(url, label) {
    return url ? 'href="' + esc(url) + '" target="_blank" rel="noopener noreferrer"' : 'href="#" data-placeholder="' + esc(label) + '"';
  }
  function mailHref() { return P.contact.email ? 'href="mailto:' + esc(P.contact.email) + '"' : 'href="#" data-placeholder="Email address"'; }

  /* ---------- Placeholder artwork ---------- */
  var FONT = "font-family=\"Space Grotesk,Inter,Arial,sans-serif\"";
  var ART = {
    match: '<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Abstract illustration of candidates matched to opportunities" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="m-bg" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#141822"/><stop offset="1" stop-color="#0A0A0A"/></radialGradient>' +
      '<linearGradient id="m-ln" x1="0" x2="1"><stop offset="0" stop-color="#007BA7" stop-opacity=".25"/><stop offset=".5" stop-color="#FF2D95"/><stop offset="1" stop-color="#007BA7" stop-opacity=".25"/></linearGradient></defs>' +
      '<rect width="800" height="600" fill="url(#m-bg)"/>' +
      '<g fill="none" stroke="#007BA7" stroke-opacity=".18" stroke-width="1.2">' +
      '<path d="M180 120C400 120 400 220 620 220"/><path d="M180 220C400 220 400 120 620 120"/><path d="M180 220C400 220 400 320 620 320"/><path d="M180 320C400 320 400 420 620 420"/><path d="M180 420C400 420 400 320 620 320"/><path d="M180 420C400 420 400 520 620 520"/><path d="M180 520C400 520 400 420 620 420"/><path d="M180 120C400 120 400 120 620 120"/></g>' +
      '<path d="M180 320H620" stroke="url(#m-ln)" stroke-width="2.6" fill="none"/>' +
      '<g fill="#0A0A0A" stroke="#007BA7" stroke-opacity=".5" stroke-width="1.3"><circle cx="180" cy="120" r="15"/><circle cx="180" cy="220" r="15"/><circle cx="180" cy="420" r="15"/><circle cx="180" cy="520" r="15"/><circle cx="620" cy="120" r="15"/><circle cx="620" cy="220" r="15"/><circle cx="620" cy="420" r="15"/><circle cx="620" cy="520" r="15"/></g>' +
      '<g fill="#007BA7" fill-opacity=".7"><circle cx="180" cy="120" r="4"/><circle cx="180" cy="220" r="4"/><circle cx="180" cy="420" r="4"/><circle cx="180" cy="520" r="4"/><circle cx="620" cy="120" r="4"/><circle cx="620" cy="220" r="4"/><circle cx="620" cy="420" r="4"/><circle cx="620" cy="520" r="4"/></g>' +
      '<g><circle cx="180" cy="320" r="30" fill="none" stroke="#FF2D95" stroke-opacity=".35"/><circle cx="620" cy="320" r="30" fill="none" stroke="#FF2D95" stroke-opacity=".35"/><circle cx="180" cy="320" r="15" fill="#0A0A0A" stroke="#FF2D95" stroke-width="1.6"/><circle cx="620" cy="320" r="15" fill="#0A0A0A" stroke="#FF2D95" stroke-width="1.6"/><circle cx="180" cy="320" r="5" fill="#FF2D95"/><circle cx="620" cy="320" r="5" fill="#FF2D95"/></g>' +
      '<rect x="340" y="296" width="120" height="48" rx="24" fill="#0A0A0A" stroke="#007BA7" stroke-opacity=".85"/><text x="400" y="326" text-anchor="middle" ' + FONT + ' font-size="15" font-weight="600" letter-spacing="3" fill="#007BA7">MATCH</text></svg>',

    gas: '<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Abstract illustration of a gas sensor reading crossing an alert threshold" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="g-bg" cx="50%" cy="40%" r="80%"><stop offset="0" stop-color="#141822"/><stop offset="1" stop-color="#0A0A0A"/></radialGradient>' +
      '<linearGradient id="g-ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#007BA7" stop-opacity=".35"/><stop offset="1" stop-color="#007BA7" stop-opacity="0"/></linearGradient></defs>' +
      '<rect width="800" height="600" fill="url(#g-bg)"/>' +
      '<g stroke="#007BA7" stroke-opacity=".1"><path d="M0 100H800M0 200H800M0 300H800M0 400H800M0 500H800"/><path d="M100 0V600M200 0V600M300 0V600M400 0V600M500 0V600M600 0V600M700 0V600"/></g>' +
      '<path d="M0 440L100 430 200 436 300 420 400 424 470 400 540 330 610 200 680 120 800 90V600H0Z" fill="url(#g-ar)"/>' +
      '<path d="M0 440L100 430 200 436 300 420 400 424 470 400 540 330 610 200 680 120 800 90" fill="none" stroke="#007BA7" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<path d="M0 250H800" stroke="#FF2D95" stroke-opacity=".65" stroke-dasharray="6 9"/><text x="28" y="238" ' + FONT + ' font-size="13" letter-spacing="2" fill="#FF2D95" fill-opacity=".85">THRESHOLD</text>' +
      '<circle class="pulse" cx="583" cy="250" r="12"/><circle class="pulse d2" cx="583" cy="250" r="12"/><circle cx="583" cy="250" r="7" fill="#FF2D95"/>' +
      '<rect x="404" y="176" width="124" height="42" rx="21" fill="#0A0A0A" stroke="#FF2D95" stroke-opacity=".85"/><text x="466" y="203" text-anchor="middle" ' + FONT + ' font-size="15" font-weight="600" letter-spacing="3" fill="#FF2D95">ALERT</text></svg>'
  };

  var PLACEHOLDER_PORTRAIT =
    '<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Profile photo placeholder" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><radialGradient id="pp-bg" cx="50%" cy="36%" r="70%"><stop offset="0" stop-color="#141822"/><stop offset="1" stop-color="#0A0A0A"/></radialGradient>' +
    '<linearGradient id="pp-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2432"/><stop offset="1" stop-color="#0A0A0A"/></linearGradient>' +
    '<linearGradient id="pp-rim" x1="0" x2="1"><stop offset="0" stop-color="#007BA7" stop-opacity="0"/><stop offset=".5" stop-color="#FF2D95" stop-opacity=".9"/><stop offset="1" stop-color="#007BA7" stop-opacity="0"/></linearGradient></defs>' +
    '<rect width="400" height="500" fill="url(#pp-bg)"/>' +
    '<g fill="none" stroke="#007BA7" stroke-opacity=".15"><path d="M20 90H120L150 120H230"/><path d="M380 150H300L270 180"/><path d="M30 330H90L120 300"/><path d="M370 360H320L290 390"/></g>' +
    '<path d="M50 500C50 380 130 322 200 312 270 322 350 380 350 500Z" fill="url(#pp-body)"/>' +
    '<rect x="171" y="246" width="58" height="76" rx="26" fill="#0e141d"/>' +
    '<ellipse cx="200" cy="184" rx="62" ry="78" fill="url(#pp-body)"/>' +
    '<path d="M140 168C142 108 258 108 260 168" fill="none" stroke="url(#pp-rim)" stroke-width="2"/>' +
    '<text x="200" y="372" text-anchor="middle" ' + FONT + ' font-size="12" letter-spacing="3" fill="#007BA7">REPLACE WITH YOUR PHOTO</text>' +
    '<text x="200" y="392" text-anchor="middle" ' + FONT + ' font-size="10" letter-spacing="1.5" fill="#FF2D95" fill-opacity=".85">Set photo.src in PORTFOLIO</text></svg>';

  /* ==========================================================================
     COMPONENTS: each returns markup / fills its section from PORTFOLIO
     ========================================================================== */
  var Navbar = {
    render: function () {
      $('#brandLink').innerHTML = esc(P.site.brand) + '<span>.</span>';
      $('#navLinks').innerHTML = P.nav.map(function (n) {
        return '<li><a href="#' + esc(n.id) + '" data-nav="' + esc(n.id) + '">' + esc(n.label) + '</a></li>';
      }).join('') + '<li class="nav-ind" id="navInd" aria-hidden="true"></li>';
      var cvAction = P.contact.cv
        ? '<a class="btn btn-sm" href="' + esc(P.contact.cv) + '" data-cert-modal data-cert-title="' + esc(P.site.name + ' — Curriculum Vitae (CV)') + '" data-cert-sub="Electronics &amp; Telecommunication Engineering • Resume" data-magnetic>View CV ' + icon('ur', 'ic-ur') + '</a>'
        : '<a class="btn btn-sm" href="#" data-placeholder="CV link" data-magnetic>View CV ' + icon('ur', 'ic-ur') + '</a>';
      $('#cvSlot').outerHTML = cvAction;
      $('#menu').innerHTML = P.nav.map(function (n, i) {
        return '<a class="m-link" style="--i:' + i + '" href="#' + esc(n.id) + '" data-nav="' + esc(n.id) + '">' + esc(n.label) + '</a>';
      }).join('') + (P.contact.cv ? '<div style="margin-top:24px"><a class="btn btn-sm" href="' + esc(P.contact.cv) + '" data-cert-modal data-cert-title="' + esc(P.site.name + ' — Curriculum Vitae (CV)') + '" data-cert-sub="Electronics &amp; Telecommunication Engineering • Resume">View CV ' + icon('ur', 'ic-ur') + '</a></div>' : '');
    }
  };

  var Hero = {
    render: function () {
      var h = P.hero;
      $('#heroHello').textContent = h.greeting;
      $('#heroTitle').innerHTML = h.lines.map(function (l, i) {
        return '<span class="ln"><span class="' + (i === h.lines.length - 1 ? 'grad' : '') + '" style="--d:' + (0.12 + i * 0.12) + 's">' + esc(l) + '</span></span>';
      }).join('');
      $('#heroIntro').textContent = h.intro;
      $('#heroStatus').textContent = h.status;
      $('#heroChip').innerHTML = '<b>' + esc(h.chip.title) + '</b><small>' + esc(h.chip.text) + '</small>';
      $('#marquee').innerHTML = [0, 1].map(function () {
        return P.marquee.concat(P.marquee).map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('');
      }).join('');
      var frame = $('#portraitFrame');
      function placeholder() { frame.innerHTML = PLACEHOLDER_PORTRAIT; }
      if (P.photo.src) {
        frame.innerHTML = '<img src="' + esc(P.photo.src) + '" alt="' + esc(P.photo.alt) + '" width="800" height="1000" decoding="async" fetchpriority="high">';
        $('img', frame).addEventListener('error', placeholder);
      } else { placeholder(); }
      // Oscilloscope wave behind the hero (periodic over 1200 units so the loop is seamless)
      var d = 'M0 60', amp = 26, x, TAU = Math.PI * 2;
      for (x = 0; x <= 2400; x += 4) {
        var env = 0.55 + 0.45 * Math.sin(TAU * x / 1200);
        d += ' L' + x + ' ' + (60 + Math.sin(TAU * x * 24 / 1200) * amp * env + Math.sin(TAU * x * 50 / 1200) * 4 * env).toFixed(1);
      }
      $('#wavePath').setAttribute('d', d);
    }
  };

  var About = {
    render: function () {
      var a = P.about;
      var st = $('#statement');
      st.innerHTML = a.statement.split(' ').map(function (w) { return '<span>' + esc(w) + '</span>'; }).join(' ');
      $('#aboutGrid').innerHTML = a.cards.map(function (c) {
        return '<article class="a-card glass spot lift"><div class="ic-box">' + icon(c.icon) + '</div><div><h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + '</p></div></article>';
      }).join('');
      $('#stats').innerHTML = a.stats.map(function (s) {
        return '<div class="stat"><b>' + esc(s.value) + '</b><span>' + esc(s.label) + '</span></div>';
      }).join('');
    }
  };

  var Expertise = {
    render: function () {
      $('#expertiseLede').textContent = P.expertise.lede;
      $('#expertiseGrid').innerHTML = P.expertise.items.map(function (c) {
        return '<article class="x-card glass spot lift"><div class="ic-box">' + icon(c.icon) + '</div><div><h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + '</p></div></article>';
      }).join('');
    }
  };

  var Skills = {
    render: function () {
      $('#skillsLede').textContent = P.skills.lede;
      $('#skillsGrid').innerHTML = P.skills.groups.map(function (g) {
        return '<section class="s-group glass spot" aria-label="' + esc(g.title) + '"><h3>' + esc(g.title) + '<small>' + g.items.length + ' items</small></h3><ul class="pills">' +
          g.items.map(function (i) { return '<li class="pill">' + esc(i) + '</li>'; }).join('') + '</ul></section>';
      }).join('');
    }
  };

  var Experience = {
    render: function () {
      var exp = P.experience;
      if (!exp || !exp.items || !exp.items.length) return;
      var lede = $('#expLede');
      if (lede) lede.textContent = exp.lede;
      var list = $('#expList');
      if (!list) return;
      list.innerHTML = exp.items.map(function (item) {
        var highlights = (item.highlights || []).map(function (h) {
          return '<li class="exp-highlight-item"><span>' + esc(h) + '</span></li>';
        }).join('');
        var tags = (item.tags || []).map(function (t) {
          return '<li class="tag">' + esc(t) + '</li>';
        }).join('');
        var certBtn = item.url
          ? '<a class="btn btn-sm btn-ghost" href="' + esc(item.url) + '" data-cert-modal data-cert-title="' + esc(item.role + ' • ' + item.company) + '" data-cert-sub="' + esc(item.company + (item.ref ? ' • Ref: ' + item.ref : '')) + '" data-magnetic>View Certificate ' + icon('ur', 'ic-ur') + '</a>'
          : '';

        return '<article class="exp-card glass spot lift" data-reveal>' +
          '<div class="exp-top">' +
            '<div class="exp-role-wrap">' +
              '<div class="exp-badges">' +
                (item.badge ? '<span class="exp-badge">' + esc(item.badge) + '</span>' : '') +
                (item.ref ? '<span class="sample">Ref: ' + esc(item.ref) + '</span>' : '') +
              '</div>' +
              '<h3 class="exp-role">' + esc(item.role) + '</h3>' +
              '<div class="exp-company">' +
                '<span>' + esc(item.company) + '</span>' +
                (item.location ? '<span class="loc">• ' + icon('pin', 'ic-inline') + ' ' + esc(item.location) + '</span>' : '') +
              '</div>' +
            '</div>' +
            '<div class="exp-meta">' +
              '<span class="exp-period">' + esc(item.period) + '</span>' +
              (item.duration ? '<span class="exp-duration">' + esc(item.duration) + '</span>' : '') +
            '</div>' +
          '</div>' +
          '<div class="exp-body">' +
            (item.summary ? '<p class="exp-summary">' + esc(item.summary) + '</p>' : '') +
            (highlights ? '<ul class="exp-highlights">' + highlights + '</ul>' : '') +
          '</div>' +
          '<div class="exp-footer">' +
            (tags ? '<ul class="tags">' + tags + '</ul>' : '<div></div>') +
            certBtn +
          '</div>' +
        '</article>';
      }).join('');
    }
  };

  var Projects = {
    render: function () {
      $('#projectsLede').textContent = P.projects.lede;
      $('#projectsList').innerHTML = P.projects.items.map(function (p) {
        var visual = p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' preview" loading="lazy" decoding="async">' : (ART[p.art] || ART.match);
        return '<article class="project" data-reveal>' +
          '<div class="project-inner glass" data-tilt data-cursor>' +
          '<div class="p-visual"><div class="p-art" data-parallax>' + visual + '</div><span class="p-kind">' + esc(p.kind) + '</span></div>' +
          '<div class="p-info"><h3>' + esc(p.title) + '</h3><p>' + esc(p.description) + '</p>' +
          '<ul class="tags">' + p.tags.map(function (t) { return '<li class="tag">' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<div class="p-actions"><a class="btn btn-sm" ' + ext(p.demo, p.title + ' link') + ' data-magnetic>View Project ' + icon('ur', 'ic-ur') + '</a>' +
          '<a class="btn btn-sm btn-ghost" ' + ext(p.github || P.social.github.url, 'GitHub link') + ' data-magnetic>' + icon('github') + ' GitHub</a></div></div>' +
          '</div></article>';
      }).join('');
    }
  };

  var Certifications = {
    render: function () {
      $('#certLede').textContent = P.certifications.lede;
      $('#certList').innerHTML = P.certifications.items.map(function (c) {
        var action = c.url
          ? '<a class="btn btn-sm btn-ghost" href="' + esc(c.url) + '" data-cert-modal data-cert-title="' + esc(c.name) + '" data-cert-sub="' + esc(c.org) + '" data-magnetic>View Certificate ' + icon('ur', 'ic-ur') + '</a>'
          : '<a class="btn btn-sm btn-ghost" href="#" data-placeholder="Certificate link" data-magnetic>View Certificate ' + icon('ur', 'ic-ur') + '</a>';
        return '<li class="cert" data-reveal><div><h3>' + esc(c.name) + (c.sample ? '<span class="sample">Placeholder</span>' : '') + '</h3><p class="org">' + esc(c.org) + '</p></div>' +
          '<span class="yr">' + esc(c.year) + '</span>' +
          action + '</li>';
      }).join('');
    }
  };

  var Contact = {
    render: function () {
      var c = P.contact, s = P.social;
      $('#contactSub').textContent = P.contactCopy.sub;
      function row(ic, label, value, attrs) {
        var inner = '<span class="ic-sm">' + icon(ic) + '</span><span><small>' + label + '</small><span class="v">' + esc(value) + '</span></span>';
        return attrs ? '<li><a class="c-row" ' + attrs + '>' + inner + icon('ur', 'go') + '</a></li>' : '<li><div class="c-row">' + inner + '</div></li>';
      }
      $('#contactList').innerHTML =
        row('mail', 'Email', c.email || c.emailPlaceholder, mailHref()) +
        row('github', 'GitHub', s.github.handle, ext(s.github.url, 'GitHub link')) +
        row('linkedin', 'LinkedIn', s.linkedin.handle, ext(s.linkedin.url, 'LinkedIn link')) +
        row('instagram', 'Instagram', s.instagram.handle, ext(s.instagram.url, 'Instagram link')) +
        row('pin', 'Location', c.location, '');
    }
  };

  var Footer = {
    render: function () {
      $('#fBrand').innerHTML = esc(P.site.brand) + '<span>.</span>';
      $('#fTag').textContent = P.site.tagline;
      var s = P.social;
      $('#fLinks').innerHTML =
        '<a ' + ext(s.github.url, 'GitHub link') + '>' + icon('github') + 'GitHub</a>' +
        '<a ' + ext(s.linkedin.url, 'LinkedIn link') + '>' + icon('linkedin') + 'LinkedIn</a>' +
        '<a ' + ext(s.instagram.url, 'Instagram link') + '>' + icon('instagram') + 'Instagram</a>' +
        '<a ' + mailHref() + '>' + icon('mail') + 'Email</a>';
      $('#copyright').textContent = '\u00A9 ' + P.site.year + ' ' + P.site.name;
    }
  };

  /* ==========================================================================
     INTERACTIONS
     ========================================================================== */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3200);
  }

  // Placeholder links: explain instead of going nowhere
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-placeholder]');
    if (!a) return;
    e.preventDefault();
    toast(a.getAttribute('data-placeholder') + ' is a placeholder. Add it in the PORTFOLIO config.');
  });

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    $$('[data-stagger]').forEach(function (p) {
      Array.prototype.forEach.call(p.children, function (c, i) {
        c.setAttribute('data-reveal', '');
        c.style.setProperty('--dl', ((i % 4) * 90) + 'ms');
      });
    });
    var els = $$('[data-reveal],[data-title]');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- Active nav + sliding indicator ---- */
  var activeId = 'home';
  function moveIndicator() {
    var ind = $('#navInd'), link = $('#navLinks a[data-nav="' + activeId + '"]');
    if (!ind || !link || !link.offsetWidth) return;
    ind.style.width = link.offsetWidth + 'px';
    ind.style.transform = 'translateX(' + link.offsetLeft + 'px)';
    ind.style.opacity = '1';
  }
  function setActive(id) {
    activeId = id;
    $$('[data-nav]').forEach(function (a) {
      var on = a.getAttribute('data-nav') === id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    moveIndicator();
  }
  function initSpy() {
    var sections = P.nav.map(function (n) { return document.getElementById(n.id); }).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
    setActive('home');
  }

  /* ---- Mobile menu ---- */
  function initMenu() {
    var burger = $('#burger'), menu = $('#menu');
    function set(open) {
      menu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', function () { set(!menu.classList.contains('open')); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 960) set(false); });
  }

  /* ---- Spotlight, magnetic, tilt ---- */
  function initPointerFx() {
    if (!fine || reduce) return;
    document.addEventListener('pointermove', function (e) {
      var t = e.target.closest && e.target.closest('.spot');
      if (t) {
        var r = t.getBoundingClientRect();
        t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        t.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }
    }, { passive: true });

    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + ((e.clientX - (r.left + r.width / 2)) * 0.28) + 'px,' + ((e.clientY - (r.top + r.height / 2)) * 0.38) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });

    $$('[data-tilt]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.transform = 'perspective(1500px) rotateX(' + ((0.5 - py) * 5) + 'deg) rotateY(' + ((px - 0.5) * 5) + 'deg)';
        el.style.setProperty('--mx', (px * 100) + '%');
        el.style.setProperty('--my', (py * 100) + '%');
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });

    // Hero portrait follows the cursor slightly
    var hero = $('#home'), portrait = $('#portrait');
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      portrait.style.setProperty('--ry', (nx * 6).toFixed(2));
      portrait.style.setProperty('--rx', (-ny * 5).toFixed(2));
    });
    hero.addEventListener('pointerleave', function () { portrait.style.setProperty('--ry', 0); portrait.style.setProperty('--rx', 0); });
  }

  /* ---- Custom cursor ---- */
  function initCursor() {
    if (!fine || reduce) return;
    var ring = $('#cursor'), dot = $('#cursorDot');
    var x = -100, y = -100, rx = x, ry = y, s = 1, ts = 1, shown = false;
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; rx = x; ry = y; document.body.classList.add('cursor-on'); }
    }, { passive: true });
    document.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-on'); shown = false; });
    document.addEventListener('pointerover', function (e) {
      var link = e.target.closest && e.target.closest('a,button,input,textarea,label,.pill');
      var card = e.target.closest && e.target.closest('[data-cursor]');
      ring.classList.toggle('is-link', !!(link || card));
      ts = link ? 1.7 : (card ? 2.4 : 1);
    });
    (function loop() {
      rx += (x - rx) * 0.17; ry += (y - ry) * 0.17; s += (ts - s) * 0.16;
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%) scale(' + s + ')';
      dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---- Scroll effects (single rAF-throttled handler) ---- */
  function initScroll() {
    var bar = $('#progressBar'), navWrap = $('#navWrap'), content = $('#heroContent'), frame = $('#portraitFrame');
    var words = $$('#statement span'), statement = $('#statement'), lastN = -1;
    var parallax = $$('[data-parallax]');
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop;
      var vh = window.innerHeight;
      var max = document.documentElement.scrollHeight - vh;
      bar.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0) + ')';
      navWrap.classList.toggle('scrolled', y > 40);

      if (!reduce && y < vh * 1.3) {
        frame.style.transform = 'translate3d(0,' + (y * 0.14) + 'px,0) scale(' + (1 + y * 0.00012) + ')';
        content.style.transform = 'translate3d(0,' + (y * -0.07) + 'px,0)';
        content.style.opacity = String(clamp(1 - y / (vh * 0.95), 0, 1));
      }

      // Word-by-word statement highlight
      var r = statement.getBoundingClientRect();
      var p = reduce ? 1 : clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
      var n = Math.round(p * words.length);
      if (n !== lastN) { words.forEach(function (w, i) { w.classList.toggle('on', i < n); }); lastN = n; }

      // Parallax on project imagery
      if (!reduce) {
        parallax.forEach(function (el) {
          var b = el.parentElement.getBoundingClientRect();
          if (b.bottom < -100 || b.top > vh + 100) return;
          var off = ((b.top + b.height / 2) - vh / 2) / vh;
          el.style.transform = 'translate3d(0,' + (off * -56).toFixed(1) + 'px,0)';
        });
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { onScroll(); moveIndicator(); });
    update();
  }

  /* ---- Ambient particles ---- */
  function initParticles() {
    var c = $('#bg'), ctx = c.getContext && c.getContext('2d');
    if (!ctx) return;
    var w = 0, h = 0, dpr = 1, pts = [], running = true;
    function resize() {
      var nw = window.innerWidth, nh = window.innerHeight;
      if (nw === w && Math.abs(nh - h) < 150) return;
      var fresh = nw !== w;
      w = nw; h = nh; dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (fresh || !pts.length) {
        var n = Math.min(64, Math.round(w * h / 24000));
        pts = [];
        for (var i = 0; i < n; i++) {
          var isRose = Math.random() < 0.22;
          pts.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.16,
            vy: (Math.random() - 0.5) * 0.16,
            r: Math.random() * 1.3 + 0.4,
            a: Math.random() * 0.38 + 0.1,
            isRose: isRose
          });
        }
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      var i, j, p, q, dx, dy, d;
      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }
        ctx.fillStyle = p.isRose ? ('rgba(255,45,149,' + p.a + ')') : ('rgba(0,123,167,' + p.a + ')');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
        for (j = i + 1; j < pts.length; j++) {
          q = pts[j]; dx = p.x - q.x; dy = p.y - q.y; d = dx * dx + dy * dy;
          if (d < 12100) {
            var lineAlpha = (1 - Math.sqrt(d) / 110) * 0.12;
            ctx.strokeStyle = (p.isRose || q.isRose) ? ('rgba(255,45,149,' + (lineAlpha * 0.75) + ')') : ('rgba(0,123,167,' + lineAlpha + ')');
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    }
    function loop() { if (running) { draw(); requestAnimationFrame(loop); } }
    resize();
    window.addEventListener('resize', function () { resize(); if (reduce) draw(); });
    document.addEventListener('visibilitychange', function () { running = !document.hidden; if (running && !reduce) loop(); });
    if (reduce) draw(); else loop();
  }

  /* ---- Contact form ---- */
  function initForm() {
    var form = $('#contactForm'), status = $('#formStatus');
    function say(msg, ok) { status.textContent = msg; status.classList.toggle('ok', !!ok); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); say('Please complete every field with a valid email address.'); return; }
      var d = new FormData(form);
      var first = String(d.get('first')).trim(), last = String(d.get('last')).trim();
      var email = String(d.get('email')).trim(), msg = String(d.get('message')).trim();
      if (!P.contact.email) { say('Preview mode: add your email in the PORTFOLIO config to receive messages.'); return; }
      var subject = 'Portfolio enquiry from ' + first + ' ' + last;
      var body = msg + '\n\n' + first + ' ' + last + '\n' + email;
      var a = document.createElement('a');
      a.href = 'mailto:' + P.contact.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      document.body.appendChild(a); a.click(); a.remove();
      say('Thanks, ' + first + '. Your email app is opening with the message ready to send.', true);
      form.reset();
    });
  }

  /* ---- Certificate Modal Viewer ---- */
  var CertModal = {
    modal: null,
    frame: null,
    title: null,
    sub: null,
    openBtn: null,
    downloadBtn: null,
    init: function () {
      this.modal = $('#certModal');
      if (!this.modal) return;
      this.frame = $('#certModalFrame');
      this.title = $('#certModalTitle');
      this.sub = $('#certModalSub');
      this.openBtn = $('#certModalOpen');
      this.downloadBtn = $('#certModalDownload');

      var self = this;
      document.addEventListener('click', function (e) {
        var link = e.target.closest && e.target.closest('a[data-cert-modal]');
        if (!link) return;
        var url = link.getAttribute('href');
        if (!url || url === '#') return;
        e.preventDefault();
        var title = link.getAttribute('data-cert-title') || 'Certificate';
        var sub = link.getAttribute('data-cert-sub') || '';
        self.open(url, title, sub);
      });

      var closeBtn = $('#certModalClose');
      var backdrop = $('#certModalBackdrop');
      if (closeBtn) closeBtn.addEventListener('click', function () { self.close(); });
      if (backdrop) backdrop.addEventListener('click', function () { self.close(); });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && self.modal && self.modal.classList.contains('active')) {
          self.close();
        }
      });
    },
    open: function (url, title, sub) {
      if (!this.modal) return;
      if (this.title) this.title.textContent = title;
      if (this.sub) this.sub.textContent = sub;
      if (this.openBtn) this.openBtn.setAttribute('href', url);
      if (this.downloadBtn) {
        this.downloadBtn.setAttribute('href', url);
        var filename = url.split('/').pop() || 'document.pdf';
        this.downloadBtn.setAttribute('download', filename);
      }
      var embedUrl = url;
      if (embedUrl.indexOf('drive.google.com/file/d/') !== -1 && embedUrl.indexOf('/view') !== -1) {
        embedUrl = embedUrl.replace('/view', '/preview');
      }
      if (this.frame) {
        this.frame.src = embedUrl;
      }
      this.modal.classList.add('active');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    },
    close: function () {
      if (!this.modal) return;
      this.modal.classList.remove('active');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (this.frame) {
        this.frame.src = '';
      }
    }
  };

  /* ==========================================================================
     BOOT
     ========================================================================== */
  function boot() {
    try {
      Navbar.render(); Hero.render(); About.render(); Expertise.render(); Skills.render();
      Experience.render(); Projects.render(); Certifications.render(); Contact.render(); Footer.render();
      initReveal(); initSpy(); initMenu(); initPointerFx(); initCursor(); initScroll(); initParticles(); initForm(); CertModal.init();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);
    } catch (err) {
      // Never leave the page blank: fall back to a static, fully visible layout
      root.classList.remove('js');
      if (window.console) console.error('Portfolio init failed:', err);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
