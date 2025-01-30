import { io, Socket } from "socket.io-client";
import { ACCESS_TOKEN } from "../api/constants";

let socket: Socket | null = null;

export function connectSocket() {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_API, {
      auth: {
        token: localStorage.getItem(ACCESS_TOKEN),
      },
    });

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("connect_error", (error) => {
      console.error(error.message);
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    });

    socket.on("unauthorized", (errMsg: string) => {
      console.error(errMsg);
    });

    socket.on("authorized", (msg: string) => {
      console.log(msg);
    });
  }

  return socket;
}

export function connectFriend(userId: string, friendId: string) {
  if (socket) {
    const roomId = getRoomId(userId, friendId);
    socket.emit("connect_friend", roomId);
  }
}

function getRoomId(id1: string, id2: string) {
  return [id1, id2].sort().join("-");
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected");
  }
}

export const getSocket = () => socket;
