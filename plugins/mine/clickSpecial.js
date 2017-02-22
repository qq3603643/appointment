//by xjc 2016-08-29
(function(factory){

	if(typeof define == 'function' && define.amd)
		define(['jquery'],factory);
	else if (typeof module === 'object' && module.exports)
		factory(require('jquery'));
	else
		factory(jQuery);
})(function($){

	$.fn.extend({

		'clickSpecial': function(times){

			// var _this = this;
			//_this.eq(0).get(0) = _this.get(0) = _this[0] = 原生element
			if(!('transition' in this[0].style)) return;

			this.on('click',function(e){

				var $self = $(this);
				if($self.find('.maskForSpecialClick').size()==0)
				{
					if($self.css('position')=='static') $self.css('position','relative');
					$self.css('overflow','hidden').append($('<i>',{ class: 'maskForSpecialClick' }));

					if($('style[class="clickSpecialStyle"]').size()==0)
					{
						var $inteSize = Math.max(this.clientWidth,this.clientHeight)*2.2,
							$style = $('<style class="clickSpecialStyle">').html('.maskForSpecialClick{ position: absolute;width: '+ $inteSize +'px;height: '+ $inteSize +'px;border-radius: 50%;background: rgba(0,0,0,.4);opacity: 0; }.maskForSpecialClick.scale{ transform: scale(0);opacity: 1; }');
						$('head').append($style);
					}
				}
				var $mask = $self.find('.maskForSpecialClick');
				if(!$mask.hasClass('scale'))
					$mask.css({
						'transition':'0s'
					}).addClass('scale');

				var
					pos   = this.getBoundingClientRect(),
					left  = pos.left,
					top   = pos.top,
					eX    = e.clientX,
					eY    = e.clientY,

					iLeft = eX - left - $mask.get(0).clientWidth/2,
					iTop  = eY - top - $mask.get(0).clientHeight/2,
					timer = null;

				$mask.css({
					'left': iLeft + 'px',
					'top': iTop + 'px'
				});
				clearTimeout(timer);
				timer = setTimeout(function(){

					$mask.css('transition',times ? times/1000 + 's' : '.6s').removeClass('scale');
				},20)
			})
		}
	});
})