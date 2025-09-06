import { useState } from 'react'
import star from './assets/tl.webp'
import './App.css'
import { motion } from "motion/react"
import { BsArrowRight } from 'react-icons/bs';
import { FaExclamation } from 'react-icons/fa';
import { Link } from 'react-router';
import { FiSend } from 'react-icons/fi';
import Editor from './Editor';


function New() {


  return (
    <div className='bg-black'>
      <div className='w-screen overflow-hidden selection:bg-fuchsia-700/40 justify-evenly text-white bg-gradient-to-tr from-gray-950 to-stone-950 h-screen flex flex-row'>
    

    <div className='h-5/6 relative w-1/4 flex flex-col justify-end bg-gradient-to-b self-center from-slate-800/50 to-gray-900/50'>
    <form className='max-h-33 overflow-y-scroll flex flex-row'>
      <div className='bg-white/20 rounded-tr-md p-3 self-start h-min w-3/4'>
     <p onKeyDown={(e)=>{if(e.key=='Enter'){e.preventDefault()}}} className='outline-none font-[Italiana] text-xl' contentEditable> </p>
   </div>
   <FiSend className='self-center absolute right-0 w-1/4 h-7 transition-all opacity-60 hover:opacity-100 hover:scale-110'/>
    </form>
    </div>
    
       <div className='h-5/6 w-2/4 self-center bg-gradient-to-b flex flex-row justify-center from-slate-800/50 to-gray-900/50'>
       <div className='w-2/3 h-full flex flex-col justify-center bg-slate-500/5'>
       <Editor/>
       </div>
         <div className='font-[ubuntu] w-1/3 h-full flex flex-col justify-center bg-fuchsia-600/5'>
         <div className='px-2 select-all'><h1 className='select-none'>Hashtags:</h1>
         <p className='text-cyan-600 hover:underline '>#healty</p>
         </div>
         </div>
       </div>
    


    </div></div>
  )
}

export default New
