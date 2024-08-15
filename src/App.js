//test1
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PianoProvider } from './PianoContext';
import Navbar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Learn from './components/Learn';
import Practice from './components/Practice';
import Quiz from './components/Quiz';
import AppContent from './components/AppContent';
import Documentation from './components/Documentation';
import MajorScales from './components/LearningPages/MajorScales';
import Triads from './components/LearningPages/Triads';
import SeventhChord from './components/LearningPages/SeventhChord';
import Tensions from './components/LearningPages/Tensions';
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
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/MajorScales" element={<MajorScales />} />
              <Route path="/learn/Triads" element={<Triads />} />
              <Route path="/learn/SeventhChord" element={<SeventhChord />} />
              <Route path="/learn/Tensions" element={<Tensions />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/play/:section/:mode" element={<AppContent pianoSound={pianoSound} gameLength={gameLength} />} />
            </Routes>
          </main>
          <Documentation isOpen={isDocumentationOpen} onClose={closeDocumentation} />
        </div>
      </PianoProvider>
    </Router>
  );
}

export default App;