const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8989
});

/*
database = [{
  id: 0,
  name: 'name',
  users: [],
  messages: [{
    author: 'Kenny',
    message: 'Hi there'
  }]
}];
*/

const database = [];

const getDb = () => JSON.stringify({
  type: 'ROOMS_LIST',
  payload: database
});

const broadcastToWS = (data, ws) => {
  wss.clients.forEach(client => {
    if (ws && client === ws) return;
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const findRoomByUser = user => database.find(room => room.users.find(usr => usr === user));

const removeUserFromRooms = user => {
  let userIdx = -1;
  const userRoom = database.find(room => {
    const idx = room.users.findIndex(usr => usr === user);
    if (idx > -1) {
      userIdx = idx;
      return true;
    }
  });
  if (userRoom && userIdx > -1) {
    userRoom.users.splice(userIdx, 1);
  }
};

wss.on('connection', ws => {

  ws.send(getDb());

  ws.on('message', message => {
    let user = '';
    let currentRoom;
    let userIdx = -1;
    const data = JSON.parse(message);

    switch (data.type) {
      case 'LOGOUT_USER':
      user = data.payload;
      currentRoom = database.find(room => {
        const idx = room.users.findIndex(usr => usr === user);
        if (idx > -1) {
          userIdx = idx;
          return true;
        }
      });
      currentRoom.users.splice(userIdx, 1);
      broadcastToWS(JSON.stringify({
        type: 'ROOMS_LIST',
        payload: database
      }));
      ws.send(JSON.stringify({
        type: 'USER_SAVED',
        payload: ''
      }));
      break;

      case 'SAVE_USER':
      user = data.payload.username;
      if (data.payload.roomId) {
        currentRoom = database[data.payload.roomId];
      }
      else {
        currentRoom = database[0];
      }
      removeUserFromRooms(user);
      currentRoom.users.push(user);
      ws.send(JSON.stringify({
        type: 'USER_SAVED',
        payload: user
      }));
      broadcastToWS(JSON.stringify({
        type: 'ROOMS_LIST',
        payload: database
      }));
      break;

      case 'ADD_MESSAGE':
      currentRoom = database[data.payload.roomId];
      currentRoom.messages.push({
        author: data.payload.author,
        message: data.payload.message
      });
      broadcastToWS(getDb());
      break;

      case 'ADD_ROOM':
      database.push({
        name: data.payload,
        id: database.length,
        messages: [],
        users: []
      });
      broadcastToWS(getDb());
      break;

      default:
      break;
    }
  });
});
