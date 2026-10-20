export interface WorkPackage {
  id: string;
  title: string;
  subActivities: string;
  duration: string;
}

export interface TeknofestProjectData {
  projectTitle: string; // en fazla 15 kelime
  competitionCategory: string; // Eğitim Teknolojileri, Akıllı Ulaşım, Çevre vb.
  teamLevel: string; // İlkokul, Ortaokul, Lise, Üniversite
  teamName: string;
  teamId: string;
  applicationId: string;
  advisorName: string; // Murat TAŞKIN
  teamLeader: string;
  teamMembers: string[];
  // Şablon Sayfaları
  summary: string; // Özet (max 1 sayfa)
  problemStatement: string; // Problem Tanımı (max 2 sayfa, literatür araştırması)
  solution: string; // Çözüm Önerisi (max 2 sayfa)
  methodology: string; // Yöntem (max 2 sayfa, teknolojiler, deneyler)
  prototypeType: string; // Donanım, Yazılım veya Hibrit
  prototypeStatus: string; // Prototip / Uygulama Geliştirme Durumu (max 1 sayfa)
  hardwareSpecs: string;
  softwareSpecs: string;
  commercializationAndSustainability: string; // Ticarileşme ve Sürdürülebilirlik (max 1 sayfa)
  innovationAndLocality: string; // Özgünlük ve Yerlilik Yönü (max 1 sayfa)
  targetAudience: string; // Hedef Kitle (max 1 sayfa)
  workPackages: WorkPackage[]; // İş Takvimi
  swotStrengths: string;
  swotWeaknesses: string;
  swotOpportunities: string;
  swotThreats: string;
  slogan: string;
}

export interface TubitakProjectData {
  mainField: string; // Biyoloji, Fizik, Kimya, Matematik, Tarih, Türkçe, Yazılım, vb.
  thematicField: string; // Yapay Zeka, Robotik ve Kodlama, Siber Güvenlik, STEAM, vb.
  projectTitle: string; // en fazla 15 kelime
  advisorName: string; // Murat TAŞKIN
  students: string[];
  // Yapay Zeka Araçları Kullanım Beyanı
  aiTools: string;
  aiPurpose: string;
  aiScope: string;
  aiHumanIntervention: string;
  // Şablon Bölümleri
  summary: string; // 150-250 kelime
  keywords: string[]; // en fazla 5 kelime
  purpose: string; // Amaç (Ar-Ge ve somut hedefler)
  introduction: string; // Giriş (Literatür, kaynak taraması)
  method: string; // Yöntem (Araştırma deseni, evren-örneklem, veri toplama)
  findings: string; // Bulgular
  discussion: string; // Sonuç ve Tartışma
  suggestions: string; // Öneriler
  references: string[]; // Kaynaklar (APA)
  attachmentsText?: string; // Ekler
}
