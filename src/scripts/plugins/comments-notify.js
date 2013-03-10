$.knb.plugins.commentsNotify = function () {

		var timerCommentsNotify = null;
		var active = false;
		$(document).bind("mousemove", function() {
			active = true;
		});
		
		setInterval(function() {
			if (active) {
				timerCommentsNotify && clearTimeout(timerCommentsNotify);
				timerCommentsNotify = setTimeout(function() {
					$.get($.knb.fn.getRefreshCommentsUrl(), function (data, status) {
						if (status == 'success' && data.list) {
							lastId = $.knb.fn.getLastCommentId();
							
							$comments = $('.comment', $('<div></div>').html(data.list)).filter(function (i) {
								return $(this).data('id') > lastId;
							});
							
							$.knb.fn.updateRefreshBtnLabel($comments.length);
							Tinycon.setBubble($comments.length);
							
							active = true;
						}
					}, 'json');
					
				}, 60000);
			}
			active = false;
		}, 1000);

		$.knb.fn.tryCreateShowMore();

};