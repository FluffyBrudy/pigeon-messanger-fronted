import { useAddFriendStore } from "../../store/addFriendStore";
import AddFriend from "../socialize/AddFriend";

export const AddFriendViewer = () => {
  const { toggleVisibility, isActive } = useAddFriendStore();
  const getData = useAddFriendStore((state) => state.getData);

  if (!isActive) return null;

  return (
    <div className="z-20 fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <AddFriend {...getData()} />
      <div
        onClick={toggleVisibility}
        className="absolute top-0 right-0 p-4 cursor-pointer"
      >
        X
      </div>
    </div>
  );
};
