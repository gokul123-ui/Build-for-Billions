import React from 'react';
import { Priority } from '../types';
import { getPriorityMeta } from '../services/priorityService';
import { AlertTriangle, Siren, Zap, Flame, Clock, FileText } from 'lucide-react';

const IconMap: Record<Priority, React.ElementType> = {
  Emergency: Siren,
  Urgent: Zap,
  High: Flame,
  Medium: Clock,
  Low: FileText,
};

export const PriorityBadge: React.FC<{ priority: Priority; size?: 'sm' | 'md' | 'lg'; showSLA?: boolean }> = ({ priority, size = 'md', showSLA = true }) => {
  const meta = getPriorityMeta(priority);
  const Icon = IconMap[priority] || AlertTriangle;
  const sizeCls = size === 'sm' ? 'px-2 py-1 text-[10px]' : size === 'lg' ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs';
  const pulse = priority === 'Emergency' ? 'animate-pulse shadow-lg shadow-red-500/40' : priority === 'Urgent' ? 'shadow-md shadow-orange-500/30' : 'shadow-sm';

  return (
    <span className={`inline-flex items-center space-x-1.5 rounded-full font-black border ${meta.bg} ${meta.text} ${meta.border} ${sizeCls} ${pulse}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span>{meta.shortLabel}</span>
      {showSLA && <span className="opacity-80 font-bold">• {meta.slaLabel}</span>}
    </span>
  );
};

export const PriorityLaneLabel: React.FC<{ priority: Priority; count: number }> = ({ priority, count }) => {
  const meta = getPriorityMeta(priority);
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-black border ${meta.bg} ${meta.text} ${meta.border}`}>
      {meta.icon} {meta.shortLabel} ({count})
    </span>
  );
};
