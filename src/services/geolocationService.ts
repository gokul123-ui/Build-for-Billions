import { GeoLocation } from '../types';

export const isGeolocationSupported = (): boolean => {
  return typeof navigator !== 'undefined' && 'geolocation' in navigator;
};

export interface ReverseGeocodeResult {
  displayName: string;
  district?: string;
  state?: string;
  pincode?: string;
  ward?: string;
}

export async function getCurrentLocation(options?: PositionOptions): Promise<GeoLocation> {
  if (!isGeolocationSupported()) {
    throw new Error('Geolocation is not supported in this browser.');
  }

  const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
      ...options,
    });
  });

  return {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
    accuracy: pos.coords.accuracy,
    timestamp: new Date(pos.timestamp).toISOString(),
    source: 'gps',
  };
}

export async function reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeResult> {
  // OpenStreetMap Nominatim - free, no API key required. Respect usage policy.
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&zoom=16&addressdetails=1&accept-language=en`;
  const res = await fetch(url, {
    headers: {
      // Nominatim requires a valid User-Agent / Referer, browser will send automatically
    },
  });
  if (!res.ok) throw new Error(`Reverse geocode failed: ${res.status}`);
  const data = await res.json();
  const addr = data.address || {};
  return {
    displayName: data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
    district: addr.city || addr.county || addr.state_district || addr.town || addr.village || addr.municipality || undefined,
    state: addr.state || undefined,
    pincode: addr.postcode || undefined,
    ward: addr.suburb || addr.neighbourhood || addr.ward || addr.hamlet || undefined,
  };
}

export function getOSMEmbedUrl(lat: number, lng: number, zoom = 16): string {
  const delta = 0.005;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lng}#map=${zoom}/${lat}/${lng}`;
}

export function getOSMViewUrl(lat: number, lng: number, zoom = 16): string {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;
}

export function getGoogleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function formatAccuracy(accuracy?: number): string {
  if (!accuracy) return '—';
  if (accuracy < 30) return `±${Math.round(accuracy)}m • High accuracy`;
  if (accuracy < 100) return `±${Math.round(accuracy)}m • Medium accuracy`;
  return `±${Math.round(accuracy)}m • Low accuracy`;
}

export function computeWardHint(lat: number, lng: number): string {
  // Simulated ward detection using lat/lng hash - for demo uniqueness
  const hash = Math.abs(Math.sin(lat * 10000) * 10000) % 20;
  const wardNum = Math.floor(hash) + 1;
  return `Ward ${wardNum}`;
}
