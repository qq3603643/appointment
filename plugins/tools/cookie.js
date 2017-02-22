define({
	/**
	 * 获取
	 * @param  {String} key
	 * @return {String} value
	 */
	get : function(_name){
		var arr,reg=new RegExp("(^| )"+_name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return arr[2];
		else
			return "";
	},
	/**
	 * 设置
	 * @param {String} key
	 * @param {String} value
	 * @param {Number} day 过期时间 天数
	 */
	set : function(_name,_value,_day){
		var Days = _day || 1;
		var exp = new Date();
		var domain = window.location.host;
		exp.setUTCHours("0");
		exp.setUTCMinutes("0");
		exp.setUTCSeconds("0");
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = _name + "=" + _value + ";path=/;domain=" + domain + ";expires=" + exp.toGMTString();
	},
	/**
	 * 删除
	 * @param  {String} key
	 */
	remove : function(_name){
		this.set(_name, "", -1);
	}
});