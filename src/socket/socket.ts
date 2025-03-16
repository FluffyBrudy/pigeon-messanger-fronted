import { io, Socket } from "socket.io-client";
import { ACCESS_TOKEN } from "../api/constants";

export class SocketSingleton {
  private static instance: Socket | null = null;
  private static isActive: boolean = false;

  private constructor() {}

  static getInstance() {
    if (!SocketSingleton.instance) {
      SocketSingleton.instance = io(import.meta.env.VITE_SOCKET_API, {
        transports: ["websocket", "polling"],
        auth: {
          token: localStorage.getItem(ACCESS_TOKEN),
        },
      });
    }
    return SocketSingleton.instance;
  }

  static getStatus() {
    return SocketSingleton.isActive;
  }

  static active() {
    SocketSingleton.isActive = true;
  }

  static disconnect() {
    if (SocketSingleton.instance) {
      SocketSingleton.instance.disconnect();

      SocketSingleton.instance = null;
      SocketSingleton.isActive = false;
    }
  }

  static emitEvent(eventName: string, data: unknown) {
    if (!this.instance) {
      console.error("Unable to connect to socket server");
      return;
    }
    this.instance?.emit(eventName, data);
  }

  static connectSocket() {
    return SocketSingleton.getInstance();
  }
}
