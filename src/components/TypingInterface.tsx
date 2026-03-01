import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

const EASY_SENTENCES = [
  "the quick brown fox jumps over the lazy dog",
  "a journey of a thousand miles begins with a single step",
  "to be or not to be that is the question",
  "all that glitters is not gold",
  "actions speak louder than words",
  "the sun is warm and the sky is clear today",
  "keep your face to the sunshine and you cannot see a shadow",
  "the only way to do great work is to love what you do",
  "believe you can and you are halfway there",
  "it always seems impossible until it is done",
  "the water is calm and the breeze is soft",
  "we walked through the forest and found a small stream",
  "a bird in the hand is worth two in the bush",
  "every cloud has a silver lining",
  "knowledge is power but enthusiasm pulls the switch",
  "the early bird catches the worm",
  "practice makes perfect when you focus on the details",
  "time flies when you are having fun",
  "better late than never but never late is better",
  "a picture is worth a thousand words",
  "it was the best of times it was the worst of times",
  "all the worlds a stage and all the men and women merely players",
  "i am no bird and no net ensnares me",
  "there is nothing either good or bad but thinking makes it so",
  "it is a truth universally acknowledged that a single man must be in want of a wife",
  "we are all in the gutter but some of us are looking at the stars",
  "the only way to get rid of a temptation is to yield to it",
  "beware for i am fearless and therefore powerful",
  "whatever our souls are made of his and mine are the same"
];

const MEDIUM_SENTENCES = [
  "The quiet mind is able to hear intuition over fear.",
  "Focus on the rhythm of your breath and the movement of your hands.",
  "Water shapes its course according to the nature of the ground.",
  "Nature does not hurry, yet everything is accomplished.",
  "Do not seek to follow in the footsteps of the wise; seek what they sought.",
  "Every keystroke is a step closer to complete mastery.",
  "The bamboo that bends is stronger than the oak that resists.",
  "Patience is not simply the ability to wait, it's how we behave while we're waiting.",
  "Flow state is achieved when challenge and skill are perfectly balanced.",
  "Silence isn't empty, it's full of answers.",
  "Breathe in deeply and let go of your worries.",
  "The mind is like water, when it is turbulent it is difficult to see.",
  "When it is calm, everything becomes clear.",
  "Do what you can, with what you have, where you are.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Happiness is not something ready made. It comes from your own actions.",
  "In the middle of difficulty lies opportunity.",
  "What you get by achieving your goals is not as important as what you become.",
  "The best way to predict the future is to create it.",
  "You are never too old to set another goal or to dream a new dream.",
  "It was the best of times, it was the worst of times, it was the age of wisdom.",
  "I am no bird; and no net ensnares me: I am a free human being with an independent will.",
  "There is nothing either good or bad, but thinking makes it so.",
  "Beware; for I am fearless, and therefore powerful.",
  "Whatever our souls are made of, his and mine are the same.",
  "We are all in the gutter, but some of us are looking at the stars.",
  "The only way to get rid of a temptation is to yield to it.",
  "I would always rather be happy than dignified.",
  "To love or have loved, that is enough. Ask nothing further."
];

const HARD_SENTENCES = [
  "function calculateWPM(chars: number, timeMs: number) { return (chars / 5) / (timeMs / 60000); }",
  "The O(n log n) algorithm requires > 50% less memory allocation!",
  "Regex pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/",
  "git commit -m \"fix(auth): resolve JWT token expiration edge-case (#402)\"",
  "SELECT u.id, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id;",
  "const { data, error } = await supabase.from('profiles').select('avatar_url').eq('id', userId);",
  "If $x^2 + y^2 = r^2$, then the derivative $dy/dx = -x/y$ (assuming $y \\neq 0$).",
  "Docker command: docker run -d -p 8080:80 --name web-server nginx:latest",
  "Error: ENOSPC: System limit for number of file watchers reached, watch '/app/node_modules'",
  "To exit Vim, type [Esc] followed by :wq and press [Enter].",
  "const regex = new RegExp('^[a-z0-9_-]{3,16}$');",
  "UPDATE users SET status = 'active' WHERE last_login > NOW() - INTERVAL '30 days';",
  "export const fetchUser = async (id: string): Promise<User | null> => { return null; }",
  "border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);",
  "import { useState, useEffect, useCallback } from 'react';",
  "Array.from({ length: 10 }, (_, i) => i * 2).filter(n => n > 5);",
  "document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', handler));",
  "git rebase -i HEAD~3 && git push origin main --force",
  "chmod 755 script.sh && ./script.sh --env=production",
  "{\"name\": \"typing-pacer\", \"version\": \"1.0.0\", \"dependencies\": { \"react\": \"^18.2.0\" }}",
  "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer...",
  "It is a far, far better thing that I do, than I have ever done; it is a far, far better rest...",
  "O Romeo, Romeo! wherefore art thou Romeo? Deny thy father and refuse thy name;",
  "Water, water, every where, / And all the boards did shrink; / Nor any drop to drink.",
  "Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume...",
  "\"I have love in me the likes of which you can scarcely imagine and rage the likes of which you would not believe.\" — Mary Shelley",
  "\"It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.\" — Jane Austen",
  "\"All human wisdom is contained in these two words - Wait and Hope.\" — Alexandre Dumas"
];

