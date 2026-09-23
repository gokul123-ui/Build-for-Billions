import React from 'react';
import { GrievanceStatus, Language } from '../types';
import { getTranslation } from '../i18n';
import { Clock, Eye, UserCheck, Wrench, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  status: GrievanceStatus;
  lang: Language;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, lang }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Submitted':
        return {
          key: 'statusSubmitted',
          bg: 'bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400',
          icon: Clock
        };
      case 'Under Review':
        return {
          key: 'statusUnderReview',
          bg: 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400',
          icon: Eye
        };
      case 'Assigned':
        return {
          key: 'statusAssigned',
          bg: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30 dark:text-indigo-400',
          icon: UserCheck
        };
      case 'In Progress':
        return {
          key: 'statusInProgress',
          bg: 'bg-orange-500/10 text-orange-600 border-orange-500/30 dark:text-orange-400',
          icon: Wrench
        };
      case 'Resolved':
        return {
          key: 'statusResolved',
          bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
          icon: CheckCircle2
        };
      default:
        return {
          key: 'statusSubmitted',
          bg: 'bg-slate-500/10 text-slate-600 border-slate-500/30',
          icon: Clock
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;
  const label = getTranslation(lang, config.key as any);

  return (
    <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </span>
  );
};
