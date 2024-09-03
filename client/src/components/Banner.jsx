import { Wrapper } from "../assets/Wrappers/BannerWrapper";
import { Button } from "@material-tailwind/react";

import { useContext, useState } from "react";

import { DashboardLayoutContext } from "../pages/DashboardLayout";
import { RoomSocketContext } from "../context/RoomContextProvider";

import Nav from "../components/Nav";

/** react icons */
import { IoClose } from "react-icons/io5";

function Banner() {
  /** @useContext destructured the values passed in the DashboardLayout component */
  const { inputData, handleChange, handleClick, userData } = useContext(
    DashboardLayoutContext
  );

  /** @ws web socket connection passed from the RoomSocketContext created in the RoomContextProvider component. */
  const { ws } = useContext(RoomSocketContext);
  // console.log(ws);

  /** @isHidden state for displaying the modal for the login in navbar */
  const [isHidden, setIsHidden] = useState(true);
  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  /** onClick function to connect to websocket server when user creates room */
  const createRoom = () => {
    ws.emit("create-room");
  };

  /** @Nav component css is found in BannerWrapper.js */

  return (
    <Wrapper>
      {userData?.response?.status !== 400 ? (
        <Nav
          userData={userData}
          handleHidden={handleHidden}
          isHidden={isHidden}
        />
      ) : (
        <Nav />
      )}

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
          <Button onClick={createRoom}>Create call</Button>
          <Button>Join call</Button>
        </div>
      </div>
    </Wrapper>
  );
}
export default Banner;
