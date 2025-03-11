import { useEffect, useRef } from "react";
import Avatar from "../../components/common/Avatar";
import { renderToStaticMarkup } from "react-dom/server";
import { uploadImageFromBlobUrl } from "../../service/preferences";

const ProfileSetup = () => {
  const profileRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const addSignature = async () => {
      const staticHtmlString = renderToStaticMarkup(
        <Avatar name="sam" ref={profileRef} />
      );
      uploadImageFromBlobUrl(staticHtmlString);
    };

    addSignature();
  }, []);

  return (
    <div className="w-screen h-screen m-0 p-0 box-border">
      <Avatar name="sam" ref={profileRef} />
    </div>
  );
};

export default ProfileSetup;
