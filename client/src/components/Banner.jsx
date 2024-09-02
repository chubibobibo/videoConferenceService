import { Wrapper } from "../assets/Wrappers/BannerWrapper";
import { Button } from "@material-tailwind/react";

import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayoutContext } from "../pages/DashboardLayout";
import Nav from "../components/Nav";

// /** API to fetch logged user used in react query */
import { loggedUser } from "../api/fetchLoggedUser.js";

/** react icons */
import { IoClose } from "react-icons/io5";

/** @useContext destructured the values passed in the DashboardLayout component */
function Banner() {
  const { inputData, handleChange, handleClick } = useContext(
    DashboardLayoutContext
  );

  const { data, error } = useQuery({
    queryKey: ["user"],
    queryFn: loggedUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  /** check for error in react query */
  if (error) {
    console.log(error);
  }

  /** @Nav component css is found in BannerWrapper.js */

  return (
    <Wrapper>
      <Nav loggedUser={data} />
      <div className='image-container'>
        <img src='../src/assets/ConvoFlow.png' alt='' />
      </div>
      <h1>ConvoFlow</h1>
      <p>An accessible and secure video conference solution</p>
      <div className='roomInput-container'>
        <input
          type='text'
          className='room-input'
          onChange={handleChange}
          value={inputData}
          name='roomName'
        />
        {/* {isEmpty && <IoClose className='icon' onClick={handleClick} />} */}
        <IoClose className='icon' onClick={handleClick} />
        <div className='button-container'>
          <Button>Create call</Button>
          <Button>Join call</Button>
        </div>
      </div>
    </Wrapper>
  );
}
export default Banner;
