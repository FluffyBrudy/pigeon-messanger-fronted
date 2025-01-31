import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../Root";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "./routerPath";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: HOME_ROUTE,
        element: <Home />,
      },
    ],
  },
  {
    path: LOGIN_ROUTE,
    element: <Login />,
  },
  {
    path: REGISTER_ROUTE,
    element: <Register />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
