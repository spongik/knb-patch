var KANOBU_URL = "http://kanobu.ru";
var NOTIFS_URL = "/notifs";
var INTERVAL = 1000 * 60;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status === 'loading' && tab.url.indexOf("http://kanobu.ru/") == 0) {
		chrome.tabs.executeScript(tabId, {
			file: 'scripts/inject.js'
		});
	}
});

update = function () {
	$.ajax({url: KANOBU_URL + NOTIFS_URL, async: true, success: function (data) {
		var newCount = $(".new").length;
		if (newCount > 0) {
			chrome.browserAction.setBadgeText({text: newCount.toString()});
			popupMsg("Kanobu Flow", "Новые непрочитанные оповещения : "+newCount);
		}
		else
			chrome.browserAction.setBadgeText({text: ""});
	}});
}

popupMsg = function (head, message) {
	var note = webkitNotifications.createNotification(
		"images/icons/icon48.png",
		head,
		message
	);
	note.onclick = function () {
		note.cancel();
	};
	note.show();
};

setInterval(update, INTERVAL);