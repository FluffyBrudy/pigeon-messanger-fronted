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
} from "./routerPath";
import Home from "../pages/home/Home";
import Auth from "../pages/authentication/Auth";

const router = createBrowserRouter([
  {
    path: ROOT,
    element: <Root />,
    children: [
      {
        path: HOME_ROUTE,
        element: <Home />,
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
