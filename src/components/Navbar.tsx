import React from 'react';
import { NavLink } from 'react-router-dom';
import { Keyboard, Activity, BookOpen, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const navLinks = [
    { to: '/', label: 'The Pacer', icon: Keyboard },
    { to: '/lessons', label: 'Lessons', icon: BookOpen },
    { to: '/progress', label: 'Progress', icon: Activity },
    { to: '/lab', label: 'The Lab', icon: Sparkles },
  ];

  return (
    <nav className="w-full bg-slate-ui/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lavender-accent font-bold text-xl tracking-tight">
          <img src="/logo.png" alt="Typing Pacer Logo" className="h-10 w-auto object-contain" />
        </div>
        
        <div className="flex gap-6">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-lavender-accent/10 text-lavender-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                    : 'text-frosted-text/70 hover:text-frosted-text hover:bg-white/5'
                )
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-sm font-medium text-lavender-accent bg-lavender-accent/10 px-3 py-1.5 rounded-full border border-lavender-accent/20">
          <Sparkles className="w-4 h-4" />
          <span>1,240 Sparks</span>
        </div>
      </div>
    </nav>
  );
}
