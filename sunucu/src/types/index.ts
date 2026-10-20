export type ProjectType = 'TEKNOFEST' | 'TUBITAK' | 'ETWINNING';

export type ProjectStatus = 'fikir' | 'taslak' | 'inceleme' | 'basvuru' | 'kabul';

export interface ProjectItem {
  id: string;
  title: string;
  type: ProjectType;
  category: string;
  status: ProjectStatus;
  advisor: string; // Murat TAŞKIN
  studentTeam: string[];
  summary: string;
  problemStatement: string;
  solution: string;
  innovationAspect: string;
  methodology: string;
  targetAudience: string;
  budgetEstimate: string;
  timeline: string;
  externalLinks?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  // Specific track metadata
  specificDetails: {
    // TEKNOFEST
    teknofestCategory?: string;
    teamName?: string;
    hardwareSoftwareSpecs?: string;
    // TÜBİTAK
    tubitakProgram?: '2204-A Lise' | '2204-B Ortaokul' | '4006 Bilim Fuarı' | '2242 Üniversite';
    researchHypothesis?: string;
    dataCollectionTool?: string;
    // eTwinning
    targetAgeGroup?: string;
    partnerCountries?: string[];
    twinspaceTools?: string[];
    pedagogicalInnovation?: string;
  };
}

export interface Student {
  id: string;
  schoolNumber: string;
  fullName: string;
  classId: string;
  gender: 'K' | 'E';
  attendanceAbsence: number; // Gün cinsinden devamsızlık
  exam1: number | null;
  exam2: number | null;
  perf1: number | null;
  perf2: number | null;
  projectGrade: number | null;
  parentName: string;
  parentPhone: string;
  behaviorNotes: string;
  projectAssignmentTitle?: string;
  status: 'aktif' | 'riskli' | 'basarili';
}

export interface ClassGroup {
  id: string;
  name: string;
  gradeLevel: number;
  branch: string;
  field: string;
  academicYear: string;
}

export interface DriveConfig {
  gradesUrl: string; // Murat Hoca'nın not bağlantısı (e-Okul veya özel Drive bağlantısı)
  driveFolderUrl: string; // Murat Hoca'nın Google Drive dosyalarım bağlantısı
  yearlyPlansUrl: string; // Murat Hoca'nın Google Drive yıllık planlar bağlantısı
}

export interface DriveFileItem {
  id: string;
  title: string;
  category: 'Zümre' | 'Yazılı' | 'ŞÖK' | 'Rehberlik' | 'Kulüp' | 'İdari' | 'Plan';
  description: string;
  format: 'folder' | 'pdf' | 'doc' | 'sheet' | 'slide';
  updatedAt: string;
  directUrl?: string;
  size?: string;
}

export interface YearlyPlanWeek {
  week: number;
  month: string;
  dateRange: string;
  theme: string;
  outcomes: string[]; // Kazanımlar
  teachingMethods: string[];
  toolsMaterials: string[];
  evaluation: string;
  isHoliday?: boolean;
  holidayName?: string;
  notes?: string;
}
