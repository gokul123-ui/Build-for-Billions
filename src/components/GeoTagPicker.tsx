import React, { useState } from 'react';
import { MapPin, Navigation, Loader2, Trash2, Crosshair, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { GeoLocation } from '../types';
import { getCurrentLocation, reverseGeocode, formatAccuracy, computeWardHint, getOSMViewUrl, getGoogleMapsUrl } from '../services/geolocationService';
import { LeafletMap } from './LeafletMap';

interface GeoTagPickerProps {
  value: GeoLocation | null | undefined;
  onChange: (geo: GeoLocation | null) => void;
  onAddressResolved?: (result: { district?: string; state?: string; displayName?: string }) => void;
  lang?: string;
}

export const GeoTagPicker: React.FC<GeoTagPickerProps> = ({ value, onChange, onAddressResolved }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reverseLoading, setReverseLoading] = useState(false);
  const [consent, setConsent] = useState(!!value);

  const handleUseCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const geo = await getCurrentLocation();
      // Try reverse geocode to enrich
      setReverseLoading(true);
      try {
        const rev = await reverseGeocode(geo.latitude, geo.longitude);
        geo.address = rev.displayName;
        geo.ward = rev.ward || computeWardHint(geo.latitude, geo.longitude);
        geo.pincode = rev.pincode;
        if (onAddressResolved) onAddressResolved({ district: rev.district, state: rev.state, displayName: rev.displayName });
      } catch {
        geo.ward = computeWardHint(geo.latitude, geo.longitude);
      } finally {
        setReverseLoading(false);
      }
      onChange(geo);
      setConsent(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes('denied') || msg.includes('permission')) {
        setError('Location permission denied. Please allow location access in browser settings or pick manually on map.');
      } else if (msg.includes('timeout')) {
        setError('Location request timed out. Try again outdoors or pick on map.');
      } else {
        setError(`Unable to get location: ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualLatLng = (latStr: string, lngStr: string) => {
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setError('Invalid coordinates. Latitude -90..90, Longitude -180..180');
      return;
    }
    setError(null);
    onChange({
      latitude: lat,
      longitude: lng,
      accuracy: value?.accuracy,
      address: value?.address,
      ward: value?.ward,
      pincode: value?.pincode,
      timestamp: new Date().toISOString(),
      source: 'manual',
    });
  };

  const handleMapChange = async (newGeo: GeoLocation) => {
    setReverseLoading(true);
    try {
      const rev = await reverseGeocode(newGeo.latitude, newGeo.longitude);
      newGeo.address = rev.displayName;
      newGeo.ward = rev.ward || computeWardHint(newGeo.latitude, newGeo.longitude);
      newGeo.pincode = rev.pincode;
      if (onAddressResolved) onAddressResolved({ district: rev.district, state: rev.state, displayName: rev.displayName });
    } catch {
      newGeo.ward = computeWardHint(newGeo.latitude, newGeo.longitude);
    } finally {
      setReverseLoading(false);
    }
    onChange(newGeo);
  };

  const handleClear = () => {
    onChange(null);
    setError(null);
    setConsent(false);
  };

  return (
    <div className="space-y-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-amber-400">
            <MapPin className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase tracking-wider">Geotag Complaint Location</h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">UNIQUE • GPS VERIFIED</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Pin the exact spot so field teams reach faster. Uses GPS + OSM map — no manual department hunting. Privacy-first: location is optional and stored only with your consent.
          </p>
        </div>
        {value && (
          <button type="button" onClick={handleClear} className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/30">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Consent toggle */}
      <label className="flex items-center space-x-2 text-xs bg-slate-900 p-3 rounded-xl border border-slate-800 cursor-pointer">
        <input type="checkbox" checked={consent} onChange={(e) => {
          setConsent(e.target.checked);
          if (!e.target.checked) handleClear();
        }} className="w-4 h-4 accent-amber-500" />
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span className="text-slate-300 font-medium">I consent to attach precise GPS coordinates to this grievance for faster field verification (optional, encrypted at rest in production).</span>
      </label>

      {consent && (
        <>
          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={loading}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md hover:scale-[1.02] disabled:opacity-50 transition-all"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
              <span>{loading ? 'Locating…' : 'Use My Current Location'}</span>
            </button>
            <span className="inline-flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">or pick on map</span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Coords display / manual edit */}
          {value ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Latitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={value.latitude}
                    onChange={(e) => handleManualLatLng(e.target.value, String(value.longitude))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Longitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={value.longitude}
                    onChange={(e) => handleManualLatLng(String(value.latitude), e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className={`px-2.5 py-1 rounded-full font-bold border ${value.accuracy && value.accuracy < 30 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : value.accuracy && value.accuracy < 100 ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                  <Crosshair className="w-3 h-3 inline mr-1" />
                  {formatAccuracy(value.accuracy)}
                </span>
                {value.ward && <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-bold">{value.ward} • Auto-detected jurisdiction</span>}
                {value.pincode && <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">{value.pincode}</span>}
                {value.source && <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 capitalize">{value.source}</span>}
              </div>

              {value.address && (
                <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400">Reverse-geocoded address:</span> {value.address}
                </p>
              )}

              {reverseLoading && <p className="text-xs text-amber-400 flex items-center space-x-2"><Loader2 className="w-3 h-3 animate-spin" /><span>Resolving address from coordinates…</span></p>}

              <div className="flex gap-2">
                <a href={getOSMViewUrl(value.latitude, value.longitude)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-xs font-bold text-amber-400 hover:text-amber-300">
                  <ExternalLink className="w-3 h-3" /><span>Open in OSM</span>
                </a>
                <span className="text-slate-600">•</span>
                <a href={getGoogleMapsUrl(value.latitude, value.longitude)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-400 hover:text-emerald-300">
                  <ExternalLink className="w-3 h-3" /><span>Open in Google Maps</span>
                </a>
              </div>

              {/* Interactive Map */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Drag pin or click map to adjust • Accuracy radius shown</p>
                <LeafletMap geo={value} interactive={true} onChange={handleMapChange} height="300px" zoom={16} />
                <p className="text-[10px] text-slate-500">Tip: If GPS is 100m+ off, drag the pin to the exact pothole / broken light / overflowing bin.</p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-6 text-center space-y-3">
              <MapPin className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">No geotag yet. Tap “Use My Current Location” or enter coordinates. You can also drag the pin after locating.</p>
              <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                <input type="number" placeholder="Latitude e.g. 13.0827" step="0.000001" onBlur={(e) => {
                  const lngInput = (e.target.parentElement?.nextElementSibling?.querySelector('input') as HTMLInputElement)?.value;
                  if (e.target.value && lngInput) handleManualLatLng(e.target.value, lngInput);
                }} className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono placeholder-slate-500" />
                <input type="number" placeholder="Longitude e.g. 80.2707" step="0.000001" onBlur={(e) => {
                  const latInput = (e.target.parentElement?.previousElementSibling?.querySelector('input') as HTMLInputElement)?.value;
                  if (e.target.value && latInput) handleManualLatLng(latInput, e.target.value);
                }} className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono placeholder-slate-500" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
