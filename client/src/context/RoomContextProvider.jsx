/** @RoomContext context component contains logic to connect to the web socket server */
/** This will be used to pass data to components that will need connection to the web socket server eg: RoomPage component */

/** @io client side library tha allows bidirectional comms between server and client */
/** Basically socket.io for client  */
import { io } from "socket.io-client";
import { createContext, useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import axios from "axios";

import { Peer } from "peerjs";
import { addPeerAction, removePeerAction } from "../utils/peerActions";
import { peerReducer } from "../utils/peerReducer";

/** @RoomSocketContext will be used to pass web socket connection to components that needs it. */
export const RoomSocketContext = createContext();

/** @WS stores the web socket url */
/** @ws initialized web socket connection client side using the web socket url (server side) */
/** This connection will be passed to components that needs it. */
const WS = "http://localhost:3001";
const ws = io(WS);

function RoomContextProvider({ children }) {
  const navigate = useNavigate();

  /** @useReducer hook to update a complext set of state */
  /** @peers state that will update or change the state of peers this will passed as context to make it available to all components*/
  /** @peerReducer function that will contain the actions   */
  const [peers, dispatch] = useReducer(peerReducer, {});

  /** @me state that will handle the id of the user by creating a peer id using PeerJs and the userId (response from loggedUser API)*/
  /** @userId state that will handle the id of the logged user that will be used to create a new peerId */
  /** @stream state that stores the media (video). Data will be obtained using getUserMedia */
  const [me, setMe] = useState();
  const [userId, setUserId] = useState({ username: "", userid: "" });
  const [stream, setStream] = useState();

  /** @enterRoom function that accepts roomId emitted from the server whenever a room is created. */
  /** This runs in in the listener for the create-room emit upon component mount (useEffect) */
  /** Then navigates to a RoomPage with a specific room id based on the roomId received. */
  /** @getUser async function to call the API for loggedUser.*/
  /** @newUserId id created using uuidv4 that will be used to generate a new peerID (PeerJs) */
  const enterRoom = ({ roomId }) => {
    console.log("enter room runs");
    navigate(`/room/${roomId}`);
  };

  const peerJoinRoom = async ({ foundRoom }) => {
    console.log(foundRoom);
    navigate(`/room/${foundRoom.roomId}`);
  };

  /** @removePeer function that will be called to remove a peer from the state */
  const removePeer = (peerId) => {
    dispatch(removePeerAction(peerId));
  };

  /** @useEffect runs on component mount and will listen to emit from server (room-created) then run the function enterRoom*/
  /** @useEffect should run whenever there are changes in the connection(ws) this is to allow creation/joining room if users back out of the page. */
  /** NOTE: backing out of RoomPage disconnects the connection */
  /** @getUserMedia obtains the video and audio from devices in a variable (stream) and use it as value of the stream state */
  /** @removePeer function that uses dispatch to remove a certain peer using a peerId from the state */
  useEffect(() => {
    const getUser = async () => {
      await axios
        .get("/api/users/loggedUser")
        .then((res) => {
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

    /** @getMedia obtains the video stream of a user using GUM then store it in state. */
    // const getMedia = async () => {
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          setStream(stream);
        });
    } catch (err) {
      console.log(err);
    }
    getUser();
    ws.on("room created", enterRoom);

    ws.on("get-users", (participants) => {
      console.log(participants);
    });
    ws.on("peer-joined-room", peerJoinRoom);
    ws.on("user-disconnected", removePeer);

    // return () => {
    //   ws.off("room created");
    //   ws.off("get-users");
    //   ws.off("peer-joined-room");
    //   ws.off("user-disconnected");
    // };
  }, []);

  console.log(stream);

  /** Another useEffect to with a dependency of @stream from GUM */
  /** Check for the current user (me) and it's stream */
  /** @userJoined listener listens for the emit coming from roomHandler when a user joins a room */
  /** @call function that initiates a call to the new user and sends the current media stream of the current user to the new user */
  useEffect(() => {
    if (!me) return;
    if (!stream) return;
    /** listener for "user-joined" emit coming from the roomHandler when a user joins */
    /** @userJoined emit will implement .call method in the current user @me that will call the new user @peerId and it's @stream */
    /** @callOn handles incoming media stream from new user by listening to the @stream event which is triggered when a new user joins and transmits it's media. */
    /** @dispatch stores the stream of the new joined user */
    /** me.call calls the peerId and it's stream */
    ws.on("user-joined", ({ peerId }) => {
      const call = me.call(peerId, stream);
      call.on("stream", (remoteStream) => {
        dispatch(addPeerAction(peerId, remoteStream));
      });
    });

    /** @me listens to incoming call emits from other users, if call is received @me answers with stream */
    /** @callOn receives the remote peer media stream after the call is received/answer then listens for the "stream" event, then executes the dispatch to store the new peers media stream */
    /** call.peer holds the unique id of the remote peer (other participant in the connection) */
    // me.on("call", (call) => {

    // const handleCall = (call) => {
    //   call.answer(stream);
    //   call.on("stream", (remoteStream) => {
    //     console.log(call.peer);
    //     if (!stream[call.peer]) {
    //       dispatch(addPeerAction(call.peer, remoteStream));
    //     }
    //   });
    // };

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (remoteStream) => {
        console.log(call.peer);
        // dispatch(addPeerAction(call.peer, remoteStream));
        if (!stream[call.peer]) {
          dispatch(addPeerAction(call.peer, remoteStream));
        }
      });
    });
    // me.on("call", handleCall);
    // return () => {
    //   me.off("call", handleCall);
    // };
    return () => {
      ws.off("user-joined");
    };
  }, [me, stream]);

  // console.log(me);
  /** @ws connection to the web socket server passed as context value */
  /** @me peerId object that contains the loggedUser passed as context value. */
  // console.log(me);
  return (
    <RoomSocketContext.Provider value={{ ws, me, userId, stream, peers }}>
      {children}
    </RoomSocketContext.Provider>
  );
}
export default RoomContextProvider;
