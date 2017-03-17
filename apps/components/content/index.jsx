import React from 'react';
import { connect } from 'react-redux';

import Hearder from './hearder.jsx';
import Main from './main.jsx';
import user from '../../untils/user.jsx';
import { addroom } from '../../actions/room.jsx';
import { error } from '../../untils/message.jsx';
import * as notification from '../../untils/notification.jsx';

require('./index.css');

class Content extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	componentDidMount()
	{
		const { houses, _self, addroom } = this.props,
			  findnamebyid = (roomid) =>
			  {
			  	let i = 0,
			  		house, name;

		  		while(house = houses[i++])
	  			{
	  				if(house.roomid == roomid)
  					{
  						name = house.roomname;
  						break;
  					}
	  			}

	  			return name || '';
			  };

		user.watchroom((da) =>
		{
			let name = findnamebyid(da.roomitem.roomid);

			switch(da.userid)
			{
				case _self:
					notification.success(
					{
						message: `主人,会议室预定成功啦 (●'◡'●)ﾉ♥`,
						description: `${da.roomitem.starttime}~${da.roomitem.endtime} ${da.roomitem.username} ${name}`
					})
					break;
				default:
					notification.info(
					{
						message: `号外,号外,有人预定会议室啦 (°□°；)`,
						description: `${da.roomitem.starttime}~${da.roomitem.endtime} ${da.roomitem.username} ${name}`
					})
			}

			addroom(da.roomitem);
		})

		user.watcherror((da) =>
		{
			let { type } = da,
				duration = 10;

			switch(type)
			{
				case 'addroom_database_query':
					error(
						`预定失败,${ da.error } ╮(╯_╰)╭`,
						duration
						);
					break;
				case 'addroom_occupied':
					error(
						`预定失败,该时间段已被使用: ${ da.data.username } ${ da.data.starttime }~${ da.data.endtime } ╮(╯_╰)╭`,
						duration
						);
					break;
				default:
					error(
						`unkown error ╮(╯_╰)╭`,
						duration
						);
			}
		})
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

export default connect((state, props) =>
	({
		houses: state.appoint.houses,
		_self: state.appoint.users.self
	}),
	(dispatch, ownProps) =>
	({
		addroom: (roomitem) => dispatch(addroom(roomitem)),
	}))(Content);