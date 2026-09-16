/**
 * Portfolio Main JavaScript
 * Author: Ibnul Tahsin Rihan
 * Features:
 *  - Persistent Light/Dark Theme Switcher (with system preference fallback)
 *  - Responsive Mobile Navigation Drawer with Overlay & Scroll Locking
 *  - IntersectionObserver Active Section Highlighting
 *  - Smooth Scrolling with Navbar Offset
 *  - Scroll Reveal Micro-Animations (IntersectionObserver)
 *  - Robust Client-Side Form Validation & Formspree Submission Handling
 *  - Back-to-Top Floating Action Button
 */

'use strict';

// ==========================================================================
// 1. Theme Switcher Controller
// ==========================================================================
class ThemeManager {
    constructor() {
        this.toggleBtn = document.getElementById('themeToggle');
        this.htmlElement = document.documentElement;

        this.init();
    }

    init() {
        // Clear any old stored preference so the website always starts in dark mode
        try {
            localStorage.removeItem('portfolio-theme');
            localStorage.removeItem('portfolio_theme_mode');
        } catch (e) {}

        // Set website initially to dark mode
        this.setTheme('dark');

        // Allow user to switch to light mode and back
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        this.htmlElement.setAttribute('data-theme', theme);
        const isDark = theme === 'dark';

        if (this.toggleBtn) {
            this.toggleBtn.setAttribute('aria-checked', isDark ? 'true' : 'false');
            this.toggleBtn.setAttribute(
                'aria-label',
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }
    }

    toggleTheme() {
        const currentTheme = this.htmlElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// ==========================================================================
// 2. Navigation & Mobile Drawer Controller
// ==========================================================================
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navBackdrop = document.getElementById('navBackdrop');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');

        this.isOpen = false;
        this.init();
    }

    init() {
        // Hamburger click
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Backdrop click
        if (this.navBackdrop) {
            this.navBackdrop.addEventListener('click', () => this.closeMenu());
        }

        // Smooth scroll & close menu when clicking links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => this.handleAnchorClick(e));
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Scroll listener for active link & navbar shadow
        window.addEventListener('scroll', () => {
            this.handleScroll();
        }, { passive: true });

        this.initActiveSectionObserver();
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.navMenu?.classList.add('active');
        this.navToggle?.classList.add('active');
        this.navToggle?.setAttribute('aria-expanded', 'true');
        this.navBackdrop?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.isOpen = false;
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
        this.navToggle?.setAttribute('aria-expanded', 'false');
        this.navBackdrop?.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleAnchorClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href || !href.startsWith('#') || href === '#') return;

        const targetEl = document.querySelector(href);
        if (!targetEl) return;

        e.preventDefault();
        this.closeMenu();

        const navHeight = this.navbar?.offsetHeight || 72;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
            top: Math.max(0, targetPos),
            behavior: 'smooth'
        });
    }

    handleScroll() {
        if (!this.navbar) return;
        if (window.scrollY > 30) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    initActiveSectionObserver() {
        if (!('IntersectionObserver' in window)) return;

        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.navLinks.forEach((link) => {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        this.sections.forEach((sec) => observer.observe(sec));
    }
}

// ==========================================================================
// 3. Scroll Reveal Animations (IntersectionObserver)
// ==========================================================================
class ScrollAnimator {
    constructor() {
        this.init();
    }

    init() {
        const targets = [
            '.about-bio',
            '.feature-card',
            '.experience-card',
            '.skill-group',
            '.project-card',
            '.timeline-entry',
            '.activity-card',
            '.contact-channel-card',
            '.contact-form-panel'
        ];

        const elements = document.querySelectorAll(targets.join(', '));
        if (!elements.length) return;

        elements.forEach((el) => el.classList.add('fade-up'));

        if (!('IntersectionObserver' in window)) {
            elements.forEach((el) => el.classList.add('in-view'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach((el) => observer.observe(el));
    }
}

// ==========================================================================
// 4. Contact Form Validation & Formspree Submission
// ==========================================================================
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;

        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.subjectInput = document.getElementById('subject');
        this.messageInput = document.getElementById('message');
        this.submitBtn = document.getElementById('submitBtn');
        this.statusBox = document.getElementById('formStatus');

        this.init();
    }

    init() {
        // Real-time blur validation
        [this.nameInput, this.emailInput, this.subjectInput, this.messageInput].forEach((input) => {
            if (!input) return;
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('input-error')) {
                    this.validateField(input);
                }
            });
        });

        // Form submit handler
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(field) {
        const value = field.value.trim();
        const errorEl = document.getElementById(`${field.id}Error`);
        let isValid = true;
        let errorMessage = '';

        if (field.id === 'name') {
            if (!value) {
                isValid = false;
                errorMessage = 'Please enter your name.';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters.';
            }
        } else if (field.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                isValid = false;
                errorMessage = 'Please enter your email address.';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        } else if (field.id === 'subject') {
            if (!value) {
                isValid = false;
                errorMessage = 'Please provide a subject.';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Subject must be at least 3 characters.';
            }
        } else if (field.id === 'message') {
            if (!value) {
                isValid = false;
                errorMessage = 'Please enter your message.';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long.';
            }
        }

        if (!isValid) {
            field.classList.add('input-error');
            field.classList.remove('input-success');
            if (errorEl) errorEl.textContent = errorMessage;
        } else {
            field.classList.remove('input-error');
            field.classList.add('input-success');
            if (errorEl) errorEl.textContent = '';
        }

        return isValid;
    }

    validateAll() {
        const isNameValid = this.validateField(this.nameInput);
        const isEmailValid = this.validateField(this.emailInput);
        const isSubjectValid = this.validateField(this.subjectInput);
        const isMessageValid = this.validateField(this.messageInput);
        return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateAll()) {
            return;
        }

        // Set pending UI state
        const originalBtnText = this.submitBtn.innerHTML;
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = `
            <i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i>
            <span>Sending Message...</span>
        `;
        this.hideStatus();

        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showStatus('success', 'Thank you! Your message has been sent successfully. I will get back to you shortly.');
                this.form.reset();
                [this.nameInput, this.emailInput, this.subjectInput, this.messageInput].forEach((input) => {
                    input?.classList.remove('input-success', 'input-error');
                });
            } else {
                const data = await response.json().catch(() => ({}));
                const msg = data.errors ? data.errors.map(err => err.message).join(', ') : 'Oops! Something went wrong submitting the form.';
                this.showStatus('error', msg);
            }
        } catch (err) {
            this.showStatus('error', 'Unable to send message right now. Please email me directly at ibnultahsinrihan@gmail.com.');
        } finally {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = originalBtnText;
        }
    }

    showStatus(type, message) {
        if (!this.statusBox) return;
        this.statusBox.textContent = message;
        this.statusBox.className = `form-status ${type}`;
    }

    hideStatus() {
        if (!this.statusBox) return;
        this.statusBox.className = 'form-status';
        this.statusBox.textContent = '';
    }
}

// ==========================================================================
// 5. Back to Top Button Controller
// ==========================================================================
class BackToTopManager {
    constructor() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, { passive: true });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================================================
// 6. Application Bootstrap
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new ScrollAnimator();
    new ContactFormHandler();
    new BackToTopManager();
    console.log('Portfolio application loaded successfully. Theme & interactions initialized.');
});
