import React, { Component } from 'react';

class FormSubmit extends Component{
  render(){
    return(
     	<table>
	      <tbody>
	        <tr>
	        	<td colSpan={4}>
			        <form onSubmit={this.props.handleSubmit}>
			        	<input type='text' onChange={this.props.handleChange} />
			        </form>
			    </td>
	        </tr>
	       </tbody>
	    </table>
    )
  }
}

export default FormSubmit;