import { useEffect, useState } from 'react'
import './App.css'
import { motion } from "motion/react"
import { LuDiamondPlus } from 'react-icons/lu';
import { Link } from 'react-router';
import Display from './Display';

function DashboardElement(props:{item:{
    id:string,
    content:{
      background:string|null,
    copy:{hashtags:string[], caption:string, response:string}
    design:
    {
      id: number;
      text: string;
      posX: number;
      posY: number;
      width: number;
      height: number;
      fontSize: number;
      color: string;
      fontFamily: string;
      fontWeight: number;
      textAlign: "left" | "center" | "right";
    }[]}}}){
  return  <motion.div whileTap={{rotate:-1, scale:1}} initial={{boxShadow:"1px 1px 1px 1px #c800de00"}} whileHover={{rotate:3, scale:1.1,boxShadow:"5px 5px 15px 1px #c800de10", borderRadius:'17px'}} className="h-96 w-72 bg-gradient-to-tr flex flex-col justify-evenly from-slate-700 to-gray-800 ">
    <div className='h-2/3 overflow-hidden w-full self-center flex flex-col justify-center'>
    <div className='bg-blue-500 pointer-events-none scale-50 self-center'>
      <Display imageURL={props.item.content.background} items={props.item.content.design}/>
    </div></div>
    <p className='font-[ubuntu] text-center text-md px-2'>{props.item.content.copy.caption}</p>
  </motion.div>
}



function Dashboard() {
  const [items, setItems] = useState<{
    id:string,
    content:{
      background:string|null,
    copy:{hashtags:string[], caption:string, response:string}
    design:
    {
      id: number;
      text: string;
      posX: number;
      posY: number;
      width: number;
      height: number;
      fontSize: number;
      color: string;
      fontFamily: string;
      fontWeight: number;
      textAlign: "left" | "center" | "right";
    }[]}}[]
  >()

  useEffect( ()=>{
    fetch("http://localhost:8000/items", {
  method: "GET",
  credentials: "include" // important so cookies (session) are sent
}).then(res=>{res.json().then(json=>{
  setItems(json)
})})

  })

  return (
    <div className='bg-black'>
      <div className='w-screen overflow-hidden selection:bg-fuchsia-700/40 text-white  bg-gradient-to-tr from-gray-950 to-stone-950 space-y-12 h-screen flex flex-col justify-center'>
      
      <div className='w-5/6 self-center py-12 overflow-y-scroll h-5/6 bg-gradient-to-br from-slate-400/10 to-gray-900/10'>
      <motion.div initial={{filter:"blur(3px)"}} animate={{filter:"blur(0px)", transition:{duration:0.5, delay:0.1}}} className='md:grid flex flex-col h-auto gap-y-12 place-items-center grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 @min-3xl:grid-cols-5'> 
   
    <motion.div whileTap={{rotate:-1, scale:1}} initial={{boxShadow:"1px 1px 1px 1px #c800de00"}} whileHover={{rotate:3, scale:1.1, boxShadow:"5px 5px 15px 1px #c800de10", borderRadius:'17px'}} className="h-96 select-none w-72 bg-gradient-to-tr from-slate-700 to-gray-800 ">
    <a href='/create' className='flex flex-col justify-center h-full'>
    <p className='font-[ubuntu] text-center text-3xl'>New Post</p>
    <LuDiamondPlus className='h-12 w-12 self-center stroke-1 mt-6'/>
  </a>
  </motion.div>

    {items?.map((item, i) => (
      <Link to={`/new/${item.id}`}>
      <DashboardElement item={item} key={i}/>
      </Link>
))}
 </motion.div>
</div>


     
    
      </div>
    </div>
  )
}

export default Dashboard
