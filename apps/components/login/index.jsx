import React from 'react';
import { hashHistory } from 'react-router';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { sTrim, buildParams } from '../../untils/common.jsx';
import { error, success } from '../../untils/message.jsx';
import { fetchJSON } from '../../untils/ajax.jsx';

import user from '../../untils/user.jsx';

require('./index.css');

const FormItem = Form.Item;

class Login extends React.Component
{
	constructor(props)
	{
	  super(props);
	  this.state =
	  {
	  	isAjaxing: !1
	  };
	}
	submitHandler(e)
	{
		e.preventDefault();

		let { isAjaxing } = this.state;

		if(isAjaxing)
			return;

		const { validateFields } = this.props.form;

		validateFields((error, values) =>
		{
			if(error)
				console.log(error)
			else
			{
				this.setState({ isAjaxing: !0 });
				_submit(values);
			}
		})

		const _this = this;

		function _submit(values)
		{
			fetchJSON('/login/validate', { credentials: 'include', method: 'post', body: buildParams(values) })
				.then(res => res.json())
				.then(da =>
				{
					if(da.status == 1 && da.data)
					{
						const da = da.data;
						user.setid(da._id).setname(da.username).setDepartment(da.department);

						success(`${ da.username }您好 `);
						setTimeout(() =>
							{

							}, 1000)
					}
					else
						error(`${ da.msg }   (￣.￣)`);

					_this.setState({ isAjaxing: !1 });
				})
				.catch(err =>
				{
					console.log(err);
					error('encounter a unkown error (￣.￣)');

					_this.setState({ isAjaxing: !1 });
				})
		}
	}
	render()
	{
		const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

		const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

		const nameprops = getFieldProps('username',
			  {
				 rules:
				 [
					 { required: !0, whitespace: !1, message: '请输入你的名字╮(╯_╰)╭' }
				 ],
				 validateTrigger: 'onChange',
				 onChange(ev)
				 {
				 	let _this = ev.currentTarget,
				 		_sV   = _this.value;

			 		_this.value = sTrim(_sV);
				 }
			  }),
			  passwordprops = getFieldProps('password',
			  {
			  	 rules:
			  	 [
			  	 	{ required: !0, message: '请输入密码╮(╯_╰)╭' }
			  	 ]
			  });

		return (
			<Form className="login-form" onSubmit={ this.submitHandler }>
				<FormItem
					{ ...formItemLayout }
					label="用户名"
					hasFeedback
					help={ (getFieldError('username') || []).join(',') }
				>
					<Input { ...nameprops } placeholder="用户名" />
				</FormItem>

				<FormItem
					{ ...formItemLayout }
					label="密码"
					hasFeedback
					help={ (getFieldError('password') || []).join(',') }
				>
					<Input type="password" { ...passwordprops } placeholder="密码" />
				</FormItem>
				<FormItem
					wrapperCol={ { span: 20, offset: 4 } }
				>
					<Button type="primary" htmlType="button" className="login-form-button"
							loading={ this.state.isAjaxing }
							onClick={ this.submitHandler.bind(this) }
					>
		              Log in
		            </Button>
				</FormItem>
			</Form>
			);
	}
}

const WrappedLoginForm = Form.create()(Login);

export default WrappedLoginForm;