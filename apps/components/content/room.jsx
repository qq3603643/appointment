import React from 'react';
import { Progress, Button } from 'antd';

class RoomItem extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		const house = this.props.house;

		return (
			<li className="room">
				<h2 className="roomname">{ house.roomname }</h2>
				<div className="detail">
					<div className="chart">
						<Progress type="circle" percent={ 76 } />
					</div>
					<div className="text">
						<p className="piece">
							<span className="time">14:00~15:00</span>
							<span className="name">小黑</span>
						</p>
						<p className="piece">
							<span className="time">8:00~9:00</span>
							<span className="name">小明</span>
						</p>
						<p className="piece">
							<span className="time">11:00~12:00</span>
							<span className="name">小方</span>
						</p>
						<p className="piece">
							<span className="time">14:00~15:00</span>
							<span className="name">小黑</span>
						</p>
						<p className="piece">
							<span className="time">14:00~15:00</span>
							<span className="name">小黑</span>
						</p>
						<p className="piece">
							<span className="time">14:00~15:00</span>
							<span className="name">小黑</span>
						</p>
					</div>
				</div>
				<div className="btn-group">
					<Button type="primary">我要预定</Button>
				</div>
			</li>
			);
	}
}

export default RoomItem;