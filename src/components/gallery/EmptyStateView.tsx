/**
 * EmptyStateView Component - Giao Diện Trạng Thái Trống & Lời Chúc Tết
 * Supports search empty state and wardrobe empty state with warm editorial copywriting.
 */

import React from 'react';
import { Bookmark, Sparkles, SearchX, Wand2 } from 'lucide-react';

interface EmptyStateViewProps {
  type: 'search' | 'wardrobe';
  onAction?: () => void;
  actionLabel?: string;
  customMessage?: string;
}

export const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  type,
  onAction,
  actionLabel,
  customMessage,
}) => {
  if (type === 'search') {
    return (
      <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-10 sm:p-14 text-center flex flex-col items-center justify-center gap-3 transition-colors">
        <div className="w-14 h-14 rounded-2xl bg-[#F8F8F7] dark:bg-[#121214] text-[#A1A1AA] flex items-center justify-center border border-[#E5E5E2] dark:border-[#27272A]">
          <SearchX className="w-7 h-7 stroke-[1.5]" />
        </div>

        <h3 className="font-editorial text-lg font-bold text-[#18181B] dark:text-[#FAFAFA] mt-1">
          Không tìm thấy bản phối phù hợp
        </h3>

        <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] max-w-sm leading-relaxed">
          {customMessage ||
            'Không có kết quả nào khớp với từ khóa hoặc bộ lọc của bạn. Hãy thử tìm theo tên dòng áo hoặc tag phong cách khác.'}
        </p>

        {onAction && (
          <button
            onClick={onAction}
            className="mt-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#9E2A2B] dark:bg-[#E05A47] hover:brightness-110 shadow-sm transition-all"
          >
            {actionLabel || 'Xóa Bộ Lọc'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-10 sm:p-14 text-center flex flex-col items-center justify-center gap-3 transition-colors">
      <div className="w-16 h-16 rounded-2xl bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 text-[#9E2A2B] dark:text-[#E05A47] flex items-center justify-center border border-[#9E2A2B]/20 dark:border-[#E05A47]/30 mb-1">
        <Sparkles className="w-8 h-8 stroke-[1.75]" />
      </div>

      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9E2A2B] dark:text-[#E05A47] bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 px-3 py-1 rounded-full border border-[#9E2A2B]/20 dark:border-[#E05A47]/30">
        Khai Xuân Đắc Lộc 2026
      </span>

      <h3 className="font-editorial text-xl font-bold text-[#18181B] dark:text-[#FAFAFA]">
        Tủ đồ đầu năm đang đợi sắc xuân mới!
      </h3>

      <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] max-w-md leading-relaxed">
        {customMessage ||
          'Bạn chưa lưu bộ trang phục nào vào tủ đồ cá nhân. Hãy ghé thăm Studio hoặc Trình kiến tạo 4 bước để phối ngay một set Việt Phục độc bản chào xuân Bính Ngọ.'}
      </p>

      {onAction && (
        <button
          onClick={onAction}
          className="mt-3 flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#9E2A2B] to-[#B3393B] hover:from-[#802223] hover:to-[#9E2A2B] dark:from-[#E05A47] dark:to-[#EB6B58] shadow-md shadow-[#9E2A2B]/20 dark:shadow-[#E05A47]/20 transition-all hover:scale-105 active:scale-95"
        >
          <Wand2 className="w-4 h-4" />
          <span>{actionLabel || 'Tạo Outfit Đầu Tiên'}</span>
        </button>
      )}
    </div>
  );
};
