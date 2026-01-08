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

        // Logging system
        function addLog(message, type = 'normal') {
            const container = document.getElementById('log-container');
            const entry = document.createElement('div');
            entry.className = `log-entry ${type}`;
            const timestamp = new Date().toLocaleTimeString();
            entry.innerText = `[${timestamp}] ${message}`;
            container.appendChild(entry);
            if (container.childNodes.length > 8) {
                container.removeChild(container.firstChild);
            }
            container.scrollTop = container.scrollHeight;
        }

        // Real weather data
        async function fetchWeatherData() {
            try {
                addLog('Fetching environmental data...', 'success');
                const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-26.81&longitude=27.82&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,pressure_msl&timezone=auto');
                const data = await response.json();
                
                document.getElementById('location').textContent = 'ZA';
                document.getElementById('temperature').textContent = `${Math.round(data.current.temperature_2m)}°C`;
                document.getElementById('humidity').textContent = `${data.current.relative_humidity_2m}%`;
                document.getElementById('wind').textContent = `${Math.round(data.current.wind_speed_10m)} km/h`;
                document.getElementById('pressure').textContent = `${Math.round(data.current.pressure_msl)} hPa`;
                
                const weatherCodes = {
                    0: 'Clear', 1: 'Clear', 2: 'Cloudy', 3: 'Overcast',
                    45: 'Foggy', 48: 'Foggy', 51: 'Drizzle', 61: 'Rain',
                    71: 'Snow', 95: 'Storm'
                };
                document.getElementById('conditions').textContent = weatherCodes[data.current.weather_code] || 'Unknown';
                
                addLog('Environmental scan complete', 'success');
                updateTempChart();
            } catch (error) {
                addLog('Weather data fetch failed', 'error');
                console.error(error);
            }
        }

        // Network metrics simulation with real timing
        let requestCount = 0;
        let startTime = Date.now();

        async function updateNetworkMetrics() {
            const start = performance.now();
            try {
                await fetch('https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&current=temperature_2m');
                const latency = Math.round(performance.now() - start);
                
                document.getElementById('latency-val').textContent = `${latency} ms`;
                document.getElementById('latency-bar').style.width = `${Math.min(latency / 10, 100)}%`;
                
                requestCount++;
                document.getElementById('requests-val').textContent = requestCount;
                document.getElementById('requests-bar').style.width = `${Math.min(requestCount * 2, 100)}%`;
                
                const uptime = Math.floor((Date.now() - startTime) / 1000);
                const minutes = Math.floor(uptime / 60);
                const seconds = uptime % 60;
                document.getElementById('uptime-val').textContent = `${minutes}m ${seconds}s`;
                document.getElementById('uptime-bar').style.width = '100%';
                
            } catch (error) {
                addLog('Network check failed', 'error');
            }
        }

        // Temperature chart
        let tempHistory = [];
        function updateTempChart() {
            const temp = parseInt(document.getElementById('temperature').textContent);
            if (!isNaN(temp)) {
                tempHistory.push(temp);
                if (tempHistory.length > 20) tempHistory.shift();
                
                const chart = document.getElementById('temp-chart');
                chart.innerHTML = '';
                const max = Math.max(...tempHistory);
                const min = Math.min(...tempHistory);
                const range = max - min || 1;
                
                tempHistory.forEach(t => {
                    const bar = document.createElement('div');
                    bar.className = 'chart-bar';
                    const height = ((t - min) / range) * 60 + 20;
                    bar.style.height = `${height}px`;
                    chart.appendChild(bar);
                });
            }
        }

        // Command input
        const cmdInput = document.getElementById('cmd-input');
        cmdInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const command = cmdInput.value.toLowerCase().trim();
                
                if (command === 'help') {
                    addLog('Available: help, status, weather, clear, theme [color]', 'success');
                } else if (command === 'status') {
                    addLog('All systems operational', 'success');
                    updateNetworkMetrics();
                } else if (command === 'weather') {
                    fetchWeatherData();
                } else if (command === 'clear') {
                    document.getElementById('log-container').innerHTML = '';
                    addLog('Terminal cleared', 'success');
                } else if (command.startsWith('theme ')) {
                    const color = command.split(' ')[1];
                    const colors = {
                        red: ['#ff4d4d', 'rgba(255, 77, 77, 0.3)'],
                        blue: ['#00f2ff', 'rgba(0, 242, 255, 0.3)'],
                        green: ['#00ff88', 'rgba(0, 255, 136, 0.3)'],
                        purple: ['#bc13fe', 'rgba(188, 19, 254, 0.3)'],
                        orange: ['#ff9500', 'rgba(255, 149, 0, 0.3)']
                    };
                    if (colors[color]) {
                        document.documentElement.style.setProperty('--accent-color', colors[color][0]);
                        document.documentElement.style.setProperty('--accent-glow', colors[color][1]);
                        addLog(`Theme changed to ${color}`, 'success');
                    } else {
                        addLog('Invalid theme. Try: red, blue, green, purple, orange', 'warning');
                    }
                } else if (command) {
                    addLog(`Unknown command: ${command}`, 'error');
                    cmdInput.style.color = 'red';
                    setTimeout(() => cmdInput.style.color = 'var(--accent-color)', 500);
                }
                
                cmdInput.value = '';
            }
        });

        // Initialize
        addLog('System initialization complete', 'success');
        addLog('Neural link established', 'success');
        fetchWeatherData();
        updateNetworkMetrics();

        // Update intervals
        setInterval(updateNetworkMetrics, 5000);
        setInterval(fetchWeatherData, 60000); // Update weather every minute
        
        // Random system logs
        const systemLogs = [
            'Monitoring network traffic...',
            'Encrypting data packets...',
            'Signal strength optimal',
            'Running diagnostic sweep...',
            'Firewall status: active',
            'Quantum sync in progress...'
        ];
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                addLog(systemLogs[Math.floor(Math.random() * systemLogs.length)]);
            }
        }, 3000);