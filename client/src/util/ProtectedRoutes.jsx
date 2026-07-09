import { Outlet, Navigate } from 'react-router-dom'
import useAuth from './useAuth';

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="dashboard-loading">Checking authentication...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;