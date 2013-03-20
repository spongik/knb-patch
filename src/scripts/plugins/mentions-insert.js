$.knb.plugins.mentionsInsert = {};

$.knb.plugins.mentionsInsert.async = true;
$.knb.plugins.mentionsInsert.run = function () {

	var activeTextareaClass = 'activeMentionsTextarea';
	
	var $replyBtn = $('<a>@</a>')
		.addClass('flow-reply')
		.attr('title', 'ответить')
		.attr('href', '#');
	
	var bindMentionsInsert = function() {
		$comments = $('#comments .comment[mentions!=1]');
		if  ($comments.length > 0) {
			$comments = $comments.find('>[mentions!=1]').attr('mentions', '1');
			$comments
				.find('.userNamesBlock .userName')
				.before($replyBtn
					.clone()
					.addClass('flow-reply-comments')
					.click(function (ev) {
						$user = $(this).parent().find('.userName');
						
						name = $user.html();
						id = $user.attr('href').replace('/accounts/', '').replace('/', '');
						
						$('.' + activeTextareaClass).removeClass(activeTextareaClass);
						$('.writeComment textarea').addClass(activeTextareaClass);
						
						$.knb.fn.mentionInsert(name, id);
						
						ev.stopPropagation();
						ev.preventDefault();
						return false;
					}));
			$comments
				.find('.userNamesBlock .whom')
				.before($replyBtn
					.clone()
					.addClass('flow-reply-comments')
					.addClass('flow-reply-comments-whom')
					.click(function (ev) {
						$user = $(this).parent().find('.whom');
						
						name = $user.html();
						id = $user.attr('href').replace('/accounts/', '').replace('/', '');
						
						$('.' + activeTextareaClass).removeClass(activeTextareaClass);
						$('.writeComment textarea').addClass(activeTextareaClass);
						
						$.knb.fn.mentionInsert(name, id);
						
						ev.stopPropagation();
						ev.preventDefault();
						return false;
					}))
				.find('span')
				.each(function (i, span) {
					$span = $(span);
					$span.addClass('flow-reply-arrow')
					$span.insertAfter($span.parent().parent().find('.userName'));
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
					$shout = $(shout);
					$(shout).parent().watch(function() {
						$answers = $('.shoutAnswers .shout[mentions!=1]', $(this)).attr('mentions', '1');
						$answers.find('.ava .userName').css('left','70px');
						$answers.find('.shoutTxt')
							.css('padding-top', '0px')
							.before($replyBtn
							.clone()
							.addClass('flow-reply-shouts')
							.click(function (ev) {
								$user = $(this).parent().find('.ava');								
								name = $user.find('.userName').html();
								id = $user.attr('href').replace('/accounts/', '').replace('/', '');
								
								$('.' + activeTextareaClass).removeClass(activeTextareaClass);
								$user.closest('.shoutAnswers').find('.answersField textarea').addClass(activeTextareaClass);
								
								$.knb.fn.mentionInsert(name, id);
								
								ev.stopPropagation();
								ev.preventDefault();
								return false;
							}));
						return true;
					}).trigger('DOMSubtreeModified');
					
					$shout.find('.userName').css('left', '70px');
					$shout.find('.shoutTxt')
						.css('padding-top', '0px')
						.before($replyBtn
						.clone()
						.addClass('flow-reply-shouts')
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
						}));
				});
			return true;
		}).trigger('DOMSubtreeModified');
	}

};