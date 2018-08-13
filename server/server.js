const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8989
});

const database = [
{
  id: 0,
  name: 'general',
  users: ['John', 'Mack'],
  messages: [
  {
    author: 'John',
    message: 'Hi'
  },
  {
    author: 'Mack',
    message: 'Hi there'
  }
  ]
},
{
  id: 1,
  name: 'random',
  users: ['Johny', 'Mack', 'Kate'],
  messages: [
  {
    author: 'Johny',
    message: 'Hi there'
  },
  {
    author: 'Mack',
    message: 'Hi'
  }
  ]
}
];

const getDb = () => JSON.stringify({
  type: 'ROOMS_LIST',
  rooms: database
});

const broadcastToWS = data => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const findRoomByUser = user => database.find(room => room.users.find(usr => usr === user));

wss.on('connection', ws => {
  let user = '';

  ws.send(getDb());

  ws.on('message', message => {
    const data = JSON.parse(message);
    let currentRoom;
    switch (data.type) {
      case 'SAVE_USER':
      newUser = data.payload;
      if (newUser) {
        currentRoom = database[0];
        currentRoom.users.push(newUser);
        user = newUser;
      }
      else {
        currentRoom = findRoomByUser(user);
        currentRoom.users.splice(currentRoom.users.findIndex(usr => usr === user), 1);
      }
      ws.send(JSON.stringify({
        type: 'CURRENT_ROOM',
        payload: currentRoom
      }));
      broadcastToWS(getDb(), ws);
      break;

      case 'ADD_MESSAGE':
      currentRoom = findRoomByUser(data.author);
      currentRoom.messages.push({
        author: data.author,
        message: data.message
      });
      broadcastToWS(JSON.stringify({
        type: 'CURRENT_ROOM',
        payload: currentRoom
      }));
      break;

      case 'ADD_ROOM':
      database.push({
        name: data.name,
        id: database.length,
        users: []
      });
      broadcastToWS(getDb());
      break;

      default:
      break;
    }
  });

  ws.on('close', () => {
    const currentRoom = findRoomByUser(user);
    currentRoom.users.splice(currentRoom.users.findIndex(usr => usr === user), 1);
    broadcastToWS(JSON.stringify({
      type: 'CURRENT_ROOM',
      payload: currentRoom
    }));
  });
});
