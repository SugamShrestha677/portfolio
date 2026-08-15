import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../animations/gsapConfig";

/**
 * Subtle mouse parallax — shifts element based on cursor position.
 * Disabled on touch devices and when reduced motion is preferred.
 */
export function useMouseParallax({ strength = 0.02 } = {}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const isTouch = "ontouchstart" in window;
      if (isTouch) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const onMove = (e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * strength * 100;
          const y = (e.clientY / window.innerHeight - 0.5) * strength * 100;
          gsap.to(el, { x, y, duration: 0.6, ease: "power2.out" });
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return ref;
}

export default useMouseParallax;
