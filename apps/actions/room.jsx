import { fetchJSONByPost, fetchJSONByGet } from '../untils/ajax.jsx';
import { error } from '../untils/message.jsx';

const ERROR_INFO = `你可能进入了一个假的网站，请刷新试试看 ,,Ծ‸Ծ,,`;

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
		   	 	 	error(ERROR_INFO);
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
	       			 error(ERROR_INFO);
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