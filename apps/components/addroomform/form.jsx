import React from 'react';
import { Form, TimePicker, Input, Button } from 'antd';
import { error } from '../../untils/message.jsx';
import room from '../../untils/room.jsx';
import { formvisible } from '../../actions/form.jsx';
import user from '../../untils/user.jsx';

class From extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state =
	  {
	  	 roomid: '',
	  	 username: '',
	  	 starttime: '09:00',
	  	 endtime: '18:00',
	  	 reason: ''
	  };
	}
	usernameHandler(ev)
	{
		this.setState({ username: ev.currentTarget.value });
	}
	starttimeHandler(t, st)
	{
		this.setState({ starttime: st });
	}
	endtimeHandler(t, st)
	{
		this.setState({ endtime: st });
	}
	reasonHandler(ev)
	{
		this.setState({ reason: ev.currentTarget.value });
	}
	cancel()
	{
		const store = this.context.store;

		store.dispatch(formvisible(!1));
	}
	submitHandler(ev)
	{
		/*
			TODOTODOTO 1. validate format
					   2. 是否有人已经预定

		    全局共用until-room.jsx里面返回的roomContainer 美滋滋
		**/

		let state_form = this.state,
			store = this.context.store,
			state_global = store.getState();

		if(!state_form.username)
		{
			error('fill yourname, please');
			return;
		}
		if(!state_form.starttime)
		{
			error('fill the starttime');
			return;
		}
		if(!state_form.endtime)
		{
			error('fill the endtime');
			return;
		}

		/*
			检测是否已有 jump now
		**/

		const roomitem = Object.assign({}, state_form, { roomid: state_global.form.roomid });
		user.addroom(
			{
				userid: state_global.self,
				roomitem: roomitem
			});
		this.cancel();
	}
	disHour()
	{
		return [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23];
	}
	render()
	{
		const format = 'HH:mm';
		return(
			<Form>
				<dl className="form-item">
					<dt className="label"><span className="required">*</span>yourname:</dt>
					<dd className="control">
		            	<Input type="text" placeholder="yourname"
		            	       onChange={ this.usernameHandler.bind(this) }
            	        />
					</dd>
		        </dl>
				<dl className="form-item">
					<dt className="label"><span className="required">*</span>starttime:</dt>
					<dd className="control">
		            	<TimePicker defaultValue={ '09:00' } format={format}
		            				disabledHours={ this.disHour.bind(this) }
		            			    onChange={ this.starttimeHandler.bind(this) }
		            	/>
					</dd>
		        </dl>
		        <dl className="form-item">
		            <dt className="label"><span className="required">*</span>endtime:</dt>
					<dd className="control">
		            	<TimePicker defaultValue={ '18:00' } format={format}
		            				disabledHours={ this.disHour.bind(this) }
		            				onChange={ this.endtimeHandler.bind(this) }
		            	/>
					</dd>
		        </dl>
		        <dl className="form-item">
		        	<dt className="label">renson:</dt>
					<dd className="control">
		            	<Input type="textarea" rows={4} placeholder="your reason"
		            		   onChange={ this.reasonHandler.bind(this) }
		            	/>
					</dd>
		        </dl>
		        <p className="btn-group">
		        	<Button onClick={ this.cancel.bind(this) } style={ {marginRight: '4px'} }>
		        		Cancel
		        	</Button>
		        	<Button type="primary" onClick={ this.submitHandler.bind(this) }>
		        		Sumit
		        	</Button>
		        </p>
			</Form>
			);
	}
}

From.contextTypes =
{
	store: React.PropTypes.object.isRequired
}

export default From;