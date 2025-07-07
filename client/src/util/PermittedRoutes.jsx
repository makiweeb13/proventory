import { Outlet, Navigate } from 'react-router-dom'
import useStore from '../store/store';

const PermittedRoutes = () => {
    const { user } = useStore();

    if (user.role !== 'admin') {
        // If the user is not an admin, redirect to the dashboard
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default PermittedRoutes;