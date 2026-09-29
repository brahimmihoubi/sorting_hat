import { useState, FC } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../assets';
import { sounds } from '../utils/audio';
import { Volume2, VolumeX, Music, MonitorPlay } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenJoinModal?: () => void;
}

export const Navbar: FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenJoinModal,
}) => {
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);

  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    sounds.enabled = newState;
    if (newState) {
      sounds.playChime(640);
    } else {
      sounds.pauseThemeMusic();
      setMusicOn(false);
    }
  };

  const toggleMusic = () => {
    const isPlaying = sounds.toggleThemeMusic();
    setMusicOn(isPlaying);
  };

  const navLinks: { label: string; screen: ScreenId; highlight?: boolean }[] = [
    { label: 'Home', screen: 'landing' },
    { label: 'Departments', screen: 'departments_overview' },
    { label: 'Sorting Hat', screen: 'welcome', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#090a0f]/85 border-b border-amber-900/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            sounds.playClick();
            onNavigate('landing');
          }}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          {/* Flame Crest */}
                     <img src={ASSETS.logo} alt="SDG Sorting Hat" className="w-8 h-8 mr-2" />
          <div>
            <div className="font-fantasy text-xl font-bold tracking-wider text-amber-200 group-hover:text-amber-100 transition-colors flex items-center gap-1.5">
              SDG
              <span className="text-xs px-1.5 py-0.5 rounded text-amber-300 bg-amber-950/60 border border-amber-500/30 font-sans font-medium tracking-normal">
                Sorting Hat
              </span>
            </div>
            <div className="text-[10px] tracking-widest uppercase text-amber-400/60 font-sans font-medium">
              Setif Developers Group
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((item) => {
            const isActive =
              currentScreen === item.screen ||
              (item.screen === 'welcome' &&
                ['welcome', 'personal_info', 'questionnaire', 'sorting_animation', 'sorting_result'].includes(
                  currentScreen
                ));

            return (
              <button
                key={item.label}
                onClick={() => {
                  sounds.playClick();
                  onNavigate(item.screen);
                }}
                className={`relative py-1.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-amber-300 font-semibold'
                    : 'text-amber-100/70 hover:text-amber-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full" />
                )}
              </button>
            );
          })}

          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('event_mode');
            }}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors"
            title="Open Large Projector Event Mode"
          >
            <MonitorPlay className="w-3.5 h-3.5 text-amber-400" />
            <span>Event Mode</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Music Toggle */}
          <button
            onClick={toggleMusic}
            aria-label={musicOn ? 'Pause Hedwig Theme' : 'Play Hedwig Theme'}
            className={`h-9 px-3.5 rounded-full border flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              musicOn
                ? 'bg-gradient-to-r from-amber-500/30 via-yellow-400/25 to-amber-600/30 border-amber-300 text-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.6)] animate-pulse'
                : 'bg-slate-950/80 border-amber-500/40 text-amber-300/90 hover:text-amber-100 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.35)]'
            }`}
            title={musicOn ? 'Pause Harry Potter Theme' : 'Play Harry Potter Theme (Hedwig’s Song)'}
          >
            <Music className={`w-3.5 h-3.5 ${musicOn ? 'text-amber-200' : 'text-amber-400'}`} />
            <span className="hidden sm:inline font-serif">{musicOn ? 'Theme Playing ♪' : 'Hedwig Theme'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            className="w-9 h-9 rounded-full bg-slate-900/80 border border-amber-900/40 flex items-center justify-center text-amber-300/80 hover:text-amber-200 hover:border-amber-600/60 transition-colors"
            title={soundOn ? 'Sound FX On' : 'Sound FX Muted'}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Join SDG CTA */}
          <button
            onClick={() => {
              sounds.playChime(700);
              if (onOpenJoinModal) {
                onOpenJoinModal();
              } else {
                onNavigate('welcome');
              }
            }}
            className="relative group overflow-hidden px-4.5 py-2 rounded-lg bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.25)] border border-amber-300/30 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
          >
            <span>Join SDG</span>
            <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </header>
  );
};
