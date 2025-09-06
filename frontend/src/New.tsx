import { useState } from 'react'
import star from './assets/tl.webp'
import './App.css'
import { motion } from "motion/react"
import { BsArrowRight } from 'react-icons/bs';
import { FaExclamation } from 'react-icons/fa';
import { Link } from 'react-router';

function New() {


  return (
    <div className='bg-black'>
      <div className='w-screen overflow-hidden selection:bg-fuchsia-700/40 justify-evenly text-white bg-gradient-to-tr from-gray-950 to-stone-950 h-screen flex flex-row'>
    

    <div className='h-5/6 w-1/4 flex flex-col justify-end bg-gradient-to-b self-center from-slate-800/50 to-gray-900/50'>
    <form className='max-h-33 overflow-y-scroll flex flex-row'>
      <div className='bg-white/20 p-3 self-start h-min w-5/6'>
     <p className='outline-none font-[Italiana] text-xl' contentEditable> </p>
   </div>
    </form>
    </div>
    
       <div className='h-5/6 w-2/4 self-center bg-gradient-to-b from-slate-800/50 to-gray-900/50'></div>
    


    </div></div>
  )
}

export default New
