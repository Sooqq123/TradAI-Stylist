/**
 * GeminiStylistWidget Component - Trợ Lý Cố Vấn Thời Trang Cổ Phục AI (Gemini Flash)
 * Cung cấp lời khuyên chuyên sâu về phom dáng, phong thủy sắc màu Tết,
 * và chuẩn mực văn hóa truyền thống thời gian thực.
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Check,
  RefreshCw,
  Palette,
  ShieldCheck,
  Zap,
  Layers,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { useOutfitStore } from '../../store/useOutfitStore';
import { generateOutfitAdvice, OutfitAdvice } from '../../services/geminiService';
import { ALL_FASHION_ITEMS } from '../../data/mockData';
import { FashionItem } from '../../types';

export const GeminiStylistWidget: React.FC = () => {
  const { currentOutfit, setGarment, setBottom, setFootwear, setHeadwear, toggleAccessory } =
    useOutfitStore();

  const [advice, setAdvice] = useState<OutfitAdvice | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const garmentType = currentOutfit.garment?.garmentType || 'ao_dai';
      const occasion = currentOutfit.occasion || 'du_xuan';
      const style = currentOutfit.style || 'y2k';
      const outfitName = currentOutfit.name;

      const res = await generateOutfitAdvice(occasion, style, garmentType, outfitName);
      setAdvice(res);
    } catch {
      // Graceful fallback is handled within generateOutfitAdvice
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch on first load
  useEffect(() => {
    fetchAdvice();
  }, [currentOutfit.garment?.garmentType, currentOutfit.occasion, currentOutfit.style]);

  const handleEquipSuggested = (item: FashionItem) => {
    if (item.category === 'garment') setGarment(item);
    else if (item.category === 'bottom') setBottom(item);
    else if (item.category === 'footwear') setFootwear(item);
    else if (item.category === 'headwear') setHeadwear(item);
    else if (item.category === 'accessory') toggleAccessory(item);
  };

  const isEquipped = (itemId: string): boolean => {
    if (currentOutfit.garment?.id === itemId) return true;
    if (currentOutfit.bottom?.id === itemId) return true;
    if (currentOutfit.footwear?.id === itemId) return true;
    if (currentOutfit.headwear?.id === itemId) return true;
    return Boolean(currentOutfit.accessories?.some((a) => a.id === itemId));
  };

  const suggestedItems: FashionItem[] = (advice?.suggestedItemIds || [])
    .map((id) => ALL_FASHION_ITEMS.find((it) => it.id === id))
    .filter((it): it is FashionItem => Boolean(it));

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-4 sm:p-5 shadow-sm relative overflow-hidden transition-all duration-300">
      {/* Decorative gradient corner badge */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#9E2A2B]/10 via-[#E05A47]/5 to-transparent pointer-events-none rounded-tr-2xl" />

      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#9E2A2B] to-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-editorial text-sm font-bold text-[#18181B] dark:text-[#FAFAFA]">
                Cố Vấn Stylist AI (Gemini)
              </h3>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 text-[#9E2A2B] dark:text-[#E05A47]">
                {advice?.source === 'gemini_api' ? '✦ GEMINI FLASH' : 'Di Sản Số (Offline)'}
              </span>
            </div>
            <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
              Giám tuyển phom dáng & triết lý phối cổ phục di sản
            </p>
          </div>
        </div>

        <button
          onClick={fetchAdvice}
          disabled={loading}
          title="Lấy phân tích mới từ AI"
          className="p-1.5 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] hover:bg-[#F8F8F7] dark:hover:bg-[#27272A] transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Offline Mode Notice */}
      {!loading && advice?.source !== 'gemini_api' && (
        <div className="mb-3.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-900 dark:text-amber-200 text-[11px] flex items-start gap-2 leading-relaxed">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="flex-1">
            <span>
              Đang chạy ở <strong>Chế độ Di Sản Số (Offline)</strong>. Cấu hình biến môi trường <code className="px-1 py-0.5 rounded bg-amber-500/20 font-mono text-[10px] font-bold">VITE_GEMINI_API_KEY</code> để kích hoạt <strong>✦ GEMINI FLASH</strong> thời gian thực.
            </span>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-3 py-2 animate-pulse">
          <div className="h-4 bg-[#F8F8F7] dark:bg-[#27272A] rounded-md w-3/4" />
          <div className="h-14 bg-[#F8F8F7] dark:bg-[#27272A] rounded-xl w-full" />
          <div className="h-8 bg-[#F8F8F7] dark:bg-[#27272A] rounded-xl w-2/3" />
        </div>
      )}

      {/* Content when loaded */}
      {!loading && advice && (
        <div className="space-y-3 relative z-10 text-xs animate-in fade-in duration-200">
          {/* Title from AI */}
          <div className="border-l-2 border-[#9E2A2B] dark:border-[#E05A47] pl-2.5 py-0.5">
            <h4 className="font-editorial text-xs font-bold text-[#18181B] dark:text-[#FAFAFA]">
              {advice.stylingTitle}
            </h4>
          </div>

          {/* Recommendation Reason */}
          <p className="text-[#52525B] dark:text-[#D4D4D8] leading-relaxed text-[11px]">
            {advice.recommendationReason}
          </p>

          {/* Cultural Tip Pill */}
          <div className="bg-[#F8F8F7] dark:bg-[#121214] p-3 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] flex items-start gap-2.5">
            <BookOpen className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E05A47] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E2A2B] dark:text-[#E05A47] block mb-0.5">
                Quy Tắc Di Sản
              </span>
              <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                {advice.culturalTip}
              </p>
            </div>
          </div>

          {/* Auspicious Colors */}
          {advice.auspiciousColors && advice.auspiciousColors.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] font-bold text-[#71717A] dark:text-[#A1A1AA] flex items-center gap-1">
                <Palette className="w-3 h-3 text-[#9E2A2B] dark:text-[#E05A47]" />
                Sắc màu may mắn:
              </span>
              {advice.auspiciousColors.map((c, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F8F8F7] dark:bg-[#27272A] text-[#18181B] dark:text-[#FAFAFA] border border-[#E5E5E2] dark:border-[#3F3F46]"
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {/* Suggested Items for 1-Click Equip */}
          {suggestedItems.length > 0 && (
            <div className="pt-2 border-t border-[#E5E5E2] dark:border-[#27272A]">
              <span className="text-[10px] font-bold text-[#71717A] dark:text-[#A1A1AA] block mb-1.5 uppercase tracking-wider">
                Gợi Ý Món Đồ Hòa Hợp
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedItems.map((item) => {
                  const equipped = isEquipped(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleEquipSuggested(item)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 border ${
                        equipped
                          ? 'bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 text-[#9E2A2B] dark:text-[#E05A47] border-[#9E2A2B]/30 dark:border-[#E05A47]/30'
                          : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#52525B] dark:text-[#D4D4D8] border-[#E5E5E2] dark:border-[#27272A] hover:border-[#9E2A2B]/40 dark:hover:border-[#E05A47]/40'
                      }`}
                    >
                      {equipped ? (
                        <Check className="w-3 h-3 text-[#9E2A2B] dark:text-[#E05A47]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A2B] dark:bg-[#E05A47]" />
                      )}
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * GeminiStylistFAB - Nút Tròn Nổi Floating Action Button (FAB)
 * Kích thước chuẩn 48x48px (w-12 h-12), logo Gemini ngôi sao 4 cánh gradient,
 * chấm thông báo góc nút và tooltip "Hỏi nhanh Gemini" khi hover.
 */
export interface GeminiStylistFABProps {
  onClick?: () => void;
  className?: string;
  hasNotification?: boolean;
}

export const GeminiStylistFAB: React.FC<GeminiStylistFABProps> = ({
  onClick,
  className = '',
  hasNotification = true,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Hỏi nhanh Gemini"
      className={`group relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#9E2A2B] via-[#E05A47] to-[#FFD166] dark:from-[#FF3366] dark:via-[#9E2A2B] dark:to-[#FFD166] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(224,90,71,0.45)] hover:shadow-[0_10px_30px_rgba(255,51,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ring-2 ring-white/30 dark:ring-white/20 z-40 ${className}`}
    >
      {/* 4-point Gemini Sparkle Star Logo */}
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
      </svg>

      {/* Small Notification Dot on Corner */}
      {hasNotification && (
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#06D6A0] border-2 border-white dark:border-[#1A1A1E] shadow-xs flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        </span>
      )}

      {/* Tooltip on Hover */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] text-xs font-semibold whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 flex items-center gap-1.5 z-50">
        <span className="text-[#FFD166] dark:text-[#E05A47]">✦</span>
        <span>Hỏi nhanh Gemini</span>
        <span className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#18181B] dark:border-l-white" />
      </div>
    </button>
  );
};
