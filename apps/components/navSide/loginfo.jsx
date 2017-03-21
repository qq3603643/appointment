import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { setOnlineCount } from '../../actions/user.jsx';
import { success } from '../../untils/message.jsx';

const $LOGOINFO = window.$GLOBALCONFIG.$LOGOINFO;

class Loginfo extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		const users = this.props.users;
		return (
			<div className="logoWrap">
				<img className="logo" src={ $LOGOINFO.logoSrc }/>
				<p className="info">
					<span className="txt">online</span>
					<span className="online">
						<em className="onlineCount">
						{ users.onlineCount }
						</em> 人在线
					</span>
				</p>
			</div>
			);
	}
}

Loginfo.contextTypes =
{
	store: React.PropTypes.object.isRequired
}

export default connect((state, props) =>
	({
		users: state.appoint.users
	}),
    (dispatch, ownProps) =>
    ({
    })
    )(Loginfo);