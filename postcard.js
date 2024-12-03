const container = document.querySelector(".images");
let isDown = false;
let startX, scrollLeft;

container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("active");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
});

container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("active");
});

container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("active");
});

container.addEventListener("mousemove", (e) => {
    if (!isDown) return; // stop the function from running if not clicked
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiply by a factor for smoother drag speed
    container.scrollLeft = scrollLeft - walk;
});

// Optional: Add touch support for mobile devices
container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = container.scrollLeft;
}, { passive: true });

container.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
}, { passive: true });

gsap.registerPlugin(ScrollTrigger);
gsap.to(".images", {
    scrollTrigger: {
        trigger: ".images", // The section to watch for scrolling
        start: "top center", // Animation starts when the top of .images reaches the center of the viewport
        end: "bottom center", // Animation ends when the bottom of .images reaches the center of the viewport
        scrub: true, // Smoothens the animation
    },
    x: 0, // Ensures the animation target is set
    ease: "power1.inOut", // Defines the easing effect
});
