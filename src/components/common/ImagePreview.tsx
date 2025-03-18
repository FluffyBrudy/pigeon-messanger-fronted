import { X } from "lucide-react";
import { FC } from "react";

interface ImagePreviewProps {
  imageUrl: string;
  onClose: () => void;
}

const ImagePreview: FC<ImagePreviewProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="bg-black bg-opacity-80 flex justify-center items-center animate-scaleIn">
      <div className="relative box-border">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 text-white"
        >
          <X className="text-black bg-red-500 rounded-full" />
        </button>

        <img src={imageUrl} alt="Preview" className="rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default ImagePreview;
