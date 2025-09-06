import { useEffect, useRef, useState } from 'react'

import './App.css'

import { Link, useParams } from 'react-router';
import { FiSend } from 'react-icons/fi';
import Editor from './Editor';
import html2canvas from 'html2canvas';
import { AiOutlineDownload } from 'react-icons/ai';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';

async function getInitialObject(prompt:string){
  var content = await fetch(`/getinitialobject`, {
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
  var content = await fetch(`/tuneObject`, {
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
    console.log('LS0tLS1CRUdJTiBQR1AgU0lHTkVEIE1FU1NBR0UtLS0tLQ0KSGFzaDogU0hBNTEyDQoNCnByb29mIHRoYXQgbm8gb25lIGVsc2UgZGlkIGFueXRoaW5nIGF0IGFsbA0KLS0tLS1CRUdJTiBQR1AgU0lHTkFUVVJFLS0tLS0NCg0KaVFFekJBRUJDZ0FkRmlFRTZ5V01RT3ptZzRyV3d2ZnRVbGVjUnhaOWZtNEZBbWk3K2JjQUNna1FVbGVjUnhaOQ0KZm00eTZBZjlFdnNMdUdQR01qOHd5d0ZsZldFMXczcnh5VlpwcWhMRTZnMys2d24vK29VWXdSZEwwS20wLzhDNg0KRlEyS0lyZkpCdmdObFZYdW1kQUdlQ0hQazdKZlg1S2VubCtncXdXekVZQVd1Q0QrMXdMSDBrU2hpaFczU0pubg0KMkNXUDY1SE1UOWpkajdJc1c2TUJpMWlZanE5TnBFbktqYjRnSy81U21NbmVJVG4rQVpxUE0xcnBHaFlFNyt2Tw0KeEYzZDN2YWhOUy85Tml5N3FtTjB5TnRzYlQwM0l0L1MybmVYejJsNDZKV0E5U01NQkJYZHk1eWdHY09VK2NUQg0KM3NSU2R4cEFiMGtuRWI5SG4wbGY4UXBIOUlaRUZuN0srSGxVYXlKZ0lXaHpTWGZxbFlIM1oyQUxxYUZuc0VFbA0KMlV3bFJId0l3MGI5S29kaTJlbGVNM0NkU0k2UmxRPT0NCj1YNEg0DQotLS0tLUVORCBQR1AgU0lHTkFUVVJFLS0tLS0=')
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

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onloadend = () => {
    if (!reader.result) return

    const img = new Image()
    img.src = reader.result.toString()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!

      const MAX_WIDTH = 800
      const scaleSize = MAX_WIDTH / img.width
      canvas.width = MAX_WIDTH
      canvas.height = img.height * scaleSize

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Export with compression (0.7 = 70% quality)
      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7)

      setUploadedImage(compressedDataUrl)

      fetch("/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: uuid,
          content: {
            copy: {
              hashtags: hashtags,
              caption: caption,
              response: conversation[conversation.length - 1]
            },
            design: items,
            background: compressedDataUrl
          }
        })
      })
    }
  }
  reader.readAsDataURL(file)
}


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


  const {uuid} = useParams()

  console.log(uuid)

useEffect(()=>{
  if(items.length==1||conversation.length<=2||conversation.length%2!=0
  ){return}


  fetch("/items", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({id:uuid,
    content:{
    copy:{hashtags:hashtags,caption:caption,response:conversation[conversation.length-1]},
    design:items,
    background:uploadedImage
  }})
})



}, [conversation])






  useEffect( ()=>{
    setLoading(true)
    fetch("http://localhost:8000/items/"+uuid, {
  method: "GET",
  credentials: "include" // important so cookies (session) are sent
}).then(res=>{res.json().then(json=>{
  console.log(json)
  if(json.content){
    setItems(json.content.design)
    setCaption(json.content.copy.caption)
    setHashtags(json.content.copy.hashtags)
    setUploadedImage(json.content.background)
    setConversation([{text:'Welcome back\n\nMake your business echo thorugh the web! \n\nTell me what do you need me to fix?', sender:'llm'}])
  }
  setLoading(false)
})})

  }, [])




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
    
    <Link className='h-11 hover:underline transition-all hover:scale-105 fixed top-4 text-lg left-6' to={'/app'}>return</Link>

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
    <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
   <BsUpload onClick={() => fileInputRef.current?.click()} className='self-center absolute right-0 bottom-17 w-1/4 h-7 transition-all opacity-60 hover:opacity-100 hover:scale-110'/>
   <FiSend onClick={updateObject} className='self-center absolute right-0 w-1/4 h-7 transition-all opacity-60 hover:opacity-100 hover:scale-110'/>
    </form>:<AiOutlineLoading className='self-center h-17 w-17 animate-[spin_1s_infinite] mb-12'/>}
    </div>
    
       <div className='h-5/6 w-2/4 self-center bg-gradient-to-b flex flex-row justify-center from-slate-800/50 to-gray-900/50'>
       <div  className='w-2/3 h-full flex flex-col justify-center'>
      <div ref={editorRef} className='self-center w-[400px] h-[500px]'>
       <Editor imageURL={uploadedImage} items={items} setItems={setItems} />
       </div>
       </div>
         {hashtags.length>1?<div className='font-[ubuntu] w-1/3 h-full flex flex-col justify-evenly bg-fuchsia-600/5'>
         <div className='px-2 select-all flex flex-wrap'><h1 className='select-none w-full'>Hashtags:</h1>
       {hashtags.map((hashtag, index)=>  <span className='text-cyan-600 mx-2 hover:underline ' key={index}>{hashtag}</span>)}
         </div>
          <div className='px-2 select-all flex flex-wrap'><h1 className='select-none w-full'>Caption:</h1>
        <span className='text-wrap mx-2 ' >{caption}</span>
         </div>
          <button onClick={captureScreenshot} className='text-white flex select-none shadow-gray-600/30 transition-all hover:shadow-none duration-300 hover:translate-x-1 hover:translate-y-1 shadow-xl flex-row rounded-full font-thin w-fit px-9 py-2 text-lg font-[Ubuntu] bg-fuchsia-600 self-center z-10'> <span className='self-center mr-6'><AiOutlineDownload className='h-5/6 w-9'/></span><span className='self-center'>Download</span>
     
      </button>
         </div>:null}
       </div>
    


    </div></div>
  )
}

export default New
