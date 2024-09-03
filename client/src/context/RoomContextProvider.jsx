/** @RoomContext context component contains logic to connect to the web socket server */
/** This will be used to pass data to components that will need connection to the web socket server eg: RoomPage component */

/** @io client side library tha allows bidirectional comms between server and client */
/** Basically socket.io for client  */
import { io } from "socket.io-client";
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** @RoomSocketContext will be used to pass web socket connection to components that needs it. */
export const RoomSocketContext = createContext();

function RoomContextProvider({ children }) {
  const navigate = useNavigate();

  /** @WS stores the web socket url */
  /** @ws initialized web socket connection client side using the web socket url (server side) */
  /** This connection will be passed to components that needs it. */
  const WS = "http://localhost:3001";
  const ws = io(WS);

  /** @enterRoom function that accepts roomId emitted from the server whenever a room is created. */
  /** This runs in in the listener for the create-room emit upon component mount (useEffect) */
  /** Then navigates to a RoomPage with a specific room id based on the roomId received. */
  const enterRoom = ({ roomId }) => {
    console.log({ roomId });
    navigate(`/room/${roomId}`);
  };

  /** @useEffect runs on component mount and will listen to emit from server (room-created) then run the function enterRoom*/
  /** @useEffect should run whenever there are changes in the connection(ws) this is to allow creation/joining room if users back out of the page. */
  /** NOTE: backing out of RoomPage disconnects the connection */
  useEffect(() => {
    ws.on("room-created", enterRoom);
  }, [ws]);

  return (
    <RoomSocketContext.Provider value={{ ws }}>
      {children}
    </RoomSocketContext.Provider>
  );
}
export default RoomContextProvider;
