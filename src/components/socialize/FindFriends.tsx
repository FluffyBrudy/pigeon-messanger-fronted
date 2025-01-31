import { ChangeEvent, useRef, useState, FocusEvent } from "react";
import { api } from "../../api/interceptor";
import { FIND_FRIENDS_ENDPOINT_POST } from "../../api/endpoints";
import { useSearchFriendStore } from "../../store/friendSearchStore";
import { SearchedFriend } from "../../types/social";
import { Filter, UserPlus } from "lucide-react";
import { KNOWN, UNKNOWN } from "./constants";

const FindFriends = () => {
  const delay = useRef(300);
  const timeoutRef = useRef<number | null>(null);
  const [filtersVisibility, setFiltersVisibility] = useState(false);
  const [filter, setFilter] = useState(UNKNOWN);
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
        const res = await api.post(FIND_FRIENDS_ENDPOINT_POST, {
          searchTerm: e.target.value,
          filter,
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

  const handleFocus = () => setFiltersVisibility(true);
  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setFiltersVisibility(false);
    }
  };

  return (
    <div
      className="flex flex-col gap-2 relative"
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={-1}
    >
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

      {filtersVisibility && (
        <div className="flex gap-4 mt-2 bg-gray-100 p-2 rounded-lg shadow-md font-bold">
          <button
            type="button"
            className={`flex items-center gap-2 px-2 py-1 bg-purple-200 text-purple-700 rounded-lg hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              filter === KNOWN ? "border-2 border-purple-500" : ""
            }`}
            name="filter"
            onClick={() => setFilter(KNOWN)}
            tabIndex={0}
          >
            <Filter size={16} />
            Known Friends
          </button>

          <button
            type="button"
            className={`flex items-center gap-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              filter === UNKNOWN ? "border-2 border-gray-500" : ""
            }`}
            name="filter"
            onClick={() => setFilter(UNKNOWN)}
            tabIndex={1}
          >
            <Filter size={16} />
            Unknown Friends
          </button>
        </div>
      )}
    </div>
  );
};

export default FindFriends;
