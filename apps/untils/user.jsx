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
		this.userid = null;
		this.username = null;
		this.department = null;
		this.socket = createsocket();
		// this.socket.emit('login', { userid: this.userid });
	},
	setrandomid: function()
	{
		this.setid(createid());

		return this;
	},
	setrandomname: function()
	{
		this.setname(`guest${ this.userid.substr(-4) }`);

		return this;
	},
	setid: function(userid)
	{
		this.userid = userid;

		return this;
	},
	setname: function(username)
	{
		this.username = username;

		return this;
	},
	setdepartment: function(department)
	{
		this.department = department;

		return this;
	},
	comein: function(userid)
	{
		if(this.socket.connected == false)      /* 如果已经断开连接(已退出) 则重新连接 **/
			this.socket.open();
 			// this.socket = createsocket();

		this.setid(userid);
		this.socket.emit('login', { userid: this.userid });

		return this;
	},
	goout: function(cb)
	{
		this.socket.close();
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