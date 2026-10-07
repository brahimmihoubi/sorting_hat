import { useState, useEffect } from 'react';
import { ParticipantInfo } from './types';
import { INITIAL_PARTICIPANTS } from './data/initialParticipants';
import { apiService } from './services/api';
import { sounds } from './utils/audio';
import { MagicalBackground } from './components/MagicalBackground';
import { AdminLoginScreen } from './screens/AdminLoginScreen';
import { Screen9AdminDashboard } from './screens/Screen9AdminDashboard';
import {
  DepartmentsApiView,
  QuestionsApiView,
  ScoringRulesApiView,
} from './screens/AdminApiManagementViews';
import { ApiConnectorModal } from './components/ApiConnectorModal';
import { ASSETS } from './assets';
import {
  LayoutDashboard,
  Users,
  Building2,
  HelpCircle,
  Sliders,
  ExternalLink,
  LogOut,
  Shield,
  Sparkles,
  Server,
  UserCheck,
} from 'lucide-react';

type AdminTab = 'dashboard' | 'departments_api' | 'questions_api' | 'scoring_rules_api';

const NAV_ITEMS: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard & Stats', icon: LayoutDashboard },
  { id: 'departments_api', label: 'Departments API', icon: Building2 },
  { id: 'questions_api', label: 'Questions API', icon: HelpCircle },
  { id: 'scoring_rules_api', label: 'Scoring Rules API', icon: Sliders },
];

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(apiService.getToken());
  });
  const [adminName, setAdminName] = useState<string>(
    localStorage.getItem('sdg_admin_name') || 'System Administrator'
  );
  const [adminEmail, setAdminEmail] = useState<string>(
    localStorage.getItem('sdg_admin_email') || 'algeria.data@gmail.com'
  );

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Shared participants store via localStorage
  const [participantsList, setParticipantsList] = useState<ParticipantInfo[]>(() => {
    try {
      const saved = localStorage.getItem('sdg_participants');
      return saved ? JSON.parse(saved) : INITIAL_PARTICIPANTS;
    } catch {
      return INITIAL_PARTICIPANTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sdg_participants', JSON.stringify(participantsList));
    } catch {
      // ignore
    }
  }, [participantsList]);

  const handleLoginSuccess = (name: string, email: string) => {
    setAdminName(name);
    setAdminEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    sounds.playClick();
    await apiService.adminLogout();
    setIsAuthenticated(false);
  };

  const handleAddParticipant = (newP: ParticipantInfo) => {
    setParticipantsList((prev) => [newP, ...prev]);
  };

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08090d] text-[#e2d9c8] flex relative overflow-hidden selection:bg-amber-600/30 selection:text-amber-200">
        <MagicalBackground />
        <AdminLoginScreen onLoginSuccess={handleLoginSuccess} />
        <ApiConnectorModal
          isOpen={isApiModalOpen}
          onClose={() => setIsApiModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090d] text-[#e2d9c8] flex relative overflow-hidden selection:bg-amber-600/30 selection:text-amber-200">
      <MagicalBackground />

      {/* ── Sidebar ── */}
      <aside
        className={`relative z-20 flex flex-col shrink-0 transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-16' : 'w-64'}
          bg-[#0b0c13]/90 backdrop-blur-xl border-r border-amber-900/30`}
      >
        {/* Brand */}
        <div
          className={`flex items-center gap-3 px-4 py-5 border-b border-amber-900/30 ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}
        >
          <div className="relative shrink-0 w-9 h-9 flex items-center justify-center p-1 rounded-lg bg-gradient-to-b from-[#fde68a] via-[#f5b027] to-[#d97706] border border-[#ffe899] shadow-[0_0_14px_rgba(245,175,40,0.45)]">
            <img src={ASSETS.logo} alt="SDG" className="w-full h-full object-contain" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <div className="font-fantasy text-sm font-bold text-amber-200 leading-tight tracking-wide">
                SDG Admin Portal
              </div>
              <div className="text-[10px] text-amber-400/60 font-mono tracking-widest uppercase">
                FastAPI Connected
              </div>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2.5 py-4 space-y-1.5">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(id);
                }}
                title={sidebarCollapsed ? label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group
                  ${active
                    ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.15)] font-bold'
                    : 'text-amber-200/60 hover:bg-amber-950/40 hover:text-amber-200 border border-transparent'
                  }
                  ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-amber-400' : 'text-amber-500/60 group-hover:text-amber-400'}`} />
                {!sidebarCollapsed && <span>{label}</span>}
                {active && !sidebarCollapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-2.5 py-4 border-t border-amber-900/30 space-y-1.5">
          {/* Public Site Link */}
          <a
            href="/"
            onClick={() => sounds.playClick()}
            title={sidebarCollapsed ? 'View Public Site' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-amber-300/60 hover:text-amber-300 hover:bg-amber-950/30 border border-transparent transition-all
              ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            {!sidebarCollapsed && <span>Public Site</span>}
          </a>

          {/* Admin badge */}
          <div
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/80 border border-amber-500/20
              ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            {!sidebarCollapsed && (
              <div className="text-left min-w-0 flex-1">
                <div className="text-[11px] font-bold text-amber-100 truncate">{adminName}</div>
                <div className="text-[9px] text-amber-400/60 font-mono truncate">{adminEmail}</div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title={sidebarCollapsed ? 'Log Out' : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-300/80 hover:text-rose-200 hover:bg-rose-950/40 border border-rose-500/20 transition-all cursor-pointer
              ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            {!sidebarCollapsed && <span className="font-semibold">Log Out</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed((p) => !p)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#0d0e15] border border-amber-700/50 flex items-center justify-center text-amber-400 hover:text-amber-200 hover:border-amber-500 transition-all shadow-md z-30"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className="text-[10px] font-bold leading-none">{sidebarCollapsed ? '›' : '‹'}</span>
        </button>
      </aside>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top header bar */}
        <header className="sticky top-0 z-20 h-14 flex items-center justify-between px-6 bg-[#08090d]/90 backdrop-blur-md border-b border-amber-900/30">
          <div className="flex items-center gap-2 text-xs text-amber-400/70 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-200 font-semibold capitalize">
              {activeTab.replace('_', ' ')}
            </span>
            <span className="text-amber-600">/</span>
            <span className="text-slate-400">Authenticated ({adminEmail})</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => {
                sounds.playClick();
                setIsApiModalOpen(true);
              }}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(16,185,129,0.15)] cursor-pointer"
            >
              <Server className="w-3.5 h-3.5" />
              <span>FastAPI 8000</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/30 text-rose-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </header>

        {/* Screen content */}
        <main className="flex-1">
          {activeTab === 'dashboard' && (
            <Screen9AdminDashboard
              participants={participantsList}
              onNavigate={(screen) => {
                if (screen !== 'admin_dashboard') {
                  window.location.href = '/';
                }
              }}
              onAddParticipant={handleAddParticipant}
            />
          )}

          {activeTab === 'departments_api' && <DepartmentsApiView />}

          {activeTab === 'questions_api' && <QuestionsApiView />}

          {activeTab === 'scoring_rules_api' && <ScoringRulesApiView />}
        </main>
      </div>

      <ApiConnectorModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
      />
    </div>
  );
}
