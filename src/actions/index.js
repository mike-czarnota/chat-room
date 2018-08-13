import * as types from '../constants/ActionTypes';

export const addMessage = data => ({
  type: types.ADD_MESSAGE,
  payload: data
});

export const saveUser = data => ({
  type: types.SAVE_USER,
  payload: data
});

export const logout = username => ({
  type: types.LOGOUT_USER,
  payload: username
});

export const userSaved = username => ({
  type: types.USER_SAVED,
  payload: username
});

export const populateRoomsList = rooms => ({
  type: types.ROOMS_LIST,
  payload: rooms
});

export const selectCurrentRoom = roomId => ({
  type: types.SELECT_CURRENT_ROOM,
  payload: roomId
});

export const updateCurrentRoom = room => ({
  type: types.CURRENT_ROOM,
  payload: room
});

export const addRoom = roomName => ({
  type: types.ADD_ROOM,
  payload: roomName
});
