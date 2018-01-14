import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import { Player } from 'video-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkTheme from './darkTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import './css/pure-min.css'
import 'react-chat-elements/dist/main.css'
import '../node_modules/video-react/dist/video-react.css'
import './App.css'

import superman from './img/superman.png'
import ninja from './img/ninja.png'
import avatar from './img/avatar.png'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      messageList: []
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

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

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
            {/* <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
          </nav> */}
            <AppBar
              title={<span style={styles.title}>StreamBox</span>}
              onTitleClick={this.handleClick}
              iconElementRight={<FlatButton label="Upload" />}
            />
            <main className="container pure-g">
              <div className="pure-u-3-4">
                <div className="vid-box">
                  <h2>Overwatch Live Stream</h2>
                  <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  />
                </div>
              </div>
              <div className="pure-u-1-4 chat-box">
                <List>
                  <Subheader>Recent chats</Subheader>
                  <ListItem
                    primaryText="Brendan Lim"
                    leftAvatar={<Avatar src={superman} />}
                  />
                  <ListItem
                    primaryText="Eric Hoffman"
                    leftAvatar={<Avatar src={ninja} />}
                  />
                  <ListItem
                    primaryText="Grace Ng"
                    leftAvatar={<Avatar src={avatar} />}
                  />
                </List>
                <Divider />
              </div>
            </main>
          </div>
        </MuiThemeProvider>
      </div>

    );
  }
}

export default App  
