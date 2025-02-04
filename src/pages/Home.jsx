import { useState, useEffect } from "react";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import BestWorkers from "../components/BestWorkers";
import TestimonialSection from "../components/TestimonialSection";
import { Helmet } from "react-helmet";
import WhyChooseUs from "../components/WhyChooseUs";
import ReactCountUp from "../components/ReactCountUp";
import HowItWorks from "../components/HowItWorks";
import BenefitsAndAdvantages from "../components/BenefitsAdvantages";
import EmbraceTheFutureOfWork from "../components/EmbraceTheFutureOfWork";

const Home = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get('https://b10-a12-server.vercel.app/best/users?role=worker&sort=coins&limit=6');
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
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white">
            <Helmet>
                <title>Home - Micro Task Platform</title>
            </Helmet>
            <section>
                <HeroSection />
            </section>
            <section className="p-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-[url('https://i.ibb.co.com/qWz60KQ/freepik-expand-92212.png')] dark:bg-[url('https://i.ibb.co.com/different-bg-for-dark.png')] dark:bg-gray-900 bg-cover bg-center bg-no-repeat bg-fixed  ">
    <BestWorkers workers={workers} loading={loading} />
</section>

            <section className="w-11/12 mx-auto py-6">
                <TestimonialSection />
            </section>
            <section className="w-11/12 mx-auto py-6">
                <WhyChooseUs />
            </section>
            <section className="py-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-[url('https://i.ibb.co.com/NtLFmF9/5655049.jpg')] dark:bg-[url('https://i.ibb.co.com/different-bg-for-dark.png')] dark:bg-gray-900 dark:text-white bg-cover bg-center bg-no-repeat ">
    <ReactCountUp />
</section>
            <section className="w-11/12 mx-auto py-6">
                <EmbraceTheFutureOfWork />
            </section>
            <section className="bg-gradient-to-l from-blue-950 to-blue-500 ">
                <BenefitsAndAdvantages />
            </section>
            <section className="py-6">
                <HowItWorks />
            </section>
        </div>
    );
};

export default Home;
