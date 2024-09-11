import { useEffect, useState } from "react";
/** allows to obtain params like the roomId */
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { RoomSocketContext } from "../../context/RoomContextProvider";
import axios from "axios";

function RoomPage() {
  /** @id params from the emitted create-room in RoomcontextProvider*/
  const { id } = useParams();
  const { ws } = useContext(RoomSocketContext);

  /** state to handle room name */
  const [roomName, setRoomName] = useState({});

  /** @getRoom function to call the api to  obtain the roomData using the id in the params */
  /** NOTE: don't forget to run the function at the end of the useEffect */
  /** @roomName an object returned from fetching the API that contains data about the room */
  useEffect(() => {
    ws.emit("join-room", { roomId: id });
    const getRoom = async () => {
      const roomName = await axios.get(`/api/rooms/getRoomName/${id}`);
      console.log(roomName);
      setRoomName(roomName);
    };
    getRoom();
  }, [id]);

  return (
    <div>
      Room {id} - {roomName?.data?.foundRoomName?.roomName}
    </div>
  );
}
export default RoomPage;
