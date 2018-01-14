import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import { Player } from 'video-react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
// import { Launcher } from 'react-chat-window'
import 'react-chat-elements/dist/main.css'
import { MessageList, Input, Button } from 'react-chat-elements';


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import '../node_modules/video-react/dist/video-react.css'
import './App.css'

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
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
          {/* <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
          </nav> */}
          <AppBar
            title={<span style={styles.title}>StreamBox</span>}
            onTitleClick={this.handleClick}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            iconElementRight={<FlatButton label="Upload" />}
          />

          <main className="container">
            <div className="pure-g">
              <div className="pure-u-1-2">
                <Player
                  playsInline
                  poster="/assets/poster.png"
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
              </div>
              <div className="pure-u-1-2">
                <div className="pure-g">
                <div className="pure-u-1-2">
                </div>
                  <div className="pure-u-1-2">
                    <MessageList
                      className='message-list'
                      lockable={true}
                      toBottomHeight={'100%'}
                      dataSource={[
                        {
                          position: 'left',
                          type: 'text',
                          text: 'This stream is awesome!',
                          date: new Date(),
                        },
                        {
                          position: 'right',
                          type: 'text',
                          text: 'Totally!',
                          date: new Date(),
                        },
                        {
                          position: 'left',
                          type: 'text',
                          text: 'I bet Day9 will win!',
                          date: new Date(),
                        }
                      ]} />
                    <Input
                      placeholder="Type here..."
                      multiline={true}
                      buttons={
                        <Button
                          color='white'
                          backgroundColor='black'
                          text='Send' />
                      } />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App
