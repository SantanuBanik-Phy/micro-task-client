import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dasboard/Dasboard";
import BuyerHome from "../pages/Buyer/BuyerHome";
import BuyerAddTask from "../pages/Buyer/BuyerAddTask";





const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
       
        <HomeLayout />
      </>
    ),
    children: [
      {
          path: '/',
          element: <Home></Home>
      },
      {
          path: '/login',
          element: <Login></Login>
      },
      {
          path: '/register',
          element: <Register></Register>
      },
  ]
},
{
  path: '/dashboard',
  element: <DashboardLayout></DashboardLayout>,
 
  children: [
      {
          path: '',
          element: <Dashboard></Dashboard>
      },
     
    {
        path: 'buyer-home',
        element: <BuyerHome></BuyerHome>
    },
    {
      path: 'add-task',
      element: <BuyerAddTask></BuyerAddTask>
  },
   
     
  ]

  },
  // {
  //   path: "*",
  //   element: <ErrorPage></ErrorPage>
  // },
]);

export default router;
