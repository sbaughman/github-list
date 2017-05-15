import React from 'react'
import base from './base'

const Login = ({ authHandler }) => {
  const authenticate = (provider) => {
    base.authWithOAuthPopup(provider, authHandler)   
  }

  return (
    <div className="col-sm-12">
      <button className="github-login btn btn-lg btn-primary" onClick={() => authenticate('github')}>
        Sign in with Github
      </button>
    </div>
  )
}

export default Login