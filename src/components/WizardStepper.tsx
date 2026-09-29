import { FC } from 'react';
import { ScreenId } from '../types';
import { sounds } from '../utils/audio';
import { Home, User, FileText, Sparkles, Users, Check } from 'lucide-react';

interface WizardStepperProps {
  currentScreen: ScreenId;
  onStepClick?: (screen: ScreenId) => void;
}

export const WIZARD_STEPS = [
  {
    step: 1,
    screenId: 'welcome' as ScreenId,
    title: 'Welcome',
    subtitle: "Let's start your journey",
    icon: Home,
  },
  {
    step: 2,
    screenId: 'personal_info' as ScreenId,
    title: 'Your Information',
    subtitle: 'Tell us about yourself',
    icon: User,
  },
  {
    step: 3,
    screenId: 'questionnaire' as ScreenId,
    title: 'Answer Questions',
    subtitle: 'Discover your preferences',
    icon: FileText,
  },
  {
    step: 4,
    screenId: 'sorting_animation' as ScreenId,
    title: 'The Sorting',
    subtitle: 'Let the hat decide',
    icon: Sparkles,
  },
  {
    step: 5,
    screenId: 'sorting_result' as ScreenId,
    title: 'Your Department',
    subtitle: 'See your result',
    icon: Users,
  },
];

export const WizardStepper: FC<WizardStepperProps> = ({
  currentScreen,
  onStepClick,
}) => {
  // Determine current active step index (1-based)
  let activeStep = 1;
  if (currentScreen === 'welcome') activeStep = 1;
  else if (currentScreen === 'personal_info') activeStep = 2;
  else if (currentScreen === 'questionnaire') activeStep = 3;
  else if (currentScreen === 'sorting_animation') activeStep = 4;
  else if (currentScreen === 'sorting_result') activeStep = 5;

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-[#0d0f18]/85 border border-amber-900/35 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
      <div className="space-y-6">
        {WIZARD_STEPS.map((s, idx) => {
          const isCompleted = s.step < activeStep;
          const isActive = s.step === activeStep;
          const isUpcoming = s.step > activeStep;
          const Icon = s.icon;

          return (
            <div key={s.step} className="relative flex items-start gap-3.5 group">
              {/* Connector line between steps */}
              {idx < WIZARD_STEPS.length - 1 && (
                <div
                  className={`absolute left-4.5 top-9 w-0.5 h-9 transition-colors ${
                    isCompleted ? 'bg-amber-400' : 'bg-amber-950/70'
                  }`}
                />
              )}

              {/* Number / Check circle */}
              <button
                disabled={isUpcoming}
                onClick={() => {
                  if (onStepClick && !isUpcoming) {
                    sounds.playClick();
                    onStepClick(s.screenId);
                  }
                }}
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shrink-0 ${
                  isCompleted
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/80 hover:bg-amber-500/30 cursor-pointer'
                    : isActive
                    ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-200'
                    : 'bg-slate-900/80 text-slate-500 border border-slate-800'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.step}
              </button>

              {/* Label */}
              <div
                className={`pt-1 transition-opacity ${
                  isUpcoming ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => {
                  if (onStepClick && !isUpcoming) {
                    sounds.playClick();
                    onStepClick(s.screenId);
                  }
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive
                        ? 'text-amber-300'
                        : isCompleted
                        ? 'text-amber-400/80'
                        : 'text-slate-500'
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-amber-200'
                        : isCompleted
                        ? 'text-slate-200'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                <div className="text-[11px] text-amber-100/50 mt-0.5">
                  {isCompleted
                    ? 'Completed'
                    : isActive
                    ? s.subtitle
                    : s.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
