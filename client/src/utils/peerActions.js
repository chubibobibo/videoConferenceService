/** These will be used as cases in the case statement */
export const ADD_PEER_STREAM = "ADD_PEER_STREAM";
export const REMOVE_PEER_STREAM = "REMOVE_PEER_STREAM";

/** @addPeerAction action that we will call in the dispatch to specify which case (containing the logic to update the state) to use */
/** @peerId @stream parameters accepted to allow us to send as payload to the reducer function (which has a function that will need these arguments)*/
/** @addPeerAction @removePeerAction are going to be called in the dispatch in the RoomContextProvider so we can send the peerId and stream as payloads  */
export const addPeerAction = (peerId, stream) => ({
  type: ADD_PEER_STREAM,
  payload: (peerId, stream),
});

/** @removePeerAction action that we will call in the dispatch to specify which case (containing the logic to update the state) to use */
export const removePeerAction = (peerId) => ({
  type: REMOVE_PEER_STREAM,
  payload: peerId,
});
