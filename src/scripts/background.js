chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	/*if (changeInfo.status === 'complete' && tab.url.indexOf("http://kanobu.ru/") == 0) {
		chrome.tabs.executeScript(tabId, {
			file: 'inject.js'
		});
	}*/
});