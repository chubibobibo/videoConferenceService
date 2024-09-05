import { Wrapper } from "../assets/Wrappers/BannerWrapper";
import { Button } from "@material-tailwind/react";

import { useContext, useState } from "react";

import { DashboardLayoutContext } from "../pages/DashboardLayout";
import { RoomSocketContext } from "../context/RoomContextProvider";

import Nav from "../components/Nav";

/** react icons */
import { IoClose } from "react-icons/io5";
import { Form } from "react-router-dom";

function Banner() {
  /** @useContext destructured the values passed in the DashboardLayout component */
  const { userData } = useContext(DashboardLayoutContext);

  /** @ws web socket connection passed from the RoomSocketContext created in the RoomContextProvider component. */
  const { ws } = useContext(RoomSocketContext);
  // console.log(ws);

  /** @isHidden state for displaying the modal for the login in navbar */
  const [isHidden, setIsHidden] = useState(true);
  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  /** @roomData state that will contain the roomName to be used in the creation of a new instance of RoomModel */
  const [roomData, setRoomData] = useState({ roomName: "" });

  /** @handleRoomDataChange handles changes in the input form*/
  const handleRoomDataChange = (e) => {
    setRoomData((prevData) => {
      return { ...prevData, roomName: e.target.value };
    });
  };

  /**@handleClick empties the input field*/
  const handleClick = () => {
    setRoomData((prevData) => {
      return { ...prevData, roomName: "" };
    });
  };

  /** onClick function to connect to websocket server when user creates room */
  /** @roomData grabs the roomName property  from roomData and sends with the emit, this will be used as roomName when creating the room*/
  const createRoom = () => {
    ws.emit("create-room", roomData.roomName);
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
        <Form method='post'>
          <input
            type='text'
            className='room-input'
            onChange={handleRoomDataChange}
            value={roomData.roomName}
            name='roomName'
          />
          {/* {isEmpty && <IoClose className='icon' onClick={handleClick} />} */}
          <IoClose className='icon' onClick={handleClick} />
          <div className='button-container'>
            <Button onClick={createRoom}>Create call</Button>
            <Button>Join call</Button>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
}
export default Banner;
