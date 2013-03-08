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
			var json = $.parseJSON(data);
			if (json.hasOwnProperty('list') && json.hasOwnProperty('more') && !json.more) {
				json.more = '<a class="showMore showMoreFake" style="display: none;"><i></i><div class="wrapBtnTxt"></div><em></em></a>';
			}
			data = JSON.stringify(json);
			return data;
		},
    });
});