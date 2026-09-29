import { FC, useState } from 'react';
import { ParticipantInfo, ScreenId } from '../types';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle,
  Clock,
  ArrowRight,
  Code,
  Calendar,
  BookOpen,
  Download,
  Share2,
  Edit3,
} from 'lucide-react';

interface Screen10MemberProfileProps {
  participant: ParticipantInfo;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen10MemberProfile: FC<Screen10MemberProfileProps> = ({
  participant,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<
    'result' | 'answers' | 'department' | 'activities' | 'certificates'
  >('result');
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header Card (Matching Screenshot 10) */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#0d0f1b] via-[#121526] to-[#0a0c16] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={ASSETS.avatarBrahim}
                alt={participant.fullName}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold text-white border border-blue-300">
                Sorted
              </span>
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold font-fantasy text-amber-100">
                {participant.fullName || 'Brahim Mihoubi'}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-amber-200/80">
                <span className="flex items-center gap-1 font-mono">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  {participant.email || 'brahim.m@univ-setif.dz'}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  {participant.faculty || 'Computer Science Department'}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-mono">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  {participant.studyYear || 'Master 1'}
                </span>
              </div>
            </div>
          </div>

          {/* Quote Block */}
          <div className="text-right hidden lg:block border-l border-amber-900/40 pl-6 max-w-xs">
            <p className="font-fantasy text-amber-200 text-sm italic">
              &ldquo;Different skills. One community. A greater impact.&rdquo;
            </p>
            <span className="text-[11px] text-amber-400/60 font-mono mt-1 block">
              Setif Developers Group
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Matching Screenshot 10) */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-amber-900/30 pb-1 scrollbar-none">
        {[
          { id: 'result', label: 'My Result', icon: Sparkles },
          { id: 'answers', label: 'My Answers', icon: BookOpen },
          { id: 'department', label: 'Department Info', icon: Building2 },
          { id: 'activities', label: 'Activities', icon: Calendar },
          { id: 'certificates', label: 'Certificates', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                  : 'text-amber-100/60 hover:text-amber-200 hover:bg-slate-900/50'
              }`}
            >
              <Icon className="w-4 h-4 text-amber-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: My Result */}
      {activeTab === 'result' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Sorting Highlight Card (lg:col-span-8) (Matching Image 4) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="parchment-card parchment-flourish rounded-2xl p-6 sm:p-8 border border-amber-900/40 shadow-2xl relative overflow-hidden text-amber-950">
              <div className="text-center space-y-2 mb-6">
                <span className="text-xs font-fantasy tracking-widest uppercase text-amber-900 font-bold">
                  ✦ YOU HAVE BEEN SORTED INTO ✦
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-fantasy text-amber-950 tracking-wider">
                  DEVELOPMENT
                </h2>
                <p className="text-xs sm:text-sm text-amber-900/85 italic font-serif">
                  &ldquo;Turning ideas into real solutions.&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-amber-900/90 max-w-xl mx-auto pt-2 leading-relaxed font-serif">
                  You showed strong analytical thinking, problem solving skills and a passion for
                  building things. You enjoy turning ideas into real, working solutions and creating
                  impact through technology.
                </p>
              </div>

              {/* Strengths Pills (Matching Image 4) */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 my-6">
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-200/60 border border-amber-900/30 text-amber-950 text-xs font-semibold flex items-center gap-2 shadow-xs">
                  <Code className="w-3.5 h-3.5 text-amber-800" />
                  <span>Problem Solving</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-200/60 border border-amber-900/30 text-amber-950 text-xs font-semibold flex items-center gap-2 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Technical Thinking</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-200/60 border border-amber-900/30 text-amber-950 text-xs font-semibold flex items-center gap-2 shadow-xs">
                  <Award className="w-3.5 h-3.5 text-amber-800" />
                  <span>Creativity</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-200/60 border border-amber-900/30 text-amber-950 text-xs font-semibold flex items-center gap-2 shadow-xs">
                  <User className="w-3.5 h-3.5 text-amber-800" />
                  <span>Team Collaboration</span>
                </span>
              </div>

              {/* Department Opportunities Grid (Matching Screenshot 10) */}
              <div className="pt-6 border-t border-amber-900/30">
                <h4 className="font-fantasy font-bold text-xs uppercase tracking-wider text-amber-300 mb-3">
                  Department Opportunities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-blue-500/20 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
                      <Code className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-amber-100">Real Projects</div>
                      <div className="text-[11px] text-amber-200/60 mt-0.5">
                        Work on web & mobile applications
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-blue-500/20 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-amber-100">Technical Workshops</div>
                      <div className="text-[11px] text-amber-200/60 mt-0.5">
                        Learn and improve your skills
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-blue-500/20 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-amber-100">Community Collaboration</div>
                      <div className="text-[11px] text-amber-200/60 mt-0.5">
                        Build solutions with talented developers
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-blue-500/20 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-amber-100">Innovation & Impact</div>
                      <div className="text-[11px] text-amber-200/60 mt-0.5">
                        Contribute to meaningful tech projects
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Your Journey Timeline & Next Steps (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Your Journey Timeline */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-4 shadow-xl">
              <h3 className="font-fantasy font-bold text-sm text-amber-200">
                Your Journey
              </h3>

              <div className="space-y-4 relative">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-100">Profile Completed</div>
                    <div className="text-[10px] text-slate-400 font-mono">Sep 27, 2026 · 14:32</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-100">Questionnaire Completed</div>
                    <div className="text-[10px] text-slate-400 font-mono">Sep 27, 2026 · 14:40</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-[0_0_10px_#f59e0b]">
                    3
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-300">Sorted into Development</div>
                    <div className="text-[10px] text-amber-400/70 font-mono">Sep 27, 2026 · 14:41</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-60">
                  <div className="w-6 h-6 rounded-full border border-slate-700 bg-slate-900 text-slate-500 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-300">Joined SDG Fellowship</div>
                    <div className="text-[10px] text-slate-500">Welcome Day Induction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps Checklist */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-3 shadow-xl">
              <h3 className="font-fantasy font-bold text-sm text-amber-200">
                Next Steps
              </h3>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onNavigate('department_detail');
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-left border border-amber-900/20 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-amber-100 group-hover:text-amber-300">
                      Join Development Discord
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Participate in activities and team sprint
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onNavigate('event_mode');
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-left border border-amber-900/20 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-amber-100 group-hover:text-amber-300">
                      Upcoming Welcome Day
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Attend the live ceremony presentations
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    sounds.playChime(620);
                    setActiveTab('certificates');
                  }}
                  className="w-full p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-left border border-amber-500/30 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-amber-300">
                      Get Official Certificate
                    </div>
                    <div className="text-[10px] text-amber-200/60">
                      Download high-resolution sorting parchment
                    </div>
                  </div>
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Certificates */}
      {activeTab === 'certificates' && (
        <div className="p-8 rounded-2xl bg-gradient-to-b from-[#131525] to-[#090b12] border border-amber-500/40 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto parchment-card p-8 rounded-2xl border-4 border-amber-900/40 shadow-2xl space-y-4 text-amber-950">
            <div className="text-xs font-fantasy tracking-widest uppercase font-bold text-amber-900">
              SETIF DEVELOPERS GROUP · OFFICIAL ACCREDITATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-fantasy font-bold tracking-tight">
              Certificate of Department Sorting
            </h2>
            <p className="text-xs sm:text-sm font-serif italic">
              This hereby certifies that
            </p>
            <div className="text-xl sm:text-2xl font-fantasy font-bold text-amber-900 underline decoration-amber-600 decoration-2">
              {participant.fullName || 'Brahim Mihoubi'}
            </div>
            <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              has completed the official SDG Sorting Hat evaluation and has been solemnly designated
              into the <strong>Development Department</strong> for the 2026/2027 academic session.
            </p>

            <div className="pt-4 flex items-center justify-between border-t border-amber-900/30 text-xs font-mono">
              <div>Date: Sep 28, 2026</div>
              <div className="font-fantasy font-bold text-amber-900">SDG Sorting Council</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                sounds.playChime(600);
                window.print();
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Print / Download Certificate</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab: My Answers */}
      {activeTab === 'answers' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-4">
          <h3 className="font-fantasy font-bold text-base text-amber-200">
            Your Recorded Responses
          </h3>
          <p className="text-xs text-amber-200/60">
            Below are your answers from the 8-stage questionnaire.
          </p>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-900/30">
              <span className="text-amber-400 font-semibold">Q1: Activity Preference</span>
              <div className="text-amber-100 font-bold mt-1">Build an application (Turn ideas into real solutions)</div>
              <span className="text-[10px] text-emerald-400 font-mono">+10 Development points</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-900/30">
              <span className="text-amber-400 font-semibold">Q2: Problem Attraction</span>
              <div className="text-amber-100 font-bold mt-1">Technical systems, complex logic and algorithms</div>
              <span className="text-[10px] text-emerald-400 font-mono">+10 Development points</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-900/30">
              <span className="text-amber-400 font-semibold">Q3: Project Motivation</span>
              <div className="text-amber-100 font-bold mt-1">Practical high-impact results with functioning code</div>
              <span className="text-[10px] text-emerald-400 font-mono">+10 Development points</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
