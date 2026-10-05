/**
 * FeedbackModal Component - Form Đánh Giá & Góp Ý Bản Phối Việt Phục Remix
 * Thiết kế chuẩn Cyber Y2K × Heritage Aesthetic:
 * - Star rating 1-5 sao tương tác với hiệu ứng hover vàng hoàng yến
 * - Category pill chips chọn 1 danh mục
 * - Character counter và validation thời gian thực
 * - Loading spinner chống spam click & Toast Notification phản hồi
 */

import React, { useState, useEffect } from 'react';
import { Star, X, Send, Loader2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useFeedbackStore } from '../../store/useFeedbackStore';
import { FeedbackCategory, FEEDBACK_CATEGORIES } from '../../types/feedback';

interface FeedbackModalProps {
  onShowToast?: (message: string, type?: 'success' | 'info' | 'warning' | 'error', subtitle?: string) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ onShowToast }) => {
  const isOpen = useFeedbackStore((s) => s.isModalOpen);
  const closeModal = useFeedbackStore((s) => s.closeModal);
  const addFeedback = useFeedbackStore((s) => s.addFeedback);

  // Form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<FeedbackCategory>('styling');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const starLabels: Record<number, string> = {
    1: 'Chưa phù hợp (1/5)',
    2: 'Cần cải thiện (2/5)',
    3: 'Hài lòng (3/5)',
    4: 'Rất ưng ý (4/5)',
    5: 'Tuyệt đỉnh di sản! (5/5)',
  };

  const activeDisplayRating = hoverRating || rating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form Validations
    const trimmedName = name.trim();
    const trimmedContent = content.trim();

    if (!trimmedName) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    if (trimmedName.length > 50) {
      setErrorMsg('Họ và tên không được vượt quá 50 ký tự.');
      return;
    }

    if (trimmedContent.length < 10) {
      setErrorMsg('Nội dung góp ý cần tối thiểu 10 ký tự để chia sẻ góc nhìn trọn vẹn.');
      return;
    }

    if (trimmedContent.length > 500) {
      setErrorMsg('Nội dung góp ý không được vượt quá 500 ký tự.');
      return;
    }

    // Submit with anti-spam loading state
    setIsSubmitting(true);
    setTimeout(() => {
      addFeedback({
        name: trimmedName,
        rating,
        category,
        content: trimmedContent,
      });

      setIsSubmitting(false);

      if (onShowToast) {
        onShowToast(
          'Cảm ơn bạn đã đóng góp ý kiến cho TradAI Stylist!',
          'success',
          'Đánh giá của bạn đã được xuất bản tới cộng đồng Gen Z.'
        );
      }

      // Reset form fields and close modal
      setName('');
      setRating(5);
      setContent('');
      setCategory('styling');
      closeModal();
    }, 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-[#FCFAF6] dark:bg-[#13101C] border border-[#E6E1D8] dark:border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)] text-[#1C1917] dark:text-[#FAF9F6] overflow-hidden my-auto animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Heritage Accent */}
        <div className="relative px-6 pt-6 pb-4 border-b border-[#E6E1D8] dark:border-white/10 bg-gradient-to-r from-rose-50/50 via-white to-amber-50/40 dark:from-[#1E1729] dark:via-[#161320] dark:to-[#1F192C]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF3366] via-[#E63946] to-[#B5179E] text-white shadow-md shadow-[#FF3366]/25 ring-2 ring-white/40">
                <Sparkles className="w-5 h-5 text-[#FFD166]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="feedback-modal-title" className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-[#1C1917] dark:text-white">
                    Đánh Giá & Góp Ý Bản Phối
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/20">
                    Gen Z Feedback
                  </span>
                </div>
                <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-0.5">
                  Chia sẻ trải nghiệm thẩm mỹ và góp phần hoàn thiện di sản thời trang đương đại.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeModal}
              disabled={isSubmitting}
              className="p-2 rounded-xl text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              aria-label="Đóng biểu mẫu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Validation Error banner */}
          {errorMsg && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold animate-in shake duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Star Rating Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#1C1917] dark:text-[#FAF9F6] uppercase tracking-wider flex items-center gap-1.5">
                <span>Số sao đánh giá</span>
                <span className="text-[#FF3366]">*</span>
              </label>
              <span className="text-xs font-bold text-[#B45309] dark:text-[#FFD166] transition-colors">
                {starLabels[activeDisplayRating]}
              </span>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#F5F2EB]/70 dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const isFilled = starVal <= activeDisplayRating;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 rounded-lg hover:scale-125 active:scale-100 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                      aria-label={`${starVal} sao`}
                    >
                      <Star
                        className={`w-7 h-7 transition-all duration-150 ${
                          isFilled
                            ? 'fill-[#FFD166] text-[#FFD166] drop-shadow-[0_2px_8px_rgba(255,209,102,0.6)]'
                            : 'fill-transparent text-[#D6D3D1] dark:text-[#57534E] hover:text-[#FFD166]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="h-5 w-[1px] bg-[#E6E1D8] dark:bg-white/10 mx-2" />
              <span className="text-xs text-[#78716C] dark:text-[#A8A29E] italic">
                Chạm để chọn điểm trải nghiệm
              </span>
            </div>
          </div>

          {/* 2. Họ và tên input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="feedback-author-name" className="text-xs font-bold text-[#1C1917] dark:text-[#FAF9F6] uppercase tracking-wider flex items-center gap-1.5">
                <span>Họ và tên của bạn</span>
                <span className="text-[#FF3366]">*</span>
              </label>
              <span className="text-[11px] text-[#A8A29E] font-mono">
                {name.length}/50
              </span>
            </div>
            <input
              id="feedback-author-name"
              type="text"
              required
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Nguyễn Hà My (Stylist / Gen Z)"
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-black/30 border border-[#E6E1D8] dark:border-white/10 text-xs sm:text-sm text-[#1C1917] dark:text-white placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#FF3366]/40 focus:border-[#FF3366] transition-all"
            />
          </div>

          {/* 3. Phân loại Category Pills */}
          <div>
            <label className="text-xs font-bold text-[#1C1917] dark:text-[#FAF9F6] uppercase tracking-wider block mb-2">
              Phân loại góp ý
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FEEDBACK_CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FF3366] to-[#B5179E] text-white border-transparent shadow-sm shadow-[#FF3366]/30 font-bold'
                        : 'bg-white dark:bg-white/5 border-[#E6E1D8] dark:border-white/10 text-[#57534E] dark:text-[#D6D3D1] hover:border-[#FF3366]/40 hover:bg-[#F5F2EB]/50 dark:hover:bg-white/10'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Nội dung nhận xét (Content Textarea) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="feedback-content" className="text-xs font-bold text-[#1C1917] dark:text-[#FAF9F6] uppercase tracking-wider flex items-center gap-1.5">
                <span>Nội dung nhận xét & Góp ý</span>
                <span className="text-[#FF3366]">*</span>
              </label>
              <span className={`text-[11px] font-mono ${content.length < 10 && content.length > 0 ? 'text-amber-500 font-bold' : 'text-[#A8A29E]'}`}>
                {content.length}/500 (tối thiểu 10)
              </span>
            </div>
            <textarea
              id="feedback-content"
              required
              rows={4}
              maxLength={500}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chia sẻ cảm nhận của bạn về bản phối, độ tôn dáng, quy tắc di sản văn hóa hoặc tính năng bạn muốn thấy tiếp theo..."
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-black/30 border border-[#E6E1D8] dark:border-white/10 text-xs sm:text-sm text-[#1C1917] dark:text-white placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#FF3366]/40 focus:border-[#FF3366] transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E6E1D8] dark:border-white/10">
            <button
              type="button"
              onClick={closeModal}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || content.trim().length < 10}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF3366] via-[#E63946] to-[#B5179E] text-white text-xs font-bold shadow-md shadow-[#FF3366]/25 hover:shadow-lg hover:shadow-[#FF3366]/35 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang gửi đánh giá...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Gửi Đánh Giá</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
