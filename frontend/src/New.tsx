import { useRef, useState } from 'react'
import star from './assets/tl.webp'
import './App.css'
import { motion } from "motion/react"
import { BsArrowRight } from 'react-icons/bs';
import { FaExclamation } from 'react-icons/fa';
import { Link } from 'react-router';
import { FiSend } from 'react-icons/fi';
import Editor from './Editor';


async function getInitialObject(prompt:string){
  var content = await fetch(`http://localhost:8000/getinitialobject`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ prompt: prompt})
        })

       var parsedChat = JSON.parse(await content.text())
       var parsedContent = JSON.parse(parsedChat.choices[0].message.content.replace('```json', '').replace('```', ''))

       return parsedContent


      }


function New() {

  const promptRef = useRef<HTMLParagraphElement>(null)

  const [caption, setCaption] = useState("")
  const [hashtags, setHashtags] = useState<(string | null)[]>([]);

const [items, setItems] = useState<
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
    }[]
  >([
    {
      id: 1,
      text: "New post",
      posX: 0,
      posY: 40,
      width: 400,
      height: 50,
      fontSize: 30,
      color: "#000000a0",
      fontFamily: "Italiana",
      fontWeight: 700,
      textAlign: "center" as "center",
    }
  ])

  async function updateObject(){
    if(promptRef.current){
      let prompt = promptRef.current.innerText
      promptRef.current.innerText = ''
    var contentObject = await getInitialObject(prompt)
    setHashtags(contentObject.copy.hashtags)
    setCaption(contentObject.copy.caption)
    setItems(contentObject.design)}
  }


  return (
    <div className='bg-black'>
      <div className='w-screen overflow-hidden selection:bg-fuchsia-700/40 justify-evenly text-white bg-gradient-to-tr from-gray-950 to-stone-950 h-screen flex flex-row'>
    

    <div className='h-5/6 relative w-1/4 flex flex-col justify-end bg-gradient-to-b self-center from-slate-800/50 to-gray-900/50'>
    <form className='max-h-33 overflow-y-scroll flex flex-row'>
      <div className='bg-white/20 rounded-tr-md p-3 self-start h-min w-3/4'>
     <p ref={promptRef} onKeyDown={(e)=>{if(e.key=='Enter'){e.preventDefault();updateObject()}}} className='outline-none font-[Italiana] text-xl' contentEditable> </p>
   </div>
   <FiSend onClick={updateObject} className='self-center absolute right-0 w-1/4 h-7 transition-all opacity-60 hover:opacity-100 hover:scale-110'/>
    </form>
    </div>
    
       <div className='h-5/6 w-2/4 self-center bg-gradient-to-b flex flex-row justify-center from-slate-800/50 to-gray-900/50'>
       <div className='w-2/3 h-full flex flex-col justify-center bg-slate-500/5'>
       <Editor items={items} setItems={setItems} />
       </div>
         <div className='font-[ubuntu] w-1/3 h-full  flex flex-col justify-evenly bg-fuchsia-600/5'>
         <div className='px-2 select-all flex flex-wrap'><h1 className='select-none w-full'>Hashtags:</h1>
       {hashtags.map((hashtag, index)=>  <span className='text-cyan-600 mx-2 hover:underline ' key={index}>{hashtag}</span>)}
         </div>
          <div className='px-2 select-all flex flex-wrap'><h1 className='select-none w-full'>Caption:</h1>
        <span className='text-wrap mx-2 ' >{caption}</span>
         </div>
         </div>
       </div>
    


    </div></div>
  )
}

export default New
