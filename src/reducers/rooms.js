import * as types from '../constants/ActionTypes';

const rooms = (state = [], action) => {
  switch (action.type) {
    case types.ADD_ROOM:
    return state;

    case types.ROOMS_LIST:
    return action.payload;

    default:
    return state;
  }
};

export default rooms;
