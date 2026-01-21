/**
 * Main JavaScript File
 * Handles navigation, scroll effects, form validation, and animations
 */

// ===================================
// Utility Functions
// ===================================

/**
 * Debounce function to limit how often a function is called
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===================================
// Navigation Functionality
// ===================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Scroll event for navbar style
        window.addEventListener('scroll', debounce(() => this.handleScroll()));
        
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavLinkClick(e));
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Update active link on scroll
        window.addEventListener('scroll', debounce(() => this.updateActiveLink(), 100));
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }
    
    handleNavLinkClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        
        // Close mobile menu
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        
        // Smooth scroll to section
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = this.navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    handleOutsideClick(e) {
        if (!this.navMenu.contains(e.target) && 
            !this.navToggle.contains(e.target) && 
            this.navMenu.classList.contains('active')) {
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
        }
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===================================
// Scroll Animations
// ===================================

class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }
    
    init() {
        // Add fade-in class to elements that should animate
        const elementsToAnimate = [
            '.skill-category',
            '.project-card',
            '.timeline-item',
            '.activity-card',
            '.contact-card'
        ];
        
        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.classList.add('fade-in');
                this.animatedElements.push(el);
            });
        });
        
        // Check on scroll
        window.addEventListener('scroll', debounce(() => this.checkElements(), 50));
        
        // Check on load
        this.checkElements();
    }
    
    checkElements() {
        this.animatedElements.forEach(element => {
            if (this.isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * 0.85;
    }
}

// ===================================
// Skills Progress Bars Animation
// ===================================

class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.animated = false;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', debounce(() => this.animateSkills(), 50));
        this.animateSkills(); // Check on load
    }
    
    animateSkills() {
        if (this.animated) return;
        
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        
        const rect = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight * 0.75) {
            this.animated = true;
            
            this.skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 100);
            });
        }
    }
}

// ===================================
// Contact Form Handling
// ===================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.formStatus = document.getElementById('formStatus');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validate
        if (!this.validateForm(data)) {
            this.showStatus('Please fill in all fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        try {
            // In production, send to your backend or email service
            await this.simulateFormSubmission(data);
            
            this.showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
        } catch (error) {
            this.showStatus('Something went wrong. Please try again or email me directly.', 'error');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    }
    
    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return (
            data.name.trim().length >= 2 &&
            emailRegex.test(data.email) &&
            data.subject.trim().length >= 3 &&
            data.message.trim().length >= 10
        );
    }
    
    showStatus(message, type) {
        this.formStatus.textContent = message;
        this.formStatus.className = `form-status ${type}`;
        
        setTimeout(() => {
            this.formStatus.className = 'form-status';
        }, 5000);
    }
    
    simulateFormSubmission(data) {
        return new Promise((resolve) => {
            // Log form data (remove in production)
            console.log('Form submitted:', data);
            
            // Simulate network delay
            setTimeout(resolve, 1500);
        });
    }
}

// ===================================
// Back to Top Button
// ===================================

class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        window.addEventListener('scroll', debounce(() => this.toggleVisibility(), 100));
        this.button.addEventListener('click', () => this.scrollToTop());
    }
    
    toggleVisibility() {
        if (window.scrollY > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ===================================
// Smooth Scroll for All Links
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Type Writer Effect (Optional Enhancement)
// ===================================

class TypeWriter {
    constructor(element, words, period = 2000) {
        this.element = element;
        this.words = words;
        this.period = period;
        this.text = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.text = currentWord.substring(0, this.text.length - 1);
        } else {
            this.text = currentWord.substring(0, this.text.length + 1);
        }
        
        this.element.textContent = this.text;
        
        let typeSpeed = this.isDeleting ? 50 : 100;
        
        if (!this.isDeleting && this.text === currentWord) {
            typeSpeed = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===================================
// Performance Optimization
// ===================================

/**
 * Lazy load images when they come into view
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// Initialize Everything
// ===================================

function init() {
    console.log('Portfolio initialized successfully! 🚀');
    
    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new SkillsAnimation();
    new ContactForm();
    new BackToTop();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize lazy loading (if needed)
    initLazyLoading();
    
    // Optional: Add typewriter effect to hero subtitle
    // Uncomment to enable
    /*
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const words = ['Frontend Developer', 'UI Implementer', 'MERN Stack Enthusiast'];
        new TypeWriter(heroSubtitle, words, 3000);
    }
    */
}

// ===================================
// Run on DOM Ready
// ===================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===================================
// Handle Page Visibility Changes
// ===================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back soon! 👋';
    } else {
        document.title = 'Ibnul Tahsin Rihan | Frontend Developer';
    }
});

// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// Handle External Links
// ===================================

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        e.target.setAttribute('rel', 'noopener noreferrer');
    }
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        ScrollAnimations,
        SkillsAnimation,
        ContactForm,
        BackToTop,
        TypeWriter
    };
}
