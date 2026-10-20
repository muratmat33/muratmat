import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { StudentTrackingView } from './components/StudentTrackingView';
import { DriveFilesView } from './components/DriveFilesView';
import { YearlyPlansView } from './components/YearlyPlansView';
import { ProjectStudioView } from './components/ProjectStudioView';
import { LinkSettingsModal } from './components/LinkSettingsModal';
import {
  INITIAL_CLASSES,
  INITIAL_DRIVE_CONFIG,
  INITIAL_DRIVE_FILES,
  INITIAL_PROJECTS,
  INITIAL_STUDENTS,
  INITIAL_YEARLY_PLANS,
} from './data/mockData';
import { ClassGroup, DriveConfig, DriveFileItem, ProjectItem, Student } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'students' | 'files' | 'plans' | 'projects'>('students');
  const [projectInitialMode, setProjectInitialMode] = useState<'select' | 'teknofest' | 'tubitak'>('select');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Persistent Drive & Link configurations
  const [driveConfig, setDriveConfig] = useState<DriveConfig>(() => {
    try {
      const saved = localStorage.getItem('murat_taskin_drive_config');
      return saved ? JSON.parse(saved) : INITIAL_DRIVE_CONFIG;
    } catch {
      return INITIAL_DRIVE_CONFIG;
    }
  });

  // Persistent Students
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('murat_taskin_students');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  // Persistent Classes
  const [classes, setClasses] = useState<ClassGroup[]>(() => {
    try {
      const saved = localStorage.getItem('murat_taskin_classes');
      return saved ? JSON.parse(saved) : INITIAL_CLASSES;
    } catch {
      return INITIAL_CLASSES;
    }
  });

  // Persistent Drive Files
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>(() => {
    try {
      const saved = localStorage.getItem('murat_taskin_drive_files');
      return saved ? JSON.parse(saved) : INITIAL_DRIVE_FILES;
    } catch {
      return INITIAL_DRIVE_FILES;
    }
  });

  // Persistent Projects (TEKNOFEST / TUBITAK / eTwinning)
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('murat_taskin_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('murat_taskin_drive_config', JSON.stringify(driveConfig));
  }, [driveConfig]);

  useEffect(() => {
    localStorage.setItem('murat_taskin_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('murat_taskin_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('murat_taskin_drive_files', JSON.stringify(driveFiles));
  }, [driveFiles]);

  useEffect(() => {
    localStorage.setItem('murat_taskin_projects', JSON.stringify(projects));
  }, [projects]);

  // Handlers
  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddClass = (newClass: ClassGroup) => {
    setClasses((prev) => [...prev, newClass]);
  };

  const handleAddDriveFile = (file: DriveFileItem) => {
    setDriveFiles((prev) => [file, ...prev]);
  };

  const handleDeleteDriveFile = (id: string) => {
    setDriveFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAddProject = (newProject: ProjectItem) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleUpdateProject = (updatedProject: ProjectItem) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans antialiased">
      {/* Top Header */}
      <TopBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'projects') {
            setProjectInitialMode('select');
          }
          setActiveTab(tab);
        }}
        driveConfig={driveConfig}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'students' && (
          <StudentTrackingView
            students={students}
            classes={classes}
            driveConfig={driveConfig}
            driveFiles={driveFiles}
            onUpdateStudent={handleUpdateStudent}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDeleteStudent}
            onAddClass={handleAddClass}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onNavigateToFiles={() => setActiveTab('files')}
            onNavigateToProject={(mode) => {
              setProjectInitialMode(mode);
              setActiveTab('projects');
            }}
          />
        )}

        {activeTab === 'files' && (
          <DriveFilesView
            driveConfig={driveConfig}
            driveFiles={driveFiles}
            onAddFile={handleAddDriveFile}
            onDeleteFile={handleDeleteDriveFile}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {activeTab === 'plans' && (
          <YearlyPlansView
            driveConfig={driveConfig}
            yearlyPlans={INITIAL_YEARLY_PLANS}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectStudioView
            key={projectInitialMode}
            initialMode={projectInitialMode}
            projects={projects}
            students={students}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Murat TAŞKIN Okul Takip Sistemi</span>
            <span>·</span>
            <span>2026-2027 Eğitim Öğretim Yılı</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Drive & Not Linklerini Özelleştir
            </button>
            <span>·</span>
            <span className="text-slate-400">TEKNOFEST · TÜBİTAK · eTwinning</span>
          </div>
        </div>
      </footer>

      {/* Link Settings Modal (Customizable Drive & Grades URLs) */}
      <LinkSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={driveConfig}
        onSave={(newCfg) => setDriveConfig(newCfg)}
      />
    </div>
  );
}
