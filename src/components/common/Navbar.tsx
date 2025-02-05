import { useState } from "react";
import { Menu, Home, Users, Bell, UserPlus } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  ACCEPTED_FRIENDS_ROUTE,
  HOME_ROUTE,
  PENDING_REQUESTS_ROUTE,
} from "../../router/routerPath";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <NavLink
              to="/home"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              MyApp
            </NavLink>
          </div>{" "}
          <div className="hidden  space-x-6 md:flex">
            <NavLink to={HOME_ROUTE}>
              <Home size={20} /> Home
            </NavLink>
            <NavLink to={ACCEPTED_FRIENDS_ROUTE}>
              <Users size={20} /> Friends
            </NavLink>
            <NavLink to="/pending-requests">
              <UserPlus size={20} /> Requests
            </NavLink>
            <NavLink to="/notifications">
              <Bell size={20} /> Notifications
            </NavLink>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col fixed  bg-gray-800 dark:bg-gray-900 w-full z-10 py-4 px-6 space-y-4">
          <NavLink to={HOME_ROUTE} className="flex items-center">
            <Home size={20} className="mr-2" /> Home
          </NavLink>
          <NavLink to={ACCEPTED_FRIENDS_ROUTE} className="flex items-center">
            <Users size={20} className="mr-2" /> Friends
          </NavLink>
          <NavLink to={PENDING_REQUESTS_ROUTE} className="flex items-center">
            <UserPlus size={20} className="mr-2" /> Requests
          </NavLink>
          <NavLink to="/notifications" className="flex items-center">
            <Bell size={20} className="mr-2" /> Notifications
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
