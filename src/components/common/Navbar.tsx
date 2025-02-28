import { FC } from "react";
import { Menu, Home, Users, UserPlus } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ACCEPTED_FRIENDS_ROUTE,
  HOME_ROUTE,
  PENDING_REQUESTS_ROUTE,
} from "../../router/routerPath";

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
  return (
    <nav
      className={`${
        orient === "v"
          ? "h-screen flex justify-between w-20 flex-col"
          : "h-16 w-full flex-row px-4 justify-between"
      } bg-gray-900 text-white flex items-center py-4 ${className}`}
    >
      <AppIcon />

      <div
        className={`flex ${
          orient === "v"
            ? "flex-col gap-6"
            : "flex-row gap-4 flex-1 justify-center"
        } items-center`}
      >
        <NavLink to={HOME_ROUTE} className="flex flex-col items-center gap-1">
          <Home size={24} />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to={ACCEPTED_FRIENDS_ROUTE}
          className="flex flex-col items-center gap-1"
        >
          <Users size={24} />
          <span className="text-xs">Friends</span>
        </NavLink>
        <NavLink
          to={PENDING_REQUESTS_ROUTE}
          className="flex flex-col items-center gap-1"
        >
          <UserPlus size={24} />
          <span className="text-xs">Requests</span>
        </NavLink>
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

const AppIcon = () => {
  const navigation = useNavigate();

  return (
    <div
      className="relative cursor-pointer w-[50%] flex justify-center rounded-full"
      onClick={() => navigation(HOME_ROUTE)}
    >
      <img src="/appicon.svg" />
    </div>
  );
};

export default Navbar;
