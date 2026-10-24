/* ═══════════════════════════════════════════════════════════════════════════
   ArtViSiON STUDiO — UI/UX 2026 · structure + behaviour
   ---------------------------------------------------------------------------
   Works on top of the existing engine. It never deletes a feature: it groups
   duplicated entry points, re-houses panels into one tabbed inspector, docks
   the action bar, and fixes layout at every breakpoint.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__AVUI26) return;
  window.__AVUI26 = true;

  var doc = document;
  var V = 'v26';
  var LS_TAB = 'av26.tab';
  var LS_GUIDE = 'av26.guide';
  var LS_MENUBAR = 'av26.menubar';

  var root = doc.documentElement;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var on = function (el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt || false); };

  function store(k, v) { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) { } }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }


  /* ── icons ─────────────────────────────────────────────────────────────── */
  var I = {
    design: '<path d="M4 6h16M4 12h10M4 18h7"/><circle cx="18" cy="17" r="3"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    colour: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="9.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="9.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none"/>',
    more: '<circle cx="6" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    bolt: '<path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13l1-8z"/>',
    chev: '<path d="M6 9l6 6 6-6"/>'
  };
  function svg(path, size) {
    return '<svg width="' + (size || 15) + '" height="' + (size || 15) + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  }

  /* ══════════════════════════════════════════════════════════════════════
     0 · keep our stylesheet last in the cascade
     (the app injects its own <style> blocks at runtime — they must never
      out-rank the design system)
     ══════════════════════════════════════════════════════════════════════ */
  function keepLast() {
    var link = doc.getElementById('avui-css');
    if (!link) return;
    var head = doc.head;
    if (head.lastElementChild !== link) head.appendChild(link);
  }
  function watchHead() {
    if (!window.MutationObserver) return;
    var mo = new MutationObserver(function (muts) {
      var dirty = false;
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes && muts[i].addedNodes.length) { dirty = true; break; }
      }
      if (dirty) keepLast();
    });
    mo.observe(doc.head, { childList: true });
  }

  /* ══════════════════════════════════════════════════════════════════════
     1 · inspector tabs
     ══════════════════════════════════════════════════════════════════════ */
  var TABS = [
    { id: 'design', label: 'Design', icon: I.design },
    { id: 'layers', label: 'Layers', icon: I.layers },
    { id: 'colour', label: 'Colour', icon: I.colour },
    { id: 'more', label: 'More', icon: I.more }
  ];
  var SECTION_TAB = {
    av18steps: 'design',
    av17quick: 'design',
    propsSec: 'design',
    av18adv: 'design',
    layersSec: 'layers',
    colorsSec: 'colour',
    histSec: 'more'
  };
  /* the More tab doubles as the panel launcher: everything that used to hide
     inside menus stays one tap away (no capability is added or removed) */
  var MORE_ACTIONS = [
    { id: 'tools', label: 'All tools', hint: 'tools sheet', icon: '<path d="M4 7h16M4 12h10M4 17h7"/>',
      run: function () { openActions(); } },
    { id: 'history', label: 'History', hint: 'undo steps', icon: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
      run: function () { showHistoryPanel(); } },
    { id: 'shortcuts', label: 'Shortcuts', hint: 'keyboard', icon: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/>',
      run: function () { clickApp('#qHelp'); } },
    { id: 'brand', label: 'Brand kit', hint: 'colours', icon: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.3"/><circle cx="15" cy="10" r="1.3"/>',
      run: function () { clickApp('#av12bar button[data-a="brand"]'); } },
    { id: 'export', label: 'Export', hint: 'PNG · PDF · SVG', icon: '<path d="M12 4v12m0 0l-4-4m4 4l4-4"/><path d="M4 20h16"/>',
      run: function () { clickApp('#qExport'); } },
    { id: 'mode', label: 'Pro mode', hint: 'all panels', icon: '<path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13z"/>',
      run: function () { clickApp('#av15mode'); } }
  ];
  function clickApp(sel) {
    var el = $(sel);
    if (!el) return;
    if (doc.body.classList.contains('show-panel') && sel.indexOf('#av12bar') === 0) doc.body.classList.remove('show-panel');
    el.click();
  }
  function showHistoryPanel() {
    var sec = $('#histSec');
    if (!sec) return;
    sec.style.display = '';
    if (!sec.getAttribute('data-av-open')) {
      sec.setAttribute('data-av-open', '1');
      try { if (window.AV && AV.ui) AV.ui(); } catch (e) { }
    }
    sec.scrollIntoView({ block: 'nearest' });
  }

  function buildMoreHub(side) {
    if ($('#av26more', side)) return;
    var wrap = doc.createElement('div');
    wrap.id = 'av26more';
    wrap.setAttribute('data-avtab', 'more');
    wrap.innerHTML = '<div class="av-hub-h">Panels &amp; shortcuts</div><div class="av-hub">' +
      MORE_ACTIONS.map(function (a) {
        return '<button type="button" class="av-hub-btn" data-av-hub="' + a.id + '">' +
          '<i>' + svg(a.icon, 15) + '</i><span><b>' + a.label + '</b><small>' + a.hint + '</small></span></button>';
      }).join('') + '</div>';
    side.appendChild(wrap);
    on(wrap, 'click', function (e) {
      var b = e.target.closest('[data-av-hub]');
      if (!b) return;
      var act = MORE_ACTIONS.filter(function (a) { return a.id === b.dataset.avHub; })[0];
      if (act) try { act.run(); } catch (err) { }
    });
  }

  function buildTabs(side) {
    if ($('.av-tabs', side)) return;
    var bar = doc.createElement('div');
    bar.className = 'av-tabs';
    bar.setAttribute('role', 'tablist');
    bar.setAttribute('aria-label', 'Inspector');
    bar.innerHTML = TABS.map(function (t) {
      return '<button type="button" role="tab" data-tab="' + t.id + '" aria-selected="false" ' +
        'aria-controls="av-pane-' + t.id + '" title="' + t.label + '">' + svg(t.icon, 14) +
        '<span>' + t.label + '</span></button>';
    }).join('') +
      '<button type="button" class="av-tab-close" data-av-close-panel="1" aria-label="Close panel" title="Close panel">' +
      svg(I.close, 14) + '</button>';
    side.insertBefore(bar, side.firstChild);
    on(bar, 'click', function (e) {
      var b = e.target.closest('button[data-tab]');
      if (b) return setTab(b.dataset.tab);
      if (e.target.closest('[data-av-close-panel]')) {
        doc.body.classList.remove('show-panel');
      }
    });
  }

  function classifySections(side) {
    $$(':scope > *', side).forEach(function (el) {
      if (el.classList.contains('av-tabs')) return;
      var tab = SECTION_TAB[el.id] || el.getAttribute('data-avtab') || 'more';
      el.setAttribute('data-avtab', tab);
    });
  }

  function setTab(id) {
    var side = $('#side');
    if (!side) return;
    if (!TABS.some(function (t) { return t.id === id; })) id = 'design';
    classifySections(side);
    side.setAttribute('data-avtab', id);
    $$('.av-tabs [data-tab]', side).forEach(function (b) {
      b.setAttribute('aria-selected', b.dataset.tab === id ? 'true' : 'false');
    });
    store(LS_TAB, id);
    if (id === 'layers' || id === 'colour') {
      try { if (typeof window.renderLayers === 'function') window.renderLayers(); } catch (e) { }
    }
  }

  /* ══════════════════════════════════════════════════════════════════════
     2 · action dock  (the v12 bar becomes the single action home)
     ══════════════════════════════════════════════════════════════════════ */
  function dockActions() {
    var bar = $('#av12bar');
    var stage = $('#stage');
    if (!bar || !stage) return;
    if (bar.parentElement !== stage) stage.appendChild(bar);
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Studio actions');
    if (!bar.querySelector('.av-sheet-head')) {
      var head = doc.createElement('div');
      head.className = 'av-sheet-head';
      head.innerHTML = '<b>Actions</b><small>sab kuch ek jagah</small>' +
        '<button type="button" class="x" data-av-close-bar="1" aria-label="Close actions">' + svg(I.close, 15) + '</button>';
      on(head, 'click', function (e) { if (e.target.closest('[data-av-close-bar]')) closeActions(); });
      try { bar.insertBefore(head, bar.firstChild); } catch (e) { }
    }
    if (!bar.dataset.avGrouped) {
      bar.dataset.avGrouped = '1';
      // visual grouping without re-ordering: label the three natural blocks
      var kids = Array.prototype.slice.call(bar.children);
      kids.forEach(function (el, i) {
        if (el.classList && el.classList.contains('primary') && !el.dataset.avGrp) {
          el.dataset.avGrp = '1';
        }
      });
    }
  }

  function buildSheets() {
    if (!doc.getElementById('avBarBackdrop')) {
      var bd = doc.createElement('div');
      bd.id = 'avBarBackdrop';
      bd.setAttribute('aria-hidden', 'true');
      on(bd, 'click', closeActions);
      doc.body.appendChild(bd);
    }
    var stage = $('#stage');
    if (stage && !doc.getElementById('avActionsFab')) {
      var fab = doc.createElement('button');
      fab.id = 'avActionsFab';
      fab.type = 'button';
      fab.setAttribute('aria-label', 'Open actions');
      fab.innerHTML = svg(I.bolt, 17) + '<span>Actions</span>';
      on(fab, 'click', function () { openActions(); });
      stage.appendChild(fab);
    }
  }
  function openActions() {
    dockActions();
    doc.body.classList.add('av-bar-open');
  }
  function closeActions() { doc.body.classList.remove('av-bar-open'); }

  /* ══════════════════════════════════════════════════════════════════════
     3 · start guide  (collapsible, remembers the choice)
     ══════════════════════════════════════════════════════════════════════ */
  function buildGuideToggle() {
    var steps = $('#av18steps');
    if (!steps || steps.dataset.avToggle) return;
    steps.dataset.avToggle = '1';
    var head = $('.sh', steps);
    if (!head) return;
    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'av-guide-btn';
    btn.setAttribute('aria-label', 'Show or hide the start guide');
    btn.title = 'Show / hide guide';
    btn.innerHTML = svg(I.chev, 14);
    head.appendChild(btn);
    on(btn, 'click', function () {
      var off = root.classList.toggle('av-guide-off');
      store(LS_GUIDE, off ? 'off' : 'on');
    });
    if (read(LS_GUIDE) === 'off') root.classList.add('av-guide-off');
  }

  /* ══════════════════════════════════════════════════════════════════════
     4 · menu sheet: add the two chrome switches (classic menu bar)
     ══════════════════════════════════════════════════════════════════════ */
  function enhanceMenuSheet() {
    var sheet = $('#av15menu');
    if (!sheet) return;
    // the sheet body is rebuilt by the app on every open — re-add our row
    if ($('.av-menu-switches', sheet)) { syncMenuSwitch(); return; }
    var host = $('.mh', sheet) || null;
    var row = doc.createElement('div');
    row.className = 'av-menu-switches';
    row.innerHTML =
      '<button type="button" class="mitem" data-av-switch="menubar">' +
      svg('<path d="M4 6h16M4 12h16M4 18h10"/>', 15) +
      '<span>Classic menu bar</span><small class="av-sw-state">off</small></button>';
    if (host) host.insertAdjacentElement('afterend', row);
    else sheet.insertBefore(row, sheet.firstChild);
    on(row, 'click', function (e) {
      if (!e.target.closest('[data-av-switch]')) return;
      var on_ = root.classList.toggle('av-show-menus');
      var st = $('.av-sw-state', row);
      if (st) st.textContent = on_ ? 'on' : 'off';
      store(LS_MENUBAR, on_ ? 'on' : 'off');
    });
    syncMenuSwitch();
  }
  function syncMenuSwitch() {
    var want = read(LS_MENUBAR) === 'on';
    root.classList.toggle('av-show-menus', want);
    var st = $('#av15menu .av-sw-state');
    if (st) st.textContent = want ? 'on' : 'off';
  }
  function watchMenuSheet() {
    var sheet = $('#av15menu');
    if (!sheet || !window.MutationObserver) return;
    if (sheet.dataset.avWatched) return;
    sheet.dataset.avWatched = '1';
    new MutationObserver(function () {
      if (!sheet.classList.contains('on') && getComputedStyle(sheet).display === 'none') return;
      if (!$('.av-menu-switches', sheet)) enhanceMenuSheet();
    }).observe(sheet, { childList: true });
  }

  /* ══════════════════════════════════════════════════════════════════════
     5 · accessibility pass on icon-only controls
     ══════════════════════════════════════════════════════════════════════ */
  var ICON_LABELS = {
    '#qNew': 'New document', '#qOpen': 'Open file', '#qUndo': 'Undo', '#qRedo': 'Redo',
    '#qSave': 'Save project', '#qExport': 'Export', '#qHelp': 'Help',
    '#zOut': 'Zoom out', '#zIn': 'Zoom in', '#zFit': 'Fit to screen', '#z100': 'Zoom 100%',
    '#tgRul': 'Toggle rulers', '#tgGrid': 'Toggle grid', '#tgSnap': 'Toggle snapping'
  };
  function a11y() {
    Object.keys(ICON_LABELS).forEach(function (sel) {
      var el = $(sel);
      if (!el) return;
      if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', ICON_LABELS[sel]);
      if (!el.title) el.title = ICON_LABELS[sel];
      if (!el.getAttribute('type')) el.setAttribute('type', 'button');
    });
    $$('#toolrail .tool').forEach(function (b) {
      var t = b.querySelector('.lbl') || b.querySelector('.tip');
      var name = t ? t.textContent.replace(/\s+/g, ' ').trim() : (b.dataset.tool || '');
      /* some modes hide the .tip bubble — keep a native tooltip so every tool
         can always be identified (and screen readers get the full name) */
      if (name) {
        if (!b.getAttribute('aria-label')) b.setAttribute('aria-label', name);
        if (!b.title) b.title = name;
      }
      if (!b.getAttribute('type')) b.setAttribute('type', 'button');
    });
    var side = $('#side');
    if (side && !side.getAttribute('role')) side.setAttribute('role', 'complementary');
    var rail = $('#toolrail');
    if (rail && !rail.getAttribute('role')) rail.setAttribute('role', 'toolbar');
  }


  /* ══════════════════════════════════════════════════════════════════════
     5b · icon + label polish (no emoji in the chrome)
     ══════════════════════════════════════════════════════════════════════ */
  var EMOJI_MAP = {
    '📌': '<path d="M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/><path d="M12 14v7"/>',
    '🗂': '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    '⊞': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>',
    '▦': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>',
    '🧲': '<path d="M6 4v8a6 6 0 0 0 12 0V4"/><path d="M6 4h4v6H6zM14 4h4v6h-4z"/>',
    '🗑': '<path d="M4 7h16M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13M9 7V4h6v3"/>'
  };
  function polishIcons() {
    $$('.qbtn, #statusbar button').forEach(function (b) {
      var t = (b.textContent || '').trim();
      if (!t || t.length > 2) return;
      var path = EMOJI_MAP[t];
      if (!path) return;
      b.innerHTML = svg(path, 14);
      b.dataset.avIcon = '1';
      if (!b.getAttribute('aria-label')) b.setAttribute('aria-label', b.title || 'Toggle');
    });
    $$('#av12bar button, #toolrail .tool').forEach(function (b) {
      var t = (b.textContent || '').trim();
      if (t.length <= 2 && EMOJI_MAP[t] && !b.querySelector('svg')) b.insertAdjacentHTML('afterbegin', svg(EMOJI_MAP[t], 15));
    });
    // export emphasis in the top bar
    var exp = $('#qExport');
    if (exp && !exp.dataset.avLabel) {
      exp.dataset.avLabel = '1';
      exp.insertAdjacentHTML('beforeend', '<span class="av-qbtn-lbl">Export</span>');
      exp.classList.add('av-pill');
    }
  }

  /* ══════════════════════════════════════════════════════════════════════
     5c · dock hygiene — always start at the left edge
     ══════════════════════════════════════════════════════════════════════ */
  function resetDockScroll() {
    var bar = $('#av12bar');
    if (bar && bar.scrollLeft) bar.scrollLeft = 0;
  }


  /* ══════════════════════════════════════════════════════════════════════
     5d · mode label (Simple / Pro) survives compact layouts
     ══════════════════════════════════════════════════════════════════════ */
  function modeLabel() {
    var m = $('#av15menuBtn');
    if (m && !m.getAttribute('data-av-label')) m.setAttribute('data-av-label', 'Menu');
    if (m && !m.getAttribute('aria-label')) m.setAttribute('aria-label', 'Open menu');
    var b = $('#av15mode');
    if (!b) return;
    var txt = (b.querySelector('.txt') || {}).textContent || '';
    txt = txt.trim();
    if (!txt) txt = root.classList.contains('av-adv') ? 'Pro' : 'Simple';
    if (b.getAttribute('data-av-mode') !== txt) b.setAttribute('data-av-mode', txt);
    if (!b.getAttribute('aria-label')) b.setAttribute('aria-label', 'Mode: ' + txt + ' — click to switch');
    if (!b.title) b.title = 'Simple / Pro mode badlo';
  }
  function watchMode() {
    if (!window.MutationObserver) return;
    var b = $('#av15mode');
    if (!b) return;
    modeLabel();
    new MutationObserver(modeLabel).observe(root, { attributes: true, attributeFilter: ['class'] });
    new MutationObserver(modeLabel).observe(b, { childList: true, subtree: true, characterData: true });
  }

  /* ══════════════════════════════════════════════════════════════════════
     6 · breakpoints · relayout · canvas fit
     ══════════════════════════════════════════════════════════════════════ */
  function category() {
    var w = window.innerWidth || root.clientWidth;
    if (w <= 900) return 'phone';
    if (w <= 1180) return 'tablet';
    if (w <= 1600) return 'laptop';
    return 'desktop';
  }
  var lastCat = null, rt = 0, fitted = false;

  function relayout(force) {
    var c = category();
    root.setAttribute('data-av-device', c);
    doc.body.classList.toggle('av-phone', c === 'phone');
    doc.body.classList.toggle('av-tablet', c === 'tablet');
    if (c !== lastCat || force) {
      var changed = lastCat !== null && c !== lastCat;
      lastCat = c;
      if (c === 'phone') closeActions();
      doc.body.classList.remove('show-panel');
      // let CSS settle, then re-measure the canvas
      window.setTimeout(function () {
        try { if (window.resizeCanvas) window.resizeCanvas(); } catch (e) { }
        try {
          if (!fitted || changed) { fitted = true; if (window.fitView) window.fitView(); }
        } catch (e) { }
      }, 90);
    }
  }
  function onResize() {
    clearTimeout(rt);
    rt = setTimeout(function () { relayout(false); }, 140);
  }

  /* ══════════════════════════════════════════════════════════════════════
     7 · global shortcuts for the new chrome
     ══════════════════════════════════════════════════════════════════════ */
  function shortcuts() {
    doc.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (doc.body.classList.contains('av-bar-open')) { closeActions(); e.stopPropagation(); return; }
      if (doc.body.classList.contains('show-panel')) {
        doc.body.classList.remove('show-panel');
        e.stopPropagation();
      }
    }, true);
  }

  /* ══════════════════════════════════════════════════════════════════════
     8 · boot
     ══════════════════════════════════════════════════════════════════════ */
  function structure() {
    var side = $('#side');
    if (side) {
      buildTabs(side);
      buildMoreHub(side);
      classifySections(side);
      setTab(read(LS_TAB) || 'design');
    }
    dockActions();
    buildSheets();
    buildGuideToggle();
    a11y();
    polishIcons();
    resetDockScroll();
    watchMode();
  }

  function boot() {
    root.classList.add('av-ui-ready');
    structure();
    enhanceMenuSheet();
    watchMenuSheet();
    shortcuts();
    relayout(true);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', function () { setTimeout(function () { relayout(true); }, 260); });

    // the app mounts several panels late (v17–v25 packs) — keep the structure in sync
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      structure();
      enhanceMenuSheet();
      watchMenuSheet();
      if (tries > 24) clearInterval(iv);
    }, 250);

    // one more structural pass after first paint / fonts
    setTimeout(structure, 1200);
    setTimeout(function () { try { if (window.fitView) window.fitView(); } catch (e) { } }, 900);
  }

  keepLast();
  watchHead();
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 60); });
  } else {
    setTimeout(boot, 60);
  }
})();
