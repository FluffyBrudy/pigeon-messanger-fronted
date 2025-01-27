import { ChangeEvent, useRef } from "react";
import { api } from "../../api/interceptor";
import { FIND_FRIENDS_ENDPOINTS } from "../../api/endpoints";
import { useSearchFriendStore } from "../../store/friendSearchStore";
import { SearchedFriend } from "../../types/store";

const FindFriends = () => {
  const delay = useRef(300);
  const timeoutRef = useRef<number | null>(null);
  const { setSearchedFriend, setError } = useSearchFriendStore();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const searchValue = e.target.value.trim();
    if (!searchValue) {
      setSearchedFriend([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await api.post(FIND_FRIENDS_ENDPOINTS, {
          searchTerm: e.target.value,
        });
        const searchedFriendList = res.data as { data: Array<SearchedFriend> };
        if (res.status === 200) {
          console.log(searchedFriendList);
          setSearchedFriend(searchedFriendList.data);
        } else {
          setError("Something went wrong");
        }
      } catch (err) {
        setError((err as Error).message);
        console.error((err as Error).message);
      }
    }, delay.current);
  };

  return (
    <div className="flex justify-around">
      <input
        type="text"
        className="flex-1 px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder="Search..."
        onChange={handleChange}
      />
    </div>
  );
};

export default FindFriends;
