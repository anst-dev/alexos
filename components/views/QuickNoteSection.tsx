import React, { useState, useCallback } from 'react';
import { Icon } from '../ui/Icon';
import { useToast } from '../../context/ToastContext';

// Webhook URL cho ghi chú nhanh
const QUICK_NOTE_WEBHOOK_URL = 'https://unsupercilious-leonarda-unreaving.ngrok-free.dev/webhook/log_app';
const ENABLE_QUICK_NOTE_API = true;

interface QuickNoteSectionProps {
    onNoteSubmitted?: () => void;
}

export const QuickNoteSection: React.FC<QuickNoteSectionProps> = React.memo(({ onNoteSubmitted }) => {
    const [quickNote, setQuickNote] = useState('');
    const [isSubmittingNote, setIsSubmittingNote] = useState(false);
    const { showToast } = useToast();

    const sendQuickNote = useCallback(async () => {
        if (!quickNote.trim()) {
            showToast('Vui lòng nhập ghi chú!', 'warning');
            return;
        }

        if (!ENABLE_QUICK_NOTE_API || !QUICK_NOTE_WEBHOOK_URL) {
            showToast('Chức năng ghi chú nhanh tạm thời tắt!', 'warning');
            return;
        }

        setIsSubmittingNote(true);
        try {
            const response = await fetch(QUICK_NOTE_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: quickNote,
            });

            if (response.ok) {
                showToast('Đã ghi lại thành công!', 'success');
                setQuickNote('');
                onNoteSubmitted?.();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Lỗi gửi ghi chú:', error);
            showToast('Lỗi khi gửi ghi chú. Vui lòng thử lại!', 'error');
        } finally {
            setIsSubmittingNote(false);
        }
    }, [quickNote, showToast, onNoteSubmitted]);

    return (
        <section className="mb-8">
            <div className="bg-white border-4 border-neo-black shadow-hard-lg">
                <div className="p-4 border-b-4 border-neo-black bg-neo-black flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Icon name="edit_note" size={30} className="text-neo-lime" />
                        <h3 className="text-white font-display text-2xl uppercase">Ghi Chú Nhanh</h3>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-white"></div>
                        <div className="w-3 h-3 border-2 border-white"></div>
                    </div>
                </div>
                <div className="p-6 bg-white">
                    <textarea
                        value={quickNote}
                        onChange={(e) => setQuickNote(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                e.preventDefault();
                                sendQuickNote();
                            }
                        }}
                        className="w-full h-24 bg-gray-50 border-2 border-neo-black p-4 text-neo-black font-mono placeholder-gray-500 focus:outline-none focus:border-neo-lime resize-none"
                        placeholder="GHI_LẠI_Ý_TƯỞNG... (Ctrl/Cmd + Enter để gửi)"
                        disabled={isSubmittingNote}
                    ></textarea>
                    <button
                        onClick={sendQuickNote}
                        disabled={isSubmittingNote || !quickNote.trim()}
                        className="w-full mt-4 py-4 bg-neo-lime border-2 border-neo-black font-black uppercase hover:bg-neo-black hover:text-white transition-all shadow-hard active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmittingNote ? (
                            <>
                                <span className="animate-spin">⏳</span>
                                Đang gửi...
                            </>
                        ) : (
                            <>
                                GHI LẠI
                                <Icon name="send" size={20} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
});

QuickNoteSection.displayName = 'QuickNoteSection';
