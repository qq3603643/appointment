import { fetchJSONByPost, fetchJSONByGet } from '../untils/ajax.jsx';
import { error } from '../untils/message.jsx';
import { toMinutes } from '../untils/common.jsx';

const $ERROR_INFO = `你可能进入了一个假的网站，请刷新试试看 ,,Ծ‸Ծ,,`;

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
		   	 	 	error($ERROR_INFO);console.log(`encounter error to getallhouses`);
		   	 	 	return;
		   	 	 }

			   	 dispatch({ type: 'houses_getall', houses: da.data.sort((a, b)=>a.roomid-b.roomid) })
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
	       			 error($ERROR_INFO);console.log(`encounter error to getallrooms`);
	       			 return;
	       		 }
	       		 dispatch({ type: 'rooms_getall', rooms: da.data.sort((a, b)=>toMinutes(a.starttime)-toMinutes(b.starttime)) })
		       })
	}
}

const addroom = (o) =>
{
	return (dispatch, getState) =>
	{
		dispatch({ type: 'addroom_watch', addroom: o });
	}
}

export {
	getallhouse,
	getallroom,
	addroom
}