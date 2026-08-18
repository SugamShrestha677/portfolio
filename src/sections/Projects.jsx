import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import grocery from "../assets/grocery.png";
import estate from "../assets/estate.png";
import ecommerce from "../assets/ecommerce.png";
import elearning from "../assets/elearning.png";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

const projects = [
  {
    image: elearning,
    name: "Learning Management System (LMS)",
    brief:
      "A full-stack learning platform for managing courses, SCORM content, assessments, enrollments, live classes, certificates, and real-time student progress.",
    link: "https://buildandhire.me/",
    tech: ["Next.js", "Django","DRF", "PostgreSQL"],
  },
  {
    image: estate,
    name: "Estate",
    brief:
      "A modern real estate landing page with responsive design and sleek visuals, built using React and Tailwind CSS.",
    link: "https://estateprojects.netlify.app/",
    tech: ["React", "Tailwind CSS", "Netlify"],
  },
  {
    image: grocery,
    name: "Grocery App",
    brief:
      "A clean, user-friendly grocery storefront showcasing fresh products with intuitive navigation and polished UI.",
    link: "https://grocify-3zbt.onrender.com/",
    tech: ["React", "Django", "Render"],
  },
  {
    image: ecommerce,
    name: "Ecommerce",
    brief:
      "A stylish ecommerce interface featuring dynamic product displays and promotional banners for a smooth shopping experience.",
    link: "https://ecommercedemos.netlify.app/",
    tech: ["React", "Tailwind CSS", "Netlify"],
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = prefersReducedMotion();
      const cleanups = [];

      if (headingRef.current) {
        if (reduced) {
          gsap.set(headingRef.current, { opacity: 1, y: 0 });
        } else {
          gsap.from(headingRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }

      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      if (reduced) {
        gsap.set(cards, { opacity: 1, clearProps: "all" });
        return;
      }

      cards.forEach((card, index) => {
        const fromX = index % 2 === 0 ? -80 : 80;

        gsap.from(card, {
          x: fromX,
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        const img = card.querySelector("[data-project-img]");

        const mm = gsap.matchMedia();
        mm.add("(min-width: 769px)", () => {
          if (img) {
            gsap.to(img, {
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            });
          }

          const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              rotateY: x * 12,
              rotateX: -y * 12,
              transformPerspective: 800,
              duration: 0.3,
              ease: "power2.out",
            });
          };
          const onTiltLeave = () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          };
          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onTiltLeave);
          cleanups.push(() => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onTiltLeave);
          });
        });

        const onEnter = () => {
          gsap.to(card, {
            scale: 1.02,
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.25)",
            duration: 0.4,
            ease: "power2.out",
          });
          if (img) {
            gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power2.out" });
          }
        };

        const onLeave = () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
            duration: 0.4,
            ease: "power2.out",
          });
          if (img) {
            gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
          }
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="project"
      className="min-h-screen flex items-center font-mono justify-center py-10 sm:py-12 px-4 sm:px-6"
    >
      <div ref={sectionRef} className="max-w-3xl mx-auto px-4">
        <h2
          ref={headingRef}
          className="max-w-3xl text-3xl sm:text-4xl font-semibold mb-10 sm:mb-12 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center"
        >
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="p-6 rounded-xl flex flex-col items-center text-center border-2 border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-cyan-900/30 group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="font-semibold text-xl mb-4">{project.name}</h3>
              <p className="text-gray-300 mb-4">{project.brief}</p>

              <div className="flex flex-wrap sm:items-center gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-500/10 text-blue-400 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col text-center w-full py-3 justify-center gap-3 border-2 border-white/10 hover:border-blue-500/30 cursor-pointer rounded-xl overflow-hidden"
              >
                <p className="text-gray-200 text-sm font-medium">View Project ↗</p>
                <img
                  data-project-img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-b-lg"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
