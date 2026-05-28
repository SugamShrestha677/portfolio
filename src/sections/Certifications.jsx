import React from "react";
import { FaTrophy, FaUsers, FaLightbulb, FaCalendarDays } from "react-icons/fa6";
import RevealScroll from "../Ui/RevealScroll";

const Certifications = () => {
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

  return (
    <section
      id="achievements"
      className="flex items-center justify-center py-20 font-mono"
    >
      <RevealScroll>
        <div className="max-w-5xl mx-auto px-4 w-full">
          <h2 className="text-4xl font-semibold mb-12 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center">
            Achievements & Hackathons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;

              return (
                <article
                  key={achievement.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-cyan-900/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-2xl text-blue-400">
                      <Icon />
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                      <FaCalendarDays />
                      {achievement.date}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    {achievement.title}
                  </h3>

                  <div className="mt-4 space-y-3 text-gray-300">
                    <p>
                      <span className="text-blue-300">Organizer / Venue:</span> {achievement.organizer}
                    </p>
                    <p>
                      <span className="text-blue-300">My role:</span> {achievement.role}
                    </p>
                    <p>
                      <span className="text-blue-300">What I built / learned:</span> {achievement.details}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
                      Hackathon Participation
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300">
                      Real participation record
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </RevealScroll>
    </section>
  );
};

export default Certifications;