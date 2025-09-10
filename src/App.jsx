import React, { useState } from 'react'
import Navbar from './Ui/Navbar'
import MobileMenu from './Ui/MobileMenu';
import LoadingScreenAnimation from './Ui/LoadingScreenAnimation';
import Home from './sections/Home';

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
      <Home/>
    </>
  )
}

export default App