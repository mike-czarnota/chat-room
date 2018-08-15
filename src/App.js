import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.sass';
import RoomsSidebar from './components/RoomsSidebar';
import UsersSidebar from './components/UsersSidebar';
import MessagesList from './components/MessagesList';
import AddMessage from './components/AddMessage';
import Login from './components/Login';
import * as actions from './actions';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    height: '100vh'
  },
  container: {
    display: "flex",
    position: "relative",
    width: "100vw",
    height: "100vh"
  },
  sidebar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    width: 200
  },
  main: {
    flex: 3
  }
});

class App extends Component {
  constructor (props) {
    super(props);

    this.handleUnload = this.handleUnload.bind(this);
  }

  componentDidMount () {
    window.addEventListener('beforeunload', this.handleUnload);
  }

  componentwillUnmount () {
    window.addEventListener('beforeunload', this.handleUnload);
  }

  handleUnload () {
    this.props.user && this.props.logout(this.props.user);
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root} >
        {this.props.user && this.props.currentRoom > -1 ?
          <Grid className={classes.container} id="container">
            <aside className={classes.sidebar}>
              <RoomsSidebar />
              <UsersSidebar />
            </aside>
            <main className={classes.main}>
              <MessagesList />
              <AddMessage />
            </main>
          </Grid>
          :
          <Login />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.currentRoom,
  messages: state.messages,
  rooms: state.rooms,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logout: user => dispatch(actions.logout(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
