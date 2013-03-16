$.knb.plugins.background = {};

$.knb.plugins.background.async = false;
$.knb.plugins.background.run = function () {

	$('body').addClass('backgroundChanged');
	
	$('.screenGlideContent')
		.css('background-image', 'url("' + chrome.extension.getURL('images/bg.jpg') + '")')
		.html('');

};