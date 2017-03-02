import { message } from 'antd';

message.config({ duration: 3 });

const { destory, error, info, loading, success, warn, warning } = message;

export {
	destory, error, info, loading, success, warn, warning
};