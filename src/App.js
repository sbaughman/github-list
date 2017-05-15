import React, { Component } from 'react'
import './App.css'

import Login from './Login'
import MyUser from './MyUser'
import GithubbersList from './GithubbersList'
import base from './base'

class App extends Component {
  constructor() {
    super()
    this.state = {
      uid: null,
      user: {},
      githubbers: []
    }
  }

  authHandler = (err, authData) => {
    if (err) {
      console.log(err)
      return
    }
    const uid = authData.user.uid
    const email = authData.user.email
    this.setState({ uid })
    this.fetchGithubbers()
    .then(() => {
      this.fetchUserData(email, uid)
    })
  }

  fetchUserData = (email, uid) => {
    fetch(`https://api.github.com/search/users?q=${email}`)
      .then(res => res.json())
      .then(userData => this.setState({
        uid,
        user: userData.items[0]
      }, () => this.addUserToGithubbers()))
  }

  fetchGithubbers = () => {
    return base.fetch('githubbers', {
      context: this,
      asArray: true
    }).then(githubbers => this.setState({ githubbers }))
  }

  addUserToGithubbers = () => {
    const user = this.state.githubbers.find(githubber => githubber.id === this.state.user.id)
    if (!user) {
      base.push('githubbers', {
        data: this.state.user
      })
    }
  }

  render() {
    let content = this.state.uid
      ? <div>
          <MyUser user={this.state.user} />
          <GithubbersList githubbers={this.state.githubbers} user={this.state.user} />
        </div>
      : <Login authHandler={this.authHandler} />

    return (
      <div className="App row">
        <div className="col-sm-12 App-header">
          <h1>XTERN Bootcamp Github Usernames</h1>
          <h2>I can haz usernames?</h2>
        </div>
        { content }
      </div>
    );
  }
}

export default App;
