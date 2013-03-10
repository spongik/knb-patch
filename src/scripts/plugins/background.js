$.knb.plugins.background = function () {

	$('body').addClass('backgroundChanged');
	
	$('.screenGlideContent')
		.css('background-image', 'url("' + chrome.extension.getURL('images/bg.jpg') + '")')
		.html('');

};