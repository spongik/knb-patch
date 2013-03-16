$.knb.plugins.commentsHighlight = {};

$.knb.plugins.commentsHighlight.async = true;
$.knb.plugins.commentsHighlight.run = function () {

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
			return true;
		};
		$('#comments').watch(bindComments);
		bindComments();

};