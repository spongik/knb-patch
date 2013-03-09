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
	$('a.ava').each(function(i, user) {
		$user = $(user);
		profile = $user.attr('href');
		for (var friend in friends) {
			if (profile == friends[friend].profile) {
				$user.addClass('friend');
				break;
			}
		}
	});

});