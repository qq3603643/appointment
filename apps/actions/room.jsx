import { fetchJSONByPost, fetchJSONByGet } from '../untils/ajax.jsx';

const getallhouse = () =>
{
	return (dispatch, getState) =>
	{
		return fetchJSONByPost('/getallhouse')
			   .then(res => res.json())
			   .then(da =>
			   {
			   	 if(da.status != 1)
		   	 	 {
		   	 	 	//errer deal
		   	 	 	return;
		   	 	 }
			   	 dispatch({ type: 'houses_getall', houses: da.data })
			   })
	}
}

const getallroom = () =>
{
	return (dispatch, getState) =>
	{
		return fetchJSONByPost('/getall')
		       .then(res => res.json())
		       .then(da =>
		       {
		       	 if(da.status != 1)
	       		 {
	       			//err deal
	       			 return;
	       		 }
	       		 dispatch({ type: 'rooms_getall', rooms: da.data })
		       })
	}
}

export {
	getallhouse,
	getallroom
}