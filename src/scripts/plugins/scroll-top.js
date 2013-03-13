$.knb.plugins.scrollTop = function (){
	$('body').append('<a href="#" id="scroll-top-btn"><span>&uarr;</span>наверх</a>');
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('#scroll-top-btn').css('opacity', '0.4');
		} else {
			$('#scroll-top-btn').css('opacity', '0');
		}
	}).trigger('scroll');
	$('#scroll-top-btn').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});
};