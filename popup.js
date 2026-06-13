const connectBtn = document.getElementById('connectBtn');
const statusText = document.getElementById('status');

// Железная проверка статуса при повторном открытии расширения
chrome.storage.local.get(['vpnActive'], (data) => {
  if (data.vpnActive === true) {
    setUIConnected();
  } else {
    setUIDisconnected();
  }
});

connectBtn.addEventListener('click', () => {
  chrome.storage.local.get(['vpnActive'], (data) => {
    if (!data.vpnActive) {
      chrome.runtime.sendMessage({command: "connect"}, () => {
        setUIConnected();
      });
    } else {
      chrome.runtime.sendMessage({command: "disconnect"}, () => {
        setUIDisconnected();
      });
    }
  });
});

function setUIConnected() {
  statusText.innerText = "STATUS: GLOBAL CONNECTED";
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
