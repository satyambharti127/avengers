import { AiOutlineDownload } from "react-icons/ai";
export default function HashtagsCaption({
  hashtags,
  caption,
  captureScreenshot,
}: {
  hashtags: (string | null)[];
  caption: string;
  captureScreenshot: () => void;
}) {
  if (hashtags.length <= 1) return null;
  return (
    <div className="font-[ubuntu] w-1/3 h-full flex flex-col justify-evenly bg-fuchsia-600/5">
      <div className="px-2 select-all flex flex-wrap">
        <h1 className="select-none w-full">Hashtags:</h1>
        {hashtags.map(
          (hashtag, index) =>
            hashtag && (
              <span
                className="text-cyan-600 mx-2 hover:underline"
                key={index}
              >
                {hashtag}
              </span>
            )
        )}
      </div>
      <div className="px-2 select-all flex flex-wrap">
        <h1 className="select-none w-full">Caption:</h1>
        <span className="text-wrap mx-2">{caption}</span>
      </div>
      <button
        onClick={captureScreenshot}
        className="text-white flex select-none shadow-gray-600/30 transition-all hover:shadow-none duration-300 hover:translate-x-1 hover:translate-y-1 shadow-xl flex-row rounded-full font-thin w-fit px-9 py-2 text-lg font-[Ubuntu] bg-fuchsia-600 self-center z-10"
      >
        <span className="self-center mr-6">
          <AiOutlineDownload className="h-5/6 w-9" />
        </span>
        <span className="self-center">Download</span>
      </button>
    </div>
  );
}