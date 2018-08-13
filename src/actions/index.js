import * as types from '../constants/ActionTypes';

export const addMessage = data => ({
  type: types.ADD_MESSAGE,
  message: data.message,
  author: data.author
});

export const saveUser = username => ({
  type: types.SAVE_USER,
  payload: username
});

export const logout = () => ({
  type: types.SAVE_USER,
  payload: ''
});

export const populateRoomsList = rooms => ({
  type: types.ROOMS_LIST,
  payload: rooms
});

export const selectCurrentRoom = room => ({
  type: types.SELECT_CURRENT_ROOM,
  payload: room
});

export const updateCurrentRoom = room => ({
  type: types.CURRENT_ROOM,
  payload: room
});

export const addRoom = name => ({
  type: types.ADD_ROOM,
  name
});
