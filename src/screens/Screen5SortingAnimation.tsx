import { FC, useEffect, useState } from 'react';
import { ScreenId } from '../types';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import { WizardStepper } from '../components/WizardStepper';
import { Code, Palette, Calendar, Megaphone, Sparkles, Check, FastForward } from 'lucide-react';

interface Screen5SortingAnimationProps {
  onComplete: () => void;
  onNavigate: (screen: ScreenId) => void;
}

const STAGES = [
  { id: 1, label: 'Reading your answers...', range: [0, 25] },
  { id: 2, label: 'Analyzing your strengths...', range: [25, 55] },
  { id: 3, label: 'Comparing with departments...', range: [55, 85] },
  { id: 4, label: 'Almost there...', range: [85, 100] },
];

export const Screen5SortingAnimation: FC<Screen5SortingAnimationProps> = ({
  onComplete,
  onNavigate,
}) => {
  const [progress, setProgress] = useState(15);
  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    sounds.playSortingResonance();
    sounds.playThemeMusic();

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sounds.playRevealFanfare();
            onComplete();
          }, 600);
          return 100;
        }

        if (next >= 85) setActiveStage(4);
        else if (next >= 55) setActiveStage(3);
        else if (next >= 25) setActiveStage(2);
        else setActiveStage(1);

        // Periodically trigger a subtle resonance sound
        if (next === 30 || next === 60 || next === 85) {
          sounds.playChime(440 + next * 2);
        }
        // Dramatic hat rumble just before the reveal
        if (next === 95) {
          sounds.playHatRumble();
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sounds.playRevealFanfare();
    onComplete();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Stepper Navigation */}
        <WizardStepper currentScreen="sorting_animation" onStepClick={onNavigate} />

        {/* Center: Grand Sorting Stage */}
        <div className="flex-1 w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-xs font-fantasy tracking-widest uppercase text-amber-400 font-bold">
              ✦ THE SDG SORTING HAT ✦
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-fantasy text-amber-100 tracking-tight">
              The Sorting Hat is thinking...
            </h2>
            <div className="w-20 h-0.5 bg-amber-500/40 mx-auto" />
            <p className="text-xs sm:text-base text-amber-200/80 max-w-xl mx-auto leading-relaxed">
              Analyzing your answers, discovering your strengths, and finding the department where
              you truly belong.
            </p>
          </div>

          {/* Magical Stage Arena (Matching Screenshot 5) */}
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-gradient-to-b from-[#0c0d16] via-[#10121d] to-[#07080d] p-6 sm:p-12 text-center">
            {/* Ambient Background Energy */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600/15 via-transparent to-transparent pointer-events-none" />

            {/* 4 Glowing Department Emblems Floating In Arc */}
            <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-6 max-w-lg mx-auto mb-8">
              {/* Development - Blue */}
              <div className="flex flex-col items-center group">
                <div
                  className={`w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-blue-950/80 border-2 border-blue-400 flex items-center justify-center text-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all ${
                    progress > 20 ? 'scale-105 animate-pulse' : 'opacity-70'
                  }`}
                >
                  <Code className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                <span className="text-[10px] sm:text-xs font-fantasy font-bold text-blue-400 mt-2 tracking-wider">
                  DEV
                </span>
              </div>

              {/* Design - Crimson */}
              <div className="flex flex-col items-center group">
                <div
                  className={`w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-rose-950/80 border-2 border-rose-400 flex items-center justify-center text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.6)] transition-all ${
                    progress > 35 ? 'scale-105 animate-pulse' : 'opacity-70'
                  }`}
                >
                  <Palette className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                <span className="text-[10px] sm:text-xs font-fantasy font-bold text-rose-400 mt-2 tracking-wider">
                  DESIGN
                </span>
              </div>

              {/* Events - Emerald */}
              <div className="flex flex-col items-center group">
                <div
                  className={`w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all ${
                    progress > 55 ? 'scale-105 animate-pulse' : 'opacity-70'
                  }`}
                >
                  <Calendar className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                <span className="text-[10px] sm:text-xs font-fantasy font-bold text-emerald-400 mt-2 tracking-wider">
                  EVENTS
                </span>
              </div>

              {/* Social Media - Purple */}
              <div className="flex flex-col items-center group">
                <div
                  className={`w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-purple-950/80 border-2 border-purple-400 flex items-center justify-center text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all ${
                    progress > 75 ? 'scale-105 animate-pulse' : 'opacity-70'
                  }`}
                >
                  <Megaphone className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                <span className="text-[10px] sm:text-xs font-fantasy font-bold text-purple-400 mt-2 tracking-wider">
                  SOCIAL
                </span>
              </div>
            </div>

            {/* Central Animated Sorting Hat */}
            <div className="relative mx-auto w-48 sm:w-60 h-48 sm:h-60 mb-6 flex items-center justify-center">
              {/* Swirling energy rings */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/40 animate-[spin_6s_linear_infinite] shadow-[0_0_30px_rgba(245,158,11,0.3)]" />
              <div className="absolute inset-2 rounded-full border border-dashed border-amber-300/30 animate-[spin_10s_linear_infinite_reverse]" />
              <div className="absolute inset-6 rounded-full border border-amber-500/20 animate-ping opacity-30" />

              {/* Sorting Hat Image */}
              <img
                src={ASSETS.hatCloseup}
                alt="Enchanted Sorting Hat"
                className="w-40 sm:w-48 h-40 sm:h-48 object-cover rounded-full shadow-[0_0_40px_rgba(234,179,8,0.5)] border-2 border-amber-500/60 transition-transform duration-500 hover:scale-105"
              />

              {/* Magical Whispers Sparkle Badge */}
              <div className="absolute -bottom-2 bg-amber-950/90 border border-amber-400/60 px-3 py-1 rounded-full text-amber-200 text-xs font-fantasy flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Deliberating destiny...</span>
              </div>
            </div>

            {/* Staged Progress Section (Matching Screenshot 5) */}
            <div className="max-w-2xl mx-auto pt-4 space-y-4">
              {/* Progress Bar with Number */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 rounded-full bg-slate-950 border border-amber-500/30 overflow-hidden relative shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-200 rounded-full transition-all duration-150 shadow-[0_0_15px_#f59e0b]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="font-mono text-base font-bold text-amber-300 w-12 text-right">
                  {progress}%
                </span>
              </div>

              {/* 4 Milestones */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
                {STAGES.map((s) => {
                  const isDone = progress >= s.range[1];
                  const isCurrent = activeStage === s.id;

                  return (
                    <div key={s.id} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-amber-400 text-black font-bold'
                            : isCurrent
                            ? 'border-2 border-amber-400 bg-amber-950 text-amber-300 shadow-[0_0_10px_#f59e0b]'
                            : 'border border-slate-700 bg-slate-900 text-slate-600'
                        }`}
                      >
                        {isDone ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                      </div>
                      <span
                        className={`text-[11px] leading-tight ${
                          isCurrent
                            ? 'text-amber-200 font-bold'
                            : isDone
                            ? 'text-amber-400/80 font-medium'
                            : 'text-slate-500'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fast-forward convenience button */}
            <div className="pt-6">
              <button
                onClick={handleSkip}
                className="px-4 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-amber-400/80 hover:text-amber-200 border border-amber-500/30 text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Fast-forward to Result</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
