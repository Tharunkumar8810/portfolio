/* ============================================
   PORTFOLIO — JAVASCRIPT
   ============================================
   
   This file handles:
   1. Dark Mode toggle (with localStorage persistence)
   2. Navbar scroll effect (subtle shadow when scrolled)
   3. Active nav link highlighting on scroll
   4. Scroll Reveal animation (elements fade in as you scroll down)
*/

// ============================================
// 1. DARK MODE TOGGLE
// ============================================
/*
   localStorage → A browser API that stores data as key-value pairs.
   Data persists even after closing the browser (unlike sessionStorage).
   
   localStorage.getItem('key')    → Read a saved value
   localStorage.setItem('key', 'value') → Save a value
   
   We use it to remember if the user chose dark mode, so it stays
   dark when they come back or refresh the page.
*/
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// On page load: check if user previously chose dark mode
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// When the toggle button is clicked, switch themes
themeToggle.addEventListener('click', () => {
    /*
       classList.toggle('dark-mode') → If the class is present, REMOVE it.
       If it's absent, ADD it. One line to switch between two states!
    */
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});


// ============================================
// 2. NAVBAR SCROLL EFFECT
// ============================================
/*
   window.addEventListener('scroll', callback)
   → Fires the callback function every time the user scrolls.
   
   window.scrollY → How many pixels the page has been scrolled down.
   If scrollY > 50, the user has scrolled enough to add a shadow.
*/
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ============================================
// 3. ACTIVE NAV LINK ON SCROLL
// ============================================
/*
   This script checks which section is currently in view as the
   user scrolls, and highlights the corresponding nav link.
   
   querySelectorAll() → Returns a NodeList (like an array) of ALL elements
   matching the CSS selector.
   
   section.offsetTop → The distance (in px) from the top of the page
   to the top of that section.
*/
const sections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('#navbar .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


// ============================================
// 4. SCROLL REVEAL ANIMATION
// ============================================
/*
   IntersectionObserver → A browser API that efficiently watches elements
   and tells you when they enter or leave the viewport (the visible area).
   
   MUCH better than scroll events for this because:
   - It's optimized by the browser (doesn't fire on every pixel of scroll)
   - The callback only runs when visibility actually CHANGES
   
   Options:
   - threshold: 0.15 → Trigger when 15% of the element is visible
   - rootMargin: '0px 0px -50px 0px' → Shrinks the detection area by 50px
     at the bottom, so elements trigger slightly before they're fully visible
   
   entry.isIntersecting → true when the element enters the viewport
   entry.target → the actual DOM element being observed
*/
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing after reveal (saves resources)
            // revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// Start observing all elements with class "reveal"
revealElements.forEach(el => revealObserver.observe(el));


// ============================================
// 5. CLOSE OFFCANVAS ON NAV LINK CLICK (Mobile)
// ============================================
/*
   Problem: On mobile, when a user clicks a nav link inside the
   Bootstrap offcanvas menu, the menu stays open. We need to close it.
   
   Solution: Listen for clicks on nav links. If the offcanvas is open,
   use Bootstrap's Offcanvas API to hide it programmatically.
   
   bootstrap.Offcanvas.getInstance(element) → Gets the Bootstrap
   Offcanvas instance attached to that element (if one exists).
   .hide() → Closes the offcanvas panel.
*/
const offcanvasEl = document.getElementById('offcanvasNavbar');
const offcanvasNavLinks = document.querySelectorAll('#offcanvasNavbar .nav-link');

offcanvasNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Check if offcanvas is currently open
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvasInstance) {
            offcanvasInstance.hide();
        }
    });
});
