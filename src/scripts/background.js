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
		var newCount = $(".new", data).length;
		if (newCount > 0) {
			popupMsg("+"+newCount, "Новые оповещения");
		}
	}});
}

popupMsg = function (head, message) {
	var note = webkitNotifications.createNotification(
		chrome.extension.getURL("images/icons/icon48.png"),
		head,
		message
	);
	note.onclick = function () {
		note.cancel();
	};
	note.show();
};