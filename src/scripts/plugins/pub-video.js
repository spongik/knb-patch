$(function() {

	var onVideoPlay = function (ev, $container) {
		$iframe = $(">iframe", $('.embedVideo', $container));
		if ($iframe.length == 1) {		
			$('.embedVideo', $container)
				.width($iframe.width())
				.height($iframe.height());
			$iframeClone = $iframe.clone().css('display', 'none');
			background = $("img", $('.embedVideo', $container)).attr('src');
			$('.embedVideo', $container).html('<div class="playBtn"></div>')
				.css('background', 'url(' + background + ')')
				.css('background-size', 'contain')
				.css('cursor', 'hand');
			id = 'video-iframe-' + $container.data('object-id');
			$iframeClone.attr('id', id);
			$('#back').append($iframeClone);
			
			$('.embedVideo', $container).bind('click', {id: id} , function (ev2) {
				fId = ev2.data.id;
				w = $(window).width();
				h = $(window).height();			
				fw = 800;
				fh = 600;
				$('#back').show();
				$('#' + fId)
					.css('position', 'fixed')
					.width(fw)
					.height(fh)
					.css('left', Math.round((w - fw) / 2) + 'px')
					.css('top', Math.round((h - fh) / 2) + 'px')
					.css('display', 'block');
				ev2.preventDefault();
				ev2.stopPropagation();
			}).trigger('click');
			return false;
		}
		return true;
	};
	var onPostsLoaded = function (ev) {
		$this = $(this);
		$posts = $("> .postList > li[binded!=1]", $this);
		if  ($posts.length > 0) {
			$posts
				.attr('binded', '1')
				.each(function (i, el) {
					$el = $(el);
					$('.embedVideo', $el).watch(onVideoPlay, $el, true);
				});
		}
		return true;
	};
	$('.postListBlock').watch(onPostsLoaded);
	
	$back = $('<div></div>')
		.attr('id', 'back')
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
			$this.find('iframe').css('display', 'none');
			$this.fadeOut();
			ev.preventDefault();
		});
	$('body').append($back);

});