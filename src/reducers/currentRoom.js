import * as types from '../constants/ActionTypes';

const currentRoom = (state = -1, action) => {
  switch (action.type) {
    case types.SELECT_CURRENT_ROOM:
    // case types.CURRENT_ROOM:
    return action.payload;

    default:
    return state;
  }
};

export default currentRoom;
