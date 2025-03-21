import { X } from "lucide-react";
import { useMediaPreviewStore } from "../../store/mediaPreviewStore";

const MediaPreview = () => {
  const { setMediaUrl, mediaUrl } = useMediaPreviewStore();
  if (!mediaUrl) return null;
  console.log(mediaUrl);
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-80 flex justify-center items-center animate-scaleIn w-[100vw] h-[100vh] overflow-auto">
      <div className="relative box-border flex justify-center items-center w-[80%] h-[80%]">
        <button
          onClick={() => setMediaUrl(null)}
          className="absolute -top-2 -right-2 text-white"
        >
          <X className="text-black bg-red-500 rounded-full" />
        </button>

        <img
          src={mediaUrl}
          alt="Preview"
          className="rounded-lg shadow-lg max-w-full max-h-full"
        />
      </div>
    </div>
  );
};

export default MediaPreview;
