import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Protected({ children, allowedRoles }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);

        // role check
        if (allowedRoles && !allowedRoles.includes(decoded.role)) {
            return <Navigate to="/unauthorized" />;
        }

        return children;

    } catch (error) {
        return <Navigate to="/login" />;
    }
}