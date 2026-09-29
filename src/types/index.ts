export type DepartmentId = 'development' | 'design' | 'events' | 'social_media';

export interface Department {
  id: DepartmentId;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  colorHex: string;
  accentClass: string;
  bannerBg: string;
  iconName: string;
  activities: string[];
  keySkills: string[];
  tools: { name: string; icon: string }[];
  projects: { id: string; name: string; desc: string; link?: string }[];
  whoCanJoin: string[];
  mission: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  desc?: string;
  icon?: string;
  weights: Record<DepartmentId, number>;
}

export interface Question {
  id: number;
  title: string;
  type: 'single' | 'scale';
  icon: string;
  options: QuestionOption[];
}

export interface ParticipantInfo {
  id: string;
  fullName: string;
  email: string;
  faculty: string;
  studyYear: string;
  createdAt: string;
  department?: DepartmentId;
  scores?: Record<DepartmentId, number>;
  status?: 'Completed' | 'In Progress';
}

export type ScreenId =
  | 'landing'
  | 'welcome'
  | 'personal_info'
  | 'questionnaire'
  | 'sorting_animation'
  | 'sorting_result'
  | 'departments_overview'
  | 'department_detail'
  | 'admin_dashboard'
  | 'member_profile'
  | 'event_mode'
  | 'mobile_flow';

export interface AdminActivity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'register' | 'sort' | 'profile' | 'event' | 'system';
}
