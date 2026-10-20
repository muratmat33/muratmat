import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Phone,
  FolderArchive,
  BookOpen,
  Filter,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
  Settings,
  ChevronRight,
  TrendingUp,
  UserCheck,
  Award,
  Rocket,
  Lightbulb,
} from 'lucide-react';
import { ClassGroup, DriveConfig, DriveFileItem, Student } from '../types';

interface StudentTrackingViewProps {
  students: Student[];
  classes: ClassGroup[];
  driveConfig: DriveConfig;
  driveFiles: DriveFileItem[];
  onUpdateStudent: (student: Student) => void;
  onAddStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  onAddClass: (newClass: ClassGroup) => void;
  onOpenSettings: () => void;
  onNavigateToFiles: () => void;
  onNavigateToProject: (mode: 'select' | 'teknofest' | 'tubitak') => void;
}

export const StudentTrackingView: React.FC<StudentTrackingViewProps> = ({
  students,
  classes,
  driveConfig,
  driveFiles,
  onUpdateStudent,
  onAddStudent,
  onDeleteStudent,
  onAddClass,
  onOpenSettings,
  onNavigateToFiles,
  onNavigateToProject,
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'c1');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'basarili' | 'riskli' | 'aktif'>('all');
  const [showRightFilesPanel, setShowRightFilesPanel] = useState<boolean>(true);

  // Modals state
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New class form
  const [newClassName, setNewClassName] = useState('');
  const [newClassField, setNewClassField] = useState('Bilişim Teknolojileri');
  const [newClassGrade, setNewClassGrade] = useState(9);

  // New student form
  const [newStudentNumber, setNewStudentNumber] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGender, setNewStudentGender] = useState<'K' | 'E'>('E');
  const [newParentName, setNewParentName] = useState('');
  const [newParentPhone, setNewParentPhone] = useState('');
  const [newBehaviorNotes, setNewBehaviorNotes] = useState('');

  // Selected Class
  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => s.classId === selectedClassId)
      .filter((s) => {
        if (statusFilter !== 'all' && s.status !== statusFilter) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          s.fullName.toLowerCase().includes(q) ||
          s.schoolNumber.includes(q) ||
          s.parentName.toLowerCase().includes(q)
        );
      });
  }, [students, selectedClassId, statusFilter, searchQuery]);

  // Sınıf İstatistikleri (Tabular figures)
  const classStats = useMemo(() => {
    const list = students.filter((s) => s.classId === selectedClassId);
    if (!list.length) return { count: 0, average: 0, riskCount: 0, honorCount: 0 };

    let totalScore = 0;
    let scoredCount = 0;
    let riskCount = 0;
    let honorCount = 0;

    list.forEach((s) => {
      const grades = [s.exam1, s.exam2, s.perf1, s.perf2, s.projectGrade].filter(
        (g): g is number => g !== null
      );
      if (grades.length > 0) {
        const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
        totalScore += avg;
        scoredCount++;
        if (avg >= 85) honorCount++;
        if (avg < 50 || s.attendanceAbsence > 5) riskCount++;
      }
    });

    return {
      count: list.length,
      average: scoredCount > 0 ? Math.round(totalScore / scoredCount) : 0,
      riskCount,
      honorCount,
    };
  }, [students, selectedClassId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenGradesLink = (studentName?: string) => {
    window.open(driveConfig.gradesUrl, '_blank', 'noopener,noreferrer');
    showToast(
      studentName
        ? `${studentName} için not bağlantısı açıldı.`
        : 'Öğrenci Not / E-Okul bağlantısı açıldı.'
    );
  };

  const calculateStudentAvg = (s: Student): number | null => {
    const grades = [s.exam1, s.exam2, s.perf1, s.perf2, s.projectGrade].filter(
      (g): g is number => g !== null
    );
    if (grades.length === 0) return null;
    return Math.round(grades.reduce((a, b) => a + b, 0) / grades.length);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentNumber.trim()) return;

    const student: Student = {
      id: `std-${Date.now()}`,
      schoolNumber: newStudentNumber.trim(),
      fullName: newStudentName.trim(),
      classId: selectedClassId,
      gender: newStudentGender,
      attendanceAbsence: 0,
      exam1: null,
      exam2: null,
      perf1: null,
      perf2: null,
      projectGrade: null,
      parentName: newParentName.trim() || 'Veli',
      parentPhone: newParentPhone.trim() || '05--',
      behaviorNotes: newBehaviorNotes.trim() || 'Yeni kayıt edildi.',
      status: 'aktif',
    };

    onAddStudent(student);
    setIsAddStudentOpen(false);
    setNewStudentName('');
    setNewStudentNumber('');
    setNewParentName('');
    setNewParentPhone('');
    setNewBehaviorNotes('');
    showToast(`${student.fullName} sınıfa eklendi.`);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const newCls: ClassGroup = {
      id: `cls-${Date.now()}`,
      name: newClassName.trim(),
      gradeLevel: newClassGrade,
      branch: newClassName.trim().split('-')[1] || 'A',
      field: newClassField.trim(),
      academicYear: '2026-2027',
    };

    onAddClass(newCls);
    setSelectedClassId(newCls.id);
    setIsAddClassOpen(false);
    setNewClassName('');
    showToast(`${newCls.name} sınıfı oluşturuldu.`);
  };

  return (
    <div className="space-y-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container: Split Layout (Student Tracking on Left, Files on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left & Center: Student Tracking Section */}
        <div className={`space-y-4 ${showRightFilesPanel ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'}`}>
          {/* Sınıf Seçici & Hızlı Bilgi Şeridi */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
                  Sınıflar:
                </span>
                {classes.map((cls) => {
                  const isSelected = cls.id === selectedClassId;
                  const count = students.filter((s) => s.classId === cls.id).length;
                  return (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClassId(cls.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{cls.name}</span>
                      <span
                        className={`text-[10px] px-1 rounded-full ${
                          isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}

                <button
                  onClick={() => setIsAddClassOpen(true)}
                  className="px-2 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-dashed border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Sınıf Ekle</span>
                </button>
              </div>

              {/* Toggle Right Drive Panel button on desktop */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowRightFilesPanel(!showRightFilesPanel)}
                  className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
                  title="Sağdaki Drive Dosyalarım panelini aç/kapat"
                >
                  <FolderArchive className="w-3.5 h-3.5 text-amber-600" />
                  <span>{showRightFilesPanel ? 'Dosyaları Gizle' : 'Dosyalarımı Göster'}</span>
                </button>

                <button
                  onClick={() => handleOpenGradesLink()}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors whitespace-nowrap"
                  title="Genel E-Okul / Not Çizelgesi Bağlantısını Aç"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Not Girişi / E-Okul</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Sınıf Metrik Şeridi (Tabular numbers) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Toplam Kayıtlı</div>
                <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                  {classStats.count} <span className="text-xs font-normal text-slate-500">Öğrenci</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Sınıf Not Ortalaması</div>
                <div className="text-lg font-bold text-indigo-700 font-mono tabular-nums">
                  {classStats.average || '—'} <span className="text-xs font-normal text-slate-500">/ 100</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Başarılı & Onur</div>
                <div className="text-lg font-bold text-emerald-600 font-mono tabular-nums">
                  {classStats.honorCount} <span className="text-xs font-normal text-slate-500">Öğrenci</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Takip & Destek Gereken</div>
                <div className="text-lg font-bold text-rose-600 font-mono tabular-nums">
                  {classStats.riskCount} <span className="text-xs font-normal text-slate-500">Öğrenci</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Controls (Search, Filters, Add Student) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <div className="relative grow sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Numara veya öğrenci ara..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md text-xs">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    statusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setStatusFilter('basarili')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    statusFilter === 'basarili' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Başarılı
                </button>
                <button
                  onClick={() => setStatusFilter('riskli')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    statusFilter === 'riskli' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Riskli
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Yeni Öğrenci Ekle</span>
              </button>
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="py-2.5 px-3 w-14 text-center">No</th>
                    <th className="py-2.5 px-3">Öğrenci Adı Soyadı</th>
                    <th className="py-2.5 px-2 text-center" title="Toplam Özürsüz Devamsızlık Günü">
                      Devamsızlık
                    </th>
                    <th className="py-2.5 px-2 text-center">1. Sınav</th>
                    <th className="py-2.5 px-2 text-center">2. Sınav</th>
                    <th className="py-2.5 px-2 text-center">Perf. 1</th>
                    <th className="py-2.5 px-2 text-center">Perf. 2</th>
                    <th className="py-2.5 px-2 text-center">Proje</th>
                    <th className="py-2.5 px-2 text-center font-bold">Ortalama</th>
                    {/* CRITICAL USER REQUIREMENT: Son kısımda notlarına tıklayınca link açılacak */}
                    <th className="py-2.5 px-3 text-right bg-indigo-50/50 text-indigo-900 font-bold border-l border-indigo-100">
                      Not Bağlantısı & İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student) => {
                    const avg = calculateStudentAvg(student);
                    return (
                      <tr
                        key={student.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* No */}
                        <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-700 tabular-nums">
                          {student.schoolNumber}
                        </td>

                        {/* Full Name & Info trigger */}
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => setSelectedStudentForDetail(student)}
                            className="text-left font-semibold text-slate-900 hover:text-indigo-600 transition-colors block"
                          >
                            {student.fullName}
                          </button>
                          <span className="text-[11px] text-slate-400 block truncate max-w-[200px]">
                            {student.projectAssignmentTitle || student.behaviorNotes}
                          </span>
                        </td>

                        {/* Devamsızlık */}
                        <td className="py-2.5 px-2 text-center font-mono tabular-nums">
                          <span
                            className={
                              student.attendanceAbsence > 5
                                ? 'text-rose-600 font-bold'
                                : 'text-slate-600'
                            }
                          >
                            {student.attendanceAbsence} Gün
                          </span>
                        </td>

                        {/* Sınav 1 */}
                        <td className="py-2.5 px-2 text-center font-mono tabular-nums">
                          {student.exam1 !== null ? (
                            <span
                              className={
                                student.exam1 < 50
                                  ? 'text-rose-600 font-semibold'
                                  : student.exam1 >= 85
                                  ? 'text-emerald-700 font-semibold'
                                  : 'text-slate-800'
                              }
                            >
                              {student.exam1}
                            </span>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>

                        {/* Sınav 2 */}
                        <td className="py-2.5 px-2 text-center font-mono tabular-nums">
                          {student.exam2 !== null ? (
                            <span
                              className={
                                student.exam2 < 50
                                  ? 'text-rose-600 font-semibold'
                                  : student.exam2 >= 85
                                  ? 'text-emerald-700 font-semibold'
                                  : 'text-slate-800'
                              }
                            >
                              {student.exam2}
                            </span>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>

                        {/* Perf 1 */}
                        <td className="py-2.5 px-2 text-center font-mono tabular-nums text-slate-700">
                          {student.perf1 ?? <span className="text-slate-300">—</span>}
                        </td>

                        {/* Perf 2 */}
                        <td className="py-2.5 px-2 text-center font-mono tabular-nums text-slate-700">
                          {student.perf2 ?? <span className="text-slate-300">—</span>}
                        </td>

                        {/* Proje Notu */}
                        <td className="py-2.5 px-2 text-center font-mono tabular-nums text-slate-700">
                          {student.projectGrade ?? <span className="text-slate-300">—</span>}
                        </td>

                        {/* Ortalama */}
                        <td className="py-2.5 px-2 text-center font-mono font-bold tabular-nums">
                          {avg !== null ? (
                            <span
                              className={`px-1.5 py-0.5 rounded text-xs ${
                                avg >= 85
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : avg >= 50
                                  ? 'bg-slate-100 text-slate-800'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {avg}
                            </span>
                          ) : (
                            <span className="text-slate-300 font-normal">—</span>
                          )}
                        </td>

                        {/* CRITICAL: Son kısımda notlarına tıklayınca link açılacak */}
                        <td className="py-2.5 px-3 text-right bg-indigo-50/30 border-l border-indigo-100/60 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Primary Button: Not Linkini Aç */}
                            <button
                              onClick={() => handleOpenGradesLink(student.fullName)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-2xs"
                              title={`${student.fullName} için e-Okul veya Google E-Tablo Not Giriş Linkini Aç`}
                            >
                              <span>Not Linki</span>
                              <ExternalLink className="w-3 h-3 text-indigo-100" />
                            </button>

                            {/* Hızlı Not Düzenle */}
                            <button
                              onClick={() => setEditingStudent(student)}
                              className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-white rounded transition-colors"
                              title="Notları Doğrudan Düzenle"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Sil */}
                            <button
                              onClick={() => {
                                if (confirm(`${student.fullName} listeden silinsin mi?`)) {
                                  onDeleteStudent(student.id);
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-white rounded transition-colors"
                              title="Öğrenciyi Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={10} className="py-10 text-center text-slate-500">
                        <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <div className="font-semibold text-slate-700">Bu sınıfta öğrenci bulunamadı</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          "Yeni Öğrenci Ekle" butonuna basarak ilk kaydı oluşturabilirsiniz.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer info */}
            <div className="px-4 py-2.5 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
              <div className="flex items-center gap-2">
                <span>{currentClass.name} ({currentClass.field})</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{filteredStudents.length} Kayıt Gösteriliyor</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-700 font-medium">
                <span>💡 "Not Linki" butonuna tıklandığında tanımladığınız e-Okul veya Google Drive not bağlantınız açılır.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: "Proje Hazırlama" & "Dosyalarım" Quick Access Panel */}
        {showRightFilesPanel && (
          <div className="lg:col-span-4 xl:col-span-3 space-y-4">
            {/* Proje Hazırlama Alanı Widget (TEKNOFEST & TÜBİTAK Seçimi) */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-4 shadow-sm border border-slate-700 space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Proje Hazırlama Alanı</h3>
                    <p className="text-[10px] text-slate-300">Resmi Şablonlar & Word Çıktısı</p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                Kılavuzlara göre projenizi adım adım yazın, resmi Word (.docx) formatında indirin:
              </p>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  onClick={() => onNavigateToProject('teknofest')}
                  className="p-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-sm transition-all group"
                  title="TEKNOFEST 2026 Proje Hazırlama Sihirbazını Aç"
                >
                  <Rocket className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>TEKNOFEST</span>
                  <span className="text-[9px] font-normal text-red-200">Word (.docx) İndir</span>
                </button>

                <button
                  onClick={() => onNavigateToProject('tubitak')}
                  className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-sm transition-all group"
                  title="TÜBİTAK 2026-2027 Proje Hazırlama Sihirbazını Aç"
                >
                  <Award className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>TÜBİTAK</span>
                  <span className="text-[9px] font-normal text-blue-200">Word (.docx) İndir</span>
                </button>
              </div>

              <button
                onClick={() => onNavigateToProject('select')}
                className="w-full text-center text-[10px] text-indigo-300 hover:text-white pt-1 block underline transition-colors"
              >
                Proje Menüsü ve Kılavuz Karşılaştırmasını Aç →
              </button>
            </div>

            {/* Dosyalarım Google Drive Panel */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                    <FolderArchive className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Dosyalarım</h3>
                    <p className="text-[11px] text-slate-500">Google Drive Arşivim</p>
                  </div>
                </div>

                <button
                  onClick={onOpenSettings}
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                  title="Drive Linkini Ayarla"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary Drive Button */}
              <a
                href={driveConfig.driveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs group"
              >
                <span>Google Drive'a Git</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-white" />
              </a>

              {/* Quick Document Links */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Sık Kullanılan Evraklar
                </div>

                <div className="space-y-1.5">
                  {driveFiles.slice(0, 5).map((file) => (
                    <a
                      key={file.id}
                      href={file.directUrl || driveConfig.driveFolderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition-all flex items-start justify-between gap-2 group block"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 truncate">
                          {file.title}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="font-medium text-indigo-600 bg-indigo-50 px-1 rounded">
                            {file.category}
                          </span>
                          <span>·</span>
                          <span>{file.updatedAt}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 shrink-0 mt-0.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* View Full Files Tab CTA */}
              <button
                onClick={onNavigateToFiles}
                className="w-full py-2 text-xs font-semibold text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50/80 rounded-lg transition-colors border border-indigo-100 flex items-center justify-center gap-1.5"
              >
                <span>Tüm Dosya ve Evrakları Gör</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Yıllık Plan Shortcut Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50/80 rounded-xl border border-indigo-100 p-4 space-y-2">
              <div className="flex items-center gap-2 text-indigo-900">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold">Yıllık Planlarım</h4>
              </div>
              <p className="text-[11px] text-indigo-950/80 leading-relaxed">
                2026-2027 haftalık kazanım takvimi ve Drive plan arşivi.
              </p>
              <a
                href={driveConfig.yearlyPlansUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900 pt-1"
              >
                <span>Drive Plan Klasörünü Aç</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Edit Student Grades Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingStudent.fullName} - Not ve Devamsızlık Düzenle
                </h3>
                <span className="text-[11px] text-slate-500">
                  Öğrenci No: {editingStudent.schoolNumber} · {currentClass.name}
                </span>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUpdateStudent(editingStudent);
                setEditingStudent(null);
                showToast(`${editingStudent.fullName} güncellendi.`);
              }}
              className="p-5 space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">1. Sınav Notu</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingStudent.exam1 ?? ''}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        exam1: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                    placeholder="0-100"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">2. Sınav Notu</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingStudent.exam2 ?? ''}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        exam2: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                    placeholder="0-100"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">1. Performans</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingStudent.perf1 ?? ''}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        perf1: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                    placeholder="0-100"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">2. Performans</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingStudent.perf2 ?? ''}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        perf2: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                    placeholder="0-100"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Proje Notu</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingStudent.projectGrade ?? ''}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        projectGrade: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                    placeholder="0-100"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Devamsızlık (Gün)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={editingStudent.attendanceAbsence}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        attendanceAbsence: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Öğretmen Değerlendirme & Gelişim Notu
                </label>
                <textarea
                  rows={2}
                  value={editingStudent.behaviorNotes}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      behaviorNotes: e.target.value,
                    })
                  }
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleOpenGradesLink(editingStudent.fullName)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Not Linkini Aç</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingStudent(null)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                    Değişiklikleri Kaydet
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudentForDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                  {selectedStudentForDetail.gender === 'K' ? 'K' : 'E'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {selectedStudentForDetail.fullName}
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Okul No: {selectedStudentForDetail.schoolNumber} · {currentClass.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentForDetail(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[11px] block">Ağırlıklı Not Ortalaması</span>
                  <span className="text-base font-bold text-slate-900 font-mono">
                    {calculateStudentAvg(selectedStudentForDetail) ?? 'Girilmedi'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Özürsüz Devamsızlık</span>
                  <span className="text-base font-bold text-slate-900 font-mono">
                    {selectedStudentForDetail.attendanceAbsence} Gün
                  </span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-800 block mb-1">Veli İletişim Bilgileri</span>
                <div className="p-2.5 bg-slate-50 rounded-md border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{selectedStudentForDetail.parentName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {selectedStudentForDetail.parentPhone}
                    </div>
                  </div>
                  <a
                    href={`tel:${selectedStudentForDetail.parentPhone}`}
                    className="p-1.5 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-800 block mb-1">Proje Ödevi Başlığı</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-md border border-slate-100">
                  {selectedStudentForDetail.projectAssignmentTitle || 'Henüz proje konusu seçilmedi.'}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-800 block mb-1">Öğretmen Gözlem Notları</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-md border border-slate-100 leading-relaxed">
                  {selectedStudentForDetail.behaviorNotes}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={() => {
                    const s = selectedStudentForDetail;
                    setSelectedStudentForDetail(null);
                    setEditingStudent(s);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  Notları Düzenle
                </button>

                <button
                  onClick={() => handleOpenGradesLink(selectedStudentForDetail.fullName)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                >
                  <span>Not Linkini Aç</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {currentClass.name} Sınıfına Yeni Öğrenci Ekle
              </h3>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Okul No</label>
                  <input
                    type="text"
                    required
                    placeholder="101"
                    value={newStudentNumber}
                    onChange={(e) => setNewStudentNumber(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Adı Soyadı</label>
                  <input
                    type="text"
                    required
                    placeholder="Ad Soyad"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Veli Adı</label>
                  <input
                    type="text"
                    placeholder="Anne / Baba Adı"
                    value={newParentName}
                    onChange={(e) => setNewParentName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Veli Telefonu</label>
                  <input
                    type="tel"
                    placeholder="0532 ..."
                    value={newParentPhone}
                    onChange={(e) => setNewParentPhone(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Gözlem / Rehberlik Notu</label>
                <textarea
                  rows={2}
                  placeholder="Öğrenciye dair başlangıç notları..."
                  value={newBehaviorNotes}
                  onChange={(e) => setNewBehaviorNotes(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Öğrenciyi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Class Modal */}
      {isAddClassOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">Yeni Sınıf Oluştur</h3>
              <button
                onClick={() => setIsAddClassOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Sınıf Şubesi</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 10-C veya 12-A"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Alan / Dal</label>
                <input
                  type="text"
                  placeholder="Örn: Bilişim Teknolojileri / Yazılım"
                  value={newClassField}
                  onChange={(e) => setNewClassField(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Sınıf Seviyesi</label>
                <select
                  value={newClassGrade}
                  onChange={(e) => setNewClassGrade(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value={8}>8. Sınıf</option>
                  <option value={9}>9. Sınıf</option>
                  <option value={10}>10. Sınıf</option>
                  <option value={11}>11. Sınıf</option>
                  <option value={12}>12. Sınıf</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddClassOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Sınıfı Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
