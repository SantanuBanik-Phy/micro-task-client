import { useState, useEffect } from "react";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import BestWorkers from "../components/BestWorkers";
import TestimonialSection from "../components/TestimonialSection";

import { Helmet } from "react-helmet";

const Home = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users?role=worker&sort=coins&limit=6');
                setWorkers(response.data);
            } catch (error) {
                console.error("Error fetching workers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, []);

    return (
        <div>
            <Helmet>
                <title>Home - Micro Task Platform</title>
            </Helmet>
            <section >
            <HeroSection />
            </section>
            <section className="w-11/12 mx-auto py-8"> <BestWorkers workers={workers} loading={loading} /></section>
            
            <section className="w-11/12 mx-auto py-8" > <TestimonialSection /></section>
     
            
        </div>
    );
};

export default Home;