
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import useWorker from '../hooks/useWorker';
import Loading from '../components/Loading';

const WorkerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isWorker, isWorkerLoading] = useWorker(user?.email);
    const location = useLocation();

    if (loading || isWorkerLoading) {
        return <Loading></Loading> 
    }

    if (user && isWorker) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default WorkerRoute;