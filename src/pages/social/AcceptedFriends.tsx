import { useEffect, useState } from "react";
import { SOCIAL_ACCEPTED_REQUESTS_GET } from "../../api/endpoints";
import { api } from "../../api/interceptor";
import { AcceptedFriendRequestsResponse } from "../../types/social";
import FriendCard from "../../components/socialize/FriendCard";
import SimpleSkeleton from "../../animation/SimpleSkeleton";
import { useConnectedFriendStore } from "../../store/connectedFriendsStore";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../router/routerPath";

const AcceptedFriends = () => {
  const [friends, setFriends] = useState<AcceptedFriendRequestsResponse>([]);
  const setActiveChatId = useConnectedFriendStore(
    (state) => state.setActiveChatId
  );
  const navigation = useNavigate();

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
    <div className="w-full h-full overflow-auto p-[3vmin] flex flex-col">
      <div className="w-full flex flex-col items-center mt-5 gap-2 flex-grow">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <FriendCard
              key={friend.userId}
              {...friend}
              id={friend.userId}
              isAccepted={true}
              handleClick={() => {
                setActiveChatId(friend.userId);
                navigation(HOME_ROUTE);
              }}
            />
          ))
        ) : (
          <SimpleSkeleton height="82px" count={5} />
        )}
      </div>
    </div>
  );
};

export default AcceptedFriends;
