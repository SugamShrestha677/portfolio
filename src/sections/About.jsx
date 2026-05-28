import React from "react";
import RevealScroll from "../Ui/RevealScroll";

const About = () => {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Django",
    "PostgreSQL",
    "Docker",
    "AWS EC2",
    "Redis",
    "Celery",
    "Git & GitHub",
    "REST APIs",
    "Responsive UI",
  ];

  const focusAreas = [
    "Fullstack web development with React, Tailwind CSS, Django, and PostgreSQL.",
    "Backend workflows with Docker, Redis, Celery, and basic AWS services.",
    "Building responsive, mobile-friendly interfaces with clean structure and reusable components.",
  ];

  return (
    <section
      id="about"
      className="min-h-screen font-mono flex items-center justify-center py-14 overflow-hidden"
    >
      <RevealScroll>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="max-w-3xl text-4xl font-semibold mb-16 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center">
            About Me
          </h2>

          <div className="p-8 mb-10 rounded-xl border-white/10 border-2 hover:-translate-y-1 transition-all bg-white/5">
            <p className="text-gray-300 mb-5 text-lg md:text-xl leading-8">
              I am a fullstack-focused developer building responsive web
              applications with a strong interest in backend systems and
              practical problem solving. I like turning ideas into working
              features, especially when the work needs clean structure, fast
              iteration, and reliable implementation.
            </p>
            <p className="text-gray-300 text-lg md:text-xl leading-8">
              My recent work has included backend engineering tasks, hackathon
              participation, and projects that combine interface design with
              database, caching, and background-job workflows. I enjoy learning
              new tools quickly and applying them to ship useful results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/10 p-6 hover:-translate-y-1 transition-all bg-white/5">
              <h3 className="text-2xl text-center font-bold mb-6">
                What I Focus On
              </h3>
              <ul className="space-y-4 text-gray-300 text-base md:text-lg leading-7">
                {focusAreas.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 p-6 hover:-translate-y-1 transition-all bg-white/5">
              <h3 className="text-2xl text-center font-bold mb-6">Skills</h3>
              <div className="flex justify-center flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-500/10 text-blue-300 py-1 px-3 rounded-full text-sm md:text-base hover:bg-blue-500/20 hover:shadow-[9_2px_8px_rgba(59,130,246,0.2)] transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-xl border border-white/10 hover:-translate-y-1 transition-all bg-white/5">
            <h3 className="text-2xl text-center font-bold mb-6">Education</h3>
            <ul className="pl-5 list-disc list-inside text-base md:text-lg text-gray-300 leading-8">
              <li>
                <strong><em>BSc in Software Engineering (Hons)</em></strong> at University of Bedfordshire (2024–2027)
              </li>
              <li>
                <strong><em>Science Faculty (High School)</em></strong> at Khwopa Secondary School (2022–2023)
              </li>
            </ul>
          </div>
        </div>
      </RevealScroll>
    </section>
  );
};

export default About;
