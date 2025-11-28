let currentTheme = localStorage.getItem('theme') || 'auto';

function toggleDropdown() {
  const menu = document.getElementById('themeMenu');
  if (menu) {
    menu.classList.toggle('show');
  }
}

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('theme', theme);

  if (theme === 'auto') {
    if (window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }

  const icon = document.getElementById('themeIcon');
  if (icon) {
    if (theme === 'dark') {
      icon.textContent = '☽';
    } else if (theme === 'light') {
      icon.textContent = '☀';
    } else {
      icon.textContent = '⚙';
    }
  }

  updateActiveOption();

  const menu = document.getElementById('themeMenu');
  if (menu) {
    menu.classList.remove('show');
  }
}

function updateActiveOption() {
  const options = document.querySelectorAll('.theme-option');
  options.forEach(option => {
    option.classList.remove('active');
    const text = option.textContent || '';
    if (
      (currentTheme === 'light' && text.includes('Light')) ||
      (currentTheme === 'dark' && text.includes('Dark')) ||
      (currentTheme === 'auto' && text.includes('Auto'))
    ) {
      option.classList.add('active');
    }
  });
}

// Listen for system theme changes when on "auto"
if (window.matchMedia) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const mqHandler = e => {
    if (currentTheme === 'auto') {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  };
  if (mq.addEventListener) {
    mq.addEventListener('change', mqHandler);
  } else if (mq.addListener) {
    mq.addListener(mqHandler);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Theme setup
  setTheme(currentTheme);
  updateActiveOption();

  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Close the theme dropdown when clicking outside
  document.addEventListener('click', event => {
    const dropdown = document.querySelector('.theme-dropdown');
    const menu = document.getElementById('themeMenu');
    if (dropdown && menu && !dropdown.contains(event.target)) {
      menu.classList.remove('show');
    }
  });

    // === Mobile nav hamburger toggle ===
  const nav = document.getElementById('mainNav');
  const navToggle = document.querySelector('.nav-toggle');

  if (nav && navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();               // don't trigger outside click
      nav.classList.toggle('nav-open');  // CSS will show/hide dropdown
    });

    // Close nav when clicking anywhere else
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) {
        nav.classList.remove('nav-open');
      }
    });
  }

  // === Abstract toggles ===
  const abstractButtons = document.querySelectorAll('.js-abstract-toggle');
  abstractButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const targetSelector = button.getAttribute('data-target');
      if (!targetSelector) return;
      const box = document.querySelector(targetSelector);
      if (!box) return;
      box.classList.toggle('show');
    });
  })

    // === Mobile nav toggle ===
  const nav = document.querySelector('nav');
  const navToggle = document.querySelector('.nav-toggle');

  if (nav && navToggle) {
    navToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      nav.classList.toggle('nav-open');
    });

    // Close menu when clicking a nav link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) {
        nav.classList.remove('nav-open');
      }
    });
  }
});


