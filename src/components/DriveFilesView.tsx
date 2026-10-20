import React, { useState } from 'react';
import {
  FolderArchive,
  ExternalLink,
  Plus,
  Search,
  FileText,
  Folder,
  FileSpreadsheet,
  Settings,
  Clock,
  Sparkles,
  Download,
  Trash2,
} from 'lucide-react';
import { DriveConfig, DriveFileItem } from '../types';

interface DriveFilesViewProps {
  driveConfig: DriveConfig;
  driveFiles: DriveFileItem[];
  onAddFile: (file: DriveFileItem) => void;
  onDeleteFile: (id: string) => void;
  onOpenSettings: () => void;
  isCompactSidePanel?: boolean;
}

export const DriveFilesView: React.FC<DriveFilesViewProps> = ({
  driveConfig,
  driveFiles,
  onAddFile,
  onDeleteFile,
  onOpenSettings,
  isCompactSidePanel = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New file form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<DriveFileItem['category']>('Zümre');
  const [newDesc, setNewDesc] = useState('');
  const [newFormat, setNewFormat] = useState<DriveFileItem['format']>('doc');
  const [newDirectUrl, setNewDirectUrl] = useState('');

  const categories = ['Tümü', 'Zümre', 'Yazılı', 'ŞÖK', 'Rehberlik', 'Kulüp', 'İdari'];

  const filteredFiles = driveFiles.filter((f) => {
    const matchesCat = selectedCategory === 'Tümü' || f.category === selectedCategory;
    const matchesQuery =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCreateFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const file: DriveFileItem = {
      id: `file-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      description: newDesc.trim() || 'Öğretmen evrak arşivi belgesi',
      format: newFormat,
      updatedAt: 'Bugün',
      size: 'Google Drive',
      directUrl: newDirectUrl.trim() || driveConfig.driveFolderUrl,
    };

    onAddFile(file);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewDirectUrl('');
  };

  const getFormatIcon = (format: DriveFileItem['format']) => {
    switch (format) {
      case 'sheet':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'folder':
        return <Folder className="w-5 h-5 text-amber-500 fill-amber-100" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-500" />;
      default:
        return <FileText className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className={`space-y-4 ${isCompactSidePanel ? 'text-xs' : ''}`}>
      {/* Primary Drive Banner Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-sm border border-slate-700/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/20 rounded-md text-indigo-300">
                <FolderArchive className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold tracking-tight text-white">Google Drive Dosyalarım</h2>
            </div>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Öğretmen evrakları, zümre tutanakları, yazılı sınav arşivleri ve resmi yazışmalarınızın yer aldığı bulut depolama klasörü.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSettings}
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors inline-flex items-center gap-1.5"
              title="Drive klasör bağlantısını düzenle"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Link Ayarla</span>
            </button>
            <a
              href={driveConfig.driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs shrink-0"
            >
              <span>Drive Klasörünü Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live connected link hint */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate max-w-md">
            Mevcut Bağlantı: <span className="font-mono text-indigo-200">{driveConfig.driveFolderUrl}</span>
          </span>
          <span className="shrink-0 text-emerald-400 font-medium">Bulut Senkronizasyon</span>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative grow sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Dosya veya evrak ara..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Evrak Ekle</span>
          </button>
        </div>
      </div>

      {/* Files Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded-lg border border-slate-200 p-4 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                    {getFormatIcon(file.format)}
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                      {file.category}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-2 font-mono">
                      {file.size}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteFile(file.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded transition-opacity"
                  title="Listeden Kaldır"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {file.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {file.description}
                </p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{file.updatedAt}</span>
              </span>

              <a
                href={file.directUrl || driveConfig.driveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <span>Drive'da Aç</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}

        {filteredFiles.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-lg border border-dashed border-slate-200 p-6">
            <FolderArchive className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-800">Aramanıza uygun dosya bulunamadı</h4>
            <p className="text-xs text-slate-500 mt-1">
              Farklı bir kategori seçebilir veya yeni bir evrak kısayolu ekleyebilirsiniz.
            </p>
          </div>
        )}
      </div>

      {/* Add File Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">Yeni Drive Evrak Kısayolu Ekle</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateFile} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">Evrak / Dosya Adı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 2026-2027 1. Dönem Zümre Kararları"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as DriveFileItem['category'])}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs"
                  >
                    <option value="Zümre">Zümre</option>
                    <option value="Yazılı">Yazılı</option>
                    <option value="ŞÖK">ŞÖK</option>
                    <option value="Rehberlik">Rehberlik</option>
                    <option value="Kulüp">Kulüp</option>
                    <option value="İdari">İdari</option>
                    <option value="Plan">Plan</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Dosya Formatı</label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value as DriveFileItem['format'])}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs"
                  >
                    <option value="doc">Doküman (Docs/Word)</option>
                    <option value="sheet">E-Tablo (Sheets/Excel)</option>
                    <option value="pdf">PDF Belgesi</option>
                    <option value="folder">Klasör</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Açıklama / Not</label>
                <textarea
                  rows={2}
                  placeholder="Evrak hakkında kısa bilgi..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Özel Drive Linki (İsteğe Bağlı)
                </label>
                <input
                  type="url"
                  placeholder={driveConfig.driveFolderUrl}
                  value={newDirectUrl}
                  onChange={(e) => setNewDirectUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Boş bırakırsanız ana Drive klasör bağlantınız kullanılır.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Evrakı Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
