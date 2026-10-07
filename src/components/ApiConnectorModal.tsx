import { useState, useEffect, FC } from 'react';
import { apiService, HealthCheckResponse } from '../services/api';
import { sounds } from '../utils/audio';
import {
  Server,
  Activity,
  CheckCircle2,
  XCircle,
  RefreshCw,
  KeyRound,
  Database,
  Terminal,
  ExternalLink,
  Lock,
  Globe,
  Check,
  AlertTriangle,
  Code2,
} from 'lucide-react';

interface ApiConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiConnectorModal: FC<ApiConnectorModalProps> = ({ isOpen, onClose }) => {
  const [apiUrl, setApiUrl] = useState(apiService.getBaseUrl());
  const [status, setStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);

  // Admin login credentials test
  const [email, setEmail] = useState('admin@sdg.dz');
  const [password, setPassword] = useState('admin123');
  const [loginStatus, setLoginStatus] = useState<'idle' | 'authenticating' | 'authenticated' | 'error'>('idle');
  const [adminToken, setAdminToken] = useState<string | null>(apiService.getToken());
  const [adminInfo, setAdminInfo] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      handleTestConnection();
    }
  }, [isOpen]);

  const handleTestConnection = async () => {
    sounds.playClick();
    setStatus('testing');
    setErrorMessage(null);
    const start = performance.now();

    try {
      apiService.setBaseUrl(apiUrl);
      const data = await apiService.checkHealth();
      const end = performance.now();
      setLatency(Math.round(end - start));
      setHealthData(data);
      setStatus('connected');
      sounds.playChime(700);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to connect to FastAPI backend at ' + apiUrl);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setLoginStatus('authenticating');
    setErrorMessage(null);

    try {
      const res = await apiService.adminLogin(email, password);
      setAdminToken(res.access_token);
      setAdminInfo({ name: res.admin_name, email: res.admin_email });
      setLoginStatus('authenticated');
      sounds.playChime(850);
    } catch (err: any) {
      setLoginStatus('error');
      setErrorMessage(err.message || 'Admin login failed. Check email & password.');
    }
  };

  const handleSaveConfig = () => {
    sounds.playClick();
    apiService.setBaseUrl(apiUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0d0e15] border border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/30 bg-[#090a0f]/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-fantasy font-bold text-lg text-amber-100 flex items-center gap-2">
                FastAPI Backend Connector
                <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  v1.0 REST
                </span>
              </h2>
              <p className="text-xs text-amber-200/50">
                Connect and manage FastAPI endpoints for sorting, scoring & dashboard metrics.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900 border border-amber-900/40 text-amber-400/70 hover:text-amber-200 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Section 1: Server URL Configuration */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-900/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-mono text-amber-300 font-semibold flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-400" />
                Backend API Base URL
              </label>
              <div className="flex items-center gap-2">
                {status === 'connected' && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Online ({latency}ms)
                  </span>
                )}
                {status === 'error' && (
                  <span className="flex items-center gap-1 text-[11px] text-rose-400 font-mono bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                    <XCircle className="w-3.5 h-3.5" />
                    Offline / Disconnected
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="http://localhost:8000/api"
                className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-amber-900/40 text-amber-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                onClick={handleTestConnection}
                disabled={status === 'testing'}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${status === 'testing' ? 'animate-spin' : ''}`} />
                <span>{status === 'testing' ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>

            {/* Health Info pill if connected */}
            {healthData && (
              <div className="p-3 rounded-lg bg-slate-900/90 border border-emerald-500/20 text-slate-300 space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between text-emerald-300 font-semibold">
                  <span>Service: {healthData.service || 'SDG Sorting Hat API'}</span>
                  <span>Database: {healthData.database || 'SQLite'}</span>
                </div>
                <div className="text-slate-400">
                  Scoring Engine Version: <span className="text-amber-300">{healthData.scoring_version || 'v1.0.0'}</span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 flex items-start gap-2 text-[11px]">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Connection Error</div>
                  <div className="text-rose-200/80 font-mono">{errorMessage}</div>
                  <div className="mt-1 text-slate-400">
                    Make sure backend server is running via command: <code className="text-amber-300 font-mono bg-black/40 px-1 py-0.5 rounded">uvicorn app.main:app --reload --port 8000</code>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Admin JWT Authentication */}
          <form onSubmit={handleAdminLogin} className="p-4 rounded-xl bg-slate-950/80 border border-amber-900/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-mono text-amber-300 font-semibold flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                Backend Admin Authentication (JWT)
              </label>
              {adminToken && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Token Active
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-amber-200/60 block text-[10px] mb-1">Admin Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sdg.dz"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-900/40 text-amber-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <span className="text-amber-200/60 block text-[10px] mb-1">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-900/40 text-amber-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-[10px] text-amber-400/50 font-mono">
                Default credentials: admin@sdg.dz / admin123
              </div>
              <button
                type="submit"
                disabled={loginStatus === 'authenticating'}
                className="px-4 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>{loginStatus === 'authenticating' ? 'Authenticating...' : 'Authenticate Admin'}</span>
              </button>
            </div>
          </form>

          {/* Section 3: Available FastAPI Endpoints */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-900/30 space-y-2">
            <div className="font-mono text-amber-300 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-amber-400" />
                Active API Routes Directory
              </span>
              <a
                href={`${apiUrl.replace(/\/api$/, '')}/docs`}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 font-sans"
              >
                <span>Open Swagger Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 text-slate-300">
                <span className="text-emerald-400 font-bold">GET /api/health</span>
                <span className="text-slate-400">Backend health & DB status</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 text-slate-300">
                <span className="text-emerald-400 font-bold">GET /api/questions</span>
                <span className="text-slate-400">Fetch 8 active questionnaire questions</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 text-slate-300">
                <span className="text-amber-400 font-bold">POST /api/participants</span>
                <span className="text-slate-400">Create participant session</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 text-slate-300">
                <span className="text-amber-400 font-bold">POST /api/sort</span>
                <span className="text-slate-400">Run sorting engine & calculate scores</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 text-slate-300">
                <span className="text-purple-400 font-bold">GET /api/admin/statistics</span>
                <span className="text-slate-400">Dashboard metrics (JWT required)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-amber-900/30 bg-[#090a0f]/90">
          <span className="text-[11px] text-amber-400/50 font-mono">
            FastAPI Backend: http://localhost:8000
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-200/70 text-xs font-semibold border border-amber-900/30 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSaveConfig}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
