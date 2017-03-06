import React from 'react';
import { Progress, Button, Icon } from 'antd'
import {  getallroom } from '../../actions/room.jsx';
import { formvisible } from '../../actions/form.jsx';
import roomContainer from '../../untils/room.jsx';

class RoomItem extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	componentWillMount()
	{
		this.context.store.dispatch(getallroom());
	}
	showform(ev)
	{
		const store = this.context.store;

		store.dispatch(formvisible(!0, ev.currentTarget.getAttribute('data-roomid')));
	}
	render()
	{
		const house = this.props.house,
			  store = this.context.store,
			  rooms = store.getState().rooms;

		if(rooms.length)	roomContainer.rooms = [].concat(rooms);

		let _rooms = roomContainer.groupByid(),
			_rests = roomContainer.resttimeByid(),
			_current_room = _rooms[house.roomid] || [],
			_current_use = !!_rests[house.roomid] ? (100 - Math.round(_rests[house.roomid]*1e4)/1e2) : 0;

		let _style = {};
		if(_current_room.length > 5)
		{
			_style = { animation: `${ _current_room.length*2 }s infinite scroll linear` }
			_current_room = _current_room.concat(_current_room);
		}
		return (
			<li className="room">
				<h2 className="roomname">{ house.roomname }</h2>
				<div className="detail">

					<div className="chart">
						<Progress type="circle"
								  status={ _current_use > 70 ? 'exception' : '' }
							      percent={ Math.min(_current_use, 100) }
							      format={ (percent) => { return percent < 100 ? `${percent}%` : '已满' }}
				        />
					</div>
					<div className="text">
						<div className="animate-box" style={ _style }>
							{
								_current_room.map((room, i) =>
								{
									return (
										<p className="piece">
											<span className="time">{room.starttime}~{room.endtime}</span>
											<span className="name">{room.username}</span>
										</p>
										);
								})
							}
						</div>
					</div>
					<p className="detail">
						Details<Icon type="rollback" />
					</p>

				</div>
				<div className="btn-group">
					<Button type="primary" data-roomid={ house.roomid } onClick={ this.showform.bind(this) }>我要预定</Button>
				</div>
			</li>
			);
	}
}

RoomItem.contextTypes =
{
	store: React.PropTypes.object.isRequired
}

export default RoomItem;