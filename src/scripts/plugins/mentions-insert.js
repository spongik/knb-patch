$.knb.plugins.mentionsInsert = {};

$.knb.plugins.mentionsInsert.async = true;
$.knb.plugins.mentionsInsert.run = function () {

	var activeTextareaClass = 'activeMentionsTextarea';
	
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
					
					$('.' + activeTextareaClass).removeClass(activeTextareaClass);
					$('.writeComment textarea').addClass(activeTextareaClass);
					
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
	
	// shouts
	
	var isShoutsPage = document.location.href.indexOf('http://kanobu.ru/shouts/') == 0;
	if (isShoutsPage) {
		$('.shoutsList').watch(function() {
			$shouts = $('> li > .shout[mentions!=1]', $(this))
				.attr('mentions', '1')
				.each(function (i, shout) {
					$(shout).parent().watch(function() {
						$('.shoutAnswers .ava[mentions!=1]', $(this))
							.attr('mentions', '1')
							.click(function (ev) {
								$user = $(this);
								
								name = $user.find('.userName').html();
								id = $user.attr('href').replace('/accounts/', '').replace('/', '');
								
								$('.' + activeTextareaClass).removeClass(activeTextareaClass);
								$user.closest('.shoutAnswers').find('.answersField textarea').addClass(activeTextareaClass);
								
								$.knb.fn.mentionInsert(name, id);
								
								ev.stopPropagation();
								ev.preventDefault();
								return false;
							});
						return true;
					}).trigger('DOMSubtreeModified');
				})
				.find('>.ava')
				.click(function (ev) {
					$user = $(this);
					
					name = $user.find('.userName').html();
					id = $user.attr('href').replace('/accounts/', '').replace('/', '');
					
					$('.' + activeTextareaClass).removeClass(activeTextareaClass);
					$user.closest('li').find('.answersField textarea').addClass(activeTextareaClass);
					
					$.knb.fn.mentionInsert(name, id);
					
					ev.stopPropagation();
					ev.preventDefault();
					return false;
				});
			return true;
		}).trigger('DOMSubtreeModified');
	}

};