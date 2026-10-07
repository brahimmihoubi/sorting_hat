import { useState, FC } from 'react';
import { apiService } from '../services/api';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import {
  ShieldCheck,
  KeyRound,
  Mail,
  Lock,
  ArrowRight,
  Server,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface AdminLoginScreenProps {
  onLoginSuccess: (adminName: string, adminEmail: string) => void;
}

export const AdminLoginScreen: FC<AdminLoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('algeria.data@gmail.com');
  const [password, setPassword] = useState('SDG_welcome_2027');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setLoading(true);
    setError(null);

    try {
      const res = await apiService.adminLogin(email, password);
      sounds.playChime(880);
      onLoginSuccess(res.admin_name, res.admin_email);
    } catch (err: any) {
      sounds.playClick();
      setError(err.message || 'Login failed. Please verify admin email & password.');
    } finally {
      setLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    sounds.playClick();
    setEmail('algeria.data@gmail.com');
    setPassword('SDG_welcome_2027');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="w-full max-w-md bg-[#0d0e17]/90 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.25)] backdrop-blur-xl relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Lockup */}
        <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-amber-900/30">
          <div className="relative w-16 h-16 flex items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-[#fde68a] via-[#f5b027] to-[#d97706] border-2 border-[#ffe899] shadow-[0_0_25px_rgba(245,175,40,0.6)] animate-pulse">
            <img src={ASSETS.logo} alt="SDG" className="w-full h-full object-contain filter drop-shadow-md" />
          </div>

          <div>
            <h1 className="font-fantasy text-2xl sm:text-3xl font-bold text-amber-100 flex items-center justify-center gap-2">
              SDG Admin Portal
            </h1>
            <p className="text-xs text-amber-300/60 mt-1 font-sans">
              Authenticate to access live sorting hat supervision & backend APIs.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-[11px] font-mono text-emerald-400">
            <Server className="w-3.5 h-3.5" />
            <span>FastAPI http://localhost:8000/api</span>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="font-sans leading-relaxed">{error}</div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-amber-200/80 font-medium flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              Administrator Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="algeria.data@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-amber-900/50 text-amber-100 font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-400 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-amber-200/80 font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Password
              </label>
              <button
                type="button"
                onClick={fillDefaultCredentials}
                className="text-[10px] text-amber-400/80 hover:text-amber-300 font-mono underline"
              >
                Auto-fill Admin
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="SDG_welcome_2027"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-amber-900/50 text-amber-100 font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-400 transition-all"
              />
            </div>
          </div>

          {/* Preset hint box */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-amber-900/30 text-[11px] text-amber-200/60 font-mono space-y-1">
            <div className="flex items-center justify-between text-amber-300 font-semibold">
              <span>Required Credentials:</span>
              <span className="text-emerald-400 font-normal">Active Backend</span>
            </div>
            <div>Email: <span className="text-amber-100 font-semibold">algeria.data@gmail.com</span></div>
            <div>Password: <span className="text-amber-100 font-semibold">SDG_welcome_2027</span></div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.4)] border border-amber-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
          >
            <KeyRound className="w-4 h-4 text-slate-950" />
            <span>{loading ? 'Authenticating with Backend...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-amber-900/30 text-center text-[11px] text-amber-400/40 flex items-center justify-between">
          <a href="/" className="hover:text-amber-300 transition-colors">
            ← Back to Public Site
          </a>
          <span>SDG Control Panel v1.0</span>
        </div>
      </div>
    </div>
  );
};
