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
				.find('.userNamesBlock .userName').before('<a href="#" title="ответить" class="flow-reply comments">@</a>')
				.parent().find('.flow-reply')
				.click(function (ev) {
					$user = $(this).parent().find('.userName');
					
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
						$('.shoutTxt').css('padding-top','0px');
						$('.shoutAnswers .shout[mentions!=1]', $(this))
							.attr('mentions', '1')
							.find('.ava .userName').css('left','70px')
							.parent().parent().find('.shoutTxt').before('<a href="#" title="ответить" class="flow-reply">@</a>')
							.parent().find('.flow-reply').click(function (ev) {
								$user = $(this).parent().find('.ava');								
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
					$(this).find('.userName').css('left','70px');
					$(this).find('.shoutTxt').before('<a href="#" title="ответить" class="flow-reply">@</a>');
				})
				.find('>.flow-reply')
				.click(function (ev) {
					$user = $(this).parent().find('.ava');
					
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