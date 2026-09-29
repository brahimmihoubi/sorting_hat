import { FC } from 'react';
import { Department } from '../types';
import { sounds } from '../utils/audio';
import {
  Code,
  Palette,
  Calendar,
  Megaphone,
  Monitor,
  Cpu,
  Sparkles,
  Award,
  Video,
  Users,
  MessageSquare,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface DepartmentHeraldicCardProps {
  department: Department;
  onLearnMore: () => void;
  className?: string;
}

export const DepartmentHeraldicCard: FC<DepartmentHeraldicCardProps> = ({
  department,
  onLearnMore,
  className = '',
}) => {
  const getDeptIcon = () => {
    switch (department.id) {
      case 'development':
        return <Code className="w-8 h-8 text-blue-300" />;
      case 'design':
        return <Palette className="w-8 h-8 text-rose-300" />;
      case 'events':
        return <Calendar className="w-8 h-8 text-emerald-300" />;
      case 'social_media':
        return <Megaphone className="w-8 h-8 text-purple-300" />;
    }
  };

  const getFeatureIcons = () => {
    switch (department.id) {
      case 'development':
        return [
          { icon: <Monitor className="w-3.5 h-3.5" />, text: 'Web & Mobile Development' },
          { icon: <Cpu className="w-3.5 h-3.5" />, text: 'Problem Solving' },
          { icon: <Sparkles className="w-3.5 h-3.5" />, text: 'Innovative Projects' },
          { icon: <Award className="w-3.5 h-3.5" />, text: 'Technical Workshops' },
        ];
      case 'design':
        return [
          { icon: <Palette className="w-3.5 h-3.5" />, text: 'Graphic Design' },
          { icon: <Sparkles className="w-3.5 h-3.5" />, text: 'UI/UX Design' },
          { icon: <Flame className="w-3.5 h-3.5" />, text: 'Brand Identity' },
          { icon: <Award className="w-3.5 h-3.5" />, text: 'Creative Content' },
        ];
      case 'events':
        return [
          { icon: <Award className="w-3.5 h-3.5" />, text: 'Workshops & Trainings' },
          { icon: <Sparkles className="w-3.5 h-3.5" />, text: 'Hackathons' },
          { icon: <Users className="w-3.5 h-3.5" />, text: 'Tech Talks' },
          { icon: <Flame className="w-3.5 h-3.5" />, text: 'Community Activities' },
        ];
      case 'social_media':
        return [
          { icon: <Video className="w-3.5 h-3.5" />, text: 'Content Creation' },
          { icon: <Users className="w-3.5 h-3.5" />, text: 'Community Management' },
          { icon: <Sparkles className="w-3.5 h-3.5" />, text: 'Digital Campaigns' },
          { icon: <MessageSquare className="w-3.5 h-3.5" />, text: 'Video & Reels Production' },
        ];
    }
  };

  const getBannerColor = () => {
    switch (department.id) {
      case 'development':
        return {
          bg: '#1d3557',
          border: '#3b82f6',
          btnClass: 'btn-heraldic-dev',
          badgeBg: 'bg-blue-900/20 text-blue-900 border-blue-800/30',
        };
      case 'design':
        return {
          bg: '#4a0e17',
          border: '#dc2626',
          btnClass: 'btn-heraldic-design',
          badgeBg: 'bg-rose-900/20 text-rose-900 border-rose-800/30',
        };
      case 'events':
        return {
          bg: '#0f4c3a',
          border: '#10b981',
          btnClass: 'btn-heraldic-events',
          badgeBg: 'bg-emerald-900/20 text-emerald-900 border-emerald-800/30',
        };
      case 'social_media':
        return {
          bg: '#3c096c',
          border: '#a855f7',
          btnClass: 'btn-heraldic-social',
          badgeBg: 'bg-purple-900/20 text-purple-900 border-purple-800/30',
        };
    }
  };

  const style = getBannerColor();
  const features = getFeatureIcons();

  return (
    <div
      className={`rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Top 50%: Atmospheric Header Illustration & Hanging Banner */}
      <div className="relative h-56 sm:h-64 bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden border-b border-amber-900/40">
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 opacity-30 blur-2xl pointer-events-none"
          style={{ backgroundColor: department.colorHex }}
        />

        {/* Outer Corner Flourishes */}
        <span className="absolute top-2 left-2 text-xs text-amber-400/60 font-serif">✦</span>
        <span className="absolute top-2 right-2 text-xs text-amber-400/60 font-serif">✦</span>

        {/* Hanging House Banner */}
        <div className="relative z-10 w-full max-w-[170px] flex flex-col items-center animate-float">
          {/* Pole */}
          <div className="w-full h-2 rounded-full bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 border border-amber-300/60 shadow-md mb-1 flex items-center justify-between px-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
          </div>

          {/* Banner Body */}
          <div
            className="w-full py-5 px-3 rounded-b-xl border-x-2 border-b-2 shadow-2xl flex flex-col items-center relative"
            style={{
              backgroundColor: style.bg,
              borderColor: style.border,
            }}
          >
            {/* Crest Icon Badge */}
            <div className="w-14 h-14 rounded-xl bg-white/10 border border-amber-300/60 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {getDeptIcon()}
            </div>
            <span className="font-fantasy text-xs font-bold text-amber-100 tracking-widest uppercase">
              {department.name}
            </span>

            {/* Notch */}
            <div
              className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rotate-45 border-r-2 border-b-2 bg-inherit"
              style={{ borderColor: style.border }}
            />
          </div>
        </div>
      </div>

      {/* Bottom 50%: Parchment Body */}
      <div className="parchment-card parchment-flourish p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3 text-center sm:text-left">
          <h3 className="font-fantasy font-extrabold text-xl sm:text-2xl tracking-wider text-amber-950 uppercase">
            {department.name}
          </h3>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-sans min-h-[40px]">
            {department.shortDesc}
          </p>

          {/* Bullet points with circular badges */}
          <div className="space-y-2 pt-2">
            {features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-amber-950 font-medium">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ${style.badgeBg}`}
                >
                  {feat.icon}
                </span>
                <span className="truncate">{feat.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learn More Heraldic Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onLearnMore();
          }}
          className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-fantasy font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${style.btnClass}`}
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
