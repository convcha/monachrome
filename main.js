console.log('__monachromeOptions', window.__monachromeOptions);

document.querySelectorAll('textarea').forEach(elem => {
  // elem.style.visibility = 'hidden';
  // elem.style.height = '0px';
});

// noinspection JSFileReferences
require.config({ paths: { 'vs': window.__monachromePaths.monacoEditor } });
require(['vs/editor/editor.main'], function () {
  // const parseTmTheme = require(window.__monacoThemesPath + 'dist/monaco-themes.js').parseTmTheme;
  fetch(window.__monachromePaths.monacoThemes + 'themes/Solarized-light.json')
    .then(data => data.json())
    .then(data => {
      monaco.editor.defineTheme('solarized-light', data);
      monaco.editor.setTheme('solarized-light');
    });

  document.querySelectorAll('textarea').forEach(textarea => {
    const model = monaco.editor.createModel(
      textarea.value,
      'markdown'
    );

    const parent = textarea.parentNode;
    const container = document.createElement('div');
    // parent.insertBefore(container, textarea.nextSibling);

    monaco.editor.setTheme("vs");

    const editor = monaco.editor.create(parent, {
      model: model,
      lineNumbers: window.__monachromeOptions.lineNumbers,
      minimap: {
        enabled: window.__monachromeOptions.minimap
      }
    });

    // オブザーバインスタンスを作成
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log('After mutate', textarea);
        // console.log(mutation.type);
        // console.log('size', { height: textarea.clientHeight, width: textarea.clientWidth });
        editor.layout({ height: textarea.clientHeight, width: textarea.clientWidth });
      });
    });

    // オブザーバの設定
    const config = { attributes: true, childList: true, characterData: true };

    // 対象ノードとオブザーバの設定を渡す
    const observeElem = document.getElementById('update');
    if (observeElem !== undefined && observeElem !== null) {
      observer.observe(observeElem, config);
    }

    // const getHiddenElementHeight = function (element) {
    //   const tempId = 'tmp-' + Math.floor(Math.random() * 99999);//generating unique id just in case
    //   $(element).clone()
    //     .css('position', 'absolute')
    //     .css('height', 'auto').css('width', '1000px')
    //   //inject right into parent element so all the css applies (yes, i know, except the :first-child and other pseudo stuff..
    //     .appendTo($(element).parent())
    //     .css('left', '-10000em')
    //     .addClass(tempId).show();
    //   const h = $('.' + tempId).height();
    //   $('.' + tempId).remove();
    //   return h;
    // };

    // console.log('size', { height: textarea.clientHeight, width: textarea.clientWidth });
    const clientRect = textarea.getBoundingClientRect();
    // console.log('clientRect', { left: clientRect.left, top: clientRect.top });
    editor.layout({ height: textarea.clientHeight, width: textarea.clientWidth });
    // console.log('editor.getConfiguration()', editor.getConfiguration());
    // console.log('editor.getDomNode()', editor.getDomNode());
    const editorDom = editor.getDomNode();
    // console.log('editorDom.getBoundingClientRect()', editorDom.getBoundingClientRect());

    console.log('Before mutate', textarea);
    textarea.insertAdjacentElement('afterend', editorDom);
    textarea.style.display = 'none';
    // textarea.style.visibility = 'collapse';

    textarea.addEventListener('show', e => {
      console.log('addEventListener', e);
    });

    editor.getModel().onDidChangeContent(() => {
      textarea.value = model.getValue();
    });
  });
});
