import { takeEvery } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';

export const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, action => {
    params.socket.send(JSON.stringify(action));
  });
};

export const handleNewUser = function* handleNewUser(params) {
  yield takeEvery(types.SAVE_USER, action => {
    params.socket.send(JSON.stringify(action));
  });
};

export const handleNewRoom = function* handleNewRoom(params) {
  yield takeEvery(types.ADD_ROOM, action => {
    params.socket.send(JSON.stringify(action));
  });
};

export const handleLogout = function* handleNewRoom(params) {
  yield takeEvery(types.LOGOUT_USER, action => {
    params.socket.send(JSON.stringify(action));
  });
};
