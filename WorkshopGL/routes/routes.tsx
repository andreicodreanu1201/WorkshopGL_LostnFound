import { createBrowserRouter } from "react-router";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home page!</h1>,
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

