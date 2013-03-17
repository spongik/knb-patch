$.knb.plugins.videoAutoplay = {};

$.knb.plugins.videoAutoplay.async = false;
$.knb.plugins.videoAutoplay.run = function () {
	
	if ( $('#player_playlist').length == 1 ) {
		$('body > script').each(function(i, script) {
			$script = $(script);
			content = $script.html();
			if (content.indexOf('PlaylistPageController') > 0) {
				$scriptContents = $('<div></div>')
					.attr('id', 'videoAutoplay')
					.css('display', 'none')
					.html(content);
				$('body').append($scriptContents);
				$script.html('');
				return false;
			}
		});
	}

};