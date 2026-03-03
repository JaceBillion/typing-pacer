import React from 'react';
import { NavLink } from 'react-router-dom';
import { Keyboard, Activity, BookOpen, Sparkles, Gamepad2 } from 'lucide-react';
import clsx from 'clsx';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const navLinks = [
    { to: '/', label: 'The Pacer', icon: Keyboard },
    { to: '/lessons', label: 'Lessons', icon: BookOpen },
    { to: '/progress', label: 'Progress', icon: Activity },
    { to: '/games', label: 'Games', icon: Gamepad2 },
    { to: '/lab', label: 'The Lab', icon: Sparkles },
  ];

  return (
    <nav className="w-full bg-slate-ui/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between min-w-max sm:min-w-0">
        {/* Left Spacer to perfectly balance the right side */}
        <div className="flex-1 hidden lg:block"></div>

        {/* Center: Logo + Nav */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 flex-1 lg:flex-none">
          <div className="flex items-center gap-2 text-lavender-accent font-bold text-xl tracking-tight shrink-0">
            <img src="/logo.png" alt="Typing Pacer Logo" className="h-8 sm:h-10 w-auto object-contain" />
          </div>
          
          <div className="flex gap-1 sm:gap-2 md:gap-6">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap',
                    isActive
                      ? 'bg-lavender-accent/10 text-lavender-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                      : 'text-frosted-text/70 hover:text-frosted-text hover:bg-white/5'
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
        
        {/* Right: Sparks & Theme */}
        <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4 ml-4 sm:ml-0">
          <ThemeSwitcher />
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-lavender-accent bg-lavender-accent/10 px-2 sm:px-3 py-1.5 rounded-full border border-lavender-accent/20 whitespace-nowrap">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden lg:inline">1,240 Sparks</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
