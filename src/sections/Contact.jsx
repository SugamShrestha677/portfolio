import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import useScrollReveal from "../hooks/useScrollReveal";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

const Contact = () => {
  const formRef = useRef(null);
  const submitBtnRef = useRef(null);

  const sectionRef = useScrollReveal({
    selector: "[data-reveal]",
    from: { opacity: 0, y: 30 },
    stagger: 0.08,
    duration: 0.6,
    ease: "power2.out",
  });

  useGSAP(
    () => {
      const form = formRef.current;
      if (!form || prefersReducedMotion()) return;

      const fields = form.querySelectorAll("input, textarea");
      const cleanups = [];

      fields.forEach((field) => {
        const onFocus = () => {
          gsap.fromTo(
            field,
            { scale: 1 },
            { scale: 1.02, duration: 0.4, ease: "elastic.out(1, 0.5)" }
          );
        };
        const onBlur = () => {
          gsap.to(field, { scale: 1, duration: 0.3, ease: "power2.out" });
        };
        field.addEventListener("focusin", onFocus);
        field.addEventListener("focusout", onBlur);
        cleanups.push(() => {
          field.removeEventListener("focusin", onFocus);
          field.removeEventListener("focusout", onBlur);
        });
      });

      const btn = submitBtnRef.current;
      if (btn) {
        const onClick = () => {
          const ripple = document.createElement("span");
          ripple.className = "absolute inset-0 rounded bg-white/20 pointer-events-none";
          ripple.style.transform = "scale(0)";
          btn.appendChild(ripple);

          gsap.to(ripple, {
            scale: 2.5,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => ripple.remove(),
          });
        };
        btn.addEventListener("click", onClick);
        cleanups.push(() => btn.removeEventListener("click", onClick));
      }

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: formRef }
  );

  return (
    <section
      id="contact"
      className="w-full max-w-2xl mx-auto min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      <div ref={sectionRef} className="px-1 w-full">
        <h2
          data-reveal
          className="max-w-full text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center"
        >
          Get In Touch
        </h2>

        <form
          ref={formRef}
          name="contact"
          method="POST"
          action="https://formsubmit.co/info@shresthasugam.com.np"
          className="space-y-6"
        >
          <div data-reveal>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name..."
              required
              className="w-full bg-white/10 border border-white/10 rounded px-4 py-3 text-white transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
            />
          </div>
          <div data-reveal>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              required
              className="w-full bg-white/10 border border-white/10 rounded px-4 py-3 text-white transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
            />
          </div>
          <div data-reveal>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Type your message..."
              required
              className="w-full bg-white/10 border border-white/10 rounded px-4 py-3 text-white transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
            />
          </div>

          <button
            ref={submitBtnRef}
            data-reveal
            type="submit"
            className="w-full bg-gradient-to-r flex justify-center cursor-pointer from-teal-500 to-indigo-600 px-6 rounded font-medium transition-all duration-200 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] py-3 active:scale-[0.97]"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
