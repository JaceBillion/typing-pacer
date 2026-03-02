import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Flame, Target, ArrowLeft } from 'lucide-react';
import TypingInterface from '../components/TypingInterface';
import AdPlaceholder from '../components/AdPlaceholder';

const ZXC_DRILLS = [
  "zebra xylophone cat crazy exact zero box cozy extra lazy mix catch buzz next zip",
  "crazy cats catch cozy zebras exactly next to the xylophone box",
  "zero extra boxes of pizza exist next to the crazy lazy cat",
  "buzzing bees mix with lazy zebras catching exact cozy naps",
  "exact xylophones buzz next to crazy cats catching lazy zebras",
  "zapping xylophones catch extra crazy zebras mixing cozy boxes",
  "lazy cats buzz exactly next to zero extra pizza boxes",
  "cozy zebras mix crazy xylophones exactly next to the lazy cat",
  "extra buzzing bees catch zero lazy zebras next to the box",
  "crazy xylophones zap exactly next to cozy cats mixing pizza"
];

const PUNCTUATION_DRILLS = [
  "Is it greater than > or less than < ? I don't know!",
  "What is the meaning of life? Is it 42? Or > 42?",
  "Please go to /home/user/docs. Is that < correct >?",
  "Why? How? When? Where? Who? /what/ is happening?",
  "<html> <body> <h1> Hello World! </h1> </body> </html>",
  "if (x > y) { return true; } else if (x < y) { return false; }",
  "Did you read the article? It was <br> brilliant! Right?",
  "The path is /usr/local/bin/ ... wait, is it?",
  "Are we there yet? < Maybe > we are closer than we think.",
  "Type this: / ? < > / ? < > / ? < > / ? < >"
];

export default function Progress() {
  const [activeDrill, setActiveDrill] = useState<string | null>(null);
  const [currentDrillText, setCurrentDrillText] = useState('');

  const stats = [
    { label: 'Avg WPM', value: '72', icon: Activity },
    { label: 'Accuracy', value: '98%', icon: Target },
    { label: 'Current Streak', value: '14 Days', icon: Flame },
  ];

  if (activeDrill) {
    const drillBank = activeDrill === 'ZXC' ? ZXC_DRILLS : PUNCTUATION_DRILLS;
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]"
      >
        <div className="w-full max-w-4xl mb-8 flex justify-between items-center">
          <button 
            onClick={() => setActiveDrill(null)}
            className="flex items-center gap-2 text-frosted-text/70 hover:text-lavender-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Progress
          </button>
          <div className="text-xl font-bold text-frosted-text">
            Muscle Memory Drill: <span className="text-coral-error">{activeDrill === 'ZXC' ? 'Z, X, C' : '<, >, ?, /'}</span>
          </div>
        </div>
        
        <TypingInterface 
          targetWpm={60} 
          customText={currentDrillText} 
          onReset={() => {
            let newText = currentDrillText;
            while (newText === currentDrillText) {
              newText = drillBank[Math.floor(Math.random() * drillBank.length)];
            }
            setCurrentDrillText(newText);
          }}
        />

        {/* AdSense Placeholder - Horizontal Leaderboard */}
        <AdPlaceholder format="horizontal" className="mt-12" />
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
        <h1 className="text-4xl font-bold text-lavender-accent mb-4">Muscle Map</h1>
        <p className="text-frosted-text/70 text-lg max-w-2xl">
          Visualizing your keyboard mastery. Lavender indicates flow; Coral highlights areas for improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-ui p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="p-4 bg-indigo-bg rounded-xl text-lavender-accent">
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-frosted-text/50 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-frosted-text">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-ui p-8 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-lavender-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        
        <h3 className="text-xl font-bold text-frosted-text mb-6">3D Keyboard Heatmap</h3>
        
        {/* Mock Keyboard Layout */}
        <div className="flex flex-col gap-2 max-w-3xl mx-auto font-mono text-sm">
          <div className="flex justify-center gap-2">
            {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
              <div key={k} className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all ${
                ['E','T','O'].includes(k) ? 'bg-lavender-accent/20 border-lavender-accent/50 text-lavender-accent shadow-[0_0_10px_rgba(187,154,247,0.2)]' :
                ['Y','P'].includes(k) ? 'bg-coral-error/20 border-coral-error/50 text-coral-error' :
                'bg-indigo-bg border-white/10 text-frosted-text/50'
              }`}>
                {k}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 ml-4">
            {['A','S','D','F','G','H','J','K','L'].map(k => (
              <div key={k} className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all ${
                ['A','S','D','F','J','K','L'].includes(k) ? 'bg-lavender-accent/30 border-lavender-accent text-lavender-accent shadow-[0_0_15px_rgba(187,154,247,0.3)]' :
                'bg-indigo-bg border-white/10 text-frosted-text/50'
              }`}>
                {k}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 ml-12">
            {['Z','X','C','V','B','N','M','<','>','?'].map(k => (
              <div key={k} className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all ${
                ['Z','X','C', '<', '>', '?'].includes(k) ? 'bg-coral-error/30 border-coral-error text-coral-error shadow-[0_0_10px_rgba(247,118,142,0.2)]' :
                'bg-indigo-bg border-white/10 text-frosted-text/50'
              }`}>
                {k}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-coral-error/5 border border-coral-error/20 rounded-xl flex items-start gap-4">
            <div className="p-3 bg-coral-error/20 rounded-lg text-coral-error shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-coral-error mb-1">Left Pinky Drill</h4>
              <p className="text-frosted-text/70 text-sm mb-4">
                Your left pinky and ring finger (Z, X, C) are showing signs of stress. 
                Repetition builds effortless muscle memory.
              </p>
              <button 
                onClick={() => {
                  setActiveDrill('ZXC');
                  setCurrentDrillText(ZXC_DRILLS[Math.floor(Math.random() * ZXC_DRILLS.length)]);
                }}
                className="px-4 py-2 bg-coral-error/20 text-coral-error hover:bg-coral-error hover:text-indigo-bg rounded-lg font-medium transition-colors text-sm"
              >
                Start Z, X, C Drill
              </button>
            </div>
          </div>

          <div className="p-6 bg-coral-error/5 border border-coral-error/20 rounded-xl flex items-start gap-4">
            <div className="p-3 bg-coral-error/20 rounded-lg text-coral-error shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-coral-error mb-1">Right Pinky Drill</h4>
              <p className="text-frosted-text/70 text-sm mb-4">
                Punctuation marks (&lt;, &gt;, ?, /) are common stumbling blocks for developers. 
                Train your right pinky to reach them without looking.
              </p>
              <button 
                onClick={() => {
                  setActiveDrill('PUNCTUATION');
                  setCurrentDrillText(PUNCTUATION_DRILLS[Math.floor(Math.random() * PUNCTUATION_DRILLS.length)]);
                }}
                className="px-4 py-2 bg-coral-error/20 text-coral-error hover:bg-coral-error hover:text-indigo-bg rounded-lg font-medium transition-colors text-sm"
              >
                Start &lt;, &gt;, ? Drill
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Placeholder - Horizontal Leaderboard */}
      <AdPlaceholder format="horizontal" className="mt-12" />
    </motion.div>
  );
}
