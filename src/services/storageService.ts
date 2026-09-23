import { ComplaintData, GrievanceStatus, Language } from '../types';
import { INITIAL_DEMO_COMPLAINTS } from '../data/demoComplaints';

const STORAGE_KEY = 'janconnect_grievances';

export function getAllComplaints(): ComplaintData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
      return INITIAL_DEMO_COMPLAINTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
      return INITIAL_DEMO_COMPLAINTS;
    }
    return parsed;
  } catch (e) {
    console.error("Error reading complaints from localStorage:", e);
    return INITIAL_DEMO_COMPLAINTS;
  }
}

export function getComplaintById(id: string): ComplaintData | null {
  const complaints = getAllComplaints();
  const searchId = id.trim().toUpperCase();
  return complaints.find(c => c.id.toUpperCase() === searchId) || null;
}

export function saveComplaint(
  draft: Omit<ComplaintData, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'statusHistory'>
): ComplaintData {
  const complaints = getAllComplaints();
  
  // Generate ID e.g. JNC-2026-0004
  const num = complaints.length + 1;
  const idStr = String(num).padStart(4, '0');
  const newId = `JNC-2026-${idStr}`;

  const nowIso = new Date().toISOString();

  const newComplaint: ComplaintData = {
    ...draft,
    id: newId,
    status: 'Submitted',
    createdAt: nowIso,
    updatedAt: nowIso,
    statusHistory: [
      {
        status: 'Submitted',
        timestamp: nowIso,
        note: {
          en: 'Complaint submitted to government grievance portal.',
          ta: 'அரசு குறைதீர்ப்பு போர்ட்டலில் புகார் சமர்ப்பிக்கப்பட்டது.',
          hi: 'सरकारी शिकायत पोर्टल पर शिकायत सबमिट की गई।'
        }
      }
    ]
  };

  const updatedList = [newComplaint, ...complaints];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (e) {
    console.error("Error writing complaint to localStorage:", e);
  }

  return newComplaint;
}

export function advanceComplaintStatus(id: string): ComplaintData | null {
  const complaints = getAllComplaints();
  const targetIndex = complaints.findIndex(c => c.id.toUpperCase() === id.toUpperCase());
  if (targetIndex === -1) return null;

  const current = complaints[targetIndex];
  const flow: GrievanceStatus[] = ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved'];
  const currentIndex = flow.indexOf(current.status);
  
  // Next status or wrap/stay at Resolved
  const nextStatus = currentIndex < flow.length - 1 ? flow[currentIndex + 1] : 'Resolved';

  const nowIso = new Date().toISOString();

  const notesMap: Record<GrievanceStatus, Record<Language, string>> = {
    'Submitted': {
      en: 'Complaint submitted.',
      ta: 'புகார் சமர்ப்பிக்கப்பட்டது.',
      hi: 'शिकायत दर्ज की गई।'
    },
    'Under Review': {
      en: 'Officer reviewing details and verifying location.',
      ta: 'அதிகாரி விவரங்களை ஆய்வு செய்து சரிபார்க்கிறார்.',
      hi: 'अधिकारी विवरण की समीक्षा और स्थान का सत्यापन कर रहे हैं।'
    },
    'Assigned': {
      en: 'Assigned to nodal department field engineer.',
      ta: 'துறை சார்ந்த களப் பொறியாளருக்கு ஒதுக்கப்பட்டது.',
      hi: 'नोडल विभाग के क्षेत्रीय इंजीनियर को आवंटित।'
    },
    'In Progress': {
      en: 'Field team on-site carrying out repair work.',
      ta: 'களக் குழுவினர் களத்தில் பழுதுபார்க்கும் பணியில் ஈடுபட்டுள்ளனர்.',
      hi: 'क्षेत्रीय टीम साइट पर मरम्मत कार्य कर रही है।'
    },
    'Resolved': {
      en: 'Grievance resolved successfully. Work verified.',
      ta: 'புகாருக்கு வெற்றிகரமாக தீர்வு காணப்பட்டது.',
      hi: 'शिकायत का सफलतापूर्वक निस्तारण कर दिया गया।'
    }
  };

  const updatedComplaint: ComplaintData = {
    ...current,
    status: nextStatus,
    updatedAt: nowIso,
    statusHistory: [
      ...current.statusHistory,
      {
        status: nextStatus,
        timestamp: nowIso,
        note: notesMap[nextStatus]
      }
    ]
  };

  complaints[targetIndex] = updatedComplaint;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  } catch (e) {
    console.error("Error updating complaint status in localStorage:", e);
  }

  return updatedComplaint;
}

export function resetDemoComplaints(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
  } catch (e) {
    console.error("Error resetting demo complaints:", e);
  }
}
