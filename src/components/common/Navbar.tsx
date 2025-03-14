import { FC } from "react";
import { Menu, Home, Users, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ACCEPTED_FRIENDS_ROUTE,
  HOME_ROUTE,
  PENDING_REQUESTS_ROUTE,
} from "../../router/routerPath";
import Profile from "../../pages/preference/Profile";

interface NavbarProps {
  orient?: string;
  className?: string;
  smMenuCallback?: () => void;
}

const Navbar: FC<NavbarProps> = ({
  orient = "v",
  className = "",
  smMenuCallback,
}) => {
  const isActive = (path: string) =>
    location.pathname === path ? "text-red-500" : "text-gray-400";

  return (
    <nav
      className={`${
        orient === "v"
          ? "h-screen flex justify-between w-20 flex-col"
          : "h-16 w-full flex-row px-4 justify-between"
      }  text-white flex items-center py-4 ${className}`}
    >
      <Profile />
      <div
        className={`text-xs flex ${
          orient === "v"
            ? "flex-col gap-6"
            : "flex-row gap-4 flex-1 justify-center"
        } items-center`}
      >
        <div className="flex flex-col items-center gap-1 relative">
          <Link
            to={HOME_ROUTE}
            className="absolute block top-0 left-0 w-full z-10 h-full"
          />
          <Home className={`w-[5vmin] ${isActive(HOME_ROUTE)}`} />
          <span className={isActive(HOME_ROUTE)}>Home</span>
        </div>

        <div className="flex flex-col items-center gap-1 relative">
          <Link
            to={ACCEPTED_FRIENDS_ROUTE}
            className="absolute block top-0 left-0 w-full z-10 h-full"
          />
          <Users className={`w-[5vmin] ${isActive(ACCEPTED_FRIENDS_ROUTE)}`} />
          <span className={isActive(ACCEPTED_FRIENDS_ROUTE)}>Friends</span>
        </div>

        <div className="flex flex-col items-center gap-1 relative">
          <Link
            to={PENDING_REQUESTS_ROUTE}
            className="absolute block top-0 left-0 w-full z-10 h-full"
          />
          <UserPlus
            className={`w-[5vmin] ${isActive(PENDING_REQUESTS_ROUTE)}`}
          />
          <span className={isActive(PENDING_REQUESTS_ROUTE)}>Requests</span>
        </div>
      </div>

      {orient === "v" ? <div /> : null}

      {orient === "h" && (
        <button
          onClick={() => smMenuCallback && smMenuCallback()}
          className="p-2 rounded-md text-gray-400 hover:bg-gray-700"
        >
          <Menu size={24} />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
