import axios, { AxiosResponse } from "axios";
import { PREF_PROFILE_SIGNATURE_GET } from "../api/endpoints";
import { api } from "../api/interceptor";

type SignatureResponseData = { signature: string; timestamp: number };

type SignatureResult = Promise<[SignatureResponseData | null, string | null]>;

async function generatePrefProfileSignature(): SignatureResult {
  try {
    const response = await api.get(PREF_PROFILE_SIGNATURE_GET);
    const data = response.data as Record<"data", SignatureResponseData>;

    return [data.data, null];
  } catch (error) {
    return [null, (error as Error).message];
  }
}

export const uploadImage = async (fileOrHtmlString: string | File) => {
  let file: File;
  if (typeof fileOrHtmlString === "string") {
    const blob = new Blob([fileOrHtmlString], {
      type: "image/svg+xml;charset=utf-8",
    });
    file = new File([blob], Math.random().toString(8) + ".svg", {
      type: blob.type,
    });
  } else {
    file = fileOrHtmlString;
  }

  const [data, error] = await generatePrefProfileSignature();

  if (!data || error) return error;

  const { signature, timestamp } = data!;
  const fileType = file.type.startsWith("video") ? "video" : "image";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", import.meta.env.VITE_CLOUD_API_KEY);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  formData.append("folder", "pigeon-messanger");
  formData.append("resource_type", fileType);

  try {
    const url =
      fileType === "video"
        ? import.meta.env.VITE_CLOUD_URL.replace("image", "video")
        : import.meta.env.VITE_CLOUD_URL;
    const resImg = await axios.post(url, formData);

    return resImg.data.secure_url;
  } catch (error) {
    const err = error as AxiosResponse;
    console.error(err.data.error);
    return null;
  }
};
