import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends Component {
  constructor () {
    super();
    this.usernameInput = null;
    this.roomInput = null;
  }

  componentDidMount () {
    this.usernameInput && this.usernameInput.focus();
  }

  componentDidUpdate () {
    const username = localStorage.getItem('chat-username');
    if (username && this.props.currentRoom === -1 && this.props.rooms.length) {
      this.props.saveUser(username);
    }
    if (this.props.rooms.length && this.props.currentRoom === -1) {
      this.props.selectCurrentRoom(0);
    }
  }

  onSubmit (e) {
    e.preventDefault();
    if (this.roomInput) {
      this.props.addRoom({
        name: this.roomInput.value,
        id: 0
      });
    }

    this.props.saveUser(this.usernameInput.value);
    localStorage.setItem('chat-username', this.usernameInput.value);
  }

  render () {
    return(
      <form onSubmit = {this.onSubmit.bind(this)}>
        <div>
          <label htmlFor="username">Set your username</label>
          <input id="username" ref={node => this.usernameInput = node} required />
        </div>
        {
          !this.props.rooms.length ?
            <div>
              <label htmlFor="roomName">Add the first room</label>
              <input id="roomName" ref={node => this.roomInput = node} required />
            </div>
            : void 8
        }
        <button type="submit">Join!</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.currentRoom,
  rooms: state.rooms
});

const mapDispatchToProps = dispatch => ({
  saveUser: username => dispatch(actions.saveUser({ username })),
  addRoom: data => dispatch(actions.addRoom(data)),
  selectCurrentRoom: room => dispatch(actions.selectCurrentRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
