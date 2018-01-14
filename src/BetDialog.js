import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import bet from './img/bet.png'

export default class BetDialog extends Component {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Decline"
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Accept"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title=""
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div style={{float:'left', position: 'relative', top: '-20px', fontSize: '14pt'}}>
            <h2>Steve wants to bet with you!</h2>
            <b>Bet:</b> Day9 will win the match<br /><br />
            <b>Bet amount:</b> 100 tokens<br /><br />
            Do you accept?
         </div>
          <div style={{float: 'right'}}>
            <Avatar src={bet} size={100} style={{position: 'relative', top: '20px'}} />
          </div>
        </Dialog>
      </div>
    );
  }
}