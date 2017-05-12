import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './Login'

class App extends Component {
  constructor() {
    super()
    this.state = {
      uid: null
    }
  }

  authHandler = (err, authData) => {
    if (err) {
      console.log(err)
      return
    }
    this.setState({ uid: authData.user.uid })
  }

  render() {
    let content = <Login authHandler={this.authHandler} />
    return (
      <div className="App">
        <h1>Github Usernames</h1>
        <h2>I can haz usernames?</h2>
        { content }
      </div>
    );
  }
}

export default App;
