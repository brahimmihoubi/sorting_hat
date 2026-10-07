import { useState, useEffect, FC } from 'react';
import { apiService } from '../services/api';
import { sounds } from '../utils/audio';
import {
  Code,
  Palette,
  Users,
  Megaphone,
  Plus,
  RefreshCw,
  Edit2,
  CheckCircle2,
  Sliders,
  HelpCircle,
  Cpu,
  Layers,
  Sparkles,
  Search,
  Save,
  Trash2,
  X,
} from 'lucide-react';

export const DepartmentsApiView: FC = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDept, setEditingDept] = useState<any | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    short_description: '',
    description: '',
    color: '#3b82f6',
    icon: 'code',
    display_order: 1,
  });

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAdminDepartments();
      setDepartments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch departments from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    try {
      if (editingDept) {
        await apiService.updateDepartment(editingDept.id, formData);
        sounds.playChime(700);
      } else {
        await apiService.createDepartment(formData);
        sounds.playChime(800);
      }
      setEditingDept(null);
      setShowCreateModal(false);
      fetchDepartments();
    } catch (err: any) {
      alert(`Error saving department: ${err.message}`);
    }
  };

  const openEdit = (dept: any) => {
    sounds.playClick();
    setEditingDept(dept);
    setFormData({
      slug: dept.slug,
      name: dept.name,
      short_description: dept.short_description || '',
      description: dept.description || '',
      color: dept.color || '#3b82f6',
      icon: dept.icon || 'code',
      display_order: dept.display_order || 1,
    });
    setShowCreateModal(true);
  };

  const openCreate = () => {
    sounds.playClick();
    setEditingDept(null);
    setFormData({
      slug: '',
      name: '',
      short_description: '',
      description: '',
      color: '#3b82f6',
      icon: 'code',
      display_order: departments.length + 1,
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between pb-3 border-b border-amber-900/30">
        <div>
          <h2 className="font-fantasy font-bold text-xl text-amber-100 flex items-center gap-2">
            Departments API View
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 font-mono border border-blue-500/30">
              GET/POST/PUT /api/admin/departments
            </span>
          </h2>
          <p className="text-xs text-amber-200/60 mt-0.5">
            Manage house/department entities in SQLite database via FastAPI CRUD routes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchDepartments}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-900/40 text-amber-300 hover:text-amber-100 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh API
          </button>
          <button
            onClick={openCreate}
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Department
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-10 text-center text-amber-300/60 font-mono text-xs flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
          Fetching departments from backend API...
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-mono">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/30 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-amber-300 uppercase tracking-widest">
                  Slug: {dept.slug}
                </span>
                <button
                  onClick={() => openEdit(dept)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs transition-colors cursor-pointer"
                  title="Edit Department"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <h3 className="font-fantasy font-bold text-lg text-amber-100 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                  {dept.name}
                </h3>
                <p className="text-xs text-amber-200/70 mt-1 line-clamp-2">
                  {dept.short_description || dept.description}
                </p>
              </div>

              <div className="pt-2 border-t border-amber-950/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Display Order: #{dept.display_order}</span>
                <span className="text-emerald-400">{dept.active !== false ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleSave}
            className="w-full max-w-lg bg-[#0e101a] border border-amber-500/40 rounded-2xl p-6 space-y-4 shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/30">
              <h3 className="font-fantasy font-bold text-lg text-amber-100">
                {editingDept ? `Edit Department: ${editingDept.name}` : 'Create New Department'}
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-amber-200 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-amber-200/70 font-mono block mb-1">Slug Identifier</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. cybersecurity"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-amber-900/40 text-amber-100 font-mono"
                  />
                </div>
                <div>
                  <label className="text-amber-200/70 font-mono block mb-1">Department Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Cyber Security"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-amber-900/40 text-amber-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-amber-200/70 font-mono block mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Brief tagline for the department..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-amber-900/40 text-amber-100 font-mono"
                />
              </div>

              <div>
                <label className="text-amber-200/70 font-mono block mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Complete mission description..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-amber-900/40 text-amber-100 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-amber-200/70 font-mono block mb-1">Color Hex</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="#3b82f6"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-amber-900/40 text-amber-100 font-mono"
                  />
                </div>
                <div>
                  <label className="text-amber-200/70 font-mono block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-amber-900/40 text-amber-100 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-amber-900/30">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-amber-200/70 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                {editingDept ? 'Update Department' : 'Create Department'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export const QuestionsApiView: FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAdminQuestions();
      setQuestions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch questions from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between pb-3 border-b border-amber-900/30">
        <div>
          <h2 className="font-fantasy font-bold text-xl text-amber-100 flex items-center gap-2">
            Questions & Answers API View
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 font-mono border border-purple-500/30">
              GET /api/admin/questions
            </span>
          </h2>
          <p className="text-xs text-amber-200/60 mt-0.5">
            Inspect questionnaire items, answer choices, and active status in backend DB.
          </p>
        </div>

        <button
          onClick={fetchQuestions}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-900/40 text-amber-300 hover:text-amber-100 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Questions
        </button>
      </div>

      {loading ? (
        <div className="p-10 text-center text-amber-300/60 font-mono text-xs flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
          Loading questionnaire questions from backend...
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-mono">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    Q{q.display_order}
                  </span>
                  <h3 className="font-fantasy font-bold text-base text-amber-100">{q.text}</h3>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  {q.type || 'single_choice'}
                </span>
              </div>

              {/* Answers list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {q.answers?.map((ans: any, idx: number) => (
                  <div
                    key={ans.id || idx}
                    className="p-3 rounded-xl bg-slate-950/60 border border-amber-950/60 text-xs text-amber-200/90 flex items-start gap-2"
                  >
                    <span className="font-mono text-[10px] text-amber-400/60 font-bold shrink-0 mt-0.5">
                      Choice #{ans.display_order}:
                    </span>
                    <span>{ans.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ScoringRulesApiView: FC = () => {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAdminScoringRules();
      setRules(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch scoring rules from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between pb-3 border-b border-amber-900/30">
        <div>
          <h2 className="font-fantasy font-bold text-xl text-amber-100 flex items-center gap-2">
            Scoring Rules API View
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono border border-emerald-500/30">
              GET /api/admin/scoring-rules
            </span>
          </h2>
          <p className="text-xs text-amber-200/60 mt-0.5">
            Inspect department weight matrix and leadership trait rules computed by the backend sorting engine.
          </p>
        </div>

        <button
          onClick={fetchRules}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-900/40 text-amber-300 hover:text-amber-100 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Rules
        </button>
      </div>

      {loading ? (
        <div className="p-10 text-center text-amber-300/60 font-mono text-xs flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
          Loading scoring rules matrix from backend...
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-mono">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto p-4 rounded-2xl bg-slate-900/80 border border-amber-900/30">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-amber-900/30 text-amber-400/70 uppercase tracking-wider font-mono text-[10px]">
                <th className="py-2 px-3">Rule ID</th>
                <th className="py-2 px-3">Question ID</th>
                <th className="py-2 px-3">Answer ID</th>
                <th className="py-2 px-3">Department ID</th>
                <th className="py-2 px-3">Weight Points</th>
                <th className="py-2 px-3">Trait Mapping</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-950/40 font-mono text-[11px]">
              {rules.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 text-amber-300/60 truncate max-w-[120px]">{r.id}</td>
                  <td className="py-2.5 px-3 text-slate-300">{r.question_id}</td>
                  <td className="py-2.5 px-3 text-slate-300">{r.answer_id}</td>
                  <td className="py-2.5 px-3 text-blue-300 font-semibold">{r.department_id || 'N/A'}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">+{r.weight} pts</td>
                  <td className="py-2.5 px-3 text-purple-300">
                    {r.trait ? `${r.trait}: ${r.trait_value}` : 'None'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
