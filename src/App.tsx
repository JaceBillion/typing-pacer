import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Progress from './pages/Progress';
import Lab from './pages/Lab';
import About from './pages/About';
import Games from './pages/Games';
import Privacy from './pages/Privacy';
import AdPlaceholder from './components/AdPlaceholder';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-indigo-bg text-frosted-text font-sans selection:bg-lavender-accent/30 selection:text-lavender-accent">
        <Navbar />
        <div className="flex-1 flex w-full max-w-[1920px] mx-auto">
          {/* Left Ad Sidebar */}
          <aside className="hidden xl:flex w-[160px] 2xl:w-[300px] flex-col items-center justify-start pt-12 shrink-0">
            <div className="sticky top-24">
              <div className="2xl:hidden">
                <AdPlaceholder format="skyscraper" />
              </div>
              <div className="hidden 2xl:block">
                <AdPlaceholder format="vertical" />
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/games" element={<Games />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>

          {/* Right Ad Sidebar */}
          <aside className="hidden xl:flex w-[160px] 2xl:w-[300px] flex-col items-center justify-start pt-12 shrink-0">
            <div className="sticky top-24">
              <div className="2xl:hidden">
                <AdPlaceholder format="skyscraper" />
              </div>
              <div className="hidden 2xl:block">
                <AdPlaceholder format="vertical" />
              </div>
            </div>
          </aside>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
