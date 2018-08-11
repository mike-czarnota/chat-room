import React, { Component } from 'react';
import './App.sass';
import { Sidebar } from './containers/Sidebar';
import { MessagesList } from './containers/MessagesList';
import { AddMessage } from './containers/AddMessage';

class App extends Component {
  render() {
    return (
      <section id="container">
        <Sidebar />
        <main>
          <MessagesList />
          <AddMessage />
        </main>
      </section>
    );
  }
}

export default App;
