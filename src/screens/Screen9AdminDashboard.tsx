import { FC, useState } from 'react';
import { ParticipantInfo, ScreenId } from '../types';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import {
  Users,
  Code,
  Palette,
  Calendar,
  Megaphone,
  Bell,
  Download,
  Search,
  Filter,
  CheckCircle,
  Clock,
  MoreVertical,
  ExternalLink,
  Plus,
  RefreshCw,
} from 'lucide-react';

interface Screen9AdminDashboardProps {
  participants: ParticipantInfo[];
  onNavigate: (screen: ScreenId) => void;
  onAddParticipant: (newP: ParticipantInfo) => void;
}

export const Screen9AdminDashboard: FC<Screen9AdminDashboardProps> = ({
  participants,
  onNavigate,
  onAddParticipant,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'participants' | 'settings'>('dashboard');

  const filtered = participants.filter((p) => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'all' || p.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const handleExportCSV = () => {
    sounds.playClick();
    const headers = 'ID,Full Name,Email,Faculty,Study Year,Department,Status,Created At\n';
    const rows = participants
      .map(
        (p) =>
          `"${p.id}","${p.fullName}","${p.email}","${p.faculty}","${p.studyYear}","${
            p.department || 'Unsorted'
          }","${p.status || 'Completed'}","${p.createdAt}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sdg_sorting_hat_participants_${Date.now()}.csv`;
    a.click();
  };

  const handleQuickAdd = () => {
    const names = ['Karim Mansouri', 'Lina Benseghir', 'Farid Belhadj', 'Anis Slimani'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const depts: ('development' | 'design' | 'events' | 'social_media')[] = [
      'development',
      'design',
      'events',
      'social_media',
    ];
    const randomDept = depts[Math.floor(Math.random() * depts.length)];

    const newEntry: ParticipantInfo = {
      id: `part_${Date.now()}`,
      fullName: `${randomName} (${Math.floor(Math.random() * 90 + 10)})`,
      email: `${randomName.toLowerCase().replace(' ', '.')}@univ-setif.dz`,
      faculty: 'Computer Science Department',
      studyYear: 'Master 1',
      createdAt: 'Just now',
      department: randomDept,
      status: 'Completed',
      scores: { development: 65, design: 50, events: 45, social_media: 40 },
    };

    sounds.playChime(600);
    onAddParticipant(newEntry);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/30">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-fantasy text-amber-100">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/60 mt-0.5">
            Manage participants, view statistics and supervise the sorting process.
          </p>
        </div>

        {/* Admin profile lockup */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => sounds.playClick()}
            className="w-9 h-9 rounded-full bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:text-amber-100 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-amber-500/30">
            <img
              src={ASSETS.avatarBrahim}
              alt="Brahim Mihoubi"
              className="w-8 h-8 rounded-full object-cover border border-amber-400/50"
            />
            <div className="text-left">
              <div className="text-xs font-bold text-amber-100 leading-tight">
                Brahim Mihoubi
              </div>
              <div className="text-[10px] text-amber-400/60 font-mono">Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Stat Metrics Cards (Exact match to Screenshot 9) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Participants */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/40 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-amber-200/70">Total Participants</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-100">
              {participants.length}
            </span>
            <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded">
              +12%
            </span>
          </div>
          <span className="text-[10px] text-amber-200/40 mt-1 block">from last week</span>
        </div>

        {/* Development */}
        <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-blue-200/80">Development</span>
            <Code className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-blue-100">68</span>
            <span className="text-xs text-blue-300 font-mono">27%</span>
          </div>
          <div className="w-full h-1 bg-blue-900/50 rounded-full mt-2 overflow-hidden">
            <div className="w-[27%] h-full bg-blue-500" />
          </div>
        </div>

        {/* Design */}
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-rose-200/80">Design</span>
            <Palette className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-rose-100">54</span>
            <span className="text-xs text-rose-300 font-mono">22%</span>
          </div>
          <div className="w-full h-1 bg-rose-900/50 rounded-full mt-2 overflow-hidden">
            <div className="w-[22%] h-full bg-rose-500" />
          </div>
        </div>

        {/* Events */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-emerald-200/80">Events</span>
            <Calendar className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-100">72</span>
            <span className="text-xs text-emerald-300 font-mono">29%</span>
          </div>
          <div className="w-full h-1 bg-emerald-900/50 rounded-full mt-2 overflow-hidden">
            <div className="w-[29%] h-full bg-emerald-500" />
          </div>
        </div>

        {/* Social Media */}
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-purple-200/80">Social Media</span>
            <Megaphone className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-purple-100">54</span>
            <span className="text-xs text-purple-300 font-mono">22%</span>
          </div>
          <div className="w-full h-1 bg-purple-900/50 rounded-full mt-2 overflow-hidden">
            <div className="w-[22%] h-full bg-purple-500" />
          </div>
        </div>
      </div>

      {/* Analytics Charts Row: Donut Chart, Line Chart, Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Participants per Department (Interactive Donut) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-4 shadow-xl">
          <h3 className="font-fantasy font-bold text-sm text-amber-200">
            Participants per Department
          </h3>

          <div className="flex items-center justify-between gap-4">
            {/* SVG Donut Chart */}
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="14" fill="transparent" />
                {/* Dev (27%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#3b82f6"
                  strokeWidth="14"
                  strokeDasharray="67.8 251.2"
                  strokeDashoffset="0"
                  fill="transparent"
                />
                {/* Events (29%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="14"
                  strokeDasharray="72.8 251.2"
                  strokeDashoffset="-67.8"
                  fill="transparent"
                />
                {/* Design (22%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#f43f5e"
                  strokeWidth="14"
                  strokeDasharray="55.2 251.2"
                  strokeDashoffset="-140.6"
                  fill="transparent"
                />
                {/* Social Media (22%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#a855f7"
                  strokeWidth="14"
                  strokeDasharray="55.2 251.2"
                  strokeDashoffset="-195.8"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-xl font-bold text-amber-100">
                  {participants.length}
                </span>
                <span className="text-[10px] text-amber-200/50">Total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-1.5 text-xs flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-300">Development</span>
                </div>
                <span className="font-mono text-amber-100 font-semibold">68 (27%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-slate-300">Design</span>
                </div>
                <span className="font-mono text-amber-100 font-semibold">54 (22%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-slate-300">Events</span>
                </div>
                <span className="font-mono text-amber-100 font-semibold">72 (29%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-slate-300">Social Media</span>
                </div>
                <span className="font-mono text-amber-100 font-semibold">54 (22%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Registrations Over Time (Weekly Line Chart) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-fantasy font-bold text-sm text-amber-200">
              Registrations Over Time
            </h3>
            <span className="text-[10px] text-amber-400/60 font-mono">This Week</span>
          </div>

          <div className="h-36 w-full flex flex-col justify-end pt-2">
            <svg className="w-full h-28 overflow-visible" viewBox="0 0 280 80">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="280" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="280" y2="50" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="280" y2="80" stroke="#1e293b" />

              {/* Area fill */}
              <polygon
                points="10,75 50,60 90,65 130,45 170,45 210,25 250,15 250,80 10,80"
                fill="rgba(245, 158, 11, 0.15)"
              />
              {/* Trend Polyline */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                points="10,75 50,60 90,65 130,45 170,45 210,25 250,15"
              />
              {/* Dots */}
              {[[10,75],[50,60],[90,65],[130,45],[170,45],[210,25],[250,15]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4" fill="#fbbf24" stroke="#090a0f" strokeWidth="2" />
              ))}
            </svg>
            <div className="flex items-center justify-between text-[10px] text-amber-300/60 pt-2 font-mono">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Completion Rate (Gauge) */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-4 shadow-xl flex flex-col justify-between">
          <h3 className="font-fantasy font-bold text-sm text-amber-200">
            Completion Rate
          </h3>

          <div className="flex items-center justify-center gap-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="10" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeDasharray="218.6 251.2"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute font-mono text-xl font-bold text-amber-100">87%</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-mono text-base font-bold text-emerald-400">216</span>
                <span className="text-[11px] text-slate-400 block">Completed</span>
              </div>
              <div>
                <span className="font-mono text-base font-bold text-amber-400">32</span>
                <span className="text-[11px] text-slate-400 block">In Progress</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-amber-300/50 text-center">
            Avg. sorting completion time: 2m 14s
          </div>
        </div>
      </div>

      {/* Participants Table & Quick Actions */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h3 className="font-fantasy font-bold text-base text-amber-100">
              Recent Participants
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
              {filtered.length} entries
            </span>
          </div>

          {/* Action buttons: Search, Filter, Export, Add */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search participant..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-amber-900/40 text-xs text-amber-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Department Filter */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-amber-900/40 text-xs text-amber-200 focus:outline-none"
            >
              <option value="all">All Departments</option>
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="events">Events</option>
              <option value="social_media">Social Media</option>
            </select>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-200 border border-amber-900/40 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download CSV report"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export CSV</span>
            </button>

            {/* Quick Simulate Participant */}
            <button
              onClick={handleQuickAdd}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-amber-900/30 text-amber-400/70 uppercase tracking-wider font-mono text-[10px]">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Year</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-950/40">
              {filtered.map((p, idx) => {
                const deptColor =
                  p.department === 'development'
                    ? 'bg-blue-950/70 text-blue-300 border-blue-500/40'
                    : p.department === 'design'
                    ? 'bg-rose-950/70 text-rose-300 border-rose-500/40'
                    : p.department === 'events'
                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                    : 'bg-purple-950/70 text-purple-300 border-purple-500/40';

                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-3 font-semibold text-amber-100 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">
                        {p.fullName.charAt(0)}
                      </div>
                      <span>{p.fullName}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{p.email}</td>
                    <td className="py-3 px-3 text-amber-200/80 font-mono text-[11px]">
                      {p.studyYear}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wider ${deptColor}`}
                      >
                        {p.department?.replace('_', ' ') || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] ${
                          p.status === 'Completed' ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {p.status || 'Completed'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                      {p.createdAt}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          sounds.playClick();
                          onNavigate('member_profile');
                        }}
                        className="text-amber-400/80 hover:text-amber-300 text-xs font-semibold hover:underline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-amber-900/20 text-xs text-amber-200/60">
        <div>
          <span>Setif Developers Group · Sorting Hat System v1.0</span>
        </div>
        <button
          onClick={() => {
            sounds.playClick();
            onNavigate('landing');
          }}
          className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
