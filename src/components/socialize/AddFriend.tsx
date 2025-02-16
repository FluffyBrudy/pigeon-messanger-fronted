import { X, UserPlus } from "lucide-react";
import { useAddFriendStore } from "../../store/addFriendStore";
import { AddFriendStoreValues } from "../../types/store";

type AddFriendProps = Omit<AddFriendStoreValues, "isActive">;

const AddFriend = ({ username, imageUrl, id }: AddFriendProps) => {
  const toggleVisibility = useAddFriendStore((state) => state.toggleVisibility);
  const sendFriendRequest = useAddFriendStore(
    (state) => state.sendFriendRequest
  );

  const handleRequest = async (id: string) => {
    try {
      const response = await sendFriendRequest(id);
      console.log(response);
      console.log(id);
      toggleVisibility();
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-md relative">
        <button
          className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          onClick={toggleVisibility}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <img
            src={imageUrl}
            alt={`${username}'s profile`}
            className="h-16 w-16 rounded-full border-2 border-blue-500 dark:border-blue-700"
          />
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {username}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Would you like to add them as a friend?
            </p>
          </div>
        </div>

        <div className="p-4 flex gap-3">
          <button
            onClick={() => handleRequest(id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-2 flex items-center justify-center gap-2"
          >
            <UserPlus size={16} />
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
