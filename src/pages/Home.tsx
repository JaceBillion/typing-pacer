import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TypingInterface from '../components/TypingInterface';
import AdPlaceholder from '../components/AdPlaceholder';
import { motion } from 'motion/react';
import { Settings, Play, Pause } from 'lucide-react';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'drill' ? 'Drill' : 'Easy';
  
  const [targetWpm, setTargetWpm] = useState(60);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Drill'>(initialMode as any);
  const [duration, setDuration] = useState<number>(30);

  useEffect(() => {
    if (difficulty === 'Drill') {
      setSearchParams({ mode: 'drill' });
    } else {
      setSearchParams({});
    }
  }, [difficulty, setSearchParams]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]"
    >
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div className="flex gap-6">
          <div className="flex gap-2 bg-slate-ui p-1 rounded-full border border-white/5">
            {['Easy', 'Medium', 'Hard', 'Drill'].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  difficulty === diff 
                    ? 'bg-lavender-accent text-indigo-bg shadow-[0_0_15px_rgba(187,154,247,0.4)]' 
                    : 'text-frosted-text/70 hover:text-frosted-text'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="flex gap-2 bg-slate-ui p-1 rounded-full border border-white/5">
            {[30, 60, 90].map((dur) => (
              <button
                key={dur}
                onClick={() => setDuration(dur)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  duration === dur 
                    ? 'bg-lavender-accent text-indigo-bg shadow-[0_0_15px_rgba(187,154,247,0.4)]' 
                    : 'text-frosted-text/70 hover:text-frosted-text'
                }`}
              >
                {dur === 30 ? '30s' : dur === 60 ? '1m' : '1.5m'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-ui px-4 py-2 rounded-full border border-white/5">
          <Settings className="w-4 h-4 text-frosted-text/50" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-frosted-text/70">WPM</span>
            <input 
              type="number" 
              value={targetWpm}
              onChange={(e) => setTargetWpm(Number(e.target.value))}
              className="w-16 bg-transparent text-lavender-accent font-mono font-bold text-lg outline-none text-center"
              min={10}
              max={200}
            />
          </div>
        </div>
      </div>

      <TypingInterface targetWpm={targetWpm} difficulty={difficulty} duration={duration} />
      
      <div className="mt-12 text-center text-frosted-text/40 text-sm max-w-lg mb-12">
        <p>Focus on the rhythm. The Pacer moves at exactly {targetWpm} WPM.</p>
        <p className="mt-2">Stay ahead of the lavender line to maintain your Zen.</p>
      </div>

      {/* AdSense Placeholder - Horizontal Leaderboard */}
      <AdPlaceholder format="horizontal" className="mt-auto" />
    </motion.div>
  );
}
