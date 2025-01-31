import { AxiosError } from "axios";
import { api } from "../api/interceptor";
import { SILENT_LOGIN_ENDPOINT_POST } from "../api/endpoints";
import { IAuthStore } from "../types/store";
import { create } from "zustand";

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
      const res = await api.post(SILENT_LOGIN_ENDPOINT_POST);
      if (res.status === 200)
        set({ isAuthenticated: true, userId: res.data.data["id"] as string });
      console.log(res.data.data.id);
      return res;
    } catch (error) {
      console.log(error);
      set({ isAuthenticated: false, userId: null });
      return error as AxiosError;
    }
  },
}));
