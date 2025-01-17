import React, { useEffect, useState } from 'react';



import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const HomeLayout = () => {
  const getInitialTheme = () => {
    // Ensure safe access to localStorage and provide a default value
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    // Ensure only the correct class is applied
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Save the theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
   
    return (
      
        <div className=''>
          
      
          <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900 dark:text-white bg-[url('https://i.ibb.co.com/hCMPLvh/3386851.jpg')] bg-cover bg-center bg-no-repeat">
  <Navbar theme={theme} toggleTheme={toggleTheme}></Navbar>
</nav>

      
       
      <div className='min-h-[calc(100vh-100px)] '>
        {/* Dynamic Section */}
        <Outlet />
      </div>
      {/* Footer */}
      <Footer  theme={theme} />


    
     
     
        </div>
    );
};

export default HomeLayout;