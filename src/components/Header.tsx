import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useAccessibility } from '../hooks/useAccessibility';
import { Language } from '../types';
import { 
  Globe, 
  Menu, 
  X, 
  PlusCircle, 
  Search, 
  History, 
  HelpCircle, 
  Eye, 
  LayoutDashboard,
  Building2,
  SlidersHorizontal
} from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { settings, updateSettings } = useAccessibility();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: t('navHome'), icon: Building2 },
    { path: '/submit', label: t('navSubmit'), icon: PlusCircle },
    { path: '/track', label: t('navTrack'), icon: Search },
    { path: '/history', label: t('navHistory'), icon: History },
    { path: '/dashboard', label: t('navDashboard'), icon: LayoutDashboard },
    { path: '/help', label: t('navHelp'), icon: HelpCircle },
    { path: '/accessibility', label: t('navAccessibility'), icon: Eye },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      {/* Top Banner / Accessibility Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-6 flex justify-between items-center border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-slate-300">Gov-Simulated Grievance Portal MVP</span>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button 
            onClick={() => setAccessOpen(!accessOpen)}
            className="flex items-center space-x-1 hover:text-amber-400 transition-colors focus:outline-none"
            aria-label="Toggle Accessibility Panel"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">{t('navAccessibility')}</span>
          </button>
        </div>
      </div>

      {/* Accessibility Drawer Dropdown */}
      {accessOpen && (
        <div className="bg-slate-900 border-b border-amber-500/30 p-4 shadow-xl transition-all">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-amber-400">{t('textSizeLabel')}:</span>
              <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
                <button
                  onClick={() => updateSettings({ textSize: 'normal' })}
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    settings.textSize === 'normal' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t('textSizeNormal')}
                </button>
                <button
                  onClick={() => updateSettings({ textSize: 'large' })}
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    settings.textSize === 'large' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t('textSizeLarge')}
                </button>
                <button
                  onClick={() => updateSettings({ textSize: 'xlarge' })}
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    settings.textSize === 'xlarge' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t('textSizeXLarge')}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="font-semibold text-amber-400">{t('contrastLabel')}:</span>
              <button
                onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  settings.highContrast 
                    ? 'bg-amber-400 text-slate-950 border-amber-400' 
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                {settings.highContrast ? t('contrastOn') : t('contrastOff')}
              </button>
            </div>

            <button 
              onClick={() => setAccessOpen(false)}
              className="text-xs text-slate-400 hover:text-white underline ml-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-md group-hover:scale-105 transition-transform">
              J
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {t('appName')}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  AI-CIVIC
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                {t('appTagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Prominent Header Language Switcher */}
          <div className="flex items-center space-x-3">
            <div className="relative inline-flex bg-slate-950 p-1 rounded-xl border border-slate-700/80 shadow-inner">
              <div className="hidden sm:flex items-center px-2 text-slate-400">
                <Globe className="w-4 h-4 text-amber-400 mr-1" />
              </div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    lang === l.code
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  aria-label={`Switch to ${l.label}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                  active
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 text-amber-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
