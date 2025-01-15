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
import WorkerHome from "../pages/Worker/WorkerHome";
import WorkerTaskList from "../pages/Worker/WorkerTaskList";
// import WorkerMySubmissions from "../pages/Worker/WorkerMySubmissions";
// import AdminHome from "../pages/Admin/AdminHome";
// import WorkerWithdrawals from "../pages/Worker/WorkerWithdrawals";
// import ManageUsers from "../pages/Admin/ManageUsers";
// import ManageTasks from "../pages/Admin/MangeTasks";
// import ManageSubmissions from "../pages/Admin/ManageSubmissions";
import TaskDetails from "../pages/Shared/TaskDetails";
import BuyerEditTask from "../pages/Shared/BuyerEditTask";
import Checkout from "../pages/Buyer/Checkout";







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
{
  path: 'worker-home',
  element: <WorkerHome></WorkerHome>
},
{
  path: 'worker-task-list',
  element: <WorkerTaskList></WorkerTaskList>
},
// // {
//   path: 'my-submissions',
//   element: <WorkerMySubmissions></WorkerMySubmissions>
// },
// {
//   path: 'withdrawals',
//   element: <WorkerWithdrawals></WorkerWithdrawals>
// },

// {
//   path: 'admin-home',
//   element: <AdminHome></AdminHome>
// },
// {
//   path: 'manage-users',
//   element:<ManageUsers></ManageUsers>
// },
// {
//   path: 'manage-tasks',
//   element: <ManageTasks></ManageTasks>
// },
// {
//   path: 'manage-submissions',
//   element: <ManageSubmissions></ManageSubmissions>
// },

{
  path: 'task-details/:id',
  element: <TaskDetails></TaskDetails>,
  loader: ({ params }) => fetch(`http://localhost:3000/api/tasks/${params.id}`)
},
{
  path: 'edit-task/:id',
  element: <BuyerEditTask></BuyerEditTask>,
  loader: ({ params }) => fetch(`http://localhost:3000/api/tasks/${params.id}`)
},
{
  path:'checkout',
  element: <Checkout></Checkout>
}




   
     
  ]

  },
  // {
  //   path: "*",
  //   element: <ErrorPage></ErrorPage>
  // },
]);

export default router;
