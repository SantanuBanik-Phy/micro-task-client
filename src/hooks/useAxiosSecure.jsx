
import axios from 'axios';
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';
import { getToken } from '../utils/tokenUtils';



 const axiosSecure = axios.create({
    baseURL: 'https://b10-a12-server.vercel.app',
    withCredentials: true,
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext)
    useEffect(() => {
        axiosSecure.interceptors.request.use(
            (config) => {
                const token = getToken(); // Use getToken here
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    
        axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    toast.error("Session expired. Please log in again.");
                    logOut()
                        .then(() => navigate('/login'))
                        .catch(err => console.error("Logout error:", err));
                }
                return Promise.reject(error);
            }
        );
    }, [logOut, navigate]);
    return axiosSecure
}

export default useAxiosSecure