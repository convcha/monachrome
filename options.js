let editor = null;

$('input[name="minimap"]').on('change', function () {
  const val = $(this).val();
  editor.updateOptions({ minimap: { enabled: val === 'true' } });
});

$('input[name="linenumber"]').on('change', function () {
  const val = $(this).val();
  editor.updateOptions({ lineNumbers: val });
});

require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });

/**
 * Ported from monao-editor
 * https://github.com/Microsoft/monaco-editor
 */
$(document).ready(function () {
  chrome.storage.sync.get('monachrome', function (optionsRoot) {
    const monachrome = optionsRoot.monachrome;
    console.log('monachrome', monachrome);

    require(['vs/editor/editor.main'], function () {
      editor = monaco.editor.create(document.getElementById('js-preview-container'), {
        language: monachrome.language,
        minimap: { enabled: monachrome.minimap },
        lineNumbers: monachrome.lineNumbers,
      });

      const MODES = (function () {
        const modesIds = monaco.languages.getLanguages().map(function (lang) {
          return lang.id;
        });
        modesIds.sort();

        return modesIds.map(function (modeId) {
          return {
            modeId: modeId,
            sampleURL: 'samples/sample.' + modeId + '.txt'
          };
        });
      })();

      let startModeIndex = 0;
      for (let i = 0; i < MODES.length; i++) {
        const o = document.createElement('option');
        o.textContent = MODES[i].modeId;
        if (MODES[i].modeId === monachrome.language) {
          startModeIndex = i;
        }
        $("#js-default-language").append(o);
      }
      $("#js-default-language")[0].selectedIndex = startModeIndex;
      loadSample(MODES[startModeIndex]);
      $("#js-default-language").change(function () {
        loadSample(MODES[this.selectedIndex]);
      });

      // $(".theme-picker").change(function () {
      //   changeTheme(this.selectedIndex);
      // });

      // loadDiffSample();
      //
      // $('#inline-diff-checkbox').change(function () {
      //   diffEditor.updateOptions({
      //     renderSideBySide: !$(this).is(':checked')
      //   });
      // });
    });

    setFormState(monachrome);

    window.onresize = function () {
      if (editor) {
        editor.layout();
      }
    };

    $('.js-save').on('click', function (e) {
      e.preventDefault();

      const options = {
        monachrome: {
          ...monachrome,
          language: $('#js-default-language').val(),
          minimap: $('input[name="minimap"]:checked').val() === 'true',
          lineNumbers: $('input[name="linenumber"]:checked').val(),
        }
      };

      console.log('options', options);

      chrome.storage.sync.get('monachrome', optionsRoot => {
        chrome.storage.sync.set(
          options,
          () => {
            alert('Option saved.');
          })
      })
    });
  });
});

function loadSample(mode) {
  // $('.loading.editor').show();
  xhr(mode.sampleURL, function (err, data) {
    if (err) {
      alert('Failed to load \' + mode.modeId + \' sample');
      console.log(err);
      // if (editor) {
      //   if (editor.getModel()) {
      //     editor.getModel().dispose();
      //   }
      //   editor.dispose();
      //   editor = null;
      // }
      // $('.loading.editor').fadeOut({ duration: 200 });
      // $('#editor').empty();
      // $('#editor').append('<p class="alert alert-error">Failed to load ' + mode.modeId + ' sample</p>');
      return;
    }

    // if (!editor) {
    //   $('#editor').empty();
    //   editor = monaco.editor.create(document.getElementById('editor'), {
    //     model: null,
    //   });
    // }

    const oldModel = editor.getModel();
    const newModel = monaco.editor.createModel(data, mode.modeId);
    editor.setModel(newModel);
    if (oldModel) {
      oldModel.dispose();
    }
    // $('.loading.editor').fadeOut({ duration: 300 });
  })
}

function xhr(url, cb) {
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'text',
    error: function () {
      cb(this, null);
    }
  }).done(function (data) {
    cb(null, data);
  });
}

function setFormState(state) {
  $('input[name="minimap"]').val([state.minimap.toString()]);
  $('input[name="linenumber"]').val([state.lineNumbers]);
}

// const minimap = document.getElementById('js-option-minimap');
// const minimapLabel = document.getElementById('js-option-minimap-label');
// const lineNumbers = document.getElementById('js-option-line-numbers');
// const language = document.getElementById('js-option-language');
//
// const restoreOptions = () => {
//   chrome.storage.sync.get('monachrome', function (optionsRoot) {
//     const monachrome = optionsRoot.monachrome;
//     if (monachrome.minimap) {
//       minimap.MaterialCheckbox.check();
//     } else {
//       minimap.MaterialCheckbox.uncheck();
//     }
//     // minimap.setAttribute('checked', monachrome.minimap);
//   });
// };
//
// const setOption = option => {
//   chrome.storage.sync.get('monachrome', optionsRoot => {
//     chrome.storage.sync.set({ monachrome: { ...optionsRoot.monachrome, ...option } }, () => {
//       notify();
//     })
//   })
// };
//
// const notify = () => {
//   const notification = document.querySelector('.mdl-js-snackbar');
//   const data = {
//     message: 'Confituration changed.',
//     timeout: 700,
//   };
//   notification.MaterialSnackbar.showSnackbar(data);
// };
//
// document.addEventListener('DOMContentLoaded', restoreOptions);
//
// minimap.addEventListener('click', () => {
//   setOption({ minimap: minimap.checked });
// });
//
// lineNumbers.addEventListener('click', () => {
//   setOption({ lineNumbers: lineNumbers.checked ? 'on' : 'off' });
// });
//
// language.addEventListener('change', () => {
//   const idx = language.selectedIndex;
//   const val = language.options[idx].value;
//   setOption({ language: val });
// });
