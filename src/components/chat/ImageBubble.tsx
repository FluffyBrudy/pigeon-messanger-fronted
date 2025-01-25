interface ImageBubbleProps {
  src: string;
}

const ImageBubble = ({ src }: ImageBubbleProps) => {
  return (
    <div className="shrink-0 w-[50px] h-[50px] bg-green-300 rounded-full">
      <img className="w-full h-full" src={src} />
    </div>
  );
};

export default ImageBubble;
