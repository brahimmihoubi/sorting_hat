import { FC, useState } from 'react';
import { ScreenId } from '../types';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import {
  Maximize2,
  Minimize2,
  Play,
  QrCode,
  Sparkles,
  Users,
  Award,
  Clock,
  ArrowRight,
  Code,
  Palette,
  Calendar,
  Megaphone,
  X,
} from 'lucide-react';

interface Screen11EventModeProps {
  onStartTest: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen11EventMode: FC<Screen11EventModeProps> = ({
  onStartTest,
  onNavigate,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPresentation, setSelectedPresentation] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showStageCeremonyModal, setShowStageCeremonyModal] = useState(false);
  const [ceremonyStep, setCeremonyStep] = useState<'idle' | 'sorting' | 'revealed'>('idle');
  const [stageParticipant, setStageParticipant] = useState({ name: 'Anis Belhadj', dept: 'development' });

  const toggleFullscreen = () => {
    sounds.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const agenda = [
    { time: '10:00', title: 'Welcome & Introduction', status: 'past' },
    { time: '10:15', title: 'About SDG', status: 'past' },
    { time: '10:30', title: 'Departments Presentation', status: 'current' },
    { time: '11:15', title: 'Live Q&A', status: 'upcoming' },
    { time: '11:45', title: 'Sorting Hat Test', status: 'upcoming' },
    { time: '12:15', title: 'Results & Next Steps', status: 'upcoming' },
  ];

  return (
    <div className="min-h-[calc(100vh-4.5rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Ceremony Control Bar (Matching Screenshot 11) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/30">
        <div>
          <div className="text-xs font-fantasy tracking-widest uppercase text-amber-400 font-bold">
            ✦ SDG WELCOME DAY 2026 · AUDITORIUM STAGE ✦
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-fantasy text-amber-100">
            Welcome to SDG
          </h1>
          <p className="text-xs sm:text-sm text-amber-300/80 italic font-serif mt-0.5">
            &ldquo;Four Departments. Endless Opportunities.&rdquo;
          </p>
        </div>

        {/* Action triggers: Fullscreen, QR Code, Start Presentation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              setShowQrModal(true);
            }}
            className="btn-notch-ghost px-3 py-2 text-xs flex items-center gap-2"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Audience QR</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="btn-notch-ghost px-3 py-2 text-xs flex items-center gap-2"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playChime(650);
              setShowStageCeremonyModal(true);
              setCeremonyStep('idle');
            }}
            className="btn-notch-primary px-5 py-2 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Presentation</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Stage Arena + Right Agenda Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: Grand Stage Arena (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Visual Display Screen */}
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl bg-gradient-to-b from-[#0e111d] to-[#07080d] aspect-16/9 sm:aspect-21/9 flex flex-col justify-end p-6">
            <img
              src={ASSETS.heroHall}
              alt="Welcome Day Ceremony Stage"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-transparent to-[#090b11]/70" />

            {/* Spotlight Beam Effects */}
            <div className="absolute top-0 left-1/4 w-32 h-full bg-blue-500/10 rotate-12 blur-2xl pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-32 h-full bg-purple-500/10 -rotate-12 blur-2xl pointer-events-none" />

            {/* Over-stage Live Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-950/80 border border-red-500/40 px-3 py-1 rounded-full text-red-200 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>LIVE CEREMONY</span>
            </div>

            {/* Center Caption */}
            <div className="relative z-10 text-center space-y-2">
              <div className="text-xl sm:text-3xl font-extrabold font-fantasy text-amber-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                The Sorting Hat Awakens
              </div>
              <p className="text-xs sm:text-sm text-amber-200/80 max-w-lg mx-auto">
                Scan the auditorium QR code or tap below to discover your department live on the
                big screen!
              </p>
            </div>
          </div>

          {/* 4 Department Watch Presentation Cards (Matching Screenshot 11) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Development */}
            <div className="p-4 rounded-2xl bg-[#0b0e1a] border border-blue-500/40 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase font-fantasy">
                  <Code className="w-4 h-4" />
                  <span>Development</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Build, develop and turn ideas into real solutions.
                </p>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setSelectedPresentation('Development');
                }}
                className="btn-notch-ghost w-full py-1.5 px-2 text-xs flex items-center justify-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Presentation</span>
              </button>
            </div>

            {/* Design */}
            <div className="p-4 rounded-2xl bg-[#140a0e] border border-rose-500/40 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase font-fantasy">
                  <Palette className="w-4 h-4" />
                  <span>Design</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Create beautiful visuals and meaningful experiences.
                </p>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setSelectedPresentation('Design');
                }}
                className="btn-notch-ghost w-full py-1.5 px-2 text-xs flex items-center justify-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Presentation</span>
              </button>
            </div>

