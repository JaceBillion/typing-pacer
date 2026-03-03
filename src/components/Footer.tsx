import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-slate-ui/30 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-frosted-text/50 text-sm">
          &copy; {currentYear} Typing Pacer. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/about" className="text-frosted-text/70 hover:text-lavender-accent transition-colors">
            About Us
          </Link>
          <Link to="/privacy" className="text-frosted-text/70 hover:text-lavender-accent transition-colors">
            Privacy Policy
          </Link>
          <a 
            href="https://x.com/typingpacer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-frosted-text/70 hover:text-lavender-accent transition-colors"
          >
            <Twitter className="w-4 h-4" />
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
