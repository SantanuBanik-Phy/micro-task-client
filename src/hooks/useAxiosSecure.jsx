
import axios from 'axios';
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext)
    useEffect(() => {
        axiosSecure.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('error in the interceptor', error.response.status);
            if (error.response.status === 401 || error.response.status === 403) {
                toast.error("Session expired. Please log in again.");
                logOut()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch(error => console.log(error))
            }
            return Promise.reject(error);
        })
    }, [logOut, navigate])
    return axiosSecure
}

export default useAxiosSecure