            {/* Events */}
            <div className="p-4 rounded-2xl bg-[#08130f] border border-emerald-500/40 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-fantasy">
                  <Calendar className="w-4 h-4" />
                  <span>Events</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Organize, plan and bring people together.
                </p>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setSelectedPresentation('Events');
                }}
                className="btn-notch-ghost w-full py-1.5 px-2 text-xs flex items-center justify-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Presentation</span>
              </button>
            </div>

            {/* Social Media */}
            <div className="p-4 rounded-2xl bg-[#120a1c] border border-purple-500/40 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase font-fantasy">
                  <Megaphone className="w-4 h-4" />
                  <span>Social Media</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Share ideas, create content and grow community.
                </p>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setSelectedPresentation('Social Media');
                }}
                className="btn-notch-ghost w-full py-1.5 px-2 text-xs flex items-center justify-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Presentation</span>
              </button>
            </div>
          </div>

          {/* Large Center CTA */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                sounds.playChime(700);
                onStartTest();
              }}
              className="btn-notch-primary px-10 py-4 text-base sm:text-lg inline-flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start the Sorting Hat Test</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="text-xs text-amber-300/70 mt-3 font-sans">
              Find your place in SDG and start your journey today.
            </div>
          </div>
        </div>

        {/* Right Column: Event Agenda & Live Metrics (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Event Agenda Timeline (Matching Screenshot 11) */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-300 font-fantasy font-bold text-sm">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Event Agenda</span>
            </div>

            <div className="space-y-3 relative">
              {agenda.map((item, idx) => {
                const isCurrent = item.status === 'current';
                const isPast = item.status === 'past';

                return (
                  <div key={idx} className="flex items-center gap-3.5">
                    <span
                      className={`font-mono text-xs w-12 font-semibold ${
                        isCurrent
                          ? 'text-amber-400 font-bold'
                          : isPast
                          ? 'text-slate-400'
                          : 'text-slate-500'
                      }`}
                    >
                      {item.time}
                    </span>

                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        isCurrent
                          ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-ping'
                          : isPast
                          ? 'bg-emerald-500'
                          : 'bg-slate-700'
                      }`}
                    />

                    <span
                      className={`text-xs ${
                        isCurrent
                          ? 'text-amber-200 font-bold'
                          : isPast
                          ? 'text-slate-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Stage Stats (Matching Screenshot 11) */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-3.5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-amber-100">248</div>
                <div className="text-[11px] text-amber-200/60">Total Participants</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-amber-100">4</div>
                <div className="text-[11px] text-amber-200/60">Departments</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-amber-100">100%</div>
                <div className="text-[11px] text-amber-200/60">Unique Opportunities</div>
              </div>
            </div>
          </div>

          {/* SDG Quote Box */}
          <div className="p-5 rounded-2xl bg-[#0c0e18] border border-amber-900/30">
            <p className="text-xs sm:text-sm font-fantasy text-amber-200 italic leading-relaxed">
              &ldquo;Different skills. One community. A greater impact.&rdquo;
            </p>
            <span className="text-[11px] text-amber-400/60 font-mono mt-2 block">
              — SDG Setif Developers Group
            </span>
          </div>
        </div>
      </div>

      {/* Auditorium QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="max-w-md w-full parchment-card rounded-2xl p-6 sm:p-8 text-center text-amber-950 space-y-4 border-2 border-amber-800 shadow-2xl relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1 text-amber-900 hover:text-amber-950"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs font-fantasy font-bold tracking-widest uppercase">
              SCAN TO TAKE TEST
            </div>
            <h3 className="text-2xl font-bold font-fantasy">Welcome Day Mobile Portal</h3>
            <p className="text-xs text-amber-900/80">
              Point your phone camera at this code to open the Sorting Hat questionnaire right now!
            </p>
            {/* Stylized QR Code Frame */}
            <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-4 border-amber-900/40 shadow-inner flex items-center justify-center">
              <QrCode className="w-36 h-36 text-slate-900" />
            </div>
            <div className="text-[11px] font-mono text-amber-900/60">
              https://sdg-sorting-hat.univ-setif.dz
            </div>
          </div>
        </div>
      )}

      {/* Video Presentation Preview Modal */}
      {selectedPresentation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="max-w-xl w-full bg-[#0d101a] rounded-2xl border border-amber-500/40 p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedPresentation(null)}
              className="absolute top-4 right-4 text-amber-400 hover:text-amber-200"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-fantasy text-xl font-bold text-amber-200">
              {selectedPresentation} Department Showcase
            </h3>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-amber-500/30 relative">
              <img
                src={ASSETS.workspaces}
                alt="Presentation demo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>
            </div>
            <p className="text-xs text-amber-100/70 leading-relaxed">
              Explore the mission, leadership team, and ongoing flagship projects of the{' '}
              {selectedPresentation} Department.
            </p>
          </div>
        </div>
      )}

      {/* Live Stage Ceremony Auditorium Presentation Modal */}
      {showStageCeremonyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in">
          <div className="max-w-4xl w-full rounded-3xl border-2 border-amber-500/60 bg-gradient-to-b from-[#0b0d18] via-[#101322] to-[#080911] p-6 sm:p-10 space-y-6 shadow-[0_0_80px_rgba(245,158,11,0.3)] relative text-center">
            <button
              onClick={() => setShowStageCeremonyModal(false)}
              className="absolute top-4 right-4 p-2 text-amber-400 hover:text-amber-100 rounded-full bg-slate-900 border border-amber-500/40 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-xs font-fantasy font-bold tracking-widest text-amber-400 uppercase">
              ✦ SDG WELCOME DAY 2026 · LIVE AUDITORIUM CEREMONY ✦
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-fantasy text-amber-100">
              {ceremonyStep === 'idle'
                ? `Sorting Candidate: ${stageParticipant.name}`
                : ceremonyStep === 'sorting'
                ? 'The Hat is Deliberating Destiny...'
                : `${stageParticipant.name} is Sorted into ${stageParticipant.dept.toUpperCase()}!`}
            </h2>

            <div className="w-24 h-0.5 bg-amber-500/40 mx-auto" />

            {/* Central Hat Visualizer */}
            <div className="relative mx-auto w-48 sm:w-60 h-48 sm:h-60 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/40 animate-[spin_6s_linear_infinite]" />
              <img
                src={ASSETS.hatCloseup}
                alt="Enchanted Sorting Hat"
                className="w-40 sm:w-48 h-40 sm:h-48 object-cover rounded-full border-2 border-amber-500/70 shadow-[0_0_40px_rgba(245,158,11,0.5)]"
              />
              <div className="absolute -bottom-2 bg-amber-950/95 border border-amber-400/60 px-4 py-1 rounded-full text-amber-200 text-xs font-fantasy shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin inline mr-1" />
                <span>Stage Ceremony Mode</span>
              </div>
            </div>

            {/* Controls */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              {ceremonyStep === 'idle' && (
                <button
                  onClick={() => {
                    sounds.playSortingResonance();
                    setCeremonyStep('sorting');
                    setTimeout(() => {
                      sounds.playHatRumble();
                    }, 1800);
                    setTimeout(() => {
                      sounds.playDepartmentReveal(stageParticipant.dept);
                      setCeremonyStep('revealed');
                    }, 3000);
                  }}
                  className="btn-notch-primary px-8 py-3 text-sm sm:text-base flex items-center gap-2 cursor-pointer shadow-xl"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Live Sorting Ritual</span>
                </button>
              )}

              {ceremonyStep === 'sorting' && (
                <div className="text-amber-300 font-mono text-sm animate-pulse flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Analyzing energy & matching house portal...</span>
                </div>
              )}

              {ceremonyStep === 'revealed' && (
                <div className="space-y-4">
                  <div className="text-xl sm:text-2xl font-bold font-fantasy text-amber-200">
                    Welcome to the {stageParticipant.dept.replace('_', ' ').toUpperCase()} Department!
                  </div>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      const names = ['Lina Benseghir', 'Farid Belhadj', 'Yacine Amrani', 'Amira Zineddine'];
                      const depts: ('development' | 'design' | 'events' | 'social_media')[] = [
                        'development',
                        'design',
                        'events',
                        'social_media',
                      ];
                      setStageParticipant({
                        name: names[Math.floor(Math.random() * names.length)],
                        dept: depts[Math.floor(Math.random() * depts.length)],
                      });
                      setCeremonyStep('idle');
                    }}
                    className="btn-notch-ghost px-6 py-2 text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Sort Next Candidate</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
