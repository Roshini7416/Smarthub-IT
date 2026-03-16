import React, { useState, useEffect } from 'react';
import SensorCard from './SensorCard'; 
import './Dashboard.css';
import TempChart from './TempChart';

const Dashboard = () => {
    const [appliances, setAppliances] = useState([]);

    const [history, setHistory] = useState([]);

// Inside Dashboard.js

useEffect(() => {
    const fetchHistory = () => {
        // ID 4 is your 'Main Balcony' temperature sensor
        fetch(`http://localhost:3001/api/temp-history/4`)
            .then(res => res.json())
            .then(data => setHistory(data))
            .catch(err => console.log("History fetch error:", err));
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 30000); // Update chart every 30 seconds
    return () => clearInterval(interval);
}, []);

    useEffect(() => {
        const fetchDevices = () => {
            fetch(`http://localhost:3001/api/appliances/1`) 
                .then(res => res.json())
                .then(data => {
                    console.log("Data received:", data);
                    setAppliances(data);
                })
                .catch(err => console.log("Fetch error:", err));
        };

        fetchDevices(); 
        const interval = setInterval(fetchDevices, 5000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1>SmartIT <span>Hub</span></h1>
                <p>Real-time monitoring and appliance control.</p>
            </header>

            <div className="dashboard-grid">
                {/* This is the map function that creates each card */}
                {appliances.map(device => (
                    <SensorCard 
                        key={device.id} 
                        name={device.device_name}  
                        type={device.device_type}  
                        initialStatus={device.status} 
                        reading={device.reading} 
                    />
                ))}
            </div>
            <div className="graph-container">
            <TempChart data={history} />
        </div>
        </div>
    );
};

export default Dashboard;