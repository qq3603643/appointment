(function(factory){

	if(typeof define == 'function' && define.amd)
		define(['jquery'],factory);
	else if(typeof module == 'object' && module.export)
		define(require('jquery'));
	else
		factory(jQuery);
})(function($){

	$.fn.extend({
		'titleFollow': function(){
			var title = (function(){
				var
				titleE = {
					show: function(e){
						var $this = $(this);

						$this.data('title', $this.attr('title'));
						$this.removeAttr('title');
						if($('.followBoxForTitle').size() == 0)
							$('body').append($('<div>',{
								class: 'followBoxForTitle',
								html: $this.data('title'),
							})).find('.followBoxForTitle')
							   .css({
							   	position: 'fixed',
							   	left: e.clientX - 20,
							   	top: e.clientY + 20,
							   	background: 'rgba(0, 0, 0, .6)',
							   	filter:'progid:DXImageTransform.Microsoft.gradient(enabled="true",startColorstr="#99000000", endColorstr="#99000000")',
							   	color: '#fff',
							   	padding: '4px 16px',
							   	borderRadius: '3px',
							   	maxWidth: '250px',
							   	font: '12px/20px microsoft yahei',
							   	boxShadow: '0 1px 1px rgba(0, 0, 0, .4)'
							   });
					    else
					    	$('.followBoxForTitle').html($this.data('title'))
					    						   .css({
					    								left: e.clientX - 20,
													   	top: e.clientY + 20,
					    							})
					    						   .show();
					    e.preventDefault();
					},
					hide: function(){

						$('.followBoxForTitle').hide();
					}
				};
				return {
					show: titleE.show,
					hide: titleE.hide
				};
			})();
			this.on({
				'mousemove': title.show,
				'mouseleave': title.hide
			})
		}
	});
})