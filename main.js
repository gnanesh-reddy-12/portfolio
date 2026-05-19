document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const hiddenElements = document.querySelectorAll(
    ".hidden-left, .hidden-right"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.5
});

hiddenElements.forEach((el) => observer.observe(el));

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

function callData() {  
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => { 
            console.log(data);    
            document.getElementById('api-data').innerHTML = data[0].body;
        }
    );
}
