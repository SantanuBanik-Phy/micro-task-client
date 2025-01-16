import React from 'react';



import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const HomeLayout = () => {
   
    return (
      
        <div className=''>
          
      
          <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900 dark:text-white bg-[url('https://i.ibb.co.com/hCMPLvh/3386851.jpg')] bg-cover bg-center bg-no-repeat">
  <Navbar></Navbar>
</nav>

      
       
      <div className='min-h-[calc(100vh-100px)] '>
        {/* Dynamic Section */}
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />


    
     
     
        </div>
    );
};

export default HomeLayout;