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
  constructor (props) {
    super(props);

    this.handleUnload = this.handleUnload.bind(this);
  }

  componentDidMount () {
    window.addEventListener('beforeunload', this.handleUnload);
  }

  componentwillUnmount () {
    window.addEventListener('beforeunload', this.handleUnload);
  }

  handleUnload () {
    this.props.user && this.props.logout(this.props.user);
  }

  render () {
    return (
      <div>
        {this.props.user && this.props.currentRoom > -1 ?
          <section id="container">
            <RoomsSidebar />
            <UsersSidebar />
            <main>
              <MessagesList />
              <AddMessage />
            </main>
          </section>
          :
          <Login />
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
  logout: user => dispatch(actions.logout(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
