import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    borderTop: '1px solid #B6B6B6'
  },
  input: {
    width: '100%',
    backgroundColor: '#fff'
  }
};

class AddMessage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  validate (val) {
    return !!val.trim();
  }

  onKeyDown (e) {
    const value = e.target.value;
    if (e.key === 'Enter' && this.validate(value)) {
      this.props.addMessage({
        message: value.trim(),
        author: this.props.user,
        roomId: this.props.currentRoom
      });
      this.setState({
        value: ''
      });
    }
  }

  onChange (e) {
    this.setState({
      value: e.target.value
    });
  }

  render () {
    const { classes } = this.props;
    return (
      <section className={classes.root}>
        <TextField
          className={classes.input}
          onChange={this.onChange.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          value={this.state.value}
          autoFocus
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddMessage));
