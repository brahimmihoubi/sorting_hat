import { useState, FC } from 'react';
import { ScreenId } from '../types';
import { sounds } from '../utils/audio';
import {
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Smartphone,
  Sparkles,
} from 'lucide-react';

interface ScreenSwitcherBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

export const SCREEN_CONFIG: {
  id: ScreenId;
  num: string;
  name: string;
  category: 'Ceremony Wizard' | 'Information' | 'Platform & Ops';
}[] = [
  { id: 'landing', num: '1/12', name: 'Landing / Home', category: 'Information' },
  { id: 'welcome', num: '2/12', name: 'Welcome & Instructions', category: 'Ceremony Wizard' },
  { id: 'personal_info', num: '3/12', name: 'Personal Information', category: 'Ceremony Wizard' },
  { id: 'questionnaire', num: '4/12', name: 'Questionnaire (8 Qs)', category: 'Ceremony Wizard' },
  { id: 'sorting_animation', num: '5/12', name: 'Sorting Hat Animation', category: 'Ceremony Wizard' },
  { id: 'sorting_result', num: '6/12', name: 'Sorting Hat Result', category: 'Ceremony Wizard' },
  { id: 'departments_overview', num: '7/12', name: 'Departments Overview', category: 'Information' },
  { id: 'department_detail', num: '8/12', name: 'Department Detail', category: 'Information' },
  { id: 'admin_dashboard', num: '9/12', name: 'Admin Dashboard', category: 'Platform & Ops' },
  { id: 'member_profile', num: '10/12', name: 'Member Profile', category: 'Platform & Ops' },
  { id: 'event_mode', num: '11/12', name: 'Event Mode (Projector)', category: 'Platform & Ops' },
  { id: 'mobile_flow', num: '12/12', name: 'Mobile Flow Experience', category: 'Platform & Ops' },
];

export const ScreenSwitcherBar: FC<ScreenSwitcherBarProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentItem = SCREEN_CONFIG.find((s) => s.id === currentScreen) || SCREEN_CONFIG[0];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Expanded Grid Panel */}
      {isOpen && (
        <div className="mb-2 p-3 bg-[#0d0e15]/95 border border-amber-500/40 rounded-xl shadow-2xl backdrop-blur-xl w-[320px] sm:w-[380px] max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-900/30">
            <div className="flex items-center gap-2 text-xs font-fantasy tracking-wider text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>12 SDG SCREENS DIRECTORY</span>
            </div>
            <span className="text-[11px] text-amber-400/60 font-mono">
              SRS v1.0 Compliant
            </span>
          </div>

          <div className="space-y-1">
            {SCREEN_CONFIG.map((item) => {
              const active = item.id === currentScreen;
              const isAdminItem = item.id === 'admin_dashboard';
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sounds.playClick();
                    if (isAdminItem) {
                      window.location.href = '/admin';
                      return;
                    }
                    onSelectScreen(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-all ${
                    active
                      ? 'bg-amber-600/25 border border-amber-400/60 text-amber-100 font-semibold'
                      : isAdminItem
                      ? 'hover:bg-rose-950/40 text-rose-300/60 hover:text-rose-200 border border-transparent'
                      : 'hover:bg-amber-950/40 text-amber-200/70 hover:text-amber-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                        active
                          ? 'bg-amber-500 text-black font-bold'
                          : 'bg-black/50 text-amber-400/70'
                      }`}
                    >
                      {item.num}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </div>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                  )}
                  {isAdminItem && !active && (
                    <ExternalLink className="w-3 h-3 text-rose-400/60 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-amber-900/30 flex items-center justify-between text-[10px] text-amber-400/50">
            <span>Click any screen to jump</span>
            <span>Setif Developers Group</span>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => {
          sounds.playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#12141f]/95 hover:bg-[#1a1c2b] text-amber-200 border border-amber-500/50 shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all active:scale-95 group"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-mono text-xs font-bold text-amber-400">
          {currentItem.num}
        </span>
        <span className="text-xs font-medium text-amber-100 max-w-[140px] truncate sm:max-w-none">
          {currentItem.name}
        </span>
        <span className="text-amber-400/70 group-hover:text-amber-300">
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </span>
      </button>
    </div>
  );
};
