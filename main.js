import * as monaco from './node_modules/monaco-editor/esm/vs/editor/editor.main.js'

monaco.editor.create(document.getElementsByClassName('jstEditor')[0], {
  value: [
    'function x() {',
    '\tconsole.log("Hello world!");',
    '}'
  ].join('\n'),
  language: 'javascript'
});
