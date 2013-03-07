$(function() {

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

});