import './App.css'
import { motion } from "motion/react"
import { Link } from 'react-router'
import star from './assets/tl.webp'

function About() {
  return (
    <div className='bg-black'>
      <div className='w-screen overflow-hidden selection:bg-fuchsia-700/40 text-white bg-gradient-to-tr from-gray-950 to-stone-950 space-y-12 h-screen flex flex-col justify-center'>
        <motion.img initial={{opacity:0}} animate={{opacity:1, transition:{duration:3}}} className='left-0 pointer-events-none fixed h-full self-center z-0' src={star}/>
        <motion.img initial={{opacity:0.3, x:7}} animate={{opacity:0.5, x:-7,transition:{duration:1, repeat:10, delay:0.7, repeatType:'mirror'}}} className='left-0 pointer-events-none fixed h-full self-center z-0' src={star}/>
        <motion.img initial={{opacity:0}} animate={{opacity:1, transition:{duration:3}}} className='right-0 rotate-180 pointer-events-none fixed h-full self-center z-0' src={star}/>
        <motion.img initial={{opacity:0.3, x:7}} animate={{opacity:0.5, x:-7, transition:{duration:1, repeat:10,delay:0.7, repeatType:'mirror'}}} className='right-0  rotate-180 pointer-events-none fixed h-full self-center z-0' src={star}/>

        <motion.h1 initial={{opacity:0}} animate={{opacity:1, transition:{duration:1.7, delay:0.3}}} className='text-center z-10 text-6xl font-[Azonix]'>
          Echo AI
        </motion.h1>

        <motion.h2 initial={{opacity:0}} animate={{opacity:1, transition:{duration:1.7, delay:0.7}}} className='font-[ubuntu] z-10 text-center w-2xl max-w-5/6 self-center text-3xl'>
          This project is an AI-powered social media post generator that transforms ideas into engaging posts with just a prompt. Leveraging large language models, it crafts compelling layouts, captions, and relevant hashtags to amplify your online presence.
          <p className='font-[italiana] bg-black  mt-9 z-10 text-center text-3xl'>
            Built by: <span><a href='https://aleklab.cloud' target='_blank' className='hover:underline animate-pulse text-shadow-amber-50 text-shadow-2xs'>Alek (Hector Gonzalez)</a></span>, Satyam Bharti, Sujal Agarwal, Heet Shah, Anirudh Madas, Aayushi Patel
          </p>
        </motion.h2>

        <motion.div initial={{opacity:0}} animate={{opacity:1, transition:{duration:1.7, delay:1.3}}} className='flex justify-center'>
          <Link to='/' className='text-white flex select-none shadow-fuchsia-500/40 transition-all hover:shadow-none duration-300 hover:translate-x-1 hover:translate-y-1 shadow-xl flex-row rounded-full font-thin w-fit px-12 py-4 text-2xl font-[Ubuntu] bg-fuchsia-500 self-center z-10'>
            Return
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default About