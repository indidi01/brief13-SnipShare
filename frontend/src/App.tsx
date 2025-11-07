// frontend/src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SnippetProvider } from './contexts/SnippetContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthModal } from './components/organisms/AuthModal/AuthModal';

// Pages
import { Home } from './components/pages/Home/HomePage';
import { ExplorerPage } from './components/pages/Explorer/ExplorerPage';
import { CreatePage } from './components/pages/CreatePage/CreatePage';
import { SnippetDetailPage } from './components/pages/SnippetDetail/SnippetDetailPage';
import { ProfilePage } from './components/pages/Profile/ProfilePage';
import { NotFoundPage } from './components/pages/NotFound/NotFoundPage';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SnippetProvider>
          <BrowserRouter>
            {/* Modal d'authentification globale */}
            <AuthModalWrapper />
            
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<ExplorerPage />} />

              <Route path="/snippet/:id" element={<SnippetDetailPage />} />
              
              {/* Routes protégées (nécessitent une authentification) */}
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreatePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:userId"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              
              {/* Route 404 - doit être en dernier */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </SnippetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Composant wrapper pour la modal d'authentification
function AuthModalWrapper() {
  const { authModalOpen, setAuthModalOpen } = useAuth();
  
  return (
    <AuthModal
      isOpen={authModalOpen}
      onClose={() => setAuthModalOpen(false)}
    />
  );
}

export default App;