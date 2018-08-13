import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UsersSidebar extends Component {
  logout () {
    localStorage.setItem('chat-username', '');
    this.props.logout(this.props.user);
  }

  getUsers () {
    return this.props.rooms[this.props.currentRoom].users;
  }

  render () {
    const users = this.getUsers();
    return (
      <aside id="userssidebar">
        <h4>Users</h4>
        <p>You are logged in as <i>{this.props.user}</i></p>
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
  rooms: state.rooms,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logout: user => dispatch(actions.logout(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersSidebar);
