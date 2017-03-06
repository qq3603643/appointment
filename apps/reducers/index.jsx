const reducer = (state, order) =>
{
	const { type } = order;
	switch(type)
	{
		case 'login':
			return Object.assign({}, state, { self: order.userid })
			break;
		case 'login_watch':
			return Object.assign({}, state, { users: { onlineCount: order.onlineCount } })
			break;
		case 'houses_getall':
			return Object.assign({}, state, { houses: order.houses });
			break;
		case 'rooms_getall':
			return Object.assign({}, state, { rooms: order.rooms });
			break;
		case 'Change_Tit':
			return Object.assign({}, state, { data: order.data });
			break;
		case 'formvisible_control':
			return Object.assign({}, state, { form: order.form })
			break;
		case 'addroom_watch':
			let _rooms = state.rooms;

			_rooms.push(order.addroom);
			return Object.assign({}, state, { rooms: _rooms });
		default :
			return state;
	}

}

export default reducer;