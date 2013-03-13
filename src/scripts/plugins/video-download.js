$.knb.plugins.videoDownload = function () {

	if ( $('#player_playlist').length == 1 ) {
		
		var downloadClick = function() {
			type = $(this).data('type');
			href = $("#player_playlist > li.current_video").data(type);
			
			if (!href) {
				alert('Невозможно загрузить видео');
			} else {
				$wrap = $('<div class="video-download-wrap">Ссылка для загрузки видео:<br/></div>');
				$link = $('<a></a>').attr('target', '_blank').attr('href', href).html(href);
				$wrap
					.append($link)
					.css('position', 'fixed')
					.css('left', Math.round(($(window).width() - 500) / 2) + 'px')
					.css('top', '200px')
					.css('display', 'block');
				$downloadBack.append($wrap).show();
			}
			return false;
		};
		
		$download = $('<div id="video-download-links">Скачать видео:&nbsp;</div>');
		$download.append($('<a></a>').data('type', 'sd').attr('href', '#').html('SD').click(downloadClick));
		$download.append($('<span>&nbsp;</span>'));
		$download.append($('<a></a>').data('type','hd').attr('href', '#').html('HD').click(downloadClick));
		$download.insertAfter($("#player_container"));
		
		$downloadBack = $('<div></div>')
			.attr('id', 'video-download-back')
			.css('display', 'none')
			.css('position', 'fixed')
			.css('width', '100%')
			.css('height', '100%')
			.css('left', '0')
			.css('top', '0')
			.css('background', 'rgba(0,0,0,0.9)')
			.css('z-index', '99999')
			.bind('click', function (ev) {
				$this = $(this);
				if ($(ev.target).is('#video-download-back')) {
					$this.find('div').remove();			
					$this.fadeOut();
					return false;
				}
			});
		$('body').append($downloadBack);
	}

};