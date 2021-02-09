const defaultOptions = {
  minimap: true,
  lineNumbers: 'on',
  language: 'plaintext'
};

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ monachrome: defaultOptions }, () => {
    console.log('defaultOptions', defaultOptions);
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'example.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
