import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { useGSAP } from "@gsap/react";
import Logo from "./Logo";
import { MdMenu } from "react-icons/md";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

const navItems = [
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
  spy: true,
  activeClass: "text-white",
};

const Navbar = forwardRef(({ isMenuOpen, setIsMenuOpen }, ref) => {
  const navRef = useRef(null);
  const underlineRefs = useRef([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  // Glass morphism via CSS classes — GSAP cannot animate backdrop-filter
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const cleanups = [];

      mm.add("(min-width: 769px)", () => {
        underlineRefs.current.forEach((underline) => {
          const link = underline?.parentElement;
          if (!link || !underline) return;

          const onEnter = () => {
            gsap.to(underline, {
              width: "100%",
              left: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const onLeave = () => {
            gsap.to(underline, {
              width: 0,
              left: "50%",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          link.addEventListener("mouseenter", onEnter);
          link.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            link.removeEventListener("mouseenter", onEnter);
            link.removeEventListener("mouseleave", onLeave);
          });
        });
      });

      return () => {
        cleanups.forEach((fn) => fn());
        mm.revert();
      };
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={(el) => {
        navRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      className={`fixed top-0 w-full z-40 px-3 sm:px-4 border-b border-white/10 transition-all duration-300 ${
        scrolled
          ? "bg-[#1C0D30]/90 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-[#1C0D30]/50 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-0">
        <div className="flex justify-between items-center font-mono h-16">
          <Logo />

          <div
            className="text-2xl absolute right-7 z-40 md:hidden cursor-pointer font-mono"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <MdMenu />
          </div>

          <div className="flex md:flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, i) => (
                <Link
                  key={item.label}
                  to={item.to}
                  {...scrollLinkProps}
                  className="relative text-gray-300 text-lg font-medium transition-colors duration-200 hover:text-white cursor-pointer"
                >
                  {item.label}
                  <span
                    ref={(el) => (underlineRefs.current[i] = el)}
                    className="absolute -bottom-1 left-1/2 h-[2px] w-0 bg-gradient-to-r from-teal-400 to-indigo-500"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
