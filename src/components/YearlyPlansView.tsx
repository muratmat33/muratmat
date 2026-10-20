import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  Search,
  Settings,
  Sparkles,
  Info,
  ChevronRight,
} from 'lucide-react';
import { DriveConfig, YearlyPlanWeek } from '../types';

interface YearlyPlansViewProps {
  driveConfig: DriveConfig;
  yearlyPlans: YearlyPlanWeek[];
  onOpenSettings: () => void;
}

export const YearlyPlansView: React.FC<YearlyPlansViewProps> = ({
  driveConfig,
  yearlyPlans,
  onOpenSettings,
}) => {
  const [selectedTerm, setSelectedTerm] = useState<'all' | 'term1' | 'term2'>('term1');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Dönem (1-18), 2. Dönem (19-36)
  const filteredPlans = yearlyPlans.filter((plan) => {
    if (selectedTerm === 'term1' && plan.week > 18) return false;
    if (selectedTerm === 'term2' && plan.week <= 18) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      plan.theme.toLowerCase().includes(q) ||
      plan.month.toLowerCase().includes(q) ||
      plan.outcomes.some((o) => o.toLowerCase().includes(q))
    );
  });

  // Current active week (e.g. week 7 or 8)
  const currentWeek = yearlyPlans.find((p) => p.week === 7) || yearlyPlans[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Primary Banner: Google Drive Yıllık Planlarım Entegrasyonu */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white rounded-xl p-5 shadow-sm border border-indigo-900/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-500/20 rounded-md text-blue-300">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold tracking-tight text-white">
                Yıllık Planlarım ve Müfredat Arşivi
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              2026-2027 Eğitim Öğretim Yılı haftalık kazanım çizelgeleri, ders planları ve Google Drive üzerindeki resmi yıllık plan klasörünüz.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSettings}
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors inline-flex items-center gap-1.5"
              title="Drive yıllık plan bağlantısını düzenle"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Link Ayarla</span>
            </button>

            <a
              href={driveConfig.yearlyPlansUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs shrink-0"
            >
              <span>Drive Plan Klasörünü Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Current Drive link hint */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate max-w-md">
            Mevcut Plan Klasörü: <span className="font-mono text-blue-200">{driveConfig.yearlyPlansUrl}</span>
          </span>
          <span className="text-blue-300 font-medium">MEB Müfredatı ile Uyumlu</span>
        </div>
      </div>

      {/* Active Current Week Spotlight */}
      {currentWeek && (
        <div className="bg-white rounded-xl border border-indigo-200 p-4 shadow-2xs bg-gradient-to-r from-indigo-50/50 via-white to-blue-50/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                <span className="px-2 py-0.5 bg-indigo-100 rounded-md uppercase tracking-wider text-[10px]">
                  Aktif Ders Haftası
                </span>
                <span>{currentWeek.week}. Hafta · {currentWeek.dateRange}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{currentWeek.theme}</h3>
              <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-600">
                {currentWeek.outcomes.map((out, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{out}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Yazdır</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedTerm('term1')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              selectedTerm === 'term1'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            1. Dönem (1-18. Hafta)
          </button>
          <button
            onClick={() => setSelectedTerm('term2')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              selectedTerm === 'term2'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            2. Dönem (19-36. Hafta)
          </button>
          <button
            onClick={() => setSelectedTerm('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              selectedTerm === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Tüm Yıl
          </button>
        </div>

        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Konu veya kazanım ara..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Weekly Plans Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2.5 px-3 w-16 text-center">Hafta</th>
                <th className="py-2.5 px-3 w-28">Tarih Aralığı</th>
                <th className="py-2.5 px-4">Ünite ve Konu Başlığı</th>
                <th className="py-2.5 px-4">Hedeflenen Kazanımlar</th>
                <th className="py-2.5 px-3">Yöntem & Araçlar</th>
                <th className="py-2.5 px-3">Ölçme & Değerlendirme</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPlans.map((plan) => {
                const isCurrent = plan.week === currentWeek.week;
                return (
                  <tr
                    key={plan.week}
                    className={`transition-colors ${
                      plan.isHoliday
                        ? 'bg-amber-50/40 text-amber-900'
                        : isCurrent
                        ? 'bg-indigo-50/40'
                        : 'hover:bg-slate-50/60'
                    }`}
                  >
                    {/* Hafta No */}
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded ${
                          isCurrent ? 'bg-indigo-600 text-white' : ''
                        }`}
                      >
                        {plan.week}
                      </span>
                    </td>

                    {/* Tarih Aralığı */}
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {plan.dateRange}
                    </td>

                    {/* Konu Başlığı */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 text-xs">
                        {plan.theme}
                      </div>
                      {plan.isHoliday && (
                        <span className="inline-block mt-1 text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                          {plan.holidayName}
                        </span>
                      )}
                    </td>

                    {/* Kazanımlar */}
                    <td className="py-3 px-4">
                      <ul className="space-y-1">
                        {plan.outcomes.map((outcome, idx) => (
                          <li key={idx} className="text-slate-700 flex items-start gap-1.5 leading-relaxed">
                            <span className="text-indigo-600 shrink-0 mt-0.5 font-bold">›</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Yöntem ve Araçlar */}
                    <td className="py-3 px-3">
                      <div className="text-slate-600">
                        <span className="font-medium text-slate-800">Yöntem: </span>
                        {plan.teachingMethods.join(', ')}
                      </div>
                      <div className="text-slate-500 text-[11px] mt-1">
                        <span className="font-medium text-slate-700">Araç: </span>
                        {plan.toolsMaterials.join(', ')}
                      </div>
                    </td>

                    {/* Değerlendirme */}
                    <td className="py-3 px-3 text-slate-600 text-[11px] leading-relaxed">
                      {plan.evaluation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div>Murat TAŞKIN · 2026-2027 Eğitim Öğretim Yılı Yıllık Müfredat Takvimi</div>
          <a
            href={driveConfig.yearlyPlansUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1"
          >
            <span>Drive'daki Orijinal Dosyayı Aç</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
