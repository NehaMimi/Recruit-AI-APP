export type AppScreen = 'landing' | 'dashboard' | 'processing' | 'results';

export type ScreeningStatus = 'recommended' | 'maybe' | 'rejected';

export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  score: number;
  experience: string;
  education: string;
  location: string;
  currentRole: string;
  skills: string[];
  strengths: string;
  gaps: string;
  recommendation: string;
  status: ScreeningStatus;
  culturalFit: number;
  technicalScore: number;
  experienceScore: number;
}

export interface ChartDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}