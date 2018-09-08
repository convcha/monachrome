document.querySelectorAll('textarea').forEach(elem => {
  // elem.style.visibility = 'hidden';
  // elem.style.height = '0px';
});

// noinspection JSFileReferences
require.config({ paths: { 'vs': window.__monacoEditorPath } });
require(['vs/editor/editor.main'], function () {
  monaco.editor.create(document.getElementsByClassName('jstEditor')[0], {
    value: [
      '# Monacalypse',
      '',
      'Convert textarea to monaco-editor'
    ].join('\n'),
    language: 'markdown'
  });
});
