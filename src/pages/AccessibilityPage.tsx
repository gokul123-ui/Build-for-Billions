import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useAccessibility } from '../hooks/useAccessibility';
import { 
  Eye, 
  Type, 
  Sun, 
  Zap, 
  CheckCircle2, 
  SlidersHorizontal,
  ShieldCheck
} from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  const { t } = useLanguage();
  const { settings, updateSettings } = useAccessibility();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white">
        <div className="flex items-center space-x-3 text-amber-400 mb-2">
          <Eye className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-widest">Inclusive Civics</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          {t('accessTitle')}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          {t('accessSubtitle')}
        </p>
      </div>

      {/* Main Settings Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 text-white shadow-xl">
        
        {/* Text Size Controls */}
        <div className="space-y-4 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{t('textSizeLabel')}</h3>
              <p className="text-xs text-slate-400">Adjust scaling for text readability across all pages.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => updateSettings({ textSize: 'normal' })}
              className={`p-4 rounded-2xl border text-left font-bold transition-all ${
                settings.textSize === 'normal'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-sm font-semibold">{t('textSizeNormal')}</div>
              <div className="text-xs opacity-75 mt-1 font-mono">16px base font</div>
            </button>

            <button
              onClick={() => updateSettings({ textSize: 'large' })}
              className={`p-4 rounded-2xl border text-left font-bold transition-all ${
                settings.textSize === 'large'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-base font-bold">{t('textSizeLarge')}</div>
              <div className="text-xs opacity-75 mt-1 font-mono">18px (115%)</div>
            </button>

            <button
              onClick={() => updateSettings({ textSize: 'xlarge' })}
              className={`p-4 rounded-2xl border text-left font-bold transition-all ${
                settings.textSize === 'xlarge'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-lg font-black">{t('textSizeXLarge')}</div>
              <div className="text-xs opacity-75 mt-1 font-mono">20px (130%)</div>
            </button>
          </div>
        </div>

        {/* High Contrast Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{t('contrastLabel')}</h3>
              <p className="text-xs text-slate-400 max-w-md">{t('contrastDesc')}</p>
            </div>
          </div>

          <button
            onClick={() => updateSettings({ highContrast: !settings.highContrast })}
            className={`px-6 py-3 rounded-xl font-bold text-sm border transition-all ${
              settings.highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg'
                : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            {settings.highContrast ? t('contrastOn') : t('contrastOff')}
          </button>
        </div>

        {/* Reduce Motion Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{t('motionLabel')}</h3>
              <p className="text-xs text-slate-400 max-w-md">{t('motionDesc')}</p>
            </div>
          </div>

          <button
            onClick={() => updateSettings({ reduceMotion: !settings.reduceMotion })}
            className={`px-6 py-3 rounded-xl font-bold text-sm border transition-all ${
              settings.reduceMotion
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg'
                : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            {settings.reduceMotion ? t('motionOn') : t('motionOff')}
          </button>
        </div>

      </div>

      {/* Accessibility Guidelines Info Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3 text-white">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>WCAG 2.1 Civic Compliance</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          JanConnect is built following Web Content Accessibility Guidelines (WCAG 2.1 AA). Features include screen-reader friendly ARIA labels, focus ring indicators for keyboard navigation, high color contrast, and multi-lingual voice recognition.
        </p>
      </div>

    </div>
  );
};
