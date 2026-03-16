import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.css'; 

const Sidebar = ({ tenantName, building, floor }) => {
    const navigate = useNavigate(); 
    const location = useLocation(); 

    return (
        <div className="sidebar">
            <div className="profile-section">
                <div className="avatar">{tenantName ? tenantName.charAt(0).toUpperCase() : "G"}</div>
                <h3>{tenantName || "Guest User"}</h3>
                <p className="tenant-status">Verified Tenant</p>
            </div>
            
            <nav className="sidebar-nav">
                {/* Dashboard Link */}
                <div 
                    className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
                    onClick={() => navigate('/dashboard')}
                    style={{ cursor: 'pointer' }}
                >
                    Dashboard
                </div>

                {/* Analytics Link */}
                <div 
                    className={`nav-item ${location.pathname === '/analytics' ? 'active' : ''}`}
                    onClick={() => navigate('/analytics')}
                    style={{ cursor: 'pointer' }}
                >
                    Analytics
                </div>

                {/* Settings Link - NOW UPDATED & ACTIVE */}
                <div 
                    className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
                    onClick={() => navigate('/settings')}
                    style={{ cursor: 'pointer' }}
                >
                    Settings
                </div>
            </nav>

            <div className="location-footer">
                <p><strong>Building:</strong> {building || "N/A"}</p>
                <p><strong>Floor:</strong> {floor || "N/A"}</p>
            </div>
        </div>
    );
};

export default Sidebar;