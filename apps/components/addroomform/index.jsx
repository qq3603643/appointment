import React from 'react';
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
		const store = this.context.store,
			  state = store.getState(),
			  visible = state.form.visible,
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

FormContainer.contextTypes =
{
	store: React.PropTypes.object.isRequired
}

export default FormContainer;