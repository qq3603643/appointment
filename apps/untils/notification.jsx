import { notification } from 'antd';

notification.config(
{
	duration: 0
})

const { open, close, error, info, success } = notification;
export {
	open,
	close,
	error,
	info,
	success
};
