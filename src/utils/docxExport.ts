import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
} from 'docx';
import { saveAs } from 'file-saver';
import { TeknofestProjectData, TubitakProjectData } from '../types/projectTemplates';

// Helper to create styled paragraph
const createHeading = (text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel], color = '1E3A8A') => {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 240, after: 120 },
    run: {
      bold: true,
      color,
      font: 'Times New Roman',
      size: level === HeadingLevel.HEADING_1 ? 32 : level === HeadingLevel.HEADING_2 ? 28 : 24,
    },
  });
};

const createParagraph = (text: string, isJustified = true) => {
  return new Paragraph({
    alignment: isJustified ? AlignmentType.JUSTIFIED : AlignmentType.LEFT,
    spacing: { before: 80, after: 80, line: 276 }, // 1.15 line spacing
    children: [
      new TextRun({
        text,
        font: 'Times New Roman',
        size: 24, // 12pt
        color: '111827',
      }),
    ],
  });
};

const createBullet = (label: string, text: string) => {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({
        text: `• ${label}: `,
        bold: true,
        font: 'Times New Roman',
        size: 24,
        color: '1E3A8A',
      }),
      new TextRun({
        text,
        font: 'Times New Roman',
        size: 24,
        color: '1F2937',
      }),
    ],
  });
};

