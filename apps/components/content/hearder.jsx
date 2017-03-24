import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { del as delCookie } from '../../untils/cookie.jsx';
import { info } from '../../untils/message.jsx';
import user from '../../untils/user.jsx';
import { setid, setname } from '../../actions/user.jsx';

class Hearder extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	tabLoginStatusHandler(ev)
	{
		const _self   = ev.currentTarget,
			  _status = _self.getAttribute('data-loginstatus');

		//sign in
		if(_status == '0')
		{
			hashHistory.push('login');

			return;
		}

		//sigun out
		user.goout();
		user.setrandomid().setrandomname();

		const { setid, setname } = this.props;

		setid();setname();
		delCookie('userid');
		info('您已退出登录');
	}
	render()
	{
		let userid = this.props.user.self,
			operate,
			status_login;

		operate = userid.startsWith('_randomid')
		          ? '登录'
		          : '退出'
		          ;
        status_login = userid.startsWith('_randomid')
        			   ? '0'
        			   : '1'
        			   ;
		return (
			<div className="hearder">
				会议室预定系统 @ v 0.0.1
				<p className="userInfo">
					<span className="username">
						{ this.props.user.selfname },
					</span> 你好&ensp;<span className="grey">|</span>&ensp;
					<span className="operate"
					      data-loginstatus={ status_login }
					      id='ssss'
						  onClick={ this.tabLoginStatusHandler.bind(this) }>
						{ operate }
					</span>
				</p>
			</div>
			);
	}
}

export default connect((state, props) =>
	({
		user: state.appoint.users
	}),
	(dispatch, nextProps) =>
	({
		setid: () => dispatch(setid()),
		setname: () => dispatch(setname())
	}))(Hearder);