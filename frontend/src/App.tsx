// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import  ThemeProvider  from './contexts/ThemeContext';
// import  AuthProvider  from './contexts/AuthContext';
// import SnippetProvider  from './contexts/SnippetContext';
import MainLayout from './components/templates/MainLayout/MainLayout';
import Home from './components/pages/Home/HomePage';
import Explore from './components/pages/Explorer/ExplorerPage';
import Create from './components/pages/Create/CreatePage';
import Profile from './components/pages/Profile/ProfilePage';
import './App.css';

const App: React.FC = () => {
  return (
    // <ThemeProvider>
    //   <AuthProvider>
    //     <SnippetProvider>
          <Router>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/create" element={<Create />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </MainLayout>
          </Router>
    //     </SnippetProvider>
    //   </AuthProvider>
    // </ThemeProvider>
  );
};

export default App;