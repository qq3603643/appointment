/* stime: '10:00' **/
export function toMinutes(stime)
{
	const at = stime.split(/[^0-9]/);

	return at[0] * 60 + at[1] * 1;
}