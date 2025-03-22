import React from "react";
import { Friend } from "../../types/social";
import { CheckCircle, User } from "lucide-react";

interface FriendCardProps extends Friend {
  children?: React.ReactNode;
  handleClick?: () => void;
}

const FriendCard: React.FC<FriendCardProps> = ({
  username,
  id,
  imageUrl,
  isAccepted,
  children,
  handleClick,
}) => {
  const clickEvent = handleClick ? { onClick: handleClick } : null;

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 min-w-[200px] cursor-pointer"
      {...clickEvent}
    >
      <div className="flex items-center justify-between">
        <img
          src={imageUrl}
          alt={username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <h3 className="text-lg font-semibold text-gray-800">{username}</h3>
      </div>
      <p className="text-sm text-gray-500">
        Friend ID: {id && Math.random().toString(16).slice(2)}
      </p>
      {isAccepted ? (
        <div className="bg-green-100 rounded-full p-2 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
          <span className="text-sm font-medium text-green-600">Accepted</span>
        </div>
      ) : (
        <div className="bg-gray-200 rounded-full p-2 flex items-center justify-center">
          <User className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-sm font-medium text-gray-500">Pending</span>
        </div>
      )}
      {children && <div>{children}</div>}
    </div>
  );
};

export default FriendCard;
