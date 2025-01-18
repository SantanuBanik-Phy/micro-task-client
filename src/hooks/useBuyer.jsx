import { useEffect, useState } from "react";
import axios from "axios";

const useBuyer = (email) => {
    const [isBuyer, setIsBuyer] = useState(false);
    const [isBuyerLoading, setIsBuyerLoading] = useState(true);
    

    useEffect(() => {
        const fetchBuyerStatus = async () => {
            if (email) {
                try {
                    const response = await axios.get(`https://b10-a12-server.vercel.app/api/users/buyer/${email}`);
                    setIsBuyer(response.data.isBuyer); // Assuming `isBuyer` is in the response data
                } catch (error) {
                    console.error("Error fetching buyer status:", error);
                    setIsBuyer(false); // Default to false if there's an error
                } finally {
                    setIsBuyerLoading(false); // Ensure loading state is updated
                }
            }
        };

        fetchBuyerStatus();
    }, [email]);

    return [isBuyer, isBuyerLoading];
};

export default useBuyer;
