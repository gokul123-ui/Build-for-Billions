import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { saveComplaint } from '../services/storageService';
import { Priority } from '../types';
import { GeoTagDisplay } from '../components/GeoTagDisplay';
import { 
  Building2, 
  MapPin, 
  Tag, 
  FileText, 
  Send, 
  Edit3, 
  X, 
  ShieldAlert,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ReviewComplaintPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const draft = location.state?.draftComplaint;

  if (!draft) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No complaint data found to review.</h2>
        <p className="text-slate-400">Please fill out a complaint first.</p>
        <Link
          to="/submit"
          className="inline-block px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold"
        >
          {t('btnReportNew')}
        </Link>
      </div>
    );
  }

  const categoryLabel = draft.categoryName[lang] || draft.categoryName.en;
  const deptLabel = draft.departmentName[lang] || draft.departmentName.en;
  const summaryText = draft.aiSummary[lang] || draft.aiSummary.en;
  const actionText = draft.requestedAction[lang] || draft.requestedAction.en;
  const issueTitleText = draft.issueTitle[lang] || draft.issueTitle.en;

  const handleConfirmSubmit = () => {
    // Save complaint to localStorage via storage service
    const saved = saveComplaint(draft);
    // Navigate to success page
    navigate(`/success/${saved.id}`);
  };

  const priorityColor = (p: Priority) => {
    switch (p) {
      case 'High':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white">
        <div className="flex items-center space-x-3 text-amber-400 mb-2">
          <Sparkles className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-widest">Step 2 of 3: Verification & Review</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          {t('reviewTitle')}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          {t('reviewSubtitle')}
        </p>
      </div>

      {/* Complaint Preview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-2xl">
        
        {/* Header Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-800">
          
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('detectedIssue')}</span>
            <h3 className="text-xl font-bold text-amber-400">{issueTitleText}</h3>
          </div>

          <div className="space-y-1 md:text-right">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('priorityLevel')}</span>
            <div>
              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${priorityColor(draft.priority)}`}>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{draft.priority === 'High' ? t('priorityHigh') : draft.priority === 'Medium' ? t('priorityMedium') : t('priorityLow')}</span>
              </span>
            </div>
          </div>

        </div>

        {/* Detailed Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Category */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>{t('category')}</span>
            </div>
            <p className="text-base font-bold text-white">{categoryLabel}</p>
          </div>

          {/* Target Department */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>{t('targetDepartment')}</span>
            </div>
            <p className="text-base font-bold text-white">{deptLabel}</p>
          </div>

        </div>

        {/* Location Details */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold">
            <MapPin className="w-4 h-4 text-red-400" />
            <span>{t('locationDetails')}</span>
          </div>
          <p className="text-base font-semibold text-white">
            {draft.location}, {draft.district}, {draft.state}
          </p>
          {draft.geoLocation && draft.geoLocation.address && (
            <p className="text-xs text-slate-400 mt-1">📍 GPS: {draft.geoLocation.address}</p>
          )}
        </div>

        {/* Geotag Map Verification */}
        <GeoTagDisplay geo={draft.geoLocation || null} />

        {/* Citizen Original Description */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{t('originalDescription')}</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            "{draft.citizenDescription}"
          </p>
        </div>

        {/* AI Structured Summary */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-950 border border-indigo-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>{t('structuredSummary')} ({lang.toUpperCase()})</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {summaryText}
          </p>
        </div>

        {/* Requested Department Action */}
        <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('requestedAction')}</span>
          </div>
          <p className="text-sm text-emerald-200 leading-relaxed font-medium">
            {actionText}
          </p>
        </div>

        {/* Review Action Buttons */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-sm border border-slate-700"
          >
            <Edit3 className="w-4 h-4" />
            <span>{t('btnEditComplaint')}</span>
          </button>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 font-bold text-sm"
            >
              <X className="w-4 h-4" />
              <span>{t('btnCancel')}</span>
            </Link>

            <button
              type="button"
              onClick={handleConfirmSubmit}
              className="inline-flex items-center justify-center space-x-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-base shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              <Send className="w-5 h-5 stroke-[2.5]" />
              <span>{t('btnSubmitPortal')}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
