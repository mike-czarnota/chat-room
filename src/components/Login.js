import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = () => ({
  container: {
    width: 400,
    padding: '40px 20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  button: {
    marginTop: 16,
    padding: 10
  }
});

class Login extends Component {
  constructor (props) {
    super(props);
    this.username = "";
    this.roomname = "";
  }

  componentDidMount () {
    // this.username && this.username.focus();
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
    if (this.roomname) {
      this.props.addRoom(this.roomname);
    }

    this.props.saveUser(this.username);
    localStorage.setItem('chat-username', this.username);
  }

  handleChange (name) {
    return event => this[name] = event.target.value;
  }

  render () {
    const { classes } = this.props;
    return(
      <Paper className={classes.container} elevation={1}>
        <Typography variant="headline" component="h3">
          Please, set your username
          {
            !this.props.rooms.length ?
            " and add the first room."
            : void 8
          }
        </Typography>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
          <TextField
            required
            id="username"
            label="Username"
            margin="normal"
            onChange={this.handleChange('username')}
            autoFocus
          />
          {
            !this.props.rooms.length ?
              <TextField
                required
                id="roomName"
                label="Room"
                margin="normal"
                onChange={this.handleChange('roomname')}
              />
              : void 8
          }
          <Button className={classes.button} color="primary" variant="outlined" type="submit">Join!</Button>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.currentRoom,
  rooms: state.rooms
});

const mapDispatchToProps = dispatch => ({
  saveUser: username => dispatch(actions.saveUser({ username })),
  addRoom: name => dispatch(actions.addRoom(name)),
  selectCurrentRoom: room => dispatch(actions.selectCurrentRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
