import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Progress from './pages/Progress';
import Lab from './pages/Lab';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-indigo-bg text-frosted-text font-sans selection:bg-lavender-accent/30 selection:text-lavender-accent">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/lab" element={<Lab />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
