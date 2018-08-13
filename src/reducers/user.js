import * as types from '../constants/ActionTypes';

const users = (state = '', action) => {
  switch (action.type) {
    case types.SAVE_USER:
    return action.payload;

    default:
    return state;
  }
};

export default users;
