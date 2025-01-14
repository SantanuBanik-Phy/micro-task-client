// src/components/TestimonialSection.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const testimonials = [
    {
        id: 1,
        name: 'John Doe',
        comment: 'This platform is amazing! I have been able to earn a significant amount of money by completing simple tasks.',
        image: 'https://placehold.co/150x150', // Replace with actual image URLs
    },
    {
        id: 2,
        name: 'Jane Smith',
        comment: 'I love how easy it is to use this platform. The tasks are straightforward, and the payouts are fair.',
        image: 'https://placehold.co/150x150',
    },
    {
        id: 3,
        name: 'Peter Jones',
        comment: 'I highly recommend this platform to anyone looking to make some extra money in their spare time.',
        image: 'https://placehold.co/150x150',
    },
];

const TestimonialSection = () => {
    return (
        <div className='my-20'>
            <h2 className="text-4xl font-bold text-center mb-10">Testimonials</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-center">
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={testimonial.image} alt={testimonial.name} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                                <p>{testimonial.comment}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TestimonialSection;