var KANOBU_URL = "http://kanobu.ru";
var NOTIFS_URL = "/notifs";

document.addEventListener('DOMContentLoaded', function () {
	$("#notifs").click(function () {
		setActive(this);
		load(getNotifs);
		return false;
	});
	$("#cries").click(function () {
		setActive(this);
		return false;
	});
	load(getNotifs);
});

getNotifs = function () {
	$.ajax({url: KANOBU_URL + NOTIFS_URL, async: true, success: function (data) {
		$notifs = $("li:lt(10)", data);
		$("a", $notifs).each(function (index, link) {
			$(link).click(function() {
				chrome.tabs.create({url: link.href});
				return false;
			});
		});
		$("#content").html($notifs);
	}});
};

load = function (method) {
	var img = document.createElement('img');
	img.src = chrome.extension.getURL("/images/loader.gif");
	img.id = 'loader';
	$("#content").html(img);
	method();
};

setActive = function (obj) {
	$(".menu-btn").removeClass('active');
	$(obj).addClass('active');
};