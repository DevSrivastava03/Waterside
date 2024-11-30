gsap.registerPlugin(ScrollTrigger);

// Define some variables
let iteration = 0;
const spacing = 0.05, // Controls spacing between cards
      snap = gsap.utils.snap(spacing), 
      cards = gsap.utils.toArray(".cards li"), // Get the list items
      seamlessLoop = buildSeamlessLoop(cards, spacing), 
      scrub = gsap.to(seamlessLoop, {
        totalTime: 0,
        duration: 1, // Increase duration for smoother animation
        ease: "power3",
        paused: true,
      }),
      trigger = ScrollTrigger.create({
        start: 0,
        onUpdate(self) {
          if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
            wrapForward(self);
          } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
            wrapBackward(self);
          } else {
            scrub.vars.totalTime = snap((iteration + self.progress) * seamlessLoop.duration());
            scrub.invalidate().restart();
            self.wrapping = false;
          }
        },
        end: "+=3000", // Adjust as per your need
        pin: ".gallery", // Pin the gallery during scroll
        scrub: true, // Sync scrolling with animations
      });

function wrapForward(trigger) {
  iteration++;
  trigger.wrapping = true;
  trigger.scroll(trigger.start + 1);
}

function wrapBackward(trigger) {
  iteration--;
  if (iteration < 0) {
    iteration = cards.length - 1;
    seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
    scrub.pause();
  }
  trigger.wrapping = true;
  trigger.scroll(trigger.end - 1);
}

function buildSeamlessLoop(items, spacing) {
  let overlap = Math.ceil((1 / spacing) * 1.5), // Reduce overlap to avoid too much scrolling
      startTime = items.length * spacing + 0.5,
      loopTime = (items.length + overlap) * spacing + 1,
      rawSequence = gsap.timeline({ paused: true }),
      seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1, // Infinite loop
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.05);
        },
      }),
      l = items.length + overlap * 2,
      time = 0,
      i,
      index,
      item;

  // Set initial state with opacity and scale
  gsap.set(items, { opacity: 1, scale: 1, yPercent: 100 });

  for (i = 0; i < l; i++) {
    index = i % items.length;
    item = items[index];
    time = i * spacing;

    rawSequence
      .fromTo(
        item,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false },
        time
      )
      .fromTo(
        item,
        { yPercent: 100 }, // Start from below
        { yPercent: -50, duration: 1, ease: "none", immediateRender: false }, // Slightly above the screen
        time
      );
    seamlessLoop.add("label" + i, time);
  }

  rawSequence.time(startTime);

  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none",
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      { time: startTime, duration: startTime - (overlap * spacing + 1), immediateRender: false, ease: "none" }
    );

  return seamlessLoop;
}
