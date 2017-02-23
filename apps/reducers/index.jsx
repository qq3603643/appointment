const reducer = (state, order) =>
{
	const { type } = order;
	switch(type)
	{
		case 'Change_Tit':
			return Object.assign({}, state, { data: order.data });
			break;
		default :
			return state;
	}

}

export default reducer;