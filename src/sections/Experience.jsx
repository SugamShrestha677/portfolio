import React, { useRef } from "react";
import { FaBriefcase } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

const Experience = () => {
  const responsibilities = [
    "Learned and used Docker for containerization, starting from zero knowledge.",
    "Used basic AWS services such as EC2 and S3 without senior-level scope.",
    "Integrated Redis for caching and session management.",
    "Implemented async tasks with Celery for background jobs.",
  ];

  const sectionRef = useRef(null);
  const borderRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const reduced = prefersReducedMotion();
      if (reduced) {
        gsap.set(sectionRef.current.querySelectorAll("[data-exp-heading], [data-exp-card], [data-exp-item]"), {
          opacity: 1,
          clearProps: "transform",
        });
        if (borderRef.current) gsap.set(borderRef.current, { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Section heading fades up
      tl.from(
        "[data-exp-heading]",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          immediateRender: false,
        },
        0
      );

      // Card fades in
      tl.from(
        "[data-exp-card]",
        {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          immediateRender: false,
        },
        "-=0.3"
      );

      // Left border draws in (height from 0 to 100%)
      if (borderRef.current) {
        tl.from(
          borderRef.current,
          {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.6,
            ease: "power2.out",
            immediateRender: false,
          },
          "-=0.5"
        );
      }

      // Responsibility items stagger in
      tl.from(
        "[data-exp-item]",
        {
          x: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          immediateRender: false,
        },
        "-=0.3"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center font-mono py-14 sm:py-16 px-4 sm:px-6"
    >
      <div ref={sectionRef} className="max-w-4xl mx-auto px-4 w-full">
        <h2
          data-exp-heading
          className="text-3xl sm:text-4xl font-semibold mb-10 sm:mb-12 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center"
        >
          Work Experience
        </h2>

        <div
          data-exp-card
          className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 shadow-lg shadow-black/20 relative overflow-hidden"
        >
          {/* Animated left accent border */}
          <div
            ref={borderRef}
            className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-2xl"
          />

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between pl-4">
            <div>
              <div className="flex items-center gap-3 text-blue-400">
                <FaBriefcase />
                <h3 className="text-xl sm:text-2xl font-semibold">Depth Nepal</h3>
              </div>
              <p className="mt-2 text-lg text-gray-200">
                Backend Engineering Intern
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              Jan 2026 – May 2026 · 4 months
            </span>
          </div>

          <ul className="mt-6 space-y-3 text-gray-300 pl-4">
            {responsibilities.map((item) => (
              <li key={item} data-exp-item className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;