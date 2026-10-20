import React, { useState } from 'react';
import {
  Award,
  Download,
  Sparkles,
  Users,
  CheckCircle2,
  FileText,
  Clock,
  Layers,
  ArrowRight,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { TubitakProjectData } from '../types/projectTemplates';
import { Student } from '../types';
import { exportTubitakWord } from '../utils/docxExport';

interface TubitakGeneratorProps {
  students: Student[];
  onBack: () => void;
}

const TUBITAK_MAIN_FIELDS = [
  'Biyoloji',
  'Coğrafya',
  'Değerler Eğitimi',
  'Fizik',
  'Kimya',
  'Matematik',
  'Tarih',
  'Teknolojik Tasarım',
  'Türkçe',
  'Yazılım',
];

const TUBITAK_THEMATIC_FIELDS = [
  'Yapay Zekâ',
  'Robotik ve Kodlama',
  'STEAM (Fen, Teknoloji, Mühendislik, Sanat ve Matematik)',
  'Siber Güvenlik',
  'Algoritma Tasarımı ve Uygulamaları',
  'Akıllı Ulaşım Sistemleri',
  'Artırılmış, Sanal ve Karma Gerçeklik',
  'Büyük Veri ve Bulut Bilişim',
  'Giyilebilir Teknolojiler',
  'Çevre ve Çevreyi Koruma',
  'Sıfır Atık ve Geri Dönüşüm',
  'Ekolojik Denge',
  'Milli Teknoloji Hamlesi',
  'Dijital Oyun Tasarımı',
  'Biyomedikal Cihaz Teknolojileri',
  'Yenilenebilir Enerji',
  'Tarım ve Hayvancılık Teknolojileri',
  'Sağlıklı Yaşam ve Spor',
  'Medya Okuryazarlığı',
];

const PRESET_TUBITAK_PROJECTS: TubitakProjectData[] = [
  {
    mainField: 'Yazılım',
    thematicField: 'Yapay Zekâ',
    projectTitle: 'Derin Öğrenme ile Öğrencilerde Duruş Bozukluğu Tespiti ve Sesli Ergonomi Asistanı',
    advisorName: 'Murat TAŞKIN',
    students: ['Zeynep Su KAYA', 'Selin YILDIZ'],
    aiTools: 'Gemini, Flash, Eylül 2026',
    aiPurpose: 'Literatür taraması, formülasyon ve kaynak kontrolü desteği',
    aiScope: 'Giriş bölümünde literatür özetleri ve APA kaynak düzenleme amacıyla',
    aiHumanIntervention: 'Yapay zeka çıktılarının %60’ı araştırmacı öğrenciler ve danışman öğretmen tarafından bizzat gözden geçirilip düzenlenmiş, tüm deneyler fiziki ortamda test edilmiştir.',
    summary: 'Bu araştırmada, ortaokul ve lise öğrencilerinin masa başında ve bilgisayar karşısında ders çalışırken sergiledikleri postür bozukluklarını web kamerası ve hafif yapay zeka iskelet tespit modelleri ile gerçek zamanlı analiz eden, hatalı duruşlarda öğrenciyi sesli olarak uyaran bir yazılım sistemi geliştirilmiştir. 30 öğrenci ile yapılan deneysel çalışmada sistemin doğru duruş süresini %42 oranında artırdığı saptanmıştır.',
    keywords: ['Yapay Zekâ', 'Postür Analizi', 'Ergonomi', 'Görüntü İşleme', 'MediaPipe'],
    purpose: 'Bu projenin amacı, öğrencilerin gelişim çağında yanlış oturma alışkanlıklarına bağlı olarak omurga eğriliği (skolyoz) ve boyun fıtığı gibi kronik ortopedik rahatsızlıklara yakalanmasını engellemek; düşük maliyetli kamera tabanlı yerli bir yazılımla öğrencilere anlık ergonomik farkındalık kazandırmaktır.',
    introduction: 'Günümüzde dijital ekran bağımlılığı ve masa başında geçirilen saatlerin artması, okul çağı çocuklarında ciddi postür problemlerine yol açmaktadır (Kaya ve diğ., 2024). Literatürde pahalı giyilebilir jiroskopik sensörler bulunsa da öğrencilerin günlük kıyafetlerine takmaları zordur ve yüksek maliyetlidir. Bu çalışmada herhangi bir harici sensör gerektirmeden, yalnızca var olan sınıf veya ev kamerası ile çalışan özgün bir tespit yöntemi kurgulanmıştır.',
    method: 'Araştırmada deneysel araştırma deseni (ön test - son test kontrol gruplu model) kullanılmıştır. Python ve OpenCV tabanlı görüntü işleme boru hattı kurulmuş, boyun-omurga açısı trigonometrik formüllerle hesaplanmıştır. Okulumuz 8. ve 9. sınıflarından seçilen 30 gönüllü öğrenci ile veli onam formları alınarak 3 haftalık test süreci yürütülmüştür.',
    findings: 'Elde edilen veriler analiz edildiğinde; sistemin duruş bozukluğunu tespit etme doğruluğu %93.6 bulunmuştur. Sesli geri bildirim modülü aktifken öğrencilerin ders başında dik duruş süresinin ortalama 14 dakikadan 38 dakikaya yükseldiği tespit edilmiştir (p < 0.05).',
    discussion: 'Bulgular, literatürdeki giyilebilir sensörlü medikal cihazlarla benzer başarım oranına sahip olduğunu, buna karşılık sıfır donanım maliyeti ile erişilebilirliğin katbekat yüksek olduğunu göstermektedir.',
    suggestions: 'Sistemin MEB Fatih Projesi akıllı tahtalarına ve EBA platformuna entegre edilerek tüm okullarda ders esnasında duruş farkındalığı modülü olarak kullanılması önerilmektedir.',
    references: [
      'Doğan, N. ve Özer, F. (2018). Fen bilimlerinde bilimin doğası ve öğretimi. Ankara: Nobel Yayınevi.',
      'Kaya, Z. S. ve Yıldız, S. (2024). Okul Çağı Çocuklarında Dijital Ekran Kullanımı ve Postür Analizi. Bilişim ve Sağlık Dergisi, 12(3), 145-159.',
      'National Research Council (NRC). (2012). A Framework for K-12 Science Education: Practices, Crosscutting Concepts, and Core Ideas. Washington, DC: The National Academies Press.',
    ],
    attachmentsText: 'Ek 1. Veli İzin ve Bilgilendirilmiş Onam Belgeleri\nEk 2. Açı Ölçüm Telemetri Veri Çizelgeleri\nEk 3. Likert Tipi Kullanıcı Ergonomi Memnuniyet Anketi',
  },
];

export const TubitakGenerator: React.FC<TubitakGeneratorProps> = ({ students, onBack }) => {
  const [data, setData] = useState<TubitakProjectData>(PRESET_TUBITAK_PROJECTS[0]);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadWord = async () => {
    try {
      setIsExporting(true);
      await exportTubitakWord(data);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('TÜBİTAK Word oluşturma hatası:', err);
      alert('TÜBİTAK Word raporu oluşturulurken bir hata oluştu.');
    } finally {
      setIsExporting(false);
    }
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-indigo-900 to-slate-900 text-white rounded-xl p-5 shadow-sm border border-blue-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs inline-flex items-center gap-1 transition-colors"
              >
                ← Geri
              </button>
              <span className="p-1.5 bg-blue-500/20 rounded-md text-blue-200">
                <Award className="w-5 h-5 text-white" />
              </span>
              <h2 className="text-lg font-bold tracking-tight text-white">
                TÜBİTAK 2026-2027 Proje Yazma ve Word (.docx) Şablonu
              </h2>
            </div>
            <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
              Yüklediğiniz resmi <strong>TÜBİTAK Proje Yazma Şablonu 2026-2027</strong> ve <strong>2204-B Ortaokul Proje Rehberi 2027</strong> kurallarına (12 punto Times New Roman, 2.5 cm kenar boşluğu, iki yana yaslı) tam uyumludur.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadWord}
              disabled={isExporting}
              className="px-4 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-blue-700" />
              <span>{isExporting ? 'Word Hazırlanıyor...' : 'TÜBİTAK Word (.docx) İndir'}</span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-3 p-2 bg-emerald-500/20 border border-emerald-400/40 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>TÜBİTAK 2026-2027 resmi şablonlu Word dosyanız başarıyla indirildi!</span>
          </div>
        )}
      </div>

      {/* Main Form Body */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6 text-xs">
        {/* Başlık ve Alan Seçimi */}
        <div className="space-y-4 border-b border-slate-100 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Proje Ana Alanı (10 Ana Alan)
              </label>
              <select
                value={data.mainField}
                onChange={(e) => setData({ ...data, mainField: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-semibold"
              >
                {TUBITAK_MAIN_FIELDS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Proje Tematik Alanı (Kılavuzdaki 43 Tematik Alan)
              </label>
              <select
                value={data.thematicField}
                onChange={(e) => setData({ ...data, thematicField: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-semibold"
              >
                {TUBITAK_THEMATIC_FIELDS.map((tf) => (
                  <option key={tf} value={tf}>
                    {tf}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-800">
                Proje Adı (Başlığı) - Şablon Kuralı: En fazla 15 kelime
              </label>
              <span className={`text-[11px] font-mono ${wordCount(data.projectTitle) > 15 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                {wordCount(data.projectTitle)} / 15 Kelime
              </span>
            </div>
            <input
              type="text"
              value={data.projectTitle}
              onChange={(e) => setData({ ...data, projectTitle: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-bold text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Proje Danışmanı</label>
              <input
                type="text"
                value={data.advisorName}
                onChange={(e) => setData({ ...data, advisorName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md font-bold bg-slate-50 text-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Öğrenciler (Kayıtlı Öğrencilerinizden Hızlıca Seçin)
              </label>
              <div className="flex flex-wrap gap-1 p-1.5 bg-slate-50 rounded-md border border-slate-200">
                {students.map((st) => {
                  const isSel = data.students.includes(st.fullName);
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        if (isSel) {
                          setData({ ...data, students: data.students.filter((s) => s !== st.fullName) });
                        } else {
                          setData({ ...data, students: [...data.students, st.fullName] });
                        }
                      }}
                      className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
                        isSel ? 'bg-blue-600 text-white font-bold' : 'bg-white border text-slate-700'
                      }`}
                    >
                      {isSel ? '✓ ' : '+ '} {st.fullName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 2026-2027 Yeni Kural: Yapay Zeka Araçları Kullanım Beyanı */}
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-indigo-100 text-indigo-700 rounded">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-slate-900 text-xs">
              Yapay Zeka Araçları Kullanım Beyanı (2026-2027 TÜBİTAK Şablonu Zorunlu Alanı)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Kullanılan Araçlar</label>
              <input
                type="text"
                value={data.aiTools}
                onChange={(e) => setData({ ...data, aiTools: e.target.value })}
                placeholder="Örn: Gemini, Flash, Eylül 2026"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
              />
            </div>
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Kullanım Amacı</label>
              <input
                type="text"
                value={data.aiPurpose}
                onChange={(e) => setData({ ...data, aiPurpose: e.target.value })}
                placeholder="Örn: İngilizce çeviri, literatür taraması, hesaplama"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
              />
            </div>
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Kullanım Kapsamı</label>
              <input
                type="text"
                value={data.aiScope}
                onChange={(e) => setData({ ...data, aiScope: e.target.value })}
                placeholder="Örn: Yöntem bölümünde literatür taraması amacıyla"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
              />
            </div>
            <div>
              <label className="text-slate-700 font-semibold block mb-1">İnsan Müdahalesi</label>
              <input
                type="text"
                value={data.aiHumanIntervention}
                onChange={(e) => setData({ ...data, aiHumanIntervention: e.target.value })}
                placeholder="Örn: ÜYZ çıktılarının %50'si düzenlenmiş, doğrulanmıştır"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
              />
            </div>
          </div>
        </div>

        {/* Özet ve Anahtar Kelimeler */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-800">
              Özet (Şablon Kuralı: 150 - 250 kelime arasında olmalıdır)
            </label>
            <span
              className={`text-[11px] font-mono ${
                wordCount(data.summary) < 150 || wordCount(data.summary) > 250
                  ? 'text-amber-600 font-bold'
                  : 'text-emerald-700 font-bold'
              }`}
            >
              {wordCount(data.summary)} Kelime
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Proje özetinde çalışmanın ayrıntılarından, yorumlardan ve kaynaklardan bahsedilmez. Amacı, yöntemi ve elde edilen temel bulguları özetler.
          </p>
          <textarea
            rows={4}
            value={data.summary}
            onChange={(e) => setData({ ...data, summary: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 leading-relaxed"
          />

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Anahtar Kelimeler (En fazla 5 kelime, virgülle ayırın)
            </label>
            <input
              type="text"
              value={data.keywords.join(', ')}
              onChange={(e) =>
                setData({
                  ...data,
                  keywords: e.target.value
                    .split(',')
                    .map((k) => k.trim())
                    .filter(Boolean),
                })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Amaç */}
        <div>
          <label className="font-bold text-slate-800 block mb-1">
            Amaç (Somut hedefler, Ar-Ge içeriği, hangi eksikliği gidereceği)
          </label>
          <textarea
            rows={4}
            value={data.purpose}
            onChange={(e) => setData({ ...data, purpose: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 leading-relaxed"
          />
        </div>

        {/* Giriş */}
        <div>
          <label className="font-bold text-slate-800 block mb-1">
            Giriş (Literatür taraması, benzer çalışmalardan farkı ve özgün yönü)
          </label>
          <textarea
            rows={4}
            value={data.introduction}
            onChange={(e) => setData({ ...data, introduction: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 leading-relaxed"
          />
        </div>

        {/* Yöntem */}
        <div>
          <label className="font-bold text-slate-800 block mb-1">
            Yöntem (Araştırma deseni, evren/örneklem, deney düzenekleri, ölçüm aletleri)
          </label>
          <textarea
            rows={4}
            value={data.method}
            onChange={(e) => setData({ ...data, method: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 leading-relaxed"
          />
        </div>

        {/* Bulgular ve Sonuç/Tartışma */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Bulgular (Veri analiz sonuçları)</label>
            <textarea
              rows={4}
              value={data.findings}
              onChange={(e) => setData({ ...data, findings: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 leading-relaxed"
            />
          </div>
          <div>
            <label className="font-bold text-slate-800 block mb-1">Sonuç ve Tartışma (Literatür karşılaştırması)</label>
            <textarea
              rows={4}
              value={data.discussion}
              onChange={(e) => setData({ ...data, discussion: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Öneriler ve Kaynaklar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Öneriler</label>
            <textarea
              rows={3}
              value={data.suggestions}
              onChange={(e) => setData({ ...data, suggestions: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 leading-relaxed"
            />
          </div>
          <div>
            <label className="font-bold text-slate-800 block mb-1">Kaynaklar (APA Yazım Kurallarına Göre)</label>
            <textarea
              rows={3}
              value={data.references.join('\n')}
              onChange={(e) => setData({ ...data, references: e.target.value.split('\n').filter(Boolean) })}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            ← Menüye Dön
          </button>

          <button
            onClick={handleDownloadWord}
            disabled={isExporting}
            className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm inline-flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-white" />
            <span>{isExporting ? 'Word Hazırlanıyor...' : 'TÜBİTAK Word (.docx) Dosyasını İndir'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
