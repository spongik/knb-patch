function exec(fn) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = '(' + fn + ')();';
	document.body.appendChild(script);
	document.body.removeChild(script);
}

exec(function () {
		
	if ($('#videoAutoplay').length != 0 && VideoPlaylistController) {
		VideoPlaylistController.prototype.onComplete = function() {};
		
		$script = $('<script></script>')
			.attr('type', 'application/javascript')
			.html($('#videoAutoplay').html());
		$('body').prepend($script);
		$('#videoAutoplay').remove();
		
		$('#showsToggler').click(function() {
			$('#showsDropDown').toggle();
		});
	}
		
	$(function() {
		if ($('#injected').length != 0) {
			return;
		};
		
		jQuery.ajaxSetup({
			dataFilter: function(data, type) {
				if (data.length > 0 && data[0] == '{') {
					var json = $.parseJSON(data);
					if (json.hasOwnProperty('list') && json.hasOwnProperty('more') && !json.more) {
						json.more = '<a class="showMore showMoreFake" style="display: none;"><i></i><div class="wrapBtnTxt"></div><em></em></a>';
					}
					data = JSON.stringify(json);
				}
				return data;
			},
		});
		
		$('body').append('<div id="injected" style="display: none;"></div>');
	});
});