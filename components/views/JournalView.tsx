import React, { useState } from 'react';
import { useApp, UpdateJournalDTO } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Modal, FormTextarea, FormSelect, FormActions } from '../ui/Modal';
import { JournalEntry } from '../../types';
import { Icon } from '../ui/Icon';

export const JournalView: React.FC = () => {
  const { addJournalEntry, journalEntries, deleteJournalEntry, updateJournalEntry } = useApp();
  const { showToast } = useToast();
  const [content, setContent] = useState('');
  const [insight, setInsight] = useState('');
  const [activeMood, setActiveMood] = useState('Bận');
  const [showHistory, setShowHistory] = useState(false);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editMood, setEditMood] = useState('');

  const moods = ['Vui', 'Bình tĩnh', 'Bận', 'Mệt'];

  const handleSave = () => {
     if (content.trim() || insight.trim()) {
        const fullContent = `${content}\n\n// BÀI HỌC:\n${insight}`;
        addJournalEntry(fullContent, activeMood);
        setContent('');
        setInsight('');
        showToast('Đã lưu nhật ký!', 'success');
     }
  };

  // Edit handlers
  const openEditModal = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setEditContent(entry.content);
    setEditMood(entry.mood);
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (editingEntry && editContent.trim()) {
      const dto: UpdateJournalDTO = {
        id: editingEntry.id,
        content: editContent,
        mood: editMood,
      };
      updateJournalEntry(dto);
      setIsEditModalOpen(false);
      setEditingEntry(null);
    }
  };

  // Map moods to icons
  const moodIcons: Record<string, string> = {
    'Vui': 'sentiment_satisfied',
    'Bình tĩnh': 'sentiment_neutral',
    'Bận': 'bolt',
    'Mệt': 'battery_alert'
  };

  return (
    <div className="max-w-3xl mx-auto pb-32">
       {/* Header */}
       <header className="border-4 border-neo-black mb-12 shadow-hard-lg">
          <div className="flex justify-between bg-neo-black text-white p-4 font-mono text-sm uppercase">
             <div className="flex items-center gap-2">
                <Icon name="edit_note" size={14} />
                Nhật_ký_số_#8392
             </div>
             <div>{new Date().toLocaleDateString('vi-VN')}</div>
          </div>
          <div className="bg-neo-yellow p-8 border-t-4 border-neo-black flex justify-between items-end">
             <div>
                <h2 className="text-5xl md:text-7xl font-display font-black uppercase leading-[0.85] tracking-tighter mb-4 text-black">
                    Viết đi,<br/>Đừng ngại.
                </h2>
                <p className="font-mono font-bold text-sm md:text-base">// {journalEntries.length} BÀI VIẾT ĐÃ LƯU</p>
             </div>
             <button 
                onClick={() => setShowHistory(!showHistory)}
                className="bg-white border-2 border-neo-black p-2 font-bold uppercase text-xs shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
             >
                {showHistory ? 'Ẩn lịch sử' : 'Xem lịch sử'}
             </button>
          </div>
       </header>

        {/* History Section (Collapsible) */}
        {showHistory && (
            <section className="mb-12 space-y-4 animate-in slide-in-from-top-4 duration-300">
                <h3 className="text-xl font-black uppercase border-l-4 border-neo-black pl-4">Lịch sử gần đây</h3>
                <div className="grid gap-4">
                    {journalEntries.length === 0 && <p className="font-mono text-gray-400 italic">Chưa có nhật ký nào.</p>}
                    {journalEntries.map(entry => (
                        <div key={entry.id} className="bg-white border-2 border-neo-black p-4 shadow-hard flex justify-between gap-4 group">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-neo-black text-white text-[10px] px-2 py-0.5 font-bold uppercase">{new Date(entry.createdAt).toLocaleDateString('vi-VN')}</span>
                                    <span className="font-mono text-xs font-bold uppercase text-gray-500">Tâm trạng: {entry.mood}</span>
                                </div>
                                <p className="font-mono text-sm whitespace-pre-wrap line-clamp-3">{entry.content}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <button 
                                    onClick={() => openEditModal(entry)}
                                    className="h-8 w-8 flex items-center justify-center hover:bg-neo-blue hover:text-white border-2 border-transparent hover:border-neo-black transition-colors"
                                    title="Chỉnh sửa"
                                >
                                    <Icon name="edit" size={18} />
                                </button>
                                <button 
                                    onClick={() => deleteJournalEntry(entry.id)}
                                    className="h-8 w-8 flex items-center justify-center hover:bg-neo-red hover:text-white border-2 border-transparent hover:border-neo-black transition-colors"
                                    title="Xóa"
                                >
                                    <Icon name="delete" size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}

       {/* Form */}
       <div className="space-y-12">
          {/* Status */}
          <section className="space-y-4">
             <h3 className="text-xl font-black uppercase border-l-4 border-neo-black pl-4">Trạng thái hiện tại</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Vui', icon: 'sentiment_satisfied' },
                  { label: 'Bình tĩnh', icon: 'sentiment_neutral' },
                  { label: 'Bận', icon: 'bolt' },
                  { label: 'Mệt', icon: 'priority_high' },
                ].map((status, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveMood(status.label)}
                    className={`
                    h-14 flex items-center justify-center gap-2 border-2 border-neo-black shadow-hard hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-mono font-bold uppercase text-sm
                    ${activeMood === status.label ? 'bg-neo-black text-white' : 'bg-white text-black hover:bg-gray-50'}
                  `}>
                     <Icon name={status.icon} size={18} />
                     {status.label}
                  </button>
                ))}
             </div>
          </section>

          {/* Content */}
          <section>
             <div className="flex justify-between items-center bg-neo-black text-white p-3 border-4 border-neo-black border-b-0">
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                   <Icon name="favorite" size={20} />
                   Nội dung chính
                </h3>
                <span className="font-mono text-xs">PHẦN_01</span>
             </div>
             <div className="relative border-4 border-neo-black bg-white shadow-hard group">
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-48 p-6 font-mono text-sm md:text-base resize-none focus:outline-none focus:bg-yellow-50 transition-colors"
                  placeholder="HÔM NAY CÓ GÌ VUI..."
                ></textarea>
             </div>
          </section>

          {/* Insight */}
          <section>
             <div className="flex justify-between items-center bg-white text-black p-3 border-4 border-neo-black border-b-0">
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                   <Icon name="lightbulb" size={20} />
                   Bài học rút ra
                </h3>
                <span className="font-mono text-xs">PHẦN_02</span>
             </div>
             <div className="relative border-4 border-neo-black bg-white shadow-hard group">
                <textarea 
                  value={insight}
                  onChange={(e) => setInsight(e.target.value)}
                  className="w-full h-48 p-6 font-mono text-sm md:text-base resize-none focus:outline-none focus:bg-yellow-50 transition-colors"
                  placeholder="GHI LẠI MỘT ĐIỀU MỚI HỌC ĐƯỢC..."
                ></textarea>
             </div>
          </section>
       </div>

       {/* Footer Actions */}
       <div className="fixed bottom-0 left-0 md:left-72 right-0 bg-white border-t-4 border-neo-black p-0 z-10">
          <div className="flex h-20 items-stretch">
             <button 
               onClick={() => { setContent(''); setInsight(''); }}
               className="w-1/3 md:w-auto px-8 md:px-12 font-mono font-bold uppercase hover:bg-neo-red hover:text-white border-r-4 border-neo-black flex items-center justify-center gap-2 transition-colors"
             >
                <Icon name="delete" size={20} />
                <span className="hidden sm:inline">Hủy</span>
             </button>
             <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400 font-mono font-bold uppercase text-xs">
                <span className="animate-pulse mr-2">●</span> Sẵn sàng lưu
             </div>
             <button 
               onClick={handleSave}
               className="w-1/2 md:w-auto px-12 md:px-20 bg-neo-black text-white hover:bg-neo-lime hover:text-black font-black uppercase text-xl flex items-center justify-center gap-2 transition-colors border-l-4 border-neo-black"
             >
                <span>Lưu lại</span>
                <Icon name="arrow_forward" size={20} />
             </button>
          </div>
       </div>

       {/* Edit Modal */}
       <Modal
         isOpen={isEditModalOpen}
         onClose={() => setIsEditModalOpen(false)}
         title="Chỉnh sửa nhật ký"
       >
         <FormTextarea
           label="Nội dung"
           value={editContent}
           onChange={setEditContent}
           placeholder="Nhập nội dung nhật ký..."
           rows={6}
         />
         <FormSelect
           label="Tâm trạng"
           value={editMood}
           onChange={setEditMood}
           options={moods}
         />
         <FormActions
           onCancel={() => setIsEditModalOpen(false)}
           onSubmit={handleEditSave}
           submitLabel="Lưu thay đổi"
         />
       </Modal>
    </div>
  );
};