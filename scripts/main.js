// Enhanced Main JavaScript with Modern Features
class MonaschoApp {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }
    
    init() {
        this.setupLoadingScreen();
        this.initNavigation();
        this.initAnimations();
        this.initTheme();
        this.initCounters();
        this.initScrollEffects();
        this.initParallax();
    }
    
    setupLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.loading-screen').classList.add('hidden');
                
                // Initialize particles after loading
                setTimeout(() => {
                    if (typeof ParticleSystem !== 'undefined') {
                        new ParticleSystem();
                    }
                }, 500);
            }, 2000);
        });
    }
    
    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Enhanced scroll effect
        window.addEventListener('scroll', this.throttle(() => {
            const navbar = document.querySelector('.navbar');
            const scrolled = window.scrollY > 100;
            
            navbar.classList.toggle('scrolled', scrolled);
            navbar.style.background = scrolled ? 
                'rgba(255, 255, 255, 0.98)' : 
                'rgba(255, 255, 255, 0.95)';
        }, 10));
    }
    
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('monascho-theme') || 'light';
        
        this.setTheme(savedTheme);
        
        themeToggle?.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(this.currentTheme);
            localStorage.setItem('monascho-theme', this.currentTheme);
        });
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = document.querySelector('#themeToggle i');
        
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    initScrollEffects() {
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Section reveal animations
        this.initScrollAnimations();
    }
    
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Stagger children animations
                    const children = entry.target.querySelectorAll('.stagger-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('revealed');
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
    
    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new MonaschoApp();
});



// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Initialize Application
function initApp() {
    // Hide loading screen after content is loaded
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hidden');
    }, 1500);
    
    // Initialize navigation
    initNavigation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize testimonials slider
    initTestimonials();
}

// Navigation Functions
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    });
}

// Animation Functions
function initAnimations() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If element has staggered children, animate them
                const staggeredItems = entry.target.querySelectorAll('.staggered-item');
                if (staggeredItems.length > 0) {
                    staggeredItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in').forEach(el => {
        observer.observe(el);
    });
    
    // Observe sections for staggered animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Contact Form Functions
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Simulate form submission
                simulateFormSubmission(contactForm);
            }
        });
    }
}

function validateForm(formData) {
    // Simple validation
    if (!formData.name.trim()) {
        alert('Nama lengkap harus diisi');
        return false;
    }
    
    if (!formData.email.trim()) {
        alert('Alamat email harus diisi');
        return false;
    }
    
    if (!isValidEmail(formData.email)) {
        alert('Format email tidak valid');
        return false;
    }
    
    if (!formData.message.trim()) {
        alert('Pesan harus diisi');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        alert('Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Testimonials Functions
function initTestimonials() {
    // This would be replaced with a real slider implementation
    // For now, we're just using CSS grid for layout
    
    // Simulate automatic cycling for testimonials
    setInterval(() => {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length > 0) {
            testimonials.forEach(card => {
                card.classList.remove('animate-pulse');
            });
            
            const randomIndex = Math.floor(Math.random() * testimonials.length);
            testimonials[randomIndex].classList.add('animate-pulse');
        }
    }, 5000);
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initApp,
        initNavigation,
        initAnimations,
        initContactForm,
        initTestimonials,
        validateForm,
        isValidEmail,
        debounce
    };
}

