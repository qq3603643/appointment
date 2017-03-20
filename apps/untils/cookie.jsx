function set(o)
{
	function _set(name, key, days)
	{
		let exp = new Date(),
			_exp = exp.setTime( exp.getTime() + days * 24 * 6 * 6 * 1e5 );

		document.cookie = `${ name }=${ escape(key) };expires=${ new Date(_exp).toUTCString() }`;
	}
	for(let k in o)
	{
		if(o.hasOwnProperty(k))
			_set(k, o[k], o['days'] || 30)
	}
}

function get(name)
{
	let arr,
		re = new RegExp(`(^|)${name}=([^;]*)(;|$)`);

	arr = document.cookie.match(re);

	try{ return unescape(arr[2]) }
	catch(er){ return null; }
}

function del(sName)
{
	set({[sName]: '', days: -1})
}

export {
	set,
	get,
	del
}