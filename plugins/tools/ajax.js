define([],function(){
	var Ajax = {
		/**
		 * [ajax 封装jquery的ajax方法]
		 * @param  {[type]} config [配置项]
		 */
		ajax : function(config,fn){
			$.ajax({
		        type: config.method,
		        url: config.url,
		        data: config.data,
		        dataType: config.dataType||'json' ,
		        beforeSend : config.beforeSend,
		        success: config.success,
		        error:function(){
		        	//console.log('网络错误')
		        	//console.log('网络错误')
		        }
		    }).always(fn);
		},
		/**
		 * [get 封装get方法]
		 * @param  {[type]} config [配置项]
		 * config ： {
		 * 	"url" : "url",
		 * 	"data" : {},
		 * 	"beforeSend" : function(){},
		 * 	"success" : function(){}
		 */
		get : function(config){
			config["method"] = "get";
			this._ajax(config);
		},
		/**
		 * [post 封装post方法]
		 * @param  {[type]} config [配置项]
		 * config ： {
		 * 	"url" : "url",
		 * 	"data" : {},
		 * 	"beforeSend" : function(){},
		 * 	"success" : function(){}
		 */
		post : function(config){
			config["method"] = "post";
			this._ajax(config);
		}
	}
	return Ajax;
});