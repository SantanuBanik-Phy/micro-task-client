import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import qoute1 from "../assets/openq.png";
import qoute12 from "../assets/closeq1.png";

const testimonials = [
    {
        id: 1,
        name: 'Santanu',
        comment: 'This platform is amazing! I have been able to earn a significant amount of money by completing simple tasks.',
        image: 'https://i.ibb.co/Qpgk5zP/handsome-young-business-man-holding-document-folder-220507-700.jpg',
    },
    {
        id: 2,
        name: 'Purba',
        comment: 'I love how easy it is to use this platform. The tasks are straightforward, and the payouts are fair.',
        image: 'https://i.ibb.co/1Zzf8dv/360-F-617571490-Lagtv4fr-Ko0-T4zo-El-Zsld-Duzzn-AATG10.jpg',
    },
    {
        id: 3,
        name: 'Sarah',
        comment: 'I highly recommend this platform to anyone looking to make some extra money in their spare time.',
        image: 'https://i.ibb.co/wRz21Hn/istockphoto-1163294201-612x612.jpg',
    },
];

const TestimonialSection = () => {
    return (
        <div className="my-20 px-6 md:px-16 lg:px-32 bg-gradient-to-l from-blue-950 to-blue-500 dark:from-gray-800 dark:to-gray-700 py-16 rounded-xl shadow-lg relative">
            <h2 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 text-transparent bg-clip-text">
                Testimonials
            </h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                        <div className="flex flex-col lg:flex-row items-center justify-between bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden transform transition duration-300 hover:scale-105">
                            <div className="relative lg:w-1/2 h-64 md:h-72 lg:h-96">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="absolute inset-0 w-full h-full object-cover rounded-l-xl"
                                />
                            </div>
                            <div className="w-full lg:w-1/2 p-8 md:p-10 relative">
                                <img
                                    src={qoute1}
                                    alt="Open Quote"
                                    className="absolute -top-8 left-4 w-16 h-16 opacity-20"
                                />
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 relative">
                                    {testimonial.comment}
                                </p>
                                <img
                                    src={qoute12}
                                    alt="Close Quote"
                                    className="absolute bottom-4 right-4 w-16 h-16 opacity-20"
                                />
                                <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mt-6 relative">
                                    {testimonial.name}
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mt-3"></div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TestimonialSection;