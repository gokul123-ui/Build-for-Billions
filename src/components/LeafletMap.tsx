import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoLocation } from '../types';

// Fix default marker icon paths for Vite
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

interface LeafletMapProps {
  geo: GeoLocation;
  interactive?: boolean; // drag marker to change location
  onChange?: (geo: GeoLocation) => void;
  height?: string;
  zoom?: number;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({ geo, interactive = false, onChange, height = '260px', zoom = 16 }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, {
      zoomControl: true,
      dragging: true,
      scrollWheelZoom: true,
    }).setView([geo.latitude, geo.longitude], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([geo.latitude, geo.longitude], {
      draggable: interactive,
    }).addTo(map);

    if (interactive) {
      marker.on('dragend', () => {
        const latLng = marker.getLatLng();
        onChange?.({
          latitude: latLng.lat,
          longitude: latLng.lng,
          accuracy: geo.accuracy,
          address: geo.address,
          timestamp: new Date().toISOString(),
          source: 'map-picker',
        });
      });
      map.on('click', (e: L.LeafletMouseEvent) => {
        marker.setLatLng(e.latlng);
        onChange?.({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          accuracy: geo.accuracy,
          address: geo.address,
          timestamp: new Date().toISOString(),
          source: 'map-picker',
        });
      });
    }

    let circle: L.Circle | null = null;
    if (geo.accuracy && geo.accuracy < 1000) {
      circle = L.circle([geo.latitude, geo.longitude], {
        radius: geo.accuracy,
        color: '#f59e0b',
        fillColor: '#f59e0b',
        fillOpacity: 0.15,
        weight: 1.5,
      }).addTo(map);
      circleRef.current = circle;
    }

    mapInstanceRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.latitude, geo.longitude, interactive]);

  // Update marker position when geo changes externally without recreating map
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng([geo.latitude, geo.longitude]);
      mapInstanceRef.current.setView([geo.latitude, geo.longitude], zoom);
      if (circleRef.current) {
        circleRef.current.setLatLng([geo.latitude, geo.longitude]);
        if (geo.accuracy) circleRef.current.setRadius(geo.accuracy);
      }
    }
  }, [geo.latitude, geo.longitude, geo.accuracy, zoom]);

  return <div ref={mapRef} style={{ height, width: '100%', borderRadius: '16px' }} className="z-0 border border-slate-700 overflow-hidden" />;
};

export const MiniLeafletMap: React.FC<{ geo: GeoLocation; height?: string }> = ({ geo, height = '180px' }) => {
  return <LeafletMap geo={geo} interactive={false} height={height} zoom={15} />;
};
