import { useState } from 'react'
import star from './assets/tl.webp'
import './App.css'
import { motion } from "motion/react"
import { BsArrowRight } from 'react-icons/bs';
import { FaExclamation } from 'react-icons/fa';
import { Link } from 'react-router';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-black'>
      <div className='w-screen overflow-hidden selection:bg-fuchsia-700/40 text-white bg-gradient-to-tr from-gray-950 to-stone-950 space-y-12 h-screen flex flex-col justify-center'>
      
      <motion.img initial={{opacity:0}} animate={{opacity:1, transition:{duration:3}}} className='right-0 pointer-events-none fixed h-full self-center z-0' src={star}/>

      <motion.img initial={{opacity:0}} animate={{opacity:1, transition:{duration:3}}} className='left-0 rotate-180 pointer-events-none fixed h-full self-center z-0' src={star}/>


        <motion.h1 initial={{opacity:0}} animate={{opacity:1, transition:{duration:1.7, delay:0.3}}} className='text-center z-10 text-6xl font-[Azonix]'>echo AI</motion.h1>
      
      <motion.h2 initial={{opacity:0}} animate={{opacity:1, transition:{duration:1.7, delay:0.7}}} className='font-[italiana]  z-10 text-center text-3xl'>Transform your ideas into scroll-stopping posts with just a prompt
        <p className='font-[italiana] mt-4 z-10 text-center text-2xl'>Hear your brand Echo through the web</p>
      </motion.h2>
            

    <motion.div initial={{opacity:0}} animate={{opacity:1, transition:{duration:1.7, delay:1.3}}} className='grid grid-cols-2 max-w-5/6 w-lg place-items-center self-center '>
     <Link to='/about' className='text-white flex select-none shadow-gray-600/30 transition-all hover:shadow-none duration-300 hover:translate-x-1 hover:translate-y-1 shadow-xl flex-row rounded-full font-thin w-fit px-12 py-4 text-2xl font-[Ubuntu] bg-gray-700 self-center z-10'> <span className='self-center mr-6'><FaExclamation/></span>About
     
      </Link>
      <Link to='/app' className='text-white flex select-none shadow-fuchsia-400/30 transition-all hover:shadow-none duration-300 hover:translate-x-1 hover:translate-y-1 shadow-xl flex-row rounded-full font-thin w-fit px-6 py-4 text-2xl font-[Ubuntu] bg-fuchsia-600 self-center z-10'>Get Started
      <span className='self-center ml-2'><BsArrowRight/></span>
      </Link>
      </motion.div>
    </div></div>
  )
}

export default App
