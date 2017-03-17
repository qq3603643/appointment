import React from 'react';
import { connect } from 'react-redux';

import Form from './form.jsx';

require('./index.css');

class FormContainer extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		const { visible } = this.props,
			  style = { display: visible ? 'block' : 'none' };

		return (
				<div className="mask-form" style={ style }>
					<div className="wrap-form">
						<h4 className="tit">预约信息填写</h4>
						<Form />
					</div>
				</div>
			);
	}
}

export default connect((state, props) =>
	({
		visible: state.appoint.form.visible
	}),
	(dispatch, ownProps) =>
	({

	}))(FormContainer);