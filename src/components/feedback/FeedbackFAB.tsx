/**
 * FeedbackFAB Component - Nút Nổi Đánh Giá & Góp Ý
 * Thiết kế chuẩn FAB tròn 48x48px (w-12 h-12):
 * - Đặt cố định góc dưới bên phải (right-5) thẳng hàng dọc với Gemini FAB
 * - Chứa icon tin nhắn góp ý MessageSquareHeart tinh tế với ánh gradient
 * - Hiển thị tooltip "Đánh giá & Góp ý" khi hover
 */

import React, { useMemo } from 'react';
import { MessageSquareHeart, Star } from 'lucide-react';
import { useFeedbackStore } from '../../store/useFeedbackStore';

interface FeedbackFABProps {
  className?: string;
}

export const FeedbackFAB: React.FC<FeedbackFABProps> = ({ className = '' }) => {
  const openModal = useFeedbackStore((s) => s.openModal);
  const feedbacks = useFeedbackStore((s) => s.feedbacks);

  const avgRating = useMemo(() => {
    if (feedbacks.length === 0) return 5.0;
    const sum = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round((sum / feedbacks.length) * 10) / 10;
  }, [feedbacks]);

  return (
    <div className={`fixed bottom-20 sm:bottom-5 right-5 z-40 ${className}`}>
      <button
        type="button"
        onClick={openModal}
        aria-label="Đánh giá & Góp ý TradAI Stylist"
        className="group relative w-12 h-12 rounded-full backdrop-blur-xl bg-white/90 dark:bg-[#151221]/90 text-[#1C1917] dark:text-white border border-[#E6E1D8] dark:border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_25px_rgba(255,51,102,0.25)] hover:shadow-[0_10px_30px_rgba(255,51,102,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ring-1 ring-white/30 flex items-center justify-center"
      >
        {/* Glow ambient highlight */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FF3366]/40 via-[#FFD166]/30 to-[#B5179E]/40 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />

        {/* Message icon with subtle rating indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <MessageSquareHeart className="w-5 h-5 text-[#FF3366] fill-[#FF3366]/20 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FFD166] border border-white dark:border-[#151221] flex items-center justify-center shadow-2xs">
            <Star className="w-1.5 h-1.5 fill-[#1C1917] text-[#1C1917]" />
          </span>
        </div>

        {/* Tooltip on Hover */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] text-xs font-semibold whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 flex items-center gap-1.5 z-50">
          <span>Đánh giá & Góp ý</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#FFD166]/20 text-[#B45309] dark:text-[#FFD166] font-mono font-bold">
            ★ {avgRating.toFixed(1)}
          </span>
          <span className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#18181B] dark:border-l-white" />
        </div>
      </button>
    </div>
  );
};
