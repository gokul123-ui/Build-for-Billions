import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getComplaintById } from '../services/storageService';
import { ComplaintData } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { GeoTagDisplay } from '../components/GeoTagDisplay';
import { 
  CheckCircle2, 
  Search, 
  History, 
  PlusCircle, 
  Copy, 
  Check, 
  Building2, 
  MapPin,
  Sparkles
} from 'lucide-react';

export const SuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const [complaint, setComplaint] = useState<ComplaintData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getComplaintById(id);
      if (found) {
        setComplaint(found);
      }
    }
  }, [id]);

  const handleCopyId = () => {
    if (id) {
      navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Success Hero Card */}
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
        
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto shadow-lg animate-bounce">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gov Portal Transmission Confirmed</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {t('successTitle')}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            {t('successSubtitle')}
          </p>
        </div>

        {/* Complaint Reference ID Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-md mx-auto space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {t('complaintIdLabel')}
          </span>
          
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-wider">
              {id || 'JNC-2026-0001'}
            </span>
            <button
              onClick={handleCopyId}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
              title="Copy Reference ID"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            {t('keepIdNote')}
          </p>
        </div>

        {/* Department Info */}
        {complaint && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Target Department:</span>
              </span>
              <span className="font-bold text-white">
                {complaint.departmentName[lang] || complaint.departmentName.en}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Location:</span>
              </span>
              <span className="font-bold text-white">
                {complaint.location}, {complaint.district}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400 font-semibold">Initial Status:</span>
              <StatusBadge status={complaint.status} lang={lang} />
            </div>
          </div>
        )}

        {/* Geotag confirmation */}
        {complaint?.geoLocation && (
          <div className="max-w-md mx-auto text-left">
            <GeoTagDisplay geo={complaint.geoLocation} compact />
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={`/track/${id || 'JNC-2026-0001'}`}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-black text-sm hover:bg-amber-400 transition-colors shadow-lg"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>{t('btnTrackStatus')}</span>
          </Link>

          <Link
            to="/history"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-sm border border-slate-700"
          >
            <History className="w-4 h-4 text-amber-400" />
            <span>{t('btnViewHistory')}</span>
          </Link>

          <Link
            to="/submit"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('btnFileAnother')}</span>
          </Link>
        </div>

      </div>

    </div>
  );
};
