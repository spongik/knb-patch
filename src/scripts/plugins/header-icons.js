$(function() {

	$('.header > .hBtns').append($('<li class="articles"><a href="/articles/"><i></i>Редакция</a></li>'));
	$('.header > .hBtns').append($('<li class="articles last"><a href="/articles/users/"><i></i>Юзеры</a></li>'));
	
	$('.header > .hBtns').append($('<li class="pub"><a href="/pub/all/"><i></i>Все</a></li>'));
	$('.header > .hBtns').append($('<li class="pub"><a href="/pub/recommended/"><i></i>Лучшее</a></li>'));
	$('.header > .hBtns').append($('<li class="pub"><a href="/pub/friends/"><i></i>Друзья</a></li>'));

});