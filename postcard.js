// DRAG TO SCROLL FUNCTIONALITY
const container = document.querySelector(".images");
let isDown = false; // Flag to track if the mouse is pressed
let startX, scrollLeft;

// Event: Mouse down on the container
container.addEventListener("mousedown", (e) => {
    isDown = true; // Enable dragging
    container.classList.add("active"); // Add active state for styling if needed
    startX = e.pageX - container.offsetLeft; // Track the initial X position
    scrollLeft = container.scrollLeft; // Store the current scroll position
});

// Event: Mouse leaves the container
container.addEventListener("mouseleave", () => {
    isDown = false; // Stop dragging
    container.classList.remove("active"); // Remove active state
});

// Event: Mouse up (released)
container.addEventListener("mouseup", () => {
    isDown = false; // Stop dragging
    container.classList.remove("active"); // Remove active state
});

// Event: Mouse move (dragging)
container.addEventListener("mousemove", (e) => {
    if (!isDown) return; // Exit if dragging isn't active
    e.preventDefault(); // Prevent default behavior
    const x = e.pageX - container.offsetLeft; // Calculate the current X position
    const walk = (x - startX) * 1.5; // Determine how far to scroll
    container.scrollLeft = scrollLeft - walk; // Update scroll position
});

// OPTIONAL: TOUCH SUPPORT FOR MOBILE DEVICES
container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX; // Get the initial touch position
    scrollLeft = container.scrollLeft; // Store the current scroll position
}, { passive: true }); // Optimize for touch events

container.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX; // Get the current touch position
    const walk = (x - startX) * 1.5; // Calculate the scroll distance
    container.scrollLeft = scrollLeft - walk; // Update scroll position
}, { passive: true }); // Optimize for touch events

// MODAL FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imagePreview"); // Modal container
    const modalImage = document.getElementById("previewImage"); // Modal image element
    const closeModal = document.getElementById("closeModal"); // Modal close button

    // Add click event for all images in the gallery
    document.querySelectorAll(".img img").forEach((img) => {
        img.addEventListener("click", () => {
            modal.style.display = "flex"; // Show modal
            const modalImageSrc = img.dataset.modalSrc; // Get the larger image source
            if (modalImageSrc) {
                modalImage.src = modalImageSrc; // Set modal image source
            } else {
                console.error("No modal image source defined for this thumbnail.");
            }

            // Smooth scaling animation using GSAP
            gsap.from(modalImage, {
                scale: 0.5, // Start smaller
                opacity: 0, // Start invisible
                duration: 0.5, // Animation duration
                ease: "power1.inOut", // Easing function
            });
        });
    });

    // Close modal on clicking the close button
    closeModal.addEventListener("click", () => {
        modal.style.display = 'none'; // Hide modal
    });

    // Close modal on clicking outside the image
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'; // Hide modal
        }
    });

    // Close modal on pressing the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none'; // Hide modal
        }
    });
});

// GSAP SCROLLTRIGGER FOR SMOOTH SCROLLING ANIMATION
gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

gsap.to(".images", {
    scrollTrigger: {
        trigger: ".images", // Element to watch for scrolling
        start: "top center", // Start animation when element reaches the center
        end: "bottom center", // End animation when element leaves the center
        scrub: true, // Smoothly scrub the animation based on scroll position
    },
    x: 0, // Animation target (no translation here, just enabling ScrollTrigger)
    ease: "power1.inOut", // Easing function
});
