import { FC, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { DepartmentId, ScreenId } from '../types';
import { DEPARTMENTS } from '../data/departments';
import { sounds } from '../utils/audio';
import { motion } from 'framer-motion';
import { scalePop } from '../utils/animation';
import {
  Code,
  Palette,
  Calendar,
  Megaphone,
  CheckCircle2,
  Sparkles,
  User,
  ArrowRight,
  Share2,
  Check,
} from 'lucide-react';
import { WizardStepper } from '../components/WizardStepper';

interface Screen6SortingResultProps {
  departmentId: DepartmentId;
  scores: Record<DepartmentId, number>;
  onExploreDepartments: () => void;
  onGoToProfile: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen6SortingResult: FC<Screen6SortingResultProps> = ({
  departmentId,
  scores,
  onExploreDepartments,
  onGoToProfile,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const dept = DEPARTMENTS[departmentId] || DEPARTMENTS.development;

  useEffect(() => {
    sounds.playDepartmentReveal(departmentId);

    // Trigger celebratory confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#f59e0b', '#3b82f6', '#ffffff'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#eab308', '#dc2626', '#10b981'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#a855f7', '#fbbf24'],
    });
  }, []);

  const handleShare = () => {
    sounds.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`I just took the SDG Sorting Hat test and got sorted into ${dept.name}! Join the fellowship at Setif Developers Group.`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getDeptIcon = () => {
    switch (departmentId) {
      case 'development':
        return <Code className="w-16 h-16 sm:w-20 sm:h-20 text-blue-200" />;
      case 'design':
        return <Palette className="w-16 h-16 sm:w-20 sm:h-20 text-rose-200" />;
      case 'events':
        return <Calendar className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-200" />;
      case 'social_media':
        return <Megaphone className="w-16 h-16 sm:w-20 sm:h-20 text-purple-200" />;
    }
  };

  return (
    <motion.section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" variants={scalePop} initial="hidden" animate="visible">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Stepper Navigation */}
        <WizardStepper currentScreen="sorting_result" onStepClick={onNavigate} />

        {/* Center: Sorting Result Showcase */}
        <div className="flex-1 w-full space-y-6">
          {/* Top Announcement */}
          <div className="text-center space-y-2">
            <div className="text-xs font-fantasy tracking-widest uppercase text-amber-400 font-bold">
              ✦ THE SDG SORTING HAT ✦
            </div>
            <h2 className="text-2xl sm:text-3xl font-fantasy text-amber-200 tracking-wide">
              You have been sorted into
            </h2>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-fantasy tracking-wider uppercase bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(245,158,11,0.5)]">
              {dept.name}
            </h1>
            <p className="text-sm sm:text-base text-amber-300/80 italic font-serif">
              &ldquo;{dept.tagline}&rdquo;
            </p>
          </div>

          {/* Main Grid: Hanging Banner + Parchment Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Hanging Department Heraldic Banner (Matching Screenshot 6) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black/95 border border-amber-500/40 shadow-2xl relative overflow-hidden text-center min-h-[380px]">
              {/* Backlight Glow based on Department */}
              <div
                className="absolute inset-0 opacity-25 blur-3xl pointer-events-none"
                style={{ backgroundColor: dept.colorHex }}
              />

              {/* Hanging Banner Container */}
              <div className="relative z-10 w-full max-w-[240px] flex flex-col items-center animate-float">
                {/* Brass Banner Hanging Pole */}
                <div className="w-full h-3 rounded-full bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 border border-amber-300/70 shadow-md mb-2 flex items-center justify-between px-2">
                  <span className="w-2 h-2 rounded-full bg-amber-200" />
                  <span className="w-2 h-2 rounded-full bg-amber-200" />
                </div>

                {/* Banner Fabric */}
                <div
                  className="w-full pt-8 pb-10 px-6 rounded-b-xl border-x-2 border-b-2 shadow-2xl relative flex flex-col items-center"
                  style={{
                    backgroundColor:
                      departmentId === 'development'
                        ? '#1d3557'
                        : departmentId === 'design'
                        ? '#4a0e17'
                        : departmentId === 'events'
                        ? '#0f4c3a'
                        : '#3c096c',
                    borderColor: 'rgba(245, 197, 66, 0.6)',
                  }}
                >
                  {/* Glowing Department Crest */}
                  <div className="w-24 h-24 rounded-2xl bg-white/10 border-2 border-amber-300/60 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                    {getDeptIcon()}
                  </div>

                  <div className="font-fantasy font-bold text-lg sm:text-xl text-amber-100 tracking-widest uppercase">
                    {dept.name}
                  </div>
                  <div className="text-[11px] text-amber-200/70 mt-1 font-mono">
                    Score: {scores[departmentId] || 87} pts
                  </div>

                  {/* Banner Swallowtail Bottom V-notch decoration */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 border-r-2 border-b-2 border-amber-300/60 bg-inherit" />
                </div>
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="mt-6 z-10 px-4 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Result Copied!' : 'Share Result'}</span>
              </button>
            </div>

            {/* Parchment Explanation Card (Matching Image 4) */}
            <div className="md:col-span-7 parchment-card parchment-flourish p-6 sm:p-8 overflow-visible flex flex-col justify-between">
              <div className="space-y-6">
                {/* Why Section */}
                <div>
                  <h3 className="font-fantasy font-extrabold text-xl sm:text-2xl text-amber-950">
                    Why {dept.name}?
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900/90 mt-2 leading-relaxed font-serif">
                    You showed strong analytical thinking, problem solving skills and a passion for
                    building things. You enjoy turning ideas into real, working solutions and creating
                    impact through technology.
                  </p>
                </div>

                {/* Key Strengths (Matching Image 4 Pill Badges) */}
                <div>
                  <h4 className="font-fantasy font-bold text-xs uppercase tracking-wider text-amber-950 mb-2.5">
                    Key Strengths
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {dept.keySkills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-200/50 border border-amber-900/30 text-amber-950 text-xs font-semibold flex items-center gap-2 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* What You Can Do (Matching Image 4 Icon List) */}
                <div>
                  <h4 className="font-fantasy font-bold text-xs uppercase tracking-wider text-amber-950 mb-2.5">
                    What You Can Do in {dept.name}
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-amber-950">
                    {dept.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                        <span className="font-serif leading-snug">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="pt-6 mt-6 border-t border-amber-900/20 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onExploreDepartments();
                  }}
                  className="btn-notch-parchment w-full sm:w-auto flex-1 px-5 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <span>Explore All Departments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onGoToProfile();
                  }}
                  className="btn-notch-ghost w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Go to My Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};



