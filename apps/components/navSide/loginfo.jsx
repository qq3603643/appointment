import React from 'react';
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
		const store = this.context.store;
		store.dispatch(login());
	}
	render()
	{
		const store = this.context.store,
			  state = store.getState();
		return (
			<div className="logoWrap">
				<img className="logo" src={ $LOGOINFO.logoSrc }/>
				<p className="info">
					<span className="txt">online</span>
					<span className="online">
						<em className="onlineCount">
						{ state.users.onlineCount }
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

export default Loginfo;