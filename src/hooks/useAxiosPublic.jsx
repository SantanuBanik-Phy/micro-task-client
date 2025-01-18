import axios from 'axios';
import { getToken } from '../utils/tokenUtils';
// Utility to get token from cookies or localStorage

const axiosPublic = axios.create({
    baseURL: 'https://b10-a12-server.vercel.app', // Replace with your actual base URL
    withCredentials: true, // Include credentials for secure cookie handling
});

const useAxiosPublic = () => {
    const sendRequest = async (config) => {
        const token = getToken(); // Retrieve token from cookies or localStorage

        // Add the token to the headers if it exists
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        try {
            const response = await axiosPublic(config);
            return response.data; // Return only the response data
        } catch (error) {
            console.error("Request failed:", error);
            throw error; // Re-throw the error for the caller to handle
        }
    };

    return sendRequest; // Return the function for use in other components
};

export default useAxiosPublic;
