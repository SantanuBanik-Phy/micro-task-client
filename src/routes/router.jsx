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
// import BuyerSubmissionList from "../pages/Buyer/BuyerSubmissionList";
import BuyerPurchaseCoin from "../pages/Buyer/BuyerPurchaseCoin";
import BuyerPaymentHistory from "../pages/Buyer/BuyerPaymentHistory";
import WorkerHome from "../pages/Worker/WorkerHome";
import WorkerTaskList from "../pages/Worker/WorkerTaskList";
import WorkerMySubmissions from "../pages/Worker/WorkerMySubmissions";
import AdminHome from "../pages/Admin/AdminHome";
import WorkerWithdrawals from "../pages/Worker/WorkerWithdrawals";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageTasks from "../pages/Admin/MangeTasks";
// import ManageSubmissions from "../pages/Admin/ManageSubmissions";
import TaskDetails from "../pages/Shared/TaskDetails";
import BuyerEditTask from "../pages/Shared/BuyerEditTask";
import Checkout from "../pages/Buyer/Checkout";
import UserProfile from "../pages/Dasboard/UserProfile";
import PrivateRoute from "./PrivateRoute";
import BuyerRoute from "./BuyerRoute";
import WorkerRoute from "./WorkerRoute";
import AdminRoute from "./AdminRoute";







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
      {
        path:'/profile',
        element: <PrivateRoute> <UserProfile></UserProfile></PrivateRoute>
      },
      
      
  ]
},
{
  path: '/dashboard',
  element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute> ,

 
  children: [
      {
          path: '',
          element: <Dashboard></Dashboard>
      },
     
    {
        path: 'buyer-home',
        element: <BuyerRoute><BuyerHome></BuyerHome></BuyerRoute>
    },
    {
      path: 'add-task',
      element: <BuyerRoute><BuyerAddTask></BuyerAddTask></BuyerRoute>
  },
  {
    path: 'my-tasks',
    element: <BuyerRoute> <BuyerMyTasks></BuyerMyTasks></BuyerRoute>
},
// {
// path: 'submission-list/:id',
// element: <BuyerSubmissionList></BuyerSubmissionList>,
// loader: ({ params }) => fetch(`https://b10-a12-server.vercel.app/api/submissions/task/${params.id}`)
// },

{
  path: 'purchase-coin',
  element:<BuyerRoute> <BuyerPurchaseCoin></BuyerPurchaseCoin></BuyerRoute>
},
{
  path: 'payment-history',
  element: <BuyerRoute><BuyerPaymentHistory></BuyerPaymentHistory></BuyerRoute>
},
{
  path: 'worker-home',
  element:<WorkerRoute> <WorkerHome></WorkerHome></WorkerRoute>
},
{
  path: 'worker-task-list',
  element: <WorkerRoute><WorkerTaskList></WorkerTaskList></WorkerRoute>
},
 {
  path: 'my-submissions',
  element: <WorkerRoute><WorkerMySubmissions></WorkerMySubmissions></WorkerRoute>
},
{
  path: 'withdrawals',
  element: <WorkerRoute><WorkerWithdrawals></WorkerWithdrawals></WorkerRoute>
},

{
  path: 'admin-home',
  element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
},
{
  path: 'manage-users',
  element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
},
{
  path: 'manage-tasks',
  element: <AdminRoute><ManageTasks></ManageTasks></AdminRoute>
},
// {
//   path: 'manage-submissions',
//   element: <ManageSubmissions></ManageSubmissions>
// },

{
  path: 'task-details/:id',
  element: <TaskDetails></TaskDetails>,
  loader: ({ params }) => fetch(`https://b10-a12-server.vercel.app/api/tasks/${params.id}`)
},
{
  path: 'edit-task/:id',
  element: <BuyerRoute><BuyerEditTask></BuyerEditTask></BuyerRoute>,
  loader: ({ params }) => fetch(`https://b10-a12-server.vercel.app/api/tasks/${params.id}`)
},
{
  path:'checkout',
  element: <Checkout></Checkout>
},








   
     
  ]

  },
  // {
  //   path: "*",
  //   element: <ErrorPage></ErrorPage>
  // },
 
]);

export default router;
