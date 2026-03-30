const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const toTopButton = document.querySelector(".to-top");
const yearElement = document.getElementById("year");
const header = document.querySelector(".site-header");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
    const toggleNav = () => {
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!expanded));
        navLinks.classList.toggle("is-open");
    };

    navToggle.addEventListener("click", toggleNav);

    navLinks.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLAnchorElement) {
            navLinks.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("click", (event) => {
        const composedPath = event.composedPath();
        if (!composedPath.includes(navLinks) && !composedPath.includes(navToggle)) {
            navLinks.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

const handleScroll = () => {
    if (toTopButton) {
        if (window.scrollY > 480) {
            toTopButton.classList.add("is-visible");
        } else {
            toTopButton.classList.remove("is-visible");
        }
    }

    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(6, 9, 19, 0.9)';
            header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
            header.style.padding = '0';
        } else {
            header.style.background = 'rgba(6, 9, 19, 0.7)';
            header.style.boxShadow = 'none';
        }
    }
};

window.addEventListener("scroll", handleScroll, { passive: true });

if (toTopButton) {
    toTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before coming into view
    });

    revealElements.forEach(el => revealObserver.observe(el));
}
