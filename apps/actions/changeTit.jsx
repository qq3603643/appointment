import { fetchJSONByPost, fetchJSONByGet } from '../untils/ajax.jsx';

const changeTit = () =>
{
	return function(dispatch, getState)
	{
		return fetchJSONByPost('/getInfo', { 'name': 'apple' })
			   .then( res => res.json() )
			   .then((da) =>
			   {
		   		 dispatch({
		   		 	type: 'Change_Tit',
		   		 	data: da.name
		   		 });
			   })
	}
}

export default changeTit;