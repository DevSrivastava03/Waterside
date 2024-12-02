const slider = document.querySelector(".slider");
const cards = document.querySelectorAll(".card");
const ease = 0.1;

let currentX = 0;
let targetX = 0;

// Calculate scale factor for the images
const getScaleFactor = (position, viewportWidth) => {
  const quarterWidth = viewportWidth / 4;
  if (position < 0 || position > viewportWidth) {
    return 0;
  } else if (position < quarterWidth) {
    return lerp(0, 0.45, position / quarterWidth);
  } else if (position < 2 * quarterWidth) {
    return lerp(0.45, 1.5, (position - quarterWidth) / quarterWidth);
  } else if (position < 3 * quarterWidth) {
    return lerp(1.5, 0.45, (position - 2 * quarterWidth) / quarterWidth);
  } else {
    return lerp(0.45, 0, (position - 3 * quarterWidth) / quarterWidth);
  }
};

// Update the scale for each card
const updateScales = () => {
  const viewportWidth = window.innerWidth;
  cards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const scaleFactor = getScaleFactor(cardCenter, viewportWidth);
    const imgScaleFactor = scaleFactor * 1.1;
    const img = card.querySelector("img");
    card.style.transform = `scale(${scaleFactor})`;
    img.style.transform = `scale(${imgScaleFactor})`;
  });
};

// Linear interpolation function
const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

// Update the scroll behavior
const update = () => {
  currentX = lerp(currentX, targetX, ease);
  slider.style.transform = `translateX(${currentX}%)`;
  updateScales();
  requestAnimationFrame(update);
};

// Listen to the scroll event
window.addEventListener("scroll", () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollProgress = window.scrollY / maxScroll;
  
  // Adjust targetX based on scroll progress to move the slider horizontally
  targetX = -scrollProgress * (slider.scrollWidth - window.innerWidth);

  // Debugging the targetX value
  console.      log('scrollProgress:', scrollProgress, 'targetX:', targetX);
});
update();
