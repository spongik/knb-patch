$(function() {

	$.knb.storageKeys.settings = 'settings';
	settings = $.parseJSON(localStorage.getItem($.knb.storageKeys.settings));
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
				pubVideo: true,
				pubFilter: true,
				likeButton: true,
			}
		};
	}

	$.knb.initSettings(settings);
	
	for (var plugin in settings.plugins) {
		$.knb.plugins[plugin] && settings.plugins[plugin] && $.knb.plugins[plugin]();
	}

});

$.knb.initSettings = function (settings) {

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
			.append($('<div></div>').append(createCheckbox('likeButton', 'Изменить стиль кнопки Лайк', settings.plugins.likeButton)))
			.append($('<div></div>').append(createCheckbox('tabAll', 'Вкладка "Все" на главной', settings.plugins.tabAll)))
			.append($('<div></div>').append(createCheckbox('friendsHighlight', 'Подсветка аватаров друзей', settings.plugins.friendsHighlight)))
			.append($('<div></div>').append(createCheckbox('commentsHighlight', 'Подсветка комментариев', settings.plugins.commentsHighlight)))
			.append($('<div></div>').append(createCheckbox('commentsRefresh', 'Кнопка "Обновить комментарии"', settings.plugins.commentsRefresh)))
			.append($('<div></div>').append(createCheckbox('pubVideo', 'Открытие видео в Пабе в новом окне', settings.plugins.pubVideo)))
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

};