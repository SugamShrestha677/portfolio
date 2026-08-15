import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { createPreloaderExit } from "../animations/preloader";

const LoadingScreenAnimation = ({ onComplete }) => {
  const [text, setText] = React.useState("");
  const overlayRef = useRef(null);
  const fullText = "Glad to have you here!";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          if (!overlayRef.current) {
            onComplete();
            return;
          }
          createPreloaderExit(overlayRef.current, onComplete);
        }, 600);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center gap-5"
    >
      <div className="w-[300px] h-[3px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#4179e3] animate-loading-bar" />
      </div>

      <div className="mb-4 text-2xl font-mono font-semibold">
        {text}
        <span className="animate-blink ml-1 text-2xl font-bold">|</span>
      </div>

      <div className="w-[300px] h-[3px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#4179e3] animate-loading-bar" />
      </div>
    </div>
  );
};

export default LoadingScreenAnimation;
