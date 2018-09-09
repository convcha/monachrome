const script3 = document.createElement('script');
script3.innerHTML = `
var __monacoEditorPath = '${chrome.extension.getURL('node_modules/monaco-editor/min/vs/')}'
var __monacoThemesPath = '${chrome.extension.getURL('node_modules/monaco-themes/')}'
`;
const head3 = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head3.insertBefore(script3, head3.lastChild);

const script2 = document.createElement('script');
script2.setAttribute("src", chrome.extension.getURL('node_modules/monaco-editor/min/vs/loader.js'));
const head2 = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head2.insertBefore(script2, head2.lastChild);

const script = document.createElement('script');
// script.setAttribute("type", "module");
script.setAttribute("src", chrome.extension.getURL('main.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);
