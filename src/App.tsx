import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Progress from './pages/Progress';
import Lab from './pages/Lab';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-indigo-bg text-frosted-text font-sans selection:bg-lavender-accent/30 selection:text-lavender-accent">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
