import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dasboard/Dasboard";
import BuyerHome from "../pages/Buyer/BuyerHome";
import BuyerAddTask from "../pages/Buyer/BuyerAddTask";
import BuyerMyTasks from "../pages/Buyer/BuyerMyTasks";
import BuyerSubmissionList from "../pages/Buyer/BuyerSubmissionList";
import BuyerPurchaseCoin from "../pages/Buyer/BuyerPurchaseCoin";
import BuyerPaymentHistory from "../pages/Buyer/BuyerPaymentHistory";






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
  {
    path: 'my-tasks',
    element: <BuyerMyTasks></BuyerMyTasks>
},
{
path: 'submission-list/:id',
element: <BuyerSubmissionList></BuyerSubmissionList>,
loader: ({ params }) => fetch(`http://localhost:3000/api/submissions/task/${params.id}`)
},

{
  path: 'purchase-coin',
  element: <BuyerPurchaseCoin></BuyerPurchaseCoin>
},
{
  path: 'payment-history',
  element: <BuyerPaymentHistory></BuyerPaymentHistory>
},




   
     
  ]

  },
  // {
  //   path: "*",
  //   element: <ErrorPage></ErrorPage>
  // },
]);

export default router;
