import { AxiosError } from "axios";
import { api } from "../api/interceptor";
import { SILENT_LOGIN_ENDPOINT } from "../api/endpoints";
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
      const res = await api.post(SILENT_LOGIN_ENDPOINT);
      return res;
    } catch (error) {
      return error as AxiosError;
    }
  },
}));
