import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";

import { createContext, useState } from "react";
import { Wrapper } from "../assets/Wrappers/DashboardLayoutWrapper";
import Footer from "../components/Footer";

import { Link, useNavigate } from "react-router-dom";

/** @DashboardLayoutContext used to pass data to any component it is wrapped on */
export const DashboardLayoutContext = createContext();

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

  const navigate = useNavigate();
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
          inputData: inputData,
          setInputData: setInputData,
          handleChange: handleChange,
          handleClick: handleClick,
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
