import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import AddRoomDialog from './AddRoomDialog';

const styles = () => ({
  root: {
    width: '100%',
    flex: 1,
    borderRight: '1px solid #B6B6B6',
    borderBottom: '1px solid #B6B6B6',
    position: 'relative',
    overflow: 'auto'
  },
  button: {
    position: 'absolute',
    bottom: 16,
    right: 16
  }
});

class RoomsSidebar extends Component {
  constructor (props) {
    super(props);
    this.currentRoomName = '';
    this.state = {
      dialogOpen: false
    };

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

  onSubmit (e, value) {
    e.preventDefault();
    this.setState({
      dialogOpen: false
    });
    this.props.addRoom(value);
  }

  chooseRoom (roomId) {
    this.props.selectCurrentRoom(roomId);
    this.props.saveUser({
      username: this.props.user,
      roomId
    });
  }

  openAddRoomDialog () {
    this.setState({
      dialogOpen: true
    });
  }

  onDialogClose () {
    this.setState({
      dialogOpen: false
    });
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav" subheader={<ListSubheader component="h4">Rooms</ListSubheader>}>
          {this.props.rooms && this.props.rooms.map(room => {
            const disabled = room.id === this.props.currentRoom;
            return (
              <ListItem button onClick={this.chooseRoom.bind(this, room.id)} disabled={disabled} key={room.id}>
                {room.name}
              </ListItem>
            )}
          )}
        </List>
        <Button variant="fab" color="primary" className={classes.button} onClick={this.openAddRoomDialog.bind(this)}>
          <AddIcon />
        </Button>
        <AddRoomDialog
          onSubmit={this.onSubmit.bind(this)}
          onClose={this.onDialogClose.bind(this)}
          open={this.state.dialogOpen}
        />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RoomsSidebar));
