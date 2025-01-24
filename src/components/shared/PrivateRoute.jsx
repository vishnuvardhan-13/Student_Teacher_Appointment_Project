import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
    const { currentUser, role } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
