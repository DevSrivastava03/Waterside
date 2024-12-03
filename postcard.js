// Drag to scroll functionality
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
    if (!isDown) return;
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

// Modal functionality
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imagePreview");
    const modalImage = document.getElementById("previewImage");
    const closeModal = document.getElementById("closeModal");

    document.querySelectorAll(".img img").forEach((img) => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            const modalImageSrc = img.dataset.modalSrc;
            if (modalImageSrc) {
                modalImage.src = modalImageSrc;
            } else {
                console.error("No modal image source defined for this thumbnail.");
            }

            // Smooth scaling animation using GSAP
            gsap.from(modalImage, {
                scale: 0.5,
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut",
            });
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = 'none'; // Hide modal
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'; // Close if click outside image
        }
    });

    // Close the modal when the Escape key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});

// GSAP ScrollTrigger for smooth scrolling animation
gsap.registerPlugin(ScrollTrigger);

gsap.to(".images", {
    scrollTrigger: {
        trigger: ".images",
        start: "top center",
        end: "bottom center",
        scrub: true,
    },
    x: 0,
    ease: "power1.inOut",
});
