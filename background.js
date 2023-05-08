// open YouTube on install
chrome.runtime.onInstalled.addListener(details => {
  if(details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({url: "https://www.youtube.com/"});
  }
});
