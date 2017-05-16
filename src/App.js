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

  componentWillMount() {
    const uid = parseInt(localStorage.getItem('github-list-uid'), 10)
    if (uid) {
      this.setState({ uid }, () => this.syncGithubbers())
    }
  }

  authHandler = (err, authData) => {
    if (err) {
      console.log(err)
      return
    }
    const email = authData.user.email
    this.fetchUserData(email)
  }

  fetchUserData = (email) => {
    fetch(`https://api.github.com/search/users?q=${email}`)
      .then(res => res.json())
      .then(userData => {
        const user = userData.items[0]
        localStorage.setItem('github-list-uid', user.id)
        this.setState({ 
          user,
          uid: user.id
        }, () => this.syncGithubbers())
      })
  }

  syncGithubbers = () => {
    this.ref = base.syncState('githubbers', {
      state: 'githubbers',
      context: this,
      asArray: true,
      then: () => this.addUserToGithubbers()
    })
  }

  addUserToGithubbers = () => {
    const user = this.state.githubbers.find(githubber => githubber.id === this.state.uid)
    const newState = { ...this.state }

    if (user) {
      newState.user = user
    } else {
      newState.githubbers.push(this.state.user)
    }

    this.setState(newState)
  }

  logout = (ev) => {
    ev.preventDefault()
    base.unauth()
    localStorage.setItem('github-list-uid', null)
    base.removeBinding(this.ref)
    this.setState({
      uid: null,
      user: {},
      githubbers: []
    })
  }

  render() {
    let content = this.state.uid
      ? <div>
          <MyUser user={this.state.user} logout={this.logout}/>
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
