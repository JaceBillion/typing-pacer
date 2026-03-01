import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Zap, Clock } from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';

export default function Lab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-lavender-accent mb-4">The Lab</h1>
        <p className="text-frosted-text/70 text-lg max-w-2xl">
          Understanding the mechanics of speed and flow state.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-ui p-8 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lavender-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-bg rounded-xl text-lavender-accent">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-frosted-text">WPM Math</h3>
          </div>
          
          <p className="text-frosted-text/70 leading-relaxed mb-6">
            Words Per Minute (WPM) isn't calculated by counting actual words. Instead, it uses a standardized formula where one "word" equals exactly 5 keystrokes (including spaces).
          </p>
          
          <div className="bg-indigo-bg p-6 rounded-xl border border-white/5 font-mono text-sm text-lavender-accent/80">
            WPM = (Total Characters / 5) / Time in Minutes
          </div>
        </div>

        <div className="bg-slate-ui p-8 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-coral-error/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-bg rounded-xl text-coral-error">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-frosted-text">Why Speed Matters</h3>
          </div>
          
          <p className="text-frosted-text/70 leading-relaxed mb-6">
            Typing faster isn't just about saving time. It's about reducing the cognitive load between thought and execution. When typing becomes subconscious, you enter a flow state.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-indigo-bg rounded-xl border border-white/5">
              <span className="text-frosted-text/50 font-medium">30-40 WPM</span>
              <span className="text-frosted-text font-bold">Average</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-indigo-bg rounded-xl border border-white/5">
              <span className="text-frosted-text/50 font-medium">60-80 WPM</span>
              <span className="text-frosted-text font-bold">Professional</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-indigo-bg rounded-xl border border-lavender-accent/30 shadow-[0_0_15px_rgba(187,154,247,0.1)]">
              <span className="text-lavender-accent font-medium">100+ WPM</span>
              <span className="text-lavender-accent font-bold">Flow State</span>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Placeholder - Horizontal Leaderboard */}
      <AdPlaceholder format="horizontal" className="mt-12" />
    </motion.div>
  );
}
