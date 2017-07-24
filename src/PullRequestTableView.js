import React, { Component } from 'react';
import PullRequestFilter from './PullRequestFilter';
import Container from './Container';
import $ from 'jquery';

class PullRequestTableView extends Component{
	constructor(props){
		super(props);
		this.state = {active: 'all', currentRows: [], currentStatus: 'all', paginateMenu: null};
		this.handleFilter = this.handleFilter.bind(this);
		this.addPaginationMenu = this.addPaginationMenu.bind(this);
		this.handlePaginate = this.handlePaginate.bind(this);
	}

	componentDidMount(){
		this.addPaginationMenu(this.props.data.length, this.props.data);
	}

	addPaginationMenu(length, data){
		let pagination = Math.ceil(length / 10.0);
		let temp = [];
		for(let index=0; index < pagination; index++){
			temp.push(<MyPaginate key={index} value={index+1} onClick={this.handlePaginate}/>);
		};
		this.filterPaginationData(0, this.props.limitIndex, data);
		this.setState({paginateMenu: temp});
	}

	filterPaginationData(startIndex, limitIndex, data){
		let temp = [];

		if(!data){
			data = this.state.currentStatus === 'all' ? this.props.data : this.props.data.filter((row) => row.state === this.state.currentStatus);
		}
		limitIndex = limitIndex > data.length ? data.length : limitIndex;
		for(let index=startIndex; index < limitIndex; index++){
			let item = data[index];
			temp.push(<Row 
						key={index}
						status = {item.state}
						name = {item.user.login}
						title = {item.title}
						description = {item.body}
						number = {item.number}
						repoPath = {this.props.repoPath}/>);
		};
		this.setState({currentRows: temp});
	}

	handlePaginate(event){
		let value = parseInt(event.target.text);
		this.filterPaginationData(10*(value - 1), value*10, null);
	}

	handleFilter(event){
		let active = event.target.getAttribute('value');
		let filteredData = active === 'all' ? this.props.data : this.props.data.filter((row) => row.state === active);
		this.addPaginationMenu(filteredData.length, filteredData);
		this.setState({currentStatus: active});
	}

	render(){
		return(
			<div className='clearfix'>
				<div className='column menu'>
					<PullRequestFilter handleFilter={this.handleFilter} />
				</div>
				<div className='column content'>
					<table id="pullViewTable">
						<thead>
							<tr>
								<th>Status</th>
								<th>Name</th>
								<th>Title</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>{this.state.currentRows}</tbody>
					</table>
					<div className="navigation" id="pullRequestNavigation">
						<div className="pagination">
							{this.state.paginateMenu}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class Row extends Component{
	constructor(props){
		super(props);
		this.state = {openDate: null, mergedDate: null, status: null, show: false, previousContainer: null};
		this.handleContainer = this.handleContainer.bind(this);
	}

	handleContainer(event){
		event.preventDefault();
		if(this.state.previousContainer !== this.props.number){
			let url = 'https://api.github.com/repos/' + this.props.repoPath + '/pulls/' + this.props.number;
			$.ajax({
		      	method: "GET",
		      	url: url,
		      	success: function(data) {
		      		if(data.closed_at){
		      			this.setState({openDate: data.closed_at});
		      		}else{
		      			this.setState({mergedDate: data.created_at});
		      		}
		      		if(data.state !== 'open' && data.state !== 'closed'){
		      			this.setState({state: data.state});
		      		}
		      		this.setState({show: true, previousContainer: this.props.number});
		          }.bind(this),
		      	error: function(xhr, status, err) {
		          	alert('Something went wrong.Please try again.')
		        }
		    });
		}else{
			this.setState({show: !this.state.show});
		}
	}

	render(){
		if(this.state.show){
			return(
			<tr>
				<td>{this.props.status}</td>
				<td>{this.props.name}</td>
				<td><a onClick = {this.handleContainer}>{this.props.title}</a></td>
				<td>{this.props.description}</td>
				<Container
					openDate = {this.state.openDate}
					mergedDate = {this.state.mergedDate}
					status = {this.state.status}
					show = {this.state.show}/>
			</tr>
			)
		}else{
			return (
				<tr>
					<td>{this.props.status}</td>
					<td>{this.props.name}</td>
					<td><a onClick = {this.handleContainer}>{this.props.title}</a></td>
					<td>{this.props.description}</td>
				</tr>
			)
		}
	}
}

class MyPaginate extends Component{
	render(){
		return (
		    <a onClick={this.props.onClick}>{this.props.value}</a>
		)
	}
}

export default PullRequestTableView;