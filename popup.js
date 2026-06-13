// При открытии окошка сразу проверяем, был ли включен ВПН ранее
chrome.storage.local.get(['vpnStatus'], (result) => {
  if (result.vpnStatus === "connected") {
    setUIConnected();
  } else {
    setUIDisconnected();
  }
});

const connectBtn = document.getElementById('connectBtn');
const statusText = document.getElementById('status');

connectBtn.addEventListener('click', () => {
  chrome.storage.local.get(['vpnStatus'], (result) => {
    if (result.vpnStatus !== "connected") {
      chrome.runtime.sendMessage({command: "connect"}, (response) => {
        if (response && response.status === "success") setUIConnected();
      });
    } else {
      chrome.runtime.sendMessage({command: "disconnect"}, (response) => {
        if (response && response.status === "success") setUIDisconnected();
      });
    }
  });
});

function setUIConnected() {
  statusText.innerText = "STATUS: CONNECTED";
  statusText.style.color = "#00ffff";
  connectBtn.innerText = "DISCONNECT";
  connectBtn.style.background = "#ff3333";
  connectBtn.style.color = "#fff";
}

function setUIDisconnected() {
  statusText.innerText = "STATUS: DISCONNECTED";
  statusText.style.color = "#ff3333";
  connectBtn.innerText = "CONNECT";
  connectBtn.style.background = "#00ffff";
  connectBtn.style.color = "#000";
}
