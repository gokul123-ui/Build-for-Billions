import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  Mic, 
  Sparkles, 
  ShieldCheck,
  Building2
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white">
        <div className="flex items-center space-x-3 text-amber-400 mb-2">
          <HelpCircle className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-widest">Support Center</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          {t('helpTitle')}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          {t('helpSubtitle')}
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-white shadow-xl">
        <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-amber-400">
          <Sparkles className="w-5 h-5" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-base flex justify-between items-center text-white hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-amber-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-900/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Voice Recognition & Multilingual Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Mic className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold">Multilingual Speech Input</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Click the <strong className="text-amber-400">Speak Complaint</strong> button on the submission form. The speech engine automatically switches locale between <code className="text-amber-300 font-mono">en-IN</code>, <code className="text-amber-300 font-mono">ta-IN</code>, and <code className="text-amber-300 font-mono">hi-IN</code> based on your active language choice.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold">Government Department Router</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            JanConnect's rule-based AI analyzes keywords in English, தமிழ், and हिन्दी to automatically assign complaints to water supply, electricity, highways, waste management, or municipal health departments.
          </p>
        </div>

      </div>

      {/* Helplines Box */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-white space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-base">
          <PhoneCall className="w-5 h-5" />
          <span>{t('emergencyHelplineTitle')}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            {t('helplineCivic')}
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            {t('helplineState')}
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            {t('helplineEmergency')}
          </div>
        </div>
      </div>

    </div>
  );
};
