const googlePacConfig = {
  mode: "pac_script",
  pacScript: {
    data: "function FindProxyForURL(url, host) {\n" +
          "  return 'PROXY 8.8.8.8:8080; PROXY 8.8.4.4:8080; DIRECT';\n" +
          "}"
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "connect") {
    chrome.proxy.settings.set({value: googlePacConfig, scope: 'regular'}, () => {
      chrome.storage.local.set({vpnActive: true}, () => {
        sendResponse({status: "ok"});
      });
    });
    return true;
  } else if (request.command === "disconnect") {
    chrome.proxy.settings.clear({scope: 'regular'}, () => {
      chrome.storage.local.set({vpnActive: false}, () => {
        sendResponse({status: "ok"});
      });
    });
    return true;
  }
});
