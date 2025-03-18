import { create } from "zustand";
import { IMediaPreviewStore } from "../types/store";

export const useMediaPreviewStore = create<IMediaPreviewStore>()((set) => ({
  mediaUrl: null,
  setMediaUrl(mediaUrl) {
    if (!mediaUrl) set({ mediaUrl: null });
    else set({ mediaUrl: mediaUrl });
  },
}));
