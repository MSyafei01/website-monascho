// Advanced Animation Functions
class ScrollAnimator {
    constructor() {
        this.animatedElements = [];
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.bindEvents();
        this.checkElements();
    }
    
    cacheElements() {
        this.animatedElements = document.querySelectorAll('[data-animate]');
    }
    
    bindEvents() {
        window.addEventListener('scroll', debounce(() => {
            this.checkElements();
        }, 10));
        
        window.addEventListener('resize', debounce(() => {
            this.checkElements();
        }, 250));
    }
    
    checkElements() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        this.animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Check if element is in viewport
            if (elementBottom >= windowTop && elementTop <= windowBottom) {
                this.animateElement(element);
            }
        });
    }
    
    animateElement(element) {
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
            element.classList.add('animated', animationType);
            
            // Remove event listener after animation
            element.removeAttribute('data-animate');
        }, delay);
    }
}

// Parallax Effect
class ParallaxScroller {
    constructor() {
        this.parallaxElements = [];
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.bindEvents();
    }
    
    cacheElements() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
    }
    
    bindEvents() {
        window.addEventListener('scroll', () => {
            this.scrollHandler();
        });
    }
    
    scrollHandler() {
        const scrollTop = window.pageYOffset;
        
        this.parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrollTop * speed);
            
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
}

// Typewriter Effect
class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.text = this.element.textContent;
        this.speed = options.speed || 100;
        this.delay = options.delay || 1000;
        this.loop = options.loop || false;
        
        this.init();
    }
    
    init() {
        this.element.textContent = '';
        setTimeout(() => {
            this.type();
        }, this.delay);
    }
    
    type() {
        let i = 0;
        const timer = setInterval(() => {
            if (i < this.text.length) {
                this.element.textContent += this.text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                if (this.loop) {
                    setTimeout(() => {
                        this.delete();
                    }, this.delay);
                }
            }
        }, this.speed);
    }
    
    delete() {
        let i = this.text.length;
        const timer = setInterval(() => {
            if (i > 0) {
                this.element.textContent = this.text.substring(0, i - 1);
                i--;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    this.type();
                }, this.delay);
            }
        }, this.speed / 2);
    }
}

// Counter Animation
class Counter {
    constructor(element, options = {}) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-count')) || 0;
        this.duration = options.duration || 2000;
        this.delay = options.delay || 0;
        this.formatter = options.formatter || (value => value);
        
        this.init();
    }
    
    init() {
        this.element.textContent = this.formatter(0);
        
        setTimeout(() => {
            this.animate();
        }, this.delay);
    }
    
    animate() {
        let start = 0;
        const increment = this.target / (this.duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            
            if (start >= this.target) {
                this.element.textContent = this.formatter(this.target);
                clearInterval(timer);
            } else {
                this.element.textContent = this.formatter(Math.floor(start));
            }
        }, 16);
    }
}

// Initialize Advanced Animations
function initAdvancedAnimations() {
    // Initialize scroll animations
    const scrollAnimator = new ScrollAnimator();
    
    // Initialize parallax effects
    const parallaxScroller = new ParallaxScroller();
    
    // Initialize typewriter effects
    document.querySelectorAll('[data-typewriter]').forEach(element => {
        const options = {
            speed: parseInt(element.getAttribute('data-speed')) || 100,
            delay: parseInt(element.getAttribute('data-delay')) || 1000,
            loop: element.getAttribute('data-loop') === 'true'
        };
        
        new Typewriter(element, options);
    });
    
    // Initialize counter animations
    document.querySelectorAll('[data-count]').forEach(element => {
        const options = {
            duration: parseInt(element.getAttribute('data-duration')) || 2000,
            delay: parseInt(element.getAttribute('data-delay')) || 0
        };
        
        new Counter(element, options);
    });
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollAnimator,
        ParallaxScroller,
        Typewriter,
        Counter,
        initAdvancedAnimations
    };
}