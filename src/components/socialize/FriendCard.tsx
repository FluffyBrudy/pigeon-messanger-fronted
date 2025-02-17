import React from "react";
import { Friend } from "../../types/social";
import { CheckCircle, User } from "lucide-react";

interface FriendCardProps extends Friend {
  children?: React.ReactNode;
}

const FriendCard: React.FC<FriendCardProps> = ({
  username,
  id,
  imageUrl,
  isAccepted,
  children,
}) => {
  console.log(id);
  return (
    <div className="w-[90%] flex items-center justify-center flex-wrap gap-4 bg-white shadow-md rounded-lg p-4 transition hover:shadow-lg">
      <img
        src={imageUrl}
        alt={username}
        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{username}</h3>
        <p className="text-sm text-gray-500">
          Friend ID: {id.replace(/-/g, "")}
        </p>
      </div>

      {isAccepted ? (
        <span className="flex items-center text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
          <CheckCircle className="w-4 h-4 mr-1" />
          Accepted
        </span>
      ) : (
        <span className="flex items-center text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
          <User className="w-4 h-4 mr-1" />
          Pending
        </span>
      )}
      {children && <div>{children}</div>}
    </div>
  );
};

export default FriendCard;
