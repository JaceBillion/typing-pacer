import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Bot, User, Trophy, ArrowLeft, Flag, Timer } from 'lucide-react';

const RACE_TEXTS = [
  "The quick brown fox jumps over the lazy dog to win the race.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "In the middle of every difficulty lies opportunity waiting to be discovered.",
  "To be or not to be, that is the question we must all answer eventually.",
  "I am no bird; and no net ensnares me: I am a free human being with an independent will.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Do not wait to strike till the iron is hot; but make it hot by striking.",
  "Whether you think you can or you think you can't, you are usually right.",
  "The best time to plant a tree was twenty years ago. The second best time is now.",
  "Everything you've ever wanted is on the other side of fear.",
  "A journey of a thousand miles begins with a single step.",
  "That which does not kill us makes us stronger.",
  "Life is what happens when you're busy making other plans.",
  "When the going gets tough, the tough get going.",
  "You must be the change you wish to see in the world.",
  "You only live once, but if you do it right, once is enough.",
  "The mind is everything. What you think you become.",
  "The best way to predict your future is to create it.",
  "If you look at what you have in life, you'll always have more.",
  "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
  "Life is 10% what happens to me and 90% of how I react to it.",
  "The most common way people give up their power is by thinking they don't have any.",
  "The mind is just like a muscle - the more you exercise it, the stronger it gets and the more it can expand.",
  "We become what we think about most of the time, and that's the strangest secret.",
  "The only person you are destined to become is the person you decide to be.",
  "Go confidently in the direction of your dreams. Live the life you have imagined.",
  "Certain things catch your eye, but pursue only those that capture the heart.",
  "Believe you can and you're halfway there.",
  "Everything has beauty, but not everyone can see.",
  "How wonderful it is that nobody need wait a single moment before starting to improve the world.",
  "When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.",
  "The only way to do great work is to love what you do.",
  "If you can dream it, you can achieve it.",
  "Fall seven times and stand up eight.",
  "Two roads diverged in a wood, and I took the one less traveled by, and that has made all the difference.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "I have not failed. I've just found 10,000 ways that won't work.",
  "You miss 100% of the shots you don't take.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Our greatest glory is not in never falling, but in rising every time we fall.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
  "It is during our darkest moments that we must focus to see the light.",
  "Whoever is happy will make others happy too.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail.",
  "You will face many defeats in life, but never let yourself be defeated.",
  "In the end, it's not the years in your life that count. It's the life in your years.",
  "Never let the fear of striking out keep you from playing the game.",
  "Life is either a daring adventure or nothing at all.",
  "Many of life's failures are people who did not realize how close they were to success when they gave up."
];

type GameState = 'setup' | 'countdown' | 'racing' | 'result';

