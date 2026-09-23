import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { classifyComplaint } from '../services/aiClassifier';
import { startSpeechRecognition, stopSpeechRecognition, isSpeechRecognitionSupported } from '../services/speechRecognition';
import { AnalysisResult } from '../types';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  AlertCircle, 
  Loader2,
  PlayCircle
} from 'lucide-react';

export const SubmitComplaintPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Form State
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState(lang === 'ta' ? 'சென்னை' : lang === 'hi' ? 'जयपुर' : 'Chennai');
  const [state, setState] = useState(lang === 'ta' ? 'தமிழ்நாடு' : lang === 'hi' ? 'राजस्थान' : 'Tamil Nadu');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // Analysis Loading State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const speechSupported = isSpeechRecognitionSupported();

  // Update default district/state when language changes
  useEffect(() => {
    if (!district || district === 'Chennai' || district === 'சென்னை' || district === 'जयपुर') {
      setDistrict(lang === 'ta' ? 'சென்னை' : lang === 'hi' ? 'जयपुर' : 'Chennai');
    }
    if (!state || state === 'Tamil Nadu' || state === 'தமிழ்நாடு' || state === 'राजस्थान') {
      setState(lang === 'ta' ? 'தமிழ்நாடு' : lang === 'hi' ? 'राजस्थान' : 'Tamil Nadu');
    }
  }, [lang]);

  // Handle Preset Samples (Demo Mode)
  const loadPresetSample = (presetType: 'water_ta' | 'water_hi' | 'water_en' | 'garbage_ta' | 'pothole_hi') => {
    switch (presetType) {
      case 'water_ta':
        setDescription('எங்கள் பகுதியில் கடந்த மூன்று நாட்களாக குடிநீர் வரவில்லை.');
        setLocation('அண்ணா நகர் 4வது தெரு');
        setDistrict('சென்னை');
        setState('தமிழ்நாடு');
        break;
      case 'water_hi':
        setDescription('हमारे इलाके में पिछले तीन दिनों से पानी की आपूर्ति नहीं हो रही है।');
        setLocation('वैशाली नगर मुख्य चौराहा');
        setDistrict('जयपुर');
        setState('राजस्थान');
        break;
      case 'water_en':
        setDescription('There has been no drinking water supply in our area for three days.');
        setLocation('Indiranagar 100ft Road');
        setDistrict('Bengaluru');
        setState('Karnataka');
        break;
      case 'garbage_ta':
        setDescription('எங்கள் வீட்டின் அருகில் குப்பைகள் அகற்றப்படாமல் துர்நாற்றம் வீசுகிறது.');
        setLocation('காந்தி ரோடு, ரேஸ் கோர்ஸ்');
        setDistrict('கோயம்புத்தூர்');
        setState('தமிழ்நாடு');
        break;
      case 'pothole_hi':
        setDescription('मुख्य मार्ग पर बड़े-बड़े गड्ढे हैं, जिससे दुर्घटना का खतरा है।');
        setLocation('लक्ष्मी नगर मेट्रो स्टेशन के पास');
        setDistrict('दिल्ली');
        setState('दिल्ली NCR');
        break;
    }
    setErrorMessage(null);
  };

  // Toggle Voice Input
  const handleToggleVoice = () => {
    if (!speechSupported) {
      setVoiceError(t('voiceNotSupported'));
      return;
    }

    if (isListening) {
      stopSpeechRecognition();
      setIsListening(false);
    } else {
      setVoiceError(null);
      setIsListening(true);
      startSpeechRecognition(
        lang,
        (text) => {
          setDescription(prev => prev ? `${prev} ${text}` : text);
        },
        (err) => {
          setVoiceError(err);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  // Handle Form Submission -> AI Analysis
  const handleAnalyzeAndReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      setErrorMessage(t('errorEmptyDesc'));
      return;
    }
    if (!location.trim()) {
      setErrorMessage(t('errorEmptyLoc'));
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);

    try {
      // Run AI Classification (with optional API key or rule-based engine)
      const aiResult: AnalysisResult = await classifyComplaint(description, lang);

      setIsAnalyzing(false);

      // Navigate to Review Screen with state payload
      navigate('/review', {
        state: {
          draftComplaint: {
            citizenDescription: description,
            location,
            district,
            state,
            contactName,
            contactPhone,
            contactEmail,
            categoryId: aiResult.categoryId,
            categoryName: aiResult.categoryName,
            departmentName: aiResult.departmentName,
            issueTitle: aiResult.issueTitle,
            priority: aiResult.priority,
            aiSummary: aiResult.aiSummary,
            requestedAction: aiResult.requestedAction
          }
        }
      });
    } catch (err) {
      console.error("AI Analysis error:", err);
      setIsAnalyzing(false);
      setErrorMessage(t('errorAIProcessing'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white">
        <div className="flex items-center space-x-3 text-amber-400 mb-2">
          <Sparkles className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-widest">Step 1 of 3: Grievance Details</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          {t('submitTitle')}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          {t('submitSubtitle')}
        </p>
      </div>

      {/* DEMO MODE PRESETS */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-white">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-3">
          <PlayCircle className="w-5 h-5" />
          <span>{t('demoPresetsTitle')}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadPresetSample('water_ta')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/40 transition-colors"
          >
            💧 {t('presetWaterTa')}
          </button>
          <button
            type="button"
            onClick={() => loadPresetSample('water_hi')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/40 transition-colors"
          >
            💧 {t('presetWaterHi')}
          </button>
          <button
            type="button"
            onClick={() => loadPresetSample('water_en')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/40 transition-colors"
          >
            💧 English: Drinking Water Issue
          </button>
          <button
            type="button"
            onClick={() => loadPresetSample('garbage_ta')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/40 transition-colors"
          >
            🗑️ {t('presetGarbageTa')}
          </button>
          <button
            type="button"
            onClick={() => loadPresetSample('pothole_hi')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/40 transition-colors"
          >
            🛣️ {t('presetRoadHi')}
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleAnalyzeAndReview} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-xl">
        
        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-sm font-semibold flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Problem Description & Voice Button */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-slate-200">
              {t('labelDescription')} <span className="text-red-400">*</span>
            </label>
            
            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                isListening
                  ? 'bg-red-500 text-white border-red-400 mic-active shadow-lg'
                  : 'bg-slate-800 text-amber-400 border-slate-700 hover:border-amber-500/50 hover:bg-slate-750'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isListening ? t('btnStopListening') : t('btnSpeakComplaint')}</span>
            </button>
          </div>

          {isListening && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-semibold animate-pulse">
              {t('voiceListening')} (Language locale: {lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN'})
            </div>
          )}

          {voiceError && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
              {voiceError}
            </div>
          )}

          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('placeholderDescription')}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-base leading-relaxed"
            required
          />
        </div>

        {/* Location Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="md:col-span-1 space-y-2">
            <label className="block text-sm font-bold text-slate-200">
              {t('labelLocation')} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('placeholderLocation')}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 text-sm font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-200">
              {t('labelDistrict')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder={t('placeholderDistrict')}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 text-sm font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-200">
              {t('labelState')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder={t('placeholderState')}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 text-sm font-medium"
              required
            />
          </div>

        </div>

        {/* Optional Contact Details */}
        <div className="border-t border-slate-800 pt-6 space-y-4">
          <h3 className="text-base font-bold text-slate-300">
            Contact Information (Optional)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400">
                {t('labelContactName')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder={t('placeholderContactName')}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400">
                {t('labelContactPhone')}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder={t('placeholderContactPhone')}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400">
                {t('labelContactEmail')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder={t('placeholderContactEmail')}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 text-sm"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Submit Action Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-base shadow-xl hover:scale-105 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Complaint with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
                <span>{t('btnAnalyzeAI')}</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
