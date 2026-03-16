import React, { useState } from 'react';

// Added language, setLanguage, and t (translations) to props
const Settings = ({ currentUser, isDarkMode, setIsDarkMode, language, setLanguage, t }) => {
    const [notifications, setNotifications] = useState(true);

    // Theme-based styles (react to Dark Mode)
    const pageBackground = isDarkMode ? '#121212' : '#f8faff';
    const cardBackground = isDarkMode ? '#1e1e1e' : 'white';
    const textColor = isDarkMode ? '#ffffff' : '#333333';
    const borderColor = isDarkMode ? '#444' : '#eee';
    const inputBg = isDarkMode ? '#2a2a2a' : '#ffffff';

    const cardStyle = {
        background: cardBackground,
        color: textColor,
        padding: '25px',
        borderRadius: '12px',
        boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.05)',
        marginBottom: '20px',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease'
    };

    const headerStyle = { 
        margin: '0 0 20px 0', 
        borderBottom: `1px solid ${borderColor}`, 
        paddingBottom: '10px' 
    };

    const inputStyle = { 
        width: '100%', 
        padding: '12px', 
        marginBottom: '20px', 
        borderRadius: '8px', 
        border: `1px solid ${borderColor}`, 
        background: inputBg,
        color: textColor,
        boxSizing: 'border-box' 
    };

    const toggleButtonStyle = { 
        cursor: 'pointer', 
        padding: '8px 16px', 
        borderRadius: '20px', 
        border: 'none',
        background: isDarkMode ? '#007bff' : '#ddd',
        color: isDarkMode ? 'white' : 'black',
        fontWeight: 'bold',
        transition: '0.3s'
    };

    return (
        <div style={{ 
            padding: '40px', 
            background: pageBackground, 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'background 0.3s ease'
        }}>
            <div style={{ width: '100%', maxWidth: '800px' }}>
                <h2 style={{ marginBottom: '30px', textAlign: 'left', color: textColor }}>
                    {/* t.title pulls from your translation dictionary in App.js */}
                    {t.title}
                </h2>
                
                {/* Profile Section */}
                <div style={cardStyle}>
                    <h4 style={headerStyle}>{t.profile}</h4>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Full Name</label>
                    <input type="text" defaultValue={currentUser?.username || "roshini"} style={inputStyle} />
                    
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Email Address</label>
                    <input type="email" placeholder="example@mail.com" style={inputStyle} />
                </div>

                {/* Preferences Section */}
                <div style={cardStyle}>
                    <h4 style={headerStyle}>{t.preferences}</h4>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <span>Push Notifications</span>
                        <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
                    </div>

                    {/* Dark Mode Toggle */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <span>{t.darkMode}</span>
                        <button onClick={() => setIsDarkMode(!isDarkMode)} style={toggleButtonStyle}>
                            {isDarkMode ? "🌙 On" : "☀️ Off"}
                        </button>
                    </div>

                    {/* Language Dropdown */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{t.language}</span>
                        <select 
                            value={language} 
                            onChange={(e) => setLanguage(e.target.value)} // Updates the global language state in App.js
                            style={{ 
                                padding: '8px', 
                                borderRadius: '5px', 
                                background: inputBg, 
                                color: textColor, 
                                border: `1px solid ${borderColor}`,
                                cursor: 'pointer'
                            }}
                        >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                    </div>
                </div>

                {/* Save Button */}
                <button style={{ 
                    background: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    padding: '15px 40px', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold', 
                    fontSize: '16px', 
                    marginTop: '10px',
                    width: '100%' 
                }}>
                    {t.save}
                </button>
            </div>
        </div>
    );
};

export default Settings;