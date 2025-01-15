import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';


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

const HeroSection = () => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-gray-100">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-purple-600 before:to-blue-500 before:opacity-80 after:content-[''] after:absolute after:bottom-0 after:w-full after:h-20 after:bg-white after:clip-path-[polygon(0%_90%,_100%_70%,_100%_100%,_0%_100%)]"
        ></div>
      </div>
      <Swiper
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="relative z-10 w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full flex items-center justify-center text-center px-6"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-gray-800"></div>
              <div className="relative z-10 max-w-2xl text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                  {slide.description}
                </p>
                <button
                  className="px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-teal-500 hover:to-blue-600 focus:ring focus:ring-teal-300 transition duration-300"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-0 left-0 w-full py-4 bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <p className="text-gray-700 text-sm">Your journey starts here. Join thousands of users today!</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-500 focus:ring focus:ring-blue-300 transition duration-300"
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;