/**
 * Shahreen Qasim Portfolio - Clean Scrolling Controller
 * CIT331 Web Technologies - Single Page Application
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. TYPING ANIMATION (FOR HOME HEADLINE)
  // ==========================================================================
  const typedEl = document.getElementById('typedHeadline');
  if (typedEl) {
    const textToType = typedEl.getAttribute('data-text') || 'BS Computer Science Student | Aspiring Web Developer';
    typedEl.textContent = '';
    typedEl.classList.add('typing-cursor');
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < textToType.length) {
        typedEl.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 45);
      }
    };

    setTimeout(typeChar, 300);
  }

  // ==========================================================================
  // 2. STICKY NAVBAR ACTIVE HIGHLIGHTING (INTERSECTION OBSERVER)
  // ==========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'true');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // ==========================================================================
  // 3. GENTLE SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================================================
  // 4. MOBILE NAVIGATION TOGGLE
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', !isHidden);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // 5. DARK / LIGHT THEME TOGGLE
  // ==========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIconSun = document.getElementById('themeIconSun');
  const themeIconMoon = document.getElementById('themeIconMoon');

  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (themeIconSun) themeIconSun.classList.remove('hidden');
      if (themeIconMoon) themeIconMoon.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (themeIconSun) themeIconSun.classList.add('hidden');
      if (themeIconMoon) themeIconMoon.classList.remove('hidden');
    }
  };

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      applyTheme(!isDark);
    });
  }

  // ==========================================================================
  // 6. BACK TO TOP BUTTON
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 320) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 7. INTERACTIVE CLIPBOARD COPY (EMAIL & PHONE)
  // ==========================================================================
  window.copyToClipboard = (text, elementId) => {
    navigator.clipboard.writeText(text).then(() => {
      const badge = document.getElementById(elementId);
      if (badge) {
        const originalText = badge.innerText;
        badge.innerText = 'Copied! ✓';

        setTimeout(() => {
          badge.innerText = originalText;
        }, 2200);
      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // ==========================================================================
  // 8. CONTACT FORM SIMULATION
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Sending Message...
        `;
      }

      setTimeout(() => {
        if (formSuccess) {
          formSuccess.classList.remove('hidden');
        }
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Message Sent Successfully!</span>
            <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path></svg>
          `;

          setTimeout(() => {
            submitBtn.innerHTML = `
              <span>Send Message</span>
              <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2"></path></svg>
            `;
          }, 3500);
        }
      }, 700);
    });
  }

  // ==========================================================================
  // 9. CV MODAL CONTROLS
  // ==========================================================================
  const cvModal = document.getElementById('cvModal');
  window.openCVModal = () => {
    if (cvModal) {
      cvModal.classList.remove('hidden');
    }
  };

  window.closeCVModal = () => {
    if (cvModal) {
      cvModal.classList.add('hidden');
    }
  };

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        window.closeCVModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal && !cvModal.classList.contains('hidden')) {
      window.closeCVModal();
    }
  });
});
