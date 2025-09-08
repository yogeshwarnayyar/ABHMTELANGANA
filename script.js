// AKHIL BHARAT HINDU MAHASABHA TELANGANA - Dynamic Website Scripts
// Enhanced Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for smooth appearance
    document.body.classList.add('loaded');
    
    // Initialize animated header
    initAnimatedHeader();
    
    // Smooth scroll behavior for navigation links
    document.querySelectorAll('.nav-item[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dynamic navbar background on scroll
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (nav) {
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 8px 32px rgba(255, 153, 51, 0.15)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
            }

            // Auto-hide navbar on mobile scroll down
            if (window.innerWidth <= 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    nav.style.transform = 'translateY(0)';
                }
            }
        }
        
        lastScrollY = currentScrollY;
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Enhanced smooth scrolling with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100; // Account for fixed animated header
                const elementPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.initiative-card, .leader, .section-title, .hero-title, .mission-statement'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Touch gestures for mobile menu
    if ('ontouchstart' in window && navLinks) {
        let startX, startY;
        
        navLinks.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        navLinks.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Swipe up to close menu
            if (Math.abs(diffY) > Math.abs(diffX) && diffY > 50) {
                navLinks.classList.remove('mobile-active');
                if (menuIcon) {
                    menuIcon.textContent = '☰';
                    menuIcon.style.transform = 'rotate(0deg)';
                }
            }
            
            startX = null;
            startY = null;
        });
    }

    // Resize handler for responsive behavior
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (navLinks) {
                navLinks.classList.remove('mobile-active');
            }
            if (menuIcon) {
                menuIcon.textContent = '☰';
                menuIcon.style.transform = 'rotate(0deg)';
            }
            if (nav) {
                nav.style.transform = 'translateY(0)';
            }
        }
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Dynamic loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Staggered animation for cards
        setTimeout(() => {
            document.querySelectorAll('.initiative-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 100);
            });
        }, 500);
    });

    // Typing effect for hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        heroTagline.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    heroTagline.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80);
                }
            };
            typeWriter();
        }, 1500);
    }

    // Enhanced button interactions
    document.querySelectorAll('.cta-button, .nav-item').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Page visibility API for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when tab is not visible
            document.querySelectorAll('.animated-element').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            // Resume animations when tab becomes visible
            document.querySelectorAll('.animated-element').forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
});

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Animated Header Functionality
function initAnimatedHeader() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    // Reset the animation if needed
    setTimeout(() => {
        // Remove the typing cursor after animation completes
        setTimeout(() => {
            typingText.style.borderRight = 'none';
        }, 6000);
        
        // Add enhanced hover effect after typing completes
        setTimeout(() => {
            typingText.addEventListener('mouseenter', function() {
                this.style.animation = 'typing 5s steps(40, end) 0.5s forwards, glow-pulse 0.8s ease-in-out infinite';
            });
            
            typingText.addEventListener('mouseleave', function() {
                this.style.animation = 'typing 5s steps(40, end) 0.5s forwards, glow-pulse 1.5s ease-in-out infinite';
            });
        }, 6500);
    }, 100);
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}
