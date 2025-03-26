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
      className="bg-white hover:bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col gap-4 min-w-[280px] cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-100"
      {...clickEvent}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={imageUrl}
            alt={username}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-offset-2 ring-blue-500"
          />
          {isAccepted && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border-2 border-white">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">
            {username}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            ID: {id?.slice(0, 8)}
          </p>
        </div>
      </div>

      <div className="mt-2">
        {isAccepted ? (
          <div className="bg-green-50 rounded-lg p-2.5 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            <span className="text-sm font-semibold text-green-600">Connected</span>
          </div>
        ) : (
          <div className="bg-amber-50 rounded-lg p-2.5 flex items-center justify-center">
            <User className="w-4 h-4 mr-2 text-amber-600" />
            <span className="text-sm font-semibold text-amber-600">Pending Request</span>
          </div>
        )}
      </div>

      {children && (
        <div className="mt-2 pt-4 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

export default FriendCard;
