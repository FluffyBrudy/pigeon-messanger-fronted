import { useEffect } from "react";
import { connectSocket, getSocket } from "../socket/socket";

export const useSocket = () => {
  useEffect(() => {
    const initSocket = async () => {
      connectSocket();
    };
    initSocket();
  }, []);

  return { socket: getSocket() };
};
