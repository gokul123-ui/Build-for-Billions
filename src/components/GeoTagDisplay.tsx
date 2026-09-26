import React from 'react';
import { MapPin, Crosshair, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';
import { GeoLocation } from '../types';
import { formatAccuracy, getOSMViewUrl, getGoogleMapsUrl } from '../services/geolocationService';
import { MiniLeafletMap } from './LeafletMap';

interface GeoTagDisplayProps {
  geo?: GeoLocation | null;
  compact?: boolean;
}

export const GeoTagDisplay: React.FC<GeoTagDisplayProps> = ({ geo, compact = false }) => {
  if (!geo) {
    return (
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-3 text-slate-500 text-xs">
        <MapPin className="w-5 h-5 text-slate-600" />
        <span>No geotag attached — location was entered as text only. Field team will verify address manually.</span>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden ${compact ? 'p-4' : ''}`}>
      {!compact && (
        <div className="p-4 pb-0 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400">
            <Navigation className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">Geotagged Location</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>GPS VERIFIED</span>
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase">{geo.source || 'gps'}</span>
        </div>
      )}

      <div className={compact ? 'space-y-3' : 'p-4 space-y-3'}>
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-slate-900 text-amber-300 border border-slate-700 text-[11px] font-mono font-bold">
            {geo.latitude.toFixed(6)}, {geo.longitude.toFixed(6)}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700 text-[11px] font-semibold flex items-center space-x-1">
            <Crosshair className="w-3 h-3" />
            <span>{formatAccuracy(geo.accuracy)}</span>
          </span>
          {geo.ward && <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold">{geo.ward}</span>}
          {geo.pincode && <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700 text-[11px] font-mono">{geo.pincode}</span>}
        </div>

        {geo.address && <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-2.5 rounded-xl border border-slate-800">{geo.address}</p>}

        <MiniLeafletMap geo={geo} height={compact ? '140px' : '220px'} />

        <div className="flex items-center gap-3 text-[11px] font-bold">
          <a href={getOSMViewUrl(geo.latitude, geo.longitude)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-amber-400 hover:text-amber-300">
            <ExternalLink className="w-3 h-3" /><span>View on OSM</span>
          </a>
          <span className="text-slate-600">•</span>
          <a href={getGoogleMapsUrl(geo.latitude, geo.longitude)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-emerald-400 hover:text-emerald-300">
            <ExternalLink className="w-3 h-3" /><span>Google Maps</span>
          </a>
          <span className="ml-auto text-[10px] font-mono text-slate-500">{geo.timestamp ? new Date(geo.timestamp).toLocaleString() : ''}</span>
        </div>
      </div>
    </div>
  );
};

export const GeoBadge: React.FC<{ geo?: GeoLocation | null }> = ({ geo }) => {
  if (!geo) return <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-bold flex items-center space-x-1"><MapPin className="w-3 h-3" /><span>No GPS</span></span>;
  return (
    <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center space-x-1">
      <Navigation className="w-3 h-3" /><span>Geotagged</span>
    </span>
  );
};
