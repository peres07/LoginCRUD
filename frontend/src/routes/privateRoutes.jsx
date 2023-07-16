import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export const PrivateRoute = () => {
    const { signed, validate } = useContext(AuthContext);

    return signed && validate() ? <Outlet /> : <Navigate to="/login" />;
};
