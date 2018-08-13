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
    if (username && this.props.currentRoom.id != null) {
      this.props.saveUser(username);
    }
  }

  onSubmit (e) {
    e.preventDefault();
    this.props.saveUser(this.usernameInput.value);
    localStorage.setItem('chat-username', this.usernameInput.value);

    if (!this.roomInput) return;
    this.props.addRoom(this.roomInput.value);
  }

  render () {
    return(
      <form onSubmit = {this.onSubmit.bind(this)}>
        <input ref={node => this.usernameInput = node} />
        {
          !this.props.rooms.length ?
            <input ref={node => this.roomInput = node} />
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
  saveUser: data => dispatch(actions.saveUser(data)),
  addRoom: name => dispatch(actions.addRoom(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
