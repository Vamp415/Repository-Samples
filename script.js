// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards for scroll animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe other sections
    const sections = document.querySelectorAll('.section-header, .about-text, .contact-content');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
});

// Portfolio preview functions
function openPreview(portfolioNumber) {
    const modal = document.getElementById('previewModal');
    const modalTitle = document.getElementById('modalTitle');
    const previewFrame = document.getElementById('previewFrame');
    
    const portfolioData = {
        1: {
            title: 'Portfolio #01 - Modern Professional',
            url: '1/index.html'
        },
        2: {
            title: 'Portfolio #02 - Particle Animation',
            url: '2/index.html'
        },
        3: {
            title: 'Portfolio #03 - Minimal Clean',
            url: '3/index.html'
        },
        4: {
            title: 'Portfolio #04 - Professional Structure',
            url: '4/index.html'
        },
        5: {
            title: 'Portfolio #05 - Rich Media',
            url: '5/index.html'
        },
        6: {
            title: 'Portfolio #06 - Multi-page Blog',
            url: '6/index.html'
        },
        7: {
            title: 'Portfolio #07 - Creative Visual',
            url: '7/index.html'
        }
    };
    
    const portfolio = portfolioData[portfolioNumber];
    if (portfolio) {
        modalTitle.textContent = portfolio.title;
        previewFrame.src = portfolio.url;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closePreview() {
    const modal = document.getElementById('previewModal');
    const previewFrame = document.getElementById('previewFrame');
    
    modal.style.display = 'none';
    previewFrame.src = '';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        closePreview();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePreview();
    }
});

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const iframe = card.querySelector('iframe');
        
        card.addEventListener('mouseenter', function() {
            // Add subtle scale animation
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        if (!isNaN(target)) {
            const increment = target / 200;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.ceil(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 10);
        }
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Loading animation for iframes
document.addEventListener('DOMContentLoaded', function() {
    const iframes = document.querySelectorAll('.project-preview iframe');
    
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.5s ease';
    });
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 1000);
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add smooth reveal animations
function addRevealAnimations() {
    const revealElements = document.querySelectorAll('.project-info, .tech-item, .contact-link');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        revealObserver.observe(element);
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', addRevealAnimations);
