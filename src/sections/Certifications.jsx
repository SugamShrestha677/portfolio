import React, { useRef } from "react";
import { FaUsers, FaLightbulb, FaCalendarDays } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

const achievements = [
  {
    icon: FaLightbulb,
    title: "The ClockMakers Hackathon",
    date: "21st – 23rd February 2025",
    organizer: "PCPS College",
    role: "Participant",
    details:
      "Collaborated on a hardware-software integration project, learned rapid prototyping under 48-hour constraints.",
  },
  {
    icon: FaUsers,
    title: "Relay Hack x Leapfrog Connect",
    date: "16th April – 8th May 2026",
    organizer:
      "Techspire College, in collaboration with Ministry of Education, Science and Technology, Nepal",
    role: "Active participant (teamwork, research, creativity)",
    details:
      "Built a prototype for educational accessibility, solved real-world challenges through collaboration.",
  },
];

const Certifications = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector("[data-achievement-heading]");
      const cards = cardsRef.current.filter(Boolean);

      if (prefersReducedMotion()) {
        gsap.set([heading, ...cards].filter(Boolean), {
          opacity: 1,
          clearProps: "transform",
        });
        return;
      }

      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const cleanups = [];

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.2)",
            delay: index * 0.12,
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        const onEnter = () => {
          gsap.to(card, {
            y: -6,
            boxShadow: "0 12px 40px rgba(59, 130, 246, 0.2)",
            duration: 0.35,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
            duration: 0.35,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card.addEventListener("touchstart", onEnter, { passive: true });
        card.addEventListener("touchend", onLeave, { passive: true });
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
          card.removeEventListener("touchstart", onEnter);
          card.removeEventListener("touchend", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-16 sm:py-20 font-mono px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2
          data-achievement-heading
          className="text-3xl sm:text-4xl font-semibold mb-10 sm:mb-12 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center"
        >
          Achievements & Hackathons
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;

            return (
              <article
                key={achievement.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-lg shadow-black/20 group cursor-default"
              >
                <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-xl sm:text-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon />
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 leading-snug">
                    <FaCalendarDays className="shrink-0" />
                    {achievement.date}
                  </span>
                </div>

                <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-semibold text-white leading-snug">
                  {achievement.title}
                </h3>

                <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                  <p>
                    <span className="text-blue-300 font-medium">Organizer / Venue:</span>{" "}
                    {achievement.organizer}
                  </p>
                  <p>
                    <span className="text-blue-300 font-medium">My role:</span>{" "}
                    {achievement.role}
                  </p>
                  <p>
                    <span className="text-blue-300 font-medium">What I built / learned:</span>{" "}
                    {achievement.details}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs sm:text-sm text-blue-300">
                    Hackathon Participation
                  </span>
                  <span className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs sm:text-sm text-gray-300">
                    Real participation record
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
