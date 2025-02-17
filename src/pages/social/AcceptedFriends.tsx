import { useEffect, useState } from "react";
import { SOCIAL_ACCEPTED_REQUESTS_GET } from "../../api/endpoints";
import { api } from "../../api/interceptor";
import GenericSearchInput from "../../components/common/GenericSearchInput";
import { AcceptedFriendRequestsResponse } from "../../types/social";
import FriendCard from "../../components/socialize/FriendCard";

const AcceptedFriends = () => {
  const [friends, setFriends] = useState<AcceptedFriendRequestsResponse>([]);

  useEffect(() => {
    const getAcceptedFriends = async () => {
      try {
        const response = await api.get(SOCIAL_ACCEPTED_REQUESTS_GET);
        setFriends(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAcceptedFriends();
  }, []);

  return (
    <div className="w-[min(800px,97vw)] m-auto p-[3vmin] flex flex-col justify-center">
      <GenericSearchInput onSearch={() => {}} />
      <div className="w-full flex flex-col items-center mt-5">
        {friends.map((friend) => (
          <FriendCard
            key={friend.userId}
            {...friend}
            id={friend.userId}
            isAccepted={true}
          />
        ))}
      </div>
    </div>
  );
};

export default AcceptedFriends;
