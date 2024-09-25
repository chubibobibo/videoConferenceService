import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

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
  /** @date modified date for readability */
  const foundRooms = useLoaderData();
  const allRooms = foundRooms.data.allRooms;
  // console.log(...allRooms);
  const createdDate = { ...allRooms };

  return (
    <Wrapper>
      {!allRooms ? (
        <div className='room-container'>
          <p>No recent call meetings</p>
        </div>
      ) : (
        allRooms.map((newRooms) => {
          const createdDate = newRooms.createdAt;
          const date = day(createdDate).format("MMM D, YYYY");
          return (
            <div key={newRooms._id} className='room-container'>
              <div>Room name: {newRooms.roomName}</div>
              <div>Date created: {date}</div>
            </div>
          );
        })
      )}
    </Wrapper>
  );
}
export default RoomTable;
