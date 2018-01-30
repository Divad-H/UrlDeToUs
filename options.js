
function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    urlMatchPattern: document.querySelector("#urlMatchPattern").value
  });
}

function restoreOptions() {

  
  function onError(error) {
    console.log(`Error: ${error}`);
  }

  function setCurrentChoice(result) {
    document.querySelector("#urlMatchPattern").value = result.urlMatchPattern || "https://msdn.microsoft.com/*";
  }

  var getting = browser.storage.local.get("urlMatchPattern");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);