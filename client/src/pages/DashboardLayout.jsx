import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
// import Nav from "../components/Nav";

import { createContext, useState, useContext } from "react";
import { Wrapper } from "../assets/Wrappers/DashboardLayoutWrapper";

import { useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";

import RoomSocketContext from "../context/RoomContextProvider";

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
    return null;
  }
};

function DashboardLayout() {
  /** @inputData stores the data for the close icon to appear */
  const [inputData, setInputData] = useState("");
  /** @handleChange sets state depending on the changes in the input field */
  const handleChange = (e) => {
    setInputData(e.target.value);
  };
  /**@handleClick empties the input field*/
  const handleClick = () => {
    setInputData("");
  };

  /** user data from the loader function */
  const data = useLoaderData();
  // console.log(data);

  /**@navToRecent function to navigate upon clicking the buttons */
  const navigate = useNavigate();
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
          inputData: inputData,
          setInputData: setInputData,
          handleChange: handleChange,
          handleClick: handleClick,
          userData: data,
        }}
      >
        {/* <Nav userData={data} /> */}
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
