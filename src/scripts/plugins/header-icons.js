$.knb.plugins.headerIcons = {};

$.knb.plugins.headerIcons.async = false;
$.knb.plugins.headerIcons.run = function () {

	$('body').addClass('headerIcons');

	$('.header > .hBtns').append($('<li class="epic"><a target="_blank" href="http://epic.kanobu.ru/" title="EPIC Канобу"><i></i></a></li>'));
	$('.header > .hBtns .epic a').css('background', 'url("' + chrome.extension.getURL('images/epic.png') + '") no-repeat 11px 9px')
	
	$('.header > .hBtns').append($('<li class="articles"><a href="/articles/"><i></i>Редакция</a></li>'));
	$('.header > .hBtns').append($('<li class="articles last"><a href="/articles/users/"><i></i>Юзеры</a></li>'));
	
	$('.header > .hBtns').append($('<li class="pub"><a href="/pub/all/"><i></i>Все</a></li>'));
	$('.header > .hBtns').append($('<li class="pub long"><a href="/pub/recommended/"><i></i>Интересное</a></li>'));
	$('.header > .hBtns').append($('<li class="pub"><a href="/pub/friends/"><i></i>Друзья</a></li>'));

};