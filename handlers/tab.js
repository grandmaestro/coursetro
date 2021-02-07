export const openUrlInTab = (url) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.create({
      url
    }, (contentTab) => {
      let listener = (tabId, info) => {
        if (info.status === 'complete' && tabId === contentTab.id) {
          chrome.tabs.onUpdated.removeListener(listener);
          return resolve(contentTab);
        }
      }
      chrome.tabs.onUpdated.addListener(listener);
    })
  })
}

export const updateUrlInTab = (tab, url) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.update(tab.id, { url: url }, (contentTab) => {
      let listener = (tabId, info) => {
        if (info.status === 'complete' && tabId === contentTab.id) {
          chrome.tabs.onUpdated.removeListener(listener);
          return resolve(contentTab);
        }
      }
      chrome.tabs.onUpdated.addListener(listener);
    });
  });
}

export const closeTab = (tab) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.remove(tab.id, () => {
      resolve();
    })
  });
}