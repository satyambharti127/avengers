import { useState } from "react";

export default function Editor() {
    const [items, setItems] = useState<
        {
            id: number;
            text: string;
            posX: number;
            posY: number;
            width: number;
            height: number;
            fontSize: number;
        }[]
    >( [
    {
      "id": 1,
      "text": "FRESH",
      "posX": 30,
      "posY": 60,
      "width": 150,
      "height": 50,
      "fontSize": 30
    },
    {
      "id": 2,
      "text": "DAILY",
      "posX": 30,
      "posY": 120,
      "width": 120,
      "height": 40,
      "fontSize": 28
    },
    {
      "id": 3,
      "text": "BAKED WITH",
      "posX": 200,
      "posY": 100,
      "width": 180,
      "height": 40,
      "fontSize": 24
    },
    {
      "id": 4,
      "text": "❤️ LOVE ❤️",
      "posX": 200,
      "posY": 150,
      "width": 180,
      "height": 50,
      "fontSize": 26
    },
    {
      "id": 5,
      "text": "James Hoffa",
      "posX": 30,
      "posY": 400,
      "width": 200,
      "height": 40,
      "fontSize": 28
    },
    {
      "id": 6,
      "text": "BAKERY",
      "posX": 30,
      "posY": 450,
      "width": 150,
      "height": 40,
      "fontSize": 28,
    },
    {
      "id": 7,
      "text": "Open 6AM - Sold Out!",
      "posX": 220,
      "posY": 440,
      "width": 170,
      "height": 30,
      "fontSize": 18
    }
  ]);

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
                    ? { ...item, posX: e.clientX - offset.x, posY: e.clientY - offset.y }
                    : item
            )
        );
    };

    const handleMouseUp = () => {
        setDraggingId(null);
    };

    return (
        <div
            contentEditable
            suppressContentEditableWarning
            className="w-[400px] h-[500px] relative self-center bg-white border"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {items.map((item) => (
                <p
                    key={item.id}
                    contentEditable={false}
                    className="select-none absolute text-gray-800 px-2 py-1 rounded cursor-move"
                    style={{
                        left: item.posX,
                        top: item.posY,
                        width: item.width,
                        height: item.height,
                        fontSize: 15
                    }}
                    onMouseDown={(e) => handleMouseDown(e, item.id)}
                >
                    {item.text}
                </p>
            ))}
        </div>
    );
}
