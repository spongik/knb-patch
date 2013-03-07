jQuery.fn.watch = function( cb ) {
	var timer = null;
	var cleaner = null;

	timer = setInterval(function() {
		cb(function() {
			timer && clearInterval(timer);
			cleaner && clearTimeout(cleaner);
		});
	}, 20);
	cleaner = setTimeout(function() {
		timer && clearInterval(timer);
	}, 5000);
};

$(function() {

	// common stuff here

});