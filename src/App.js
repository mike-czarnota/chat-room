import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.sass';
import RoomsSidebar from './components/RoomsSidebar';
import UsersSidebar from './components/UsersSidebar';
import MessagesList from './components/MessagesList';
import AddMessage from './components/AddMessage';
import Login from './components/Login';
import * as actions from './actions';

class App extends Component {
  componentDidUpdate () {
    if (this.props.rooms.length && this.props.currentRoom.id == null) {
      this.props.selectCurrentRoom(this.props.rooms[0]);
    }
  }

  render () {
    return (
      <div>
        {!this.props.user ?
          <Login /> :
          <section id="container">
            <RoomsSidebar />
            <UsersSidebar />
            <main>
              <MessagesList />
              <AddMessage />
            </main>
          </section>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.currentRoom,
  messages: state.messages,
  rooms: state.rooms,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  selectCurrentRoom: room => dispatch(actions.selectCurrentRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
