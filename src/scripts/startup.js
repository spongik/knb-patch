$(function() {

	$.knb.storageKeys.settings = 'settings';
	settings = $.parseJSON(localStorage.getItem($.knb.storageKeys.settings));
	firstTime = false;
	if (!settings) {
		settings = {
			version: {
				major: 1,
				minor: 0
			},
			plugins: {
				background: true,
				headerIcons: true,
				tabAll: true,
				friendsHighlight: true,
				commentsHighlight: true,
				commentsRefresh: true,
				commentsNotify: true,
				pubVideo: true,
				pubFilter: true,
				likeButton: true,
			}
		};
		firstTime = true;
	}

	$.knb.initSettings(settings, firstTime);
	
	for (var plugin in settings.plugins) {
		$.knb.plugins[plugin] && settings.plugins[plugin] && $.knb.plugins[plugin]();
	}

});

$.knb.initSettings = function (settings, firstTime) {

	var createCheckbox = function(name, label, checked) {
		$cbx = $('<input type="checkbox" />')
			.attr('checked', checked)
			.attr('name', name);
		$wrap = $('<label></label>')
			.append($cbx)
			.append($('<span></span>').html(label));
		return $wrap;
	};

	$settingsBack = $('<div></div>')
		.attr('id', 'settings-back')
		.click(function(ev) {
			if ($(ev.target).is('#settings-back')) {
				$(this).fadeOut('fast');
			}
		});
		
	$submit = $('<a href="#">Сохранить</a>')
		.attr('id', 'settings-save')
		.click(function(ev) {
			$('.controls input:checkbox', $settings).each(function (i, option) {
				$option = $(option);
				settings.plugins[$option.attr('name')] = $option.is(':checked');
			});
			console.log($('.controls input:checkbox', $settings).length);
			localStorage.setItem($.knb.storageKeys.settings, JSON.stringify(settings));
			document.location.reload();
			
			ev.preventDefault();
			return false;
		});
		
	$cancel = $('<a href="#">Отмена</a>')
		.attr('id', 'settings-cancel')
		.click(function(ev) {
			$settingsBack.trigger('click');
			ev.preventDefault();
			return false;
		});
		
	$settings = $('<div><h2>Настройки</h2></div>')
		.attr('id', 'settings-panel')
		.append($('<div class="controls"></div>')
			.append($('<div></div>').append(createCheckbox('background', 'Изменять фон', settings.plugins.background)))
			.append($('<div></div>').append(createCheckbox('headerIcons', 'Кнопки в верхнем меню', settings.plugins.headerIcons)))
			.append($('<div></div>').append(createCheckbox('likeButton', 'Изменить стиль кнопки &laquo;Лайк&raquo;', settings.plugins.likeButton)))
			.append($('<div></div>').append(createCheckbox('tabAll', 'Вкладка &laquo;Все&raquo; на главной', settings.plugins.tabAll)))
			.append($('<div></div>').append(createCheckbox('friendsHighlight', 'Подсветка аватаров друзей <small>(необходимо перейти на страницу вашего профиля)</small>', settings.plugins.friendsHighlight)))
			.append($('<div></div>').append(createCheckbox('commentsHighlight', 'Подсветка комментариев', settings.plugins.commentsHighlight)))
			.append($('<div></div>').append(createCheckbox('commentsRefresh', 'Кнопка &laquo;Обновить комментарии&raquo;', settings.plugins.commentsRefresh)))
			.append($('<div></div>').append(createCheckbox('commentsNotify', 'Показывать количество новых комментраиев в иконке вкладки', settings.plugins.commentsNotify)))
			.append($('<div></div>').append(createCheckbox('pubVideo', 'Открвать видео в Пабе в окне', settings.plugins.pubVideo)))
			.append($('<div></div>').append(createCheckbox('pubFilter', 'Фильтр постов в Пабе по количеству лайков', settings.plugins.pubFilter)))
		)
		.append($submit)
		.append($cancel);

	$settingsBtn = $('<a href="#">Настройки плагина</a>')
		.attr('id', 'settings-btn')
		.click(function(ev) {
			$settings
				.css('left', Math.round(($(window).width() - $settings.width()) / 2) + 'px')
				.css('top', '100px')
			$('#settings-back').show();
			ev.preventDefault();
			return false;
		});

	$('body').append($settingsBack.append($settings));
	$('.profileInfo .nameMail').append($settingsBtn);

	if (firstTime) {
		$('<p>Благодарим вас за установку плагина!<br>\
			<small>Вы всегда можете поменять настройки позже &mdash; просто нажмите на ссылку в \
			выпадающем окне, которое появляется при наведении указателем на ваш профиль в верхнем меню.</small>\
		   </p><br>')
			.insertBefore($('.controls', $settings));
		$settingsBtn.trigger('click');
	}

};