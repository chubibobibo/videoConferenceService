import { useEffect } from "react";
/** allows to obtain params like the roomId */
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { RoomSocketContext } from "../../context/RoomContextProvider";

function RoomPage() {
  /** @id params from the emitted create-room in RoomcontextProvider*/
  const { id } = useParams();
  const { ws } = useContext(RoomSocketContext);

  useEffect(() => {
    ws.emit("join-room", { roomId: id });
  }, [id]);

  return <div>Room {id}</div>;
}
export default RoomPage;
