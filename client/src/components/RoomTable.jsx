import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData, useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

import { Wrapper } from "../assets/Wrappers/RoomMeetingsWrapper";

/** Loader function to load previous rooms */
export const loader = async () => {
  try {
    const foundRooms = await axios.get("/api/rooms/getAllRooms");
    return foundRooms;
  } catch (err) {
    toast.error(err?.response?.data?.message);
    console.log(err);
    return err;
  }
};
function RoomTable() {
  const foundRooms = useLoaderData();
  const allRooms = foundRooms.data.allRooms;

  return (
    <Wrapper>
      {!allRooms ? (
        <div className='room-container'>
          <p>No recent call meetings</p>
        </div>
      ) : (
        allRooms.map((newRooms) => {
          return (
            <div key={newRooms._id} className='room-container'>
              <div>Room name: {newRooms.roomName}</div>
              <div>Date created: {newRooms.roomName}</div>
            </div>
          );
        })
      )}
    </Wrapper>
  );
}
export default RoomTable;
