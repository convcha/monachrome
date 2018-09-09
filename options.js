const minimap = document.getElementById('js-option-minimap');
const minimapLabel = document.getElementById('js-option-minimap-label');
const lineNumbers = document.getElementById('js-option-line-numbers');
const language = document.getElementById('js-option-language');

const restoreOptions = () => {
  chrome.storage.sync.get('monachrome', function (optionsRoot) {
    const monachrome = optionsRoot.monachrome;
    if (monachrome.minimap) {
      minimap.MaterialCheckbox.check();
    } else {
      minimap.MaterialCheckbox.uncheck();
    }
    // minimap.setAttribute('checked', monachrome.minimap);
  });
};

const setOption = option => {
  chrome.storage.sync.get('monachrome', optionsRoot => {
    chrome.storage.sync.set({ monachrome: { ...optionsRoot.monachrome, ...option } }, () => {
      notify();
    })
  })
};

const notify = () => {
  const notification = document.querySelector('.mdl-js-snackbar');
  const data = {
    message: 'Confituration changed.',
    timeout: 700,
  };
  notification.MaterialSnackbar.showSnackbar(data);
};

document.addEventListener('DOMContentLoaded', restoreOptions);

minimap.addEventListener('click', () => {
  setOption({ minimap: minimap.checked });
});

lineNumbers.addEventListener('click', () => {
  setOption({ lineNumbers: lineNumbers.checked ? 'on' : 'off' });
});

language.addEventListener('change', () => {
  const idx = language.selectedIndex;
  const val = language.options[idx].value;
  setOption({ language: val });
});
