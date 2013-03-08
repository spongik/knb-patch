$(function() {
	
	var PUB_FILTER_KEY = 'pub-filter-threshold';
	
	$filter = $('<ul id="threshold-filter" class="filter2" style="margin-right: 20px;">\
			<li><a data-threshold="-1" href="#">Все</a></li>\
			<li><a data-threshold="5" href="#">&gt; 5</a></li>\
			<li><a data-threshold="20" href="#">&gt; 20</a></li>\
			<li><a data-threshold="50" href="#">&gt; 50</a></li>\
		</ul>');
	
	var reloadTimeout = null;
	var threshold = localStorage.getItem(PUB_FILTER_KEY);
	if (!threshold) {
		threshold = -1;
	}

	var filterPosts = function() {
		if (threshold < 0) {
			return;
		}
		
		reloadTimeout && clearTimeout(reloadTimeout);
		
		$columns = $('.postListBlock > .postList');
		$posts = $('.userMessageBlock[filtered!=1][data-object-id]', $columns);
		if  ($posts.length > 0) {
			$posts
				.attr('filtered', '1')
				.each(function(i, post) {
					$post = $(post);
					if ($('.like.counter', $post).data('count') < threshold) {
						$post.hide();
					} else {
						$post.show();
					}
				});
			$columnMax = $columns.first().height() >  $columns.last().height() ? $columns.first() : $columns.last();
			$columnMin = $columns.first().height() <= $columns.last().height() ? $columns.first() : $columns.last();
			
			for (;;) {
				$last = $('.userMessageBlock[moved!=1][data-object-id]:visible', $columnMax).last();
				if ($last.length > 0 && $columnMax.height() - $last.height() - $columnMin.height() > 0) {
					$columnMin.append($last.attr('moved', '1'));
				} else {
					break;
				}
			}
			$('.userMessageBlock[moved!=1]', $columnMax).attr('moved', '1');
			$('.userMessageBlock[moved!=1]', $columnMin).attr('moved', '1');
		}
		reloadTimeout = setTimeout(function() {
			$(window).scrollTop( $(window).scrollTop() + 1 );
			$(window).scrollTop( $(window).scrollTop() - 1 );
		}, 10);
	};
	$('.postListBlock').bind('DOMSubtreeModified', filterPosts);
	
	$('a', $filter).click(function(ev) {
		$('li', $filter).removeClass('isSelected');
		$(this).parent().addClass('isSelected');
		
		threshold = $(this).data('threshold');
		$('.postListBlock > .postList > .userMessageBlock').removeAttr('filtered').removeAttr('moved');
		filterPosts();
		
		localStorage.setItem(PUB_FILTER_KEY, threshold);
		
		ev.preventDefault();
		return false;
	}).each(function(i, el) {
		if ($(el).data('threshold') == threshold) {
			$(el).trigger('click');
		}
	});
	
	$filter.insertAfter('.headFilter .filter');

});