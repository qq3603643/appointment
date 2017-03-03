import { error } from '../untils/message.jsx';

const ERROR_INFO = `你可能进入了一个假的网站，请刷新试试看 ,,Ծ‸Ծ,,`;

function createid()
{
	return new Date().getTime()+""+Math.floor(Math.random()*899+100);
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
		this.socket = createsocket();
		this.socket.emit('login', { userid: this.userid });
	},
	watchlogin: function(cb)
	{
		this.socket.on('login', cb);
	},
	watchlogout: function(cb)
	{
		this.socket.on('logout', cb)
	}
}

export default new User();