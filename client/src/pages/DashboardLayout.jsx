import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";

import { createContext, useState } from "react";
import { Wrapper } from "../assets/Wrappers/DashboardLayoutWrapper";
import Footer from "../components/Footer";

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
        <Outlet />
        <Footer />
      </DashboardLayoutContext.Provider>
    </Wrapper>
  );
}
export default DashboardLayout;
