import React, { useState } from 'react';
import {
  Rocket,
  Download,
  Sparkles,
  Users,
  CheckCircle2,
  FileText,
  Clock,
  Layers,
  ArrowRight,
  RotateCcw,
  Plus,
  Trash2,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { TeknofestProjectData, WorkPackage } from '../types/projectTemplates';
import { Student } from '../types';
import { exportTeknofestWord } from '../utils/docxExport';

interface TeknofestGeneratorProps {
  students: Student[];
  onBack: () => void;
}

const DEFAULT_WORK_PACKAGES: WorkPackage[] = [
  { id: 'wp-1', title: 'İhtiyaç Analizi ve Literatür Taraması', subActivities: 'Akademik yayınların incelenmesi, anket ve kullanıcı ihtiyaç analizi', duration: 'Eylül 2026' },
  { id: 'wp-2', title: 'Sistem Mimarisi ve Devre Tasarımı', subActivities: 'Sensör seçimi, 3D gövde çizimi ve elektronik şematik hazırlama', duration: 'Ekim 2026' },
  { id: 'wp-3', title: 'Yazılım ve Yapay Zeka Model Eğitimi', subActivities: 'Görüntü işleme algoritmaları ve gömülü yazılımın kodlanması', duration: 'Kasım 2026' },
  { id: 'wp-4', title: 'Prototip Üretimi ve Laboratuvar Testleri', subActivities: 'Bileşenlerin birleştirilmesi, kalibrasyon ve hata ayıklama testleri', duration: 'Aralık 2026' },
  { id: 'wp-5', title: 'Saha Denemeleri ve İyileştirmeler', subActivities: 'Hedef kitle ile pilot testler ve kullanıcı geri bildirimlerinin entegrasyonu', duration: 'Ocak 2027' },
  { id: 'wp-6', title: 'Sonuç Raporu ve Sunum Hazırlığı', subActivities: 'Raporun hazırlanması, SWOT analizi ve KYS başvuru yüklemesi', duration: 'Şubat 2027' },
];

const PRESET_TEKNOFEST_PROJECTS: TeknofestProjectData[] = [
  {
    projectTitle: 'Yapay Zeka Destekli İnteraktif Eğitim ve Deney İstasyonu',
    competitionCategory: 'Eğitim Teknolojileri Yarışması',
    teamLevel: 'Ortaokul',
    teamName: 'Genç Mucitler Teknoloji Takımı',
    teamId: 'TKN-2026-8942',
    applicationId: 'KYS-2026-5510',
    advisorName: 'Murat TAŞKIN',
    teamLeader: 'Ahmet Eren YILMAZ',
    teamMembers: ['Ahmet Eren YILMAZ', 'Zeynep Su KAYA', 'Elif Naz ÇELİK'],
    summary: 'Fen ve teknoloji derslerinde öğrencilerin karmaşık fizik ve kimya deneylerini tehlikesiz bir ortamda, bilgisayarlı görü ve yapay zeka destekli el hareketleri ile simüle etmelerini sağlayan, düşük maliyetli interaktif bir eğitim istasyonudur. Proje, Türkiye Yüzyılı Maarif Modeli kazanımları ile uyumlu olup öğrencinin bilişsel ve psikomotor becerilerini eş zamanlı geliştirmeyi hedefler.',
    problemStatement: 'Özellikle kırsal ve kısıtlı imkana sahip okullarda fen laboratuvarı altyapısının yetersizliği, kimyasal sarf malzemelerinin pahalılığı ve tehlikeli reaksiyonların öğrenciler için oluşturduğu güvenlik riskleri en temel problemdir. Mevcut dijital simülasyonlar ise pasif fare tıklamalarıyla sınırlı kalmakta ve gerçek dokunma/uygulama hissini vermemektedir.',
    solution: 'Web kamerası ve MediaPipe el iskeleti tespiti kütüphanesi kullanarak öğrencilerin tüpleri, mercekleri ve devre elemanlarını fiziksel elleriyle sanal uzayda tutup yönetebildiği bir yazılım geliştirilmiştir. Sistem, yapılan deney adımlarını gerçek zamanlı değerlendirerek öğrenciye sesli ve görsel anında dönüt verir.',
    methodology: 'Proje, mühendislik tasarım süreci ilkelerine göre yürütülmüştür. OpenCV ve Python tabanlı görüntü işleme modelleri optimize edilmiş, yerel bilgisayarlarda yüksek donanım gerektirmeden 60 FPS hızında çalışması sağlanmıştır. 9-A ve 8-B sınıflarında kontrol ve deney gruplu ön test-son test uygulaması yapılmıştır.',
    prototypeType: 'Yazılım ve Donanım Hibrit Çözümü',
    prototypeStatus: 'Prototipin alfa sürümü okul laboratuvarında test edilmiş, hareket algılama doğruluğu %94 olarak ölçülmüştür. 3D yazıcı ile taşınabilir kamera ayağı ve kalibrasyon paneli üretilmiştir.',
    hardwareSpecs: 'HD Geniş Açı Web Kamerası, Raspberry Pi 5 / Mini PC, 3D Baskı Masaüstü Stand, Akıllı Tahta Bağlantı Arayüzü',
    softwareSpecs: 'Python 3.11, MediaPipe, OpenCV, React, WebSockets, SQLite Yerel Veri Kaydı',
    commercializationAndSustainability: 'Milli Eğitim Bakanlığı EBA portalına entegre edilebilecek açık kaynak mimaride tasarlanmıştır. Düşük maliyeti (ticari VR kitlerinin %5 maliyetinde) sayesinde tüm devlet okullarına hızla yaygınlaştırılabilir ve B2B eğitim teknolojileri pazarında yüksek ihracat potansiyeli taşır.',
    innovationAndLocality: 'Piyasadaki pahalı yabancı VR gözlük setlerine bağımlılığı ortadan kaldıran, tamamen yerli yazılım kodlamasıyla geliştirilen özgün bir algoritma kullanılmıştır. Türkçe sesli yönlendirmeler ve yerel müfredat deney setleri ile desteklenmiştir.',
    targetAudience: 'Ortaokul 5-8. sınıf öğrencileri, fen bilimleri ve bilişim teknolojileri öğretmenleri, teknoloji ve bilim atölyeleri.',
    workPackages: DEFAULT_WORK_PACKAGES,
    swotStrengths: 'Düşük maliyet, yüksek erişilebilirlik, yerli yazılım mimarisi, müfredatla doğrudan entegrasyon ve kolay kurulum.',
    swotWeaknesses: 'Düşük ışıklı ortamlarda kamera algılama hassasiyetinin hafif düşmesi (harici aydınlatma ile çözüldü).',
    swotOpportunities: 'TEKNOFEST ve MEB iş birlikleri, TÜBİTAK destekleri, okullardaki akıllı tahta altyapısının hazır bulunması.',
    swotThreats: 'Piyasaya çıkabilecek yabancı büyük teknoloji firmalarının kapalı kaynaklı alternatif ürünleri.',
    slogan: 'Ellerimizle Keşfediyor, Geleceğin Bilimini Bugünden Kodluyoruz!',
  },
  {
    projectTitle: 'Akıllı Tarım ve Sera İçin Uç Yapay Zekalı Otonom İklimlendirme',
    competitionCategory: 'Tarım Teknolojileri Yarışması',
    teamLevel: 'Lise',
    teamName: 'TeknoToprak İnovasyon Timi',
    teamId: 'TKN-2026-3104',
    applicationId: 'KYS-2026-7892',
    advisorName: 'Murat TAŞKIN',
    teamLeader: 'Mehmet Ali ÖZTÜRK',
    teamMembers: ['Mehmet Ali ÖZTÜRK', 'Selin YILDIZ', 'Yusuf Emre KOÇ'],
    summary: 'Toprak nemi, ortam sıcaklığı ve yaprak sağlığını IoT sensörleri ile izleyen, internet kesintisinde dahi uç yapay zeka (TinyML) ile sulama ve havalandırma kararlarını otonom veren yerli sera kontrol istasyonudur.',
    problemStatement: 'Tarımsal sulamada %40 oranında su israfı yaşanması ve kırsal alanlarda internet bağlantısının sık sık kopması sebebiyle bulut tabanlı akıllı sera sistemlerinin devre dışı kalması.',
    solution: 'ESP32 ve mikroişlemci üzerinde çalışan yerel TinyML karar ağacı modeli ile internet olmasa dahi toprak ve hava verilerini işleyip selenoid vanaları milisaniyeler içinde tetikleyen sistem.',
    methodology: 'Sensör kalibrasyon testleri, donanım tasarımı, C++ gömülü kodlama, sera içi 30 günlük pilot deneme ve su tasarrufu ölçümleri.',
    prototypeType: 'Donanım ve Gömülü Yazılım Sistemi',
    prototypeStatus: 'Okul uygulama serasında 1 aylık test dönemi tamamlanmış, su tüketiminde %38 tasarruf sağlandığı raporlanmıştır.',
    hardwareSpecs: 'ESP32 Wi-Fi/LoRa, Kapasitif Toprak Nem Sensörü v1.2, DHT22 Sıcaklık/Nem, 12V Selenoid Su Vanası, Güneş Paneli ve LiFePO4 Batarya',
    softwareSpecs: 'Arduino C++, TinyML TensorFlow Lite for Microcontrollers, Flutter Mobil Arayüz',
    commercializationAndSustainability: 'Örtü altı seracılık yapan yerel üreticilere ve tarım liselerine uygun fiyatlı modüler kit olarak sunulabilir. Güneş enerjili besleme sayesinde şebekeden bağımsız çalışır.',
    innovationAndLocality: 'İnternet bağımlılığını kaldıran yerel uç yapay zeka mimarisi, yerli sensör yerleşimi ve LoRa ile 10 km mesafeden veri aktarımı.',
    targetAudience: 'Sera üreticileri, tarım kooperatifleri, mesleki ve teknik anadolu liseleri tarım bölümleri.',
    workPackages: DEFAULT_WORK_PACKAGES,
    swotStrengths: 'İnternet kesintisine dayanıklılık, güneş enerjili otonom çalışma, yüksek su tasarrufu, kolay kurulum.',
    swotWeaknesses: 'Aşırı korozyonlu toprak şartlarında sensör ömrünün 2 yılda bir bakım gerektirmesi.',
    swotOpportunities: 'İklim krizi ve su kıtlığı karşısında artan akıllı sulama hibeleri ve devlet teşvikleri.',
    swotThreats: 'İthal elektronik parça tedarik sürelerinin uzaması.',
    slogan: 'Toprağa Can, Geleceğe Nefes: Akıllı Tarımla Güçlü Türkiye!',
  },
];

export const TeknofestGenerator: React.FC<TeknofestGeneratorProps> = ({ students, onBack }) => {
  const [data, setData] = useState<TeknofestProjectData>(PRESET_TEKNOFEST_PROJECTS[0]);
  const [isExporting, setIsExporting] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleApplyPreset = (preset: TeknofestProjectData) => {
    setData(preset);
  };

  const handleDownloadWord = async () => {
    try {
      setIsExporting(true);
      await exportTeknofestWord(data);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Word oluşturma hatası:', err);
      alert('Word dosyası oluşturulurken bir hata oluştu.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Banner & Navigation */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-slate-900 text-white rounded-xl p-5 shadow-sm border border-red-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs inline-flex items-center gap-1 transition-colors"
              >
                ← Geri
              </button>
              <span className="p-1.5 bg-red-500/20 rounded-md text-red-200">
                <Rocket className="w-5 h-5 text-white" />
              </span>
              <h2 className="text-lg font-bold tracking-tight text-white">
                TEKNOFEST 2026 Proje Hazırlama ve Rapor Sihirbazı
              </h2>
            </div>
            <p className="text-xs text-red-100 max-w-2xl leading-relaxed">
              Yüklediğiniz resmi <strong>TEKNOFEST Eğitim Teknolojileri Sunum Şablonu</strong> ve <strong>2026 Yarışmalar Başvuru Kılavuzu</strong>na tam uyumlu proje yazma ve Word (.docx) çıktısı oluşturma platformu.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadWord}
              disabled={isExporting}
              className="px-4 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-red-700" />
              <span>{isExporting ? 'Word Hazırlanıyor...' : 'Word (.docx) İndir'}</span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-3 p-2 bg-emerald-500/20 border border-emerald-400/40 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Resmi TEKNOFEST 2026 Word raporunuz başarıyla bilgisayarınıza indirildi!</span>
          </div>
        )}
      </div>

      {/* Preset Quick Loader Buttons */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="font-semibold text-slate-800">Hazır Örnek Taslaklar:</span>
          <span>Kılavuza uygun ödüllü proje örneklerini anında forma yükleyebilirsiniz.</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {PRESET_TEKNOFEST_PROJECTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-red-700 hover:bg-red-50 border border-slate-200 rounded-lg transition-colors"
            >
              {p.competitionCategory.split(' ')[0]} Şablonu Yükle
            </button>
          ))}
        </div>
      </div>

      {/* Step Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { step: 1, title: '1. Takım ve Başvuru Bilgileri' },
          { step: 2, title: '2. Özet, Problem ve Çözüm' },
          { step: 3, title: '3. Yöntem ve Prototip' },
          { step: 4, title: '4. Yerlilik, Ticarileşme, Kitle' },
          { step: 5, title: '5. İş Takvimi ve SWOT' },
        ].map((tab) => (
          <button
            key={tab.step}
            onClick={() => setActiveStep(tab.step)}
            className={`px-3.5 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeStep === tab.step
                ? 'bg-red-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Form Content Steps */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6">
        {/* STEP 1: Takım & Kapak Bilgileri */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Kapak Sayfası ve Takım Bilgileri</h3>
              <p className="text-xs text-slate-500">
                TEKNOFEST 2026 KYS sistemi ve resmi sunum şablonu kapak sayfası gereksinimleri
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Proje Adı (En fazla 15 kelime)
                </label>
                <input
                  type="text"
                  value={data.projectTitle}
                  onChange={(e) => setData({ ...data, projectTitle: e.target.value })}
                  placeholder="Projenizin resmi adı..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 font-semibold text-slate-900"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Kelime sayısı: {data.projectTitle.trim().split(/\s+/).filter(Boolean).length} / 15
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Yarışma Kategorisi</label>
                <select
                  value={data.competitionCategory}
                  onChange={(e) => setData({ ...data, competitionCategory: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 font-medium"
                >
                  <option value="Eğitim Teknolojileri Yarışması">Eğitim Teknolojileri Yarışması</option>
                  <option value="İnsanlık Yararına Teknoloji - Afet Yönetimi">İnsanlık Yararına Teknoloji - Afet Yönetimi</option>
                  <option value="İnsanlık Yararına Teknoloji - Sağlık ve İlkyardım">İnsanlık Yararına Teknoloji - Sağlık ve İlkyardım</option>
                  <option value="Akıllı Ulaşım Yarışması">Akıllı Ulaşım Yarışması</option>
                  <option value="Çevre ve Enerji Teknolojileri">Çevre ve Enerji Teknolojileri</option>
                  <option value="Tarım Teknolojileri Yarışması">Tarım Teknolojileri Yarışması</option>
                  <option value="Yapay Zeka ve Büyük Veri">Yapay Zeka ve Büyük Veri</option>
                  <option value="Engelsiz Yaşam Teknolojileri">Engelsiz Yaşam Teknolojileri</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Takım Seviyesi</label>
                <select
                  value={data.teamLevel}
                  onChange={(e) => setData({ ...data, teamLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500"
                >
                  <option value="İlkokul">İlkokul</option>
                  <option value="Ortaokul">Ortaokul</option>
                  <option value="Lise">Lise</option>
                  <option value="Üniversite ve Üzeri">Üniversite ve Üzeri</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Takım Adı</label>
                <input
                  type="text"
                  value={data.teamName}
                  onChange={(e) => setData({ ...data, teamName: e.target.value })}
                  placeholder="Örn: Geleceğin Yıldızları"
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Takım ID (KYS)</label>
                <input
                  type="text"
                  value={data.teamId}
                  onChange={(e) => setData({ ...data, teamId: e.target.value })}
                  placeholder="Örn: TKN-2026-XXXX"
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Başvuru ID (KYS)</label>
                <input
                  type="text"
                  value={data.applicationId}
                  onChange={(e) => setData({ ...data, applicationId: e.target.value })}
                  placeholder="Örn: KYS-2026-YYYY"
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Takım Danışmanı</label>
                <input
                  type="text"
                  value={data.advisorName}
                  onChange={(e) => setData({ ...data, advisorName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 font-bold bg-slate-50"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Takım Kaptanı</label>
                <input
                  type="text"
                  value={data.teamLeader}
                  onChange={(e) => setData({ ...data, teamLeader: e.target.value })}
                  placeholder="Kaptan öğrenci adı soyadı"
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Öğrenci Takımı Seçimi */}
            <div className="pt-3 border-t border-slate-100 text-xs">
              <label className="font-bold text-slate-800 block mb-1">
                Takım Üyeleri (Kayıtlı Öğrencilerinizden Hızlıca Ekleyin)
              </label>
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200 mb-2">
                {students.map((st) => {
                  const isSelected = data.teamMembers.includes(st.fullName);
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setData({ ...data, teamMembers: data.teamMembers.filter((m) => m !== st.fullName) });
                        } else {
                          setData({ ...data, teamMembers: [...data.teamMembers, st.fullName] });
                        }
                      }}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                        isSelected
                          ? 'bg-red-600 text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-red-300'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '} {st.fullName} ({st.schoolNumber})
                    </button>
                  );
                })}
              </div>
              <div className="text-slate-500 text-[11px]">
                Seçili Üyeler: <strong className="text-slate-800">{data.teamMembers.join(', ') || 'Henüz üye eklenmedi'}</strong>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg inline-flex items-center gap-1.5"
              >
                <span>Özet ve Problem Adımına Geç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Özet, Problem ve Çözüm */}
        {activeStep === 2 && (
          <div className="space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Özet, Problem Tanımı ve Çözüm</h3>
              <p className="text-xs text-slate-500">
                Resmi TEKNOFEST Şablonu: Özet (en fazla 1 sayfa), Problem (en fazla 2 sayfa), Çözüm (en fazla 2 sayfa)
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-800">
                  1. Proje/Fikir Özeti (Kılavuz Kuralı: En fazla 1 sayfa)
                </label>
                <span className="text-[11px] text-slate-400">
                  {data.summary.trim().split(/\s+/).filter(Boolean).length} kelime
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-1.5">
                Proje konusu, neden seçildiği, proje amacı ve kullanılan yöntemden kısaca bahsedilmelidir.
              </p>
              <textarea
                rows={4}
                value={data.summary}
                onChange={(e) => setData({ ...data, summary: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 leading-relaxed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-800">
                  2. Problem Tanımı ve Literatür Araştırması (En fazla 2 sayfa)
                </label>
                <span className="text-[11px] text-slate-400">
                  {data.problemStatement.trim().split(/\s+/).filter(Boolean).length} kelime
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-1.5">
                Mevcut durum nedir ve bu durumda karşılaşılan problemler nelerdir? İlgili literatür araştırması ve daha önce yapılmış çalışmalarla destekleyiniz.
              </p>
              <textarea
                rows={5}
                value={data.problemStatement}
                onChange={(e) => setData({ ...data, problemStatement: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 leading-relaxed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-800">
                  3. Çözüm Önerisi ve Yenilikçi Yaklaşım (En fazla 2 sayfa)
                </label>
                <span className="text-[11px] text-slate-400">
                  {data.solution.trim().split(/\s+/).filter(Boolean).length} kelime
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-1.5">
                Çözüm fikri, problem ile uyumlu olarak kapsamlı, yenilikçi ve etkili şekilde açıklanmalıdır. Literatürdeki çözümlerden farkı ve toplumsal faydası belirtilmelidir.
              </p>
              <textarea
                rows={5}
                value={data.solution}
                onChange={(e) => setData({ ...data, solution: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 leading-relaxed"
              />
            </div>

            <div className="flex justify-between pt-3">
              <button
                onClick={() => setActiveStep(1)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                ← Önceki Adım
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg inline-flex items-center gap-1.5"
              >
                <span>Yöntem ve Prototip Adımına Geç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Yöntem ve Prototip Durumu */}
        {activeStep === 3 && (
          <div className="space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Yöntem ve Prototip / Uygulama Geliştirme Durumu</h3>
              <p className="text-xs text-slate-500">
                Resmi TEKNOFEST Şablonu: Yöntem (en fazla 2 sayfa), Prototip Geliştirme Durumu (en fazla 1 sayfa)
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                4. Yöntem (Problem çözümü için seçilen yöntem, analizler ve kullanılan malzemeler)
              </label>
              <textarea
                rows={5}
                value={data.methodology}
                onChange={(e) => setData({ ...data, methodology: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Sistem / Prototip Türü</label>
                <select
                  value={data.prototypeType}
                  onChange={(e) => setData({ ...data, prototypeType: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500"
                >
                  <option value="Yazılım Temelli Çözüm">Yazılım Temelli Çözüm</option>
                  <option value="Donanım Temelli Çözüm">Donanım Temelli Çözüm</option>
                  <option value="Yazılım ve Donanım Hibrit Çözümü">Yazılım ve Donanım Hibrit Çözümü</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Kullanılan Donanım & Sensörler</label>
                <input
                  type="text"
                  value={data.hardwareSpecs}
                  onChange={(e) => setData({ ...data, hardwareSpecs: e.target.value })}
                  placeholder="ESP32, Raspberry Pi, DHT22 vb."
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Kullanılan Yazılım & Kütüphaneler</label>
                <input
                  type="text"
                  value={data.softwareSpecs}
                  onChange={(e) => setData({ ...data, softwareSpecs: e.target.value })}
                  placeholder="Python, OpenCV, React, C++ vb."
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                5. Prototip / Uygulama Geliştirme Durumu (Tasarım, Üretim, Kodlama, Test Aşamaları)
              </label>
              <p className="text-[11px] text-slate-500 mb-1.5">
                Bu aşamalardan hangilerinin tamamlandığı belirtilmeli, üzerinde çalışılan kısımlar açıklanmalıdır.
              </p>
              <textarea
                rows={4}
                value={data.prototypeStatus}
                onChange={(e) => setData({ ...data, prototypeStatus: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 leading-relaxed"
              />
            </div>

            <div className="flex justify-between pt-3">
              <button
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                ← Önceki Adım
              </button>
              <button
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg inline-flex items-center gap-1.5"
              >
                <span>Yerlilik ve Ticarileşmeye Geç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Yerlilik, Ticarileşme, Hedef Kitle */}
        {activeStep === 4 && (
          <div className="space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Özgünlük, Ticarileşme ve Hedef Kitle</h3>
              <p className="text-xs text-slate-500">
                Kılavuz: Milli ve yerli yön, katma değer, sürdürülebilirlik ve spesifik hedef kitle
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                6. Özgünlük ve Yerlilik Yönü (Milli ve Yerli Nitelikler, Benzer Çözümlerden Farkı)
              </label>
              <textarea
                rows={4}
                value={data.innovationAndLocality}
                onChange={(e) => setData({ ...data, innovationAndLocality: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                7. Ticarileşme Potansiyeli ve Sürdürülebilirlik
              </label>
              <p className="text-[11px] text-slate-500 mb-1">
                Ürün katma değeri, iş ortaklığı imkanları ve projenin uzun vadede devamlılığı nasıl sağlanacak?
              </p>
              <textarea
                rows={4}
                value={data.commercializationAndSustainability}
                onChange={(e) => setData({ ...data, commercializationAndSustainability: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                8. Hedef Kitle (Kılavuz Uyarısı: "Herkes", "Tüm insanlık" gibi genel ifadelere yer verilmemelidir!)
              </label>
              <input
                type="text"
                value={data.targetAudience}
                onChange={(e) => setData({ ...data, targetAudience: e.target.value })}
                placeholder="Örn: 10-14 Yaş Grubu Görme Yetersizliği Olan Öğrenciler ve Özel Eğitim Öğretmenleri"
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 font-medium"
              />
            </div>

            <div className="flex justify-between pt-3">
              <button
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                ← Önceki Adım
              </button>
              <button
                onClick={() => setActiveStep(5)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg inline-flex items-center gap-1.5"
              >
                <span>İş Takvimi ve SWOT Analizine Geç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: İş Takvimi, SWOT ve Word İndir */}
        {activeStep === 5 && (
          <div className="space-y-5 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Proje Takvimi, SWOT Analizi ve Kapanış</h3>
              <p className="text-xs text-slate-500">
                Resmi TEKNOFEST Şablonunun son sayfaları ve Word (.docx) rapor üretimi
              </p>
            </div>

            {/* İş Paketleri Tablosu */}
            <div>
              <label className="font-bold text-slate-800 block mb-2">9. Proje Takvimi (İş Paketleri)</label>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2 w-10">No</th>
                      <th className="p-2 w-1/3">İş Paketi Adı</th>
                      <th className="p-2">Alt Faaliyetler</th>
                      <th className="p-2 w-28">Tarih</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.workPackages.map((wp, idx) => (
                      <tr key={wp.id}>
                        <td className="p-2 text-center font-bold text-slate-500">{idx + 1}</td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={wp.title}
                            onChange={(e) => {
                              const updated = [...data.workPackages];
                              updated[idx].title = e.target.value;
                              setData({ ...data, workPackages: updated });
                            }}
                            className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={wp.subActivities}
                            onChange={(e) => {
                              const updated = [...data.workPackages];
                              updated[idx].subActivities = e.target.value;
                              setData({ ...data, workPackages: updated });
                            }}
                            className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={wp.duration}
                            onChange={(e) => {
                              const updated = [...data.workPackages];
                              updated[idx].duration = e.target.value;
                              setData({ ...data, workPackages: updated });
                            }}
                            className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SWOT Analizi */}
            <div>
              <label className="font-bold text-slate-800 block mb-2">10. SWOT Analizi</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
                  <span className="font-bold text-sky-800 block mb-1">GÜÇLÜ YÖNLER (S)</span>
                  <textarea
                    rows={3}
                    value={data.swotStrengths}
                    onChange={(e) => setData({ ...data, swotStrengths: e.target.value })}
                    className="w-full p-2 bg-white border border-sky-300 rounded text-xs"
                  />
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="font-bold text-amber-800 block mb-1">ZAYIF YÖNLER (W)</span>
                  <textarea
                    rows={3}
                    value={data.swotWeaknesses}
                    onChange={(e) => setData({ ...data, swotWeaknesses: e.target.value })}
                    className="w-full p-2 bg-white border border-amber-300 rounded text-xs"
                  />
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <span className="font-bold text-emerald-800 block mb-1">FIRSATLAR (O)</span>
                  <textarea
                    rows={3}
                    value={data.swotOpportunities}
                    onChange={(e) => setData({ ...data, swotOpportunities: e.target.value })}
                    className="w-full p-2 bg-white border border-emerald-300 rounded text-xs"
                  />
                </div>

                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                  <span className="font-bold text-rose-800 block mb-1">TEHDİTLER (T)</span>
                  <textarea
                    rows={3}
                    value={data.swotThreats}
                    onChange={(e) => setData({ ...data, swotThreats: e.target.value })}
                    className="w-full p-2 bg-white border border-rose-300 rounded text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Slogan */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">11. Kapanış Sloganı</label>
              <input
                type="text"
                value={data.slogan}
                onChange={(e) => setData({ ...data, slogan: e.target.value })}
                placeholder="Örn: Geleceği Bugünden Tasarlayan Genç Mühendisler!"
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-500 font-semibold text-slate-900"
              />
            </div>

            {/* Final Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                ← Önceki Adım
              </button>

              <button
                onClick={handleDownloadWord}
                disabled={isExporting}
                className="px-6 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm inline-flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{isExporting ? 'Word Dosyası Üretiliyor...' : 'TEKNOFEST Word (.docx) Dosyasını İndir'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
