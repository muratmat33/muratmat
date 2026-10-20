import React, { useState } from 'react';
import {
  Rocket,
  Award,
  FileText,
  Download,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Users,
  Lightbulb,
  FileCheck,
  Layers,
  ChevronRight,
  Clock,
  Printer,
  Copy,
} from 'lucide-react';
import { ProjectItem, Student } from '../types';
import { TeknofestGenerator } from './TeknofestGenerator';
import { TubitakGenerator } from './TubitakGenerator';

interface ProjectStudioViewProps {
  projects: ProjectItem[];
  students: Student[];
  initialMode?: 'select' | 'teknofest' | 'tubitak';
  onAddProject: (project: ProjectItem) => void;
  onUpdateProject: (project: ProjectItem) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectStudioView: React.FC<ProjectStudioViewProps> = ({
  projects,
  students,
  initialMode = 'select',
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [activeMode, setActiveMode] = useState<'select' | 'teknofest' | 'tubitak'>(initialMode);

  if (activeMode === 'teknofest') {
    return <TeknofestGenerator students={students} onBack={() => setActiveMode('select')} />;
  }

  if (activeMode === 'tubitak') {
    return <TubitakGenerator students={students} onBack={() => setActiveMode('select')} />;
  }

  return (
    <div className="space-y-6">
      {/* Primary Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-6 shadow-sm border border-slate-700">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-md">
              <Lightbulb className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Murat TAŞKIN Proje Hazırlama ve Üretim Merkezi
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Hangi Yarışma İçin Proje Hazırlamak İstiyorsunuz?
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sisteme yüklenen resmi <strong>TEKNOFEST 2026 Kılavuz ve Sunum Şablonu</strong> ile <strong>TÜBİTAK 2204 2026-2027 Proje Yazma Şablonu</strong>na birebir uyumlu olarak projenizi adım adım oluşturabilir ve doğrudan düzenlenebilir <strong>Word (.docx)</strong> dosyası olarak indirebilirsiniz.
          </p>
        </div>
      </div>

      {/* The 2 Major Menus: TEKNOFEST vs TÜBİTAK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. TEKNOFEST Card */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-red-500 hover:shadow-lg transition-all p-6 flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:bg-red-100 transition-colors" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                <Rocket className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-red-50 text-red-700 px-2.5 py-1 rounded-full border border-red-200">
                2026 KYS & Sunum Şablonu
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                TEKNOFEST Projesi Hazırla
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Eğitim Teknolojileri, Akıllı Ulaşım, Çevre ve Enerji, İnsanlık Yararına Teknoloji ve Tarım kategorilerine uygun resmi başvuru ve sunum raporu.
              </p>
            </div>

            {/* Template Features list from attachment */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="font-semibold text-slate-800">Şablon ve Kılavuz Standartları:</div>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Kapak Sayfası, Takım ID ve KYS Bilgileri</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Takım Tanıtımı (Danışman Murat TAŞKIN + Öğrenciler)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Özet, Problem Tanımı, Çözüm ve Yöntem Bölümleri</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Prototip Geliştirme Durumu (Donanım/Yazılım/Hibrit)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Yerlilik, Ticarileşme, SWOT Analizi ve Kapanış Sloganı</span>
                </li>
                <li className="flex items-center gap-1.5 font-bold text-red-700">
                  <Download className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Resmi TEKNOFEST Word (.docx) Formatında İndirme</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <button
              onClick={() => setActiveMode('teknofest')}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group-hover:gap-3"
            >
              <span>TEKNOFEST Projesi Hazırlamaya Başla</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. TÜBİTAK Card */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all p-6 flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:bg-blue-100 transition-colors" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
                2204-B / 2204-A 2026-2027
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                TÜBİTAK Projesi Hazırla
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Ortaokul ve Lise Araştırma Projeleri Yarışması için resmi rapor şablonu, 10 ana alan ve 43 tematik alan rehberi.
              </p>
            </div>

            {/* Template Features list from attachment */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="font-semibold text-slate-800">Şablon ve Kılavuz Standartları:</div>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>10 Ana Alan ve 43 Tematik Alan Seçimi</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Zorunlu: Yapay Zeka Araçları Kullanım Beyanı</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Özet (150-250 kelime) ve Anahtar Kelimeler Denetimi</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Amaç, Giriş (Literatür), Yöntem ve Deney Aşamaları</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>İş-Zaman Çizelgesi, Bulgular, Tartışma ve APA Kaynaklar</span>
                </li>
                <li className="flex items-center gap-1.5 font-bold text-blue-700">
                  <Download className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Resmi TÜBİTAK Word (.docx) Formatında İndirme</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <button
              onClick={() => setActiveMode('tubitak')}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group-hover:gap-3"
            >
              <span>TÜBİTAK Projesi Hazırlamaya Başla</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Previously drafted projects summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">Kayıtlı Proje Taslaklarınız</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {projects.length} Proje
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-slate-50/60 transition-all flex items-start justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      proj.type === 'TEKNOFEST'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {proj.type}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate">{proj.category}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">{proj.title}</div>
                <div className="text-[11px] text-slate-500 truncate">
                  Ekip: {proj.studentTeam.join(', ')}
                </div>
              </div>

              <button
                onClick={() => {
                  if (proj.type === 'TEKNOFEST') {
                    setActiveMode('teknofest');
                  } else {
                    setActiveMode('tubitak');
                  }
                }}
                className="shrink-0 p-1.5 text-indigo-600 hover:bg-indigo-50 rounded text-xs font-semibold"
              >
                Görüntüle
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
