document.addEventListener("DOMContentLoaded", () => {
    // Submenu click handler
    const submenuLinks = document.querySelectorAll(".submenu a");
    submenuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const sportKey = link.getAttribute("data-sport");
            if (sportKey) {
                localStorage.setItem("selectedSport", sportKey);
            }
        });
    });

    // Gallery image loader
    const pictureContainer = document.getElementById("picture-container");
    if (pictureContainer) {
        const sportImages = {
            baseball: ["../images/baseball_v/baseball_v1.jpg", "../images/baseball_v/baseball_v2.jpg", "../images/baseball_v/baseball_v3.jpg"],
            volleyball: ["../images/g_volleyball_v/volleyball_v1.jpg", "../images/g_volleyball_v/volleyball_v2.jpg"],
            boysSoccer: ["../images/b_soccer_v/b_soccer_v1.jpg", "../images/b_soccer_v/b_soccer_v2.jpg"],
            girlsSoccer: ["../images/g_soccer_v/g_soccer_v1.jpg", "../images/g_soccer_v/g_soccer_v2.jpg"],
        };

        const sportKey = localStorage.getItem("selectedSport");
        if (sportKey && sportImages[sportKey]) {
            loadImages(sportImages[sportKey], pictureContainer);
        }

        function loadImages(images, container) {
            container.innerHTML = ""; // Clear previous content
            images.forEach((src, index) => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = `Sport Image ${index + 1}`;
                container.appendChild(img);
            });
        }
    }
});
