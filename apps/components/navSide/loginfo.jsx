import React from 'react';
import { connect } from 'react-redux';

import { login } from '../../actions/user.jsx';

const $LOGOINFO = window.$GLOBALCONFIG.$LOGOINFO;

class Loginfo extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	componentDidMount()
	{
		this.props.login();
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
    	login: () => dispatch(login())
    })
    )(Loginfo);