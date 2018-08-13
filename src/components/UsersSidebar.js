import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const getUsers = room => {
  return room && room.users;
};

class UsersSidebar extends Component {
  logout () {
    this.props.logout();
    localStorage.setItem('chat-username', '');
  }

  render () {
    const users = getUsers(this.props.currentRoom);
    return (
      <aside id="userssidebar">
        <h4>Users</h4>
        <button onClick={this.logout.bind(this)}>Logout</button>
        <ul>
          {users && users.map((user, idx) => (
            <li key={idx}>{user}</li>
          ))}
        </ul>
      </aside>
      );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.currentRoom,
  rooms: state.rooms
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersSidebar);
