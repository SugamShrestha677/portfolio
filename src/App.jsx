import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Ui/Navbar'
import MobileMenu from './Ui/MobileMenu';
import LoadingScreenAnimation from './Ui/LoadingScreenAnimation';
import Home from './sections/Home';
import AnimationWaves from './Ui/AnimationWaves';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import RevealScroll from './Ui/RevealScroll';
import Footer from './sections/Footer';
import BlogPostSummary from "./pages/BlogPostSummary";

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
      <Footer/>
      <Router>
        <Routes>
          <Route 
          path= "/blog/10-best-practices-clean-react-code"
          element={<BlogPostSummary />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App