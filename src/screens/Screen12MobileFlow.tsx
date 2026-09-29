import { FC, useState } from 'react';
import { DepartmentId, ParticipantInfo, ScreenId } from '../types';
import { DEPARTMENTS } from '../data/departments';
import { QUESTIONS } from '../data/questions';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import {
  Smartphone,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Code,
  Palette,
  Calendar,
  Megaphone,
  User,
  RotateCcw,
  Share2,
} from 'lucide-react';

interface Screen12MobileFlowProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen12MobileFlow: FC<Screen12MobileFlowProps> = ({
  onNavigate,
}) => {
  const [mobileStep, setMobileStep] = useState<
    'intro' | 'info' | 'question' | 'sorting' | 'result'
  >('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string>('');
  const [mobileName, setMobileName] = useState('Brahim Mihoubi');
  const [mobileEmail, setMobileEmail] = useState('brahim.m@univ-setif.dz');
  const [mobileDept, setMobileDept] = useState<DepartmentId>('development');

  const startTest = () => {
    sounds.playClick();
    setMobileStep('info');
  };

  const submitInfo = () => {
    sounds.playClick();
    setMobileStep('question');
  };

  const handleNextQ = () => {
    sounds.playClick();
    if (currentQ < 2) {
      setCurrentQ(currentQ + 1);
      setSelectedOpt('');
    } else {
      setMobileStep('sorting');
      sounds.playSortingResonance();
      setTimeout(() => {
        sounds.playRevealFanfare();
        setMobileStep('result');
      }, 2200);
    }
  };

  const resetMobileFlow = () => {
    sounds.playClick();
    setMobileStep('intro');
    setCurrentQ(0);
    setSelectedOpt('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-xs font-fantasy tracking-widest uppercase text-amber-400 font-bold">
          ✦ SCREEN 12 / 12: RESPONSIVE CANDIDATE EXPERIENCE ✦
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-fantasy text-amber-100">
          Mobile Flow Experience
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/70 max-w-xl mx-auto">
          Optimized for seamless smartphone participation during Welcome Day auditoriums and QR
          code scans.
        </p>
      </div>

      {/* Simulator Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Device Frame */}
        <div className="relative w-[360px] h-[720px] bg-slate-950 rounded-[48px] p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border-4 border-slate-800 ring-1 ring-amber-500/30 flex flex-col justify-between overflow-hidden">
          {/* Top Notch / Dynamic Island */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1a1c23] ml-auto mr-3" />
          </div>

          {/* Screen Content Wrapper */}
          <div className="relative w-full h-full bg-[#0a0c14] rounded-[36px] overflow-y-auto overflow-x-hidden text-amber-100 flex flex-col justify-between pt-9 pb-4 px-4 scrollbar-none">
            {/* Ambient Background inside phone */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
              style={{ backgroundImage: `url(${ASSETS.heroHall})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c14]/90 via-[#0a0c14]/80 to-[#0a0c14]/95 pointer-events-none" />

            {/* Mobile Header */}
            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-amber-900/30">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold">
                  S
                </div>
                <span className="font-fantasy text-xs font-bold text-amber-200">SDG Sorting</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400/70">Univ Sétif 1</span>
            </div>

            {/* Step 1: Intro */}
            {mobileStep === 'intro' && (
              <div className="relative z-10 py-6 space-y-4 text-center my-auto">
                <img
                  src={ASSETS.hatCloseup}
                  alt="Sorting Hat"
                  className="w-28 h-28 object-cover rounded-full mx-auto border-2 border-amber-500/50 shadow-lg"
                />
                <h3 className="font-fantasy font-bold text-xl text-amber-100">
                  Every mind has a place.
                </h3>
                <p className="text-xs text-amber-200/75 leading-relaxed">
                  Discover your strengths and find your department in the SDG tech family.
                </p>
                <button
                  onClick={startTest}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Start Test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Step 2: Information */}
            {mobileStep === 'info' && (
              <div className="relative z-10 py-4 space-y-3.5 my-auto">
                <div className="text-center">
                  <div className="text-[10px] font-fantasy text-amber-400">STEP 1 OF 3</div>
                  <h4 className="font-fantasy font-bold text-lg text-amber-100">
                    Your Information
                  </h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-amber-300 font-semibold block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={mobileName}
                      onChange={(e) => setMobileName(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-amber-900/40 text-xs text-amber-100"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-amber-300 font-semibold block mb-1">
                      University Email
                    </label>
                    <input
                      type="email"
                      value={mobileEmail}
                      onChange={(e) => setMobileEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-amber-900/40 text-xs text-amber-100"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-amber-300 font-semibold block mb-1">
                      Faculty
                    </label>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-amber-900/40 text-xs text-slate-200">
                      Computer Science Department
                    </div>
                  </div>
                </div>

                <button
                  onClick={submitInfo}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <span>Continue to Questions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Step 3: Questions */}
            {mobileStep === 'question' && (
              <div className="relative z-10 py-4 space-y-3 my-auto">
                <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
                  <span>Question {currentQ + 1} of 3</span>
                  <span>{Math.round(((currentQ + 1) / 3) * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all"
                    style={{ width: `${((currentQ + 1) / 3) * 100}%` }}
                  />
                </div>

                <h4 className="font-fantasy font-bold text-sm text-amber-100 mt-2">
                  {QUESTIONS[currentQ]?.title}
                </h4>

                <div className="space-y-2 pt-1">
                  {QUESTIONS[currentQ]?.options.slice(0, 3).map((opt) => {
                    const isSel = selectedOpt === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedOpt(opt.id)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                          isSel
                            ? 'bg-amber-500/20 border-amber-400 text-amber-100'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="font-medium text-[11px]">{opt.text}</span>
                        {isSel && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNextQ}
                  disabled={!selectedOpt}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    selectedOpt
                      ? 'bg-amber-600 text-slate-950'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>{currentQ === 2 ? 'Sort Me Now!' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Step 4: Sorting Animation */}
            {mobileStep === 'sorting' && (
              <div className="relative z-10 py-6 text-center space-y-4 my-auto">
                <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-amber-400/50 animate-spin" />
                  <img
                    src={ASSETS.hatCloseup}
                    alt="Sorting Hat"
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                </div>
                <h4 className="font-fantasy font-bold text-base text-amber-200">
                  The Hat is Deliberating...
                </h4>
                <p className="text-[11px] text-amber-200/70">
                  Synthesizing your strengths and preferences...
                </p>
              </div>
            )}

            {/* Step 5: Sorting Result */}
            {mobileStep === 'result' && (
              <div className="relative z-10 py-4 space-y-3 text-center my-auto">
                <div className="text-[10px] font-fantasy tracking-wider uppercase text-amber-400 font-bold">
                  ASSIGNED DEPARTMENT
                </div>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-900 border-2 border-amber-400 flex items-center justify-center text-blue-200 shadow-xl">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-fantasy text-amber-100 uppercase">
                  Development
                </h3>
                <p className="text-[11px] text-amber-300/80 italic">
                  &ldquo;Turning ideas into real solutions.&rdquo;
                </p>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-900/30 text-left text-[11px] space-y-1">
                  <span className="font-bold text-amber-200 block">Your Key Strengths:</span>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px]">
                      Problem Solving
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px]">
                      Logic
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px]">
                      Coding
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => onNavigate('member_profile')}
                    className="w-full py-2.5 rounded-xl bg-amber-600 text-slate-950 font-bold text-xs"
                  >
                    View Full Profile
                  </button>
                  <button
                    onClick={resetMobileFlow}
                    className="w-full py-1.5 text-xs text-amber-400/80 hover:text-amber-200 flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restart Mobile Demo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Bottom Bar */}
            <div className="relative z-10 pt-2 border-t border-amber-900/30 flex items-center justify-around text-[10px] text-amber-400/60 font-mono">
              <span>Home</span>
              <span className="text-amber-300 font-bold">Sorting</span>
              <span>Depts</span>
              <span>Profile</span>
            </div>
          </div>
        </div>

        {/* Feature Explanations Column */}
        <div className="max-w-md space-y-6">
          <div className="parchment-card rounded-2xl p-6 border border-amber-900/30 space-y-3">
            <h3 className="font-fantasy font-bold text-lg text-amber-950 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-amber-800" />
              <span>Mobile-First Welcome Day</span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/85 leading-relaxed">
              During the annual Welcome Day event in Sétif, hundreds of university students scan the
              stage QR code with their mobile devices. The mobile experience features:
            </p>
            <ul className="space-y-2 text-xs text-amber-950/90 font-medium">
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Optimized thumb-friendly touch targets (&gt;44px)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Zero network bloat with instantaneous question transitions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Real-time sync to the stage projector & admin analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Social sharing card generation directly to phone</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-3">
            <h4 className="font-fantasy font-bold text-sm text-amber-200">
              Interactive Test Controls
            </h4>
            <p className="text-xs text-amber-200/70">
              Use the phone simulator on the left to try out the fast mobile onboarding flow, or
              jump directly to any of the full desktop screens.
            </p>
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate('welcome');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Switch to Full Desktop Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