// Generates Word file for TEKNOFEST project based on official 2026 Presentation Template
export const exportTeknofestWord = async (data: TeknofestProjectData) => {
  const doc = new Document({
    creator: 'Murat TAŞKIN Okul Takip & Proje Sistemi',
    title: `${data.projectTitle} - TEKNOFEST Proje Raporu`,
    description: 'TEKNOFEST 2026 Proje ve Sunum Şablonu Kılavuzuna Uygun Hazırlanmıştır',
    styles: {
      default: {
        document: {
          run: {
            font: 'Times New Roman',
            size: 24,
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 2.5 cm = 1440 twips
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: [
          // Kapak Başlığı
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: 'T.C. SANAYİ VE TEKNOLOJİ BAKANLIĞI & T3 VAKFI',
                font: 'Times New Roman',
                size: 22,
                bold: true,
                color: '6B7280',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 300 },
            children: [
              new TextRun({
                text: 'TEKNOFEST HAVACILIK, UZAY VE TEKNOLOJİ FESTİVALİ 2026',
                font: 'Times New Roman',
                size: 26,
                bold: true,
                color: 'DC2626',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 400 },
            children: [
              new TextRun({
                text: data.projectTitle.toUpperCase(),
                font: 'Times New Roman',
                size: 36,
                bold: true,
                color: '0F172A',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 400 },
            children: [
              new TextRun({
                text: `Kategori: ${data.competitionCategory} | Seviye: ${data.teamLevel}`,
                font: 'Times New Roman',
                size: 24,
                italics: true,
                color: '4B5563',
              }),
            ],
          }),

          // Takım Bilgileri Tablosu
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F3F4F6', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Takım Adı', bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: data.teamName, size: 22 })] })],
                  }),
                  new TableCell({
                    shading: { fill: 'F3F4F6', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Takım ID', bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: data.teamId || 'KYS-2026-TKM', size: 22 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F3F4F6', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Takım Danışmanı', bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: data.advisorName, size: 22, bold: true })] })],
                  }),
                  new TableCell({
                    shading: { fill: 'F3F4F6', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Takım Kaptanı', bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: data.teamLeader, size: 22 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F3F4F6', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Takım Üyeleri', bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    columnSpan: 3,
                    children: [new Paragraph({ children: [new TextRun({ text: data.teamMembers.join(', '), size: 22 })] })],
                  }),
                ],
              }),
            ],
          }),

          // 1. ÖZET
          createHeading('1. PROJE ÖZETİ', HeadingLevel.HEADING_1, 'DC2626'),
          createParagraph(data.summary),

          // 2. PROBLEM TANIMI
          createHeading('2. PROBLEM TANIMI VE LİTERATÜR ARAŞTIRMASI', HeadingLevel.HEADING_1, 'DC2626'),
          createParagraph(data.problemStatement),

          // 3. ÇÖZÜM
          createHeading('3. ÇÖZÜM ÖNERİSİ VE YENİLİKÇİ YAKLAŞIM', HeadingLevel.HEADING_1, 'DC2626'),
          createParagraph(data.solution),

          // 4. YÖNTEM
          createHeading('4. YÖNTEM VE KULLANILAN TEKNOLOJİLER', HeadingLevel.HEADING_1, 'DC2626'),
          createParagraph(data.methodology),

          // 5. PROTOTİP / UYGULAMA GELİŞTİRME DURUMU
          createHeading('5. PROTOTİP / UYGULAMA GELİŞTİRME DURUMU', HeadingLevel.HEADING_1, 'DC2626'),
          createBullet('Sistem Türü', data.prototypeType || 'Yazılım ve Donanım Hibrit Çözümü'),
          createBullet('Kullanılan Donanım / Bileşenler', data.hardwareSpecs || 'ESP32, Sensör Modülleri, 3D Baskı Gövde'),
          createBullet('Kullanılan Yazılım / Kütüphaneler', data.softwareSpecs || 'Python, C++, OpenCV, Web Dashboard'),
          createParagraph(data.prototypeStatus),

          // 6. ÖZGÜNLÜK VE YERLİLİK YÖNÜ
          createHeading('6. ÖZGÜNLÜK VE YERLİLİK YÖNÜ', HeadingLevel.HEADING_1, 'DC2626'),
          createParagraph(data.innovationAndLocality),

          // 7. TİCARİLEŞME POTANSİYELİ VE SÜRDÜRÜLEBİLİRLİK
          createHeading('7. TİCARİLEŞME POTANSİYELİ VE SÜRDÜRÜLEBİLİRLİK', HeadingLevel.HEADING_1, 'DC2626'),
          createParagraph(data.commercializationAndSustainability),

          // 8. HEDEF KİTLE
          createHeading('8. HEDEF KİTLE', HeadingLevel.HEADING_1, 'DC2626'),
          createParagraph(data.targetAudience),

          // 9. PROJE TAKVİMİ
          createHeading('9. PROJE İŞ TAKVİMİ (İŞ PAKETLERİ)', HeadingLevel.HEADING_1, 'DC2626'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: '1E3A8A', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'İş Paketi No', bold: true, color: 'FFFFFF', size: 20 })] })],
                  }),
                  new TableCell({
                    shading: { fill: '1E3A8A', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'İş Paketi Adı', bold: true, color: 'FFFFFF', size: 20 })] })],
                  }),
                  new TableCell({
                    shading: { fill: '1E3A8A', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Alt Faaliyetler', bold: true, color: 'FFFFFF', size: 20 })] })],
                  }),
                  new TableCell({
                    shading: { fill: '1E3A8A', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Zaman Aralığı', bold: true, color: 'FFFFFF', size: 20 })] })],
                  }),
                ],
              }),
              ...data.workPackages.map(
                (wp, index) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${index + 1}`, size: 20 })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: wp.title, bold: true, size: 20 })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: wp.subActivities, size: 20 })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: wp.duration, size: 20 })] })] }),
                    ],
                  })
              ),
            ],
          }),

          // 10. SWOT ANALİZİ
          createHeading('10. SWOT ANALİZİ', HeadingLevel.HEADING_1, 'DC2626'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'E0F2FE', type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'GÜÇLÜ YÖNLER (STRENGTHS)', bold: true, color: '0369A1', size: 22 })] }),
                      new Paragraph({ children: [new TextRun({ text: data.swotStrengths, size: 20 })] }),
                    ],
                  }),
                  new TableCell({
                    shading: { fill: 'FEF3C7', type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'ZAYIF YÖNLER (WEAKNESSES)', bold: true, color: 'B45309', size: 22 })] }),
                      new Paragraph({ children: [new TextRun({ text: data.swotWeaknesses, size: 20 })] }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'DCFCE7', type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'FIRSATLAR (OPPORTUNITIES)', bold: true, color: '15803D', size: 22 })] }),
                      new Paragraph({ children: [new TextRun({ text: data.swotOpportunities, size: 20 })] }),
                    ],
                  }),
                  new TableCell({
                    shading: { fill: 'FEE2E2', type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'TEHDİTLER (THREATS)', bold: true, color: 'B91C1C', size: 22 })] }),
                      new Paragraph({ children: [new TextRun({ text: data.swotThreats, size: 20 })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // 11. SLOGAN & TEŞEKKÜR
          createHeading('11. KAPANIŞ VE SLOGAN', HeadingLevel.HEADING_1, 'DC2626'),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 },
            children: [
              new TextRun({
                text: `"${data.slogan || 'Geleceği Bugünden Tasarlayan Genç Mühendisler!'}"`,
                font: 'Times New Roman',
                size: 28,
                bold: true,
                italics: true,
                color: '1E3A8A',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({
                text: 'Proje Danışmanı: Öğretmen Murat TAŞKIN | 2026-2027 Eğitim Öğretim Yılı',
                font: 'Times New Roman',
                size: 20,
                color: '6B7280',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${data.projectTitle.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/g, '_').substring(0, 35)}_TEKNOFEST_2026.docx`;
  saveAs(blob, fileName);
};