export default function PacerDashGame({ onExit }: { onExit: () => void }) {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [botWpm, setBotWpm] = useState(60);
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [botProgress, setBotProgress] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [winner, setWinner] = useState<'player' | 'bot' | null>(null);
  const [playerFinalWpm, setPlayerFinalWpm] = useState(0);
  
  const startTimeRef = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>();

  const startCountdown = () => {
    setText(RACE_TEXTS[Math.floor(Math.random() * RACE_TEXTS.length)]);
    setInput('');
    setBotProgress(0);
    setWinner(null);
    setPlayerFinalWpm(0);
    setCountdown(3);
    setGameState('countdown');
  };

  // Countdown Logic
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setGameState('racing');
        startTimeRef.current = Date.now();
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    }
  }, [gameState, countdown]);

  // Bot Racing Logic
  useEffect(() => {
    if (gameState === 'racing') {
      const updateBot = () => {
        const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
        const expectedChars = elapsedMinutes * botWpm * 5;
        const progress = Math.min(100, (expectedChars / text.length) * 100);
        
        setBotProgress(progress);
        
        if (progress >= 100) {
          setWinner('bot');
          setGameState('result');
          const pElapsed = (Date.now() - startTimeRef.current) / 60000;
          setPlayerFinalWpm(Math.round((input.length / 5) / pElapsed));
        } else {
          animationRef.current = requestAnimationFrame(updateBot);
        }
      };
      
      animationRef.current = requestAnimationFrame(updateBot);
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [gameState, botWpm, text.length, input.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== 'racing') return;
    
    const val = e.target.value;
    
    // Strict matching: only allow typing if it matches the text exactly
    if (text.startsWith(val)) {
      setInput(val);
      
      if (val.length === text.length) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
        setPlayerFinalWpm(Math.round((text.length / 5) / elapsedMinutes));
        setWinner('player');
        setGameState('result');
      }
    }
  };

  const playerProgress = text.length > 0 ? (input.length / text.length) * 100 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-ui rounded-2xl border border-white/5 overflow-hidden shadow-2xl flex flex-col h-[600px] relative">
      {/* Header */}
      <div className="h-16 border-b border-white/5 bg-indigo-bg/50 flex items-center justify-between px-4 sm:px-6 z-10">
        <button 
          onClick={onExit}
          className="flex items-center gap-2 text-frosted-text/70 hover:text-lavender-accent transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit
        </button>
        <div className="flex items-center gap-2 text-lavender-accent font-bold text-lg sm:text-xl">
          <Zap className="w-5 h-5" />
          Pacer Dash
        </div>
      </div>

      {/* Game Area */}
      <div 
        className="flex-1 relative overflow-hidden bg-indigo-bg flex flex-col items-center justify-center cursor-text p-4 sm:p-8"
        onClick={() => {
          if (gameState === 'racing') {
            inputRef.current?.focus();
          }
        }}
      >
        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className={`absolute inset-0 w-full h-full opacity-0 cursor-text ${gameState === 'racing' ? 'z-30' : '-z-10 pointer-events-none'}`}
          disabled={gameState !== 'racing'}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>

        <AnimatePresence mode="wait">
          {gameState === 'setup' && (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center z-20 text-center w-full max-w-md"
            >
              <div className="p-4 bg-lavender-accent/10 rounded-2xl text-lavender-accent mb-6">
                <Flag className="w-12 h-12" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-lavender-accent mb-4">Choose Your Opponent</h2>
              <p className="text-frosted-text/70 mb-8 text-sm sm:text-base leading-relaxed">
                Race against a bot set to a specific speed. Type the sentence perfectly to reach the finish line first!
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 w-full">
                {[40, 60, 80, 100].map(wpm => (
                  <button
                    key={wpm}
                    onClick={() => setBotWpm(wpm)}
                    className={`py-3 rounded-xl font-bold transition-all ${
                      botWpm === wpm 
                        ? 'bg-lavender-accent text-indigo-bg shadow-[0_0_15px_rgba(187,154,247,0.4)]' 
                        : 'bg-slate-ui text-frosted-text/70 hover:text-frosted-text hover:bg-white/5 border border-white/5'
                    }`}
                  >
                    {wpm} WPM
                  </button>
                ))}
              </div>

              <button 
                onClick={startCountdown}
                className="flex items-center justify-center gap-2 w-full py-4 bg-lavender-accent text-indigo-bg font-bold rounded-xl hover:shadow-[0_0_20px_rgba(187,154,247,0.4)] transition-all text-lg"
              >
                <Zap className="w-5 h-5 fill-current" />
                Start Race
              </button>
            </motion.div>
          )}

          {gameState === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="z-20 flex flex-col items-center"
            >
              <h2 className="text-8xl sm:text-[150px] font-black text-lavender-accent drop-shadow-[0_0_30px_rgba(187,154,247,0.5)]">
                {countdown > 0 ? countdown : 'GO!'}
              </h2>
            </motion.div>
          )}

          {(gameState === 'racing' || gameState === 'result') && (
            <motion.div
              key="racing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="z-20 w-full flex flex-col h-full justify-between py-4 sm:py-8"
            >
              {/* Race Tracks */}
              <div className="w-full space-y-6 sm:space-y-8 mb-8">
                {/* Bot Track */}
                <div className="relative w-full h-12 sm:h-16 bg-slate-ui/50 rounded-xl border border-white/5 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-coral-error/20 transition-all duration-100 ease-linear" style={{ width: `${botProgress}%` }}></div>
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-100 ease-linear z-10"
                    style={{ left: `${Math.max(5, botProgress)}%` }}
                  >
                    <div className="bg-coral-error text-indigo-bg p-1.5 sm:p-2 rounded-lg shadow-[0_0_15px_rgba(247,118,142,0.5)]">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-coral-error/50 font-bold text-xs sm:text-sm">
                    BOT ({botWpm} WPM)
                  </div>
                </div>

                {/* Player Track */}
                <div className="relative w-full h-12 sm:h-16 bg-slate-ui/50 rounded-xl border border-white/5 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-lavender-accent/20 transition-all duration-75 ease-out" style={{ width: `${playerProgress}%` }}></div>
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-75 ease-out z-10"
                    style={{ left: `${Math.max(5, playerProgress)}%` }}
                  >
                    <div className="bg-lavender-accent text-indigo-bg p-1.5 sm:p-2 rounded-lg shadow-[0_0_15px_rgba(187,154,247,0.5)]">
                      <User className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-lavender-accent/50 font-bold text-xs sm:text-sm">
                    YOU
                  </div>
                </div>
              </div>

              {/* Typing Area */}
              <div className="w-full bg-slate-ui p-6 sm:p-8 rounded-2xl border border-white/5 shadow-lg">
                <div className="font-mono text-lg sm:text-2xl leading-relaxed tracking-wide text-frosted-text/50 select-none">
                  {text.split('').map((char, i) => {
                    let colorClass = '';
                    if (i < input.length) {
                      colorClass = input[i] === char ? 'text-lavender-accent' : 'text-coral-error bg-coral-error/20 rounded-sm';
                    } else if (i === input.length && gameState === 'racing') {
                      colorClass = 'bg-lavender-accent/30 text-white border-b-2 border-lavender-accent';
                    }
                    return (
                      <span key={i} className={colorClass}>
                        {char}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Result Overlay */}
              {gameState === 'result' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 z-40 flex items-center justify-center bg-indigo-bg/90 backdrop-blur-sm"
                >
                  <div className="bg-slate-ui p-8 rounded-3xl border border-white/10 text-center max-w-sm w-full shadow-2xl">
                    <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${winner === 'player' ? 'bg-lavender-accent/20 text-lavender-accent' : 'bg-coral-error/20 text-coral-error'}`}>
                      {winner === 'player' ? <Trophy className="w-10 h-10" /> : <Bot className="w-10 h-10" />}
                    </div>
                    <h2 className={`text-3xl font-bold mb-2 ${winner === 'player' ? 'text-lavender-accent' : 'text-coral-error'}`}>
                      {winner === 'player' ? 'You Won!' : 'Bot Won!'}
                    </h2>
                    <p className="text-frosted-text/70 mb-8">
                      Your Speed: <span className="font-bold text-frosted-text">{playerFinalWpm} WPM</span>
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setGameState('setup')}
                        className="flex-1 py-3 bg-slate-ui border border-white/10 text-frosted-text rounded-xl hover:bg-white/5 transition-colors font-medium"
                      >
                        Change Bot
                      </button>
                      <button 
                        onClick={startCountdown}
                        className="flex-1 py-3 bg-lavender-accent text-indigo-bg rounded-xl hover:shadow-[0_0_15px_rgba(187,154,247,0.4)] transition-all font-bold"
                      >
                        Race Again
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
