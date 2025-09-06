import { useState } from "react";

export default function Editor({imageURL,
  items,
  setItems,
}: {imageURL:string|null,
  items: {
    id: number;
    text: string;
    posX: number;
    posY: number;
    width: number;
    height: number;
    fontSize: number;
    color: string;
    fontFamily: string;
    fontWeight: number; // 100–900
    textAlign: "left" | "center" | "right";
  }[];
  setItems: React.Dispatch<
    React.SetStateAction<
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
    >
  >
}) {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (
    e: React.MouseEvent<HTMLParagraphElement>,
    id: number
  ) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    setDraggingId(id);
    setOffset({ x: e.clientX - item.posX, y: e.clientY - item.posY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingId === null) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === draggingId
          ? {
              ...item,
              posX: Math.min(Math.max(e.clientX - offset.x, 0), 400 - item.width),
              posY: Math.min(Math.max(e.clientY - offset.y, 0), 500 - item.height),
            }
          : item
      )
    );
  };

  const handleMouseUp = () => setDraggingId(null);

  return (
    <div
      className="w-[400px] h-[500px] flex flex-col justify-center relative self-center bg-white border"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
        {imageURL ? (
<div 
  style={{
    backgroundImage: `url(${imageURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%'
  }}
/>
) : null}
<div className="h-full w-full absolute bg-[#ffffff30] top-0 left-0">
      {items.map((item) => (
        <p
          key={item.id}
          contentEditable={false}
          className="select-none absolute rounded cursor-move"
          style={{
            left: item.posX,
            top: item.posY,
            width: item.width,
            height: item.height,
            fontSize: Math.min(Math.max(item.fontSize, 15), 30),
            color: item.color,
            fontFamily: item.fontFamily,
            fontWeight: item.fontWeight,
            textAlign: item.textAlign,
          }}
          onMouseDown={(e) => handleMouseDown(e, item.id)}
        >
          {item.text}
        </p>
        
      ))}</div>
    </div>
  );
}
