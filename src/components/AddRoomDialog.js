import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = () => ({
  title: {
    paddingBottom: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 24px 24px',
    width: 300
  },
  button: {
    marginTop: 8
  }
});

class AddRoomDialog extends Component {
  constructor (props) {
    super(props);

    this.roomName = '';
  }

  handleChange (name) {
    return event => this.roomName = event.target.value;
  }

  render () {
    const { classes, onSubmit, ...others } = this.props;
    return (
      <Dialog { ...others }>
        <DialogTitle className={classes.title}>Add new room</DialogTitle>
        <form className={classes.form} onSubmit={e => onSubmit(e, this.roomName)}>
          <TextField
            required
            id="addnewroom"
            label="Room name"
            margin="normal"
            onChange={this.handleChange('roomname')}
            autoFocus
          />
          <Button className={classes.button} color="primary" variant="outlined" type="submit">Submit</Button>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AddRoomDialog);
