import React from 'react';
import { ComplaintData, GrievanceStatus, Language } from '../types';
import { getTranslation } from '../i18n';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface TimelineProps {
  complaint: ComplaintData;
  lang: Language;
}

const STEPS: { status: GrievanceStatus; titleKey: string; descKey: string }[] = [
  { status: 'Submitted', titleKey: 'statusSubmitted', descKey: 'statusDescSubmitted' },
  { status: 'Under Review', titleKey: 'statusUnderReview', descKey: 'statusDescUnderReview' },
  { status: 'Assigned', titleKey: 'statusAssigned', descKey: 'statusDescAssigned' },
  { status: 'In Progress', titleKey: 'statusInProgress', descKey: 'statusDescInProgress' },
  { status: 'Resolved', titleKey: 'statusResolved', descKey: 'statusDescResolved' },
];

export const Timeline: React.FC<TimelineProps> = ({ complaint, lang }) => {
  const currentStatusIndex = STEPS.findIndex(s => s.status === complaint.status);

  return (
    <div className="py-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
        <Clock className="w-5 h-5 text-amber-500" />
        <span>{getTranslation(lang, 'timelineTitle')}</span>
      </h3>

      <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
        {STEPS.map((step, idx) => {
          const isPassed = idx <= currentStatusIndex;
          const isCurrent = idx === currentStatusIndex;

          // Find history entry for date/note if available
          const historyItem = complaint.statusHistory?.find(h => h.status === step.status);

          const stepTitle = getTranslation(lang, step.titleKey as any);
          const defaultStepDesc = getTranslation(lang, step.descKey as any);
          const noteText = historyItem?.note ? (historyItem.note[lang] || historyItem.note.en) : defaultStepDesc;
          
          const formattedDate = historyItem?.timestamp 
            ? new Date(historyItem.timestamp).toLocaleString(lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })
            : null;

          return (
            <div key={step.status} className="relative flex items-start group">
              {/* Icon Marker */}
              <div 
                className={`absolute -left-6 top-0.5 w-6.5 h-6.5 rounded-full flex items-center justify-center transition-all ${
                  isPassed 
                    ? isCurrent 
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 shadow-md scale-110' 
                      : 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-600'
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <Circle className="w-3 h-3 text-slate-400" />
                )}
              </div>

              {/* Content Card */}
              <div className={`ml-4 w-full p-4 rounded-xl border transition-all ${
                isCurrent 
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm dark:bg-amber-950/20' 
                  : isPassed
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-60'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className={`text-base font-bold ${
                    isCurrent ? 'text-amber-600 dark:text-amber-400' : isPassed ? 'text-slate-900 dark:text-white' : 'text-slate-500'
                  }`}>
                    {stepTitle}
                  </h4>
                  {formattedDate && (
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {formattedDate}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {noteText}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
