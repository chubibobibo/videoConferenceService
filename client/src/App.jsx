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

/** action function */
import { action as loginAction } from "./pages/authPages/LoginPage";
import { action as registerAction } from "./pages/authPages/RegisterPage";

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
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "room",
            element: <RoomPage />,
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