function generateText(difficulty: 'Easy' | 'Medium' | 'Hard', minLength: number = 150) {
  let bank = EASY_SENTENCES;
  if (difficulty === 'Medium') bank = MEDIUM_SENTENCES;
  if (difficulty === 'Hard') bank = HARD_SENTENCES;
  
  const selected = [];
  let currentLength = 0;
  while (currentLength < minLength) {
    const sentence = bank[Math.floor(Math.random() * bank.length)];
    selected.push(sentence);
    currentLength += sentence.length + 1;
  }
  return selected.join(' ').trim();
}

interface TypingInterfaceProps {
  targetWpm: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  customText?: string;
  duration?: number;
  onComplete?: (wpm: number, accuracy: number) => void;
}

export default function TypingInterface({ targetWpm, difficulty = 'Easy', customText, duration, onComplete }: TypingInterfaceProps) {
  const [text, setText] = useState(() => customText || generateText(difficulty, duration ? targetWpm * 5 * (duration / 60) * 2.0 : 150));
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [pacerIndex, setPacerIndex] = useState(0);
  const [stats, setStats] = useState<{ wpm: number; accuracy: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(duration || null);
  
  const textContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [charPositions, setCharPositions] = useState<{x: number, y: number}[]>([]);

  const finishTest = (finalInput: string, isTimeUp: boolean = false) => {
    setIsFinished(true);
    const endTime = Date.now();
    const timeMinutes = isTimeUp && duration ? duration / 60 : (endTime - (startTime || endTime)) / 60000;
    const safeTimeMinutes = timeMinutes > 0 ? timeMinutes : 1/60;
    
    let correctChars = 0;
    for (let i = 0; i < finalInput.length; i++) {
      if (finalInput[i] === text[i]) correctChars++;
    }
    const accuracy = finalInput.length > 0 ? Math.round((correctChars / finalInput.length) * 100) : 0;
    
    // Calculate Net WPM (Gross WPM - Uncorrected Errors per minute)
    const grossWpm = (finalInput.length / 5) / safeTimeMinutes;
    const uncorrectedErrors = finalInput.length - correctChars;
    let netWpm = Math.round(grossWpm - (uncorrectedErrors / safeTimeMinutes));
    if (netWpm < 0) netWpm = 0;
    
    const wpm = netWpm;
    const isSuccess = wpm >= targetWpm && accuracy >= 85;
    
    setStats({ wpm, accuracy });
    if (isSuccess) {
      triggerConfetti();
    }
    if (onComplete) {
      onComplete(wpm, accuracy);
    }
  };

  useEffect(() => {
    const minLen = duration ? targetWpm * 5 * (duration / 60) * 2.0 : 150;
    setText(customText || generateText(difficulty, minLen));
    setInput('');
    setStartTime(null);
    setIsFinished(false);
    setPacerIndex(0);
    setStats(null);
    setTimeLeft(duration || null);
  }, [difficulty, customText, duration, targetWpm]);

  // Calculate character positions on mount and resize
  useEffect(() => {
    const updatePositions = () => {
      if (!textContainerRef.current) return;
      const spans = textContainerRef.current.querySelectorAll('.char-span');
      const containerRect = textContainerRef.current.getBoundingClientRect();
      const positions: {x: number, y: number}[] = [];
      
      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        positions.push({
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top
        });
      });
      
      // Add a position for the very end
      if (spans.length > 0) {
        const lastSpan = spans[spans.length - 1];
        const rect = lastSpan.getBoundingClientRect();
        positions.push({
          x: rect.right - containerRect.left,
          y: rect.top - containerRect.top
        });
      }
      
      setCharPositions(positions);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [text]);

  // Pacer logic
  useEffect(() => {
    if (!startTime || isFinished) return;

    const charsPerSecond = (targetWpm * 5) / 60;
    
    const interval = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      const expectedChars = elapsedSeconds * charsPerSecond;
      
      if (expectedChars >= text.length) {
        setPacerIndex(text.length);
        clearInterval(interval);
      } else {
        setPacerIndex(expectedChars);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [startTime, isFinished, targetWpm, text.length]);

  // Timer logic
  useEffect(() => {
    if (!startTime || isFinished || !duration) return;
    
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.ceil(duration - elapsed);
      
      if (remaining <= 0) {
        setTimeLeft(0);
        finishTest(input, true);
        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [startTime, isFinished, duration, input, text]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    
    const val = e.target.value;
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }
    
    setInput(val);
    
    if (val.length >= text.length) {
      finishTest(val, false);
    }
  };

  const triggerConfetti = () => {
    let duration = 3000;
    let particleCount = 5;

    if (difficulty === 'Easy') {
      duration = 1000;
      particleCount = 2;
    } else if (difficulty === 'Medium') {
      duration = 2000;
      particleCount = 3;
    }

    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#BB9AF7', '#F7768E']
      });
      confetti({
        particleCount: particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#BB9AF7', '#F7768E']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const reset = () => {
    const minLen = duration ? targetWpm * 5 * (duration / 60) * 2.0 : 150;
    setText(customText || generateText(difficulty, minLen));
    setInput('');
    setStartTime(null);
    setIsFinished(false);
    setPacerIndex(0);
    setStats(null);
    setTimeLeft(duration || null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Calculate pacer pixel position
  const pacerStyle = useMemo(() => {
    if (charPositions.length === 0) return { opacity: 0 };
    
    const floorIndex = Math.floor(pacerIndex);
    const ceilIndex = Math.min(floorIndex + 1, charPositions.length - 1);
    const fraction = pacerIndex - floorIndex;
    
    const pos1 = charPositions[floorIndex];
    const pos2 = charPositions[ceilIndex];
    
    if (!pos1 || !pos2) return { opacity: 0 };

    // If wrapping to a new line, don't interpolate X smoothly across the screen
    let x = pos1.x;
    let y = pos1.y;
    
    if (pos1.y === pos2.y) {
      x = pos1.x + (pos2.x - pos1.x) * fraction;
    } else {
      // Just snap to the next line if we cross it
      if (fraction > 0.5) {
        x = pos2.x;
        y = pos2.y;
      }
    }

    return {
      transform: `translate(${x}px, ${y}px)`,
      opacity: 1,
      transition: 'transform 0.05s linear'
    };
  }, [pacerIndex, charPositions]);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-slate-ui rounded-2xl shadow-lg relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-6">
          <div className="text-lavender-accent font-medium">Target: {targetWpm} WPM</div>
          {duration && (
            <div className="text-frosted-text/70 font-medium">
              Time: <span className="text-lavender-accent">{timeLeft !== null ? timeLeft : duration}s</span>
            </div>
          )}
        </div>
        <button 
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-indigo-bg text-frosted-text hover:text-lavender-accent transition-colors"
        >
          Reset
        </button>
      </div>

      <div 
        className="relative font-mono text-2xl leading-relaxed tracking-wide cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Hidden input for capturing typing */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInput}
          className="absolute inset-0 opacity-0 w-full h-full cursor-text z-10"
          autoFocus
          disabled={isFinished}
        />

        {/* The Text */}
        <div ref={textContainerRef} className="relative z-0 text-frosted-text/50 select-none flex flex-wrap">
          {text.split(' ').map((word, wordIdx, wordsArray) => {
            const startIndex = wordsArray.slice(0, wordIdx).join(' ').length + (wordIdx > 0 ? 1 : 0);
            
            return (
              <div key={wordIdx} className="flex whitespace-pre">
                {word.split('').map((char, charIdx) => {
                  const i = startIndex + charIdx;
                  let colorClass = '';
                  if (i < input.length) {
                    colorClass = input[i] === char ? 'text-lavender-accent' : 'text-coral-error bg-coral-error/20 rounded-sm';
                  }
                  return (
                    <span key={i} className={`char-span ${colorClass}`}>
                      {char}
                    </span>
                  );
                })}
                {wordIdx < wordsArray.length - 1 && (() => {
                  const i = startIndex + word.length;
                  let colorClass = '';
                  if (i < input.length) {
                    colorClass = input[i] === ' ' ? 'text-lavender-accent' : 'text-coral-error bg-coral-error/20 rounded-sm';
                  }
                  return (
                    <span key={i} className={`char-span ${colorClass}`}>
                      {' '}
                    </span>
                  );
                })()}
              </div>
            );
          })}
        </div>

        {/* The Pacer Cursor */}
        <div 
          className="absolute top-0 left-0 w-[2px] h-[1.5em] bg-lavender-accent/80 shadow-[0_0_8px_rgba(187,154,247,0.8)] z-20 pointer-events-none"
          style={pacerStyle}
        />
        
        {/* User Cursor */}
        {charPositions[input.length] && !isFinished && (
          <motion.div 
            className="absolute top-0 left-0 w-[2px] h-[1.5em] bg-frosted-text z-20 pointer-events-none"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{
              transform: `translate(${charPositions[input.length].x}px, ${charPositions[input.length].y}px)`
            }}
          />
        )}
      </div>

      {isFinished && stats && (
        <motion.div 
          initial={{ opacity: 0, x: (stats.wpm >= targetWpm && stats.accuracy >= 85) ? 0 : [-10, 10, -10, 10, 0], y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-12 text-center border-t pt-8 transition-colors duration-500 ${
            (stats.wpm >= targetWpm && stats.accuracy >= 85) ? 'border-lavender-accent/30' : 'border-coral-error/20'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-6 ${
            (stats.wpm >= targetWpm && stats.accuracy >= 85) ? 'text-lavender-accent' : 'text-frosted-text/70'
          }`}>
            Session Complete
          </h3>
          
          <div className="flex justify-center gap-6 mb-6">
            <div className={`bg-indigo-bg px-8 py-4 rounded-xl border shadow-inner transition-all duration-500 ${
              (stats.wpm >= targetWpm && stats.accuracy >= 85) 
                ? 'border-lavender-accent/30 shadow-[0_0_20px_rgba(187,154,247,0.15)]' 
                : 'border-coral-error/20 shadow-[0_0_15px_rgba(247,118,142,0.05)]'
            }`}>
              <div className="text-frosted-text/50 text-sm mb-1 uppercase tracking-wider">Speed</div>
              <div className={`text-4xl font-bold ${
                (stats.wpm >= targetWpm && stats.accuracy >= 85) ? 'text-lavender-accent' : 'text-coral-error/90'
              }`}>{stats.wpm} <span className="text-lg text-frosted-text/50 font-normal">WPM</span></div>
            </div>
            <div className={`bg-indigo-bg px-8 py-4 rounded-xl border shadow-inner transition-all duration-500 ${
              (stats.wpm >= targetWpm && stats.accuracy >= 85) 
                ? 'border-lavender-accent/30 shadow-[0_0_20px_rgba(187,154,247,0.15)]' 
                : 'border-coral-error/20 shadow-[0_0_15px_rgba(247,118,142,0.05)]'
            }`}>
              <div className="text-frosted-text/50 text-sm mb-1 uppercase tracking-wider">Accuracy</div>
              <div className={`text-4xl font-bold ${
                stats.accuracy >= 85 ? 'text-frosted-text' : 'text-coral-error/90'
              }`}>{stats.accuracy}<span className="text-lg text-frosted-text/50 font-normal">%</span></div>
            </div>
          </div>
          
          <p className="text-frosted-text/70 text-lg italic">
            {(stats.wpm >= targetWpm && stats.accuracy >= 85) 
              ? "Flow state achieved. Perfect rhythm." 
              : stats.accuracy < 85
                ? "Focus on accuracy first. Speed will follow. Reset and try again."
                : targetWpm - stats.wpm <= 10
                  ? "Almost there. Breathe and try again."
                  : "Keep practicing to build speed. Reset and try again."}
          </p>
        </motion.div>
      )}
    </div>
  );
}
