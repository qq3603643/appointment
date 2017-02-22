define({
	hname:location.hostname?location.hostname:'localStatus',
	isLocalStorage:window.localStorage?true:false,
	dataDom:null,
	initDom:function(){ //初始化userData
		if(!this.dataDom){
			try{
				this.dataDom = document.createElement('input');
				this.dataDom.type = 'hidden';
				this.dataDom.style.display = "none";
				this.dataDom.addBehavior('#default#userData');
				document.body.insertBefore(this.dataDom, document.body.firstChild);
			}catch(ex){
				return false;
			}
		}
		return true;
	},
	/**
	 * 设置
	 * @param {String} key
	 * @param {String} value
	 */
	set:function(_key,_value){
		if(this.isLocalStorage){
			var value=arguments[0];
			if(arguments.length==1&&(typeof value).toLowerCase().indexOf('object')>-1){
				for(var key in value){
					localStorage.setItem(key,value[key]);
				}
				return value;
			}
			window.localStorage.setItem(_key,_value);
		}else{
			if(this.initDom()){
				this.dataDom.load(this.hname);
				this.dataDom.setAttribute(_key,_value);
				this.dataDom.save(this.hname);
			}
		}
	},
	/**
	 * 获取
	 * @param  {String} key
	 * @return {String} value
	 */
	get:function(_key){
		if(this.isLocalStorage){
			return window.localStorage.getItem(_key);
		}else{
			if(this.initDom()){
				this.dataDom.load(this.hname);
				return this.dataDom.getAttribute(_key);
			}
		}
	},
	/**
	 * 删除
	 * @param  {String} key
	 */
	remove:function(_key){
		if(this.isLocalStorage){
			localStorage.removeItem(_key);
		}else{
			if(this.initDom()){
				this.dataDom.load(this.hname);
				this.dataDom.removeAttribute(_key);
				this.dataDom.save(this.hname);
			}
		}
	}
});