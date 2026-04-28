import { createBrowserRouter } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import { HomePage } from "../pages/HomePage";
import { DetailsPage } from "../pages/DetailsPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
        {path: "/home", element: <HomePage />},
        {path:"/home/:id", element: <DetailsPage />},
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
]);

