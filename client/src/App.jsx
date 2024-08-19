import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** Pages imports */
import HomeLayout from "./pages/HomeLayout";
import LoginPage from "./pages/authPages/LoginPage";
import RegisterPage from "./pages/authPages/RegisterPage";
import IndexPage from "./pages/authPages/IndexPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
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
