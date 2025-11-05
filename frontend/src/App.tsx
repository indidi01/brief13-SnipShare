// frontend/src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SnippetProvider } from './contexts/SnippetContext';
import { Home } from './components/pages/Home/HomePage';
import { ExplorerPage } from './components/pages/Explorer/ExplorerPage';
import { CreatePage } from './components/pages/CreatePage/CreatePage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SnippetProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<ExplorerPage />} />
              <Route path="/create" element={<CreatePage />} />
            </Routes>
          </BrowserRouter>
        </SnippetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;