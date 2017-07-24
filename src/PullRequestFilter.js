import React, { Component } from 'react';

class PullRequestFilter extends Component{
	render(){
		return (
			<ul>
				<li>
					<a onClick={this.props.handleFilter} value='all'>
						All
					</a>
				</li>
				<li>
					<a onClick={this.props.handleFilter} value='closed'>
						Merged
					</a>
				</li>
				<li>
					<a onClick={this.props.handleFilter} value='open'>
						Open
					</a>
				</li>
			</ul>
		)
	}
}

export default PullRequestFilter;