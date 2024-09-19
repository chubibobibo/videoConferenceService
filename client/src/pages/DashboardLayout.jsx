import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
// import Nav from "../components/Nav";

import { createContext } from "react";
import { Wrapper } from "../assets/Wrappers/DashboardLayoutWrapper";

import { useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";

// import { useEffect } from "react";

// import { useContext } from "react";
// import { RoomSocketContext } from "../context/RoomContextProvider";

/** @DashboardLayoutContext used to pass data to any component it is wrapped on */
export const DashboardLayoutContext = createContext();

/** Loader function to fetch logged userData from API */
export const loader = async () => {
  try {
    const loggedUserData = await axios.get("/api/users/loggedUser");
    if (!loggedUserData) {
      return "Something went wrong";
    } else {
      return loggedUserData;
    }
  } catch (err) {
    return err;
  }
};

function DashboardLayout() {
  // const { ws } = useContext(RoomSocketContext);
  const navigate = useNavigate();

  /** user data from the loader function */
  const data = useLoaderData();
  // console.log(data);

  /**@navToRecent function to navigate upon clicking the buttons */

  const navToRecent = () => {
    navigate("/dashboard/roomTable");
  };
  const navToUpcoming = () => {
    navigate("/dashboard/roomMeetings");
  };
  return (
    <Wrapper>
      <DashboardLayoutContext.Provider
        value={{
          userData: data,
        }}
      >
        <Banner />

        <div className='table-container'>
          <div className='table-header'>
            <button className='upcoming-btn' onClick={navToUpcoming}>
              Upcoming meetings
            </button>
            <button className='recent-btn' onClick={navToRecent}>
              Recent room meetings
            </button>
          </div>
          <div className='table-body'>
            <Outlet />
          </div>
        </div>
        <Footer />
      </DashboardLayoutContext.Provider>
    </Wrapper>
  );
}
export default DashboardLayout;
