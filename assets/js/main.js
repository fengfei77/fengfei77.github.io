/* ==========================================================================
   周文彦 · 个人学术主页 — 交互脚本
   无第三方依赖：移动端导航、滚动状态、导航高亮、渐显动画、年份
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. 移动端导航 ---------- */
  var header = document.getElementById("siteHeader");
  var nav = document.getElementById("siteNav");
  var toggle = document.getElementById("navToggle");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "展开导航");
  }

  function openNav() {
    if (!nav || !toggle) return;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "收起导航");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") {
        closeNav();
      } else {
        openNav();
      }
    });

    // 点击导航项后收起
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    // 点击外部收起
    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeNav();
    });

    // Esc 收起
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    // 视口变宽后复位
    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) closeNav();
    });
  }

  /* ---------- 2. 滚动时头部阴影 ---------- */
  var lastScrolled = null;

  function syncHeader() {
    if (!header) return;
    var scrolled = window.scrollY > 8;
    if (scrolled !== lastScrolled) {
      header.classList.toggle("is-scrolled", scrolled);
      lastScrolled = scrolled;
    }
  }

  /* ---------- 3. 导航高亮 ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav a[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  function syncActive() {
    if (!sections.length) return;

    var probe = window.scrollY + (header ? header.offsetHeight : 0) + 90;
    var activeIndex = -1;

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= probe) activeIndex = i;
    }

    // 接近页面底部时高亮最后一节
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      activeIndex = sections.length - 1;
    }

    navLinks.forEach(function (link, index) {
      var isActive = index === activeIndex;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /* ---------- 4. 滚动监听（rAF 节流） ---------- */
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      syncHeader();
      syncActive();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  syncHeader();
  syncActive();

  /* ---------- 5. 渐显 ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (el, index) {
      // 同组元素依次出现，营造段落展开的节奏
      el.style.transitionDelay = Math.min(index % 4, 3) * 60 + "ms";
      observer.observe(el);
    });
  }

  /* ---------- 6. 打印 / 存为 PDF ---------- */
  var printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", function () { window.print(); });
  }

  /* ---------- 7. 页脚年份 ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
