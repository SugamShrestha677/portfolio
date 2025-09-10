import React, { useState } from 'react'
import Navbar from './Ui/Navbar'
import MobileMenu from './Ui/MobileMenu';
import LoadingScreenAnimation from './Ui/LoadingScreenAnimation';
import Home from './sections/Home';
import AnimationWaves from './Ui/AnimationWaves';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import RevealScroll from './Ui/RevealScroll';

const App = () => {
  const [isLoading,setIsLoading] = useState(false);
  const[isMenuOpen,setIsMenuOpen] = useState(false);
  return (
    <>
    {!isLoading &&
      <LoadingScreenAnimation onComplete = {()=>setIsLoading(true)} />
    }
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <RevealScroll>
      <Home/>
      <AnimationWaves/>
      </RevealScroll>
      <About/>
      <Projects/>
      <Contact/>
    </>
  )
}

export default App