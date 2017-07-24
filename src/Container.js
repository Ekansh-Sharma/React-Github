import React, { Component } from 'react';

class Container extends Component{
	render(){
			if(this.props.show){
				if(this.props.mergedDate){
					if(this.props.status){
						return(
							<div>
								created_at: <span>{this.props.mergedDate}</span>
								Status: <span>{this.props.status}</span>
							</div>
						)
					}else{
						return(
							<div>
								created_at: <span>{this.props.mergedDate}</span>
							</div>
						)
					}

				}else{
					if(this.props.status){
						return(
							<div>
								closed_at: <span>{this.props.openDate}</span>
								Status: <span>{this.props.status}</span>
							</div>
						)
					}else{
						return(
							<div>
								closed_at: <span>{this.props.openDate}</span>
							</div>
						)
					}
				}
			}else{
				return null;
			}
	}
}

export default Container;