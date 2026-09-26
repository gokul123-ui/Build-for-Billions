import { Priority, ComplaintData } from '../types';

export interface PriorityMeta {
  label: Record<string, string>;
  shortLabel: string;
  color: string; // hex
  bg: string; // tailwind bg class
  border: string;
  text: string;
  slaHours: number;
  slaLabel: string;
  order: number; // 0 = highest
  icon: string; // emoji for fallback
  queueName: string;
}

// SLA: Emergency 24h, Urgent 48h, High 72h, Medium 7d, Low 14d
export const PRIORITY_META: Record<Priority, PriorityMeta> = {
  Emergency: {
    label: { en: 'EMERGENCY', ta: 'அவசரநிலை', hi: 'आपातकाल' },
    shortLabel: 'EMERGENCY',
    color: '#dc2626',
    bg: 'bg-red-600',
    border: 'border-red-500',
    text: 'text-white',
    slaHours: 24,
    slaLabel: '24h SLA',
    order: 0,
    icon: '🚨',
    queueName: 'Emergency Queue — Do First',
  },
  Urgent: {
    label: { en: 'URGENT', ta: 'அவசரம்', hi: 'अत्यावश्यक' },
    shortLabel: 'URGENT',
    color: '#ea580c',
    bg: 'bg-orange-600',
    border: 'border-orange-500',
    text: 'text-white',
    slaHours: 48,
    slaLabel: '48h SLA',
    order: 1,
    icon: '⚡',
    queueName: 'Urgent Queue — Do Next',
  },
  High: {
    label: { en: 'HIGH PRIORITY', ta: 'உயர் முன்னுரிமை', hi: 'उच्च प्राथमिकता' },
    shortLabel: 'HIGH',
    color: '#ef4444',
    bg: 'bg-red-500/90',
    border: 'border-red-500/50',
    text: 'text-white',
    slaHours: 72,
    slaLabel: '72h SLA',
    order: 2,
    icon: '🔥',
    queueName: 'High Queue',
  },
  Medium: {
    label: { en: 'MEDIUM PRIORITY', ta: 'நடுத்தர முன்னுரிமை', hi: 'मध्यम प्राथमिकता' },
    shortLabel: 'MEDIUM',
    color: '#f59e0b',
    bg: 'bg-amber-500',
    border: 'border-amber-500/50',
    text: 'text-slate-950',
    slaHours: 168, // 7 days
    slaLabel: '7d SLA',
    order: 3,
    icon: '⏳',
    queueName: 'Standard Queue',
  },
  Low: {
    label: { en: 'LOW PRIORITY', ta: 'குறைந்த முன்னுரிமை', hi: 'निम्न प्राथमिकता' },
    shortLabel: 'LOW',
    color: '#10b981',
    bg: 'bg-emerald-500',
    border: 'border-emerald-500/50',
    text: 'text-white',
    slaHours: 336, // 14 days
    slaLabel: '14d SLA',
    order: 4,
    icon: '📋',
    queueName: 'Low Queue',
  },
};

export function getPriorityMeta(p: Priority): PriorityMeta {
  return PRIORITY_META[p] || PRIORITY_META.Medium;
}

export function getPriorityOrder(p: Priority): number {
  return getPriorityMeta(p).order;
}

// Multilingual emergency / urgent dictionaries
export const EMERGENCY_KEYWORDS: string[] = [
  // English
  'emergency', 'critical', 'hospital', 'blood', 'fire', 'blast', 'explosion', 'live wire', 'electrocution', 'gas leak', 'flood', 'collapsed', 'accident', 'major leak', 'burst', 'sewage overflow on road', 'manhole open', 'child fell', 'dengue outbreak', 'no water for 7 days', 'week without water', 'contaminated water', 'cholera', 'electrical spark',
  // Tamil
  'அவசரநிலை', 'ஆபத்து', 'தீ விபத்து', 'மருத்துவமனை', 'குழந்தை விழுந்தது', 'வாயு கசிவு', 'வெள்ளம்', 'சரிவு', 'மின் கசிவு', '7 நாட்களாக',
  // Hindi
  'आपातकाल', 'गंभीर', 'अस्पताल', 'खून', 'आग', 'बाढ़', 'गैस रिसाव', 'करंट', 'गड्ढे में बच्चा', '7 दिन से पानी नहीं',
];

