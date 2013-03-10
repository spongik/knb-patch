$.knb.fn.updateRefreshBtnLabel = function (newCommentsCount) {
	var refreshLabel = 'Обновить комментарии';
	if (newCommentsCount) {
		refreshLabel += ' (' + newCommentsCount + ')';
	}
	
	$('#refresh-comments').html(refreshLabel);
	$('#refresh-comments-float').html(refreshLabel);
};

$.knb.fn.getRefreshCommentsUrl = function () {
	data = $('.mainColumn script:last').html();
	objectId = /object_id: (\d+)/.exec(data)[1];
	contentTypeId = /content_type: (\d+)/.exec(data)[1];
	
	url = '/comments/list/' + contentTypeId + '/' + objectId + '/?max_id=9999999999&paginate_by=20';
	return url;
};

$.knb.fn.getLastCommentId = function () {
	id = $('#comments .comment[old!=1]').last().data('id');
	return id;
};

$.knb.fn.tryCreateShowMore = function (cb) {
	if (!$.knb.vars.tryCreateShowMore) {
		$.knb.vars.tryCreateShowMore = true;
		var tryCreateShowMore = function(ev) {
			$('body').unbind('DOMSubtreeModified', tryCreateShowMore);
			if ($('#comments, #player_comments').length > 0 && $('#comments > .showMore, #player_comments > .showMore').length == 0) {			
				$showMore = $('<a class="showMore"><i></i><div class="wrapBtnTxt"></div><em></em></a>');
				$showMore.css('display', 'none');
				$showMore.data('url', $.knb.fn.getRefreshCommentsUrl());
				
				$('#comments').append($showMore);
				ev.data.cb && ev.data.cb();
			}
		};
		$('body').bind('DOMSubtreeModified', { cb : cb }, tryCreateShowMore);
	}
};

$.knb.plugins.commentsRefresh = function () {

	var $refresh = $('<a href="#" id="refresh-comments" class="wrapBtnTxt">asd</a>');
	var $floatRefresh = $('<a href="#" id="refresh-comments-float">asd</a>');
	var refreshUrl = null;
	$refresh.click(function(ev) {
		$showMore = $('#comments > .showMore');
		if (refreshUrl == null) {
			refreshUrl = $showMore.data('url').replace(/max_id=\d+&/g, "max_id=9999999999&");
		}
			
		$.scrollTo( '#refresh-comments', 200 );
		
		$showMore.attr('data-url', refreshUrl);
		$('#comments').css('min-height', $('#comments').height() + 'px');
		$('#comments .comment').attr('old', '1').hide();
		
		var lastId = null;
		var onRefresh = function() {
			$comments = $('#comments .comment[old!=1]');
			$.knb.fn.updateRefreshBtnLabel();
			
			$old = $('#comments .comment[old=1]');
			lastId = $old.last().data('id');
			$old.remove();
			
			$.scrollTo( '#refresh-comments', 50 );
			$('#comments').css('min-height', 'inherit');
				
			if (lastId != null) {
				$('#comments .comment').each(function (i, el) {
					$el = $(el);
					if ($el.data('id') > lastId) {
						$el.css('background', 'rgba(95,234,0,0.3)');
					}
				});
				lastId = null;
			}
			Tinycon.setBubble(0);
			return false;
		};
		$('#comments').watch(onRefresh, {}, true);
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
		
		$.knb.fn.updateRefreshBtnLabel();
	};
	
	if ($('#comments > .showMore').length > 0) {
		appendRefreshBtn();
	}

	$.knb.fn.tryCreateShowMore(appendRefreshBtn);

};