import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../animations/gsapConfig";

const ScrollProgress = () => {
  const barRef = useRef(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;

    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-teal-400 to-indigo-500 origin-left"
      />
    </div>
  );
};

export default ScrollProgress;
