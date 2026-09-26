import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getAllComplaints } from '../services/storageService';
import { ComplaintData } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { GeoBadge } from '../components/GeoTagDisplay';
import { ComplaintMapOverview } from '../components/ComplaintMapOverview';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  PlusCircle, 
  Search, 
  History, 
  ArrowRight,
  Building2,
  MapPin,
  MapPinned
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [complaints, setComplaints] = useState<ComplaintData[]>([]);

  useEffect(() => {
    setComplaints(getAllComplaints());
  }, []);

  const total = complaints.length;
  const submitted = complaints.filter(c => c.status === 'Submitted' || c.status === 'Under Review').length;
  const inProgress = complaints.filter(c => c.status === 'Assigned' || c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3 text-amber-400 mb-2">
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">Citizen Overview</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold">
            Citizen Grievance Dashboard
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-1">
            Real-time analytics and tracking summary for all your submitted public service grievances.
          </p>
        </div>

        <Link
          to="/submit"
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm shadow-xl hover:scale-105 transition-transform"
        >
          <PlusCircle className="w-5 h-5 stroke-[2.5]" />
          <span>{t('btnReportNew')}</span>
        </Link>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('statsTotal')}</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{total}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('statsSubmitted')}</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-amber-400">{submitted}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('statsInProgress')}</span>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-orange-400">{inProgress}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('statsResolved')}</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-emerald-400">{resolved}</p>
        </div>

      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link 
          to="/submit"
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 shadow-md group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
            <PlusCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-400">{t('btnReportNew')}</h3>
          <p className="text-xs text-slate-400">File a new grievance with automatic AI department mapping.</p>
        </Link>

        <Link 
          to="/track"
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 shadow-md group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-400">{t('btnTrackStatus')}</h3>
          <p className="text-xs text-slate-400">Track resolution progress timeline with official reference ID.</p>
        </Link>

        <Link 
          to="/history"
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 shadow-md group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <History className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-400">{t('btnViewHistory')}</h3>
          <p className="text-xs text-slate-400">Review complete log of all past complaints and department notes.</p>
        </Link>

      </div>

      {/* Gov Unified Map CTA */}
      <Link to="/government" className="block bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 border border-amber-500/30 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-amber-500/50 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-slate-950">
            <MapPinned className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-black text-white">Government Unified Map — All Problems Pinned</p>
            <p className="text-xs text-slate-400">Single map • Every geotagged complaint • Filter by status/category • Ward clusters</p>
          </div>
        </div>
        <span className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs">Open Gov Map →</span>
      </Link>

      {/* Geotagged Map Overview - UNIQUE FEATURE */}
      <ComplaintMapOverview complaints={complaints} />

      {/* Recent Activity List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">{t('recentComplaintsTitle')}</h3>
          <Link to="/history" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {complaints.length > 0 ? (
          <div className="space-y-4">
            {complaints.slice(0, 5).map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-amber-400 text-sm">{item.id}</span>
                    <StatusBadge status={item.status} lang={lang} />
                    <GeoBadge geo={item.geoLocation} />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {item.issueTitle[lang] || item.issueTitle.en}
                  </h4>
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.departmentName[lang] || item.departmentName.en}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                <Link
                  to={`/track/${item.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-slate-700 self-start sm:self-auto"
                >
                  Track Status
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-6">{t('noRecentComplaints')}</p>
        )}
      </div>

    </div>
  );
};
