import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
  constructor () {
    super();
    this.list = null;
  }

  componentDidUpdate () {
    this.list.scrollTop = this.list.scrollHeight;
  }

  render () {
    return (
      <section id="messages-list" ref={node => this.list = node}>
        {this.props.messages && this.props.messages.map((msg, idx) => (
          <p key={idx}>
            <i>{msg.author}</i>: {msg.message}
          </p>
          ))}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.currentRoom.messages
});

export default connect(mapStateToProps, null)(Sidebar);
