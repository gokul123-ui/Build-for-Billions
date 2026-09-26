import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';
import { VisualIllustration } from '../components/VisualIllustration';
import { 
  PlusCircle, 
  Search, 
  Sparkles, 
  Mic, 
  Building, 
  FileCheck, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Navigation
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 border-b border-slate-800 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Text & Hero CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Multilingual Citizen Grievance Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              {lang === 'ta' && (
                <>
                  உங்கள் பிரச்சினை. <br />
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                    சரியான துறை.
                  </span> எளிய தீர்வு.
                </>
              )}
              {lang === 'hi' && (
                <>
                  आपकी समस्या। <br />
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                    सही विभाग।
                  </span> सरल प्रक्रिया।
                </>
              )}
              {lang === 'en' && (
                <>
                  Your Problem. <br />
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                    The Right Department.
                  </span> One Simple Process.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t('heroDesc')}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/submit"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-base shadow-xl hover:scale-105 transition-all duration-200"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.5]" />
                <span>{t('btnReportNew')}</span>
              </Link>

              <Link
                to="/track"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-base border border-slate-700 shadow-lg hover:border-slate-500 transition-all"
              >
                <Search className="w-5 h-5 text-amber-400" />
                <span>{t('btnTrackStatus')}</span>
              </Link>
            </div>

            {/* Language Quick Pills */}
            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center space-x-1 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span>Supports English, தமிழ் & हिन्दी</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-amber-400">
                <Mic className="w-4 h-4" />
                <span>Voice Speech Enabled</span>
              </span>
            </div>

          </div>

          {/* Right Column: Visual SVG Graphic */}
          <div className="lg:col-span-5">
            <VisualIllustration />
          </div>

        </div>
      </section>

      {/* GEOTAGGING UNIQUE DIFFERENTIATOR BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none"></div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center text-white shadow-lg flex-shrink-0 relative z-10">
            <Navigation className="w-7 h-7" />
          </div>
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-widest mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>★ Unique Feature — GPS-Verified Geotagging</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Every Complaint, Pin-Point Accurate</h3>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              One-tap <span className="text-amber-400 font-bold">“Use My Location”</span> captures GPS, reverse-geocodes via OpenStreetMap to ward & pincode, and shows a draggable map pin with accuracy radius. Field officers get the exact pothole / broken light / garbage pile — not just a street name. <span className="text-emerald-400 font-semibold">Ward auto-detection • No API key • Offline-ready</span>
            </p>
          </div>
          <Link to="/submit" className="relative z-10 inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 text-slate-950 font-black text-sm shadow-lg hover:scale-105 transition-transform flex-shrink-0">
            <MapPin className="w-4 h-4" />
            <span>Try Geotag Now</span>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS / FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            {t('featuresTitle')}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t('feature1Title')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{t('feature1Desc')}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t('feature2Title')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{t('feature2Desc')}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t('feature3Title')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{t('feature3Desc')}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t('feature4Title')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{t('feature4Desc')}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-md hover:border-emerald-400/50 transition-colors relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black">NEW</div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">GPS Geotag & Ward Map</h3>
            <p className="text-sm text-slate-400 leading-relaxed">One-tap GPS capture, draggable OSM pin, ward & pincode auto-detected. Officers see exact location + accuracy radius for 3× faster dispatch.</p>
          </div>

        </div>
      </section>

      {/* CATEGORIES GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Public Service Categories
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select any category to file a targeted complaint to the mapped government department.
            </p>
          </div>
          <Link 
            to="/submit"
            className="inline-flex items-center space-x-1.5 text-sm font-bold text-amber-500 hover:text-amber-400"
          >
            <span>View All Forms</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map(category => (
            <Link key={category.id} to={`/submit?cat=${category.id}`}>
              <CategoryCard category={category} lang={lang} />
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST & ACCESSIBILITY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Built for Every Indian Citizen
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Designed with high-contrast options, large typography adjustments, and native speech recognition in English, தமிழ், and हिन्दी so every citizen can access public services without barriers.
            </p>
            <div className="pt-2">
              <Link
                to="/submit"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400 transition-colors shadow-lg"
              >
                <span>{t('btnReportNew')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
