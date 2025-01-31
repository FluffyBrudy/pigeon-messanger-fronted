import { useAddFriendStore } from "../../store/addFriendStore";
import AddFriend from "../socialize/AddFriend";

export const AddFriendViewer = () => {
  const { toggleVisibility, getData, isActive } = useAddFriendStore();
  if (!isActive) return null;
  return (
    <div>
      <AddFriend {...getData()} />
      <div onClick={toggleVisibility}>X</div>
    </div>
  );
};
