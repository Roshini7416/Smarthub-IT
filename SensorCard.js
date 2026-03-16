import React, { useState } from 'react';

const SensorCard = ({ name, type, initialStatus, reading }) => {
    const [isOn, setIsOn] = useState(initialStatus === 1);

    // Safety check for the error in your previous screenshots
    const safeType = (type || "device").toLowerCase();

    return (
        <div className={`card ${isOn ? 'active' : ''} ${safeType}-card`}>
            <h4>{name || "Unnamed Device"}</h4>
            
            {/* If the type is Temperature, show the reading. Otherwise, show the Switch. */}
            {type === 'Temperature' ? (
                <div className="temp-display">
                    <h2 style={{ color: '#FF5733', fontSize: '2.5rem', margin: '10px 0' }}>
                        {reading ?? '--'}°C
                    </h2>
                    <p style={{ color: '#666' }}>Live Reading</p>
                </div>
            ) : (
                <div className="appliance-display">
                    <p>Type: {type}</p>
                    <p>Status: <strong>{isOn ? 'ON' : 'OFF'}</strong></p>
                    <button className="toggle-btn" onClick={() => setIsOn(!isOn)}>
                        {isOn ? 'Switch OFF' : 'Switch ON'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SensorCard;