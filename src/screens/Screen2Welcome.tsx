import type { FC } from 'react';
import { ScreenId } from '../types';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import { WizardStepper } from '../components/WizardStepper';
import { GoldenHatButton } from '../components/GoldenHatButton';
import { Code, Palette, Calendar, Megaphone, BookOpen } from 'lucide-react';

interface Screen2WelcomeProps {
  onNext: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen2Welcome: FC<Screen2WelcomeProps> = ({
  onNext,
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Stepper Navigation */}
        <WizardStepper currentScreen="welcome" onStepClick={onNavigate} />

        {/* Center: Main Parchment Content Card (Matching Image 1) */}
        <div className="flex-1 w-full space-y-6">
          <div className="parchment-card parchment-flourish p-6 sm:p-10 relative overflow-visible">
            {/* Header Kicker */}
            <div className="text-center space-y-3 mb-8">
              <p className="text-sm sm:text-base text-amber-950 font-serif max-w-2xl mx-auto leading-relaxed">
                This is more than a questionnaire. It&apos;s a journey to discover your
                strengths, interests, and the place where you can make the biggest impact
                in our community.
              </p>
            </div>

            {/* 4 Department Mini Cards (2x2 Grid with divider lines matching Image 1) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 relative">
              {/* Vertical divider line for desktop */}
              <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-amber-900/20 -translate-x-1/2" />
              {/* Horizontal divider line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-2 right-2 h-px bg-amber-900/20 -translate-y-1/2" />

              {/* Development */}
              <div className="p-4 rounded-2xl flex items-start gap-4 hover:bg-amber-950/5 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-blue-900/15 border border-blue-900/30 text-blue-900 flex items-center justify-center shrink-0 shadow-sm">
                  <Code className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-fantasy font-bold text-amber-950 text-lg sm:text-xl">Development</h4>
                  <p className="text-xs sm:text-sm text-amber-900/85 leading-relaxed font-sans">
                    Build, develop and turn ideas into real solutions.
                  </p>
                </div>
              </div>

              {/* Design */}
              <div className="p-4 rounded-2xl flex items-start gap-4 hover:bg-amber-950/5 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-rose-900/15 border border-rose-900/30 text-rose-900 flex items-center justify-center shrink-0 shadow-sm">
                  <Palette className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-fantasy font-bold text-amber-950 text-lg sm:text-xl">Design</h4>
                  <p className="text-xs sm:text-sm text-amber-900/85 leading-relaxed font-sans">
                    Create beautiful visuals and meaningful experiences.
                  </p>
                </div>
              </div>

              {/* Events */}
              <div className="p-4 rounded-2xl flex items-start gap-4 hover:bg-amber-950/5 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-emerald-900/15 border border-emerald-900/30 text-emerald-900 flex items-center justify-center shrink-0 shadow-sm">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-fantasy font-bold text-amber-950 text-lg sm:text-xl">Events</h4>
                  <p className="text-xs sm:text-sm text-amber-900/85 leading-relaxed font-sans">
                    Organize, plan and bring people together through impactful events.
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="p-4 rounded-2xl flex items-start gap-4 hover:bg-amber-950/5 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-purple-900/15 border border-purple-900/30 text-purple-900 flex items-center justify-center shrink-0 shadow-sm">
                  <Megaphone className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-fantasy font-bold text-amber-950 text-lg sm:text-xl">Social Media</h4>
                  <p className="text-xs sm:text-sm text-amber-900/85 leading-relaxed font-sans">
                    Share ideas, create content and grow our community online.
                  </p>
                </div>
              </div>
            </div>

            {/* Inset Parchment Note Box (Matching Image 1) */}
            <div className="inset-parchment-box p-5 sm:p-6 flex items-start gap-4 text-amber-950 my-6">
              <BookOpen className="w-8 h-8 text-amber-800 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-serif">
                You will answer a few questions about your interests and preferences. At the end, the Sorting Hat will analyze your answers and assign you to the department where you can truly belong.
              </p>
            </div>

            {/* Next Action Golden Button (Matching Image 3) */}
            <div className="text-center pt-4">
              <GoldenHatButton
                text="Start Journey →"
                onClick={() => {
                  sounds.playClick();
                  onNext();
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: Tome Stack & Sorting Hat Visual Card */}
        <div className="hidden xl:flex flex-col items-center justify-center w-72 shrink-0 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#0e1017]">
            <img
              src={ASSETS.hatCloseup}
              alt="The Sorting Hat on ancient spellbooks"
              className="w-full h-auto object-cover"
            />
            <div className="p-3 text-center bg-[#090b10] border-t border-amber-900/30">
              <div className="font-fantasy font-bold text-xs tracking-wider text-amber-300">
                SDG CODEX ARCHIVES
              </div>
              <div className="text-[10px] text-amber-200/50 mt-0.5">
                4 Departments · One Fellowship
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

