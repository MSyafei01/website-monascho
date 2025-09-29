// Monascho Herbal - Main JavaScript
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
    this.initContactForm();
    this.initProductButtons();
    this.initProductInteractions();
    this.initWhatsAppRedirect(); // Untuk social media WhatsApp
    this.initImageFallbacks();   // Fallback jika gambar error
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
            });
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.toggle('scrolled', window.scrollY > 100);
            }
        });
    }
    

    // Enhanced Product Interactions
initProductInteractions() {
    // Detail button functionality
    document.querySelectorAll('.detail-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            this.showProductDetail(productName);
        });
    });
    
    // Add to cart animation
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Add animation feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Ditambahkan!';
            button.style.background = 'var(--primary-dark)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
        });
    });
}

showProductDetail(productName) {
    // Simple detail modal (bisa dikembangkan lebih lanjut)
    alert(`Detail produk: ${productName}\n\nFitur ini akan menampilkan informasi lengkap tentang produk ${productName}.`);
}

    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('monascho-theme') || 'light';
        
        this.currentTheme = savedTheme;
        this.setTheme(this.currentTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(this.currentTheme);
                localStorage.setItem('monascho-theme', this.currentTheme);
            });
        }
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
        if (counters.length === 0) return;
        
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
        
        // Smooth scrolling for navigation
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
    
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            if (this.validateForm(formData)) {
                this.simulateFormSubmission(contactForm);
            }
        });
    }
    
    validateForm(formData) {
        if (!formData.name.trim()) {
            alert('Nama lengkap harus diisi');
            return false;
        }
        if (!formData.email.trim()) {
            alert('Alamat email harus diisi');
            return false;
        }
        if (!this.isValidEmail(formData.email)) {
            alert('Format email tidak valid');
            return false;
        }
        if (!formData.message.trim()) {
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
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    initProductButtons() {
        // Product order buttons
        document.querySelectorAll('.order-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productName = button.getAttribute('data-product');
                this.handleProductOrder(productName);
            });
        });
    }
    
    handleProductOrder(productName) {
        const phoneNumber = '6282139831330';
        const message = `Halo, saya ingin memesan ${productName}. Bisa info lebih lanjut?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new MonaschoApp();
});