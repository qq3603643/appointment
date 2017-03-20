import { error } from '../untils/message.jsx';

const ERROR_INFO = `你可能进入了一个假的网站，请刷新试试看 ,,Ծ‸Ծ,,`;

function createid()
{
	return '_randomid'+new Date().getTime()+''+Math.floor(Math.random()*899+100);
}
function createsocket()
{
	try
	{
		return io.connect(window.$GLOBALCONFIG.$ctx);
	}
	catch(er)
	{
		error(ERROR_INFO, 1e10);
	}

}
function User()
{
	this.init();
};

User.prototype =
{
	constructor: User,
	init: function()
	{
		this.userid = createid();
		this.username = null;
		this.socket = createsocket();
		this.socket.emit('login', { userid: this.userid });
	},
	setid: function(userid)
	{
		this.userid = userid;
	},
	setname: function(username)
	{
		this.username = username;
	},
	watchlogin: function(cb)
	{
		this.socket.on('login', cb);
	},
	watchlogout: function(cb)
	{
		this.socket.on('logout', cb);
	},
	addroom: function(data)
	{
		this.socket.emit('addroom', data);
	},
	watchroom: function(cb)
	{
		this.socket.on('addroom', cb);
	},
	watcherror: function(cb)
	{
		this.socket.on('error_room', cb);
	}
}

export default new User();