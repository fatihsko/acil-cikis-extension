let extensionActive = true;

function isExtensionActive() {
  return extensionActive;
}

function activateExtension() {
  extensionActive = true;
}

function deactivateExtension() {
  extensionActive = false;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === "close-tab") {
      closeActiveTab();
    }
  });
});

function closeActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tab = tabs[0];
      chrome.tabs.remove(tab.id, () => {
        chrome.history.deleteUrl({ url: tab.url });
      });
    }
  });
}
