import { useAddFriendStore } from "../../store/addFriendStore";
import AddFriend from "../socialize/AddFriend";

export const AddFriendViewer = () => {
  const { isActive } = useAddFriendStore();
  const getData = useAddFriendStore((state) => state.getData);

  if (!isActive) return null;

  return (
    <div className="z-[100] fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <AddFriend {...getData()} />
    </div>
  );
};
