chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status === 'loading' && tab.url.indexOf("http://kanobu.ru/") == 0) {
		chrome.tabs.executeScript(tabId, {
			file: 'scripts/inject.js'
		});
	}
});

getStorageItem = function (item) {
	chrome.storage.sync.get(item, function (it){
		console.log(it[item]);
	})
}
