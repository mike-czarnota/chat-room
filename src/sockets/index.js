import * as types from '../constants/ActionTypes';
import * as actions from '../actions';

const setupSocket = dispatch => {
  const socket = new WebSocket('ws://localhost:8989');

  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case types.ROOMS_LIST:
      dispatch(actions.populateRoomsList(data.rooms));
      break;

      case types.CURRENT_ROOM:
      dispatch(actions.updateCurrentRoom(data.payload));
      break;

      default:
      break;
    }
  };

  return socket;
};

export default setupSocket;
