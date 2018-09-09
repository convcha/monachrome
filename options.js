// minimap
const minimap = document.getElementById('js-option-minimap');
minimap.addEventListener('click', () => {
  chrome.storage.sync.set({ minimap: minimap.checked }, () => {
    notify();
  })
});

// lineNumbers
const lineNumbers = document.getElementById('js-option-line-numbers');
lineNumbers.addEventListener('click', () => {
  chrome.storage.sync.set({ lineNumbers: lineNumbers.checked ? 'on' : 'off' }, () => {
    notify();
  })
});

// language
const language = document.getElementById('js-option-language');
language.addEventListener('change', () => {
  const idx = language.selectedIndex;
  const val = language.options[idx].value;
  chrome.storage.sync.set({ language: val }, () => {
    notify();
  })
});

const notify = () => {
  const notification = document.querySelector('.mdl-js-snackbar');
  const data = {
    message: 'Confituration changed.',
    timeout: 700,
  };
  notification.MaterialSnackbar.showSnackbar(data);
};
