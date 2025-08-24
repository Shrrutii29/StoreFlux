import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  // If token exists, render the child page
  // Otherwise, redirect to login
  if (!token?.access_token) {
    return <Navigate to="/auth/login" replace state={{message: " Please login first"}} />;
  }

  return children;
};
