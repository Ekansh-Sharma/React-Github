import React, { Component } from 'react';
import './App.css';
import TableView from './TableView';
import PullRequestTableView from './PullRequestTableView'
import $ from 'jquery';
import FormSubmit from './FormSubmit'
import Header from './Header'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {isActive: 'repo', searchText: '', data: [], pullRequest: [], show: false};
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
    this.setState({searchText: event.target.value});
  }

  handleView(childProp){
    let url = 'https://api.github.com/repos/' + childProp.name + '/pulls?state=all';
    $.ajax({
      method: "GET",
      url: url,
      success: function(data) {
            if(data.length > 0){
              let limitIndex = data.length > 10 ? 10 : data.length;
              this.setState({ pullRequest: <PullRequestTableView 
                                              data = {data} 
                                              repoPath = {childProp.name}
                                              lastIndex= {data.length}
                                              limitIndex= {limitIndex} />, isActive: 'pullReq'});
            }else{
              this.setState({pullRequest: 'No Pull Request now', isActive: 'pullReq'});
            }
          }.bind(this),
      error: function(xhr, status, err) {
          console.log(err);
          alert('Something went wrong.Please try again.')
        }
    });

  }

  handleSubmit(event){
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: "https://api.github.com/search/repositories?q=" + this.state.searchText,
      type: 'GET',
      success: function(data) {
            if(data.total_count > 0){
              let limitIndex = data.items.length > 10 ? 10 : data.items.length;
              this.setState({ data: <TableView 
                                      data = {data.items}
                                      handleView={this.handleView}
                                      lastIndex= {data.items.length}
                                      limitIndex= {limitIndex}/>, show: true});
            }else{
              this.setState({data: 'Nothing to show', show: true});
            }
          }.bind(this),
        error: function(xhr, status, err) {
            console.log(err);
            alert('Something went wrong.Please try again.')
          }
      });
  }

  render() {
    if(this.state.isActive === 'repo' && this.state.show){
      return (
        <div>
          <Header handleRepoButtonClick={this.handleRepoButtonClick} handlePullReqButtonClick={this.handlePullReqButtonClick} />
          <div className='main'>
            <FormSubmit handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            {this.state.data}
          </div>
        </div>
      );
    }else if(this.state.isActive === 'repo'){
      return(
        <div>
          <Header handleRepoButtonClick={this.handleRepoButtonClick} handlePullReqButtonClick={this.handlePullReqButtonClick} />
          <div className='main'>
            <FormSubmit handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
          </div>
        </div>
      );
    }else{
      return (
        <div>
          <Header handleRepoButtonClick={this.handleRepoButtonClick} handlePullReqButtonClick={this.handlePullReqButtonClick} />
          <div className='main'>
            {this.state.pullRequest}
          </div>
        </div>
      );
    }
    
  }
}

export default App;
