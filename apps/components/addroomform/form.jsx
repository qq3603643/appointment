import React from 'react';
import { connect } from 'react-redux';

import { Form, TimePicker, Input, Button } from 'antd';
import { error } from '../../untils/message.jsx';
import room from '../../untils/room.jsx';
import { formvisible } from '../../actions/form.jsx';
import user from '../../untils/user.jsx';
import { toMinutes, getHourMin, addMin } from '../../untils/common.jsx';

class From extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state =
	  {
	  	 roomid: '',
	  	 username: '',
	  	 starttime: (() =>
	  	 	{
	  	 		return getHourMin();
	  	 	})(),
	  	 endtime: (() =>
	  	 	{
	  	 		return addMin(getHourMin(), 60);
	  	 	})(),
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
		const { formvisible } = this.props;

		formvisible(!1)
	}
	submitHandler(ev)
	{
		/*
			TODOTODOTO 1. validate format
					   2. 是否有人已经预定

		    全局共用until-room.jsx里面返回的roomContainer 美滋滋
		**/

		let state_form = this.state,
			{ roomid, userid } = this.props;

		if(!state_form.username)
		{
			error('请输入你的名字╮(╯_╰)╭');
			return;
		}
		if(!state_form.starttime)
		{
			error('请输入开始时间╮(╯_╰)╭');
			return;
		}
		if(!state_form.endtime)
		{
			error('请输入结束时间╮(╯_╰)╭');
			return;
		}

		if(toMinutes(state_form.starttime) >= toMinutes(state_form.endtime))
		{
			error('结束时间需大于开始时间╮(╯_╰)╭');
			return;
		}

		const roomitem = Object.assign({}, state_form, { roomid: roomid });
		user.addroom(
			{
				userid: userid,
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
					<dt className="label"><span className="required">*</span>使用者:</dt>
					<dd className="control">
		            	<Input type="text" placeholder="请输入你的名字"
		            	       onChange={ this.usernameHandler.bind(this) }
            	        />
					</dd>
		        </dl>
				<dl className="form-item">
					<dt className="label"><span className="required">*</span>开始时间:</dt>
					<dd className="control">
		            	<TimePicker defaultValue={ this.state.starttime } format={format}
		            				disabledHours={ this.disHour.bind(this) }
		            			    onChange={ this.starttimeHandler.bind(this) }
		            	/>
					</dd>
		        </dl>
		        <dl className="form-item">
		            <dt className="label"><span className="required">*</span>结束时间:</dt>
					<dd className="control">
		            	<TimePicker defaultValue={ this.state.endtime } format={format}
		            				disabledHours={ this.disHour.bind(this) }
		            				onChange={ this.endtimeHandler.bind(this) }
		            	/>
					</dd>
		        </dl>
		        <dl className="form-item">
		        	<dt className="label">使用缘由:</dt>
					<dd className="control">
		            	<Input type="textarea" rows={4} placeholder="预定原因"
		            		   onChange={ this.reasonHandler.bind(this) }
		            	/>
					</dd>
		        </dl>
		        <p className="btn-group">
		        	<Button onClick={ this.cancel.bind(this) } style={ {marginRight: '4px'} }>
		        		取消
		        	</Button>
		        	<Button type="primary" onClick={ this.submitHandler.bind(this) }>
		        		确定
		        	</Button>
		        </p>
			</Form>
			);
	}
}

export default  connect((state, props) =>
	({
		userid: state.appoint.users.self,
		roomid: state.appoint.form.roomid
	}),
	(dispatch, ownProps) =>
	({
		formvisible: () => dispatch(formvisible())
	}))(From);