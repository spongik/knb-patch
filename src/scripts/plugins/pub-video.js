$(function() {

	var onVideoPlay = function (ev) {
		$this = $('.embedVideo', ev.data.element);
		$iframe = $(">iframe", $this);
		if ($this.length > 0 && $iframe.length > 0) {
			$this.unbind('DOMSubtreeModified', onVideoPlay);
			$this
				.width($iframe.width())
				.height($iframe.height());
			$iframeClone = $iframe.clone().css('display', 'none');
			background = $("img", $this).attr('src');
			$this.html('<div class="playBtn"></div>')
				.css('background', 'url(' + background + ')')
				.css('background-size', 'contain')
				.css('cursor', 'hand');
			id = 'video-iframe-' + ev.data.element.data('object-id');
			$iframeClone.attr('id', id);
			$('#back').append($iframeClone);
			
			$('.embedVideo', ev.data.element).bind('click', {id: id} , function (ev2) {
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
		}
	};
	var onPostsLoaded = function (ev) {
		$this = $(this);
		$posts = $(">li[binded!=1]", $this);
		if  ($posts.length > 0) {
			$posts
				.attr('binded', '1')
				.each(function (i, el) {
					$el = $(el);
					$('.embedVideo', $el).bind('DOMSubtreeModified', {element: $el}, onVideoPlay);
				});
		}
	};
	$('.postListBlock .postList').bind('DOMSubtreeModified', onPostsLoaded);
	
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