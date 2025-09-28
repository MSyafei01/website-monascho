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
        this.initContactForm();
        this.initTestimonials();
        this.initProductButtons();
    }
    
    setupLoadingScreen() {
        // Only run if loading screen exists (homepage)
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                }, 2000);
            });
        }
    }
    
    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            // Debug info
            console.log('Navigation elements found:', { hamburger, navMenu });
            
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
                
                // Prevent body scroll when menu is open on mobile
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking on links (for single page navigation)
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    document.body.style.overflow = '';
                });
            });
        } else {
            console.log('Navigation elements not found on this page');
        }
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                const scrolled = window.scrollY > 100;
                navbar.classList.toggle('scrolled', scrolled);
            }
        });
    }
    
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (!themeToggle) {
            console.log('Theme toggle not found on this page');
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
            
            console.log('Theme changed to:', this.currentTheme);
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
    }
    
    initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        if (counters.length > 0) {
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
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    initAnimations() {
        // Simple scroll animations for all pages
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Stagger children animations if they exist
                    const staggeredItems = entry.target.querySelectorAll('.stagger-item');
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
        
        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in, .stagger-item');
        animatedElements.forEach(el => observer.observe(el));
        
        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
    
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            console.log('Contact form found, initializing...');
            
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: document.getElementById('name')?.value,
                    email: document.getElementById('email')?.value,
                    phone: document.getElementById('phone')?.value,
                    message: document.getElementById('message')?.value
                };
                
                // Validate form
                if (this.validateForm(formData)) {
                    this.simulateFormSubmission(contactForm);
                }
            });
        }
    }
    
    validateForm(formData) {
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
        
        if (!formData.message?.trim()) {
            alert('Pesan harus diisi');
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    simulateFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            alert('Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    initTestimonials() {
        // Testimonial auto-cycling (if testimonials exist on page)
        const testimonials = document.querySelectorAll('.testimonial-card');
        
        if (testimonials.length > 0) {
            console.log('Testimonials found, initializing auto-cycle...');
            
            // Simulate automatic cycling for testimonials
            setInterval(() => {
                testimonials.forEach(card => {
                    card.classList.remove('highlight');
                });
                
                const randomIndex = Math.floor(Math.random() * testimonials.length);
                testimonials[randomIndex].classList.add('highlight');
            }, 5000);
        }
    }
    
    initProductButtons() {
        // Product order buttons (if exist on page)
        const orderButtons = document.querySelectorAll('.btn-primary');
        
        orderButtons.forEach(button => {
            if (button.textContent.includes('Pesan') || button.textContent.includes('Order')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productName = button.closest('.product-card')?.querySelector('h3')?.textContent || 'Produk';
                    this.handleProductOrder(productName);
                });
            }
        });
    }
    
    handleProductOrder(productName) {
        // Redirect to WhatsApp or show order modal
        const phoneNumber = '6281336399889'; // Ganti dengan nomor WhatsApp bisnis
        const message = `Halo, saya ingin memesan ${productName}. Bisa info lebih lanjut?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Bisa pilih salah satu:
        // 1. Redirect ke WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // 2. Atau show confirmation dialog dulu
        /*
        if (confirm(`Anda akan memesan ${productName}. Lanjutkan ke WhatsApp?`)) {
            window.open(whatsappUrl, '_blank');
        }
        */
    }
    
    // Utility function untuk throttle
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
    
    // Utility function untuk debounce
    debounce(func, wait, immediate) {
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
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Monascho Herbal Application...');
    new MonaschoApp();
});

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MonaschoApp;
}