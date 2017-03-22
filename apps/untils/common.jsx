/* stime: '10:00' **/
export function toMinutes(stime)
{
	const at = stime.split(/[^0-9]/);

	return at[0] * 60 + at[1] * 1;
}

export function to2(s)
{
	return s < 10 ? '0'+s : s;
}

export function getHourMin()
{
	const d  = new Date(),
		  _h = d.getHours(),
		  _m = d.getMinutes();

	return [to2(_h), to2(_m)].join(':');
}

/* tStr hh:ii 格式 n增加的分钟 **/
export function addMin(tStr, n)
{
	let _tList = tStr.split(/[^0-9]+/),
		_h     = _tList[0]*1,
		_m     = _tList[1]*1 + n;

	let _h_new = _h + ~~(_m / 60),
		_m_new = _m % 60;

	return [to2(_h_new), to2(_m_new)].join(':');
}

export function isoverlap(n, min, max)
{
	return n >= min && n <= max;
}

export function sTrim(s)
{
	return s.replace(/^\s\s*/, '').replace(/\s*\s$/, '');
}

export function buildParams(obj) {
  if (!obj) {
    return ''
  }
  const params = []
  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      const value = obj[key] === undefined ? '' : obj[key]
      params.push(`${key}=${value}`)
    }
  }
  return params.join('&')
}
