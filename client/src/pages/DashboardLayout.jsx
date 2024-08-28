import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";

import { createContext, useState } from "react";

/** @DashboardLayoutContext used to pass data to any component it is wrapped on */
export const DashboardLayoutContext = createContext();

function DashboardLayout() {
  /** @isEmpty stores the data for the close icon to appear */
  const [inputData, setInputData] = useState("");
  // const handleChange = (e) => {
  //   setInputData((oldData) => {
  //     return { ...oldData, [e.target.name]: e.target.value };
  //   });
  // };
  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleClick = () => {
    setInputData("");
  };
  return (
    <>
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
      </DashboardLayoutContext.Provider>
    </>
  );
}
export default DashboardLayout;
