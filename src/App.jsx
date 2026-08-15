import React, { useState, useCallback, useEffect } from "react";
import { ScrollTrigger } from "./animations/gsapConfig";
import ScrollProgress from "./Ui/ScrollProgress";
import Navbar from "./Ui/Navbar";
import MobileMenu from "./Ui/MobileMenu";
import LoadingScreenAnimation from "./Ui/LoadingScreenAnimation";
import Home from "./sections/Home";
import AnimationWaves from "./Ui/AnimationWaves";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("load", refresh);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) return;

    // Failsafe: ensure content becomes visible even if preloader callback is missed.
    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, 4500);

    return () => clearTimeout(fallbackTimer);
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && (
        <LoadingScreenAnimation onComplete={handleLoadingComplete} />
      )}
      <div className={isLoaded ? "" : "invisible"}>
        <ScrollProgress />
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Home isLoaded={isLoaded} />
        <AnimationWaves />
        <About />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default App;
