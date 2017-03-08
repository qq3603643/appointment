/* stime: '10:00' **/
export function toMinutes(stime)
{
	const at = stime.split(/[^0-9]/);

	return at[0] * 60 + at[1] * 1;
}

export function getHourMin()
{
	const d  = new Date(),
		  _h = d.getHours(),
		  _m = d.getMinutes();

	return [_h, _m].join(':');
}

export function isoverlap(n, min, max)
{
	return n >= min && n <= max;
}
