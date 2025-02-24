interface SkeletonChatBubbleProps {
  count: number;
}

const SkeletonChatBubble = ({ count }: SkeletonChatBubbleProps) => {
  return (
    <div className="flex flex-col space-y-4 p-2 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`flex items-start space-x-2 ${
            i % 2 === 0 ? "" : "self-end flex-row-reverse"
          }`}
        >
          {/* Skeleton Avatar */}
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>

          {/* Skeleton Message Bubble */}
          <div className="flex flex-col space-y-2">
            <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonChatBubble;
