import React from 'react';

const $LOGOINFO = window.$GLOBALCONFIG.$LOGOINFO;

class TopLogo extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		return (
			<div className="logoWrap">
				<img className="logo" src={ $LOGOINFO.logoSrc }/>
				<p className="info">
					{ $LOGOINFO.versonDes }
				</p>
			</div>
			);
	}
}

export default TopLogo;