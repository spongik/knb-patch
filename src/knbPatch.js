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

	// change background color and remove link
	$('.screenGlideContent')
		.css('background-image', 'url("' + chrome.extension.getURL('bg.jpg') + '")')
		.html('');
		
	// refresh comments
	var $refresh = $('<a href="#" id="refresh-comments" class="wrapBtnTxt">Обновить комментарии</a>');
	$refresh.click(function(ev) {
		url = $('#comments .showMore').data('url').replace(/max_id=\d+&/g, "max_id=9999999999&");		
		$('#comments .showMore').attr('data-url', url);
		$('#comments .comment').attr('old', '1');
		var onRefresh = function(clean) {
			$comments = $('#comments .comment[old!=1]');
			if  ($comments.length > 0) {
				$('#comments').unbind('DOMSubtreeModified', onRefresh);
				$('#comments .comment[old=1]').remove();
				document.location.replace('#refresh-comments');
			}
		};
		$('#comments .showMore, #comments .showMore .wrapBtnTxt').trigger('click');
		$('#comments').bind('DOMSubtreeModified', onRefresh);
		
		ev.preventDefault();
		return false;
	});
	$('#comments .showMore').length > 0 && $refresh.insertBefore($('.writeComment'));
	$refresh.wrap('<div id="refresh-comments-wrap"></div>');
	
	// comments highlight
	var bindComments = function() {
		$comments = $('#comments .comment[binded!=1]');
		if  ($comments.length > 0) {
			$comments
				.attr('binded', '1')
					.hover(function (ev) {
					$comment = $(this);
					if ($comment.has('.whom')) {
						whom = $('.whom', $comment).attr('href');
						$('#comments .comment .userNamesBlock .userName[href="' + whom + '"]').closest('.comment')
							.css('background', 'rgba(204,1,0,0.1)');
					}
					who = $('.userNamesBlock .userName', $comment).attr('href');
					$('#comments .comment .userNamesBlock .userName[href="' + who + '"]').closest('.comment').not($comment)
						.css('background', 'rgba(0,91,217,0.1)');
				}, function (ev) {
					$('#comments .comment')
						.css('background', 'transparent');
				});
		}
	};
	$('#comments').bind('DOMSubtreeModified', bindComments);
	bindComments();
	
	// play video	
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
				.css('background-size:', 'contain');
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
	
	// Вкладка "всё"
	$('.tabs').find('ul').append('<li><a href="#" class="allShowLink" data-grid="4"><i></i><span>Все</span><b></b></a></li>');
	$('#gridScroll').append('<div class="matrixContainer allShow" data-grid-item="4"></div>')
					.css('width','3840px');
	$('.matrixContainer.allShow').append('<div class="matrixContainer">'+$('.matrixContainer[data-grid-item=1]').html()+'</div>')
								.append('<div class="matrixContainer">'+$('.matrixContainer[data-grid-item=2]').html()+'</div>')
								.append('<div class="matrixContainer">'+$('.matrixContainer[data-grid-item=3]').html()+'</div>');
	$('.tabs a').click(function(){
		if($(this).hasClass('allShowLink')){
		$('#gridScroll, #gridWrapper').animate({
			height:1551
		},2000);
		}else{
			$('#gridScroll, #gridWrapper').animate({
				height:517
			},500);		
		}
	});
});