import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PianoProvider } from './PianoContext';
import Navbar from './components/NavBar';
import LandingPage from './components/LandingPage';
import AppContent from './components/AppContent';
import Documentation from './components/Documentation';
import './styles/App.css';

function App() {
  const [pianoSound, setPianoSound] = useState(true);
  const [gameLength, setGameLength] = useState(60);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);

  const openDocumentation = () => setIsDocumentationOpen(true);
  const closeDocumentation = () => setIsDocumentationOpen(false);

  return (
    <Router>
      <PianoProvider>
        <div className="App">
          <Navbar
            openDocumentation={openDocumentation}
            pianoSound={pianoSound}
            setPianoSound={setPianoSound}
            gameLength={gameLength}
            setGameLength={setGameLength}
          />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route 
                path="/play/:mode" 
                element={
                  <AppContent 
                    pianoSound={pianoSound}
                    gameLength={gameLength}
                  />
                } 
              />
            </Routes>
          </main>
          <Documentation isOpen={isDocumentationOpen} onClose={closeDocumentation} />
        </div>
      </PianoProvider>
    </Router>
  );
}

export default App;