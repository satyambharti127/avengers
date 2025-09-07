import { useState } from "react";

// Editor component for rendering and dragging text items over an optional background image
export default function Editor({
  imageURL,
  items,
  setItems,
}: {
  imageURL: string | null,
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
  // Track which item is being dragged
  const [draggingId, setDraggingId] = useState<number | null>(null);
  // Track mouse offset for dragging
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Start dragging an item
  const handleMouseDown = (
    e: React.MouseEvent<HTMLParagraphElement>,
    id: number
  ) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    setDraggingId(id);
    setOffset({ x: e.clientX - item.posX, y: e.clientY - item.posY });
  };

  // Move the dragged item
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingId === null) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === draggingId
          ? {
              ...item,
              // Clamp position within editor bounds
              posX: Math.min(Math.max(e.clientX - offset.x, 0), 400 - item.width),
              posY: Math.min(Math.max(e.clientY - offset.y, 0), 500 - item.height),
            }
          : item
      )
    );
  };

  // Stop dragging
  const handleMouseUp = () => { setDraggingId(null) };

  return (
    <div
      className="w-[400px] h-[500px] flex flex-col justify-center relative self-center bg-white border"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Render background image if provided */}
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
      {/* Overlay for draggable text items */}
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
        ))}
      </div>
    </div>
  );
}