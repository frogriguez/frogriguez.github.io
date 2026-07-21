// Portfolio — scrollspy active-nav highlight + mobile hamburger toggle
// Companion to design-style.md §Scrollspy.
(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('main.main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var navToggle = document.getElementById('navToggle');
  var navLinksEl = document.getElementById('navLinks');

  function linkFor(id) {
    return navLinks.filter(function (link) {
      return link.getAttribute('href') === '#' + id;
    })[0];
  }

  function setActive(id) {
    navLinks.forEach(function (link) { link.classList.remove('is-active'); });
    var active = linkFor(id);
    if (active) active.classList.add('is-active');
  }

  function currentSectionId() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var atBottom = window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 2;
    if (atBottom) return sections[sections.length - 1].id;

    var current = sections[0];
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollTop + 90) current = section;
    });
    return current.id;
  }

  function onScroll() {
    if (!sections.length) return;
    setActive(currentSectionId());
  }

  function closeMobileMenu() {
    navToggle.classList.remove('is-open');
    navLinksEl.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      setActive(id);
      window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
      history.replaceState(null, '', '#' + id);
    });
  });

  if (navToggle && navLinksEl) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.classList.toggle('is-open');
      navLinksEl.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
