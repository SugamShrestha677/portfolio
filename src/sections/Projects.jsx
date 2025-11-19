import React, { useState } from 'react'
import grocery from '../assets/grocery.png'
import estate from '../assets/estate.png'
import ecommerce from '../assets/ecommerce.png'
import dashboard from '../assets/dashboard-app.webp'
import RevealScroll from '../Ui/RevealScroll'
const Projects = () => {
  const[projects] = useState([
    {image:estate,name:"Estate", brief:"A modern real estate landing page with responsive design and sleek visuals, built using React and Tailwind CSS.",link:"https://estateprojects.netlify.app/"},
    {image:grocery,name:"Grocery App", brief:"A clean, user-friendly grocery storefront showcasing fresh products with intuitive navigation and polished UI.",link:"https://grocify-3zbt.onrender.com/"},
    {image:ecommerce,name:"ecommerce", brief:"A stylish ecommerce interface featuring dynamic product displays and promotional banners for a smooth shopping experience.",link:"https://ecommercedemos.netlify.app/"},
  ])
  return (
    <section id='project' className='min-h-screen flex items-center font-mono justify-center py-20 '>
      <RevealScroll>
      <div className='max-w-3xl mx-auto px-4'>
        <h2 className='max-w-3xl text-4xl font-semibold mb-12 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center'>Features Projects</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
          {
            projects.map((project,index)=>(
                <div key={index} className='p-6 rounded-xl flex flex-col items-center text-center border-2 border-white/10 hover:border-blue-500/30 hover:shadow-[9_2px_8px_rgba(59,130,246,0.2)] hover:-translate-y-1 transition-all hover:bg-cyan-900'>
                    <h3 className='font-semibold text-xl mb-4'>{project.name}</h3>
                    <p className='text-gray-300 mb-4'>{project.brief}</p>
                    <div className='flex flex-wrap sm:items-center gap-2 mb-4'>
                      {["React","Tailwind Css","Netlify"].map((tech,index)=>(
                        <span key={index} className='bg-blue-500/10 text-blue-400 py-1 px-3 rounded-full text-balance hover:bg-blue-500/20 hover:shadow-[9_2px_8px_rgba(59,130,22.46,0.2)] transition'>{tech}</span>
                      ))}
                      <div className='flex flex-col text-center my-5 py-3 justify-center gap-3 border-2 border-white/10 hover:border-blue-500/30 hover:shadow-[9_2px_8px_rgba(59,130,22.46,0.2)] cursor-pointer rounded-xl'>
                        <p className='text-gray-200'>View Project</p>
                        <a href={project.link} className='flex justify-between items-center font-bold text-blue-400 transition-colors hover:text-white'>
                        <img src={project.image} alt={project.name} loading="lazy" decoding="async"/>
                        </a>
                      </div>
                    </div>
                </div>
            ))
          }
        </div>
      </div>
      </RevealScroll>
    </section>
  )
}


export default Projects
