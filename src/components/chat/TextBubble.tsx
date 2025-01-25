interface TextBubbleProps {
  text: string;
}

const TextBubble = ({ text }: TextBubbleProps) => {
  return <div className="truncate overflow-hidden max-w-[200px]">{text}</div>;
};

export default TextBubble;
