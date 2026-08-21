import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiDjango,
  SiTailwindcss,
  SiPostgresql,
  SiRedis,
  SiCelery,
  SiDocker,
  SiAmazonwebservices,
  SiGit,
  SiGithub,
  SiFigma,
  SiJira,
  SiClickup,
  SiNotion,
  SiPostman,
  SiNpm,
  SiVercel,
  SiRender,
} from "react-icons/si";

import { FaPlug } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import {
  FaArrowUpRightFromSquare,
  FaBriefcase,
  FaCalendarDays,
  FaCloud,
  FaCode,
  FaDatabase,
  FaGraduationCap,
  FaLayerGroup,
  FaLocationDot,
  FaServer,
  FaWandMagicSparkles,
  FaChartLine
} from "react-icons/fa6";

import useScrollReveal from "../hooks/useScrollReveal";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

const About = () => {
  const technologyGroups = [
  {
    title: "Languages & Frameworks",
    items: [
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Django", icon: SiDjango },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },

  {
    title: "Backend & Data",
    items: [
      { name: "Django REST Framework", icon: SiDjango },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
      { name: "Celery", icon: SiCelery },
      { name: "REST APIs", icon: FaPlug },
    ],
  },

  {
    title: "Cloud & DevOps",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "AWS", icon: SiAmazonwebservices },
      { name: "Render", icon: SiRender },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
    ],
  },

  {
    title: "Design & Collaboration",
    items: [
      { name: "Figma", icon: SiFigma },
      { name: "Jira", icon: SiJira },
      { name: "ClickUp", icon: SiClickup },
      { name: "Notion", icon: SiNotion },
    ],
  },

  {
    title: "Development & Monitoring",
    items: [
      { name: "VS Code", icon: VscVscode },
      { name: "Postman", icon: SiPostman },
      { name: "npm", icon: SiNpm },
      { name: "Vercel", icon: SiVercel },
      { name: "UptimeRobot", icon: FaChartLine },
    ],
  },
];

  const expertise = [
  {
    icon: FaServer,
    title: "Backend Engineering",
    description:
      "Building structured backend systems, REST APIs, authentication flows, and reliable application logic with Django.",
  },
  {
    icon: FaLayerGroup,
    title: "Full-Stack Development",
    description:
      "Connecting modern React and Next.js interfaces with backend services and database-driven applications.",
  },
  {
    icon: FaCloud,
    title: "Cloud & Infrastructure",
    description:
      "Practical experience with Docker, AWS services, Redis, and Celery for deployment and background processing workflows.",
  },
];

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const expertiseRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);

  const cardsRef = useScrollReveal({
    selector: "[data-reveal]",
    stagger: 0.08,
    duration: 0.7,
    ease: "power2.out",
  });

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = prefersReducedMotion();

      const revealGroups = [
        headingRef.current,
        introRef.current,
        expertiseRef.current,
        skillsRef.current,
        educationRef.current,
      ].filter(Boolean);

      if (reduced) {
        gsap.set(revealGroups, {
          opacity: 1,
          y: 0,
          x: 0,
        });
        return;
      }

      revealGroups.forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.05,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;

      const expertiseCards =
        section.querySelectorAll("[data-expertise-card]");

      const skillBadges = section.querySelectorAll("[data-skill]");

      gsap.fromTo(
        expertiseCards,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        skillBadges,
        {
          opacity: 0,
          y: 18,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.035,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cleanups = [];

      expertiseCards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -6,
            borderColor: "rgba(59, 130, 246, 0.35)",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.25)",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      skillBadges.forEach((badge) => {
        const onEnter = () => {
          gsap.to(badge, {
            y: -3,
            scale: 1.04,
            boxShadow: "0 8px 20px rgba(59, 130, 246, 0.18)",
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          gsap.to(badge, {
            y: 0,
            scale: 1,
            boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
            duration: 0.2,
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

      return () => cleanups.forEach((cleanup) => cleanup());
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-4 py-24 font-mono sm:px-6 lg:px-8"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.25em] text-blue-400">
            <span className="h-px w-8 bg-blue-400/50" />
            About Me
            <span className="h-px w-8 bg-blue-400/50" />
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Building with{" "}
            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              purpose
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-md leading-7 text-gray-300 sm:text-base">
            Full-stack developer focused on backend engineering, modern web
            applications, and practical software solutions.
          </p>
        </div>

        {/* Main Introduction */}
        <div
          ref={introRef}
          className="relative mb-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm sm:p-8 lg:p-10"
        >
          {/* Decorative corner */}
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.5fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-5 flex items-center gap-2 text-sm text-blue-400">
                <FaWandMagicSparkles size={16} />
                <span>Developer / Problem Solver</span>
              </div>

              <h3 className="mb-5 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                Turning ideas into{" "}
                <span className="text-teal-400">working software.</span>
              </h3>

              <p className="max-w-3xl text-md leading-7 text-gray-300 sm:text-base">
                I am a full-stack-focused developer with a strong interest in
                backend systems and practical problem solving. I enjoy
                transforming ideas into reliable features, with attention to
                clean architecture, maintainable code, and user experience.
              </p>

              <p className="mt-4 max-w-3xl text-md leading-7 text-gray-300 sm:text-base">
                My experience includes backend engineering, database-driven
                applications, caching, asynchronous background processing,
                cloud services, and modern React-based interfaces. I
                continuously learn new technologies and apply them through
                real-world projects.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/20 px-4 py-2">
                  <FaLocationDot size={14} className="text-teal-400" />
                  Nepal
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/20 px-4 py-2">
                  <FaBriefcase
                    size={14}
                    className="text-blue-400"
                  />
                  Associate Software Developer
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.08] bg-black/20 p-5">
                <FaCode className="mb-4 text-teal-400" size={22} />
                <p className="text-2xl font-bold text-white">Full-Stack</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Development Focus
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-black/20 p-5">
                <FaServer className="mb-4 text-blue-400" size={22} />
                <p className="text-2xl font-bold text-white">Backend</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Engineering Focus
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-black/20 p-5">
                <FaDatabase className="mb-4 text-indigo-400" size={22} />
                <p className="text-2xl font-bold text-white">Django</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Primary Backend
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-black/20 p-5">
                <FaCloud className="mb-4 text-teal-400" size={22} />
                <p className="text-2xl font-bold text-white">Cloud</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  AWS + Docker
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise */}
        <div ref={expertiseRef} className="mb-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-blue-400">
                Expertise
              </p>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                What I work with
              </h3>
            </div>

            <FaLayerGroup
              className="hidden text-white/10 sm:block"
              size={46}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {expertise.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  data-expertise-card
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 transition-colors duration-300"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-blue-400">
                      <Icon size={21} />
                    </div>

                    <FaArrowUpRightFromSquare
                      size={18}
                      className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400"
                    />
                  </div>

                  <h4 className="mb-3 text-lg font-semibold text-white">
                    {item.title}
                  </h4>

                  <p className="text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div
  ref={skillsRef}
  className="relative mb-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] py-8 sm:py-10"
>
  {/* Header */}
  <div className="relative z-10 mb-10 px-6 sm:px-8">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-teal-200">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
          Technology Stack
        </p>

        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Tools I use to build
        </h3>
      </div>

      {/* <p className="max-w-md text-xs leading-5 text-gray-500 sm:text-right">
        A practical toolkit spanning development, infrastructure,
        deployment, design, and collaboration.
      </p> */}
    </div>
  </div>

  {/* Technology Categories */}
  <div className="space-y-7">
    {technologyGroups.map((group, groupIndex) => {
  const isReverse = groupIndex % 2 !== 0;

  // Repeat enough times to guarantee the screen is always filled.
  const repeatedItems = Array.from(
    { length: 6 },
    () => group.items
  ).flat();

  return (
    <div key={group.title} className="marquee-category">
      {/* Category label */}
      <div className="mb-3 flex items-center gap-3 px-6 sm:px-8">
        <span className="h-px w-6 bg-gradient-to-r from-teal-400/50 to-indigo-500/20" />

        <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gray-300 sm:text-xs">
          {group.title}
        </span>
      </div>

      {/* Marquee viewport */}
      <div className="marquee-viewport">
        {/* Edge gradients */}
        <div className="marquee-fade marquee-fade-left" />
        <div className="marquee-fade marquee-fade-right" />

        {/* Moving track */}
        <div
          className={`marquee-track ${
            isReverse ? "marquee-right" : "marquee-left"
          }`}
        >
          {repeatedItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={`${group.title}-${item.name}-${index}`}
                className="tech-marquee-card"
              >
                <span className="tech-icon">
                  <Icon size={18} />
                </span>

                <span className="tech-name">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
})}
  </div>

  {/* Footer */}
  <div className="mt-10 flex items-center justify-center gap-3 px-6">
    <span className="h-px w-10 bg-white/10" />

    <span className="text-md uppercase tracking-[0.2em] text-gray-200 sm:text-[10px]">
      Always learning · always building
    </span>

    <span className="h-px w-10 bg-white/10" />
  </div>
</div>

        {/* Education */}
        <div ref={educationRef}>
          <div className="mb-6">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-indigo-400">
              Education
            </p>

            <h3 className="text-2xl font-semibold text-white sm:text-3xl">
              Academic background
            </h3>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 sm:p-8">
            <div className="absolute left-[31px] top-8 hidden h-[calc(100%-64px)] w-px bg-gradient-to-b from-blue-500/50 via-indigo-500/20 to-transparent sm:block" />

            <div className="space-y-8">
              {/* University */}
              <div className="relative flex gap-5">
                <div className="relative z-10 hidden h-12 w-12 flex-none items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400 sm:flex">
                  <FaGraduationCap size={22} />
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-lg font-semibold text-white">
                      BSc in Software Engineering (Hons)
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaCalendarDays size={14} />
                      2024 – 2027
                    </div>
                  </div>

                  <p className="text-sm text-blue-300">
                    University of Bedfordshire
                  </p>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Developing a strong foundation in software engineering,
                    programming, system design, databases, and software
                    development practices.
                  </p>
                </div>
              </div>

              {/* High School */}
              <div className="relative flex gap-5">
                <div className="relative z-10 hidden h-12 w-12 flex-none items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-400 sm:flex">
                  <FaGraduationCap size={22} />
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-lg font-semibold text-white">
                      Science Faculty
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaCalendarDays size={14} />
                      2022 – 2023
                    </div>
                  </div>

                  <p className="text-sm text-indigo-300">
                    Khwopa Secondary School
                  </p>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Completed higher secondary education with a foundation in
                    science and analytical problem solving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-12 text-center">
          <p className="text-xs tracking-wide text-gray-600">
            Always learning. Always building. Always improving.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
