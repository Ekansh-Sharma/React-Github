import React, { Component } from 'react';
import './App.css';


class CustomRow extends Component{
	render(){
		return (
			<tr>
				<td>{this.props.status}</td>
				<td>{this.props.name}</td>
				<td>{this.props.title}</td>
				<td>{this.props.description}</td>
			</tr>
		)
	}
}

class PullRequestTableView extends Component{
	constructor(props){
		super(props);
		this.state = {data: props.data, active: 'all', rows: []};
	}

	componentDidMount(){
		let temp = [];
		debugger
		this.state.data.forEach((item, index) => 
			temp.push(<CustomRow status = {item.state} name = {item.user.login} title = {item.title} description = {item.body} />));
		this.setState({rows: temp});
	}

	render(){
		return(
			<table>
				<thead>
					<tr>
						<td>Status</td>
						<td>Name</td>
						<td>Title</td>
						<td>Description</td>
					</tr>
				</thead>
				<tbody>{this.state.rows}</tbody>
			</table>
		)
	}
}

export default PullRequestTableView;