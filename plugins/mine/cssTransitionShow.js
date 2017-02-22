
(function(factory){

	if(typeof define == 'function' && define.amd)
		define(['jquery'],factory);
	else if(typeof module == 'object' && module.export)
		factory(require('jquery'));
	else
		factory(jQuery);
})(function($){

	$.fn.extend({
		'cssTransitionShow': function(fn){

			 function handleShow()
			 {
			 	var _this = this,
			 		$this = $(_this),
			 		_heightOrigin,
			 		_heightTarget,
			 		_heightShow;

		 		if(!$this.is(':visible'))
	 			{
	 				$this.show();
	 				_heightOrigin = 0;
	 			}
	 			else
 				{
 					_heightOrigin = _this.clientHeight;
 				}

 				_heightShow = _this.clientHeight;
		 		fn && fn.call(_this);
		 		$this.css('height', 'auto');
		 		_heightTarget = Math.max(_heightShow, _this.clientHeight);

		 		$this.css({
		 			'height': _heightOrigin + 'px',
		 			'transition': 'height 0s'
		 		});

		 		setTimeout(function(){
		 			$this.css({
			 			'height': _heightTarget + 'px',
			 			'transition': 'height .6s cubic-bezier(0.865, 0.030, 0.390, 0.835)'
			 		});
		 		},0);
			 };

			 this.each(handleShow);
		}
	});
})