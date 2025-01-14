// src/components/HeroSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "animate.css";
import { Navigation } from "swiper/modules";

const HeroSection = () => {
  const slides = [
    {
        id: 1,
        image: 'https://img.freepik.com/free-photo/diverse-group-young-people-volunteering-forest_53876-124131.jpg',
        title: 'Welcome to Our Micro-Tasking Platform',
        description: 'Empowering individuals to earn and learn through micro-tasks.',
        buttonText: 'Get Started',
    },
    {
        id: 2,
        image: 'https://img.freepik.com/free-photo/businessman-working-data-information_53876-124112.jpg',
        title: 'Achieve More with Micro-Tasks',
        description: 'Complete small tasks and earn rewards while enhancing your skills.',
        buttonText: 'Join Now',
    },
    {
        id: 3,
        image: 'https://img.freepik.com/free-photo/group-volunteers-collecting-trash-park_53876-124111.jpg',
        title: 'Create Opportunities for Everyone',
        description: 'Buyers can create tasks to get work done efficiently and affordably.',
        buttonText: 'Learn More',
    },
  ];

  return (
    <div className="bg-neutral text-neutral-content">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative hero"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "450px", // Adjust height for smaller screens
                height: "600px", // Adjust height for larger screens
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-4xl md:text-5xl text-white font-bold mb-4 animate__animated animate__fadeInDown">
                  {slide.title}
                </h2>
                <p className="mb-6 text-lg animate__animated animate__fadeInUp animate__delay-1s">
                  {slide.description}
                </p>
                <button className="btn btn-primary animate__animated animate__zoomIn animate__delay-2s">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
