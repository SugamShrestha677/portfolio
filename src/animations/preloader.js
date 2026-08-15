import gsap from "gsap";

/**
 * Creates the hero entrance timeline that plays after the preloader exits.
 * Does NOT touch the navbar — it manages its own visibility.
 */
export function createHeroEntrance({ paragraph, buttons, image }) {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    onComplete: () => {
      gsap.set([paragraph, buttons, image].filter(Boolean), {
        opacity: 1,
        clearProps: "transform",
      });
    },
  });

  const targets = [paragraph, buttons, image].filter(Boolean);

  if (prefersReduced || !targets.length) {
    gsap.set(targets, { opacity: 1, clearProps: "all" });
    return tl;
  }

  if (image) {
    tl.from(image, { scale: 0.85, opacity: 0, duration: 0.7 }, 0.15);
  }

  if (paragraph) {
    tl.from(paragraph, { y: 25, opacity: 0, duration: 0.6 }, 0.25);
  }

  if (buttons) {
    const btns = buttons.children;
    if (btns.length) {
      tl.from(
        btns,
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "back.out(1.4)",
        },
        0.4
      );
    }
  }

  return tl;
}

/**
 * Creates the preloader exit timeline.
 */
export function createPreloaderExit(overlay, onComplete) {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const tl = gsap.timeline({ onComplete });

  if (prefersReduced) {
    tl.set(overlay, { display: "none" });
    return tl;
  }

  tl.to(overlay, {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
  }).set(overlay, { display: "none" });

  return tl;
}
