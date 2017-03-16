import React from 'react';

class Hearder extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		return (
			<div className="hearder">
				会议室预定系统 @ v 0.0.1
			</div>
			);
	}
}

export default Hearder;