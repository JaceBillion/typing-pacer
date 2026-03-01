import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Lock, CheckCircle, ArrowLeft, Target, Zap } from 'lucide-react';
import TypingInterface from '../components/TypingInterface';
import AdPlaceholder from '../components/AdPlaceholder';

const LESSONS_DATA = [
  { 
    id: 1, 
    title: 'The Wanderer', 
    focus: 'Lowercase & Muscle Memory',
    desc: 'Find your footing. Top 100 words.', 
    philosophy: 'Before you can run, you must learn to walk. This lesson removes the cognitive load of grammar, allowing you to focus purely on the connection between your mind and the home row.',
    textBank: [
      'the quick brown fox jumps over the lazy dog and then rests under the warm sun',
      'a journey of a thousand miles begins with a single step',
      'to be or not to be that is the question',
      'all that glitters is not gold',
      'actions speak louder than words'
    ], 
    targetWpm: 40 
  },
  { 
    id: 2, 
    title: 'The Apprentice', 
    focus: 'Rhythm & Sustained Flow',
    desc: 'Building rhythm. Top 500 words.', 
    philosophy: 'Speed comes from rhythm, not rushing. Your goal here is to maintain a steady, unbroken flow over a longer sequence of words without hesitation.',
    textBank: [
      'focus on the rhythm of your breath and the movement of your hands as you type these words',
      'the quiet mind is able to hear intuition over fear and doubt',
      'water shapes its course according to the nature of the ground it flows over',
      'nature does not hurry yet everything is accomplished in due time',
      'every keystroke is a step closer to complete mastery of the keyboard'
    ], 
    targetWpm: 50 
  },
  { 
    id: 3, 
    title: 'The Artisan', 
    focus: 'Punctuation & Capitalization',
    desc: 'Punctuation and flow.', 
    philosophy: 'Most people can type lowercase letters quickly, but their rhythm completely breaks the moment they need to use the Shift key or reach for a comma. The Artisan forces you to maintain your Zen while weaving in proper grammar.',
    textBank: [
      'Patience is not simply the ability to wait, it is how we behave while we are waiting.',
      'Do not seek to follow in the footsteps of the wise; seek what they sought.',
      'The bamboo that bends is stronger than the oak that resists.',
      'Flow state is achieved when challenge and skill are perfectly balanced.',
      'Silence isn\'t empty, it\'s full of answers.'
    ], 
    targetWpm: 60 
  },
  { 
    id: 4, 
    title: 'The Ghost', 
    focus: 'Technical Jargon & Symbols',
    desc: 'Unseen speed. Technical jargon.', 
    philosophy: 'The ultimate test of muscle memory. Brackets, numbers, and camelCase. Your fingers must know exactly where the symbol keys are without you ever looking down—typing so effortlessly that your hands look like a ghost hovering over the keyboard.',
    textBank: [
      'function calculateWPM(chars: number, timeMs: number) { return (chars / 5) / (timeMs / 60000); }',
      'const { data, error } = await supabase.from(\'profiles\').select(\'avatar_url\').eq(\'id\', userId);',
      'If $x^2 + y^2 = r^2$, then the derivative $dy/dx = -x/y$ (assuming $y \\neq 0$).',
      'Docker command: docker run -d -p 8080:80 --name web-server nginx:latest',
      'Error: ENOSPC: System limit for number of file watchers reached, watch \'/app/node_modules\''
    ], 
    targetWpm: 80 
  },
];

