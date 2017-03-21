/*
	check user's status
	to home or to login
**/
import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { Progress } from 'antd';
import * as cookie from '../../untils/cookie.jsx';

import user from '../../untils/user.jsx';
import { fetchJSONByPost } from '../../untils/ajax.jsx';
import { error } from '../../untils/message.jsx';

require('./index.css');

let timerId_load;

class Welcome extends React.Component
{
	constructor(props)
	{
	  super(props);
	  this.state =
	  {
	  	load_precent: 10
	  };
	}
	toComplete(times)
	{
		clearInterval(timerId_load);

		return new Promise((resolve, reject) =>
		{
			timerId_load = setInterval(() =>
			{
				let _load = this.state.load_precent;

				if(_load < 100)
					this.setState(
					{
						load_precent: _load += 1
					});
				else
				{
					clearInterval(timerId_load);
					resolve();
				}
			}, times || 66)
		})
	}
	componentDidMount()
	{
		timerId_load = setInterval(() =>
			{
				let _load = this.state.load_precent;

                if(_load < 60)
            		this.setState(
	                {
	                	load_precent: _load += 3
	                })
            	if(_load < 80)
            		this.setState(
	                {
	                	load_precent: _load += 2
	                })
            	if(_load < 92)
            		this.setState(
	                {
	                	load_precent: _load += 1
	                })
            	else
            		clearInterval(timerId_load);
			}, 100);

		const userid = cookie.get('userid'),
			  { _self } = this.props;

		if(!userid)
		{
			error(`系统检测到您尚未登录，可能无法使用某些功能 (-_-)/~~~`);
			user.setrandomid().setrandomname();
			this.toComplete(22)
			    .then(() =>
			    	{
			    		hashHistory.push('home');
			    	});
			return;
		}

		//asyn fetch登录信息
		let toComplete = this.toComplete.bind(this);
		fetchJSONByPost('/loginCheck', { userid: userid })
			.then(res => res.json())
			.then(da =>
			{
				if(da.status == 1)
				{
					//judge login method, random or userid
					if(da.data)
						user.setid(da.data._id).setname(da.data.username).setdepartment(da.data.department);
					else
					{
						user.setrandomid().setrandomname();
						error(`同步用户信息失败，你可能需要重新登录 (-_-)/~~~`);
					}
				}
				toComplete(22)
				.then(() =>
					{
						hashHistory.push('home');
					});
			})
			.catch((er) =>
			{
				error(`同步用户信息失败，你可能需要重新登录 (-_-)/~~~`);
				user.setrandomid().setrandomname();
				toComplete(22)
				.then(() =>
					{
						hashHistory.push('home');
					});
			})
	}
	render()
	{
		return (
			<div className="loadwrap">
				<h2 className="tit">
					用户信息同步中，请稍等片刻（＃￣▽￣＃）
				</h2>
				<Progress  percent={ this.state.load_precent } status="active" />
			</div>
			);
	}
}

export default connect((state, props) =>
	({
		_self: state.appoint.users.self
	}),
	(dispatch, ownProps) =>
	({

	}))(Welcome);