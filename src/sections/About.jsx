import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import useScrollReveal from "../hooks/useScrollReveal";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

const About = () => {
  const skills = [
    "HTML", "CSS", "JavaScript", "React", "Tailwind CSS",
    "Django", "PostgreSQL", "Docker", "AWS EC2", "Redis",
    "Celery", "Git & GitHub", "REST APIs", "Responsive UI",
  ];

  const focusAreas = [
    "Fullstack web development with React, Tailwind CSS, Django, and PostgreSQL.",
    "Backend workflows with Docker, Redis, Celery, and basic AWS services.",
    "Building responsive, mobile-friendly interfaces with clean structure and reusable components.",
  ];

  const sectionRef = useRef(null);
  const skillsCardRef = useRef(null);
  const aboutTextRef = useRef(null);
  const focusListRef = useRef(null);
  const headingRef = useRef(null);

  const cardsRef = useScrollReveal({
    selector: "[data-reveal]",
    stagger: 0.1,
    duration: 0.7,
    ease: "power2.out",
  });

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = prefersReducedMotion();
      const lines = aboutTextRef.current?.querySelectorAll("[data-about-line]");
      const focusItems = focusListRef.current?.querySelectorAll("[data-focus-item]");

      if (reduced) {
        if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
        if (lines?.length) gsap.set(lines, { opacity: 1, y: 0 });
        if (focusItems?.length) gsap.set(focusItems, { opacity: 1, x: 0 });
        return;
      }

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (lines?.length) {
        gsap.fromTo(
          lines,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: aboutTextRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (focusItems?.length) {
        gsap.fromTo(
          focusItems,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: focusListRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      const card = skillsCardRef.current;
      if (!card) return;

      const badges = card.querySelectorAll("[data-skill]");
      if (!badges.length) return;

      if (prefersReducedMotion()) {
        gsap.set(badges, { opacity: 1, clearProps: "all" });
        return;
      }

      gsap.fromTo(
        badges,
        { opacity: 0, y: 40, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cleanups = [];

      badges.forEach((badge) => {
        const onEnter = () => {
          gsap.to(badge, {
            scale: 1.08,
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(badge, {
            scale: 1,
            boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
            duration: 0.3,
            ease: "power2.out",
          });
        };
        badge.addEventListener("mouseenter", onEnter);
        badge.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          badge.removeEventListener("mouseenter", onEnter);
          badge.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: skillsCardRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen font-mono flex items-center justify-center py-12 sm:py-14 overflow-hidden px-4 sm:px-6"
    >
      <div ref={cardsRef} className="max-w-4xl mx-auto px-4">
        <h2
          ref={headingRef}
          className="max-w-3xl text-3xl sm:text-4xl font-semibold mb-16 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center mx-auto"
        >
          About Me
        </h2>

        <div
          ref={aboutTextRef}
          className="p-8 mb-10 rounded-xl border-white/10 border-2 hover:-translate-y-1 transition-all duration-300 bg-white/5"
        >
          <p data-about-line className="text-gray-300 mb-5 text-lg md:text-xl leading-8">
            I am a fullstack-focused developer building responsive web
            applications with a strong interest in backend systems and
            practical problem solving. I like turning ideas into working
            features, especially when the work needs clean structure, fast
            iteration, and reliable implementation.
          </p>
          <p data-about-line className="text-gray-300 text-lg md:text-xl leading-8">
            My recent work has included backend engineering tasks, hackathon
            participation, and projects that combine interface design with
            database, caching, and background-job workflows. I enjoy learning
            new tools quickly and applying them to ship useful results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            data-reveal
            className="rounded-xl border border-white/10 p-6 hover:-translate-y-1 transition-all duration-300 bg-white/5"
          >
            <h3 className="text-2xl text-center font-bold mb-6">
              What I Focus On
            </h3>
            <ul ref={focusListRef} className="space-y-4 text-gray-300 text-base md:text-lg leading-7">
              {focusAreas.map((item) => (
                <li key={item} data-focus-item className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={skillsCardRef}
            className="rounded-xl border border-white/10 p-6 hover:-translate-y-1 transition-all duration-300 bg-white/5"
            style={{ perspective: "800px" }}
          >
            <h3 data-reveal className="text-2xl text-center font-bold mb-6">Skills</h3>
            <div className="flex justify-center flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  data-skill
                  className="bg-blue-500/10 text-blue-300 py-1 px-3 rounded-full text-sm md:text-base cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="mt-10 p-6 rounded-xl border border-white/10 hover:-translate-y-1 transition-all duration-300 bg-white/5"
        >
          <h3 className="text-2xl text-center font-bold mb-6">Education</h3>
          <ul className="pl-5 list-disc list-inside text-base md:text-lg text-gray-300 leading-8">
            <li>
              <strong><em>BSc in Software Engineering (Hons)</em></strong> at University of Bedfordshire (2024–2027)
            </li>
            <li>
              <strong><em>Science Faculty (High School)</em></strong> at Khwopa Secondary School (2022–2023)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
