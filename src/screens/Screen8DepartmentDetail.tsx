import { FC, useState } from 'react';
import { DepartmentId, ScreenId } from '../types';
import { DEPARTMENTS } from '../data/departments';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import {
  Code,
  Palette,
  Calendar,
  Megaphone,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Wrench,
  FolderGit2,
  Target,
  Users2,
  Check,
} from 'lucide-react';

interface Screen8DepartmentDetailProps {
  departmentId: DepartmentId;
  onBack: () => void;
  onApply: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen8DepartmentDetail: FC<Screen8DepartmentDetailProps> = ({
  departmentId,
  onBack,
  onApply,
  onNavigate,
}) => {
  const [applied, setApplied] = useState(false);
  const dept = DEPARTMENTS[departmentId] || DEPARTMENTS.development;

  const handleApply = () => {
    sounds.playChime(700);
    setApplied(true);
    setTimeout(() => {
      onApply();
    }, 1200);
  };

  const getDeptIcon = () => {
    switch (departmentId) {
      case 'development':
        return <Code className="w-8 h-8" />;
      case 'design':
        return <Palette className="w-8 h-8" />;
      case 'events':
        return <Calendar className="w-8 h-8" />;
      case 'social_media':
        return <Megaphone className="w-8 h-8" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb */}
      <button
        onClick={() => {
          sounds.playClick();
          onBack();
        }}
        className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Departments</span>
      </button>

      {/* Hero Banner Header (Matching Screenshot 8) */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#0d101a] via-[#121626] to-[#0c0f18] p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg border border-amber-400/50"
            style={{ backgroundColor: dept.colorHex }}
          >
            {getDeptIcon()}
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold font-fantasy text-amber-100">
              {dept.name} Department
            </h1>
            <p className="text-sm text-amber-300/80 font-serif italic mt-0.5">
              &ldquo;{dept.tagline}&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-amber-100/70 max-w-2xl mt-2 leading-relaxed">
              {dept.fullDesc}
            </p>

            {/* Keyword badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                &lt;/&gt; Build
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                💡 Innovate
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                🤝 Collaborate
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                ⚡ Solve Problems
              </span>
            </div>
          </div>
        </div>

        {/* Big Department Crest / Workspace Artwork */}
        <div className="w-full md:w-64 h-36 rounded-xl overflow-hidden border border-amber-500/20 shadow-md shrink-0 relative">
          <img
            src={ASSETS.workspaces}
            alt={`${dept.name} Workspace Preview`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-[10px] font-mono text-amber-300">
              SDG {dept.name.toUpperCase()} LAB
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid: Activities, Skills, Tech, Projects, Mission (Matching Screenshot 8) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Main Activities (md:col-span-5) */}
        <div className="md:col-span-5 parchment-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-amber-900/20">
              <Target className="w-5 h-5 text-amber-800" />
              <h3 className="font-fantasy font-bold text-lg text-amber-950">
                Main Activities
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-amber-950/90 font-medium">
              {dept.activities.map((act, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-900/20 text-xs text-amber-900/70 italic">
            Activities happen weekly at the SDG Tech Hub and online Discord community.
          </div>
        </div>

        {/* Center Column: Key Skills & Tools (md:col-span-4) */}
        <div className="md:col-span-4 space-y-6">
          {/* Key Skills */}
          <div className="parchment-card p-5">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-900/20">
              <Sparkles className="w-4 h-4 text-amber-800" />
              <h3 className="font-fantasy font-bold text-base text-amber-950">
                Key Skills
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {dept.keySkills.map((sk) => (
                <span
                  key={sk}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-100/90 border border-amber-900/20 text-[11px] font-semibold text-amber-950 text-center"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="parchment-card p-5">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-900/20">
              <Wrench className="w-4 h-4 text-amber-800" />
              <h3 className="font-fantasy font-bold text-base text-amber-950">
                Tools & Technologies
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {dept.tools.map((t) => (
                <div
                  key={t.name}
                  className="p-2 rounded-lg bg-amber-100/70 border border-amber-900/15 flex flex-col items-center justify-center hover:bg-amber-100 transition-colors"
                >
                  <span className="text-[10px] font-bold text-amber-950 truncate w-full">
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Real Projects & CTA (md:col-span-3) */}
        <div className="md:col-span-3 space-y-6">
          {/* Real Projects */}
          <div className="parchment-card p-5">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-900/20">
              <FolderGit2 className="w-4 h-4 text-amber-800" />
              <h3 className="font-fantasy font-bold text-base text-amber-950">
                Real Projects
              </h3>
            </div>
            <div className="space-y-3">
              {dept.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3 rounded-lg bg-amber-100/80 border border-amber-900/20 hover:bg-amber-100 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-amber-950 group-hover:text-amber-800">
                      {proj.name}
                    </span>
                    <ArrowRight className="w-3 h-3 text-amber-700 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-[11px] text-amber-900/80 mt-1 leading-snug">
                    {proj.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ready to start CTA box */}
          <div className="rounded-2xl p-5 border border-amber-500/40 bg-gradient-to-b from-[#131626] to-[#0a0c14] text-center space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Users2 className="w-5 h-5" />
            </div>
            <h4 className="font-fantasy font-bold text-sm text-amber-100">
              Ready to start your journey?
            </h4>
            <p className="text-xs text-amber-200/70 leading-snug">
              Join the {dept.name} Department and turn your ideas into real solutions.
            </p>

            <button
              onClick={handleApply}
              disabled={applied}
              className={`btn-notch-primary w-full py-2.5 px-4 text-xs flex items-center justify-center gap-2 ${
                applied ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {applied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Application Sent!</span>
                </>
              ) : (
                <>
                  <span>Apply to Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Who Can Join? & Mission (Matching Screenshot 8) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Who Can Join? */}
        <div className="p-5 rounded-2xl bg-[#0d101c]/80 border border-amber-900/30 space-y-2">
          <h4 className="font-fantasy font-bold text-sm text-amber-300 flex items-center gap-2">
            <Users2 className="w-4 h-4 text-amber-400" />
            <span>Who Can Join?</span>
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-100/80">
            {dept.whoCanJoin.map((w, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mission */}
        <div className="p-5 rounded-2xl bg-[#0d101c]/80 border border-amber-900/30 space-y-2">
          <h4 className="font-fantasy font-bold text-sm text-amber-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            <span>Department Mission</span>
          </h4>
          <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
            {dept.mission}
          </p>
        </div>
      </div>
    </div>
  );
};
