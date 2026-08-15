import React, { useRef } from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { SlSocialLinkedin } from "react-icons/sl";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/sugam-shrestha-21a1a1325/",
    label: "LinkedIn",
    icon: SlSocialLinkedin,
    className:
      "bg-blue-700 hover:shadow-[0_4px_20px_rgba(29,78,216,0.5)]",
  },
  {
    href: "https://github.com/SugamShrestha677",
    label: "GitHub",
    icon: FaSquareGithub,
    className:
      "bg-zinc-900 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]",
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: FaInstagramSquare,
    className:
      "bg-gray-800 hover:shadow-[0_4px_20px_rgba(168,85,247,0.35)]",
  },
];

const Footer = () => {
  const footerRef = useRef(null);
  const iconRefs = useRef([]);

  useGSAP(
    () => {
      const footer = footerRef.current;
      const icons = iconRefs.current.filter(Boolean);
      if (!footer || !icons.length) return;

      if (prefersReducedMotion()) {
        gsap.set(icons, { opacity: 1, scale: 1, clearProps: "transform" });
        return;
      }

      const cleanups = [];

      icons.forEach((icon, index) => {
        gsap.fromTo(
          icon,
          { opacity: 0, y: 24, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "back.out(1.4)",
            delay: index * 0.1,
            immediateRender: false,
            scrollTrigger: {
              trigger: footer,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const onEnter = () => {
          gsap.to(icon, {
            y: -8,
            scale: 1.12,
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(icon, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        icon.addEventListener("mouseenter", onEnter);
        icon.addEventListener("mouseleave", onLeave);
        icon.addEventListener("focusin", onEnter);
        icon.addEventListener("focusout", onLeave);
        cleanups.push(() => {
          icon.removeEventListener("mouseenter", onEnter);
          icon.removeEventListener("mouseleave", onLeave);
          icon.removeEventListener("focusin", onEnter);
          icon.removeEventListener("focusout", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: footerRef }
  );

  return (
    <footer className="px-4 sm:px-6 pb-8 sm:pb-10">
      <div
        ref={footerRef}
        className="max-w-5xl mx-auto min-h-[120px] flex flex-col justify-center gap-5 sm:gap-6 text-center font-mono pt-8 border-t border-white/10"
      >
        <p className="text-gray-400 text-sm sm:text-base">
          Connect with me
        </p>

        <div className="flex flex-wrap gap-5 sm:gap-8 justify-center items-center">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                ref={(el) => (iconRefs.current[index] = el)}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center min-w-[52px] min-h-[52px] sm:min-w-[56px] sm:min-h-[56px] border border-white/20 text-2xl sm:text-3xl rounded-xl text-white transition-shadow duration-200 active:scale-95 ${link.className}`}
              >
                <Icon />
              </a>
            );
          })}
        </div>

        <p className="text-white/80 mt-2 text-xs sm:text-sm">
          © 2026 Sugam Shrestha. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
