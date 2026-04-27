import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
    const {token} = useAuth();

    return token ? <Outlet/> : <Navigate to="/login" />;
};

export default ProtectedRoute;


