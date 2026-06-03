// ============================================
// SMOOTH SCROLL & MODERN GESTURES
// ============================================

// Smooth scroll with enhanced animations
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (docHeight - windowHeight)) * 100;
    
    // Create progress bar if it doesn't exist
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
}

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation for list items
            if (entry.target.classList.contains('project-showcase')) {
                entry.target.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
            }
            // Stagger animation for skill tags
            if (entry.target.classList.contains('skill-tags')) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach((span, i) => {
                    span.style.animation = `fadeInUp 0.6s ease-out ${i * 0.05}s both`;
                });
            }
            // Stagger animation for experience/education items
            if (entry.target.classList.contains('experience-item') || 
                entry.target.classList.contains('education-item')) {
                entry.target.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
            }
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll(
    '.project-showcase, .skill-tags, .experience-item, .education-item, .hidden-left, .hidden-right'
).forEach(el => observer.observe(el));

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    updateScrollProgress();
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ============================================
// CURSOR ENHANCEMENT
// ============================================
document.addEventListener('mousemove', (e) => {
    const buttons = document.querySelectorAll('.resume, .gmail, .social, .project-btn, .contact-btn, .mini-box');
    buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--mouse-x', `${x}px`);
        btn.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ============================================
// RESUME LINK UPDATE
// ============================================
document.getElementById("resume-link").href =
"./files/Gnanesh_Reddy_Resume.pdf?v=" + new Date().getTime();

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");
const menuIcon = mobileMenu.querySelector(".mobile-menu-icon");

function closeMobileMenu() {
    navLinks.classList.remove("active");
    mobileMenu.classList.remove("open");
    menuIcon.textContent = "⚌";
    mobileMenu.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-label", "Open menu");
}

function openMobileMenu() {
    navLinks.classList.add("active");
    mobileMenu.classList.add("open");
    menuIcon.textContent = "✕";
    mobileMenu.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-label", "Close menu");
}

mobileMenu.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// ============================================
// API CALL FUNCTION
// ============================================
function callData() {  
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => { 
            console.log(data);    
            document.getElementById('api-data').innerHTML = data[0].body;
        }
    );
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
