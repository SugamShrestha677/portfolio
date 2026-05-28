import React from "react";
import { FaBriefcase } from "react-icons/fa6";
import RevealScroll from "../Ui/RevealScroll";

const Experience = () => {
  const responsibilities = [
    "Learned and used Docker for containerization, starting from zero knowledge.",
    "Used basic AWS services such as EC2 and S3 without senior-level scope.",
    "Integrated Redis for caching and session management.",
    "Implemented async tasks with Celery for background jobs.",
  ];

  return (
    <section
      id="experience"
      className="flex items-center justify-center font-mono py-15"
    >
      <RevealScroll>
        <div className="max-w-4xl mx-auto px-4 w-full">
          <h2 className="text-4xl font-semibold mb-12 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center">
            Work Experience
          </h2>

          <div
            className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-lg shadow-black/20"
            style={{ borderLeft: "4px solid #2563eb" }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-3 text-blue-400">
                  <FaBriefcase />
                  <h3 className="text-2xl font-semibold">Depth Nepal</h3>
                </div>
                <p className="mt-2 text-lg text-gray-200">
                  Backend Engineering Intern
                </p>
              </div>

              <span className="inline-flex w-fit rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                Jan 2026 – May 2026 · 4 months
              </span>
            </div>

            <ul className="mt-6 space-y-3 text-gray-300">
              {responsibilities.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealScroll>
    </section>
  );
};

export default Experience;