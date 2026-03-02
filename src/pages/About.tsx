import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto px-6 py-24 min-h-[calc(100vh-4rem-5rem)]"
    >
      <h1 className="text-4xl font-bold text-lavender-accent mb-8">About Typing Pacer</h1>
      
      <div className="space-y-6 text-frosted-text/80 leading-relaxed text-lg">
        <p>
          Typing Pacer was built with a single goal in mind: to help you achieve a state of flow while typing. 
          We believe that typing shouldn't be a stressful race against a ticking clock, but rather a smooth, 
          rhythmic exercise in muscle memory.
        </p>
        <p>
          Whether you are a developer writing code, an author drafting your next novel, or someone simply looking 
          to improve their words-per-minute, our zen-focused environment strips away the noise and lets you focus 
          on what matters: accuracy, rhythm, and speed.
        </p>
        <p>
          By combining classic literature, technical jargon, and targeted muscle memory drills, Typing Pacer 
          provides a comprehensive training ground for typists of all skill levels.
        </p>
        <p className="pt-8 text-frosted-text/50 text-base border-t border-white/5 mt-8">
          Have feedback or feature requests? We'd love to hear from you. Reach out to us on X (formerly Twitter) 
          <a href="https://x.com/typingpacer" target="_blank" rel="noopener noreferrer" className="text-lavender-accent hover:underline ml-1">@typingpacer</a>.
        </p>
      </div>
    </motion.div>
  );
}
