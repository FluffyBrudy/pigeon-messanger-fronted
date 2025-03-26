function isUrlComplete(urlInstance: URL) {
  if (!(urlInstance instanceof URL)) return false;
  const { origin, protocol, pathname } = urlInstance;
  return !!(origin && protocol && pathname);
}

export const imageRegex = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
export const videoRegex = /\.(mp4|webm|ogg)$/i;

export function isValidUrl(url: string) {
  if (typeof url !== "string") throw new Error("Invalid url");
  try {
    const validUrl = new URL(url);
    return { valid: isUrlComplete(validUrl), pathname: validUrl.pathname };
  } catch (err) {
    return { valid: false, pathname: "", err: (err as Error).message };
  }
}

function isValidImageUrl(url: string) {
  if (typeof url !== "string") return { valid: false };
  try {
    const validUrl = new URL(url);
    const match = validUrl.pathname.match(imageRegex);
    return { valid: !!match, extension: match?.[1] };
  } catch {
    return { valid: false, extension: undefined };
  }
}

function isValidVideoUrl(url: string) {
  if (typeof url !== "string") return { valid: false };
  try {
    const validUrl = new URL(url);
    const match = validUrl.pathname.match(videoRegex);
    return { valid: !!match, extension: match?.[1] };
  } catch {
    return { valid: false, extension: undefined };
  }
}

export { isValidImageUrl, isValidVideoUrl };
