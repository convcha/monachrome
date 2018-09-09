const optionKeys = ['minimap', 'lineNumbers'];

chrome.storage.sync.get(optionKeys, (options) => {
  const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

  // script tag for global variables
  const global = document.createElement('script');
  global.innerHTML = `
var __monachromePaths = {
  monacoEditor: '${chrome.extension.getURL('node_modules/monaco-editor/min/vs/')}',
  monacoThemes: '${chrome.extension.getURL('node_modules/monaco-themes/')}',
}
var __monachromeOptions = ${JSON.stringify(options)};
`;
  head.insertBefore(global, head.lastChild);

  // script tag for monaco loader
  const monacoLoader = document.createElement('script');
  monacoLoader.setAttribute("src", chrome.extension.getURL('node_modules/monaco-editor/min/vs/loader.js'));
  monacoLoader.setAttribute('async', false);
  head.insertBefore(monacoLoader, head.lastChild);

  // script tag for content script logic
  const main = document.createElement('script');
  main.setAttribute("src", chrome.extension.getURL('main.js'));
  main.setAttribute('async', false);
  head.insertBefore(main, head.lastChild);
});
