import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Trophy, ArrowLeft, AlertTriangle } from 'lucide-react';

const WORD_BANK = [
  // Zen & Mindset
  'focus', 'breathe', 'rhythm', 'flow', 'muscle', 'memory', 'speed', 'accuracy',
  'zen', 'pacer', 'typing', 'keyboard', 'journey', 'practice', 'mastery', 'calm',
  'water', 'bamboo', 'strength', 'patience', 'silence', 'nature', 'mind', 'spirit',
  'harmony', 'balance', 'clarity', 'peace', 'tranquil', 'serene', 'stillness', 'awareness',
  'presence', 'energy', 'aura', 'meditate', 'reflect', 'insight', 'wisdom', 'growth',
  // Tech & Code
  'function', 'return', 'const', 'await', 'async', 'react', 'state', 'effect',
  'promise', 'boolean', 'string', 'number', 'array', 'object', 'class', 'interface',
  'type', 'export', 'import', 'default', 'module', 'package', 'server', 'client',
  'browser', 'window', 'document', 'console', 'debug', 'error', 'success', 'warning',
  'fetch', 'push', 'pull', 'commit', 'merge', 'branch', 'origin', 'master', 'main',
  'algorithm', 'variable', 'syntax', 'compile', 'execute', 'deploy', 'release',
  'version', 'control', 'source', 'project', 'design', 'create', 'build', 'test',
  // Common & Varied Lengths
  'quick', 'brown', 'jumps', 'lazy', 'beautiful', 'experience', 'development',
  'application', 'performance', 'architecture', 'environment', 'technology',
  'information', 'understanding', 'professional', 'management', 'significant',
  'traditional', 'successful', 'especially', 'knowledge', 'character', 'education',
  'everything', 'themselves', 'something', 'important', 'different', 'available',
  'community', 'president', 'result', 'friend', 'system', 'public',
  'computer', 'software', 'hardware', 'network', 'internet', 'database', 'security',
  'mountain', 'ocean', 'forest', 'river', 'valley', 'canyon', 'desert', 'island',
  'planet', 'galaxy', 'universe', 'starlight', 'sunshine', 'moonlight', 'shadow',
  'whisper', 'echo', 'breeze', 'storm', 'thunder', 'lightning', 'crystal', 'diamond'
];

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
}

interface GameState {
  words: FallingWord[];
  piledWords: FallingWord[];
  isGameOver: boolean;
}

const Explosion = ({ x, y }: { x: number, y: number, key?: string }) => {
  const particles = Array.from({ length: 12 });
  return (
    <div className="absolute z-30 transform -translate-x-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const velocity = 40 + Math.random() * 40;
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: Math.random() * 0.5 + 0.5 }}
            animate={{ 
              x: Math.cos(angle) * velocity, 
              y: Math.sin(angle) * velocity,
              opacity: 0,
              scale: 0
            }}
            transition={{ duration: 0.4 + Math.random() * 0.3, ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-full bg-lavender-accent shadow-[0_0_10px_var(--theme-accent)]"
          />
        );
      })}
    </div>
  );
};

