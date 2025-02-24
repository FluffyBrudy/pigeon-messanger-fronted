import { AxiosError } from "axios";
import { api } from "../api/interceptor";
import { SILENT_LOGIN_POST } from "../api/endpoints";
import { IAuthStore } from "../types/store";
import { create } from "zustand";
import { ACCESS_TOKEN } from "../api/constants";

const defaultValue = {
  userId: null,
  isAuthenticated: false,
};

export const useAuthStore = create<IAuthStore>((set) => ({
  ...defaultValue,

  setAuthenticated(isAuthenticated: boolean) {
    set({ isAuthenticated });
  },

  async attemptAuthorization() {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) return null;
      const res = await api.post(SILENT_LOGIN_POST);
      if (res.status === 200)
        set({ isAuthenticated: true, userId: res.data.data["id"] as string });
      return res;
    } catch (error) {
      console.log((error as Error).message);
      set({ isAuthenticated: false, userId: null });
      return error as AxiosError;
    }
  },
}));
