// Mobile nav toggle script
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');

  if (!toggle || !nav) return;

  function openNav() {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
  }

  function closeNav() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }

  function toggleNav() {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closeNav(); else openNav();
  }

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    toggleNav();
  });

  // Close menu when pressing Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeNav();
      // move focus back to the toggle so keyboard users are in a sensible place
      toggle.focus();
    }
  });

  // Optional: close nav when clicking outside of it (gesture-friendly)
  document.addEventListener('click', function (e) {
    const isClickInside = nav.contains(e.target) || toggle.contains(e.target);
    if (!isClickInside) {
      closeNav();
    }
  });

})();
