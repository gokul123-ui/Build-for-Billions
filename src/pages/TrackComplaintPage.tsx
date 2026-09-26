import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getComplaintById, advanceComplaintStatus, getAllComplaints, updateComplaintGeoLocation } from '../services/storageService';
import { GeoTagPicker } from '../components/GeoTagPicker';
import { ComplaintData } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { Timeline } from '../components/Timeline';
import { GeoTagDisplay } from '../components/GeoTagDisplay';
import { 
  Search, 
  Building2, 
  MapPin, 
  Calendar, 
  Sparkles, 
  AlertCircle,
  FileText,
  Play
} from 'lucide-react';

export const TrackComplaintPage: React.FC = () => {
  const { id: urlId } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [searchId, setSearchId] = useState(urlId || '');
  const [complaint, setComplaint] = useState<ComplaintData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [allList, setAllList] = useState<ComplaintData[]>([]);
  const [showGeoEditor, setShowGeoEditor] = useState(false);

  useEffect(() => {
    setAllList(getAllComplaints());
  }, []);

  useEffect(() => {
    if (urlId) {
      setSearchId(urlId);
      handleSearch(urlId);
    } else {
      // Default to first demo complaint if available
      const all = getAllComplaints();
      if (all.length > 0) {
        setSearchId(all[0].id);
        setComplaint(all[0]);
        setHasSearched(true);
      }
    }
  }, [urlId]);

  const handleSearch = (targetId: string) => {
    if (!targetId.trim()) return;
    setHasSearched(true);
    const found = getComplaintById(targetId.trim());
    setComplaint(found);
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchId);
  };

  const handleSimulateNext = () => {
    if (!complaint) return;
    const updated = advanceComplaintStatus(complaint.id);
    if (updated) {
      setComplaint(updated);
      setAllList(getAllComplaints());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white">
        <div className="flex items-center space-x-3 text-amber-400 mb-2">
          <Search className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-widest">Real-Time Grievance Tracker</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          {t('trackTitle')}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          {t('trackSubtitle')}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSubmitSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder={t('trackPlaceholder')}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 text-base font-mono uppercase"
            />
          </div>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm hover:scale-105 transition-transform shadow-lg cursor-pointer"
          >
            {t('btnSearch')}
          </button>
        </form>

        {/* Quick Select Recent Complaints */}
        {allList.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Quick Search:</span>
            {allList.slice(0, 4).map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSearchId(item.id);
                  handleSearch(item.id);
                }}
                className={`px-2.5 py-1 rounded-lg border font-mono font-bold transition-all ${
                  complaint?.id === item.id 
                    ? 'bg-amber-500 text-slate-950 border-amber-500' 
                    : 'bg-slate-950 text-amber-400 border-slate-700 hover:border-amber-500/50'
                }`}
              >
                {item.id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Results Card */}
      {hasSearched && (
        <>
          {complaint ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 text-white shadow-2xl">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-2xl font-black text-amber-400 font-mono tracking-wider">
                      {complaint.id}
                    </span>
                    <StatusBadge status={complaint.status} lang={lang} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {complaint.issueTitle[lang] || complaint.issueTitle.en}
                  </h3>
                </div>

                {/* DEMO PROTOTYPE ACTION BUTTON */}
                <button
                  type="button"
                  onClick={handleSimulateNext}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-colors border border-indigo-400/30 self-start sm:self-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t('btnSimulateNextStep')}</span>
                </button>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-1.5 text-slate-400 font-semibold">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>Department</span>
                  </div>
                  <p className="text-sm font-bold text-white truncate">
                    {complaint.departmentName[lang] || complaint.departmentName.en}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-1.5 text-slate-400 font-semibold">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>Location</span>
                  </div>
                  <p className="text-sm font-bold text-white truncate">
                    {complaint.location}, {complaint.district}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-1.5 text-slate-400 font-semibold">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>{t('dateSubmitted')}</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {new Date(complaint.createdAt).toLocaleDateString(lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN')}
                  </p>
                </div>

              </div>

              {/* AI Summary */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{t('structuredSummary')}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {complaint.aiSummary[lang] || complaint.aiSummary.en}
                </p>
              </div>

              {/* Citizen Original Description */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>{t('originalDescription')}</span>
                </div>
                <p className="text-xs text-slate-400 italic">
                  "{complaint.citizenDescription}"
                </p>
              </div>

              {/* Geotag Map + Retro Geotag Editor */}
              <GeoTagDisplay geo={complaint.geoLocation} />
              {!complaint.geoLocation ? (
                <div className="space-y-3">
                  {!showGeoEditor ? (
                    <button onClick={() => setShowGeoEditor(true)} className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs hover:bg-amber-500/15">
                      <MapPin className="w-4 h-4" />
                      <span>Add GPS Geotag Now — Pin to Government Map</span>
                    </button>
                  ) : (
                    <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-amber-500/30">
                      <p className="text-xs font-bold text-amber-400">Retroactively geotag this complaint (will appear on Gov Unified Map)</p>
                      <GeoTagPicker
                        value={complaint.geoLocation || null}
                        onChange={geo => {
                          if (geo) {
                            const updated = updateComplaintGeoLocation(complaint.id, geo);
                            if (updated) {
                              setComplaint(updated);
                              setAllList(getAllComplaints());
                              setShowGeoEditor(false);
                            }
                          }
                        }}
                      />
                      <button onClick={() => setShowGeoEditor(false)} className="text-xs text-slate-400 hover:text-white">Cancel</button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowGeoEditor(v => !v)}
                  className="text-xs font-bold text-slate-400 hover:text-amber-400 flex items-center space-x-1"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{showGeoEditor ? 'Hide geotag editor' : 'Update geotag / correct pin'}</span>
                </button>
              )}
              {showGeoEditor && complaint.geoLocation && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-700">
                  <GeoTagPicker
                    value={complaint.geoLocation}
                    onChange={geo => {
                      if (geo) {
                        const updated = updateComplaintGeoLocation(complaint.id, geo);
                        if (updated) setComplaint(updated);
                      } else {
                        // clear not allowed via this flow; keep
                      }
                    }}
                  />
                </div>
              )}

              {/* Interactive Timeline Component */}
              <div className="pt-4 border-t border-slate-800">
                <Timeline complaint={complaint} lang={lang} />
              </div>

            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-white space-y-4 shadow-xl">
              <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                {t('notFoundMessage')} <span className="text-amber-400 font-mono">{searchId}</span>
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                {t('enterValidIdPrompt')}
              </p>
            </div>
          )}
        </>
      )}

    </div>
  );
};
