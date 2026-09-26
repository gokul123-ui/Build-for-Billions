import React from 'react';
import { ComplaintData } from '../types';
import { getSLADeadline, getSLAStatus, getSLAProgress, getPriorityMeta, getNextAction } from '../services/priorityService';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const SLAIndicator: React.FC<{ complaint: ComplaintData; compact?: boolean }> = ({ complaint, compact = false }) => {
  const meta = getPriorityMeta(complaint.priority);
  const deadline = getSLADeadline(complaint.createdAt, complaint.priority);
  const status = getSLAStatus(complaint);
  const progress = getSLAProgress(complaint);
  const next = getNextAction(complaint);

  const statusColor =
    status === 'overdue' ? 'text-red-400 border-red-500/40 bg-red-500/10' :
    status === 'due_soon' ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' :
    status === 'resolved' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' :
    'text-slate-300 border-slate-700 bg-slate-800';

  const barColor =
    status === 'overdue' ? 'bg-red-500' :
    status === 'due_soon' ? 'bg-amber-500' :
    complaint.priority === 'Emergency' ? 'bg-red-500' :
    complaint.priority === 'Urgent' ? 'bg-orange-500' : 'bg-emerald-500';

  return (
    <div className={`rounded-2xl border p-4 space-y-3 ${compact ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400">SLA</span>
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${statusColor}`}>
            {status === 'overdue' ? 'OVERDUE' : status === 'due_soon' ? 'DUE SOON (<12h)' : status === 'resolved' ? 'RESOLVED' : 'ON TRACK'} • {meta.slaLabel}
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">Due: {deadline.toLocaleString()}</span>
      </div>

      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
        <div className={`h-full ${barColor} transition-all`} style={{ width: `${Math.min(100, progress)}%` }} />
      </div>
      <div className="flex justify-between text-[11px] font-medium">
        <span className="text-slate-500">Filed: {new Date(complaint.createdAt).toLocaleDateString()}</span>
        <span className={status === 'overdue' ? 'text-red-400 font-bold' : status === 'due_soon' ? 'text-amber-400 font-bold' : 'text-slate-400'}>{Math.round(progress)}% elapsed</span>
      </div>

      {!compact && (
        <div className="flex items-start space-x-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
          {status === 'overdue' ? <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> : status === 'resolved' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> : <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />}
          <div>
            <p className="font-bold text-slate-200">Next municipality action:</p>
            <p className="text-slate-400 leading-relaxed">{next}</p>
          </div>
        </div>
      )}
    </div>
  );
};
