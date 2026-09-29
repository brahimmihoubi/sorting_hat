import { FC, useState } from 'react';
import { ParticipantInfo, ScreenId } from '../types';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import { WizardStepper } from '../components/WizardStepper';
import { User, Mail, Building2, GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';

interface Screen3PersonalInfoProps {
  participant: ParticipantInfo;
  onUpdateParticipant: (data: Partial<ParticipantInfo>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen3PersonalInfo: FC<Screen3PersonalInfoProps> = ({
  participant,
  onUpdateParticipant,
  onNext,
  onPrevious,
  onNavigate,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const faculties = [
    'Computer Science Department',
    'Mathematics & Informatics',
    'Technology / Engineering',
    'Electronics & Telecommunications',
    'Natural & Life Sciences',
    'Economics & Management',
    'Medicine & Health Sciences',
    'Other Faculty',
  ];

  const studyYears = [
    'Licence 1',
    'Licence 2',
    'Licence 3',
    'Master 1',
    'Master 2',
    'Doctorate',
    'Alumni / Self-Taught',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!participant.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!participant.email.trim() || !participant.email.includes('@')) {
      newErrors.email = 'Please provide a valid university email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      sounds.playClick();
      return;
    }

    setErrors({});
    sounds.playClick();
    onNext();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Stepper Navigation */}
        <WizardStepper currentScreen="personal_info" onStepClick={onNavigate} />

        {/* Center: Form Card */}
        <div className="flex-1 w-full space-y-6">
          <div className="parchment-card parchment-flourish p-6 sm:p-10 relative overflow-visible">
            {/* Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="text-xs font-fantasy tracking-widest uppercase text-amber-900 font-bold">
                ✦ THE SDG SORTING HAT ✦
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-fantasy text-amber-950 tracking-tight">
                Tell Us About Yourself
              </h2>
              <div className="w-16 h-0.5 bg-amber-800/40 mx-auto" />
              <p className="text-sm sm:text-base text-amber-900/80 max-w-xl mx-auto font-sans leading-relaxed">
                This information helps us personalize your experience and understand your background better.
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-800/60">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={participant.fullName}
                    onChange={(e) => onUpdateParticipant({ fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-amber-100/70 border border-amber-900/30 text-amber-950 placeholder-amber-900/40 focus:outline-none focus:ring-2 focus:ring-amber-700/50 text-sm font-medium transition-all"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-rose-700 font-semibold mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* University Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1.5">
                  University Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-800/60">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={participant.email}
                    onChange={(e) => onUpdateParticipant({ email: e.target.value })}
                    placeholder="example@univ-setif.dz"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-amber-100/70 border border-amber-900/30 text-amber-950 placeholder-amber-900/40 focus:outline-none focus:ring-2 focus:ring-amber-700/50 text-sm font-medium transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-700 font-semibold mt-1">{errors.email}</p>
                )}
              </div>

              {/* Faculty / Department */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1.5">
                  Faculty / Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-800/60">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <select
                    value={participant.faculty}
                    onChange={(e) => onUpdateParticipant({ faculty: e.target.value })}
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-amber-100/70 border border-amber-900/30 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-700/50 text-sm font-medium transition-all appearance-none cursor-pointer"
                  >
                    {faculties.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Study Year */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1.5">
                  Study Year
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-800/60">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <select
                    value={participant.studyYear}
                    onChange={(e) => onUpdateParticipant({ studyYear: e.target.value })}
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-amber-100/70 border border-amber-900/30 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-700/50 text-sm font-medium transition-all appearance-none cursor-pointer"
                  >
                    {studyYears.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onPrevious();
                  }}
                  className="btn-notch-ghost px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>← Previous</span>
                </button>

                <button
                  type="submit"
                  className="btn-notch-parchment px-8 py-2.5 text-xs sm:text-sm flex items-center gap-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Tome & Hat */}
        <div className="hidden xl:flex flex-col items-center justify-center w-72 shrink-0 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#0e1017]">
            <img
              src={ASSETS.hatCloseup}
              alt="The Sorting Hat on ancient spellbooks"
              className="w-full h-auto object-cover"
            />
            <div className="p-3 text-center bg-[#090b10] border-t border-amber-900/30">
              <div className="font-fantasy font-bold text-xs tracking-wider text-amber-300">
                SDG STUDENT REGISTRY
              </div>
              <div className="text-[10px] text-amber-200/50 mt-0.5">
                Enchanted parchment records
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
