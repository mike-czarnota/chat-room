import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';

const styles = ({
  root: {
    width: '100%',
    flex: 1,
    borderRight: '1px solid #B6B6B6',
    position: 'relative',
    overflow: 'auto'
  },
  button: {
    position: 'absolute',
    bottom: 16,
    right: 16
  }
});

class UsersSidebar extends Component {
  logout () {
    localStorage.setItem('chat-username', '');
    this.props.logout(this.props.user);
  }

  getUsers () {
    return this.props.rooms[this.props.currentRoom].users;
  }

  render () {
    const users = this.getUsers();
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav" subheader={<ListSubheader component="h4">Users</ListSubheader> }>
          {users && users.map((user, idx) => (
            <ListItem key={idx}>{user}</ListItem>
          ))}
        </List>
        <Button variant="fab" color="primary" className={classes.button} onClick={this.logout.bind(this)}><LockIcon/></Button>
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
  logout: user => dispatch(actions.logout(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UsersSidebar));
