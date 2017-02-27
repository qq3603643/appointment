import React from 'react';
import Hearder from './hearder.jsx';
import Main from './main.jsx';

require('./index.css');

class Content extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		return (
			<div className="content">
				<Hearder />
				<Main />
			</div>
			);
	}
}

export default Content;