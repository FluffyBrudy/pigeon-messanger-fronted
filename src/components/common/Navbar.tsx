import { useState } from "react";
import { Menu, Home, Users, Bell, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              to="/home"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              MyApp
            </Link>
          </div>{" "}
          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="nav-link">
              <Home size={20} /> Home
            </Link>
            <Link to="/friends" className="nav-link">
              <Users size={20} /> Friends
            </Link>
            <Link to="/pending-requests" className="nav-link">
              <UserPlus size={20} /> Requests
            </Link>
            <Link to="/notifications" className="nav-link">
              <Bell size={20} /> Notifications
            </Link>
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
        <div className="md:hidden bg-white dark:bg-gray-900 p-4 space-y-3">
          <Link to="/home" className="nav-link block">
            <Home size={20} /> Home
          </Link>
          <Link to="/friends" className="nav-link block">
            <Users size={20} /> Friends
          </Link>
          <Link to="/pending-requests" className="nav-link block">
            <UserPlus size={20} /> Requests
          </Link>
          <Link to="/notifications" className="nav-link block">
            <Bell size={20} /> Notifications
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
