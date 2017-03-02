
function createid()
{
	return new Date().getTime()+""+Math.floor(Math.random()*899+100);
}
function createsocket()
{
	return io.connect(window.$GLOBALCONFIG.$ctx);
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