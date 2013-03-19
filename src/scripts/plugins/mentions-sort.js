$.knb.plugins.mentionsSort = {};

$.knb.plugins.mentionsSort.async = false;
$.knb.plugins.mentionsSort.run = function () {

	var $mentions = $('<div></div>')
		.attr('id', 'mentionsSort')
		.css('display', 'none');
	$('body').append($mentions);

};