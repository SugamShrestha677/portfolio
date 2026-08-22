import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";

import grocery from "../assets/grocery.png";
import estate from "../assets/estate.png";
import ecommerce from "../assets/ecommerce.png";
import elearning from "../assets/eLearning.png";

import {
  FaArrowUpRightFromSquare,
  FaLayerGroup,
  FaReact,
} from "react-icons/fa6";

import {
  SiNextdotjs,
  SiDjango,
  SiPostgresql,
  SiTailwindcss,
  SiNetlify,
  SiRender,
} from "react-icons/si";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

const projects = [
  {
    number: "01",
    image: elearning,
    name: "Learning Management System",
    type: "Full-Stack Platform",
    status: "Featured Project",
    brief:
      "A full-stack learning platform for managing courses, SCORM content, assessments, enrollments, live classes, certificates, and real-time student progress.",
    link: "https://buildandhire.me/",
    tech: [
      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
      {
        name: "Django",
        icon: SiDjango,
      },
      {
        name: "DRF",
        icon: SiDjango,
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
      },
    ],
  },

  {
    number: "02",
    image: estate,
    name: "Estate",
    type: "Real Estate",
    brief:
      "A modern real estate landing page focused on responsive layouts, clean visual hierarchy, and polished user interactions.",
    link: "https://estateprojects.netlify.app/",
    tech: [
      {
        name: "React",
        icon: FaReact,
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
      },
      {
        name: "Netlify",
        icon: SiNetlify,
      },
    ],
  },

  {
    number: "03",
    image: grocery,
    name: "Grocery App",
    type: "E-Commerce",
    brief:
      "A clean grocery storefront with intuitive navigation, product presentation, and a responsive shopping experience.",
    link: "https://grocify-3zbt.onrender.com/",
    tech: [
      {
        name: "React",
        icon: FaReact,
      },
      {
        name: "Django",
        icon: SiDjango,
      },
      {
        name: "Render",
        icon: SiRender,
      },
    ],
  },

  {
    number: "04",
    image: ecommerce,
    name: "Ecommerce",
    type: "E-Commerce UI",
    brief:
      "A stylish ecommerce interface featuring dynamic product displays and promotional sections for a smooth shopping experience.",
    link: "https://ecommercedemos.netlify.app/",
    tech: [
      {
        name: "React",
        icon: FaReact,
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
      },
      {
        name: "Netlify",
        icon: SiNetlify,
      },
    ],
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const featuredRef = useRef(null);
  const projectRefs = useRef([]);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const reduced = prefersReducedMotion();
      const cards = projectRefs.current.filter(Boolean);

      /*
       * -----------------------------------------
       * REDUCED MOTION
       * -----------------------------------------
       */

      if (reduced) {
        gsap.set(
          [
            headingRef.current,
            featuredRef.current,
            ...cards,
          ].filter(Boolean),
          {
            opacity: 1,
            y: 0,
            x: 0,
            clearProps: "transform",
          }
        );

        return;
      }

      /*
       * -----------------------------------------
       * HEADING ANIMATION
       * -----------------------------------------
       */

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      /*
       * -----------------------------------------
       * FEATURED PROJECT ANIMATION
       * -----------------------------------------
       */

      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      /*
       * -----------------------------------------
       * OTHER PROJECTS ANIMATION
       * -----------------------------------------
       */

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: index * 0.08,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /*
       * -----------------------------------------
       * CARD HOVER INTERACTIONS
       * -----------------------------------------
       */

      const cleanups = [];

      const allCards = [
        featuredRef.current,
        ...cards,
      ].filter(Boolean);

      allCards.forEach((card) => {
        const image = card.querySelector("[data-project-image]");

        /*
         * Mouse enter
         */
        const onEnter = () => {
          gsap.to(card, {
            y: -6,
            duration: 0.35,
            ease: "power2.out",
          });

          if (image) {
            gsap.to(image, {
              scale: 1.045,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        };

        /*
         * Mouse leave
         */
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.45,
            ease: "power2.out",
          });

          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        };

        /*
         * Desktop tilt
         */
        const onMove = (event) => {
          if (window.innerWidth < 769) return;

          const rect = card.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
              rect.width -
            0.5;

          const y =
            (event.clientY - rect.top) /
              rect.height -
            0.5;

          gsap.to(card, {
            rotateY: x * 4,
            rotateX: -y * 4,
            transformPerspective: 1200,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        card.addEventListener(
          "mouseenter",
          onEnter
        );

        card.addEventListener(
          "mouseleave",
          onLeave
        );

        card.addEventListener(
          "mousemove",
          onMove
        );

        cleanups.push(() => {
          card.removeEventListener(
            "mouseenter",
            onEnter
          );

          card.removeEventListener(
            "mouseleave",
            onLeave
          );

          card.removeEventListener(
            "mousemove",
            onMove
          );
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    {
      scope: sectionRef,
    }
  );

  /*
   * -----------------------------------------
   * TECHNOLOGY BADGES
   * -----------------------------------------
   */

  const renderTech = (tech) => {
    const Icon = tech.icon;

    return (
      <span
        key={tech.name}
        className="
          group/tech
          inline-flex
          items-center
          gap-2
          rounded-lg
          border
          border-white/[0.07]
          bg-black/20
          px-3
          py-1.5
          text-xs
          text-gray-400
          transition-all
          duration-200
          hover:border-blue-400/30
          hover:bg-blue-400/[0.04]
          hover:text-gray-200
        "
      >
        <Icon
          size={14}
          className="
            text-gray-500
            transition-colors
            duration-200
            group-hover/tech:text-blue-400
          "
        />

        {tech.name}
      </span>
    );
  };

  return (
    <section
      id="project"
      ref={sectionRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        px-4
        py-24
        font-mono
        sm:px-6
        lg:px-8
      "
    >
      {/* =====================================
          BACKGROUND ATMOSPHERE
      ===================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/4
            top-20
            h-72
            w-72
            rounded-full
            bg-indigo-600/[0.06]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-20
            right-1/4
            h-72
            w-72
            rounded-full
            bg-teal-500/[0.05]
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-6xl
        "
      >
        {/* =====================================
            SECTION HEADER
        ===================================== */}

        <div
          ref={headingRef}
          className="
            mb-14
            flex
            flex-col
            gap-5
            sm:mb-16
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
            <div
              className="
                mb-4
                flex
                items-center
                gap-3
                text-xs
                uppercase
                tracking-[0.25em]
                text-blue-400
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-blue-400/50
                "
              />

              Selected Work
            </div>

            <h2
              className="
                text-4xl
                font-bold
                tracking-tight
                text-white
                sm:text-5xl
              "
            >
              Things I've{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-teal-400
                  via-blue-400
                  to-indigo-500
                  bg-clip-text
                  text-transparent
                "
              >
                built.
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p
              className="
                text-sm
                leading-7
                text-gray-300
                md:text-right
              "
            >
              A selection of projects where I have
              worked across frontend, backend,
              databases, deployment, and
              product-focused development.
            </p>
          </div>
        </div>

        {/* =====================================
            FEATURED LMS PROJECT
        ===================================== */}

        <article
          ref={featuredRef}
          className="
            group
            relative
            mb-8
            overflow-hidden
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.035]
            backdrop-blur-sm
          "
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top metadata bar */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
              border-b
              border-white/[0.07]
              px-6
              py-4
              sm:px-8
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  text-xs
                  font-bold
                  tracking-[0.2em]
                  text-teal-400
                "
              >
                {projects[0].number}
              </span>

              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-white/20
                "
              />

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-gray-500
                "
              >
                {projects[0].status}
              </span>
            </div>

            <span
              className="
                rounded-full
                border
                border-teal-400/10
                bg-teal-400/[0.06]
                px-3
                py-1
                text-[10px]
                uppercase
                tracking-[0.15em]
                text-teal-400
              "
            >
              {projects[0].type}
            </span>
          </div>

          {/* Main featured content */}

          <div
            className="
              grid
              lg:grid-cols-[1.05fr_0.95fr]
            "
          >
            {/* =================================
                FEATURED IMAGE
            ================================= */}

            <div
              className="
                relative
                overflow-hidden
                border-b
                border-white/[0.07]
                lg:border-b-0
                lg:border-r
              "
            >
              <a
                href={projects[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {/* Image overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    z-10
                    bg-gradient-to-t
                    from-black/50
                    via-transparent
                    to-transparent
                    opacity-70
                  "
                />

                <img
                  data-project-image
                  src={projects[0].image}
                  alt={projects[0].name}
                  loading="lazy"
                  decoding="async"
                  className="
                    h-full
                    min-h-[280px]
                    w-full
                    object-cover
                    object-top
                    transition-transform
                    duration-700
                    lg:min-h-[420px]
                  "
                />

                {/* Live preview badge */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    z-20
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-black/50
                    px-4
                    py-2
                    text-xs
                    text-white
                    backdrop-blur-md
                  "
                >
                  <FaArrowUpRightFromSquare size={11} />

                  Live Preview
                </div>
              </a>
            </div>

            {/* =================================
                FEATURED CONTENT
            ================================= */}

            <div
              className="
                flex
                flex-col
                justify-between
                p-6
                sm:p-8
                lg:p-10
              "
            >
              <div>
                {/* Label */}

                <div
                  className="
                    mb-5
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-gray-400
                  "
                >
                  <FaLayerGroup size={14} />

                  Featured project
                </div>

                {/* Title */}

                <h3
                  className="
                    mb-4
                    text-2xl
                    font-bold
                    text-white
                    sm:text-3xl
                  "
                >
                  {projects[0].name}
                </h3>

                {/* Description */}

                <p
                  className="
                    max-w-xl
                    text-sm
                    leading-7
                    text-gray-400
                  "
                >
                  {projects[0].brief}
                </p>

                {/* Technologies */}

                <div className="mt-7 flex flex-wrap gap-2">
                  {projects[0].tech.map(renderTech)}
                </div>
              </div>

              {/* CTA */}

              <div className="mt-10">
                <a
                  href={projects[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/link
                    inline-flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-gray-200
                    transition-all
                    duration-300
                    hover:border-teal-400/30
                    hover:bg-teal-400/[0.05]
                  "
                >
                  Explore project

                  <FaArrowUpRightFromSquare
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover/link:-translate-y-1
                      group-hover/link:translate-x-1
                    "
                  />
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* =====================================
            OTHER PROJECTS HEADER
        ===================================== */}

        <div
          className="
            mb-5
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-gray-300
              "
            >
              More projects
            </p>
          </div>

          <div
            className="
              hidden
              items-center
              gap-2
              text-xs
              text-gray-300
              sm:flex
            "
          >
            <span>04</span>

            <span
              className="
                h-px
                w-8
                bg-white/10
              "
            />

            <span>Projects</span>
          </div>
        </div>

        {/* =====================================
            SECONDARY PROJECT GRID
        ===================================== */}

        <div
          className="
            grid
            gap-5
            md:grid-cols-3
          "
        >
          {projects.slice(1).map((project, index) => (
            <article
              key={project.name}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                backdrop-blur-sm
              "
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* =================================
                  PROJECT IMAGE
              ================================= */}

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  relative
                  block
                  overflow-hidden
                "
              >
                {/* Number */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    z-20
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/10
                    bg-black/50
                    text-xs
                    font-bold
                    text-gray-300
                    backdrop-blur-md
                  "
                >
                  {project.number}
                </div>

                {/* Image overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    z-10
                    bg-gradient-to-t
                    from-black/60
                    via-transparent
                    to-transparent
                    opacity-60
                    transition-opacity
                    duration-500
                    group-hover:opacity-80
                  "
                />

                <img
                  data-project-image
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  className="
                    aspect-[16/10]
                    w-full
                    object-cover
                    object-top
                    transition-transform
                    duration-700
                  "
                />

                {/* Hover external icon */}

                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    z-20
                    flex
                    h-9
                    w-9
                    translate-x-2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-black/50
                    text-white
                    opacity-0
                    backdrop-blur-md
                    transition-all
                    duration-300
                    group-hover:translate-x-0
                    group-hover:opacity-100
                  "
                >
                  <FaArrowUpRightFromSquare
                    size={14}
                  />
                </div>
              </a>

              {/* =================================
                  PROJECT INFORMATION
              ================================= */}

              <div className="p-5">
                {/* Project type */}

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.16em]
                      text-blue-400
                    "
                  >
                    {project.type}
                  </span>

                  <span
                    className="
                      text-[10px]
                      text-gray-700
                    "
                  >
                    {project.number}
                  </span>
                </div>

                {/* Project name */}

                <h3
                  className="
                    mb-3
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  {project.name}
                </h3>

                {/* Description */}

                <p
                  className="
                    mb-5
                    line-clamp-3
                    text-xs
                    leading-6
                    text-gray-500
                  "
                >
                  {project.brief}
                </p>

                {/* Technologies */}

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(renderTech)}
                </div>

                {/* View project */}

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/view
                    mt-5
                    flex
                    items-center
                    justify-between
                    border-t
                    border-white/[0.06]
                    pt-4
                    text-xs
                    font-medium
                    text-gray-400
                    transition-colors
                    duration-200
                    hover:text-teal-400
                  "
                >
                  View project

                  <FaArrowUpRightFromSquare
                    size={13}
                    className="
                      transition-transform
                      duration-300
                      group-hover/view:-translate-y-0.5
                      group-hover/view:translate-x-0.5
                    "
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* =====================================
            BOTTOM STATEMENT
        ===================================== */}

        <div
          className="
            mt-14
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span
            className="
              h-px
              w-10
              bg-white/50
            "
          />

          <p
            className="
              text-[14px]
              uppercase
              tracking-[0.2em]
              text-gray-300
            "
          >
            More ideas in progress...
          </p>

          <span
            className="
              h-px
              w-10
              bg-white/50
            "
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;