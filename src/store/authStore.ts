import { AxiosError } from "axios";
import { api } from "../api/interceptor";
import { SILENT_LOGIN_POST } from "../api/endpoints";
import { IAuthStore, IAuthStoreValues } from "../types/store";
import { create } from "zustand";
import { ACCESS_TOKEN } from "../api/constants";
import { LoginData } from "../types/user";

const defaultValue: IAuthStoreValues = {
  imageUrl: null,
  userId: null,
  isAuthenticated: false,
  username: "",
  isProfileInitialized: false,
};

export const useAuthStore = create<IAuthStore>((set) => ({
  ...defaultValue,

  setUserData(data) {
    set((state) => ({ ...state, ...data }));
  },

  setAuthenticated(isAuthenticated: boolean) {
    set({ isAuthenticated });
  },

  async attemptAuthorization() {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) return null;
      const res = await api.post(SILENT_LOGIN_POST);
      const data = res.data.data as LoginData;
      if (res.status === 200)
        set({
          isAuthenticated: true,
          userId: data.id,
          username: data.username,
          isProfileInitialized: data.initialized,
          imageUrl: data.imageUrl,
        });
      return res;
    } catch (error) {
      
      set({ isAuthenticated: false, userId: null });
      return error as AxiosError;
    }
  },
}));
