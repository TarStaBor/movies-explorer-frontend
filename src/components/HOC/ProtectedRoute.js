import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to="/signup" state={{ from: location }} />;
  }

  return children;
};
export { ProtectedRoute };
