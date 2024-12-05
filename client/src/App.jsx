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
import RoomUpcomingMeeting from "./components/RoomUpcomingMeeting";

/** action function */
import { action as loginAction } from "./pages/authPages/LoginPage";
import { action as registerAction } from "./pages/authPages/RegisterPage";
import { loader as loggedUserDataLoader } from "./pages/DashboardLayout";
import { loader as getAllRoomsLoader } from "./components/RoomTable";
import { loader as isLoggedLoader } from "./pages/dashboardPages/RoomPage";

/** Context imports */
import RoomContext from "./context/RoomContextProvider";

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
      /** Wraps RoomPage with the context to pass web socket connection */
      {
        path: "room/:id",
        element: (
          <RoomContext>
            <RoomPage />
          </RoomContext>
        ),
        loader: isLoggedLoader,
      },
      /** Wraps RoomPage with the context to pass web socket connection */
      {
        path: "dashboard",
        element: (
          <RoomContext>
            <DashboardLayout />
          </RoomContext>
        ),
        loader: loggedUserDataLoader,
        children: [
          {
            path: "roomTable",
            element: (
              <RoomContext>
                <RoomTable />
              </RoomContext>
            ),
            loader: getAllRoomsLoader,
          },
          {
            path: "roomMeetings",
            element: (
              <RoomContext>
                <RoomUpcomingMeeting />
              </RoomContext>
            ),
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
