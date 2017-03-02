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
		default :
			return state;
	}

}

export default reducer;