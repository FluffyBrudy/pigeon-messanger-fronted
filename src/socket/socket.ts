import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function connectSocket() {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_API);

    socket.on("connect", () => {
      console.log("connected");
    });
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected");
  }
}

export const getSocket = () => socket;
