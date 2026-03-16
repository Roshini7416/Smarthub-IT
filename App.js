import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics'; 
import Settings from './components/Settings'; 

// 1. Add your translations dictionary
const translations = {
  English: {
    dashboard: "Dashboard",
    analytics: "Analytics",
    settings: "Settings",
    hub: "Hub",
    title: "User Settings",
    profile: "Profile Information",
    preferences: "Preferences",
    language: "Language",
    darkMode: "Dark Mode",
    save: "Save Settings"
  },
  Hindi: {
    dashboard: "डैशबोर्ड",
    analytics: "एनालिटिक्स",
    settings: "सेटिंग्स",
    hub: "हब",
    title: "यूज़र सेटिंग्स",
    profile: "प्रोफ़ाइल जानकारी",
    preferences: "प्राथमिकताएं",
    language: "भाषा",
    darkMode: "डार्क मोड",
    save: "सेटिंग्स सहेजें"
  }
};

function AppContent({ currentUser, setCurrentUser }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // 2. Add Language State
  const [language, setLanguage] = useState('English');
  
  const location = useLocation();
  
  // Get current translation object based on state
  const t = translations[language];

  const hideSidebarRoutes = ['/', '/register'];
  const shouldShowSidebar = currentUser && !hideSidebarRoutes.includes(location.pathname);

  const themeStyles = {
    backgroundColor: isDarkMode ? '#121212' : '#f8faff',
    color: isDarkMode ? '#ffffff' : '#333333',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{ display: 'flex', ...themeStyles, minHeight: '100vh' }}>
      {shouldShowSidebar && (
        <Sidebar 
          tenantName={currentUser.username} 
          building={currentUser.building} 
          floor={currentUser.floor}
          isDarkMode={isDarkMode}
          t={t} // 3. Pass translations to Sidebar
        />
      )}
      
      <main style={{ 
        flex: 1, 
        marginLeft: shouldShowSidebar ? '260px' : '0',
        transition: 'margin 0.3s ease' 
      }}>
        <Routes>
          <Route path="/" element={<Login onLogin={setCurrentUser} />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/dashboard" 
            element={currentUser ? <Dashboard t={t} isDarkMode={isDarkMode} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/analytics" 
            element={currentUser ? <Analytics t={t} isDarkMode={isDarkMode} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/settings" 
            element={currentUser ? (
              <Settings 
                currentUser={currentUser} 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode} 
                language={language} // 4. Pass language state
                setLanguage={setLanguage} // Pass setter
                t={t} // Pass translations
              />
            ) : <Navigate to="/" />} 
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <AppContent currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </Router>
  );
}

export default App;