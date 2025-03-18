function isUrlComplete(urlInstance: URL) {
  if (!(urlInstance instanceof URL)) return false;
  const { origin, protocol, pathname } = urlInstance;
  return !!(origin && protocol && pathname);
}

export function isValidUrl(url: string) {
  if (typeof url !== "string") throw new Error("Invalid url");
  try {
    const validUrl = new URL(url);
    return { valid: isUrlComplete(validUrl), pathname: validUrl.pathname };
  } catch (err) {
    return { valid: false, pathname: "", err: (err as Error).message };
  }
}
