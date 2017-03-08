import React from 'react';
import { info } from '../../untils/message.jsx';
import { getallhouse, getallroom } from '../../actions/room.jsx';
import RoomItem from './room.jsx';

class Main extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	componentWillMount()
	{
		const store = this.context.store;

		store.dispatch(getallhouse());
		store.dispatch(getallroom());
	}
	render()
	{
		const store = this.context.store,
			  state = store.getState(),
			  houses = state.houses.sort((a, b)=>a.roomid-b.roomid);

		if(!houses.length)
			return null;

		return(
			<div className="ct-ct">
				<ul className="roomItems">
					{
						houses.map((house, i) =>
						{
							return <RoomItem key = { i } house = { house }/>;
						})
					}
				</ul>
			</div>
			);
	}
}

Main.contextTypes =
{
	store: React.PropTypes.object.isRequired
}
export default Main;