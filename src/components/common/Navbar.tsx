import { useState } from "react";
import { Menu, Home, Users, UserPlus, MessageCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ACCEPTED_FRIENDS_ROUTE,
  HOME_ROUTE,
  PENDING_REQUESTS_ROUTE,
} from "../../router/routerPath";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  return (
    <nav className="w-full shadow-md relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="relative cursor-pointer"
            onClick={() => navigation(HOME_ROUTE)}
          >
            <svg width="50" height="50" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="20%" stopColor="green" />
                  <stop offset="100%" stopColor="lime " />
                </linearGradient>
              </defs>
              <MessageCircle width="64" height="64" fill="url(#grad)" />
            </svg>
            <svg
              className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
              height="32px"
              width="32px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 345.878 345.878"
            >
              <defs>
                <linearGradient
                  id="messengerGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="gray" />
                </linearGradient>
              </defs>
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  fill="url(#messengerGradient)"
                  d="M286.841,321.622c0.424-0.48,0.567-1.08,0.405-1.688c-0.883-3.313-12.812-7.684-37.926-16.19 c-16.169-5.477-32.887-11.139-38.713-15.033c-2.266-1.514-9.62-10.472-15.528-17.669c-4.73-5.762-7.965-9.679-9.669-11.376 c0.547-0.13,1.259-0.274,1.958-0.416c5.543-1.123,18.525-3.752,35.926-14.268c21.542-13.02,42.952-33.75,63.635-61.616 c43.162-58.151,38.604-88.664,36.657-101.693c-0.421-2.818-0.726-4.854-0.374-5.961c1.235-3.894,1.423-5.914,0.648-6.972 c-0.348-0.475-0.884-0.736-1.509-0.736c-0.989,0-2.089,0.627-3.253,1.292c-0.521,0.297-1.255,0.716-1.703,0.871 c0.003-0.507,0.205-1.818,1.44-5.052c3.045-7.978,2.791-9.385,2.27-10.142c-0.26-0.377-0.673-0.593-1.133-0.593 c-1.241,0-2.843,1.661-5.917,5.561c5.26-13.727,7.878-21.567,6.684-23.656c-0.267-0.467-0.706-0.735-1.204-0.735 c-1.52,0-3.032,2.396-7.342,11.903c0.074-0.328,0.148-0.659,0.224-0.992c5.143-22.829,5.517-26.983,4.028-27.876 c-0.202-0.122-0.433-0.186-0.666-0.186c-1.619,0-2.812,2.66-6.712,14.978c-0.116,0.37-0.236,0.749-0.358,1.132 c0.07-0.434,0.142-0.871,0.213-1.306c1.357-8.312,3.409-20.873,3.169-29.05C312.022,1.798,311.859,0,310.474,0 c-1.533,0-2.21,1.603-6.532,20.006c-1.454,6.191-2.957,12.593-4.274,17.134c-3.724,12.832-13.196,36.067-20.3,47.955 c-14.9,24.935-18.822,29.799-71.322,73.48c-24.925,20.737-56.261,42.942-60.334,44.761c-2.093-2.251-11.898-19.777-16.722-36.056 c-4.182-14.113-14.883-30.277-21.275-39.935c-2.14-3.232-3.83-5.785-4.318-6.859c-1.308-2.878-4.151-4.621-6.661-6.158 c-1.506-0.923-2.929-1.794-3.634-2.708c-1.326-1.72-2.224-4.709-3.175-7.875c-1.522-5.068-3.247-10.813-7.406-13.684 c-1.227-0.847-2.284-1.258-3.234-1.258c-1.371,0-2.221,0.822-2.903,1.482c-0.637,0.615-1.026,0.964-1.631,0.964 c-0.375,0-0.838-0.136-1.373-0.404c-2.321-1.161-5.025-9.227-6.999-15.117c-2.383-7.11-3.417-9.85-4.836-10.408 c-0.249-0.098-0.505-0.147-0.76-0.147c-1.967,0-3.004,2.709-4.007,5.33c-0.267,0.696-0.632,1.649-0.927,2.224 c-0.813-1.292-2.233-4.725-3.313-7.334c-3.062-7.399-4.467-10.443-6.054-10.747l-0.242-0.023c-0.759,0-2.469-0.001-5.196,15.109 c-0.494-1.353-1.085-3.031-1.666-4.683c-5.559-15.787-7.246-19.417-9.027-19.417l-0.197,0.015 c-1.904,0.296-2.402,3.675-3.238,15.998c-0.258,3.803-0.592,8.727-1.052,11.032c-0.021-0.057-0.041-0.116-0.063-0.179 c-1.234-3.563-2.203-4.952-3.458-4.952c-1.281,0-3.216,0-3.216,19.859c0,15.128,7.035,56.931,15.053,76.047 c7.168,17.094,8.654,18.573,11.617,21.52l0.361,0.36c0.681,0.681,1.259,1.108,1.699,1.391c-0.516,0.516-1.289,1.32-2.358,2.635 c-3.167,3.898-4.302,5.501-3.645,6.88c0.515,1.083,1.888,1.232,3.296,1.232c0.913,0,2.072-0.07,4-0.241l0.19-0.017 c4.858-0.435,7.915-0.597,15.337,8.267c6.164,7.362,8.539,23.675,10.446,36.783c0.39,2.678,0.766,5.258,1.154,7.658 c2.401,14.809,4.444,20.9,28.264,39.955c18.113,14.49,47.079,20.204,66.246,23.984c3.752,0.74,6.999,1.38,9.675,1.994 c7.145,3.25,15.569,7.913,24.488,12.848c2.464,1.364,4.948,2.739,7.429,4.096c16.832,9.21,33.141,12.553,39.996,12.553 c1.348,0,2.267-0.132,2.809-0.403c0.085-0.042,0.354-0.142,1.012-0.142c1.115,0,2.67,0.275,4.174,0.541 c1.552,0.274,3.018,0.533,4.15,0.533c2.317,0,2.567-1.277,2.567-1.827c0-0.063,0.007-0.099,0.004-0.105 c0.223-0.175,1.254-0.233,2.01-0.276c1.758-0.099,4.164-0.235,6.798-1.451c2.639-1.218,2.892-2.396,2.948-3.809 c0.041-1.051,0.089-2.242,3.8-4.459c1.597-0.954,2.458-1.889,2.709-2.944c0.309-1.298-0.368-2.367-1.023-3.4 C285.262,325.918,284.337,324.459,286.841,321.622z"
                />{" "}
              </g>
            </svg>
          </div>
          <div className="hidden  space-x-6 md:flex">
            <NavLink to={HOME_ROUTE}>
              <Home className="mx-auto" size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink to={ACCEPTED_FRIENDS_ROUTE}>
              <Users className="mx-auto" size={20} /> Friends
            </NavLink>
            <NavLink to="/pending-requests">
              <UserPlus className="mx-auto" size={20} /> Requests
            </NavLink>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-500  hover:bg-gray-200 "
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col fixed  bg-gray-800 w-full z-10 py-4 px-6 space-y-4">
          <NavLink to={HOME_ROUTE} className="flex items-center">
            <Home size={20} className="mr-2" /> Home
          </NavLink>
          <NavLink to={ACCEPTED_FRIENDS_ROUTE} className="flex items-center">
            <Users size={20} className="mr-2" /> Friends
          </NavLink>
          <NavLink to={PENDING_REQUESTS_ROUTE} className="flex items-center">
            <UserPlus size={20} className="mr-2" /> Requests
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
