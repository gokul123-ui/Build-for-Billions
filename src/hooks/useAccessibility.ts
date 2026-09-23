import { useState, useEffect } from 'react';
import { AccessibilitySettings } from '../types';

const ACCESS_STORAGE_KEY = 'janconnect_accessibility';

const defaultSettings: AccessibilitySettings = {
  textSize: 'normal',
  highContrast: false,
  reduceMotion: false
};

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const raw = localStorage.getItem(ACCESS_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      // ignore
    }
    return defaultSettings;
  });

  const updateSettings = (newPartial: Partial<AccessibilitySettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newPartial };
      try {
        localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  useEffect(() => {
    const root = document.documentElement;

    // Remove old classes
    root.classList.remove('text-normal', 'text-large', 'text-xlarge', 'high-contrast', 'reduce-motion');

    // Add current classes
    root.classList.add(`text-${settings.textSize}`);
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    }
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    }
  }, [settings]);

  return { settings, updateSettings };
}
