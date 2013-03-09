$(function() {

	var updateRefreshBtnLabel = function(newCommentsCount) {
		var refreshLabel = 'Обновить комментарии';
		if (newCommentsCount) {
			refreshLabel += ' (' + newCommentsCount + ')';
		}
		
		$('#refresh-comments').html(refreshLabel);
		$('#refresh-comments-float').html(refreshLabel);
	};

	var $refresh = $('<a href="#" id="refresh-comments" class="wrapBtnTxt">asd</a>');
	var $floatRefresh = $('<a href="#" id="refresh-comments-float">asd</a>');
	var refreshUrl = null;
	$refresh.click(function(ev) {
		$showMore = $('#comments > .showMore');
		if (refreshUrl == null) {
			refreshUrl = $showMore.data('url').replace(/max_id=\d+&/g, "max_id=9999999999&");
		}
		$showMore.attr('data-url', refreshUrl);
		$('#comments .comment').attr('old', '1');
		
		var lastId = null;
		var onRefresh = function() {
			$comments = $('#comments .comment[old!=1]');
			if  ($comments.length > 0) {
				$('#comments').unbind('DOMSubtreeModified', onRefresh);
				updateRefreshBtnLabel();
				
				$old = $('#comments .comment[old=1]');
				lastId =  $old.last().data('id');
				$old.remove();
				
				document.location.replace('#refresh-comments');
			}
			if (lastId != null) {
				$('#comments .comment').each(function (i, el) {
					$el = $(el);
					if ($el.data('id') > lastId) {
						$el.css('background', 'rgba(95,234,0,0.3)');
					}
				});
				lastId = null;
			}
		};
		$('#comments').bind('DOMSubtreeModified', onRefresh);
		$('.wrapBtnTxt', $showMore).trigger('click');
		
		ev.preventDefault();
		return false;
	});
	
	$floatRefresh.click(function (ev) {
		$.scrollTo( '#refresh-comments', 800, { onAfter: function() {
			$refresh.trigger('click');
		}});
		
		ev.preventDefault();
		return false;
	});
	
	var appendRefreshBtn = function() {
		$refresh.insertBefore($('.writeComment'));
		$refresh.wrap('<div id="refresh-comments-wrap"></div>');
		
		$('.rightColumn').append($floatRefresh);
		$('#refresh-comments-float').sticky({topSpacing: 90});
		
		updateRefreshBtnLabel();
	};
	
	if ($('#comments > .showMore').length > 0) {
		appendRefreshBtn();
	}

	var tryCreateShowMore = function() {
		$('body').unbind('DOMSubtreeModified', tryCreateShowMore);
		if ($('#comments').length > 0 && $('#comments > .showMore').length == 0) {
			data = $('.mainColumn > script:last').html();
			objectId = /object_id: (\d+)/.exec(data)[1];
            contentTypeId = /content_type: (\d+)/.exec(data)[1];
			
			$showMore = $('<a class="showMore"><i></i><div class="wrapBtnTxt"></div><em></em></a>');
			$showMore.css('display', 'none');
			$showMore.data('url', '/comments/list/' + contentTypeId + '/' + objectId + '/?max_id=000&paginate_by=20');
			
			$('#comments').append($showMore);
			appendRefreshBtn();
		}
	};
	$('body').bind('DOMSubtreeModified', tryCreateShowMore);

});