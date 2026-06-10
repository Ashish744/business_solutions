// ============================================
// GLOBAL FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeDashboardEvents();
});

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Handle mobile nav menu
            const navLinks = document.querySelector('.nav-links');
            const navButtons = document.querySelector('.nav-buttons');
            
            if (navLinks && navButtons) {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                navButtons.style.display = navButtons.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
        });
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar && !sidebar.contains(e.target) && 
            (!menuToggle || !menuToggle.contains(e.target))) {
            sidebar.classList.remove('active');
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = entry.target.style.animation;
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.feature-card, .pricing-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// DASHBOARD EVENTS
// ============================================

function initializeDashboardEvents() {
    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            alert('No new notifications');
        });
    }

    // User profile
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            alert('Profile menu would open here');
        });
    }

    // Quick action cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            const action = this.querySelector('h4').textContent;
            alert(action + ' feature is being implemented...');
        });
    });

    // Activity view all
    const viewAll = document.querySelector('.view-all');
    if (viewAll) {
        viewAll.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Loading all activities...');
        });
    }

    // Generate report button
    const reportBtn = document.querySelector('.welcome-section .btn-primary');
    if (reportBtn) {
        reportBtn.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') {
                alert('Generating report... This will be downloaded shortly.');
            }
        });
    }
}

// ============================================
// NAVBAR ACTIVE LINK
// ============================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// ============================================
// PAGE SCROLL ANIMATION EFFECT
// ============================================

let scrolling = false;

window.addEventListener('scroll', function() {
    if (scrolling) return;
    
    scrolling = true;
    
    requestAnimationFrame(function() {
        const scrollTop = window.scrollY;
        
        // Parallax effect
        document.querySelectorAll('[data-parallax]').forEach(element => {
            const parallaxValue = element.getAttribute('data-parallax');
            element.style.transform = `translateY(${scrollTop * parallaxValue}px)`;
        });
        
        scrolling = false;
    });
});

// ============================================
// HOVER EFFECTS WITH MOUSE TRACKING
// ============================================

document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        this.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    });
});

// ============================================
// ANIMATION ON LOAD
// ============================================

window.addEventListener('load', function() {
    // Add animation class to elements
    document.querySelectorAll('[class*="fade"], [class*="slide"]').forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, index * 50);
    });
});

// ============================================
// RIPPLE EFFECT FOR BUTTONS
// ============================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Only add ripple for buttons with class 'btn'
        if (this.classList.contains('btn')) {
            // Effect already handled by ::before pseudo-element
        }
    });
});

// ============================================
// NOTIFICATION ANIMATION
// ============================================

function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#00b894' : '#ff4757'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ============================================
// FEATURE CARD INTERACTION
// ============================================

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when element is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const targets = entry.target.querySelectorAll('.stat-value');
            targets.forEach(target => {
                const value = parseInt(target.textContent.replace(/[^0-9]/g, ''));
                if (!isNaN(value)) {
                    animateCounter(target, value);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-grid').forEach(grid => observer.observe(grid));

// ============================================
// RESPONSIVE NAVBAR MENU
// ============================================

window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        const navLinks = document.querySelector('.nav-links');
        const navButtons = document.querySelector('.nav-buttons');
        if (navLinks) navLinks.style.display = 'flex';
        if (navButtons) navButtons.style.display = 'flex';
    }
});

// ============================================
// DARK MODE TOGGLE (Optional)
// ============================================

function initializeDarkModeToggle() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Create toggle button if needed
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: white;
        cursor: pointer;
        z-index: 999;
        display: none;
    `;

    // Uncomment to enable dark mode toggle
    // document.body.appendChild(darkModeToggle);
}

// ============================================
// FORM INPUT ANIMATION
// ============================================

document.querySelectorAll('.input-wrapper input, .input-wrapper select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 0 0 3px rgba(108, 92, 231, 0.1)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = 'none';
    });

    input.addEventListener('input', function() {
        if (this.value) {
            this.style.backgroundColor = 'white';
        } else {
            this.style.backgroundColor = 'var(--light-bg)';
        }
    });
});

// ============================================
// CUSTOM DIV/SPAN DROPDOWN
// ============================================

function initializeCustomDropdown() {
    const triggers = document.querySelectorAll('.dropdown-trigger');
    
    triggers.forEach(trigger => {
        const wrapperId = trigger.id;
        const optionsId = wrapperId + 'Options';
        const optionsContainer = document.getElementById(optionsId);
        const options = optionsContainer ? optionsContainer.querySelectorAll('span.option') : [];
        
        if (!optionsContainer || options.length === 0) return;
        
        // Handle dropdown toggle
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-options.active').forEach(active => {
                if (active !== optionsContainer) {
                    active.classList.remove('active');
                }
            });
            
            optionsContainer.classList.toggle('active');
        });
        
        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const value = this.getAttribute('value');
                const text = this.textContent;
                
                // Update display text
                const displaySpan = trigger.querySelector('.dropdown-display');
                if (displaySpan) {
                    displaySpan.textContent = text;
                }
                
                // Update selected state
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Close dropdown
                optionsContainer.classList.remove('active');
                
                // Dispatch change event
                const event = new Event('change', { bubbles: true });
                event.selectedValue = value;
                trigger.dispatchEvent(event);
            });
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.select-wrapper')) {
            document.querySelectorAll('.dropdown-options.active').forEach(active => {
                active.classList.remove('active');
            });
        }
    });
    
    // Handle keyboard navigation
    triggers.forEach(trigger => {
        trigger.addEventListener('keydown', function(e) {
            const wrapperId = this.id;
            const optionsId = wrapperId + 'Options';
            const optionsContainer = document.getElementById(optionsId);
            
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                optionsContainer.classList.toggle('active');
            }
            if (e.key === 'Escape') {
                optionsContainer.classList.remove('active');
            }
        });
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCustomDropdown);
} else {
    initializeCustomDropdown();
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// PAGINATION HELPER
// ============================================

function paginateArray(array, itemsPerPage) {
    const pages = [];
    for (let i = 0; i < array.length; i += itemsPerPage) {
        pages.push(array.slice(i, i + itemsPerPage));
    }
    return pages;
}

// ============================================
// EXPORT DATA HELPER
// ============================================

function exportToCSV(data, filename = 'data.csv') {
    const csv = data.map(row => 
        Object.values(row).map(value => `"${value}"`).join(',')
    ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// ============================================
// DEBOUNCE FUNCTION FOR SEARCH
// ============================================

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Apply to search input
const searchInput = document.querySelector('.header-search input');
if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
        console.log('Searching for:', e.target.value);
        // Add search functionality here
    }, 300));
}

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

// Add keyboard navigation
document.querySelectorAll('.nav-link, .btn, .feature-card').forEach(element => {
    element.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.tagName !== 'BUTTON') {
            this.click();
        }
    });
});

// ============================================
// THEME COLOR ANIMATION
// ============================================

function animateGradient(element) {
    let angle = 0;
    setInterval(() => {
        angle += 1;
        if (element.classList.contains('gradient-animation')) {
            element.style.backgroundImage = `linear-gradient(${angle}deg, var(--primary-color), #5c4ab8)`;
        }
    }, 50);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format currency
function formatCurrency(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(value);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Get time ago
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize dark mode toggle
initializeDarkModeToggle();

console.log('✓ ProBiz Solutions - All features initialized successfully!');
