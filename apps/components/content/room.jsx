import React from 'react';
import { connect } from 'react-redux';

import { Progress, Button, Icon, Popover } from 'antd'
import { formvisible } from '../../actions/form.jsx';
import roomContainer from '../../untils/room.jsx';
import { toMinutes, getHourMin, isoverlap } from '../../untils/common.jsx';

class RoomItem extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state =
	  {
	  	roomid: '#{ roomid }',
	  	username: '#{ username }',
	  	starttime: '#{ starttime }',
	  	endtime: '#{ endtime }'
	  };
	}
	componentWillMount()
	{
		this.setState({ roomid: this.props.house.roomid })
	}
	showform(ev)
	{
		const { formvisible } = this.props;

		formvisible(!0, ev.currentTarget.getAttribute('data-roomid'));
	}
	popovervisible(visible)
	{
		/* show **/
		if(visible)
		{
			let rooms = roomContainer.groupByid()[this.state.roomid] || [],
			    now   = getHourMin(),
			    _o    = { username: '暂无', starttime: '00:00', endtime: '00:00' },
			    i     = 0,
			    roomitem;

			while(roomitem = rooms[i++])
			{
				if(isoverlap(toMinutes(now), toMinutes(roomitem.starttime), toMinutes(roomitem.endtime)))
				{
					_o = Object.assign(_o, { username: roomitem.username, starttime: roomitem.starttime, endtime: roomitem.endtime });
					break;
				}
			}

			this.setState(_o);
		}
	}
	render()
	{
		const house = this.props.house,
			  { rooms } = this.props;

		if(rooms.length)	roomContainer.rooms = [].concat(rooms);

		let _rooms = roomContainer.groupByid(),
			_rests = roomContainer.resttimeByid(),
			_current_room = _rooms[house.roomid] || [],
			_current_use = _rests.hasOwnProperty(house.roomid)
						   ? Math.round((100 - _rests[house.roomid]*1e2)*1e2) / 1e2
						   : 0;

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
								  status={ _current_use > 70 ? 'exception' : 'normal' }
							      percent={ Math.min(_current_use, 100) }
							      format={ percent => percent < 100 ? `${percent}%` : '已满' }
				        />
					</div>
					<div className="text">
						<div className="animate-box" style={ _style }>
							{
								_current_room.map((room, i) =>
								{
									return (
										<p className="piece" key={ i }>
											<span className="time">{room.starttime}~{room.endtime}</span>
											<span className="name">{room.username}</span>
										</p>
										);
								})
							}
						</div>
					</div>
					<p className="detail">
						<Popover title={ this.state.username }
								 content={ `${this.state.starttime}~${this.state.endtime}` }
								 onVisibleChange={ this.popovervisible.bind(this) }>
							<Button type="dashed"
									icon="question-circle-o"
							>谁在用?</Button>
						</Popover>
					</p>

				</div>
				<div className="btn-group">
					<Button type="primary" data-roomid={ house.roomid } onClick={ this.showform.bind(this) }>我要预定</Button>
				</div>
			</li>
			);
	}
}

export default connect((state, props) =>
	({
		rooms: state.appoint.rooms
	}),
	(dispatch, ownProps) =>
	({
		formvisible: (...args) => dispatch(formvisible(...args))
	}))(RoomItem);