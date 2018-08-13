import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRoom } from "../actions";

class RoomsSidebar extends Component {
  constructor () {
    super();
    this.newRoomInput = null;
  }

  onSubmit (e) {
    e.preventDefault();
    this.props.addRoom(this.newRoomInput.value);
    this.newRoomInput.value = '';
  }

  render () {
    return (
      <aside id="roomssidebar">
        <h4>Rooms</h4>
        {this.props.rooms && this.props.rooms.map(room => (
          <li key={room.id}>
            {room.name}
          </li>
        ))}
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref={node => this.newRoomInput = node}/>
          <button type="submit">Add&choose room</button>
        </form>
      </aside>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.rooms
});

const mapDispatchToProps = dispatch => ({
  addRoom: roomName => dispatch(addRoom(roomName))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSidebar);
