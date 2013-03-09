$(function() {

	var FRIENDS_HIGHLIGHT_KEY = 'friends-list';
	
	var friends = [];
	var myProfile = $('.profile > a:first').attr('href');
	if (document.location.href.indexOf('http://kanobu.ru' + myProfile) == 0) {
		$('.profileFriends .item').each(function(i, friend) {
			$friend = $(friend);
			var profile = $('>a:first', $friend).attr('href');
			var userName = $('.username', $friend).html();
			friends.push({
				profile: profile,
				name: userName
			});
		});
		localStorage.setItem(FRIENDS_HIGHLIGHT_KEY, JSON.stringify(friends));
	}
	
	friends = $.parseJSON(localStorage.getItem(FRIENDS_HIGHLIGHT_KEY));
	
	friendsHighlight = function($users, cssClass) {
		$users.each(function(i, user) {
			$user = $(user);
			profile = $user.attr('href');
			for (var friend in friends) {
				if (profile == friends[friend].profile) {
					$user.addClass(cssClass);
					break;
				}
			}
		});
	}
	
	// comments
	commentsUpdated = function() {
		$this = $(this);
		$this.unbind('DOMSubtreeModified', commentsUpdated);
		friendsHighlight($('.ava[friend!=1]', $(this)).attr('friend', '1').parent(), 'friendHighlight');
		$this.bind('DOMSubtreeModified', commentsUpdated);
	};
	$('#comments').bind('DOMSubtreeModified', commentsUpdated);
	
	// pub posts
	postListUpdated = function() {
		$this = $(this);
		$this.unbind('DOMSubtreeModified', postListUpdated);
		friendsHighlight($('> li .ava[friend!=1]', $(this)).attr('friend', '1'), 'friendHighlight');
		$this.bind('DOMSubtreeModified', postListUpdated);
	}
	$('.postList').bind('DOMSubtreeModified', postListUpdated);
	
	// shouts	
	var isShoutsPage = document.location.href.indexOf('http://kanobu.ru/shouts/') == 0;
	shoutsListUpdated = function() {
		$this = $(this);
		$this.unbind('DOMSubtreeModified', shoutsListUpdated);
		$shouts = $('> li > .shout[friend!=1]', $(this)).attr('friend', '1');
		friendsHighlight($('.ava', $shouts), 'friendHighlight');	
		isShoutsPage && $shouts.each(function (i, shout) {
			$(shout).parent().bind('DOMSubtreeModified', function() {
				friendsHighlight($('.shoutAnswers .ava[friend!=1]', $(this)).attr('friend', '1'), 'friendHighlight');
			});
		});
		$this.bind('DOMSubtreeModified', shoutsListUpdated);
	}
	$('.shoutsList').bind('DOMSubtreeModified', shoutsListUpdated).trigger('DOMSubtreeModified');
	
	friendsHighlight($('.people > ul > li > a'), 'friendHighlight2'); // posts likes
	friendsHighlight($('.rightColumn .author'), 'friendHighlight'); // post author
	friendsHighlight($('.userMessageBlock .ava'), 'friendHighlight'); // pub post author

});