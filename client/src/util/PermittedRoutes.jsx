import { Outlet, Navigate } from 'react-router-dom'
import useStore from '../store/store';

const PermittedRoutes = () => {
    const { user } = useStore();

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default PermittedRoutes;