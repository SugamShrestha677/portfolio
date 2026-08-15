import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

/**
 * Scroll-triggered reveal. Uses immediateRender: false so elements stay
 * visible until the trigger fires (prevents stuck invisible content).
 */
export function useScrollReveal({
  selector = "[data-reveal]",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0, scale: 1, x: 0 },
  stagger = 0.08,
  ease = "power2.out",
  duration = 0.7,
  start = "top 88%",
  once = false,
  deps = [],
} = {}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const elements = container.querySelectorAll(selector);
      if (!elements.length) return;

      if (prefersReducedMotion()) {
        gsap.set(elements, { opacity: 1, clearProps: "transform" });
        return;
      }

      const tweenVars = {
        ...to,
        duration,
        ease,
        stagger,
        immediateRender: false,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
          invalidateOnRefresh: true,
        },
      };

      gsap.fromTo(elements, { ...from }, tweenVars);
    },
    { scope: containerRef, dependencies: deps }
  );

  return containerRef;
}

export default useScrollReveal;
