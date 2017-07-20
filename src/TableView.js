import React, { Component } from 'react';
import './App.css';


class CustomRow extends Component{
	render(){
		return (
			<tr>
				<td><a onClick={this.handleNameClick}>{this.props.name}</a></td>
				<td>{this.props.owner}</td>
				<td>{this.props.starsCount}</td>
				<td>{this.props.forksCount}</td>
				<td><a data-url={this.props.name} onClick={this.props.onClick}> view </a></td>
			</tr>
			
		)
	}
}

class TableView extends Component{
	constructor(props){
		super(props);
		this.state = {rows: []};
		this.updateTable = this.updateTable.bind(this);
	}

	componentDidMount(){
		this.updateTable();
	}

	updateTable(){
		let temp = [];
		this.props.data.forEach((item, index) => 
			temp.push(<CustomRow key = {index} name={item.full_name} owner={item.owner.login}  forksCount={item.forks_count} starsCount = {item.watchers_count} onClick={this.props.handleView}/>));
		this.setState({rows: temp});
	}

	componentWillReceiveProps(nextProps) {
	    if(JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data))
	    {
	        this.updateTable();
	    }
	}

	render(){
		return(
			<table>
				<thead>
					<tr>
						<td>Name</td>
						<td>Owner</td>
						<td>Stars</td>
						<td>Forks</td>
						<td>view</td>
					</tr>
				</thead>
				<tbody>{this.state.rows}</tbody>
			</table>
		)
	}
}

export default TableView;