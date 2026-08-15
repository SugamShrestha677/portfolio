import React, { useRef } from "react";
import { Link } from "react-scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RxCross2 } from "react-icons/rx";
import { prefersReducedMotion } from "../animations/gsapConfig";

const navLinks = [
  { label: "Home", to: "home" },
  { label: "About", to: "about" },
  { label: "Project", to: "project" },
  { label: "Experience", to: "experience" },
  { label: "Achievements", to: "achievements" },
  { label: "Contact", to: "contact" },
];

const scrollLinkProps = {
  smooth: true,
  duration: 500,
  offset: -64,
};

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  useGSAP(
    () => {
      if (!overlayRef.current) return;

      const reduced = prefersReducedMotion();

      if (isMenuOpen) {
        gsap.to(overlayRef.current, {
          clipPath: "circle(150% at 95% 3%)",
          duration: reduced ? 0 : 0.5,
          ease: "power3.inOut",
        });
        gsap.from(linksRef.current.filter(Boolean), {
          y: 30,
          opacity: 0,
          duration: reduced ? 0 : 0.4,
          stagger: 0.06,
          ease: "power2.out",
          delay: reduced ? 0 : 0.2,
        });
      } else {
        gsap.to(overlayRef.current, {
          clipPath: "circle(0% at 95% 3%)",
          duration: reduced ? 0 : 0.4,
          ease: "power3.inOut",
        });
      }
    },
    { dependencies: [isMenuOpen] }
  );

  return (
    <div
      ref={overlayRef}
      className={`fixed w-full top-0 left-0 h-screen bg-[rgba(10,10,10,0.95)] backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-6 sm:gap-8 px-6 ${
        isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{ clipPath: "circle(0% at 95% 3%)" }}
      aria-hidden={!isMenuOpen}
    >
      <button
        className="absolute top-5 right-7 text-2xl focus:outline-none cursor-pointer text-white/80 hover:text-white transition-colors"
        aria-label="Close Menu"
        onClick={() => setIsMenuOpen(false)}
      >
        <RxCross2 />
      </button>

      {navLinks.map((link, i) => (
        <Link
          key={link.label}
          to={link.to}
          {...scrollLinkProps}
          ref={(el) => (linksRef.current[i] = el)}
          className="text-2xl sm:text-3xl font-semibold text-white/90 hover:text-white transition-colors duration-200 cursor-pointer py-2 min-h-[44px] flex items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;
