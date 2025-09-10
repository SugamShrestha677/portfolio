import React from "react";

const About = () => {
  const skills = [
    "Html",
    "Css",
    "Javascript",
    "React",
    "TailwindCSS",
    "Django",
    "PostgreSQL",
  ];
  return (
    <section
      id="about"
      className="min-h-screen font-mono flex items-center justify-center py-20 "
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="max-w-3xl text-4xl font-semibold mb-12 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center">
          About Me
        </h2>
        <div className="p-8 mb-6 rounded-xl border-white/10 border-2 hover:-translate-y-1 transition-all ">
          <p className="text-gray-300 mb-5 text-xl">
            {" "}
            Passionate developer with expertse in building scalable web
            applications and creating innovative solutions.{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="rounded-xl p-6 hover:translate-y-1 transition-all">
            <h3 className="text-2xl text-center font-bold mb-8">Skills</h3>
            <div className="flex justify-center flex-wrap gap-2 ">
              {
                skills.map((skill,index)=>(
                  <span key={index} className="bg-blue-500/10 text-blue-400 py-1 px-3 rounded-full text-balance hover:bg-blue-500/20 hover:shadow-[9_2px_8px_rgba(59,130,22.46,0.2)] transition">{skill}</span>
                ))
              }
            </div>
          </div>

          <div className="p-6 hover:-translate-y-1 transition-all">
              <h3 className="text-2xl text-center font-bold mb-8">Edication</h3>
              <ul className="pl-5 list-disc list-inside text-lg text-gray-300">
                <li>
                    <strong><em>Bsc in Software Engineering (hons)</em></strong>
                    x University of Bedfordshire (2023-2027)
                </li>

                <li>
                  Cisco Networking, React(geeks for geeks), Hackathon Participation
                </li>
              </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
