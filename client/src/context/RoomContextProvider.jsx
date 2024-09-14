/** @RoomContext context component contains logic to connect to the web socket server */
/** This will be used to pass data to components that will need connection to the web socket server eg: RoomPage component */

/** @io client side library tha allows bidirectional comms between server and client */
/** Basically socket.io for client  */
import { io } from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Peer } from "peerjs";
import axios from "axios";
import { toast } from "react-toastify";

/** @RoomSocketContext will be used to pass web socket connection to components that needs it. */
export const RoomSocketContext = createContext();

function RoomContextProvider({ children }) {
  const navigate = useNavigate();

  /** @WS stores the web socket url */
  /** @ws initialized web socket connection client side using the web socket url (server side) */
  /** This connection will be passed to components that needs it. */
  const WS = "http://localhost:3001";
  const ws = io(WS);

  /** @me state that will handle the id of the user by creating a peer id using PeerJs and the userId (response from loggedUser API)*/
  /** @userId state that will handle the id of the logged user that will be used to create a new peerId */
  const [me, setMe] = useState();
  const [userId, setUserId] = useState({ username: "", userid: "" });

  /** @enterRoom function that accepts roomId emitted from the server whenever a room is created. */
  /** This runs in in the listener for the create-room emit upon component mount (useEffect) */
  /** Then navigates to a RoomPage with a specific room id based on the roomId received. */
  /** @getUser async function to call the API for loggedUser.*/
  /** @newUserId id created using uuidv4 that will be used to generate a new peerID (PeerJs) */
  const enterRoom = ({ roomId }) => {
    const getUser = async () => {
      await axios
        .get("/api/users/loggedUser")
        .then((res) => {
          // console.log(res);
          const userDataName = res?.data?.user?.username;
          const userDataId = res?.data?.user?._id;
          const newUserId = uuidv4();
          const peerId = new Peer(newUserId);
          setMe(peerId);
          setUserId((prev) => {
            return { ...prev, username: userDataName, userid: userDataId };
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message);
        });
    };
    getUser();
    navigate(`/room/${roomId}`);
  };

  /** @useEffect runs on component mount and will listen to emit from server (room-created) then run the function enterRoom*/
  /** @useEffect should run whenever there are changes in the connection(ws) this is to allow creation/joining room if users back out of the page. */
  /** NOTE: backing out of RoomPage disconnects the connection */
  useEffect(() => {
    ws.on("room-created", enterRoom);
    ws.on("get-users", (participants) => {
      console.log(participants);
    });
  }, []);

  // console.log(me);
  /** @ws connection to the web socket server passed as context value */
  /** @me peerId object that contains the loggedUser passed as context value. */
  console.log(me);
  return (
    <RoomSocketContext.Provider value={{ ws, me, userId }}>
      {children}
    </RoomSocketContext.Provider>
  );
}
export default RoomContextProvider;
