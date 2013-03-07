$(function() {

	// change background color and remove link
	$('.screenGlideContent')
		.css('background-image', 'url("' + chrome.extension.getURL('images/bg.jpg') + '")')
		.html('');

});