$(function() {

	$.knb.vars.storageKeys.settings = 'settings';
	settings = $.parseJSON(localStorage.getItem($.knb.vars.storageKeys.settings));
	
	currentVersion = {
		major: 1,
		minor: 3
	};
	
	firstTime = false;
	updated = null;

	if (!settings) {
		settings = {
			version: currentVersion,
			plugins: {
				background: true,
				headerIcons: true,
				tabAll: true,
				friendsHighlight: true,
				commentsHighlight: true,
				commentsRefresh: true,
				commentsNotify: true,
				pubVideo: true,
				pubFilter: false,
				likeButton: true,
				videoDownload: true,
				videoAutoplay: true,
				scrollTop: true,
				mentionsSort: true,
				mentionsInsert: true,
			}
		};
		$.knb.fn.saveSettings(settings);
		firstTime = true;
	}
	
	if (settings.version.major == 1 && settings.version.minor == 0) {
		updated = updated ? updated : settings.version;
		settings.version = { major: 1, minor: 1 };
		
		settings.plugins.videoDownload = true;
		settings.plugins.scrollTop = true;
	}
	
	if (settings.version.major == 1 && settings.version.minor == 1) {
		updated = updated ? updated : settings.version;
		settings.version = { major: 1, minor: 2 };
		
		settings.plugins.videoAutoplay = true;
	}
	
	if (settings.version.major == 1 && settings.version.minor == 2) {
		updated = updated ? updated : settings.version;
		settings.version = { major: 1, minor: 3 };
		
		settings.plugins.mentionsSort = true;
		settings.plugins.mentionsInsert = true;
	}
	
	if (updated) {
		$.knb.fn.saveSettings(settings);
	}

	$.knb.fn.initSettings(settings, firstTime, updated);
	
	for (var pluginName in settings.plugins) {
		if ($.knb.plugins[pluginName] && settings.plugins[pluginName]) {
			plugin = $.knb.plugins[pluginName];
			if (plugin.async) {
				setTimeout(plugin.run, 0);
			} else {
				plugin.run();
			}
		}
	}

});

$.knb.fn.saveSettings = function (settings) {
	localStorage.setItem($.knb.vars.storageKeys.settings, JSON.stringify(settings));
};

$.knb.fn.initSettings = function (settings, firstTime, updated) {

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
			$.knb.fn.saveSettings(settings);
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
			.append($('<div data-version="1.0"></div>').append(createCheckbox('background', 'Изменять фон', settings.plugins.background)))
			.append($('<div data-version="1.0"></div>').append(createCheckbox('headerIcons', 'Кнопки в верхнем меню', settings.plugins.headerIcons)))
			.append($('<div data-version="1.0"></div>').append(createCheckbox('likeButton', 'Изменить стиль кнопки &laquo;Лайк&raquo;', settings.plugins.likeButton)))
			.append($('<div data-version="1.0"></div>').append(createCheckbox('tabAll', 'Вкладка &laquo;Все&raquo; на главной', settings.plugins.tabAll)))
			.append($('<div data-version="1.0"></div>').append(createCheckbox('friendsHighlight', 'Подсветка аватаров друзей <small>(необходимо перейти на страницу вашего профиля)</small>', settings.plugins.friendsHighlight)))
			.append($('<div data-version="1.0"></div>').append(createCheckbox('commentsHighlight', 'Подсветка комментариев', settings.plugins.commentsHighlight)))
			.append($('<div data-version="1.0"></div>').append(createCheckbox('commentsRefresh', 'Кнопка &laquo;Обновить комментарии&raquo;', settings.plugins.commentsRefresh)))
			.append($('<div data-version="1.0"></div>').append(createCheckbox('commentsNotify', 'Показывать количество новых комментариев в иконке вкладки', settings.plugins.commentsNotify)))
			.append($('<div data-version="1.0"></div>').append(createCheckbox('pubVideo', 'Открывать видео в Пабе в окне', settings.plugins.pubVideo)))
			.append($('<div data-version="1.0"></div>').append(createCheckbox('pubFilter', 'Фильтр постов в Пабе по количеству лайков <small>(экспериментальное)</small>', settings.plugins.pubFilter)))
			.append($('<div data-version="1.1"></div>').append(createCheckbox('videoDownload', 'Показывать ссылки для скачивания видео', settings.plugins.videoDownload)))
			.append($('<div data-version="1.2"></div>').append(createCheckbox('videoAutoplay', 'Выключить автовоспроизведение следующего видео', settings.plugins.videoAutoplay)))
			.append($('<div data-version="1.1"></div>').append(createCheckbox('scrollTop', 'Добавить кнопку &laquo;наверх&raquo;', settings.plugins.scrollTop)))
			.append($('<div data-version="1.3"></div>').append(createCheckbox('mentionsSort', 'Показывать пользователей в начале списка при упоминании на @', settings.plugins.mentionsSort)))
			.append($('<div data-version="1.3"></div>').append(createCheckbox('mentionsInsert', 'Добавить кнопку для упоминания пользователя в ответе', settings.plugins.mentionsInsert)))
		)
		.append($submit)
		.append($cancel);

	$settingsBtn = $('<a href="#">Настройки расширения</a>')
		.attr('id', 'settings-btn')
		.click(function(ev) {
			$settings.find('> .controls')
				.css('max-height', Math.max(100, Math.round($(window).height() - 400)) + 'px');
			$settings
				.css('left', Math.round(($(window).width() - $settings.width()) / 2) + 'px')
				.css('top', '50px');
			$('#settings-back').show();
			
			ev.preventDefault();
			return false;
		});

	$('body').append($settingsBack.append($settings));
	$('.profileInfo .nameMail').append($settingsBtn);

	if (firstTime) {
		$('<p>Благодарим вас за установку расширения Kanobu Flow!<br>\
			<small>Вы всегда можете поменять настройки позже &mdash; просто нажмите на ссылку в \
			выпадающем окне, которое появляется при наведении указателем на ваш профиль в верхнем меню.</small>\
		   </p><br>')
			.insertBefore($('.controls', $settings));
		$settingsBtn.trigger('click');
	} else if (updated) {
		$controls = $('.controls', $settings);
		$('<p>Kanobu Flow обновился!<br>\
			<small>Новые функции расширения выделены зеленым.</small>\
		   </p><br>')
			.insertBefore($controls );
		
		$controls.find('> div')
			.filter(function() {
				version = new String($(this).data('version')).split('.');
				major = parseInt(version[0], 10);
				minor = parseInt(version[1], 10);
				if (major > updated.major || ( major == updated.major && minor > updated.minor )) {
					return true;
				}
				return false;
			})
			.css('background', 'rgba(0,178,5,0.2)')
			.css('padding-left', '5px')
			.css('margin-left', '-5px');
		
		$settingsBtn.trigger('click');
	}

};