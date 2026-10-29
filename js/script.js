/* ==========================================================================
   Shahreen Qasim Portfolio JavaScript
   File: js/script.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. Dark Mode / Theme Toggle
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const themeIconSun = document.getElementById('themeIconSun');
  const themeIconMoon = document.getElementById('themeIconMoon');

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (themeIconSun) themeIconSun.classList.remove('hidden');
      if (themeIconMoon) themeIconMoon.classList.add('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIconSun) themeIconSun.classList.add('hidden');
      if (themeIconMoon) themeIconMoon.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  }

  // Detect saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      applyTheme(!isCurrentlyDark);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Menu Toggle
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Close menu when mobile link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Back to Top Floating Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 280) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Reveal on Scroll (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 5. Typing Effect for Hero (if present)
  // --------------------------------------------------------------------------
  const typedHeadline = document.getElementById('typedHeadline');
  if (typedHeadline) {
    const textToType = typedHeadline.getAttribute('data-text') || typedHeadline.textContent;
    typedHeadline.textContent = '';
    let charIndex = 0;
    function typeChar() {
      if (charIndex < textToType.length) {
        typedHeadline.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 45);
      }
    }
    setTimeout(typeChar, 350);
  }

});

// --------------------------------------------------------------------------
// 6. Global CV Modal Controls
// --------------------------------------------------------------------------
function openCVModal() {
  const modal = document.getElementById('cvModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeCVModal() {
  const modal = document.getElementById('cvModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCVModal();
  }
});

// Close modal when clicking backdrop
document.addEventListener('click', (e) => {
  const modal = document.getElementById('cvModal');
  if (modal && !modal.classList.contains('hidden') && e.target === modal) {
    closeCVModal();
  }
});

// --------------------------------------------------------------------------
// 7. Clipboard Copy Helper (Used on Contact page for Email & Phone)
// --------------------------------------------------------------------------
function copyContactInfo(text, buttonElement) {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopiedFeedback(buttonElement);
    } catch (err) {
      console.error('Copy fallback failed', err);
    }
    document.body.removeChild(textarea);
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showCopiedFeedback(buttonElement);
  }).catch(err => {
    console.error('Failed to copy', err);
  });
}

function showCopiedFeedback(btn) {
  if (!btn) return;
  const originalHtml = btn.innerHTML;
  btn.classList.add('!bg-emerald-50', '!text-emerald-600', 'dark:!bg-emerald-950/80', 'dark:!text-emerald-400', '!border-emerald-300');
  btn.innerHTML = `
    <svg class="w-3.5 h-3.5 inline-block mr-1 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>Copied!</span>
  `;
  setTimeout(() => {
    btn.innerHTML = originalHtml;
    btn.classList.remove('!bg-emerald-50', '!text-emerald-600', 'dark:!bg-emerald-950/80', 'dark:!text-emerald-400', '!border-emerald-300');
  }, 2000);
}
