import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import setupSocket from './sockets';
import * as sagas from './sagas';
import setupFirebase from './firebase/firebase';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const roomsFirebase = setupFirebase(store.dispatch);
// const socket = setupSocket(store.dispatch);

// sagaMiddleware.run(sagas.handleNewMessage, { roomsFirebase });
sagaMiddleware.run(sagas.handleNewRoom, { roomsFirebase });
sagaMiddleware.run(sagas.handleNewUser, { roomsFirebase });
sagaMiddleware.run(sagas.handleLogout, { roomsFirebase });

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
