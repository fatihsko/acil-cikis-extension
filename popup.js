document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggleExtension');
  
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      if (!backgroundPage || !backgroundPage.background) {
        console.error("Background page or its content not found.");
        return;
      }
  
      var background = backgroundPage.background;
      var isExtensionActive = background.isExtensionActive();
  
      updateToggleButton(isExtensionActive);
  
      toggleButton.addEventListener('click', function () {
        if (isExtensionActive) {
          background.deactivateExtension();
        } else {
          background.activateExtension();
        }
  
        isExtensionActive = !isExtensionActive;
        updateToggleButton(isExtensionActive);
      });
    });
  
    function updateToggleButton(isActive) {
      toggleButton.textContent = isActive ? 'Eklentiyi Deaktif Et' : 'Eklentiyi Aktif Et';
    }
  });
  