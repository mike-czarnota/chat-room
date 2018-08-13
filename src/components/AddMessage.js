import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddMessage extends Component {
  constructor () {
    super();
    this.input = null;
  }

  componentDidMount () {
    this.input && this.input.focus();
  }

  validate (val) {
    return !!val.trim();
  }

  onKeyDown (e) {
    if (e.key === 'Enter' && this.validate(this.input.value)) {
      this.props.addMessage({
        message: this.input.value.trim(),
        author: this.props.user,
        roomId: this.props.currentRoom
      });
      this.input.value = '';
    }
  }

  render () {
    return (
      <section id="new-message">
        <input
          onKeyDown={this.onKeyDown.bind(this)}
          ref={node => this.input = node}
          />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.currentRoom,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addMessage: data => dispatch(actions.addMessage(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMessage);
