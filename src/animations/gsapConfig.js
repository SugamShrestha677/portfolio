import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const gsapMatchMedia = gsap.matchMedia();

export const defaultEase = "power2.out";

export { gsap, ScrollTrigger };
