import { useEffect, useState } from "react";
import FriendCard from "../../components/socialize/FriendCard";
import { PendingRequestType } from "../../types/social";
import { usePendingRequestsStore } from "../../store/pendingRequestsStore";
import { api } from "../../api/interceptor";
import {
  SOCIAL_REJECT_REQUEST_POST,
  SOCIAL_ACCEPT_REQUEST_POST,
} from "../../api/endpoints";
import { SocketSingleton } from "../../socket/socket";
import { SERVER_EVENTS } from "../../socket/constants";
import { useConnectedFriendStore } from "../../store/connectedFriendsStore";
import { AxiosResponse } from "axios";

const PendingRequests = () => {
  const fetchPendingRequests = usePendingRequestsStore(
    (state) => state.fetchPendingRequests
  );
  const filterPendingRequest = usePendingRequestsStore(
    (state) => state.filterRequests
  );
  const sentRequests = usePendingRequestsStore((state) => state.sentRequests);
  const recvRequests = usePendingRequestsStore((state) => state.recvRequests);
  const fetchConnectedFriends = useConnectedFriendStore(
    (state) => state.fetchConnectedFriends
  );

  const [activeTab, setActiveTab] = useState<PendingRequestType>(
    PendingRequestType.recv
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchPendingRequests(PendingRequestType.sent),
          fetchPendingRequests(PendingRequestType.recv),
        ]);
        setIsLoading(false);
      } catch (error) {
        const err =
          (error as AxiosResponse).data.error || (error as Error).message;
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [fetchPendingRequests]);

  const acceptRequest = (friendId: string) => {
    api
      .post(SOCIAL_ACCEPT_REQUEST_POST, {
        friendId,
      })
      .then((res) => {
        if (res.status === 200) {
          filterPendingRequest(friendId);
          fetchConnectedFriends();
          SocketSingleton.emitEvent(SERVER_EVENTS.CONNECT_FRIEND, { friendId });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const rejectOrCancelRequest = (friendId: string) => {
    api
      .post(SOCIAL_REJECT_REQUEST_POST, { friendId })
      .then((res) => {
        if (res.status === 200) {
          filterPendingRequest(friendId);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="p-6 flex flex-col items-center h-screen">
      <div className="mb-4 space-x-4">
        <button
          onClick={() => setActiveTab(PendingRequestType.sent)}
          className={`py-2 px-4 rounded-md text-sm font-medium ${
            activeTab === "sent"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } transition`}
        >
          Sent Requests
        </button>
        <button
          onClick={() => setActiveTab(PendingRequestType.recv)}
          className={`py-2 px-4 rounded-md text-sm font-medium ${
            activeTab === "recv"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } transition`}
        >
          Received Requests
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">
          {activeTab === "sent" ? "Sent Requests" : "Received Requests"}
        </h2>

        {activeTab === "sent" ? (
          sentRequests.length === 0 ? (
            <p className="text-white font-bold">
              {isLoading ? "please wait..." : "You haven't sent any requests."}
            </p>
          ) : (
            <div className="space-y-4">
              {sentRequests.map((request) => (
                <FriendCard
                  key={request.userId + PendingRequestType.sent}
                  {...request}
                  id={request["userId"]}
                  isAccepted={false}
                >
                  <button
                    onClick={() => rejectOrCancelRequest(request.userId)}
                    className="w-full px-4 py-1 text-sm bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition font-bold"
                  >
                    Cancel
                  </button>
                </FriendCard>
              ))}
            </div>
          )
        ) : recvRequests.length === 0 ? (
          <p className="text-white font-bold">
            {" "}
            {isLoading ? "please wait..." : "You have no pending requests."}
          </p>
        ) : (
          <div className="space-y-4">
            {recvRequests.map((request) => (
              <FriendCard
                key={request.userId + PendingRequestType.recv}
                {...request}
                id={request.userId}
                isAccepted={false}
              >
                <button
                  onClick={() => {
                    acceptRequest(request.userId);
                  }}
                  className="px-4 py-1 text-sm font-medium bg-lime-500 text-black rounded-md shadow-sm hover:bg-lime-600 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => rejectOrCancelRequest(request.userId)}
                  className="px-4 py-1 text-sm font-medium bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition ml-2"
                >
                  Reject
                </button>
              </FriendCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PendingRequests;
