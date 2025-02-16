import { create } from "zustand";
import { INotifcationStore } from "../types/store";

export const useNotificationStore = create<INotifcationStore>()((set) => ({
  notifications: [],
  nextId: 1,
  count: 0,
  toAlert: false,
  isVisible: false,
  setNotification(notificationData) {
    set((state) => ({
      toAlert: true,
      notifications: [
        {
          id: state.nextId,
          message: notificationData.message,
          redirectTo: notificationData.redirectTo,
        },
        ...state.notifications,
      ],
      nextId: state.nextId + 1,
      count: state.count + 1,
    }));
  },
  removeNotification(nid) {
    set((state) => ({
      toAlert: false,
      count: Math.min(0, state.count - 1),
      notifications: state.notifications.filter(({ id }) => id !== nid),
    }));
  },
  toggleNotification() {
    set(({ isVisible }) => ({ isVisible: !isVisible }));
  },
}));
