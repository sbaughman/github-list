import React from 'react'

const MyUser = ({ user }) => {
  return (
    <div className="my-user col-sm-12 text-center">
      <div className="well">
        <h2>My Github Profile</h2>
        <img className="profile-img" src={user.avatar_url} alt="user" />
        <h2>{user.login}</h2>
        <a href={user.html_url} target="_">Link to {user.login}'s profile</a>
      </div>
    </div>
  )
}

export default MyUser