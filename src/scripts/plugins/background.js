$.knb.plugins.background = {};

$.knb.plugins.background.async = true;
$.knb.plugins.background.run = function () {

	$('body').addClass('backgroundChanged');
	
	$('.screenGlideContent')
		.css('background', 'url("' + chrome.extension.getURL('images/bg-snow.png') + '")')
		.find('a').remove();
	$('.screenGlideContent').find('#header-flash').remove();
	$(window).scroll(function(){
		if($(window).scrollTop()>=400 || window.location.pathname!='/'){
			$('.screenGlide').css('position','fixed').css('top','0px');
		}else{
			$('.screenGlide').css('position','absolute').css('top','440px');
		}
	});
};