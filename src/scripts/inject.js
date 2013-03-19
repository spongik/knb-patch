function exec(fn, params) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = '(' + fn + ')(' + JSON.stringify(params) + ');';
	document.body.appendChild(script);
	document.body.removeChild(script);
}

$.knb.fn.mentionInsert = function(name, id) {
	exec(function (data) {
		var $input = $('.writeComment textarea');
		var mentions = $input.data('mentionsInput');
		var val = mentions.val();
		$input.focus();
		mentions.set( val + (val.length > 0 ? ' ' : '') + '@[' + data.name + '](' + data.type + ':' + data.id + '), ' );
	}, {
		type: 'user',
		name: name,
		id: id
	});
};

exec(function () {
		
	if ($('#videoAutoplay').length != 0 && VideoPlaylistController) {
		VideoPlaylistController.prototype.onComplete = function() {};
		
		$script = $('<script></script>')
			.attr('type', 'application/javascript')
			.html($('#videoAutoplay').html());
		$('body').prepend($script);
		$('#videoAutoplay').remove();
		
		$('#showsToggler').click(function() {
			$('#showsDropDown').toggle();
		});
	}
		
	$(function() {
		if ($('#injected').length != 0) {
			return;
		};
		
		jQuery.ajaxSetup({
			dataFilter: function(data, type) {
				if (data.length == 0) {
					return '';
				}
				
				if (this.url.indexOf('/comments/list/') == 0) {
					var json = $.parseJSON(data);
					if (json.hasOwnProperty('list') && json.hasOwnProperty('more') && !json.more) {
						json.more = '<a class="showMore showMoreFake" style="display: none;"><i></i><div class="wrapBtnTxt"></div><em></em></a>';
					}
					data = JSON.stringify(json);
				} else if (this.url.indexOf('/mention/autocomplete/') == 0 && $('#mentionsSort').length != 0) {
					var json = $.parseJSON(data);
					var sorted = [];
					for (item in json) {
						if (json[item].type == 'user') {
							sorted.push(json[item]);
						}
					}
					for (item in json) {
						if (json[item].type != 'user') {
							sorted.push(json[item]);
						}
					}
					data = JSON.stringify(sorted);
				}
				return data;
			},
		});
		
		$('body').append('<div id="injected" style="display: none;"></div>');
	});
});