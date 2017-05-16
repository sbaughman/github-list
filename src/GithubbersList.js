import React from 'react'

const GithubbersList = (props) => {
  const renderGithubbers = props.githubbers
    .filter(githubber => githubber.id !== props.user.id)
    .map(githubber => (
      <Githubber key={githubber.id} githubber={githubber} />
    ))

  return (
    <div className="col-sm-12">
      <h1>Other XTERNs</h1>
      {renderGithubbers}
    </div>
  )
}

const Githubber = ({ githubber }) => {
  return (
    <div className="githubber col-sm-3">
      <div className="thumbnail">
        <img className="img-responsive" src={githubber.avatar_url} alt="githubber" />
        <div className="caption">
          <h3>{githubber.login}</h3>
          <a href={githubber.url}>Link to {githubber.login}'s github</a>
        </div>
      </div>
    </div>
  )
}

export default GithubbersList