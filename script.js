document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", function() {
        const scrollDistance = 250;
        const nav = document.querySelector(".top-nav");
        const secondNav = document.querySelector(".second-nav");
        const secondScrollDistance = 500;
    
        if (window.scrollY > scrollDistance) {
            nav.classList.add("hide-nav");
        } else {
            nav.classList.remove("hide-nav");
        }
    
        if (window.scrollY > secondScrollDistance) {
            secondNav.classList.add("show");
        } else {
            secondNav.classList.remove("show");
        }
    });
});