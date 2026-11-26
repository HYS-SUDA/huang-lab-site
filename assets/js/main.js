(() => {
  "use strict";

  document.body.classList.add("js-ready");

  const data = window.LAB_SITE_DATA || {};
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const loader = document.querySelector("[data-loader]");
  const hero = document.querySelector(".hero");
  const menuLabel = document.querySelector("[data-menu-label]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hideLoader() {
    if (!loader) return;
    loader.classList.add("is-hidden");
    window.setTimeout(() => loader.remove(), 1000);
    if (hero) hero.classList.add("is-ready");
  }

  if (reduceMotion) hideLoader();
  else window.setTimeout(hideLoader, 650);

  function closeMenu() {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    if (menuLabel) menuLabel.textContent = "Open menu";
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(willOpen));
      if (menuLabel) menuLabel.textContent = willOpen ? "Close menu" : "Open menu";
      nav.classList.toggle("is-open", willOpen);
      document.body.classList.toggle("menu-open", willOpen);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }


  const heroSlider = document.querySelector("[data-hero-slider]");
  const heroTrack = document.querySelector("[data-hero-track]");
  const slides = [...document.querySelectorAll("[data-slide]")];
  const slidePrev = document.querySelector("[data-slide-prev]");
  const slideNext = document.querySelector("[data-slide-next]");
  const slideCount = document.querySelector("[data-slide-count]");
  const slideDots = document.querySelector("[data-slide-dots]");
  let slideIndex = 0;
  let slideTimer = null;

  function setSlide(nextIndex) {
    if (!heroTrack || !slides.length) return;
    slideIndex = (nextIndex + slides.length) % slides.length;
    heroTrack.style.transform = "translateX(-" + slideIndex * 100 + "%)";
    slides.forEach((slide, index) => {
      const active = index === slideIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    if (slideCount) slideCount.textContent = String(slideIndex + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    if (slideDots) {
      [...slideDots.children].forEach((dot, index) => {
        dot.classList.toggle("is-active", index === slideIndex);
        dot.setAttribute("aria-current", index === slideIndex ? "true" : "false");
      });
    }
  }

  function startSlides() {
    if (reduceMotion || slides.length < 2) return;
    window.clearInterval(slideTimer);
    slideTimer = window.setInterval(() => setSlide(slideIndex + 1), 6500);
  }

  function pauseSlides() {
    window.clearInterval(slideTimer);
  }

  if (slides.length && slideDots) {
    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-dot";
      dot.setAttribute("aria-label", "Show slide " + (index + 1));
      dot.addEventListener("click", () => {
        setSlide(index);
        startSlides();
      });
      slideDots.appendChild(dot);
    });
    setSlide(0);
  }
  if (slidePrev) slidePrev.addEventListener("click", () => { setSlide(slideIndex - 1); startSlides(); });
  if (slideNext) slideNext.addEventListener("click", () => { setSlide(slideIndex + 1); startSlides(); });
  if (heroSlider) {
    heroSlider.addEventListener("mouseenter", pauseSlides);
    heroSlider.addEventListener("mouseleave", startSlides);
    heroSlider.addEventListener("focusin", pauseSlides);
    heroSlider.addEventListener("focusout", startSlides);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pauseSlides();
    else startSlides();
  });
  startSlides();

  const reveals = [...document.querySelectorAll("[data-reveal]")].filter((el) => !hero || !hero.contains(el));
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const padCount = (value) => String(value).padStart(2, "0");
  document.querySelectorAll("[data-current-members]").forEach((el) => {
    el.textContent = padCount(data.currentMembers ?? 5);
  });
  document.querySelectorAll("[data-alumni-members]").forEach((el) => {
    el.textContent = padCount(data.alumniMembers ?? 5);
  });

  const publications = Array.isArray(data.publications) ? data.publications : [];
  const publicationList = document.querySelector("[data-publications]");
  const topicButtons = [...document.querySelectorAll("[data-topic-filter]")];
  const yearFilter = document.querySelector("[data-year-filter]");
  const filterState = { topic: "all", year: "all" };

  topicButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.topicFilter === "all"));
  });

  function createPublication(publication) {
    const item = document.createElement("article");
    item.className = "publication-item";

    const year = document.createElement("div");
    year.className = "pub-year";
    year.textContent = publication.year;

    const main = document.createElement("div");
    main.className = "pub-main";

    const title = document.createElement("h3");
    const titleLink = document.createElement("a");
    titleLink.href = publication.url;
    titleLink.target = "_blank";
    titleLink.rel = "noopener noreferrer";
    titleLink.textContent = publication.title;
    title.appendChild(titleLink);

    const authors = document.createElement("p");
    authors.className = "pub-authors";
    authors.textContent = publication.authors;

    const meta = document.createElement("div");
    meta.className = "pub-tags";
    const topic = document.createElement("span");
    topic.textContent = publication.topicLabel || publication.topic;
    meta.appendChild(topic);

    const access = document.createElement("a");
    access.className = "pub-access";
    access.href = publication.url;
    access.target = "_blank";
    access.rel = "noopener noreferrer";
    access.textContent = publication.url.includes("doi.org") ? "Open paper / DOI ↗" : "Find paper online ↗";
    meta.appendChild(access);

    main.append(title, authors, meta);

    const venue = document.createElement("div");
    venue.className = "pub-venue";
    venue.textContent = publication.venue;

    item.append(year, main, venue);
    return item;
  }

  function renderPublications() {
    if (!publicationList) return;
    const filtered = publications.filter((publication) => {
      const topicMatch = filterState.topic === "all" || publication.topic === filterState.topic;
      const yearMatch = filterState.year === "all" || publication.year === filterState.year;
      return topicMatch && yearMatch;
    });

    publicationList.innerHTML = "";
    if (!filtered.length) {
      const empty = document.createElement("p");
      empty.className = "publication-empty";
      empty.textContent = "No publications match the selected filters.";
      publicationList.appendChild(empty);
      return;
    }
    filtered.forEach((publication) => publicationList.appendChild(createPublication(publication)));
  }

  topicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterState.topic = button.dataset.topicFilter || "all";
      topicButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderPublications();
    });
  });

  if (yearFilter) {
    yearFilter.addEventListener("change", () => {
      filterState.year = yearFilter.value;
      renderPublications();
    });
  }

  renderPublications();

  const patentList = document.querySelector("[data-patents]");
  function renderPatents() {
    if (!patentList || !Array.isArray(data.patents)) return;
    patentList.innerHTML = "";
    data.patents.forEach((patent) => {
      const item = document.createElement("article");
      item.className = "patent-item";

      const year = document.createElement("div");
      year.className = "patent-year";
      year.textContent = patent.year;

      const main = document.createElement("div");
      main.className = "patent-main";
      const title = document.createElement("h4");
      title.textContent = patent.title;
      const titleZh = document.createElement("p");
      titleZh.className = "patent-title-zh";
      titleZh.textContent = patent.titleZh;
      main.append(title, titleZh);

      const meta = document.createElement("div");
      meta.className = "patent-meta";
      const kind = document.createElement("span");
      kind.textContent = patent.kind;
      const number = document.createElement("span");
      number.textContent = patent.number;
      meta.append(kind, number);

      item.append(year, main, meta);
      patentList.appendChild(item);
    });
  }
  renderPatents();


  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const spiedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateCurrentSection() {
    if (!spiedSections.length) return;
    const marker = window.scrollY + Math.min(window.innerHeight * 0.38, 360);
    let current = spiedSections[0];
    spiedSections.forEach((section) => {
      if (section.offsetTop <= marker) current = section;
    });
    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("is-current", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }
  updateCurrentSection();
  window.addEventListener("scroll", updateCurrentSection, { passive: true });

  const countEl = document.querySelector("[data-count]");
  if (countEl && "IntersectionObserver" in window && !reduceMotion) {
    const target = Number(countEl.dataset.count);
    const suffix = countEl.dataset.suffix || "";
    const countObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / 950, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        countEl.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.disconnect();
    }, { threshold: 0.6 });
    countObserver.observe(countEl);
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
