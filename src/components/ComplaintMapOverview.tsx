import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ComplaintData } from '../types';
import { MapPin, Navigation } from 'lucide-react';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export const ComplaintMapOverview: React.FC<{ complaints: ComplaintData[] }> = ({ complaints }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const geotagged = complaints.filter(c => c.geoLocation);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    if (geotagged.length === 0) return;

    const centerLat = geotagged.reduce((s, c) => s + (c.geoLocation!.latitude), 0) / geotagged.length;
    const centerLng = geotagged.reduce((s, c) => s + (c.geoLocation!.longitude), 0) / geotagged.length;

    const map = L.map(mapRef.current).setView([centerLat, centerLng], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const bounds = L.latLngBounds([]);
    geotagged.forEach(c => {
      const g = c.geoLocation!;
      const color =
        c.status === 'Resolved' ? '#10b981' :
        c.status === 'In Progress' || c.status === 'Assigned' ? '#f59e0b' :
        '#ef4444';
      const marker = L.circleMarker([g.latitude, g.longitude], {
        radius: 10,
        fillColor: color,
        color: '#fff',
        weight: 2,
        fillOpacity: 0.9,
      }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 180px">
          <b style="color:#0f172a">${c.id}</b> <span style="font-size:10px; background:${color}; color:#fff; padding:2px 6px; border-radius:999px">${c.status}</span><br/>
          <span style="font-size:12px; font-weight:700">${c.issueTitle.en}</span><br/>
          <span style="font-size:11px; color:#475569">${c.location}, ${c.district}</span><br/>
          <a href="/track/${c.id}" style="font-size:11px; color:#d97706; font-weight:700">Track →</a>
        </div>
      `);
      bounds.extend([g.latitude, g.longitude]);
    });

    if (geotagged.length > 1) map.fitBounds(bounds.pad(0.3));
    else map.setView([centerLat, centerLng], 11);

    mapInstanceRef.current = map;
    return () => { map.remove(); mapInstanceRef.current = null; };
  }, [geotagged]);

  if (geotagged.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-2">
        <MapPin className="w-8 h-8 text-slate-600 mx-auto" />
        <p className="text-sm font-bold text-slate-300">No geotagged complaints yet</p>
        <p className="text-xs text-slate-500">File complaints with GPS to see ward-level heatmap and cluster routing here.</p>
      </div>
    );
  }

  const pct = Math.round((geotagged.length / complaints.length) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 text-amber-400">
          <Navigation className="w-5 h-5" />
          <h3 className="text-base font-black">Geotagged Complaints Map</h3>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">{geotagged.length}/{complaints.length} • {pct}% GPS-verified</span>
        </div>
        <span className="hidden sm:inline text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ward-level clustering • Live OSM</span>
      </div>
      <div ref={mapRef} style={{ height: '340px', width: '100%', borderRadius: '16px' }} className="border border-slate-700 overflow-hidden z-0" />
      <div className="flex flex-wrap gap-2 text-[11px] font-bold">
        <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-red-500 border-2 border-white inline-block"></span><span className="text-slate-400">Submitted/Review</span></span>
        <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white inline-block"></span><span className="text-slate-400">In Progress</span></span>
        <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white inline-block"></span><span className="text-slate-400">Resolved</span></span>
        <span className="ml-auto text-slate-500 font-medium">Click markers for details • Helps departments prioritize by density</span>
      </div>
    </div>
  );
};
