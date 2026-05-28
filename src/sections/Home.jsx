import React, { useState } from "react";
import profile from "../assets/profiles.png";
import resumePdf from "../assets/SugamShrestha-Frontend.pdf";
import { FiDownload, FiEye } from "react-icons/fi";

const Home = () => {
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center lg:flex-row-reverse gap-9 lg:gap-15 px-4 pt-24 pb-10"
      >
        <div className="text-center z-10 px-4">
          <img
            src={profile}
            loading="lazy"
            decoding="async"
            alt="Profile img"
            className="w-[200px] border-0 mt-10 rounded-full shadow-lg shadow-gray-500/70 lg:m-0 lg:max-w-[250px] object-cover object-bottom hover:translate-y-1 transition-all"
          />
        </div>

        <div className="text-center font-mono z-10 px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl lg:max-w-[500px] font-semibold mb-6 px-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent leading-relaxed mx-auto">
            Hi, I’m Sugam Shrestha
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto">
            A passionate web developer creating responsive, user-friendly, and
            accessible websites. I combine design and code to deliver engaging
            digital experiences. Explore my portfolio to see my work.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="#contact"
              className="bg-gradient-to-r flex flex-row from-teal-500 to-indigo-600 py-3 px-6 rounded hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-medium transition relative overflow-hidden"
            >
              Contact Me
            </a>

            <button
              type="button"
              onClick={() => setIsResumePreviewOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-indigo-600 py-3 px-6 rounded font-mono font-medium text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition"
            >
              Preview Resume
              <FiEye className="text-xl" />
            </button>

            {/* <a
              href={resumePdf}
              download="SugamShrestha-Frontend.pdf"
              className="bg-gradient-to-r flex flex-row items-center from-teal-500 to-indigo-600 py-3 px-6 rounded hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-medium font-mono transition relative overflow-hidden"
            >
              <p>Download Resume (PDF)</p>
              <span className="h-5 ml-3 text-2xl text-white">
                <FiDownload />
              </span>
            </a> */}
          </div>
        </div>
      </section>

      {isResumePreviewOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#1C0D30] p-6 shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
                  Resume Preview
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">
                  Sugam Shrestha
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsResumePreviewOpen(false)}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-300 transition hover:border-blue-500/40 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <iframe
                src={resumePdf}
                title="Resume Preview"
                className="h-[70vh] w-full bg-white"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Home;

