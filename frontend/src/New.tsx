// Imports React hooks, styles, routing, icons, and components
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Link, useParams } from "react-router";
import { FiSend } from "react-icons/fi";
import Editor from "./Editor";
import html2canvas from "html2canvas";
import Conversation from "./components/Conversation";
import FileUpload from "./components/Fileupload";
import HashtagsCaption from "./components/HashtagsCaption";
import LoadingSpinner from "./components/LoadingSpinner";

// Retrieves the post data stored in the database using the user's prompt
async function getInitialObject(prompt: string) {
  // Sends prompt to backend and parses the structured response
  const content = await fetch(`/getinitialobject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const parsedChat = JSON.parse(await content.text());
  console.log(parsedChat)
  // Cleans up and parses the JSON content from the response
  const parsedContent = JSON.parse(
    parsedChat.choices[0].message.content.replace("```json", "").replace("```", "")
  );
  return parsedContent;
}

// Retrieves an updated post object from the backend using the user's prompt and current items
async function fixObject(
  prompt: string,
  item: {
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
) {
  // Sends fix request to backend and parses the structured response
  const content = await fetch(`/tuneObject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fix: prompt, item }),
  });
  const parsedChat = JSON.parse(await content.text());
  // Cleans up and parses the JSON content from the response
  const parsedContent = JSON.parse(
    parsedChat.choices[0].message.content.replace("```json", "").replace("```", "")
  );
  return parsedContent;
}

// Main component for creating and editing a post
function New() {
  // References for DOM elements
  const editorRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLParagraphElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // State variables for post data and UI
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState<(string | null)[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<
    { text: string; sender: "user" | "llm" }[]
  >([
    {
      text:
        "Welcome to Echo AI\n\nMake your business echo thorugh the web! \n\nTell me what do you need for this post?",
      sender: "llm",
    },
  ]);
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
    },
  ]);

  // Retrieves the post ID from the route parameters
  const { uuid } = useParams();

  // Scrolls to the latest message in the conversation when it updates
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Persists post data to the backend whenever items or conversation change
  useEffect(() => {
    if (items.length == 1 || conversation.length < 2) return;
    fetch("/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: uuid,
        content: {
          copy: {
            hashtags: hashtags,
            caption: caption,
            response: conversation[conversation.length - 1],
          },
          design: items,
          background: uploadedImage,
        },
      }),
    });
  }, [conversation, items]);

  // Loads existing post data from the backend when the component mounts
  useEffect(() => {
    setLoading(true);
    fetch("/items/" + uuid, {
      method: "GET",
      credentials: "include",
    }).then((res) =>
      res.json().then((json) => {
        if (json.content) {
          setItems(json.content.design);
          setCaption(json.content.copy.caption);
          setHashtags(json.content.copy.hashtags);
          setUploadedImage(json.content.background);
          setConversation([
            {
              text:
                "Welcome back\n\nMake your business echo thorugh the web!",
              sender: "llm",
            },
            { text: "Tell me what do you need me to fix?", sender: "llm" },
          ]);
        }
        setLoading(false);
      })
    );
  }, []);

  // Handles image file upload, compresses the image, and updates the backend
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!reader.result) return;
      const img = new Image();
      img.src = reader.result.toString();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setUploadedImage(compressedDataUrl);
        fetch("/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: uuid,
            content: {
              copy: {
                hashtags: hashtags,
                caption: caption,
                response: conversation[conversation.length - 1],
              },
              design: items,
              background: compressedDataUrl,
            },
          }),
        });
      };
    };
    reader.readAsDataURL(file);
  };

  // Captures a screenshot of the editor and triggers a download
  const captureScreenshot = async () => {
    if (!editorRef.current) return;
    const canvas = await html2canvas(editorRef.current);
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "post.png";
    link.click();
  };

  // Handles user prompt submission, updates post data and conversation
  async function updateObject() {
    if (promptRef.current) {
      setLoading(true);
      let prompt = promptRef.current.innerText;
      promptRef.current.innerText = "";
      setConversation((prev) => [...prev, { text: prompt, sender: "user" }]);
      try {
        var contentObject =
          hashtags.length == 0
            ? await getInitialObject(prompt)
            : await fixObject(prompt, items);
        setHashtags(contentObject.copy.hashtags);
        setCaption(contentObject.copy.caption);
        setItems(contentObject.design);
        setConversation((prev) => [
          ...prev,
          { text: contentObject.copy.response, sender: "llm" },
        ]);
        // Adds a follow-up message after a short delay
        setTimeout(() => {
          setConversation((prev) => [
            ...prev,
            { text: "Do you need me to fix anything?", sender: "llm" },
          ]);
        }, 1000);
        setLoading(false);
      } catch(e){
        console.log(e)
        setLoading(false);
        setConversation((prev) => [
          ...prev,
          { text: "There was an error, try again", sender: "llm" },
        ]);
      }
    }
  }

  // Renders the main UI for the post editor page
  return (
    <div className="bg-black">
      <div className="w-screen overflow-hidden selection:bg-fuchsia-700/40 justify-evenly text-white bg-gradient-to-tr from-gray-950 to-stone-950 h-screen flex flex-row">
        <Link
          className="h-11 hover:underline transition-all hover:scale-105 fixed top-4 text-lg left-6"
          to={"/app"}
        >
          return
        </Link>
        <div className="h-5/6 relative w-1/4 flex flex-col justify-end bg-gradient-to-b self-center from-slate-800/50 to-gray-900/50">
          <Conversation conversation={conversation} endRef={conversationEndRef} />
          {!loading ? (
            <form className="max-h-33 overflow-y-scroll flex flex-row">
              <div className="bg-white/20 rounded-tr-md p-3 self-start h-min w-3/4">
                <p
                  ref={promptRef}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                      updateObject();
                    }
                  }}
                  className="outline-none font-[Italiana] text-xl"
                  contentEditable
                ></p>
              </div>
              <FileUpload
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
              />
              <FiSend
                onClick={updateObject}
                className="self-center absolute right-0 w-1/4 h-7 transition-all opacity-60 hover:opacity-100 hover:scale-110"
              />
            </form>
          ) : (
            <LoadingSpinner />
          )}
        </div>
        <div className="h-5/6 w-2/4 self-center bg-gradient-to-b flex flex-row justify-center from-slate-800/50 to-gray-900/50">
          <div className="w-2/3 h-full flex flex-col justify-center">
            <div ref={editorRef} className="self-center w-[400px] h-[500px]">
              <Editor imageURL={uploadedImage} items={items} setItems={setItems} />
            </div>
          </div>
          <HashtagsCaption
            hashtags={hashtags}
            caption={caption}
            captureScreenshot={captureScreenshot}
          />
        </div>
      </div>
    </div>
  );
}

export default New;