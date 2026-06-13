const googlePacConfig = {
  mode: "pac_script",
  pacScript: {
    data: "function FindProxyForURL(url, host) {\n" +
          "  return 'PROXY 8.8.8.8:8080; PROXY 8.8.4.4:8080; HTTPS dns.google:443; DIRECT';\n" +
          "}"
  }
};

// Функция принудительного зажигания значка VPN на нижней панели Хромбука
function enableVpnIcon() {
  if (chrome.vpnProvider && chrome.vpnProvider.createConfig) {
    chrome.vpnProvider.createConfig("Block Fun Net", () => {
      if (chrome.vpnProvider.notifyConnectionStateChanged) {
        chrome.vpnProvider.notifyConnectionStateChanged("connected", () => {});
      }
    });
  }
}

// Функция тушения значка VPN на нижней панели
function disableVpnIcon() {
  if (chrome.vpnProvider && chrome.vpnProvider.destroyConfig) {
    chrome.vpnProvider.destroyConfig(() => {});
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "connect") {
    chrome.proxy.settings.set({value: googlePacConfig, scope: 'regular'}, () => {
      enableVpnIcon(); // Значок загорается СТРОГО при включении
      chrome.storage.local.set({vpnActive: true}, () => {
        sendResponse({status: "ok"});
      });
    });
    return true;
  } else if (request.command === "disconnect") {
    chrome.proxy.settings.clear({scope: 'regular'}, () => {
      disableVpnIcon(); // Значок пропадает СТРОГО при выключении
      chrome.storage.local.set({vpnActive: false}, () => {
        sendResponse({status: "ok"});
      });
    });
    return true;
  }
});
