import { useEffect, useState } from "react";
/** allows to obtain params like the roomId */
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RoomSocketContext } from "../../context/RoomContextProvider";
import axios from "axios";
import VideoPlayer from "../../components/VideoPlayer";

import { Wrapper } from "../../assets/Wrappers/RoomPageWrapper";
import { Button } from "@material-tailwind/react";

export const loader = async () => {
  try {
    const foundLoggedUser = await axios.get("/api/users/loggedUser");
    return foundLoggedUser;
  } catch (err) {
    console.log(err);
    return err;
  }
};

function RoomPage() {
  const navigate = useNavigate();
  const data = useLoaderData();
  console.log(data.data.user.username);

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
    if (me) {
      ws.emit("join-room", {
        peerId: me?._id,
        roomId: id,
        username: userId?.username,
      });
    }
    getRoom();
  }, [id, me, ws]);

  /** @stopeMEdiaStreams function to stop media stream */
  const stopMediaStreams = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleClick = () => {
    stopMediaStreams();
    ws.disconnect();
    navigate("/dashboard/roomTable");
  };

  return (
    <Wrapper>
      <h1 className='header'>
        {" "}
        Room Name - {roomName?.data?.foundRoomName?.roomName}
      </h1>
      <div className='video-container1'>
        <p>{userId?.username}</p>
        <p>peerId: {me?._id}</p>
        <VideoPlayer stream={stream} className='videoStream' />
      </div>
      <div>
        {Object.values(peers).map((newPeers) => {
          console.log(newPeers);
          return (
            <div
              key={newPeers.stream.id}
              className={newPeers.stream && "video-container2"}
            >
              <p>{data?.data?.user?.username}</p>
              <p>peerId: {newPeers.stream.id}</p>
              <VideoPlayer stream={newPeers.stream} className='videoStream' />
            </div>
          );
        })}
      </div>
      <div className='controls-container'>
        <Button size='lg' color='red' onClick={handleClick}>
          End call
        </Button>
      </div>
    </Wrapper>
  );
}
export default RoomPage;
