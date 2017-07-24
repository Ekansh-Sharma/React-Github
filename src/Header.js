import React, { Component } from 'react';

class Header extends Component{
  render(){
    return(
      <div className='navbar'>
          <RepoButton onClick={this.props.handleRepoButtonClick} />
          <PullRequestButton onClick={this.props.handlePullReqButtonClick} />
        </div>
    )
  }
}

class RepoButton extends Component{
  render(){
    return(
      <a onClick={this.props.onClick}>Repositories</a>
    )
  }
}

class PullRequestButton extends Component{
  render(){
    return(
      <a onClick={this.props.onClick}>Pull Requests</a>
    )
  }
}



export default Header;