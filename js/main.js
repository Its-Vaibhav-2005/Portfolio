const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const toTopButton = document.querySelector(".to-top");
const yearElement = document.getElementById("year");

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
    if (!toTopButton) {
        return;
    }
    if (window.scrollY > 480) {
        toTopButton.classList.add("is-visible");
    } else {
        toTopButton.classList.remove("is-visible");
    }
};

window.addEventListener("scroll", handleScroll, { passive: true });

if (toTopButton) {
    toTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
