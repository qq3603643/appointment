import React from 'react';
import { connect } from 'react-redux';
// import Test from './Test.jsx';
import NavSide from './navSide/index.jsx';
import Content from './content/index.jsx';
import FormContainer from './addroomform/index.jsx';

import { hashHistory } from 'react-router';
import { setid, setname, setDepartment } from '../actions/user.jsx';
import user from '../untils/user.jsx';
import { setOnlineCount } from '../actions/user.jsx';
import { success } from '../untils/message.jsx';

require('../css/reset.css');

class App extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	componentWillMount()
	{
		if(user.userid == null)
		{
			hashHistory.push('');
			return;
		}
		user.comein(user.userid);
		const { setid, setname, setDepartment } = this.props;
		setid();setname();setDepartment();

		const { setOnlineCount } = this.props;

		user.watchlogout((da) =>
		{
			setOnlineCount(da.onlineCount);
		})
		user.watchlogin((da) =>
		{
			if(da.userid == user.userid)
				success(`you are visitor ${ da.onlineCount }th, welcome you ヽ(^o^)丿`);

			setOnlineCount(da.onlineCount);
		})
	}
	render()
	{
		return (
			<div className="wrapper">
				<NavSide />
				<Content />
				<FormContainer />
			</div>
			);
	}
}

export default connect((state, props) =>({}), (dispatch, nextProps) =>
	({
    	setOnlineCount: (...args) => dispatch(setOnlineCount(...args)),
    	setid: () => dispatch(setid()),
    	setname: () => dispatch(setname()),
    	setDepartment: () => dispatch(setDepartment())
	}))(App);