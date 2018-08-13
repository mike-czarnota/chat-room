import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";

class RoomsSidebar extends Component {
  constructor (props) {
    super(props);
    this.newRoomInput = null;
    this.currentRoomName = '';

    this.setCurrentRoomName();
  }

  componentDidUpdate () {
    this.setCurrentRoomName();
  }

  setCurrentRoomName () {
    if (this.props.rooms.length && this.props.currentRoom !== -1) {
      this.currentRoomName = this.props.rooms[this.props.currentRoom].name;
    }
  }

  onSubmit (e) {
    e.preventDefault();
    this.props.addRoom(this.newRoomInput.value);
    this.newRoomInput.value = '';
  }

  chooseRoom (roomId) {
    this.props.selectCurrentRoom(roomId);
    this.props.saveUser({
      username: this.props.user,
      roomId
    });
  }

  render () {
    return (
      <aside id="roomssidebar">
        <h4>Rooms</h4>
        {this.currentRoomName && <p>Chosen room: <i>{this.currentRoomName}</i></p>}
        <ul>
          {this.props.rooms && this.props.rooms.map(room => {
            const disabled = room.id === this.props.currentRoom;
            return (
              <li key={room.id}>
                <button onClick={this.chooseRoom.bind(this, room.id)} disabled={disabled}>{room.name}</button>
              </li>
            )}
          )}
        </ul>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref={node => this.newRoomInput = node}/>
          <button type="submit">Add room</button>
        </form>
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
  addRoom: roomName => dispatch(actions.addRoom(roomName)),
  saveUser: roomId => dispatch(actions.saveUser(roomId)),
  selectCurrentRoom: roomId => dispatch(actions.selectCurrentRoom(roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSidebar);
