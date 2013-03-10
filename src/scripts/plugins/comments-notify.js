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
							
							countNew = $comments.length;
							$.knb.fn.updateRefreshBtnLabel(countNew);
							Tinycon.setBubble(countNew);
							
							active = true;
						}
					}, 'json');
					
				}, 60000);
			}
			active = false;
		}, 1000);

		$.knb.fn.tryCreateShowMore();
		
		Tinycon.setOptions({
			width: 9,
			height: 12,
			font: '11px arial',
			colour: 'white',
			background: 'red',
			fallback: true
		});
};