const formvisible = (isShow, roomid) =>
{
	let _o = {};
	if(roomid)
		_o.roomid = roomid;
	_o.visible = isShow;

	return (dispatch, getState) =>
	{
		dispatch({ type: 'formvisible_control', form: _o });
	}
}

export {
	formvisible
}