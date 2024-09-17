import { useEffect, useState } from "react";
/** allows to obtain params like the roomId */
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { RoomSocketContext } from "../../context/RoomContextProvider";
import axios from "axios";
import VideoPlayer from "../../components/VideoPlayer";

function RoomPage() {
  /** @id params from the emitted create-room in RoomcontextProvider*/
  /** @me peerId object using the logged user id converted by PeerJs */
  /** @userId state from RoomSocketContext that contains user data form calling loggedUser API */
  /** @peers object that contains peerId and stream data from RoomContextProvider */
  const { id } = useParams();
  const { ws, me, userId, stream, peers } = useContext(RoomSocketContext);
  console.log(me);

  /** @roomName state to handle room name */
  const [roomName, setRoomName] = useState({});

  /** @getRoom function to call the api to  obtain the roomData using the id in the params */
  /** NOTE: don't forget to run the function at the end of the useEffect */
  /** @roomName an object returned from fetching the API that contains data about the room */
  /** @username from userId object that is a context from RoomContextProvider that contains logged user's name and id */
  /** @getRoom response from the getRoom API to display room details */
  useEffect(() => {
    const getRoom = async () => {
      const roomNameRes = await axios.get(`/api/rooms/getRoomName/${id}`);
      setRoomName(roomNameRes);
    };

    ws.emit("join-room", {
      peerId: me?._id,
      roomId: id,
      username: userId?.username,
    });

    getRoom();
  }, [me, ws]);

  return (
    <div>
      Room {id} - {roomName?.data?.foundRoomName?.roomName}
      <p>{userId?.username}</p>
      <p>peerId: {me?._id}</p>
      <VideoPlayer stream={stream} />
      {Object.values(peers).map((newPeers) => {
        return (
          <div key={newPeers.id}>
            <VideoPlayer stream={newPeers.stream} />
          </div>
        );
      })}
    </div>
  );
}
export default RoomPage;
