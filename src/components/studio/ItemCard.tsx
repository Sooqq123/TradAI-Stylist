/**
 * ItemCard Component - Thẻ Món Đồ Thời Trang Minh Họa 2D Vector
 * Hiển thị vector SVG của chính món đồ đó qua OutfitRenderer mode="item".
 * Không dùng ảnh stock ngẫu nhiên, không phụ thuộc ảnh tải từ internet.
 */

import React from 'react';
import { Check, Plus, X } from 'lucide-react';
import { FashionItem } from '../../types';
import { OutfitRenderer } from '../avatar/OutfitRenderer';

interface ItemCardProps {
  item: FashionItem;
  isEquipped: boolean;
  onToggle: (item: FashionItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, isEquipped, onToggle }) => {
  const isTriggerWarning = Boolean(item.culturalNote && item.eraOrigin === 'modern');
  const isTraditional = item.eraOrigin === 'traditional';

  return (
    <div
      onClick={() => onToggle(item)}
      className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-150 flex flex-col bg-[#FFFFFF] dark:bg-[#1A1A1E] select-none ${
        isEquipped
          ? 'border-[#9E2A2B] dark:border-[#E05A47] ring-2 ring-[#9E2A2B]/20 dark:ring-[#E05A47]/20 shadow-md scale-[1.01]'
          : 'border-[#E5E5E2] dark:border-[#27272A] hover:border-[#9E2A2B]/40 dark:hover:border-[#E05A47]/40 shadow-sm hover:scale-[0.99] active:scale-[0.98]'
      }`}
    >
      {/* 2D Vector Item Preview Container */}
      <div className="aspect-[4/3] relative overflow-hidden bg-[#F8F8F7] dark:bg-[#121214] flex items-center justify-center p-3 border-b border-[#E5E5E2] dark:border-[#27272A]">
        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <OutfitRenderer item={item} mode="item" className="w-full h-full max-h-36 drop-shadow-sm" />
        </div>

        {/* Top Right: Equipped Status Checkmark */}
        {isEquipped && (
          <div className="absolute top-2 right-2 bg-[#9E2A2B] dark:bg-[#E05A47] text-white rounded-full p-1 shadow-md animate-in zoom-in-50 duration-150">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        )}

        {/* Bottom Left Badges: Truyền thống vs Hiện đại */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 flex-wrap">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
              isTraditional
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                : 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
            }`}
          >
            {isTraditional ? 'Truyền Thống' : 'Hiện Đại'}
          </span>

          {isTriggerWarning && (
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-600 text-white shadow-sm">
              Gợi Ý Đổi
            </span>
          )}
        </div>
      </div>

      {/* Information Details */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <h4 className="font-bold text-xs text-[#18181B] dark:text-[#FAFAFA] leading-snug line-clamp-2 mb-1">
            {item.name}
          </h4>

          <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] line-clamp-2 mb-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {item.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[9px] bg-[#F8F8F7] dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA] px-1.5 py-0.5 rounded border border-[#E5E5E2] dark:border-[#27272A] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Quick Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(item);
            }}
            className={`w-full py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
              isEquipped
                ? 'bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 text-[#9E2A2B] dark:text-[#E05A47] border border-[#9E2A2B]/30 dark:border-[#E05A47]/30 hover:bg-red-500 hover:text-white hover:border-red-500'
                : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#18181B] dark:text-[#FAFAFA] hover:bg-[#9E2A2B] hover:text-white dark:hover:bg-[#E05A47] dark:hover:text-white border border-[#E5E5E2] dark:border-[#27272A]'
            }`}
          >
            {isEquipped ? (
              <>
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Đang Mặc (Bấm để gỡ)</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Thử Món Này</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
