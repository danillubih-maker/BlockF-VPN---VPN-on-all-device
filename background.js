const pacScriptConfig = {
  mode: "pac_script",
  pacScript: {
    data: "function FindProxyForURL(url, host) {\n" +
          "  if (shExpMatch(host, '*.discord.com') || shExpMatch(host, '*.discordapp.com') || shExpMatch(host, '*.discordapp.net') || shExpMatch(host, '*.whatsapp.com') || shExpMatch(host, '*.whatsapp.net') || shExpMatch(host, '*.telegram.org') || shExpMatch(host, '*.t.me') || shExpMatch(host, '*.instagram.com') || shExpMatch(host, '*.cdninstagram.com') || shExpMatch(host, '*.youtube.com') || shExpMatch(host, '*.googlevideo.com') || shExpMatch(host, '*.ytimg.com') || shExpMatch(host, '*.roblox.com') || shExpMatch(host, '*.rbxcdn.com') || shExpMatch(host, '*.facebook.com') || shExpMatch(host, '*.fbcdn.net')) {\n" +
          "    return 'PROXY 8.8.8.8:8080; PROXY 8.8.4.4:8080; HTTPS dns.google:443; DIRECT';\n" +
          "  }\n" +
          "  return 'DIRECT';\n" +
          "}"
  }
};

// Слушаем команды от нашей кнопки из окошка popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "connect") {
    chrome.proxy.settings.set({value: pacScriptConfig, scope: 'regular'}, () => {
      chrome.storage.local.set({vpnStatus: "connected"}, () => {
        sendResponse({status: "success"});
      });
    });
    return true;
  } else if (request.command === "disconnect") {
    chrome.proxy.settings.clear({scope: 'regular'}, () => {
      chrome.storage.local.set({vpnStatus: "disconnected"}, () => {
        sendResponse({status: "success"});
      });
    });
    return true;
  }
});
