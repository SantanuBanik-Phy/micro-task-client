import { useEffect, useState } from "react";
import axios from "axios";

const useWorker = (email) => {
    const [isWorker, setIsWorker] = useState(false);
    const [isWorkerLoading, setIsWorkerLoading] = useState(true);

    useEffect(() => {
        const fetchWorkerStatus = async () => {
            if (email) {
                try {
                    const response = await axios.get(`https://b10-a12-server.vercel.app/api/users/worker/${email}`);
                    setIsWorker(response.data.isWorker); // Assuming `isWorker` is in the response data
                } catch (error) {
                    console.error("Error fetching worker status:", error);
                    setIsWorker(false); // Default to false if an error occurs
                } finally {
                    setIsWorkerLoading(false); // Ensure loading state is updated
                }
            }
        };

        fetchWorkerStatus();
    }, [email]);

    return [isWorker, isWorkerLoading];
};

export default useWorker;
