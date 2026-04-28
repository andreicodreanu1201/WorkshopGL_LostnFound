import { createBrowserRouter } from "react-router";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import ProtectedRoute from "../src/components/ProtectedRoute";
// TEMPORARY: demo route for LogoutModal — remove this import and the /demo-logout entry below before merging.
import DemoLogout from "../src/pages/_DemoLogout";


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
  },
  // TEMPORARY: remove before merging.
  {
    path: "/demo-logout",
    element: <DemoLogout/>
  }
]);
