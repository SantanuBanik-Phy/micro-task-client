import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://i.ibb.co/H2jjxW5/designer-work-office.jpg',
    title: 'Welcome to Our Micro-Tasking Platform',
    description: 'Empowering individuals to earn and learn through micro-tasks.',
    buttonText: 'Get Started',
  },
  {
    id: 2,
    image: 'https://i.ibb.co/M5VMwB6/male-graphic-designer-writing-diary-holding-mobile-phone.jpg',
    title: 'Achieve More with Micro-Tasks',
    description: 'Complete small tasks and earn rewards while enhancing your skills.',
    buttonText: 'Get Started',
  },
  {
    id: 3,
    image: 'https://i.ibb.co/x6LBnjQ/hands-man-working-with-laptop.jpg',
    title: 'Create Opportunities for Everyone',
    description: 'Buyers can create tasks to get work done efficiently and affordably.',
    buttonText: 'Get Started',
  },
  {
    id: 4,
    image: 'https://i.ibb.co/fN9PFnc/young-man-standing-kitchen-counter-writing-paper-with-pencil.jpg',
    title: 'Work Flexibly, Earn Steadily',
    description: 'Choose tasks that fit your schedule and earn at your own pace.',
    buttonText: 'Get Started',
  },
  {
    id: 5,
    image: 'https://i.ibb.co/sFw9CFV/teenager-studying-communication-project-university-seminar-using-laptop-computer-student-talking-pho.jpg',
    title: 'Professional Growth Through Micro-Tasks',
    description: 'Enhance your professional skills by completing diverse tasks.',
    buttonText: 'Get Started',
  },
];

const HeroSection = () => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-gray-100">
      <Swiper
        modules={[EffectFade, Pagination, Autoplay]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full flex items-center justify-center text-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
               
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
              <div className="relative z-10 max-w-5xl text-white ">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 shadow-md">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 shadow-sm">{slide.description}</p>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-gradient-to-r from-red-400 to-yellow-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-red-400 transition duration-300"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
