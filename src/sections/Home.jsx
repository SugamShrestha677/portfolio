import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Link } from "react-scroll";
import { useGSAP } from "@gsap/react";
import { FiEye } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import profile from "../assets/profiles.png";
import resumePdf from "../assets/SugamShrestha-Frontend.pdf";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";
import { createHeroEntrance } from "../animations/preloader";
import useMagneticHover from "../hooks/useMagneticHover";
import useMouseParallax from "../hooks/useMouseParallax";

const Home = ({ isLoaded }) => {
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const parallaxRef = useMouseParallax({ strength: 0.03 });
  const glowAnimRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const {
    ref: magneticRef,
    onMouseMove,
    onMouseLeave,
  } = useMagneticHover({ strength: 0.25 });

  // Split heading into words for staggered animation
  useLayoutEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const originalText = el.textContent;
    const words = originalText.split(" ");
    el.innerHTML = words
      .map(
        (word, i) =>
          `<span class="hero-word inline-block" data-word="${i}">${word}</span>`,
      )
      .join('<span class="inline-block">&nbsp;</span>');

    // Keep words visible after split even on browsers where parent
    // gradient clipping does not apply to child spans.
    el.querySelectorAll(".hero-word").forEach((wordEl) => {
      wordEl.style.color = "#e5e7eb";
    });

    return () => {
      if (el) el.textContent = originalText;
    };
  }, []);

  // ---- MAIN ANIMATIONS ----
  useGSAP(
    () => {
      // If not loaded yet, skip GSAP but ensure elements are visible via CSS fallback
      if (!isLoaded) {
        // Set all animated elements to visible as a safety net
        const elements = [
          headingRef.current?.querySelectorAll(".hero-word"),
          paragraphRef.current,
          buttonsRef.current,
          imageRef.current,
        ]
          .flat()
          .filter(Boolean);
        gsap.set(elements, { opacity: 1, clearProps: "all" });
        return;
      }

      const reduced = prefersReducedMotion();
      const words = headingRef.current?.querySelectorAll(".hero-word");

      if (reduced) {
        gsap.set(
          [
            paragraphRef.current,
            buttonsRef.current,
            imageRef.current,
            ...(words || []),
          ].filter(Boolean),
          { opacity: 1, clearProps: "all" },
        );
        return;
      }

      // Normal animation flow
      createHeroEntrance({
        paragraph: paragraphRef.current,
        buttons: buttonsRef.current,
        image: imageRef.current,
      });

      if (words?.length) {
        gsap.from(words, {
          y: 35,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.25,
        });
      }
    },
    { dependencies: [isLoaded], scope: sectionRef },
  );

  // ---- FLOATING IMAGE ANIMATION ----
  useGSAP(
    () => {
      if (!isLoaded || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        const target = imageWrapperRef.current || imageRef.current;
        if (target) {
          gsap.to(target, {
            y: -12,
            rotation: 2,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
      return () => mm.revert();
    },
    { dependencies: [isLoaded], scope: sectionRef },
  );

  // ---- GLOW BACKGROUND ----
  useGSAP(
    () => {
      if (!isLoaded || !glowAnimRef.current || prefersReducedMotion()) return;
      let tickerFn;
      gsap.to(glowAnimRef.current, {
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      tickerFn = () => {
        if (glowAnimRef.current) {
          const t = performance.now() * 0.0003;
          gsap.set(glowAnimRef.current, {
            backgroundPosition: `${50 + Math.sin(t) * 20}% ${50 + Math.cos(t) * 15}%`,
          });
        }
      };
      gsap.ticker.add(tickerFn);
      return () => gsap.ticker.remove(tickerFn);
    },
    { dependencies: [isLoaded], scope: sectionRef },
  );

  // ---- SCROLL INDICATOR BOUNCE ----
  useGSAP(
    () => {
      if (!isLoaded || !scrollIndicatorRef.current || prefersReducedMotion())
        return;
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { dependencies: [isLoaded], scope: sectionRef },
  );

  // ---- FALLBACK: Force visibility if animations never run ----
  useEffect(() => {
    if (!isLoaded) {
      // If after 2 seconds isLoaded is still false, make everything visible anyway
      const timer = setTimeout(() => {
        const elements = [
          headingRef.current?.querySelectorAll(".hero-word"),
          paragraphRef.current,
          buttonsRef.current,
          imageRef.current,
        ]
          .flat()
          .filter(Boolean);
        gsap.set(elements, { opacity: 1, clearProps: "all" });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <>
      <section
        ref={sectionRef}
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center lg:flex-row-reverse gap-6 sm:gap-9 lg:gap-15 px-4 sm:px-6 pt-20 sm:pt-5 pb-16 sm:pb-10 overflow-hidden"
      >
        {/* Parallax background */}
        <div
          ref={parallaxRef}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            ref={glowAnimRef}
            className="hero-gradient-bg absolute inset-0 opacity-40"
            style={{ backgroundSize: "200% 200%" }}
          />
        </div>

        {/* Profile Image */}
        <div className="text-center z-10 px-4">
          <div
            ref={(el) => {
              imageWrapperRef.current = el;
              magneticRef.current = el;
            }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="inline-block"
          >
            <img
              ref={imageRef}
              src={profile}
              loading="eager"
              decoding="async"
              alt="Sugam Shrestha — Web Developer"
              className="w-[180px] sm:w-[200px] border-0 mt-6 sm:mt-10 rounded-full shadow-lg shadow-gray-500/70 lg:m-0 lg:max-w-[250px] object-cover object-bottom hover:shadow-indigo-500/40 transition-shadow duration-300"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center font-mono z-10 px-4 max-w-3xl">
          <h1
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:max-w-[500px] font-semibold mb-4 sm:mb-6 px-1 
                       text-gray-200 leading-relaxed mx-auto"
          >
            Hi, I'm Sugam Shrestha
          </h1>

          <p
            ref={paragraphRef}
            className="text-gray-300 text-lg mb-8 max-w-lg mx-auto"
          >
            A passionate web developer creating responsive, user-friendly, and
            accessible websites. I combine design and code to deliver engaging
            digital experiences. Explore my portfolio to see my work.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-wrap justify-center items-center gap-4"
          >
            {/* FIX 2: Explicit text-white on Link */}
            <Link
              to="contact"
              smooth
              duration={500}
              offset={-64}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-indigo-600 
               py-3 px-6 rounded font-medium text-white
               active:scale-[0.97] cursor-pointer"
            >
              Contact Me
            </Link>

            <button
              type="button"
              onClick={() => setIsResumePreviewOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-indigo-600 py-3 px-6 rounded font-mono font-medium text-white active:scale-[0.97]"
            >
              {" "}
              Preview Resume <FiEye className="text-xl" />{" "}
            </button>

            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-indigo-600 py-3 px-6 rounded text-white"
            >
              Open Resume
              <FiDownload className="text-xl" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <Link
            to="about"
            smooth
            duration={500}
            offset={-64}
            className="block text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to About section"
          >
            <HiOutlineChevronDoubleDown className="text-3xl" />
          </Link>
        </div>
      </section>

      {/* Resume Preview Modal */}
      {isResumePreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#1C0D30] p-6 shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
                  Resume Preview
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">
                  Sugam Shrestha
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsResumePreviewOpen(false)}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-300 transition hover:border-blue-500/40 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <iframe
                src={resumePdf}
                title="Resume Preview"
                className="h-[70vh] w-full bg-white"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <a
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
              >
                Open full resume in a new tab
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
