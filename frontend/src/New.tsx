import { useEffect, useRef, useState } from 'react'
import star from './assets/tl.webp'
import './App.css'
import { motion } from "motion/react"
import { BsArrowRight } from 'react-icons/bs';
import { FaExclamation, FaTruckLoading } from 'react-icons/fa';
import { Link } from 'react-router';
import { FiSend } from 'react-icons/fi';
import Editor from './Editor';
import html2canvas from 'html2canvas';
import { AiOutlineDownload } from 'react-icons/ai';
import { AiOutlineLoading } from 'react-icons/ai';

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


async function fixObject(prompt:string, item: {
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
    }[]){
  var content = await fetch(`http://localhost:8000/tuneObject`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ fix: prompt, item:item})
        })

       var parsedChat = JSON.parse(await content.text())
       var parsedContent = JSON.parse(parsedChat.choices[0].message.content.replace('```json', '').replace('```', ''))

       return parsedContent

      }


function New() {

  const editorRef = useRef<HTMLDivElement>(null)


  const captureScreenshot = async () => {
    if (!editorRef.current) return
    const canvas = await html2canvas(editorRef.current)
    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'post.png'
    link.click()
  }


  const promptRef = useRef<HTMLParagraphElement>(null)

  const [caption, setCaption] = useState("")
  const [hashtags, setHashtags] = useState<(string | null)[]>([]);


  const [loading, setLoading] = useState(false)


const conversationEndRef = useRef<HTMLDivElement>(null);



  const [conversation, setConversation] = useState<
  { text: string; sender: "user" | "llm" }[]
>([{text:'Welcome to Echo AI\n\nMake your business echo thorugh the web! \n\nTell me what do you need for this post?', sender:'llm'}])



useEffect(() => {
  conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [conversation]);

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
      setLoading(true) 
      let prompt = promptRef.current.innerText
      promptRef.current.innerText = ''
setConversation(prev => [...prev, { text: prompt, sender: "user" }])
try{
    var contentObject = hashtags.length==0?await getInitialObject(prompt):await fixObject(prompt, items)

setHashtags(contentObject.copy.hashtags)
    setCaption(contentObject.copy.caption)
    setItems(contentObject.design)
    setConversation(prev => [...prev, { text: contentObject.copy.response, sender: "llm" }])
      setTimeout(() => {
            setConversation(prev => [...prev, { text: "Do you need me to fix anything?", sender: "llm" }])
      }, 1000);
      setLoading(false)}catch{
        setLoading(false)
        setConversation(prev => [...prev, { text: "There was an error, try again", sender: "llm" }])
} 
  }
  }


  return (
    <div className='bg-black'>
      <div className='w-screen overflow-hidden selection:bg-fuchsia-700/40 justify-evenly text-white bg-gradient-to-tr from-gray-950 to-stone-950 h-screen flex flex-row'>
    

    <div className='h-5/6 relative w-1/4 flex flex-col justify-end bg-gradient-to-b self-center from-slate-800/50 to-gray-900/50'>
   

         <div className='py-9 px-3 space-y-6 h-full w-full overflow-scroll flex flex-col'>{conversation.map((msg, index) => (
  <div key={index} className={`${msg.sender === "user" ? "bg-slate-700 rounded-lg p-3 w-5/6 self-end" : "bg-gray-800 whitespace-pre-wrap rounded-lg p-3 w-5/6"}`}>
    {msg.text}
  </div>
))} <div ref={conversationEndRef} /></div>

   {!loading?
    <form  className='max-h-33 overflow-y-scroll flex flex-row'>
   
   
      <div className='bg-white/20 rounded-tr-md p-3 self-start h-min w-3/4'>

      
     <p ref={promptRef} onKeyDown={(e)=>{if(e.key=='Enter'){e.preventDefault();updateObject()}}} className='outline-none font-[Italiana] text-xl' contentEditable> </p>
   </div>
   <FiSend onClick={updateObject} className='self-center absolute right-0 w-1/4 h-7 transition-all opacity-60 hover:opacity-100 hover:scale-110'/>
    </form>:<AiOutlineLoading className='self-center h-17 w-17 animate-[spin_1s_infinite] mb-12'/>}
    </div>
    
       <div className='h-5/6 w-2/4 self-center bg-gradient-to-b flex flex-row justify-center from-slate-800/50 to-gray-900/50'>
       <div  className='w-2/3 h-full flex flex-col justify-center'>
      <div ref={editorRef} className='self-center w-[400px] h-[500px]'>
       <Editor  items={items} setItems={setItems} />
       </div>
       </div>
         <div className='font-[ubuntu] w-1/3 h-full flex flex-col justify-evenly bg-fuchsia-600/5'>
         <div className='px-2 select-all flex flex-wrap'><h1 className='select-none w-full'>Hashtags:</h1>
       {hashtags.map((hashtag, index)=>  <span className='text-cyan-600 mx-2 hover:underline ' key={index}>{hashtag}</span>)}
         </div>
          <div className='px-2 select-all flex flex-wrap'><h1 className='select-none w-full'>Caption:</h1>
        <span className='text-wrap mx-2 ' >{caption}</span>
         </div>
          <button onClick={captureScreenshot} className='text-white flex select-none shadow-gray-600/30 transition-all hover:shadow-none duration-300 hover:translate-x-1 hover:translate-y-1 shadow-xl flex-row rounded-full font-thin w-fit px-9 py-2 text-lg font-[Ubuntu] bg-fuchsia-600 self-center z-10'> <span className='self-center mr-6'><AiOutlineDownload className='h-5/6 w-9'/></span><span className='self-center'>Download</span>
     
      </button>
         </div>
       </div>
    


    </div></div>
  )
}

export default New