export const URGENT_KEYWORDS: string[] = [
  // English
  'urgent', 'danger', 'hazard', 'leak', '3 days', 'three days', '72 hours', 'no water for 3 days', 'power cut for 2 days', 'pothole accident', 'garbage for a week', 'drain block', 'stench', 'mosquito', 'fever',
  'உடனடி', 'ஆபத்து', '3 நாட்கள்', 'நாட்களாக', 'மருத்துவமனை', 'அவசியம்', 'கொசு', 'துர்நாற்றம்',
  'तुरंत', 'खतरा', '3 दिन', 'तीन दिन', 'अस्पताल', 'गंभीर', 'दुर्घटना', 'बदबू', 'मच्छर',
];

export function detectPriority(description: string, categoryId?: string): { priority: Priority; reason: string } {
  const lower = description.toLowerCase();
  // Check emergency first
  for (const kw of EMERGENCY_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) {
      return { priority: 'Emergency', reason: `Keyword “${kw}” → Emergency (life/safety risk)` };
    }
  }
  // Category-based emergency elevation: e.g., healthcare + water contamination + open manhole
  if (
    (categoryId === 'drainage' && lower.includes('overflow')) ||
    (categoryId === 'electricity' && (lower.includes('live') || lower.includes('spark') || lower.includes('wire'))) ||
    (categoryId === 'healthcare' && lower.includes('dengue'))
  ) {
    return { priority: 'Emergency', reason: 'Category + hazard pattern → Emergency' };
  }
  for (const kw of URGENT_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) {
      // map to Urgent (if description has hospital/accident etc, treat as Urgent even if not Emergency)
      return { priority: 'Urgent', reason: `Keyword “${kw}” → Urgent (72h window)` };
    }
  }
  // Fallback to previous High detection but now split: if 3 days etc goes to Urgent already, remaining high = fallback to High
  // If no keyword, check length/impact heuristics
  if (lower.includes('contaminated') || lower.includes('pressure') || lower.includes('blocked')) {
    return { priority: 'High', reason: 'Service disruption → High' };
  }
  if (lower.length > 120) return { priority: 'Medium', reason: 'Detailed report → Medium' };
  return { priority: 'Low', reason: 'General civic issue → Low' };
}

export function getSLADeadline(createdAt: string, priority: Priority): Date {
  const meta = getPriorityMeta(priority);
  const d = new Date(createdAt);
  d.setHours(d.getHours() + meta.slaHours);
  return d;
}

export type SLAStatus = 'overdue' | 'due_soon' | 'on_track' | 'resolved';

export function getSLAStatus(complaint: ComplaintData, now = new Date()): SLAStatus {
  if (complaint.status === 'Resolved') return 'resolved';
  const deadline = getSLADeadline(complaint.createdAt, complaint.priority);
  const diffMs = deadline.getTime() - now.getTime();
  if (diffMs < 0) return 'overdue';
  if (diffMs < 12 * 60 * 60 * 1000) return 'due_soon'; // 12h threshold for due soon
  return 'on_track';
}

export function getSLAProgress(complaint: ComplaintData, now = new Date()): number {
  const start = new Date(complaint.createdAt).getTime();
  const deadline = getSLADeadline(complaint.createdAt, complaint.priority).getTime();
  const total = deadline - start;
  const elapsed = now.getTime() - start;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function sortByPriority(complaints: ComplaintData[]): ComplaintData[] {
  return [...complaints].sort((a, b) => {
    const oa = getPriorityOrder(a.priority);
    const ob = getPriorityOrder(b.priority);
    if (oa !== ob) return oa - ob;
    // older first within same priority (FIFO for fairness)
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

export function getNextAction(complaint: ComplaintData): string {
  if (complaint.priority === 'Emergency') return 'Dispatch field team immediately ( <4h ) + notify nodal officer';
  if (complaint.priority === 'Urgent') return 'Inspect within 24h, resolve within 48h SLA';
  if (complaint.priority === 'High') return 'Field verification within 48h, close in 72h';
  if (complaint.priority === 'Medium') return 'Schedule in 7-day work plan';
  return 'Add to 14-day sanitation backlog';
}
