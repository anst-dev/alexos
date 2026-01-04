import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Icon } from '../ui/Icon';

export const SettingsView: React.FC = () => {
  const { 
    goals, habits, journalEntries, 
    importDataFromJSON, importGoalsCSV, importHabitsCSV, importJournalCSV,
    exportDataToJSON, exportGoalsCSV, exportHabitsCSV, exportJournalCSV, exportMilestonesCSV
  } = useApp();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMode, setImportMode] = React.useState<'json' | 'goals' | 'habits' | 'journal' | null>(null);

  // Export handlers - use context functions
  const handleExportJSON = () => {
    try {
      exportDataToJSON();
      showToast('Đã xuất file JSON thành công!', 'success');
    } catch (error) {
      showToast('Lỗi khi xuất file JSON', 'error');
    }
  };

  const handleExportGoalsCSV = () => {
    try {
      exportGoalsCSV();
      showToast('Đã xuất Goals CSV thành công!', 'success');
    } catch (error) {
      showToast('Lỗi khi xuất Goals CSV', 'error');
    }
  };

  const handleExportHabitsCSV = () => {
    try {
      exportHabitsCSV();
      showToast('Đã xuất Habits CSV thành công!', 'success');
    } catch (error) {
      showToast('Lỗi khi xuất Habits CSV', 'error');
    }
  };

  const handleExportJournalCSV = () => {
    try {
      exportJournalCSV();
      showToast('Đã xuất Journal CSV thành công!', 'success');
    } catch (error) {
      showToast('Lỗi khi xuất Journal CSV', 'error');
    }
  };

  const handleExportMilestonesCSV = () => {
    try {
      exportMilestonesCSV();
      showToast('Đã xuất Milestones CSV thành công!', 'success');
    } catch (error) {
      showToast('Lỗi khi xuất Milestones CSV', 'error');
    }
  };

  // Import handlers
  const triggerImport = (mode: 'json' | 'goals' | 'habits' | 'journal') => {
    setImportMode(mode);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !importMode) return;

    try {
      let result;
      
      switch (importMode) {
        case 'json':
          result = await importDataFromJSON(file);
          if (result.success && result.data) {
            showToast(`Đã import ${result.data.goals.length} goals, ${result.data.habits.length} habits, ${result.data.journalEntries.length} journal entries!`, 'success');
          }
          break;
          
        case 'goals':
          result = await importGoalsCSV(file);
          if (result.success && result.data) {
            showToast(`Đã import ${result.data.goals.length} goals!`, 'success');
          }
          break;
          
        case 'habits':
          result = await importHabitsCSV(file);
          if (result.success && result.data) {
            showToast(`Đã import ${result.data.habits.length} habits!`, 'success');
          }
          break;
          
        case 'journal':
          result = await importJournalCSV(file);
          if (result.success && result.data) {
            showToast(`Đã import ${result.data.journalEntries.length} journal entries!`, 'success');
          }
          break;
      }

      if (result && !result.success) {
        showToast(result.message || 'Lỗi khi import file', 'error');
      }
    } catch (error) {
      showToast('Lỗi khi import file', 'error');
    }

    // Reset
    setImportMode(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-4 border-neo-black bg-white p-6 shadow-hard">
        <h1 className="text-3xl font-display font-black uppercase flex items-center gap-3">
          <Icon name="settings" size={32} />
          Cài đặt
        </h1>
        <p className="text-gray-600 mt-2 font-mono">Quản lý dữ liệu và cấu hình ứng dụng</p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.csv"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Export Section */}
      <div className="border-4 border-neo-black bg-white shadow-hard">
        <div className="p-4 border-b-4 border-neo-black bg-neo-lime">
          <h2 className="text-xl font-display font-black uppercase flex items-center gap-2">
            <Icon name="download" size={24} />
            Xuất dữ liệu (Export)
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <p className="font-mono text-sm text-gray-600 mb-4">
            Tải xuống dữ liệu của bạn dưới dạng file JSON hoặc CSV để backup.
          </p>
          
          {/* Export All JSON */}
          <button
            onClick={handleExportJSON}
            className="w-full p-4 border-4 border-neo-black bg-neo-yellow hover:bg-neo-orange transition-colors shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-3"
          >
            <Icon name="file_download" size={24} />
            <div className="text-left">
              <div className="font-bold uppercase">Xuất tất cả (JSON)</div>
              <div className="text-sm font-mono text-gray-700">Goals, Habits, Journal - 1 file backup</div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleExportGoalsCSV}
              className="p-4 border-4 border-neo-black bg-white hover:bg-neo-blue hover:text-white transition-colors shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <Icon name="flag" size={20} />
              <div className="font-bold uppercase mt-2">Goals CSV</div>
              <div className="text-xs font-mono">{goals.length} mục tiêu</div>
            </button>

            <button
              onClick={handleExportHabitsCSV}
              className="p-4 border-4 border-neo-black bg-white hover:bg-neo-purple hover:text-white transition-colors shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <Icon name="check_box" size={20} />
              <div className="font-bold uppercase mt-2">Habits CSV</div>
              <div className="text-xs font-mono">{habits.length} thói quen</div>
            </button>

            <button
              onClick={handleExportJournalCSV}
              className="p-4 border-4 border-neo-black bg-white hover:bg-neo-pink transition-colors shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <Icon name="book" size={20} />
              <div className="font-bold uppercase mt-2">Journal CSV</div>
              <div className="text-xs font-mono">{journalEntries.length} bài viết</div>
            </button>

            <button
              onClick={handleExportMilestonesCSV}
              className="p-4 border-4 border-neo-black bg-white hover:bg-neo-orange transition-colors shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <Icon name="task_alt" size={20} />
              <div className="font-bold uppercase mt-2">Milestones CSV</div>
              <div className="text-xs font-mono">Từ {goals.length} goals</div>
            </button>
          </div>
        </div>
      </div>

      {/* Import Section */}
      <div className="border-4 border-neo-black bg-white shadow-hard">
        <div className="p-4 border-b-4 border-neo-black bg-neo-blue text-white">
          <h2 className="text-xl font-display font-black uppercase flex items-center gap-2">
            <Icon name="upload" size={24} />
            Nhập dữ liệu (Import)
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <p className="font-mono text-sm text-gray-600 mb-4">
            Khôi phục dữ liệu từ file backup hoặc nhập từ Excel/CSV.
          </p>
          
          <button
            onClick={() => triggerImport('json')}
            className="w-full p-4 border-4 border-neo-black bg-neo-lime hover:bg-neo-yellow transition-colors shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-3"
          >
            <Icon name="file_upload" size={24} />
            <div className="text-left">
              <div className="font-bold uppercase">Nhập từ JSON</div>
              <div className="text-sm font-mono text-gray-700">Khôi phục từ file backup đầy đủ</div>
            </div>
          </button>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => triggerImport('goals')}
              className="p-4 border-4 border-neo-black bg-white hover:bg-gray-100 transition-colors shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <Icon name="flag" size={20} />
              <div className="font-bold uppercase mt-2 text-sm">Import Goals</div>
            </button>

            <button
              onClick={() => triggerImport('habits')}
              className="p-4 border-4 border-neo-black bg-white hover:bg-gray-100 transition-colors shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <Icon name="check_box" size={20} />
              <div className="font-bold uppercase mt-2 text-sm">Import Habits</div>
            </button>

            <button
              onClick={() => triggerImport('journal')}
              className="p-4 border-4 border-neo-black bg-white hover:bg-gray-100 transition-colors shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <Icon name="book" size={20} />
              <div className="font-bold uppercase mt-2 text-sm">Import Journal</div>
            </button>
          </div>
        </div>
      </div>

      {/* Data Stats */}
      <div className="border-4 border-neo-black bg-gray-50 p-6 shadow-hard">
        <h3 className="font-display font-black uppercase mb-4">Thống kê dữ liệu</h3>
        <div className="grid grid-cols-3 gap-4 font-mono text-sm">
          <div className="bg-white p-4 border-2 border-neo-black">
            <div className="text-2xl font-bold text-neo-blue">{goals.length}</div>
            <div>Mục tiêu</div>
          </div>
          <div className="bg-white p-4 border-2 border-neo-black">
            <div className="text-2xl font-bold text-neo-purple">{habits.length}</div>
            <div>Thói quen</div>
          </div>
          <div className="bg-white p-4 border-2 border-neo-black">
            <div className="text-2xl font-bold text-neo-pink">{journalEntries.length}</div>
            <div>Nhật ký</div>
          </div>
        </div>
      </div>
    </div>
  );
};
