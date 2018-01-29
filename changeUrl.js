function initializePageAction(tab) {
  if (tab.url.toLowerCase().includes("/de-de/") || tab.url.toLowerCase().includes("/de/") || tab.url.toLowerCase().includes("/de_de/")) {
    browser.pageAction.show(tab.id);
  }
  else {
    browser.pageAction.hide(tab.id);
  }
}

var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

function changeURL(url) {
  var result = url.replace(/\/de-de\//i, "/en-us/");
  result = result.replace(/\/de\//i, "/en/");
  result = result.replace(/\/de_de\//i, "/en_us/");
  return result;
}

function changeUrlTab(tabInfo) {
  if (tabInfo != null) {
    var url = changeURL(tabInfo.url);
    if (url != tabInfo.url) {
      var updating = browser.tabs.update( 
        tabInfo.id,
        { url: url }
      );
    }
  }
}

browser.pageAction.onClicked.addListener(changeUrlTab);

function changeURLAuto(requestDetails) {
  var url = changeURL(requestDetails.url);
  if (url != requestDetails.url) {
    return { redirectUrl: url };
  }
  else {
    return {cancel: false};
  }
}

browser.webRequest.onBeforeRequest.addListener(
  changeURLAuto,
  {urls: ["https://msdn.microsoft.com/*"]},
  ["blocking"]
);