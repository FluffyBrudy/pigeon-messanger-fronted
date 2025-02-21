import { ChangeEvent, useRef } from "react";
import { api } from "../../api/interceptor";
import { SOCIAL_FRIENDS_SEARCH_POST } from "../../api/endpoints";
import { useSearchFriendStore } from "../../store/friendSearchStore";
import { SearchedFriend } from "../../types/social";
import { UserPlus } from "lucide-react";
import { UNKNOWN } from "./constants";

const FindFriends = () => {
  const delay = useRef(300);
  const timeoutRef = useRef<number | null>(null);
  const { setSearchedFriend, setError, setSearchedvisibility } =
    useSearchFriendStore();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const searchValue = e.target.value.trim();
    if (!searchValue) {
      setSearchedFriend([]);
      return;
    }
    setSearchedvisibility(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await api.post(SOCIAL_FRIENDS_SEARCH_POST, {
          searchTerm: e.target.value,
          UNKNOWN,
        });
        const searchedFriendList = res.data as { data: Array<SearchedFriend> };
        if (res.status === 200) {
          setSearchedFriend(searchedFriendList.data);
        } else {
          setError("Something went wrong");
        }
      } catch (err) {
        setError((err as Error).message);
      }
    }, delay.current);
  };

  return (
    <div tabIndex={-1}>
      <div className="relative">
        <input
          type="text"
          className="flex-1 w-full px-4 py-2 text-purple-700 bg-white border rounded-full shadow focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search for friends..."
          onChange={handleChange}
        />

        <UserPlus
          className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500"
          size={20}
        />
      </div>
    </div>
  );
};

export default FindFriends;
