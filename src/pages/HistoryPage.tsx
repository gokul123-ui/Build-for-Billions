import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getAllComplaints, resetDemoComplaints } from '../services/storageService';
import { ComplaintData } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { GeoBadge } from '../components/GeoTagDisplay';
import { 
  History, 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Calendar, 
  ArrowRight,
  PlusCircle,
  RotateCcw
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [complaints, setComplaints] = useState<ComplaintData[]>([]);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'RESOLVED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = () => {
    setComplaints(getAllComplaints());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReset = () => {
    resetDemoComplaints();
    loadData();
  };

  // Filtered List
  const filtered = complaints.filter(c => {
    const matchesFilter = 
      filterStatus === 'ALL' ? true :
      filterStatus === 'RESOLVED' ? c.status === 'Resolved' :
      c.status !== 'Resolved';

    const searchLower = searchTerm.toLowerCase();
    const issueText = (c.issueTitle[lang] || c.issueTitle.en).toLowerCase();
    const deptText = (c.departmentName[lang] || c.departmentName.en).toLowerCase();
    const matchesSearch = 
      c.id.toLowerCase().includes(searchLower) ||
      c.location.toLowerCase().includes(searchLower) ||
      c.district.toLowerCase().includes(searchLower) ||
      issueText.includes(searchLower) ||
      deptText.includes(searchLower);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3 text-amber-400 mb-2">
            <History className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">Citizen Grievance Archive</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold">
            {t('historyTitle')}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-1">
            {t('historySubtitle')}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/submit"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm hover:bg-amber-400 transition-colors shadow-lg"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('btnReportNew')}</span>
          </Link>

          <button
            onClick={handleReset}
            className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-750 border border-slate-700 transition-colors"
            title={t('btnResetDemoData')}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Status Filter Pills */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-1 flex-shrink-0" />
          
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'ALL'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {t('filterAll')} ({complaints.length})
          </button>

          <button
            onClick={() => setFilterStatus('ACTIVE')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'ACTIVE'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {t('filterActive')} ({complaints.filter(c => c.status !== 'Resolved').length})
          </button>

          <button
            onClick={() => setFilterStatus('RESOLVED')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'RESOLVED'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {t('filterResolved')} ({complaints.filter(c => c.status === 'Resolved').length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs font-medium focus:border-amber-500"
          />
        </div>

      </div>

      {/* Complaints Grid / List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-lg font-black text-amber-400 font-mono tracking-wider">
                    {item.id}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <GeoBadge geo={item.geoLocation} />
                    <StatusBadge status={item.status} lang={lang} />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {item.issueTitle[lang] || item.issueTitle.en}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-400">
                  <p className="flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{item.departmentName[lang] || item.departmentName.en}</span>
                  </p>

                  <p className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    <span>{item.location}, {item.district}</span>
                    {item.geoLocation && <span className="ml-1 font-mono text-[10px] text-slate-500">• {item.geoLocation.latitude.toFixed(4)}, {item.geoLocation.longitude.toFixed(4)}</span>}
                  </p>

                  <p className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{t('dateSubmitted')}: {new Date(item.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium italic truncate max-w-[200px]">
                  "{item.citizenDescription}"
                </span>

                <Link
                  to={`/track/${item.id}`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>Track Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-4 shadow-xl">
          <p className="text-base">{t('noRecentComplaints')}</p>
          <Link
            to="/submit"
            className="inline-block px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm"
          >
            {t('btnReportNew')}
          </Link>
        </div>
      )}

    </div>
  );
};
