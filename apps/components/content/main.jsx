import React from 'react';

class Main extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		return(
			<div className="ct-ct">
				<ul className="roomItems">
					<li className="room">
					</li>
				</ul>
			</div>
			);
	}
}

export default Main;