export default function Lessons() {
  const [progress, setProgress] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('pacer-progress');
    return saved ? JSON.parse(saved) : { 1: 'unlocked', 2: 'locked', 3: 'locked', 4: 'locked' };
  });

  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentLessonText, setCurrentLessonText] = useState('');

  const handleComplete = (wpm: number, accuracy: number) => {
    const activeLesson = LESSONS_DATA.find(l => l.id === activeLessonId);
    if (activeLesson && wpm >= activeLesson.targetWpm && accuracy >= 85) {
      const newProgress = { ...progress, [activeLesson.id]: 'completed' };
      if (activeLesson.id < 4 && newProgress[activeLesson.id + 1] === 'locked') {
        newProgress[activeLesson.id + 1] = 'unlocked';
      }
      setProgress(newProgress);
      localStorage.setItem('pacer-progress', JSON.stringify(newProgress));
    }
  };

  const activeLesson = LESSONS_DATA.find(l => l.id === activeLessonId);

  if (activeLesson) {
    if (isTyping) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]"
        >
          <div className="w-full max-w-4xl mb-8 flex justify-between items-center">
            <button 
              onClick={() => setIsTyping(false)}
              className="flex items-center gap-2 text-frosted-text/70 hover:text-lavender-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Briefing
            </button>
            <div className="text-xl font-bold text-frosted-text">
              Lesson 0{activeLesson.id}: <span className="text-lavender-accent">{activeLesson.title}</span>
            </div>
          </div>
          
          <TypingInterface 
            targetWpm={activeLesson.targetWpm} 
            customText={currentLessonText} 
            onComplete={(wpm, accuracy) => handleComplete(wpm, accuracy)}
          />

          {/* AdSense Placeholder - Horizontal Leaderboard */}
          <AdPlaceholder format="horizontal" className="mt-12" />
        </motion.div>
      );
    }

    // Briefing View
    const status = progress[activeLesson.id];
    const isLocked = status === 'locked';

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]"
      >
        <div className="w-full max-w-2xl">
          <button 
            onClick={() => setActiveLessonId(null)}
            className="flex items-center gap-2 text-frosted-text/70 hover:text-lavender-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Path
          </button>

          <div className="bg-slate-ui p-8 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lavender-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-xl ${isLocked ? 'bg-black/20 text-frosted-text/40' : 'bg-indigo-bg text-lavender-accent'}`}>
                {isLocked ? <Lock className="w-8 h-8" /> : status === 'completed' ? <CheckCircle className="w-8 h-8" /> : <BookOpen className="w-8 h-8" />}
              </div>
              <div>
                <div className="text-sm font-mono text-frosted-text/50 mb-1">LESSON 0{activeLesson.id}</div>
                <h2 className="text-3xl font-bold text-frosted-text">{activeLesson.title}</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-indigo-bg p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-frosted-text/50 text-sm mb-2">
                  <Target className="w-4 h-4" /> Focus
                </div>
                <div className="font-medium text-frosted-text">{activeLesson.focus}</div>
              </div>
              <div className="bg-indigo-bg p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-frosted-text/50 text-sm mb-2">
                  <Zap className="w-4 h-4" /> Target Speed
                </div>
                <div className="font-medium text-lavender-accent">{activeLesson.targetWpm} WPM</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-frosted-text mb-2">Philosophy</h3>
              <p className="text-frosted-text/70 leading-relaxed">
                {activeLesson.philosophy}
              </p>
            </div>

            {isLocked ? (
              <div className="w-full py-4 rounded-xl bg-black/20 border border-white/5 text-center text-frosted-text/50 font-medium">
                Locked. Complete Lesson 0{activeLesson.id - 1} to unlock.
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsTyping(true);
                  setCurrentLessonText(activeLesson.textBank[Math.floor(Math.random() * activeLesson.textBank.length)]);
                }}
                className="w-full py-4 rounded-xl bg-lavender-accent text-indigo-bg font-bold text-lg hover:shadow-[0_0_20px_rgba(187,154,247,0.4)] transition-all"
              >
                {status === 'completed' ? 'Replay Lesson' : 'Begin Lesson'}
              </button>
            )}
          </div>
        </div>
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
        <h1 className="text-4xl font-bold text-lavender-accent mb-4">The Path</h1>
        <p className="text-frosted-text/70 text-lg max-w-2xl">
          A progressive narrative journey from novice to master. Each lesson builds muscle memory and rhythm.
        </p>
      </div>

      {/* AdSense Placeholder - Horizontal Leaderboard */}
      <AdPlaceholder format="horizontal" className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {LESSONS_DATA.map((lesson) => {
          const status = progress[lesson.id];
          return (
            <div 
              key={lesson.id}
              onClick={() => setActiveLessonId(lesson.id)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                status === 'completed' 
                  ? 'bg-slate-ui border-lavender-accent/30 shadow-[0_0_15px_rgba(187,154,247,0.1)] hover:border-lavender-accent/50' 
                  : status === 'unlocked'
                  ? 'bg-slate-ui border-white/10 hover:border-lavender-accent/50'
                  : 'bg-slate-ui/50 border-white/5 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${
                  status === 'completed' ? 'bg-lavender-accent/20 text-lavender-accent' :
                  status === 'unlocked' ? 'bg-white/10 text-frosted-text' :
                  'bg-black/20 text-frosted-text/40'
                }`}>
                  {status === 'completed' ? <CheckCircle className="w-6 h-6" /> :
                   status === 'unlocked' ? <BookOpen className="w-6 h-6" /> :
                   <Lock className="w-6 h-6" />}
                </div>
                <span className="text-sm font-mono text-frosted-text/40">0{lesson.id}</span>
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${
                status === 'locked' ? 'text-frosted-text/50' : 'text-frosted-text'
              }`}>
                {lesson.title}
              </h3>
              <p className="text-frosted-text/60 text-sm leading-relaxed">
                {lesson.desc}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
