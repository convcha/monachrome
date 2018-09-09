const defaultOptions = {
  minimap: true,
  lineNumbers: 'on',
  language: 'plaintext'
};

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set(defaultOptions, () => {
    console.log('defaultOptions', defaultOptions);
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'redmine.nihon-protec.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
