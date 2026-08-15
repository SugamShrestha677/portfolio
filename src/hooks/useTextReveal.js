import { useRef, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../animations/gsapConfig";

/**
 * Splits text content into individual characters/words wrapped in spans,
 * then animates them with a staggered reveal on scroll.
 *
 * @param {Object} options
 * @param {string}  options.splitBy     - "chars" or "words" (default: "chars")
 * @param {number}  options.duration    - Animation duration per element (default: 0.6)
 * @param {number}  options.stagger     - Delay between each element (default: 0.02)
 * @param {string}  options.ease        - GSAP ease (default: "power3.out")
 * @param {string}  options.start       - ScrollTrigger start (default: "top 85%")
 * @param {Object}  options.from        - GSAP from vars (default: y 20, opacity 0)
 * @param {boolean} options.scrollTrigger - Whether to use ScrollTrigger (default: true)
 * @param {boolean} options.enabled       - Whether animation should run (default: true)
 * @param {Array}   options.deps          - Extra deps for useGSAP
 * @returns {React.RefObject} ref to attach to the text element
 */
export function useTextReveal({
  splitBy = "chars",
  duration = 0.6,
  stagger = 0.02,
  ease = "power3.out",
  start = "top 85%",
  from = { y: 20, opacity: 0 },
  scrollTrigger: useScrollTrigger = true,
  enabled = true,
  deps = [],
} = {}) {
  const textRef = useRef(null);

  // Split text into spans before GSAP runs
  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const originalText = el.textContent;
    el.setAttribute("data-original-text", originalText);

    if (splitBy === "chars") {
      el.innerHTML = originalText
        .split("")
        .map((char) =>
          char === " "
            ? '<span class="split-char" style="display:inline-block">&nbsp;</span>'
            : `<span class="split-char" style="display:inline-block;opacity:0">${char}</span>`
        )
        .join("");
    } else {
      el.innerHTML = originalText
        .split(" ")
        .map(
          (word) =>
            `<span class="split-word" style="display:inline-block;opacity:0">${word}</span>`
        )
        .join(
          '<span class="split-char" style="display:inline-block">&nbsp;</span>'
        );
    }

    // Cleanup: restore original text on unmount
    return () => {
      if (el) el.textContent = originalText;
    };
  }, [splitBy]);

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el || !enabled) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const targets = el.querySelectorAll(
        splitBy === "chars" ? ".split-char" : ".split-word"
      );

      if (!targets.length) return;

      if (prefersReduced) {
        gsap.set(targets, { opacity: 1, clearProps: "all" });
        return;
      }

      const animConfig = {
        ...from,
        duration,
        stagger,
        ease,
      };

      if (useScrollTrigger) {
        animConfig.scrollTrigger = {
          trigger: el,
          start,
          toggleActions: "play none none none",
        };
      }

      gsap.from(targets, animConfig);
    },
    { scope: textRef, dependencies: [enabled, ...deps] }
  );

  return textRef;
}

export default useTextReveal;
