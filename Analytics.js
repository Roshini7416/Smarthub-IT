import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Analytics = () => {
  const deviceData = [
    { name: 'Main AC', usage: 12.5 },
    { name: 'Lobby Light', usage: 2.1 },
    { name: 'Kitchen Geyser', usage: 8.4 },
  ];

  const tempHistory = [
    { time: '09:00', temp: 24 },
    { time: '12:00', temp: 28 },
    { time: '15:00', temp: 29 },
    { time: '18:00', temp: 26 },
    { time: '21:00', temp: 25 },
  ];

  return (
    <div style={{ 
        padding: '40px', 
        background: '#f8faff', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' // This centers the content area
    }}>
      <div style={{ width: '100%', maxWidth: '1100px' }}> {/* Container for better alignment */}
        <h2 style={{ marginBottom: '30px', textAlign: 'left' }}>
            Home <span style={{ color: '#007bff' }}>Analytics</span>
        </h2>

        {/* Energy Usage Summary Cards */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px', 
            marginBottom: '30px' 
        }}>
          {[
            { label: 'Today', value: '15.4 kWh' },
            { label: 'Weekly', value: '98 kWh' },
            { label: 'Monthly', value: '412 kWh' },
            { label: 'Peak Time', value: '3:00 PM' }
          ].map((item, i) => (
            <div key={i} style={cardStyle}>
              <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{item.label}</p>
              <h3 style={{ margin: '10px 0 0 0', color: '#333' }}>{item.value}</h3>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px' }}>
          {/* Device Power Consumption Chart */}
          <div style={cardStyle}>
            <h4 style={chartHeaderStyle}>Device Consumption (kWh)</h4>
            <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#007bff" radius={[5, 5, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </div>
          </div>

          {/* Temperature History Chart */}
          <div style={cardStyle}>
            <h4 style={chartHeaderStyle}>Temperature History (°C)</h4>
            <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tempHistory}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#ff4d4d" strokeWidth={3} dot={{ r: 6, fill: '#ff4d4d' }} />
                </LineChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Smart Alerts Section */}
        <div style={{ 
            marginTop: '30px', 
            background: '#fff3cd', 
            padding: '20px', 
            borderRadius: '12px', 
            borderLeft: '6px solid #ffc107',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#856404', fontSize: '16px' }}>⚠️ Smart Alerts</h5>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
            <li>Main AC running for too long (over 5 hours).</li>
            <li>High temperature detected in Main Balcony (28.5°C).</li>
            <li>Energy consumption is 12% higher than last week.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Internal Styles
const cardStyle = {
  background: 'white',
  padding: '25px',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  width: '100%',
  boxSizing: 'border-box'
};

const chartHeaderStyle = { 
  margin: '0 0 20px 0', 
  fontSize: '16px', 
  color: '#333', 
  borderBottom: '1px solid #eee', 
  paddingBottom: '10px' 
};

export default Analytics;