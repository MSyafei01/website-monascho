// Enhanced Main JavaScript with Modern Features
class MonaschoApp {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }
    
    init() {
        this.setupLoadingScreen();
        this.initNavigation();
        this.initTheme();
        this.initCounters();
        this.initScrollEffects();
        this.initAnimations();
    }
    
    setupLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.querySelector('.loading-screen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
            }, 2000);
        });
    }
    
    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                });
            });
        }
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                const scrolled = window.scrollY > 100;
                navbar.classList.toggle('scrolled', scrolled);
                navbar.style.background = scrolled ? 
                    'rgba(255, 255, 255, 0.98)' : 
                    'rgba(255, 255, 255, 0.95)';
            }
        });
    }
    
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) {
            console.error('Theme toggle button not found!');
            return;
        }
        
        // Get saved theme or default to light
        const savedTheme = localStorage.getItem('monascho-theme') || 'light';
        this.currentTheme = savedTheme;
        this.setTheme(this.currentTheme);
        
        // Add click event
        themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(this.currentTheme);
            localStorage.setItem('monascho-theme', this.currentTheme);
        });
        
        console.log('Theme system initialized. Current theme:', this.currentTheme);
    }
    
    setTheme(theme) {
        // Set data-theme attribute on html element
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update icon
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            if (theme === 'light') {
                icon.className = 'fas fa-moon';
                icon.setAttribute('title', 'Switch to Dark Mode');
            } else {
                icon.className = 'fas fa-sun';
                icon.setAttribute('title', 'Switch to Light Mode');
            }
        }
        
        console.log('Theme changed to:', theme);
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
        if (backToTop) {
            window.addEventListener('scroll', () => {
                backToTop.classList.toggle('visible', window.scrollY > 500);
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    
    initAnimations() {
        // Simple scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.fade-in, .slide-in, .zoom-in').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Monascho App...');
    new MonaschoApp();
});

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name')?.value,
                email: document.getElementById('email')?.value,
                phone: document.getElementById('phone')?.value,
                message: document.getElementById('message')?.value
            };
            
            if (this.validateForm(formData)) {
                this.simulateFormSubmission(contactForm);
            }
        }.bind(this));
    }
}

function validateForm(formData) {
    if (!formData.name?.trim()) {
        alert('Nama lengkap harus diisi');
        return false;
    }
    
    if (!formData.email?.trim()) {
        alert('Alamat email harus diisi');
        return false;
    }
    
    if (!this.isValidEmail(formData.email)) {
        alert('Format email tidak valid');
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
    
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}