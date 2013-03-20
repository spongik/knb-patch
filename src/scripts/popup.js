var KANOBU_URL = "http://kanobu.ru";
var NOTIFS_URL = "/notifs";

getNotifs = function () {
	$.ajax({url: KANOBU_URL + NOTIFS_URL, async: true, success: function (data) {
		$notifs = $("li:lt(10)", data);
		$("a", $notifs).attr("target", "_blank").attr("href", function (i, url){
			return KANOBU_URL + url;
		});
		$("#content").html($notifs);
	}});
}

getNotifs();
