import { createBrowserRouter } from "react-router";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import ProtectedRoute from "../src/components/ProtectedRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
        {path: "/home", element: <h1>Home</h1>}
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

