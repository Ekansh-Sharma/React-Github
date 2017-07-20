import React, { Component } from 'react';
import './App.css';
import TableView from './TableView';
import PullRequestTableView from './PullRequestTableView'
import $ from 'jquery';

class RepoButton extends Component{
  render(){
    return(
      <td colSpan={2}>
        <button onClick={this.props.onClick}>Repositories</button>
      </td>
    )
  }
}

class PullRequestButton extends Component{
  render(){
    return(
      <td colSpan={2}>
        <button onClick={this.props.onClick}>Pull Requests</button>
      </td>
    )
  }
}

class FormSubmit extends Component{
  render(){
    return(
      <td colSpan={4}>
        <form onSubmit={this.props.handleSubmit}>
          <input type='text' onChange={this.props.handleChange} />
          <input type='submit' value='submit'/>
        </form>
      </td>
    )
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {isActive: 'repo', value: '', data: '', pullRequest: ''};
    this.handleRepoButtonClick = this.handleRepoButtonClick.bind(this);
    this.handlePullReqButtonClick = this.handlePullReqButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  handleRepoButtonClick(){
    this.setState({isActive: 'repo'});
  }

  handlePullReqButtonClick(){
    this.setState({isActive: 'pullReq'})
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleView(event){
    event.preventDefault();
    let url = 'https://api.github.com/repos/' + event.target.dataset.url + '/pulls';
    debugger
    $.ajax({
      method: "GET",
      url: url,
      type: 'GET',
      success: function(data) {
            if(data.total_count > 0){
              debugger
              this.setState({ pullRequest: <PullRequestTableView data = {data} />});
              this.setState({isActive: 'pullReq'});
            }
          }.bind(this),
      error: function(xhr, status, err) {
        debugger
          alert('Something went wrong.Please try again.')
        }.bind(this)
    });

  }

  handleSubmit(event){
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: "https://api.github.com/search/repositories?q=" + this.state.value,
      type: 'GET',
      success: function(data) {
            if(data.total_count > 0){
              this.setState({ data: <TableView data = {data.items} handleView={this.handleView} />});
            }
          }.bind(this),
        error: function(xhr, status, err) {
            alert('Something went wrong.Please try again.')
          }.bind(this)
      });
  }

  render() {
    if(this.state.isActive === 'repo'){
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <RepoButton onClick={this.handleRepoButtonClick} />
                <PullRequestButton onClick={this.handlePullReqButtonClick} />
              </tr>
              <tr>
                <FormSubmit handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
              </tr>
              
                
              </tbody>
          </table>
          {this.state.data}
        </div>
      );
    }else{
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <RepoButton onClick={this.handleRepoButtonClick} />
                <PullRequestButton onClick={this.handlePullReqButtonClick} />
              </tr>
              </tbody>
          </table>
          {this.state.pullRequest}
        </div>
      );
    }
    
  }
}

export default App;
