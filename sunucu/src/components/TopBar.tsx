import React from 'react';
import {
  GraduationCap,
  ExternalLink,
  Settings,
  FolderArchive,
  BookOpen,
  Users,
  Lightbulb,
} from 'lucide-react';
import { DriveConfig } from '../types';

interface TopBarProps {
  activeTab: 'students' | 'files' | 'plans' | 'projects';
  onTabChange: (tab: 'students' | 'files' | 'plans' | 'projects') => void;
  driveConfig: DriveConfig;
  onOpenSettings: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onTabChange,
  driveConfig,
  onOpenSettings,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark & Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <a
                href="#dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange('students');
                }}
                className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap hover:text-indigo-600 transition-colors"
              >
                Murat TAŞKIN Okul Takip Sistemi
              </a>
              <div className="text-[11px] text-slate-500 font-medium">
                Öğretmen & Proje Koordinatörü Portalı · 2026-2027
              </div>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
            <button
              onClick={() => onTabChange('students')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'students'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Öğrenci Takibi</span>
            </button>

            <button
              onClick={() => onTabChange('files')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'files'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FolderArchive className="w-4 h-4" />
              <span>Dosyalarım</span>
            </button>

            <button
              onClick={() => onTabChange('plans')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'plans'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Yıllık Planlarım</span>
            </button>

            <button
              onClick={() => onTabChange('projects')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'projects'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Proje Üretme Alanı</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                TEKNOFEST · TÜBİTAK
              </span>
            </button>
          </nav>

          {/* Zone 3: Quick Action & Link Settings */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Drive ve Not bağlantılarınızı özelleştirin"
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              <span>Bağlantı Ayarları</span>
            </button>

            <a
              href={driveConfig.driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Google Drive Klasörünü Aç"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Drive'a Git</span>
            </a>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-100 gap-2">
          <button
            onClick={() => onTabChange('students')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'students'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Öğrenci Takibi
          </button>
          <button
            onClick={() => onTabChange('files')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'files'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Dosyalarım
          </button>
          <button
            onClick={() => onTabChange('plans')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'plans'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Yıllık Planlarım
          </button>
          <button
            onClick={() => onTabChange('projects')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'projects'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Proje Üretme
          </button>
        </div>
      </div>
    </header>
  );
};
