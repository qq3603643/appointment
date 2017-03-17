import React from 'react';
import { connect } from 'react-redux';

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
		const { getallhouse, getallroom } = this.props;

		getallhouse();
		getallroom();
	}
	render()
	{
		const { houses } = this.props;

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

export default connect((state, props) =>
	({
		houses: state.appoint.houses
	}),
	(dispatch, ownProps) =>
	({
		getallhouse: () => dispatch(getallhouse()),
		getallroom: () => dispatch(getallroom())
	}),
    )(Main);