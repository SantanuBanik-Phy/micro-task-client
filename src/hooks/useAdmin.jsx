import { useEffect, useState } from "react";
import axios from "axios";

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (email) {
                try {
                    const response = await axios.get(`https://b10-a12-server.vercel.app/api/users/admin/${email}`);
                    setIsAdmin(response.data.isAdmin); // Assuming `isAdmin` is in the response data
                } catch (error) {
                    console.error("Error fetching admin status:", error);
                    setIsAdmin(false); // Set to false if there's an error
                } finally {
                    setIsAdminLoading(false);
                }
            }
        };

        fetchAdminStatus();
    }, [email]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
