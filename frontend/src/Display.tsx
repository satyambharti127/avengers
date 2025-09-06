
export default function Display({imageURL,
  items,
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
}) {

  

  return (
    <div
      className="w-[400px] h-[500px] flex flex-col justify-center relative self-center bg-white border"
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
<div className="h-full w-full absolute bg-[#ffffff30] top-0 left-0 ">
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
        >
          {item.text}
        </p>
        
      ))}</div>
    </div>
  );
}
