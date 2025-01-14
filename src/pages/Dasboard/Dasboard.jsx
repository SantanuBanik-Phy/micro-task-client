
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';


import { AuthContext } from '../../provider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useBuyer from '../../hooks/useBuyer';
import useWorker from '../../hooks/useWorker';

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    const [isWorker] = useWorker(user?.email);
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAdmin) {
        return <Navigate to='/dashboard/admin-home' state={{ from: location }} replace></Navigate>
    }
    if (isBuyer) {
        return <Navigate to='/dashboard/buyer-home' state={{ from: location }} replace></Navigate>
    }
    if (isWorker) {
        return <Navigate to='/dashboard/worker-home' state={{ from: location }} replace></Navigate>
    }
};

export default Dashboard;