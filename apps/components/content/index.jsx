import React from 'react';
import Hearder from './hearder.jsx';
import Main from './main.jsx';
import user from '../../untils/user.jsx';
import { addroomwatch } from '../../actions/room.jsx';
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
		const store = this.context.store,
			  findnamebyid = (roomid) =>
			  {
			  	let houses = store.getState().houses,
			  		i = 0,
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
				case store.getState().self:
					notification.success(
					{
						message: `主人,会议室预定成功啦！！`,
						description: `${da.roomitem.starttime}~${da.roomitem.endtime} ${da.roomitem.username} ${name}`
					})
					break;
				default:
					notification.info(
					{
						message: `号外,号外,有人预定会议室啦！！`,
						description: `${da.roomitem.starttime}~${da.roomitem.endtime} ${da.roomitem.username} ${name}`
					})
			}

			store.dispatch(addroomwatch(da.roomitem));
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

Content.contextTypes =
{
	store: React.PropTypes.object.isRequired
}

export default Content;