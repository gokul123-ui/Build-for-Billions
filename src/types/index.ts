export type Language = 'en' | 'ta' | 'hi';

export type Priority = 'High' | 'Medium' | 'Low';

export type GrievanceStatus = 
  | 'Submitted'
  | 'Under Review'
  | 'Assigned'
  | 'In Progress'
  | 'Resolved';

export type CategoryId =
  | 'water'
  | 'electricity'
  | 'roads'
  | 'street_lights'
  | 'garbage'
  | 'drainage'
  | 'transport'
  | 'healthcare'
  | 'sanitation'
  | 'certificates'
  | 'property_tax'
  | 'police'
  | 'schemes'
  | 'other';

export interface CategoryInfo {
  id: CategoryId;
  iconName: string;
  name: Record<Language, string>;
  department: Record<Language, string>;
  description: Record<Language, string>;
}

export interface ComplaintData {
  id: string;
  citizenDescription: string;
  location: string;
  district: string;
  state: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  categoryId: CategoryId;
  categoryName: Record<Language, string>;
  departmentName: Record<Language, string>;
  issueTitle: Record<Language, string>;
  priority: Priority;
  aiSummary: Record<Language, string>;
  requestedAction: Record<Language, string>;
  status: GrievanceStatus;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
  statusHistory: {
    status: GrievanceStatus;
    timestamp: string;
    note: Record<Language, string>;
  }[];
}

export interface AnalysisResult {
  categoryId: CategoryId;
  categoryName: Record<Language, string>;
  departmentName: Record<Language, string>;
  issueTitle: Record<Language, string>;
  priority: Priority;
  aiSummary: Record<Language, string>;
  requestedAction: Record<Language, string>;
}

export interface AccessibilitySettings {
  textSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  reduceMotion: boolean;
}
