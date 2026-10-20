import React, { useState } from 'react';
import { X, ExternalLink, Check, RotateCcw, Link2, Folder, FileSpreadsheet } from 'lucide-react';
import { DriveConfig } from '../types';

interface LinkSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DriveConfig;
  onSave: (newConfig: DriveConfig) => void;
}

export const LinkSettingsModal: React.FC<LinkSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [gradesUrl, setGradesUrl] = useState(config.gradesUrl);
  const [driveFolderUrl, setDriveFolderUrl] = useState(config.driveFolderUrl);
  const [yearlyPlansUrl, setYearlyPlansUrl] = useState(config.yearlyPlansUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      gradesUrl: gradesUrl.trim() || 'https://e-okul.meb.gov.tr/',
      driveFolderUrl: driveFolderUrl.trim() || 'https://drive.google.com/drive/my-drive',
      yearlyPlansUrl: yearlyPlansUrl.trim() || 'https://drive.google.com/drive/my-drive',
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleResetDefaults = () => {
    setGradesUrl('https://e-okul.meb.gov.tr/');
    setDriveFolderUrl('https://drive.google.com/drive/my-drive');
    setYearlyPlansUrl('https://drive.google.com/drive/my-drive');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Bağlantı ve Drive Ayarları</h3>
              <p className="text-xs text-slate-500">
                Murat Hoca'nın özel e-Okul/not çizelgesi ve Google Drive klasör bağlantıları
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* 1. Grades / Not Link */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>1. Öğrenci Not / E-Okul Bağlantısı</span>
              </label>
              <a
                href={gradesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
              >
                <span>Test Et</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500">
              Öğrenci tablosunda son sütundaki <strong className="text-slate-700">"Not Bağlantısını Aç"</strong> butonuna tıklandığında açılacak web veya Google E-Tablo adresi.
            </p>
            <input
              type="url"
              value={gradesUrl}
              onChange={(e) => setGradesUrl(e.target.value)}
              placeholder="https://e-okul.meb.gov.tr/ veya https://docs.google.com/spreadsheets/..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono text-slate-800"
              required
            />
          </div>

          {/* 2. Drive Files Folder Link */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-amber-600" />
                <span>2. Google Drive "Dosyalarım" Klasör Bağlantısı</span>
              </label>
              <a
                href={driveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
              >
                <span>Test Et</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500">
              Sağ taraftaki <strong className="text-slate-700">"Dosyalarım"</strong> paneli ve üst barda tıklandığında açılacak Google Drive ana klasörünüzün bağlantısı.
            </p>
            <input
              type="url"
              value={driveFolderUrl}
              onChange={(e) => setDriveFolderUrl(e.target.value)}
              placeholder="https://drive.google.com/drive/folders/..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono text-slate-800"
              required
            />
          </div>

          {/* 3. Yearly Plans Drive Link */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-blue-600" />
                <span>3. Google Drive "Yıllık Planlarım" Bağlantısı</span>
              </label>
              <a
                href={yearlyPlansUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
              >
                <span>Test Et</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500">
              Menüdeki <strong className="text-slate-700">"Yıllık Planlarım"</strong> sayfasında yer alan <strong className="text-slate-700">"Drive Plan Klasörünü Aç"</strong> butonuna tıklandığında açılacak bağlantı.
            </p>
            <input
              type="url"
              value={yearlyPlansUrl}
              onChange={(e) => setYearlyPlansUrl(e.target.value)}
              placeholder="https://drive.google.com/drive/folders/..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono text-slate-800"
              required
            />
          </div>

          {/* Info Card */}
          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg text-xs text-indigo-900 leading-relaxed">
            💡 <strong>Murat Hocam:</strong> Vereceğiniz Drive ve E-Okul linklerini buraya yapıştırdığınızda sistem tarayıcınızda otomatik hafızaya alır. İstediğiniz an tekrar güncelleyebilirsiniz.
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Varsayılana Dön</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Kaydedildi!</span>
                  </>
                ) : (
                  <span>Bağlantıları Kaydet</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
