import firebase from 'firebase';
import config from './config';
import * as types from '../constants/ActionTypes';
import * as actions from '../actions';



// rooms.add({
//   id: 0,
//   name: 'General',
//   users: [],
//   messages: []
// })
// .then(doc => {
// });
/*
let instance = null;

class Firebase {
  constructor (dispatch) {
    instance === null ? instance = this : instance;
    this.dispatch = dispatch;
    return instance;
  }

  init () {
    firebase.initializeApp(config);
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });

    const rooms = db.collection('rooms');

    rooms.onSnapshot(doc => {
      const rooms = doc.docs.map(doc => doc.data());
      this.dispatch(actions.populateRoomsList(rooms));
    });
  }
}
export default Firebase;*/

const setupFirebase = dispatch => {
  firebase.initializeApp(config);
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const rooms = db.collection('rooms');

  rooms.onSnapshot(doc => {
    const rooms = doc.docs.map(doc => doc.data());
    dispatch(actions.populateRoomsList(rooms));
    // dispatch(actions.userSaved());
  });

  rooms.onSnapshot({ includeMetadataChanges: true }, doc => {
    console.log(doc);
    // const rooms = doc.docs.map(doc => doc.data());
    // dispatch(actions.userSaved());
  });

  return rooms;
  /*const socket = new WebSocket('ws://localhost:8989');

  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case types.ROOMS_LIST:
      dispatch(actions.populateRoomsList(data.payload));
      break;

      case types.USER_SAVED:
      dispatch(actions.userSaved(data.payload));
      break;

      default:
      break;
    }
  };

  return socket;*/
};

export default setupFirebase;

