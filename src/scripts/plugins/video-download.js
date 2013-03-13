$.knb.plugins.videoDownload = function () {

	if ( $('#player_playlist').length == 1 ) {
		
		var downloadClick = function() {
			type = $(this).data('type');
			href = $("#player_playlist > li.current_video").data(type);
			
			if (!href) {
				alert('Невозможно загрузить видео');
			} else {
				window.open(href);
			}
			return false;
		};
		
		$download = $('<div id="video-download-links">Скачать видео:&nbsp;</div>');
		$download.append($('<a></a>').data('type', 'sd').attr('href', '#').html('SD').click(downloadClick));
		$download.append($('<span>&nbsp;</span>'));
		$download.append($('<a></a>').data('type','hd').attr('href', '#').html('HD').click(downloadClick));
		$download.insertAfter($("#player_container"));
	}

};