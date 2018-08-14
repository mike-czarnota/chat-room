import { takeEvery } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';

export const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, action => {
    params.socket.send(JSON.stringify(action));
  });
};

export const handleNewUser = function* handleNewUser(params) {
  yield takeEvery(types.SAVE_USER, action => {
    const id = action.payload.roomId != null ? action.payload.roomId : 0;
    const oldId = action.payload.oldId;

    if (oldId != null) {
      params.roomsFirebase
      .where('id', '==', oldId)
      .get()
      .then(coll => {
        const roomRef = coll.docs[0].ref;
        const data = coll.docs[0].data();
        roomRef.update({
          users: data.users.splice(data.users.findIndex(usr => usr === action.payload.username), 1)
        });
      });
    }
    params.roomsFirebase
    .where('id', '==', id)
    .get()
    .then(coll => {
      const roomRef = coll.docs[0].ref;
      const data = coll.docs[0].data();
      roomRef.update({
        users: data.users.concat([action.payload.username])
      });
    });
  });
};

export const handleNewRoom = function* handleNewRoom(params) {
  yield takeEvery(types.ADD_ROOM, action => {
    const NEW_ROOM_TEMP = {
      id: null,
      name: null,
      users: [],
      messages: []
    };
    params.roomsFirebase.add(Object.assign({}, NEW_ROOM_TEMP, {
      id: action.payload.id,
      name: action.payload.name
    }));
  });
};

export const handleLogout = function* handleLogout(params) {
  yield takeEvery(types.LOGOUT_USER, action => {
    params.roomsFirebase
    .where('users', 'array-contains', action.payload)
    .get()
    .then(coll => {
      const doc = coll.docs[0];
      const data = doc.data();
      data.users.splice(data.users.findIndex(usr => usr === action.payload), 1);
      doc.ref.update({
        users: data.users
      });
    });
  });
};
