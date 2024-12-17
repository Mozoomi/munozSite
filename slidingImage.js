document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "../images/b_soccer_v/b_soccer_v1.jpg",
        "../images/baseball_v/baseball_v3.jpg",
        "../images/baseball_v/baseball_v4.jpg",
    ];

    let currentIndex = 0;
    let intervalId;

    function changeBackground() {
        const nextImage = new Image();
        nextImage.src = images[currentIndex];
        nextImage.onload = () => {
            document.body.style.backgroundImage = `url('${images[currentIndex]}')`;
            currentIndex = (currentIndex + 1) % images.length;
        };
    }

    function startSlider(interval = 5000){
        changeBackground();
        intervalId = setInterval(changeBackground, interval);
    }


    // Call updateIndicators in changeBackground()
    function changeBackground() {
        const backgroundImageDiv = document.getElementById("background-image");
        currentIndex = (currentIndex + 1) % images.length;
        backgroundImageDiv.style.backgroundImage = `url(${images[currentIndex]})`;
    }

    startSlider();
});
