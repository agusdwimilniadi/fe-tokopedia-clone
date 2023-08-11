import { RequireAuth, useIsAuthenticated } from 'react-auth-kit';
import { useLocation, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  return (
    <RequireAuth loginPath="/login" isAuthenticated={isAuthenticated()}>
      {isAuthenticated() ? (
        children
      ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      )}
    </RequireAuth>
  );
};
export default PrivateRoute;
