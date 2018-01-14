import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import { Player } from 'video-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkTheme from './darkTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import { green500 } from 'material-ui/styles/colors'
import BetDialog from './BetDialog'

import './css/pure-min.css'
import 'react-chat-elements/dist/main.css'
import '../node_modules/video-react/dist/video-react.css'
import './App.css'

import superman from './img/superman.png'
import ninja from './img/ninja.png'
import avatar from './img/avatar.png'
import overwatch from './img/overwatch.mp4'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      messageList: [],
      openBetDialog: false,
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })

        // Instantiate contract once web3 provided.
        this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ openBetDialog: true });
    }, 5000);
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, { from: accounts[0] })
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  handleClick() {
    alert('onClick triggered on the title component');
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }

  render() {
    const styles = {
      title: {
        cursor: 'pointer',
      },
    };
    return (
      <div className="container">
        <MuiThemeProvider muiTheme={getMuiTheme(darkTheme)}>
          <div className="container">
            <BetDialog open={this.state.openBetDialog} />
            <AppBar
              title={<span style={styles.title}>StreamBox</span>}
              onTitleClick={this.handleClick}
              iconElementRight={<div><Avatar src={superman} style={{margin: 6}} /><label style={{top:'-18px',position:'relative',margin:5}}>nacho123</label></div>}
            />
            <main className="container pure-g">
              <div className="pure-u-3-4">
                <div className="vid-box">
                  <h2>Overwatch Live Stream</h2>
                  <Player
                    playsInline
                    autoPlay
                    src={overwatch}
                  //src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  />
                </div>
              </div>
              <div className="pure-u-1-4 chat-box">
                <List>
                  <Subheader>Recent chats</Subheader>
                  <ListItem
                    className="chatItem"
                    primaryText="RedDragon408"
                    secondaryText="This stream is awesome!"
                    leftAvatar={<Avatar src={ninja} />}
                  />
                  <ListItem
                    className="chatItem"
                    primaryText="RedDragon408"
                    secondaryText="Tasteless is so close to victory!"
                    leftAvatar={<Avatar src={ninja} />}
                  />
                  <ListItem
                    className="chatItem"
                    primaryText="nacho123"
                    secondaryText="I think Day9 will win again!"
                    leftAvatar={<Avatar src={superman} />}
                  />
                  <ListItem
                    className="chatItem"
                    primaryText="Steve"
                    secondaryText="No way... wanna bet?"
                    leftAvatar={<Avatar src={avatar} />}
                  />
                  <ListItem
                    className="chatItem"
                    primaryText="nacho123"
                    secondaryText="Bring it on!"
                    leftAvatar={<Avatar src={superman} />}
                  />
                </List>
                <TextField hintText="Enter text here..." />
                <FontIcon className="material-icons" color={green500}>send</FontIcon>
              </div>
            </main>
          </div>
        </MuiThemeProvider>
      </div>

    );
  }
}

export default App  
