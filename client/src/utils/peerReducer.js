/** action  that contains the case that we will be using*/
import { ADD_PEER_STREAM, REMOVE_PEER_STREAM } from "./peerActions.js";

/** @peerReducer function to update the state peers*/
/** @action contains the logic to update the state when called. */
/** @action.payload.peerId = accesses the peerId sent as payload when the dispatch is called*/
/** @return returns all previous state and a peerId sent when dispatch is called with the value of the stream as payloads. This will be executed whenever this case is run */

export const peerReducer = (state, action) => {
  switch (action.type) {
    case ADD_PEER_STREAM:
      return {
        ...state,
        [action.payload.peerId]: { stream: action.payload.stream },
      };
    case REMOVE_PEER_STREAM:
      const { [action.payload.peerId]: deleted, ...rest } = state;
      if (deleted?.stream) {
        // Stop all the tracks in the stream to properly close it
        deleted.stream.getTracks().forEach((track) => track.stop());
      }
      return rest;
    default:
      return { ...state };
  }
};
