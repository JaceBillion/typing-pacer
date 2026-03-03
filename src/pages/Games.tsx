import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, CloudRain, Zap, Brain } from 'lucide-react';
import RaindropGame from '../components/RaindropGame';
import MemoryMatrixGame from '../components/MemoryMatrixGame';
import PacerDashGame from '../components/PacerDashGame';

export default function Games() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === 'raindrop') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]"
      >
        <RaindropGame onExit={() => setActiveGame(null)} />
      </motion.div>
    );
  }

  if (activeGame === 'memory') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]"
      >
        <MemoryMatrixGame onExit={() => setActiveGame(null)} />
      </motion.div>
    );
  }

  if (activeGame === 'dash') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]"
      >
        <PacerDashGame onExit={() => setActiveGame(null)} />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-lavender-accent mb-4 flex items-center gap-3">
          <Gamepad2 className="w-10 h-10" />
          Games
        </h1>
        <p className="text-frosted-text/70 text-lg max-w-2xl">
          These are typing games designed to improve your speed, accuracy, and muscle memory in a fun, engaging way.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* The Raindrop */}
        <div 
          onClick={() => setActiveGame('raindrop')}
          className="bg-slate-ui p-6 rounded-2xl border border-white/10 hover:border-lavender-accent/50 transition-all duration-300 cursor-pointer group"
        >
          <div className="p-4 bg-indigo-bg rounded-xl text-lavender-accent w-fit mb-6 group-hover:scale-110 transition-transform">
            <CloudRain className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-frosted-text mb-2">The Raindrop</h3>
          <p className="text-frosted-text/60 mb-6">
            A survival game. Type the falling words before they hit the ground. The longer you survive, the faster they fall.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-lavender-accent">
            Play Game &rarr;
          </div>
        </div>

        {/* Pacer Dash */}
        <div 
          onClick={() => setActiveGame('dash')}
          className="bg-slate-ui p-6 rounded-2xl border border-white/10 hover:border-lavender-accent/50 transition-all duration-300 cursor-pointer group"
        >
          <div className="p-4 bg-indigo-bg rounded-xl text-lavender-accent w-fit mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-frosted-text mb-2">Pacer Dash</h3>
          <p className="text-frosted-text/60 mb-6">
            A drag race against a bot. Choose your opponent's speed and type the sentence perfectly to reach the finish line first!
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-lavender-accent">
            Play Game &rarr;
          </div>
        </div>

        {/* Memory Matrix */}
        <div 
          onClick={() => setActiveGame('memory')}
          className="bg-slate-ui p-6 rounded-2xl border border-white/10 hover:border-lavender-accent/50 transition-all duration-300 cursor-pointer group"
        >
          <div className="p-4 bg-indigo-bg rounded-xl text-lavender-accent w-fit mb-6 group-hover:scale-110 transition-transform">
            <Brain className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-frosted-text mb-2">Memory Matrix</h3>
          <p className="text-frosted-text/60 mb-6">
            A word flashes on the screen for a brief moment, then disappears. Type it from memory to survive.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-lavender-accent">
            Play Game &rarr;
          </div>
        </div>
      </div>
    </motion.div>
  );
}
