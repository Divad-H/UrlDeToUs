
function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    urlMatchPattern: document.querySelector("#urlMatchPattern").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#urlMatchPattern").value = result.urlMatchPattern || "https://msdn.microsoft.com/*";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("urlMatchPattern");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);