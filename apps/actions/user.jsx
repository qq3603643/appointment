import user from '../untils/user.jsx';
import * as message from '../untils/message.jsx';

/* Abandoned **/
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
			dispatch({ type: 'logout_watch', onlineCount: da.onlineCount });
		})
	}
}

const comein = (userid) => (dispatch, getState) =>
{
	user.comein(userid);
}
const setid = () => (dispatch, getState) =>
{
	dispatch({ type: 'self_set', userid: user.userid })
}
const setname = () => (dispatch, getState) =>
{
	dispatch({ type: 'selfname_set', username: user.username })
}
const setOnlineCount = (onlineCount) => (dispatch, getState) =>
{
	dispatch({ type: 'onlineCount_set', onlineCount: onlineCount })
}
const setDepartment = () => (dispatch, getState) =>
{
	dispatch({ type: 'department_set', department: user.department })
}

export {
	login,
	setid,
	setname,
	setOnlineCount,
	setDepartment
}