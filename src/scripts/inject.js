function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
}

exec(function () {
	jQuery.ajaxSetup({
		dataFilter: function(data, type) {
			if (data.length > 0 && data[0] == '{') {
				var json = $.parseJSON(data);
				if (json.hasOwnProperty('list') && json.hasOwnProperty('more') && !json.more) {
					json.more = '<a class="showMore showMoreFake" style="display: none;"><i></i><div class="wrapBtnTxt"></div><em></em></a>';
				}
				data = JSON.stringify(json);
			}
			return data;
		},
    });
	$('body').append('<div id="injected" style="display: none;"></div>');
});