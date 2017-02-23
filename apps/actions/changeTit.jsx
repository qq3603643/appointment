import fetch from 'isomorphic-fetch';

const changeTit = () =>
{
	return function(dispatch, getState)
	{
		return fetch('http://localhost:2234/getInfo')
			   .then(res => res.json())
			   .then(json => {
			   	 dispatch({
			   	 	type: 'Change_Tit',
			   	 	data: json.name
			   	 })
			   })
	}
}

export default changeTit;