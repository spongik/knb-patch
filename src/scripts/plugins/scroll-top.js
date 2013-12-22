$.knb.plugins.scrollTop = {};

$.knb.plugins.scrollTop.async = true;
$.knb.plugins.scrollTop.run = function (){
	$('body').append('<a href="#" id="scroll-top-btn"><span>&uarr;</span>наверх</a>');
	if(window.location.pathname == '/'){
        $('body').append('<a href="#" id="scroll-video-btn">К видео</a>');
        $('body').append('<a href="#" id="scroll-article-btn">К статьям</a>');
        $('body').append('<a href="#" id="scroll-pub-btn">К Пабу</a>');
    }
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
	$('#scroll-video-btn').click(function(e){
		e.preventDefault();
		var targetScroll = $('.page-content-grid:eq(1)').offset();
		targetScroll = targetScroll['top'] - 40;
		$("html, body").animate({ scrollTop: targetScroll }, 600);
		return false;
	});
	$('#scroll-article-btn').click(function(){
        var targetScroll = $('.usefull-blocks').offset();
        targetScroll = targetScroll['top'] - 40;
        $("html, body").animate({ scrollTop: targetScroll }, 600);
		return false;
	});
    $('#scroll-pub-btn').click(function(){
        var targetScroll = $('.page-content-grid:eq(2)').offset();
        targetScroll = targetScroll['top'] - 150;
        $("html, body").animate({ scrollTop: targetScroll }, 600);
        return false;
    });
};