import React from 'react';
import { Link } from 'react-router-dom';
import { ComplaintData } from '../types';
import { sortByPriority, getPriorityMeta, getSLAStatus } from '../services/priorityService';
import { PriorityBadge } from './PriorityBadge';
import { Building2, MapPin, Clock, ArrowUpCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const PriorityQueue: React.FC<{ complaints: ComplaintData[]; limit?: number; title?: string }> = ({ complaints, limit = 6, title = 'Municipality Work Queue — Emergency → Low (Order of Execution)' }) => {
  const { lang } = useLanguage();
  const sorted = sortByPriority(complaints.filter(c => c.status !== 'Resolved')).slice(0, limit);
  if (sorted.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 text-amber-400">
          <ArrowUpCircle className="w-5 h-5" />
          <h3 className="text-sm font-black uppercase tracking-widest text-white">{title}</h3>
          <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 text-[10px] font-black">JUDGE-IMPRESSING TRIAGE</span>
        </div>
        <span className="text-[11px] font-bold text-slate-500">{sorted.length} queued • Sorted by AI priority + FIFO</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {sorted.map((c, idx) => {
          const sla = getSLAStatus(c);
          return (
            <div key={c.id} className={`p-4 rounded-2xl border flex gap-3 ${idx === 0 ? 'bg-gradient-to-r from-red-950/60 to-slate-950 border-red-500/40 shadow-lg' : idx === 1 ? 'bg-orange-950/30 border-orange-500/30' : 'bg-slate-950 border-slate-800'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${idx === 0 ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800 text-slate-300'}`}>#{idx + 1}</div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-black text-amber-400 text-xs">{c.id}</span>
                  <PriorityBadge priority={c.priority} size="sm" />
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${sla === 'overdue' ? 'bg-red-500/15 text-red-400 border-red-500/30' : sla === 'due_soon' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>{sla.toUpperCase().replace('_', ' ')}</span>
                </div>
                <p className="text-xs font-bold text-white leading-snug line-clamp-2">{c.issueTitle[lang] || c.issueTitle.en}</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-3">
                  <span className="flex items-center gap-1"><Building2 className="w-3 h-3 text-emerald-400" />{c.departmentName[lang] || c.departmentName.en}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-400" />{c.district}</span>
                </p>
                <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(c.createdAt).toLocaleDateString()} • SLA {getPriorityMeta(c.priority).slaLabel}</p>
                {idx === 0 && <p className="text-[11px] font-bold text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-2 py-1">Next up — dispatch now ⏱️ {getPriorityMeta(c.priority).queueName}</p>}
              </div>
              <Link to={`/track/${c.id}`} className="self-center px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 font-bold text-[11px] hover:bg-slate-700 whitespace-nowrap">Open →</Link>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-slate-500 text-center">Order = Emergency (24h) → Urgent (48h) → High (72h) → Medium (7d) → Low (14d). Ties broken by oldest first (FIFO fairness). Resolved hidden.</p>
    </div>
  );
};
