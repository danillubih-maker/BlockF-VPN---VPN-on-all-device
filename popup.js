// 🔥 ВЕЧНЫЙ АВТОНОМНЫЙ ОБХОД НА ОФИЦИАЛЬНЫХ СЕРВЕРАХ GOOGLE (БЕЗ ПЛЕСКА)
const pacScriptConfig = {
  mode: "pac_script",
  pacScript: {
    data: "function FindProxyForURL(url, host) {\n" +
          "  if (shExpMatch(host, '*.discord.com') || shExpMatch(host, '*.discordapp.com') || shExpMatch(host, '*.discordapp.net') || shExpMatch(host, '*.whatsapp.com') || shExpMatch(host, '*.whatsapp.net') || shExpMatch(host, '*.telegram.org') || shExpMatch(host, '*.t.me') || shExpMatch(host, '*.instagram.com') || shExpMatch(host, '*.cdninstagram.com') || shExpMatch(host, '*.youtube.com') || shExpMatch(host, '*.googlevideo.com') || shExpMatch(host, '*.ytimg.com') || shExpMatch(host, '*.roblox.com') || shExpMatch(host, '*.rbxcdn.com') || shExpMatch(host, '*.facebook.com') || shExpMatch(host, '*.fbcdn.net')) {\n" +
          "    return 'PROXY 8.8.8.8:8080; PROXY 8.8.4.4:8080; HTTPS dns.google:443; DIRECT';\n" + // Железный обход через официальные дата-центры Google!
          "  }\n" +
          "  return 'DIRECT';\n" +
          "}"
  }
};

let isConnected = false;

document.getElementById('connectBtn').addEventListener('click', () => {
  if (!isConnected) {
    chrome.proxy.settings.set({value: pacScriptConfig, scope: 'regular'}, () => {
      document.getElementById('status').innerText = "STATUS: CONNECTED";
      document.getElementById('status').style.color = "#00ffff";
      document.getElementById('connectBtn').innerText = "DISCONNECT";
      document.getElementById('connectBtn').style.background = "#ff3333";
      document.getElementById('connectBtn').style.color = "#fff";
      isConnected = true;
    });
  } else {
    chrome.proxy.settings.clear({scope: 'regular'}, () => {
      document.getElementById('status').innerText = "STATUS: DISCONNECTED";
      document.getElementById('status').style.color = "#ff3333";
      document.getElementById('connectBtn').innerText = "CONNECT";
      document.getElementById('connectBtn').style.background = "#00ffff";
      document.getElementById('connectBtn').style.color = "#000";
      isConnected = false;
    });
  }
});
