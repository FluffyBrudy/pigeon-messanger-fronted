import { useEffect, useState } from "react";

export const usePreventIFrameEmbedding = () => {
  const [isEmbedded, setIsEmbedded] = useState(true);
  useEffect(() => {
    if (window.top !== window.self) {
      setIsEmbedded(true);
    } else {
      setIsEmbedded(false);
    }
  }, []);
  return { isEmbedded };
};
