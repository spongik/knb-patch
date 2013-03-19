$.knb.plugins.mentionsInsert = {};

$.knb.plugins.mentionsInsert.async = true;
$.knb.plugins.mentionsInsert.run = function () {
	
	var bindMentionsInsert = function() {
		$comments = $('#comments .comment[mentions!=1]');
		if  ($comments.length > 0) {
			$comments
				.find('>[mentions!=1]')
				.attr('mentions', '1')
				.find('.userNamesBlock .userName, .userNamesBlock .whom')
				.click(function (ev) {
					$user = $(this);
					
					name = $user.html().replace(/<span>.+<\/span>/, '');
					id = $user.attr('href').replace('/accounts/', '').replace('/', '');
					
					$.knb.fn.mentionInsert(name, id);
					
					ev.stopPropagation();
					ev.preventDefault();
					return false;
				});
		}
		return true;
	};
	$('#comments').watch(bindMentionsInsert);
	bindMentionsInsert();

};