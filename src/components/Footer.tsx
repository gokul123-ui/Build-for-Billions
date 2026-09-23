import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { ShieldCheck, PhoneCall, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black text-lg">
                J
              </div>
              <span className="text-xl font-bold text-white tracking-tight">{t('appName')}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('footerTagline')}
            </p>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('footerAbout')}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/submit" className="hover:text-amber-400 transition-colors">
                  {t('navSubmit')}
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-amber-400 transition-colors">
                  {t('navTrack')}
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-amber-400 transition-colors">
                  {t('navHistory')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-amber-400 transition-colors">
                  {t('navDashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Accessibility */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support & Civics</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="hover:text-amber-400 transition-colors">
                  {t('navHelp')}
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-amber-400 transition-colors">
                  {t('navAccessibility')}
                </Link>
              </li>
              <li>
                <span className="cursor-default hover:text-slate-300">
                  {t('footerPrivacy')}
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-slate-300">
                  {t('footerTerms')}
                </span>
              </li>
            </ul>
          </div>

          {/* Helplines */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Helplines</span>
            </h4>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs space-y-1.5">
              <p className="text-slate-300 font-medium">{t('helplineCivic')}</p>
              <p className="text-slate-300 font-medium">{t('helplineState')}</p>
              <p className="text-slate-300 font-medium">{t('helplineEmergency')}</p>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>{t('copyright')}</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for Citizen Inclusion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
