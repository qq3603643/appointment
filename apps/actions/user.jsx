import user from '../untils/user.jsx';
import * as message from '../untils/message.jsx';

const login = () =>
{
	return function(dispatch, getState)
	{
		dispatch({ type: 'login', userid: user.userid });
		user.watchlogin(da =>
		{
			if(da.userid == user.userid)
				message.success(`you are visitor ${ da.onlineCount }, welcome you.`);

			dispatch({ type: 'login_watch', onlineCount: da.onlineCount });
		})
		user.watchlogout(da =>
		{
			dispatch({ type: 'login_watch', onlineCount: da.onlineCount });
		})
	}
}

export {
	login,
}