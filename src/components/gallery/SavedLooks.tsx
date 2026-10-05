/**
 * SavedLooks Component - Tủ Đồ Cá Nhân & Lưu Trữ Tác Phẩm
 * Displays user's saved outfits with persistent localStorage storage, delete, studio reloading, and export.
 */

import React, { useState } from 'react';
import {
  Bookmark,
  Check,
  Compass,
  Copy,
  Plus,
  Share2,
  Sparkles,
  Trash2,
  Wand2,
} from 'lucide-react';
import { OCCASIONS_META, STYLES_META } from '../../data/mockData';
import { useOutfitStore } from '../../store/useOutfitStore';
import { Outfit } from '../../types';
import { OutfitRenderer } from '../avatar/OutfitRenderer';
import { EmptyStateView } from './EmptyStateView';

export const SavedLooks: React.FC = () => {
  const { savedOutfits, setOutfit, deleteSavedOutfit, setViewMode } = useOutfitStore();
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleOpenInStudio = (outfit: Outfit) => {
    setOutfit(outfit);
    setViewMode('studio');
  };

  const handleShareLook = (outfit: Outfit) => {
    const textSummary = `✨ Bản phối TradAI Stylist: "${outfit.name}"\n` +
      `👘 Áo chính: ${outfit.garment.name}\n` +
      `👖 Quần: ${outfit.bottom?.name || 'Mặc định'}\n` +
      `👟 Giày: ${outfit.footwear?.name || 'Mặc định'}\n` +
      `🏮 Dịp diện: ${OCCASIONS_META[outfit.occasion]?.label || outfit.occasion}\n` +
      `⚖️ Chỉ số cân bằng di sản: ${outfit.culturalBalance}%\n` +
      `#TradAIStylist #VietPhucHeritage #GenZTradition`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textSummary);
      setCopyFeedback(outfit.id);
      setTimeout(() => setCopyFeedback(null), 2500);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm transition-colors">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9E2A2B] dark:text-[#E05A47] bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 px-3 py-1 rounded-full border border-[#9E2A2B]/20 dark:border-[#E05A47]/30">
              TỦ ĐỒ ĐÃ LƯU • LOCALSTORAGE PERSISTED
            </span>
            <span className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
              • {savedOutfits.length} Tác Phẩm
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#18181B] dark:text-[#FAFAFA]">
            Tủ Đồ Độc Bản Của Bạn
          </h2>

          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] max-w-2xl leading-relaxed">
            Nơi lưu trữ an toàn các tác phẩm bạn đã phối từ Studio hoặc Trình kiến tạo 4 bước. Dữ liệu được đồng bộ trực tiếp vào trình duyệt, sẵn sàng mở lại bất cứ lúc nào.
          </p>
        </div>

        <button
          onClick={() => setViewMode('studio')}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#9E2A2B] dark:bg-[#E05A47] hover:brightness-110 shadow-sm transition-all whitespace-nowrap self-start md:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tạo Look Mới Trong Studio</span>
        </button>
      </div>

      {/* Outfits List or Empty State */}
      {savedOutfits.length === 0 ? (
        <EmptyStateView
          type="wardrobe"
          onAction={() => setViewMode('studio')}
          actionLabel="Vào Studio Phối Đồ Ngay"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedOutfits.map((outfit) => {
            const isCopied = copyFeedback === outfit.id;

            return (
              <div
                key={outfit.id}
                className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] overflow-hidden flex flex-col justify-between hover:border-[#9E2A2B]/40 dark:hover:border-[#E05A47]/40 transition-all group shadow-sm hover:shadow-md"
              >
                {/* Outfit Preview Vector Avatar */}
                <div className="aspect-[3/4] relative overflow-hidden bg-[#F8F8F7] dark:bg-[#121214] flex items-center justify-center p-2 border-b border-[#E5E5E2] dark:border-[#27272A]">
                  <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <OutfitRenderer outfit={outfit} className="w-full h-full" />
                  </div>

                  {/* Style Tag */}
                  <div className="absolute top-3 left-3 bg-[#18181B]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-sm">
                    <Compass className="w-3 h-3 text-amber-400" />
                    <span>
                      {outfit.culturalBalance >= 80
                        ? 'Thiên về truyền thống'
                        : outfit.culturalBalance <= 60
                        ? 'Thiên về hiện đại'
                        : 'Cân bằng phong cách'}
                    </span>
                  </div>

                  {/* Delete Action Button */}
                  <button
                    onClick={() => deleteSavedOutfit(outfit.id)}
                    title="Xóa bản phối khỏi Tủ đồ"
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-red-600 text-white backdrop-blur-md transition-colors shadow-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Information Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 text-[#9E2A2B] dark:text-[#E05A47] uppercase border border-[#9E2A2B]/20 dark:border-[#E05A47]/30">
                        {STYLES_META[outfit.style]?.label || outfit.style}
                      </span>
                      <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] font-semibold">
                        • {OCCASIONS_META[outfit.occasion]?.label || outfit.occasion}
                      </span>
                    </div>

                    <h3 className="font-editorial font-bold text-base text-[#18181B] dark:text-[#FAFAFA] mb-2 leading-snug">
                      {outfit.name}
                    </h3>

                    {/* Component items summary */}
                    <div className="text-xs text-[#71717A] dark:text-[#A1A1AA] space-y-1 mb-4">
                      <p className="line-clamp-1">
                        <span className="font-semibold text-[#52525B] dark:text-[#D4D4D8]">Áo:</span>{' '}
                        {outfit.garment.name}
                      </p>
                      <p className="line-clamp-1">
                        <span className="font-semibold text-[#52525B] dark:text-[#D4D4D8]">Quần:</span>{' '}
                        {outfit.bottom ? outfit.bottom.name : 'Mặc định'}
                      </p>
                      <p className="line-clamp-1">
                        <span className="font-semibold text-[#52525B] dark:text-[#D4D4D8]">Giày:</span>{' '}
                        {outfit.footwear ? outfit.footwear.name : 'Mặc định'}
                      </p>
                      {outfit.accessories?.length > 0 && (
                        <p className="line-clamp-1">
                          <span className="font-semibold text-[#52525B] dark:text-[#D4D4D8]">Phụ kiện:</span>{' '}
                          {outfit.accessories.map((a) => a.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions Row: Open in Studio + Share */}
                  <div className="flex items-center gap-2 pt-2 border-t border-[#E5E5E2] dark:border-[#27272A]">
                    <button
                      onClick={() => handleOpenInStudio(outfit)}
                      className="flex-1 py-2.5 bg-[#9E2A2B] dark:bg-[#E05A47] hover:brightness-110 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Wand2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Mở Trong Studio</span>
                    </button>

                    <button
                      onClick={() => handleShareLook(outfit)}
                      title="Sao chép tóm tắt để chia sẻ"
                      className="p-2.5 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] bg-[#F8F8F7] dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] transition-colors"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                      ) : (
                        <Share2 className="w-4 h-4 stroke-[2]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
