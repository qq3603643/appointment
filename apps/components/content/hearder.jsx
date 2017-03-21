import React from 'react';
import { connect } from 'react-redux';

class Hearder extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	componentDidMount()
	{
		console.log(this.props)
	}
	render()
	{
		return (
			<div className="hearder">
				会议室预定系统 @ v 0.0.1
				<p className="userInfo">
					<span className="username">
						{ this.props.user.selfname },
					</span> 你好
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

	}))(Hearder);