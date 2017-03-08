/*
	roomitem { roomid, roomname, username, reason, startime, endtime }
**/
import { toMinutes } from './common.jsx';
function Room(obj)
{
	this.rooms = [];
	this.minTime = '09:00';
	this.maxTime = '18:00';
	this.totaltime = toMinutes(this.maxTime) - toMinutes(this.minTime);
	Object.assign(this, obj);
}

Room.prototype =
{
	constructor: Room,
	size: function()
	{
		return this.rooms.length;
	},
	isEmpty: function()
	{
		return this.size() == 0;
	},
	groupByid: function()
	{
		if(this.isEmpty())
			return {};
		return this.rooms.reduce(function(rst, roomitem)
			{
				let _v = roomitem['roomid'];

				if(!rst.hasOwnProperty(_v))
					rst[_v] = [roomitem];
				else
					rst[_v].push(roomitem);

				return rst;
			}, new Object)
	},
	/* eg str 08:00 end:09:30 **/
	diftime: function(str, end)
	{
		if(!str || !end)	return 0;

		let a1 = str.split(/[^0-9]+/).map(a=>a*1),
			a2 = end.split(/[^0-9]+/).map(a=>a*1);

		return (a2[0]-a1[0])*60 + (a2[1]-a1[1])*1;
	},
	resttimeByid: function()
	{
		const rooms   = this.groupByid(),
			  total   = this.totaltime,
			  diftime = this.diftime;

		for(let k in rooms)
	    {
	    	if(rooms.hasOwnProperty(k))
	    	{
	    		let v = rooms[k];

		    	rooms[k] = v.reduce(function(t, roomitem)
		    	{
		    		return t-diftime(roomitem.starttime, roomitem.endtime);
		    	}, total)
	    	}
	    }

	    for(let k in rooms)
    	{
    		if(rooms.hasOwnProperty(k))
			{
				rooms[k] = Math.round(rooms[k] / total * 1e4) / 1e4;
			}
    	}

	    return rooms;
	},
	isRepeat: function(roomid, str, end)
	{

	}
}

export default new Room();
