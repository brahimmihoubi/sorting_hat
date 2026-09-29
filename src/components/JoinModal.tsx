import { useState, FC, FormEvent } from 'react';
import { DepartmentId } from '../types';
import { sounds } from '../utils/audio';
import { X, Check, Sparkles, Send } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: { name: string; email: string; dept: DepartmentId }) => void;
}

export const JoinModal: FC<JoinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState<DepartmentId>('development');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    sounds.playChime(640);
    setSubmitted(true);
    setTimeout(() => {
      onSuccess({ name, email, dept });
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full parchment-card rounded-2xl p-6 sm:p-8 text-amber-950 space-y-4 border-2 border-amber-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-amber-900 hover:text-amber-950 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="text-xs font-fantasy font-bold tracking-widest uppercase text-amber-900">
            ✦ JOIN SETIF DEVELOPERS GROUP ✦
          </div>
          <h3 className="text-2xl font-bold font-fantasy">Become an SDG Fellow</h3>
          <p className="text-xs text-amber-900/80">
            Take part in hackathons, weekly workshops, and collaborative tech projects.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3 animate-in zoom-in duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-fantasy font-bold text-lg text-emerald-950">
              Welcome to the Fellowship!
            </h4>
            <p className="text-xs text-amber-900/80">
              Your registration has been recorded. Check your email for orientation details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Brahim Mihoubi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-amber-100/70 border border-amber-900/30 text-xs font-medium text-amber-950 placeholder-amber-900/40 focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">
                University Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@univ-setif.dz"
                className="w-full px-3.5 py-2.5 rounded-xl bg-amber-100/70 border border-amber-900/30 text-xs font-medium text-amber-950 placeholder-amber-900/40 focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">
                Preferred Department
              </label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value as DepartmentId)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-amber-100/70 border border-amber-900/30 text-xs font-medium text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-700 cursor-pointer"
              >
                <option value="development">Development (Code & Solutions)</option>
                <option value="design">Design (Visuals & Experiences)</option>
                <option value="events">Events (Logistics & Summits)</option>
                <option value="social_media">Social Media (Content & Growth)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-600 text-amber-100 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit Application</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
