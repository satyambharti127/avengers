import { useState } from 'react'
import star from './assets/tl.webp'
import './App.css'
import { motion } from "motion/react"
import { BsArrowRight } from 'react-icons/bs';
import { FaExclamation } from 'react-icons/fa';
import { LuDiamondPlus } from 'react-icons/lu';
import { Link } from 'react-router';


function DashboardElement(props:{title:string}){
  return  <motion.div whileTap={{rotate:-1, scale:1}} initial={{boxShadow:"1px 1px 1px 1px #c800de00"}} whileHover={{rotate:3, scale:1.1,boxShadow:"5px 5px 15px 1px #c800de10", borderRadius:'17px'}} className="h-72 w-56 bg-gradient-to-tr from-slate-700 to-gray-800 ">
    <p className='font-[Italiana] text-center text-3xl'>{props.title}</p>
  </motion.div>
}



function Dashboard() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-black'>
      <div className='w-screen overflow-hidden selection:bg-fuchsia-700/40 text-white  bg-gradient-to-tr from-gray-950 to-stone-950 space-y-12 h-screen flex flex-col justify-center'>
      
      <div className='w-5/6 self-center py-12 overflow-y-scroll h-5/6 bg-gradient-to-br from-slate-400/10 to-gray-900/10'>
      <motion.div initial={{filter:"blur(3px)"}} animate={{filter:"blur(0px)", transition:{duration:0.5, delay:0.1}}} className='md:grid flex flex-col h-auto gap-y-12 place-items-center grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'> 
   
    <motion.div whileTap={{rotate:-1, scale:1}} initial={{boxShadow:"1px 1px 1px 1px #c800de00"}} whileHover={{rotate:3, scale:1.1, boxShadow:"5px 5px 15px 1px #c800de10", borderRadius:'17px'}} className="h-72 select-none w-56 bg-gradient-to-tr from-slate-700 to-gray-800 ">
    <Link to='/new' className='flex flex-col justify-center h-full'>
    <p className='font-[Italiana] text-center text-3xl'>New Post</p>
    <LuDiamondPlus className='h-12 w-12 self-center stroke-1 mt-6'/>
  </Link>
  </motion.div>

    {[...Array(11)].map((_, i) => (
      <DashboardElement title={i.toString()} key={i}/>
))}
 </motion.div>
</div>


     
    
      </div>
    </div>
  )
}

export default Dashboard
