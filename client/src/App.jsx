import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** Pages imports */
import HomeLayout from "./pages/HomeLayout";
import LoginPage from "./pages/authPages/LoginPage";
import RegisterPage from "./pages/authPages/RegisterPage";
import IndexPage from "./pages/authPages/IndexPage";
import ErrorPage from "./pages/ErrorPage";
import RoomPage from "./pages/dashboardPages/RoomPage";
import DashboardLayout from "./pages/DashboardLayout";
import RoomTable from "./components/RoomTable";

/** action function */
import { action as loginAction } from "./pages/authPages/LoginPage";
import { action as registerAction } from "./pages/authPages/RegisterPage";
import RoomUpcomingMeeting from "./components/RoomUpcomingMeeting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "room",
        element: <RoomPage />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "roomTable",
            element: <RoomTable />,
          },
          {
            path: "roomMeetings",
            element: <RoomUpcomingMeeting />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
