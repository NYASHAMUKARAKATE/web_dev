function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

const cmdInput = document.getElementById('cmd-input');

cmdInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const command = cmdInput.value.toLowerCase().trim();
        
        
        if (command === 'theme red') {
            document.documentElement.style.setProperty('--accent-color', '#ff4d4d');
            document.documentElement.style.setProperty('--accent-glow', 'rgba(255, 77, 77, 0.3)');
        } 
        else if (command === 'theme blue') {
            document.documentElement.style.setProperty('--accent-color', '#00f2ff');
            document.documentElement.style.setProperty('--accent-glow', 'rgba(0, 242, 255, 0.3)');
        }
        else if (command === 'clear') {
            console.log("System Logs Cleared");
        }
        else {
            cmdInput.style.color = 'red';
            setTimeout(() => cmdInput.style.color = 'var(--accent-color)', 500);
        }

        cmdInput.value = '';
    }
});


function updateResources() {
    const cpu = Math.floor(Math.random() * 100);
    const mem = Math.floor(Math.random() * 100);

    document.getElementById('cpu-bar').style.width = cpu + "%";
    document.getElementById('mem-bar').style.width = mem + "%";
}


const logs = [
    "Initializing neural link...",
    "Bypassing firewall...",
    "Accessing encrypted sectors...",
    "Signal strength: 98%",
    "Packet loss: 0.02%"
];

function addLog() {
    const container = document.getElementById('log-container');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    
    entry.innerText = `> ${logs[Math.floor(Math.random() * logs.length)]}`;
    
    container.appendChild(entry);

    
    if (container.childNodes.length > 5) {
        container.removeChild(container.firstChild);
    }
}

setInterval(() => {
    updateResources();
    addLog();
}, 2000);