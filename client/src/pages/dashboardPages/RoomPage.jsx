import { io } from "socket.io-client";
import { useEffect } from "react";

function RoomPage() {
  /** @WS stores the web socket url */
  const WS = "http://localhost:3001";

  /** Initialize a websocket connection upon mounting of component */
  useEffect(() => {
    io(WS);
  }, []);
  return <div>RoomPage</div>;
}
export default RoomPage;
