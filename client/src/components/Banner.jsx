import { Wrapper } from "../assets/Wrappers/BannerWrapper";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";

import { useContext } from "react";
import { DashboardLayoutContext } from "../pages/DashboardLayout";

/** react icons */
import { IoClose } from "react-icons/io5";

function Banner() {
  const { inputData, handleChange, handleClick } = useContext(
    DashboardLayoutContext
  );
  // console.log(isEmpty);

  return (
    <Wrapper>
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
          <Button size='lg'>Create call</Button>
          <Button>Join call</Button>
        </div>
      </div>
    </Wrapper>
  );
}
export default Banner;
