// src/components/TestimonialSection.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import qoute1 from "../assets/openq.png"
import qoute12 from "../assets/closeq1.png"

const testimonials = [
    {
        id: 1,
        name: 'John Doe',
        comment: 'This platform is amazing! I have been able to earn a significant amount of money by completing simple tasks.',
        image: 'https://img.freepik.com/free-photo/portrait-confident-young-man_23-2148484565.jpg',
    },
    {
        id: 2,
        name: 'Jane Smith',
        comment: 'I love how easy it is to use this platform. The tasks are straightforward, and the payouts are fair.',
        image: 'https://img.freepik.com/free-photo/successful-businesswoman-looking-camera-outside-office_23-2148438761.jpg',
    },
    {
        id: 3,
        name: 'Peter Jones',
        comment: 'I highly recommend this platform to anyone looking to make some extra money in their spare time.',
        image: 'https://img.freepik.com/free-photo/successful-man_23-2148484569.jpg',
    },
];

const TestimonialSection = () => {
    return (
        <div className="my-20 px-4 md:px-16 lg:px-32 bg-gray-50 py-10 relative">
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient ">
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
                        <div className="flex flex-col lg:flex-row items-center justify-between bg-white shadow-2xl rounded-xl overflow-hidden">
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
                                    className="absolute top-0 left-0 w-12 h-12 opacity-30"
                                />
                                <p className="text-lg text-gray-600 leading-relaxed mb-6 relative">
                                    {testimonial.comment}
                                </p>
                                <img
                                    src={qoute12}
                                    alt="Close Quote"
                                    className="absolute bottom-14 right-0 w-12 h-12 opacity-30"
                                />
                                <h3 className="text-3xl font-bold text-gray-800 mt-6 relative">
                                    {testimonial.name}
                                </h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TestimonialSection;
