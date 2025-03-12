import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../Root";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import {
  AUTH_ROOT,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  ROOT,
  ACCEPTED_FRIENDS_ROUTE,
  PENDING_REQUESTS_ROUTE,
} from "./routerPath";
import Home from "../pages/home/Home";
import Auth from "../pages/authentication/Auth";
import AcceptedFriends from "../pages/social/AcceptedFriends";
import PendingRequests from "../pages/social/PendingRequests";

const router = createBrowserRouter([
  {
    path: ROOT,
    element: <Root />,
    children: [
      {
        path: HOME_ROUTE,
        element: <Home />,
      },
      {
        path: ACCEPTED_FRIENDS_ROUTE,
        element: <AcceptedFriends />,
      },
      {
        path: PENDING_REQUESTS_ROUTE,
        element: <PendingRequests />,
      },
    ],
  },
  {
    path: AUTH_ROOT,
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: LOGIN_ROUTE,
        element: <Login />,
      },
      {
        path: REGISTER_ROUTE,
        element: <Register />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
