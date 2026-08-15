import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsapConfig";

/**
 * Magnetic hover effect — element subtly follows the cursor within bounds.
 * Desktop only (disabled on touch devices and when reduced motion is preferred).
 *
 * @param {Object} options
 * @param {number} options.strength  - How far the element moves toward cursor (default: 0.3)
 * @param {number} options.duration  - Return-to-center duration (default: 0.4)
 * @param {string} options.ease      - Return ease (default: "power3.out")
 * @returns {{ ref: React.RefObject, onMouseMove: Function, onMouseLeave: Function }}
 */
export function useMagneticHover({
  strength = 0.3,
  duration = 0.4,
  ease = "power3.out",
} = {}) {
  const ref = useRef(null);
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const disabled = isTouchDevice || prefersReduced;

  const onMouseMove = useCallback(
    (e) => {
      if (disabled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.2,
        ease: "power2.out",
      });
    },
    [disabled, strength]
  );

  const onMouseLeave = useCallback(() => {
    if (disabled || !ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration,
      ease,
    });
  }, [disabled, duration, ease]);

  return { ref, onMouseMove, onMouseLeave };
}

export default useMagneticHover;
