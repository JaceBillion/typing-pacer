import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

const THEMES = [
  { id: 'default', name: 'Midnight', color: '#BB9AF7' },
  { id: 'matcha', name: 'Matcha', color: '#A3BE8C' },
  { id: 'cyberpunk', name: 'Cyberpunk', color: '#00FF9D' },
  { id: 'e-ink', name: 'E-Ink', color: '#18181B' },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('pacer-theme') || 'default';
  });

  useEffect(() => {
    if (currentTheme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
    localStorage.setItem('pacer-theme', currentTheme);
  }, [currentTheme]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-lg text-frosted-text/70 hover:text-lavender-accent hover:bg-white/5 transition-colors"
        aria-label="Change Theme"
      >
        <Palette className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-slate-ui border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-2">
              <div className="text-xs font-bold text-frosted-text/50 uppercase tracking-wider px-3 py-2">
                Themes
              </div>
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setCurrentTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentTheme === theme.id 
                      ? 'bg-lavender-accent/10 text-lavender-accent' 
                      : 'text-frosted-text/80 hover:bg-white/5'
                  }`}
                >
                  <span 
                    className="w-3 h-3 rounded-full shadow-sm" 
                    style={{ backgroundColor: theme.color }}
                  ></span>
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
