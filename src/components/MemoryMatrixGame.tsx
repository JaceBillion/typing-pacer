import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Trophy, ArrowLeft, Heart, Brain } from 'lucide-react';

const WORD_BANK = [
  'algorithm', 'function', 'variable', 'interface', 'component',
  'developer', 'experience', 'performance', 'architecture', 'technology',
  'javascript', 'typescript', 'react', 'tailwind', 'frontend',
  'backend', 'database', 'server', 'network', 'security',
  'beautiful', 'knowledge', 'understanding', 'professional', 'management',
  'significant', 'traditional', 'successful', 'especially', 'character',
  'everything', 'themselves', 'something', 'important', 'different',
  'community', 'president', 'result', 'friend', 'system',
  'computer', 'software', 'hardware', 'internet', 'application',
  'mountain', 'ocean', 'forest', 'river', 'valley',
  'planet', 'galaxy', 'universe', 'starlight', 'sunshine',
  'keyboard', 'monitor', 'processor', 'memory', 'storage',
  'compile', 'execute', 'debug', 'deploy', 'release',
  'version', 'control', 'repository', 'branch', 'commit',
  'framework', 'library', 'module', 'package', 'dependency',
  'asynchronous', 'promise', 'callback', 'iteration', 'recursion',
  'optimization', 'scalability', 'reliability', 'maintenance', 'integration',
  'authentication', 'authorization', 'encryption', 'validation', 'verification',
  'responsive', 'accessible', 'interactive', 'dynamic', 'static'
];

type GameState = 'start' | 'memorize' | 'type' | 'result' | 'gameover';

export default function MemoryMatrixGame({ onExit }: { onExit: () => void }) {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const startGame = () => {
    setScore(0);
    setLives(3);
    nextRound();
  };

  const nextRound = () => {
    const word = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
    setCurrentWord(word);
    setInput('');
    setGameState('memorize');
    
    // Calculate display time based on word length and score
    const baseTime = 1000; // 1 second base time (faster than before)
    const lengthBonus = word.length * 30; // 30ms per character
    
    // Speed up gradually after 5 words (score >= 5)
    // For every point above 4, reduce the time by 80ms
    const speedUpFactor = Math.max(0, score - 4);
    const difficultyPenalty = speedUpFactor * 80;
    
    // Minimum display time is 300ms
    const displayTime = Math.max(baseTime + lengthBonus - difficultyPenalty, 300);

    if (timerRef.current) clearTimeout(timerRef.current);
    
    timerRef.current = setTimeout(() => {
      setGameState('type');
      setTimeout(() => inputRef.current?.focus(), 50);
    }, displayTime);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== 'type') return;
    setInput(e.target.value.toLowerCase().replace(/[^a-z]/g, ''));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.length > 0) {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    if (input === currentWord) {
      setScore(s => s + 1);
      setIsCorrect(true);
      setResultMessage('Perfect Recall!');
      setGameState('result');
      
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        nextRound();
      }, 1000); // Speed up transition from 1.5s to 1s
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setIsCorrect(false);
      setResultMessage(`It was: ${currentWord}`);
      
      if (newLives <= 0) {
        setGameState('gameover');
      } else {
        setGameState('result');
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          nextRound();
        }, 1500); // Speed up transition from 2s to 1.5s
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-ui rounded-2xl border border-white/5 overflow-hidden shadow-2xl flex flex-col h-[600px] relative">
      {/* Header */}
      <div className="h-16 border-b border-white/5 bg-indigo-bg/50 flex items-center justify-between px-6 z-10">
        <button 
          onClick={onExit}
          className="flex items-center gap-2 text-frosted-text/70 hover:text-lavender-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit
        </button>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-coral-error font-bold">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart key={i} className={`w-5 h-5 ${i < lives ? 'fill-current' : 'opacity-20'}`} />
            ))}
          </div>
          <div className="flex items-center gap-2 text-lavender-accent font-bold text-xl">
            <Trophy className="w-5 h-5" />
            {score}
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div 
        className="flex-1 relative overflow-hidden bg-indigo-bg flex flex-col items-center justify-center cursor-text"
        onClick={() => {
          if (gameState === 'type') {
            inputRef.current?.focus();
          }
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center z-20 text-center px-6"
            >
              <div className="p-4 bg-lavender-accent/10 rounded-2xl text-lavender-accent mb-6">
                <Brain className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-bold text-lavender-accent mb-4">Memory Matrix</h2>
              <p className="text-frosted-text/70 mb-8 max-w-md leading-relaxed">
                A word will flash on the screen for a brief moment. Memorize it, then type it out exactly. The game gets faster as your score increases!
              </p>
              <button 
                onClick={startGame}
                className="flex items-center gap-2 px-8 py-4 bg-lavender-accent text-indigo-bg font-bold rounded-xl hover:shadow-[0_0_20px_rgba(187,154,247,0.4)] transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                Start Game
              </button>
            </motion.div>
          )}

          {gameState === 'memorize' && (
            <motion.div
              key="memorize"
              initial={{ opacity: score >= 5 ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: score >= 5 ? 0 : 0.2 }}
              className="z-20"
            >
              <h2 className="text-5xl sm:text-7xl font-mono font-bold text-frosted-text tracking-widest">
                {currentWord}
              </h2>
            </motion.div>
          )}

          {gameState === 'type' && (
            <motion.div
              key="type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="z-20 w-full max-w-md px-6"
            >
              <div className="text-center mb-8">
                <p className="text-lavender-accent font-bold uppercase tracking-widest animate-pulse">
                  Type the word
                </p>
              </div>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-slate-ui border-2 border-lavender-accent/50 rounded-xl px-6 py-4 text-2xl sm:text-3xl font-mono text-center text-frosted-text outline-none focus:border-lavender-accent focus:shadow-[0_0_20px_rgba(187,154,247,0.2)] transition-all"
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <div className="absolute -bottom-8 left-0 right-0 text-center text-frosted-text/40 text-sm">
                  Press Enter to submit
                </div>
              </div>
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="z-20 text-center"
            >
              <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isCorrect ? 'text-lavender-accent' : 'text-coral-error'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h2>
              <p className="text-2xl font-mono text-frosted-text/70">
                {resultMessage}
              </p>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="z-20 flex flex-col items-center justify-center text-center px-6"
            >
              <div className="p-4 bg-coral-error/10 rounded-2xl text-coral-error mb-6">
                <Brain className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-bold text-coral-error mb-2">Game Over</h2>
              <p className="text-xl text-frosted-text mb-8">Final Score: <span className="text-lavender-accent font-bold">{score}</span></p>
              <button 
                onClick={startGame}
                className="flex items-center gap-2 px-8 py-4 bg-slate-ui text-frosted-text font-bold rounded-xl hover:text-lavender-accent border border-white/10 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
