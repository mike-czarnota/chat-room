import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
  constructor (props) {
    super(props);
    this.list = null;
  }

  getMessages () {
    let messages = [];
    if (this.props.rooms.length && this.props.currentRoom !== -1) {
      messages = this.props.rooms[this.props.currentRoom].messages;
    }
    return messages;
  }

  componentDidUpdate () {
    this.list.scrollTop = this.list.scrollHeight;
  }

  render () {
    this.messages = this.getMessages();
    return (
      <section id="messages-list" ref={node => this.list = node}>
        {this.messages && this.messages.map((msg, idx) => (
          <p key={idx}>
            <i>{msg.author}</i>: {msg.message}
          </p>
          ))}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.currentRoom,
  rooms: state.rooms
});

export default connect(mapStateToProps, null)(Sidebar);
