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

function changeUrl(tabInfo) {
  if (tabInfo != null) {
    var url = tabInfo.url.replace(/\/de-de\//i, "/en-us/");
    url = url.replace(/\/de\//i, "/en/");
    url = url.replace(/\/de_de\//i, "/en_us/");
    if (url != tabInfo.url) {
      var updating = browser.tabs.update( 
        tabInfo.id,
        { url: url }
      );
    }
  }
}

browser.pageAction.onClicked.addListener(changeUrl);