// Generates Word file for TÜBİTAK 2204-B / 2204-A based on official Proje Yazma Şablonu 2026-2027
export const exportTubitakWord = async (data: TubitakProjectData) => {
  const doc = new Document({
    creator: 'Murat TAŞKIN Okul Takip & Proje Sistemi',
    title: `${data.projectTitle} - TÜBİTAK Proje Raporu`,
    description: 'TÜBİTAK 2204-B Ortaokul / 2204-A Lise Proje Yazma Şablonuna Uygun Hazırlanmıştır',
    styles: {
      default: {
        document: {
          run: {
            font: 'Times New Roman',
            size: 24, // 12pt
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 2.5 cm
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: [
          // Resmi Üst Başlıklar
          new Paragraph({
            spacing: { before: 100, after: 80 },
            children: [
              new TextRun({ text: 'Proje Ana Alanı       : ', bold: true, size: 24 }),
              new TextRun({ text: data.mainField, size: 24 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({ text: 'Proje Tematik Alanı : ', bold: true, size: 24 }),
              new TextRun({ text: data.thematicField, size: 24 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 200 },
            children: [
              new TextRun({ text: 'Proje Adı (Başlığı) : ', bold: true, size: 24 }),
              new TextRun({ text: data.projectTitle, bold: true, size: 24, color: '1E3A8A' }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 200 },
            children: [
              new TextRun({ text: 'Proje Danışmanı      : ', bold: true, size: 24 }),
              new TextRun({ text: data.advisorName || 'Murat TAŞKIN', size: 24 }),
              new TextRun({ text: '  |  Öğrenci(ler): ', bold: true, size: 24 }),
              new TextRun({ text: data.students.join(', '), size: 24 }),
            ],
          }),

          // Yapay Zeka Araçları Kullanım Beyanı
          createHeading('Yapay Zeka Araçları Kullanım Beyanı:', HeadingLevel.HEADING_2, '374151'),
          createBullet('Kullanılan araçlar', data.aiTools || 'Gemini Flash, Eylül 2026'),
          createBullet('Kullanım amacı', data.aiPurpose || 'Literatür taraması, formülasyon ve hesaplama desteği'),
          createBullet('Kullanım kapsamı', data.aiScope || 'Yöntem ve arka plan bölümlerinde kaynak taraması'),
          createBullet('İnsan müdahalesi', data.aiHumanIntervention || 'Tüm içerik öğrenciler ve danışman öğretmen tarafından gözden geçirilmiş ve bağımsız olarak doğrulanmıştır.'),

          // Özet
          createHeading('Özet', HeadingLevel.HEADING_1, '1E3A8A'),
          createParagraph(data.summary),
          new Paragraph({
            spacing: { before: 120, after: 200 },
            children: [
              new TextRun({ text: 'Anahtar Kelimeler: ', bold: true, size: 24 }),
              new TextRun({ text: data.keywords.join(', '), italics: true, size: 24 }),
            ],
          }),

          // Amaç
          createHeading('Amaç', HeadingLevel.HEADING_1, '1E3A8A'),
          createParagraph(data.purpose),

          // Giriş
          createHeading('Giriş', HeadingLevel.HEADING_1, '1E3A8A'),
          createParagraph(data.introduction),

          // Yöntem
          createHeading('Yöntem', HeadingLevel.HEADING_1, '1E3A8A'),
          createParagraph(data.method),

          // Proje İş-Zaman Çizelgesi
          createHeading('Proje İş-Zaman Çizelgesi', HeadingLevel.HEADING_1, '1E3A8A'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F3F4F6', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'İşin Adı / Aylar', bold: true, size: 20 })] })],
                  }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Eylül', size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ekim', size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Kasım', size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Aralık', size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ocak', size: 18 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Şubat', size: 18 })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '1. Literatür Taraması', size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'X', bold: true, size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'X', bold: true, size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '2. Deney / Materyal Tasarımı', size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'X', bold: true, size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'X', bold: true, size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '3. Veri Toplama ve Analiz', size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'X', bold: true, size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'X', bold: true, size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '4. Proje Raporu Yazımı', size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ text: '' })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'X', bold: true, size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'X', bold: true, size: 20 })] })] }),
                ],
              }),
            ],
          }),

          // Bulgular
          createHeading('Bulgular', HeadingLevel.HEADING_1, '1E3A8A'),
          createParagraph(data.findings),

          // Sonuç ve Tartışma
          createHeading('Sonuç ve Tartışma', HeadingLevel.HEADING_1, '1E3A8A'),
          createParagraph(data.discussion),

          // Öneriler
          createHeading('Öneriler', HeadingLevel.HEADING_1, '1E3A8A'),
          createParagraph(data.suggestions),

          // Kaynaklar
          createHeading('Kaynaklar (APA Formatı)', HeadingLevel.HEADING_1, '1E3A8A'),
          ...data.references.map((ref) => createParagraph(ref, false)),

          // Ekler
          createHeading('Ekler', HeadingLevel.HEADING_1, '1E3A8A'),
          createParagraph(data.attachmentsText || 'Ek 1. Veri Toplama ve Gözlem Çizelgeleri, Veli İzin ve Onam Belgeleri.'),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${data.projectTitle.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/g, '_').substring(0, 35)}_TUBITAK_2026_2027.docx`;
  saveAs(blob, fileName);
};
