$.knb.plugins.friendsHighlight = function () {

	$.knb.storageKeys.friendsHighlight = 'friends-list';
	
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
		localStorage.setItem($.knb.storageKeys.friendsHighlight, JSON.stringify(friends));
	}
	
	friends = $.parseJSON(localStorage.getItem($.knb.storageKeys.friendsHighlight));
	
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
	$('#comments').watch(function() {
		$this = $(this);
		friendsHighlight($('.ava[friend!=1]', $(this)).attr('friend', '1').parent(), 'friendHighlight');
		return true;
	});
	
	// pub posts
	$('.postList').watch(function() {
		$this = $(this);
		friendsHighlight($('> li .ava[friend!=1]', $(this)).attr('friend', '1'), 'friendHighlight');
		return true;
	});
	
	// shouts
	var isShoutsPage = document.location.href.indexOf('http://kanobu.ru/shouts/') == 0;
	$('.shoutsList').watch(function() {
		$this = $(this);
		$shouts = $('> li > .shout[friend!=1]', $(this)).attr('friend', '1');
		friendsHighlight($('.ava', $shouts), 'friendHighlight');
		isShoutsPage && $shouts.each(function (i, shout) {
			$(shout).parent().watch(function() {
				friendsHighlight($('.shoutAnswers .ava[friend!=1]', $(this)).attr('friend', '1'), 'friendHighlight');
				return true;
			});
		});
		return true;
	}).trigger('DOMSubtreeModified');
	
	friendsHighlight($('.people > ul > li > a'), 'friendHighlight2'); // posts likes
	friendsHighlight($('.rightColumn .author'), 'friendHighlight'); // post author
	friendsHighlight($('.userMessageBlock .ava'), 'friendHighlight'); // pub post author

};