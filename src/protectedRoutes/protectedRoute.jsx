import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ element, allowsRoles }) {
    const { user } = useContext(AuthContext);

    if (!user || (allowsRoles && !allowsRoles.includes(user.role))) {
        return <Navigate to="/login" replace />;
    }

    return element;
}