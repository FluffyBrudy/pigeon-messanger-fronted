import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../Root";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "./routerPath";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
