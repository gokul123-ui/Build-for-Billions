import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { getAllComplaints } from '../services/storageService';
import { ComplaintData, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { useLanguage } from '../hooks/useLanguage';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { PriorityQueue } from '../components/PriorityQueue';
import { getPriorityMeta, sortByPriority, getSLAStatus } from '../services/priorityService';
import {
  MapPin,
  Navigation,
  Layers,
  Filter,
  Search,
  Building2,
  Eye,
  AlertTriangle,
  FileText,
  ExternalLink,
  Siren,
  ArrowUpDown,
} from 'lucide-react';
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

const statusColor = (s: string) => {
  if (s === 'Resolved') return '#10b981';
  if (s === 'In Progress' || s === 'Assigned') return '#f59e0b';
  if (s === 'Under Review') return '#3b82f6';
  return '#ef4444';
};

const categoryColor = (id: CategoryId): string => {
  const map: Record<string, string> = {
    water: '#0ea5e9',
    electricity: '#f59e0b',
    roads: '#475569',
    street_lights: '#facc15',
    garbage: '#16a34a',
    drainage: '#0891b2',
    transport: '#7c3aed',
    healthcare: '#dc2626',
    sanitation: '#059669',
    certificates: '#6366f1',
    property_tax: '#a16207',
    police: '#1e40af',
    schemes: '#9333ea',
    other: '#64748b',
  };
  return map[id] || '#64748b';
};

const priorityColor = (p: string) => getPriorityMeta(p as never).color;
const priorityRadius = (p: string) => {
  if (p === 'Emergency') return 16;
  if (p === 'Urgent') return 13;
  if (p === 'High') return 11;
  if (p === 'Medium') return 9;
  return 7;
};

export const GovernmentMapPage: React.FC = () => {
  const { lang } = useLanguage();
  const [complaints, setComplaints] = useState<ComplaintData[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [priorityOrder, setPriorityOrder] = useState<boolean>(true);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    setComplaints(getAllComplaints());
  }, []);

  const geotagged = useMemo(() => complaints.filter(c => c.geoLocation), [complaints]);
  const nonGeotagged = useMemo(() => complaints.filter(c => !c.geoLocation), [complaints]);

  const filtered = useMemo(() => {
    const base = geotagged.filter(c => {
      const matchStatus = filterStatus === 'ALL' ? true : c.status === filterStatus;
      const matchCat = filterCategory === 'ALL' ? true : c.categoryId === filterCategory;
      const matchPri = filterPriority === 'ALL' ? true : c.priority === filterPriority;
      const s = search.toLowerCase();
      const matchSearch = !s
        ? true
        : c.id.toLowerCase().includes(s) ||
          c.location.toLowerCase().includes(s) ||
          c.district.toLowerCase().includes(s) ||
          (c.issueTitle[lang] || c.issueTitle.en).toLowerCase().includes(s) ||
          (c.departmentName[lang] || c.departmentName.en).toLowerCase().includes(s);
      return matchStatus && matchCat && matchPri && matchSearch;
    });
    return priorityOrder ? sortByPriority(base) : base;
  }, [geotagged, filterStatus, filterCategory, filterPriority, search, lang, priorityOrder]);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when filtered changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();

    if (filtered.length === 0) return;

    const bounds = L.latLngBounds([]);
    filtered.forEach(c => {
      const g = c.geoLocation!;
      const pMeta = getPriorityMeta(c.priority);
      const sColor = statusColor(c.status);

      // Radius by priority (Emergency largest, pulsing via weight), fill = priority color, outer = status
      const marker = L.circleMarker([g.latitude, g.longitude], {
        radius: selectedId === c.id ? priorityRadius(c.priority) + 2 : priorityRadius(c.priority),
        fillColor: pMeta.color,
        color: selectedId === c.id ? '#fbbf24' : sColor,
        weight: selectedId === c.id ? 4 : c.priority === 'Emergency' ? 4 : 3,
        fillOpacity: 0.95,
      });
      marker.addTo(layer);
      const sla = getSLAStatus(c);
      const popupHtml = `
        <div style="font-family: sans-serif; min-width:240px; max-width:280px">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px">
            <span style="font-family:monospace; font-weight:900; color:#0f172a; font-size:13px">${c.id}</span>
            <span style="font-size:10px; background:${pMeta.color}; color:#fff; padding:2px 6px; border-radius:999px; font-weight:800">${pMeta.shortLabel} • ${pMeta.slaLabel}</span>
            <span style="font-size:10px; background:${sColor}; color:#fff; padding:2px 6px; border-radius:999px; font-weight:700">${c.status}</span>
          </div>
          <div style="font-size:13px; font-weight:800; color:#0f172a; line-height:1.3">${c.issueTitle[lang] || c.issueTitle.en}</div>
          <div style="font-size:11px; color:#475569; margin:4px 0">${c.location}, ${c.district} • ${c.geoLocation?.ward || ''}</div>
          <div style="font-size:10px; color:${sla === 'overdue' ? '#dc2626' : sla === 'due_soon' ? '#d97706' : '#475569'}; font-weight:700; margin-bottom:4px">${pMeta.icon} ${pMeta.queueName} • SLA ${sla.toUpperCase()}</div>
          <div style="font-size:11px; color:#334155; background:#f8fafc; padding:6px; border-radius:8px; margin:6px 0; border:1px solid #e2e8f0">${(c.aiSummary[lang] || c.aiSummary.en).slice(0,120)}...</div>
          <div style="display:flex; gap:6px; font-size:11px; margin-top:6px">
            <a href="/track/${c.id}" style="background:#f59e0b; color:#0f172a; padding:6px 10px; border-radius:8px; font-weight:800; text-decoration:none">Track →</a>
            <a href="https://www.openstreetmap.org/?mlat=${g.latitude}&mlon=${g.longitude}#map=16/${g.latitude}/${g.longitude}" target="_blank" style="background:#0f172a; color:#fff; padding:6px 10px; border-radius:8px; font-weight:700; text-decoration:none">OSM</a>
          </div>
        </div>
      `;
      marker.bindPopup(popupHtml);
      marker.on('click', () => setSelectedId(c.id));
      bounds.extend([g.latitude, g.longitude]);
    });

    if (filtered.length === 1) {
      const g = filtered[0].geoLocation!;
      map.setView([g.latitude, g.longitude], 14);
    } else {
      map.fitBounds(bounds.pad(0.25));
    }
  }, [filtered, lang, selectedId]);

  const selected = selectedId ? complaints.find(c => c.id === selectedId) : null;

  const statuses = ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved'];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-amber-400">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-slate-950">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">Government Unified View</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">ALL PROBLEMS PINNED</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">Government Grievance Map — Single Map, All Complaints • Priority Ordered</h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every geotagged grievance pinned together, <span className="text-red-400 font-bold">priority-ordered</span> (Emergency 24h → Low 14d). Officers work in order, see SLA countdown, and dispatch via GPS — no street-name hunting.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-white">{complaints.length} Total</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">{geotagged.length} Geotagged • {complaints.length ? Math.round((geotagged.length / complaints.length) * 100) : 0}%</span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">{nonGeotagged.length} Without GPS (text-only)</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-w-[200px]">
            <Link to="/submit" className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm shadow-lg">
              <MapPin className="w-4 h-4" />
              <span>Geotag New Complaint</span>
            </Link>
            <Link to="/dashboard" className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Citizen Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters + Priority */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-400 uppercase">Filters</span>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white">
              <option value="ALL">All Statuses ({geotagged.length})</option>
              {statuses.map(s => (
                <option key={s} value={s}>
                  {s} ({geotagged.filter(c => c.status === s).length})
                </option>
              ))}
            </select>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white">
              <option value="ALL">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name.en}
                </option>
              ))}
            </select>
            <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white">
              <option value="ALL">All Priorities</option>
              <option value="Emergency">🚨 Emergency ({geotagged.filter(c => c.priority === 'Emergency').length}) — 24h</option>
              <option value="Urgent">⚡ Urgent ({geotagged.filter(c => c.priority === 'Urgent').length}) — 48h</option>
              <option value="High">🔥 High ({geotagged.filter(c => c.priority === 'High').length}) — 72h</option>
              <option value="Medium">⏳ Medium ({geotagged.filter(c => c.priority === 'Medium').length}) — 7d</option>
              <option value="Low">📋 Low ({geotagged.filter(c => c.priority === 'Low').length}) — 14d</option>
            </select>
            <button onClick={() => setPriorityOrder(v => !v)} className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-black border ${priorityOrder ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-950 text-slate-300 border-slate-700'}`}>
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{priorityOrder ? 'Priority Order ON (Emergency→Low)' : 'Priority Order OFF'}</span>
            </button>
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ID, issue, location, district..." className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-medium text-white placeholder-slate-500 focus:border-amber-500" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 items-center text-[11px] font-bold">
          <span className="text-slate-500 flex items-center gap-1"><Siren className="w-3 h-3 text-red-500" /> PRIORITY LEGEND:</span>
          {(['Emergency','Urgent','High','Medium','Low'] as const).map(p => {
            const m = getPriorityMeta(p);
            return <span key={p} className="px-2 py-1 rounded-full border text-[11px] font-black" style={{ background: `${m.color}18`, color: m.color, borderColor: `${m.color}40` }}>{m.icon} {m.shortLabel} • {m.slaLabel}</span>;
          })}
          <span className="ml-auto text-slate-500">Pin size = priority • Pulse = Emergency</span>
        </div>
      </div>

      {/* Map + List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-3 sm:p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Navigation className="w-4 h-4" />
              <span>
                Unified Map — {filtered.length} pinned {filterStatus !== 'ALL' || filterCategory !== 'ALL' || search ? '(filtered)' : ''}
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-500">Click pin → popup → Track</span>
          </div>
          <div ref={mapRef} style={{ height: '560px', width: '100%', borderRadius: '16px' }} className="border border-slate-700 overflow-hidden z-0 bg-slate-800" />
          <div className="flex flex-wrap gap-2 mt-3 text-[11px] font-bold px-1">
            <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-red-600 border-2 border-white" /> <span className="text-slate-400">Emergency</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-orange-600 border-2 border-white" /> <span className="text-slate-400">Urgent</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-red-500 border-2 border-white" /> <span className="text-slate-400">High</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white" /> <span className="text-slate-400">Medium/ Low</span></span>
            <span className="ml-auto text-slate-500">Fill = priority • Outer ring = status • Size = priority</span>
          </div>
          {nonGeotagged.length > 0 && (
            <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                {nonGeotagged.length} complaint(s) without GPS are not pinned (text-only). They appear in the list → ask citizen to add geotag via Resubmit or field officer can update with GPS on-site.
              </span>
            </div>
          )}
        </div>

        {/* Emergency→Low Work Queue (order municipality completes) */}
        <div className="lg:col-span-12">
          <PriorityQueue complaints={filtered} limit={8} title="Municipality Work Queue — Complete in This Order (Emergency → Low, FIFO within tier)" />
        </div>

        {/* List */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col max-h-[640px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-black text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Pinned Complaints ({filtered.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500">{geotagged.length} total geotagged</span>
          </div>
          <div className="space-y-3 overflow-y-auto pr-1 flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <MapPin className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-500">No matching pins. Adjust filters or clear search.</p>
              </div>
            ) : (
              filtered.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedId(c.id);
                    const g = c.geoLocation!;
                    mapInstanceRef.current?.setView([g.latitude, g.longitude], 16, { animate: true });
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all ${selectedId === c.id ? 'bg-amber-500/10 border-amber-500/40' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-black text-amber-400 text-xs">{c.id}</span>
                    <div className="flex items-center gap-1">
                      <PriorityBadge priority={c.priority} size="sm" />
                      <StatusBadge status={c.status} lang={lang} />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-white mt-1 leading-snug">{c.issueTitle[lang] || c.issueTitle.en}</p>
                  <p className="text-[11px] text-slate-400 flex items-center space-x-1 mt-1">
                    <Building2 className="w-3 h-3 text-emerald-400" />
                    <span className="truncate">{c.departmentName[lang] || c.departmentName.en}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>
                      {c.location}, {c.district} • {c.geoLocation?.ward}
                    </span>
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">
                    {c.geoLocation!.latitude.toFixed(5)}, {c.geoLocation!.longitude.toFixed(5)} • ±{Math.round(c.geoLocation!.accuracy || 0)}m
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold border" style={{ background: `${categoryColor(c.categoryId)}15`, color: categoryColor(c.categoryId), borderColor: `${categoryColor(c.categoryId)}30` }}>
                      {CATEGORIES.find(x => x.id === c.categoryId)?.name.en}
                    </span>
                    <Link onClick={e => e.stopPropagation()} to={`/track/${c.id}`} className="ml-auto inline-flex items-center space-x-1 text-[11px] font-bold text-amber-400 hover:text-amber-300">
                      <span>Track</span> <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </button>
              ))
            )}
            {nonGeotagged.length > 0 && (
              <div className="pt-3 border-t border-slate-800">
                <p className="text-[11px] font-bold text-slate-400 mb-2 flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3 text-amber-400" /> <span>Without GPS — not on map</span>
                </p>
                {nonGeotagged.slice(0, 5).map(c => (
                  <div key={c.id} className="p-2 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-[11px] text-slate-500 mb-2">
                    <span className="font-mono font-bold text-slate-400">{c.id}</span> — {c.location}, {c.district} • <span className="italic">{c.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selected && (
            <div className="mt-3 p-3 rounded-2xl bg-slate-950 border border-amber-500/30 text-xs">
              <p className="font-black text-amber-400">{selected.id} Selected</p>
              <p className="text-slate-300 mt-1">{selected.geoLocation?.address}</p>
              <div className="mt-2 flex gap-2">
                <Link to={`/track/${selected.id}`} className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-xs">
                  Open Track
                </Link>
                <a href={`https://www.google.com/maps/search/?api=1&query=${selected.geoLocation?.latitude},${selected.geoLocation?.longitude}`} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-bold text-xs border border-slate-700">
                  Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats footer - by priority */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Emergency (24h)', value: filtered.filter(c => c.priority === 'Emergency').length, sub: 'Do first', color: 'text-red-500' },
          { label: 'Urgent (48h)', value: filtered.filter(c => c.priority === 'Urgent').length, sub: 'Do next', color: 'text-orange-500' },
          { label: 'High (72h)', value: filtered.filter(c => c.priority === 'High').length, sub: '3-day SLA', color: 'text-red-400' },
          { label: 'Medium (7d)', value: filtered.filter(c => c.priority === 'Medium').length, sub: 'Weekly', color: 'text-amber-400' },
          { label: 'Low (14d)', value: filtered.filter(c => c.priority === 'Low').length, sub: 'Backlog', color: 'text-emerald-400' },
        ].map(card => (
          <div key={card.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{card.label}</p>
            <p className={`text-2xl font-black mt-1 ${card.color}`}>{card.value}</p>
            <p className="text-[11px] text-slate-500">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
