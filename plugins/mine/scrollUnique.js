(function(factory){

	if(typeof define == 'function' && define.amd)
		define(['jquery'],factory);
	else if(typeof module == 'object' && module.exports)
		factory(require('jquery'));
	else
		factory(jQuery);
})(function($,undefined){

	$.fn.extend({
		'scrollUnique': function()
						{
							var typeEvent = document.mozHidden != undefined ? 'DOMMouseScroll' : 'mousewheel',
								handleScroll = function(e)
								{
									var _this = this,
										height = _this.clientHeight,
										heightFull = _this.scrollHeight,
										scrollTop = _this.scrollTop;

									var delta = e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail || 0);
									//普通向上为正 向下为负
									if((delta>0 && scrollTop<=delta) || (delta<0 && heightFull- height - scrollTop <= -delta))
									{
										_this.scrollTop = delta>0 ? 0 : heightFull;
										e.preventDefault();
									}
								};
							this.on(typeEvent, handleScroll);
						}
	});
})