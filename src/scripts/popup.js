var KANOBU_URL = "http://kanobu.ru";
var NOTIFS_URL = "/notifs";

init = function () {
	$("#help").click(function () {
		chrome.tabs.create({url: $(this).attr('href')});
		return false;
	});
}

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
}

getNotifs();
