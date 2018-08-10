import React, { Component } from 'react';
import './App.sass';
import Sidebar from './components/Sidebar';
import MessagesList from './components/MessagesList';
import NewMessage from './components/NewMessage';

class App extends Component {
  render() {
    return (
      <section id="container">
        <Sidebar />
        <main>
          <MessagesList />
          <NewMessage />
        </main>
      </section>
    );
  }
}

export default App;
