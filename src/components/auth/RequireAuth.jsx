import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAuth = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div className="loading-state">Cargando...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
