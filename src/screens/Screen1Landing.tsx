import type { FC } from 'react';
import { ScreenId } from '../types';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import { DEPARTMENTS } from '../data/departments';
import { GoldenHatButton } from '../components/GoldenHatButton';
import { DepartmentHeraldicCard } from '../components/DepartmentHeraldicCard';
import { Users, Star, Sparkles, TrendingUp, ChevronDown } from 'lucide-react';

interface Screen1LandingProps {
  onStartJourney: () => void;
  onExploreDepartments: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen1Landing: FC<Screen1LandingProps> = ({
  onStartJourney,
  onExploreDepartments,
  onNavigate,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-between overflow-hidden">
      {/* Hero Visual Presentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 z-10 space-y-6 text-center lg:text-left">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-fantasy tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE SDG SORTING HAT</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-fantasy text-amber-100 tracking-tight leading-[1.1] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Every mind <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                has a place.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-amber-100/75 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Discover your strengths, explore new opportunities, and find the department
              where you truly belong in the SDG family.
            </p>

            {/* Primary Golden Notched Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <GoldenHatButton
                text="Take the Sorting Hat Test"
                onClick={onStartJourney}
              />

              <GoldenHatButton
                text="Explore Departments"
                onClick={onExploreDepartments}
                showArrow={false}
              />
            </div>

            {/* Quick Live Stats Pill */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-amber-400/70">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>248 Sorted Participants</span>
              </div>
              <span>·</span>
              <span>4 Active Departments</span>
              <span>·</span>
              <span>100% Free & Open</span>
            </div>
          </div>

          {/* Right Visual Column (Hat + Banners) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Ambient Backlight Ring */}
            <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-gradient-to-tr from-amber-600/20 via-yellow-500/20 to-transparent blur-3xl pointer-events-none" />

            {/* Center Stage Presentation Container */}
            <div className="relative w-full max-w-lg aspect-square sm:aspect-4/3 rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <img
                src={ASSETS.heroHall}
                alt="SDG Sorting Hat in the Grand Hall"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent opacity-80" />

              {/* Floating Department Crest Badges Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="text-[10px] px-2 py-1 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300 font-mono">
                  &lt;/&gt; DEV
                </span>
                <span className="text-[10px] px-2 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono">
                  🎨 DESIGN
                </span>
                <span className="text-[10px] px-2 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono">
                  📅 EVENTS
                </span>
                <span className="text-[10px] px-2 py-1 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono">
                  📣 SOCIAL
                </span>
              </div>

              {/* Bottom Hat Crest Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-xs font-fantasy tracking-wider text-amber-300/90 drop-shadow">
                  ✦ THE ANCIENT SDG SORTING HAT ✦
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex flex-col items-center justify-center text-amber-400/50 text-xs">
          <div className="w-5 h-8 rounded-full border-2 border-amber-500/30 flex items-start justify-center p-1">
            <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
          </div>
          <span className="mt-1 text-[11px] tracking-widest uppercase">Scroll to explore</span>
          <ChevronDown className="w-3.5 h-3.5 animate-pulse mt-0.5" />
        </div>
      </div>

      {/* 4-Column Department Heraldic Showcase (Matching Image 2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-fantasy tracking-widest uppercase text-amber-400 font-bold">
            ✦ THE FOUR FELLOWSHIPS ✦
          </div>
          <h2 className="text-3xl sm:text-4xl font-fantasy font-bold text-amber-100">
            Explore the SDG Departments
          </h2>
          <p className="text-sm text-amber-200/70 max-w-xl mx-auto font-sans">
            Every department offers a distinct environment to hone your skills, build real-world tools, and collaborate with passionate peers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(DEPARTMENTS).map((dept) => (
            <DepartmentHeraldicCard
              key={dept.id}
              department={dept}
              onLearnMore={() => onNavigate('department_detail')}
            />
          ))}
        </div>
      </div>

      {/* Bottom 4 Feature Cards Bar */}
      <div className="border-t border-amber-900/30 bg-[#090b11]/90 backdrop-blur-md py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/40 border border-amber-500/15">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-xs sm:text-sm text-amber-100">4 Departments</div>
              <div className="text-[11px] text-amber-200/60">Development, Design, Events, Social Media</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/40 border border-amber-500/15">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-xs sm:text-sm text-amber-100">Personalized Experience</div>
              <div className="text-[11px] text-amber-200/60">A unique journey based on your strengths</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/40 border border-amber-500/15">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-xs sm:text-sm text-amber-100">Be Part of Community</div>
              <div className="text-[11px] text-amber-200/60">Meet passionate people and grow together</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/40 border border-amber-500/15">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-xs sm:text-sm text-amber-100">New Opportunities</div>
              <div className="text-[11px] text-amber-200/60">Work on real projects and make an impact</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