export default function RaindropGame({ onExit }: { onExit: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [explosions, setExplosions] = useState<{id: number, x: number, y: number}[]>([]);
  
  const [gameState, setGameState] = useState<GameState>({
    words: [],
    piledWords: [],
    isGameOver: false
  });
  
  const requestRef = useRef<number>();
  const lastSpawnTime = useRef<number>(0);
  const wordIdCounter = useRef<number>(0);
  const lastSpawnedWord = useRef<string>('');
  
  const spawnRate = Math.max(600, 2000 - score * 60);
  const baseSpeed = 0.06 + (score * 0.003);

  const updateGame = useCallback(() => {
    if (!isPlaying) return;
    const now = performance.now();

    let newWord: FallingWord | null = null;
    if (now - lastSpawnTime.current > spawnRate) {
      let text = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
      
      // Prevent the exact same word from spawning twice in a row
      while (text === lastSpawnedWord.current) {
        text = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
      }
      lastSpawnedWord.current = text;

      newWord = {
        id: wordIdCounter.current++,
        text,
        x: 10 + Math.random() * 80,
        y: -10,
        speed: baseSpeed + (Math.random() * 0.02)
      };
      lastSpawnTime.current = now;
    }

    setGameState(prev => {
      if (prev.isGameOver) return prev;

      let currentFalling = [...prev.words];
      if (newWord) {
        currentFalling.push(newWord);
      }

      const nextWords: FallingWord[] = [];
      const currentPiled = [...prev.piledWords];
      let gameOver = false;

      currentFalling.forEach(w => {
        const nextY = w.y + w.speed;
        
        // Collision detection with pile
        const wordWidth = w.text.length * 1.5;
        const left = w.x - wordWidth / 2;
        const right = w.x + wordWidth / 2;
        
        let floorY = 100; // Bottom of the screen
        currentPiled.forEach(pw => {
          const pwWidth = pw.text.length * 1.5;
          const pwLeft = pw.x - pwWidth / 2;
          const pwRight = pw.x + pwWidth / 2;
          
          // If they overlap horizontally
          if (left < pwRight && right > pwLeft) {
            if (pw.y < floorY) {
              floorY = pw.y; // Find the highest point in the pile under this word
            }
          }
        });

        // 6 is roughly the height of a word in percentage
        if (nextY >= floorY - 6) {
          const finalY = floorY - 6;
          const piledWord = { ...w, y: finalY };
          currentPiled.push(piledWord);
          
          // If the pile reaches the danger zone (30% from top)
          if (finalY <= 30) {
            gameOver = true;
          }
        } else {
          nextWords.push({ ...w, y: nextY });
        }
      });

      return {
        words: nextWords,
        piledWords: currentPiled,
        isGameOver: gameOver
      };
    });
  }, [isPlaying, spawnRate, baseSpeed]);

  useEffect(() => {
    if (!isPlaying || gameState.isGameOver) return;
    
    let frameId: number;
    const loop = () => {
      updateGame();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, gameState.isGameOver, updateGame]);

  const gameStateRef = useRef(gameState);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const inputElementRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying || gameStateRef.current.isGameOver) return;
    
    const nextInput = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
    
    const matchIndex = gameStateRef.current.words.findIndex(w => w.text === nextInput);
    
    if (matchIndex !== -1) {
      const matchedWord = gameStateRef.current.words[matchIndex];
      
      // Trigger Explosion
      setExplosions(ex => [...ex, { id: matchedWord.id, x: matchedWord.x, y: matchedWord.y }]);
      setTimeout(() => {
        setExplosions(ex => ex.filter(e => e.id !== matchedWord.id));
      }, 1000);

      setScore(s => s + 1);
      setInput('');
      
      setGameState(current => ({
        ...current,
        words: current.words.filter((_, i) => i !== matchIndex)
      }));
    } else {
      setInput(nextInput);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setInput('');
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setInput('');
    setExplosions([]);
    setGameState({
      words: [],
      piledWords: [],
      isGameOver: false
    });
    lastSpawnTime.current = performance.now();
  };

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
          <div className="flex items-center gap-2 text-lavender-accent font-bold text-xl">
            <Trophy className="w-5 h-5" />
            {score}
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative overflow-hidden bg-indigo-bg">
        <input
          ref={inputElementRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className={`absolute inset-0 w-full h-full opacity-0 cursor-text ${isPlaying && !gameState.isGameOver ? 'z-30' : '-z-10 pointer-events-none'}`}
          disabled={!isPlaying || gameState.isGameOver}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Danger Zone Line */}
        <div className="absolute top-[30%] left-0 right-0 border-t-2 border-dashed border-coral-error/30 z-0"></div>
        <span className="absolute top-[30%] right-4 text-coral-error/50 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Danger Zone
        </span>

        {!isPlaying && !gameState.isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-bg/80 backdrop-blur-sm z-20">
            <h2 className="text-4xl font-bold text-lavender-accent mb-4">The Raindrop</h2>
            <p className="text-frosted-text/70 mb-8 max-w-md text-center leading-relaxed">
              Type the falling words to destroy them. Missed words will pile up at the bottom. If the pile reaches the <span className="text-coral-error font-bold">Danger Zone</span>, it's game over!
            </p>
            <button 
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-4 bg-lavender-accent text-indigo-bg font-bold rounded-xl hover:shadow-[0_0_20px_rgba(187,154,247,0.4)] transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              Start Game
            </button>
          </div>
        )}

        {gameState.isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-bg/90 backdrop-blur-md z-20">
            <h2 className="text-4xl font-bold text-coral-error mb-2">Game Over</h2>
            <p className="text-xl text-frosted-text mb-8">Final Score: <span className="text-lavender-accent font-bold">{score}</span></p>
            <button 
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-4 bg-slate-ui text-frosted-text font-bold rounded-xl hover:text-lavender-accent border border-white/10 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
          </div>
        )}

        {/* Piled Words (Tetris blocks) */}
        {gameState.piledWords.map(word => (
          <div
            key={`pile-${word.id}`}
            className="absolute transform -translate-x-1/2 font-mono text-xl tracking-wide whitespace-nowrap px-2 py-1 bg-coral-error/10 text-coral-error/60 border border-coral-error/20 rounded-md"
            style={{ top: `${word.y}%`, left: `${word.x}%` }}
          >
            {word.text}
          </div>
        ))}

        {/* Falling Words */}
        <AnimatePresence>
          {gameState.words.map(word => {
            const isMatch = input.length > 0 && word.text.startsWith(input);
            return (
              <motion.div
                key={word.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, top: `${word.y}%`, left: `${word.x}%` }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0 }}
                className="absolute transform -translate-x-1/2 font-mono text-xl tracking-wide whitespace-nowrap px-2 py-1"
              >
                {isMatch ? (
                  <>
                    <span className="text-lavender-accent font-bold bg-lavender-accent/20 rounded-sm">{input}</span>
                    <span className="text-frosted-text/50">{word.text.slice(input.length)}</span>
                  </>
                ) : (
                  <span className="text-frosted-text/80">{word.text}</span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Explosions */}
        {explosions.map(ex => (
          <Explosion key={`ex-${ex.id}`} x={ex.x} y={ex.y} />
        ))}
      </div>

      {/* Input Display */}
      <div 
        className="h-20 border-t border-white/5 bg-indigo-bg/50 flex items-center justify-center z-10 cursor-text relative"
        onClick={() => {
          if (isPlaying && !gameState.isGameOver) {
            inputElementRef.current?.focus();
          }
        }}
      >
        <div className="text-3xl font-mono tracking-widest text-lavender-accent h-10 flex items-center pointer-events-none">
          {input || <span className="text-frosted-text/20">type here...</span>}
          <span className="w-3 h-8 bg-lavender-accent ml-1 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
