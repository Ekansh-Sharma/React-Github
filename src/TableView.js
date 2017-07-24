import React, { Component } from 'react';
import './App.css';


class CustomRow extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleNameClick = this.handleNameClick.bind(this);
	}

	handleClick(event){
		event.preventDefault();
		this.props.handleView(this.props)
	}

	handleNameClick(){
		window.location = 'https://github.com/'+this.props.name;
	}

	render(){
		return (
			<tr>
				<td><a onClick={this.handleNameClick}>{this.props.name}</a></td>
				<td>{this.props.owner}</td>
				<td>{this.props.starsCount}</td>
				<td>{this.props.forksCount}</td>
				<td><a onClick={this.handleClick}> view </a></td>
			</tr>
			
		)
	}
}

class MyPaginate extends Component{
	render(){
		return (
		    <a onClick={this.props.handlePagination}>{this.props.value}</a>
		)
	}
}
 
class TableView extends Component{
	constructor(props){
		super(props);
		this.state = {rows: [], startIndex: 0, paginateMenu: []};
		this.updateTable = this.updateTable.bind(this);
		this.filterData = this.filterData.bind(this);
		this.addPagination = this.addPagination.bind(this);
		this.handlePagination = this.handlePagination.bind(this);
	}

	componentDidMount(){
		this.addPagination();
		this.updateTable();
	}

	addPagination(){
		let pagination = Math.ceil(this.props.lastIndex / 10.0);
		let temp = [];
		for(let index=0; index < pagination; index++){
			temp.push(<MyPaginate key={index} value={index+1} handlePagination={this.handlePagination}/>);
		};
		this.setState({paginateMenu: temp});
	}

	handlePagination(event){
		let value = parseInt(event.target.text);
		let startIndex = 10*(value - 1);
		let limitIndex = value*10;
		limitIndex = limitIndex > this.props.lastIndex ? this.props.lastIndex : limitIndex;
		this.filterData(startIndex, limitIndex);
	}

	filterData(startIndex, limitIndex){
		let temp = [];
		for(let index=startIndex; index < limitIndex; index++){
			let item = this.props.data[index];
			temp.push(<CustomRow 
						key = {index}
						name = {item.full_name}
						owner = {item.owner.login} 
						forksCount = {item.forks_count}
						starsCount = {item.watchers_count}
						handleView = {this.props.handleView}/>);
		};
		this.setState({rows: temp});
	}

	updateTable(){
		this.filterData(this.state.startIndex, this.props.limitIndex)
	}

	componentWillReceiveProps(nextProps) {
	    if(JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data))
	    {	
	    	this.props = nextProps;
	    	this.addPagination();
	        this.updateTable();
	    }
	}

	render(){
		return(
			<div>
			<br/>
				<table id='repoTable'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Owner</th>
							<th>Stars</th>
							<th>Forks</th>
							<th>view</th>
						</tr>
					</thead>
					<tbody>{this.state.rows}</tbody>
				</table>
				<div className="navigation">
					<div className="pagination">
						{this.state.paginateMenu}
					</div>
				</div>
			</div>
		)
	}
}

export default TableView;