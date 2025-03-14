import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import Menu from "../../components/ui/Menu";
import MenuItem from "../../components/ui/MenuItem";

const Profile = () => {
  const imageUrl = useAuthStore((state) => state.imageUrl);
  const [state, setState] = useState<"hidden" | "">("hidden");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const profileRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (profileRef.current) {
      const { bottom, left } = profileRef.current.getBoundingClientRect();
      setMenuPosition({
        top: Math.floor(bottom),
        left: Math.floor(left),
      });
    }
  }, []);

  const handleState = () => {
    const newState = state === "hidden" ? "" : "hidden";
    setState(newState);

    if (profileRef.current && newState !== "") {
      const { bottom, left } = profileRef.current.getBoundingClientRect();
      setMenuPosition({
        top: Math.floor(bottom),
        left: Math.floor(left),
      });
    }
  };

  const logout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div className="w-1/2 cursor-pointer relative" onClick={handleState}>
      {imageUrl && (
        <img
          ref={profileRef}
          src={imageUrl}
          alt=""
          className="w-[5vmax] lg:w-[10vmax] h-auto"
        />
      )}
      {state !== "hidden" && (
        <Menu pos={menuPosition}>
          <MenuItem label="Logout" onClick={logout} />
        </Menu>
      )}
    </div>
  );
};

export default Profile;
