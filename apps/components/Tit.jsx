import React from 'react';
import changeTit from '../actions/changeTit.jsx';

class Tit extends React.Component
{
	constructor(props) {
	  super(props);

	  this.state = {};
	}
	render()
	{
		return (
			<h2 onClick = { ()=>{ this.context.store.dispatch(changeTit()) } }
			> { this.context.store.getState().data } </h2>
			);
	}
}

Tit.contextTypes =
{
	store: React.PropTypes.object.isRequired
}

export default Tit;