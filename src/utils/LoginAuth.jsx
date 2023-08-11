import { useIsAuthenticated } from 'react-auth-kit';
import { useLocation, Navigate } from 'react-router-dom';

const LoginAuth = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated() ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    children
  );
};
export default LoginAuth;
