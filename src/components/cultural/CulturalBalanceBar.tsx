/**
 * CulturalBalanceBar Component - Thanh Đo Cân Bằng Văn Hóa (Heritage vs Remix Gauge)
 * Hiển thị 3 vùng: [ Cổ Điển Nguyên Bản ] ──●── [ Cân Bằng Hài Hòa ] ──── [ Phá Cách Táo Bạo ]
 * Con trượt có hiệu ứng phát sáng chuyển màu theo vị trí (Vàng đồng -> Hồng Neon -> Đỏ Rực).
 * Phản hồi tức thì (<0.1s) với nhãn tỷ lệ động: "${heritagePercent}% Di sản - ${remixPercent}% Remix".
 */

import React from 'react';
import { Compass, Sparkles, Flame, ShieldCheck } from 'lucide-react';
import { useOutfitStore } from '../../store/useOutfitStore';

export const CulturalBalanceBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { currentOutfit } = useOutfitStore();
  const balance = Math.min(100, Math.max(0, currentOutfit.culturalBalance ?? 75));

  const heritagePercent = balance;
  const remixPercent = 100 - balance;

  // Position on track: Left is Cổ Điển (100%), Middle is Cân Bằng, Right is Phá Cách (0%)
  // Slider position from left: (100 - balance)% = remixPercent%
  const sliderPositionPercent = remixPercent;

  // Determine current active zone and glow styling
  let zoneLabel = 'Cân Bằng Hài Hòa';
  let zoneColorHex = '#FF3366'; // Hồng Neon
  let glowColor = 'rgba(255, 51, 102, 0.7)';
  let zoneTextColor = 'text-[#FF3366]';
  let zoneBgClass = 'bg-[#FF3366]/10 border-[#FF3366]/30';
  let advice = 'Sự kết hợp ăn ý: Giữ phom dáng tà áo chuẩn mực và tạo điểm nhấn phá cách bằng phụ kiện hiện đại.';

  if (balance >= 75) {
    zoneLabel = 'Cổ Điển Nguyên Bản';
    zoneColorHex = '#D4AF37'; // Vàng Đồng Hoàng Kim
    glowColor = 'rgba(212, 175, 55, 0.75)';
    zoneTextColor = 'text-[#D4AF37]';
    zoneBgClass = 'bg-[#D4AF37]/15 border-[#D4AF37]/35';
    advice = 'Bộ cánh đậm chất cung đình và phong vị cổ truyền, toát lên phong thái đĩnh đạc, đoan chính tuyệt đối.';
  } else if (balance < 40) {
    zoneLabel = 'Phá Cách Táo Bạo';
    zoneColorHex = '#E63946'; // Đỏ Rực Cyber
    glowColor = 'rgba(230, 57, 70, 0.85)';
    zoneTextColor = 'text-[#E63946]';
    zoneBgClass = 'bg-[#E63946]/15 border-[#E63946]/35';
    advice = 'Tuyên ngôn thời trang Y2K cực cháy: Táo bạo, nổi bật và bứt phá khỏi mọi khuôn mẫu thường ngày.';
  }

  // Count items
  const allItems = [
    currentOutfit.garment,
    currentOutfit.bottom,
    currentOutfit.footwear,
    currentOutfit.headwear,
    ...(currentOutfit.accessories || []),
  ].filter(Boolean);

  const traditionalCount = allItems.filter((i) => i?.eraOrigin === 'traditional').length;
  const modernCount = allItems.filter((i) => i?.eraOrigin === 'modern').length;

  return (
    <div
      className={`rounded-2xl bg-white dark:bg-[#15121E] border border-[#E6E1D8] dark:border-white/10 p-4 shadow-xs transition-colors ${className}`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center font-bold transition-colors shadow-xs"
            style={{ backgroundColor: `${zoneColorHex}20`, color: zoneColorHex }}
          >
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A8A29E] block leading-none">
              CHỈ SỐ VĂN HÓA
            </span>
            <h4 className="font-editorial text-sm font-bold text-[#1C1917] dark:text-[#FAF9F6]">
              Thang Đo Cân Bằng Di Sản & Remix
            </h4>
          </div>
        </div>

        {/* Dynamic Ratio Badge */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${zoneBgClass} ${zoneTextColor}`}
        >
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>{heritagePercent}% Di sản - {remixPercent}% Remix</span>
        </div>
      </div>

      {/* 3 Dynamic Zone Labels: [ Cổ Điển Nguyên Bản ] ──●── [ Cân Bằng Hài Hòa ] ──── [ Phá Cách Táo Bạo ] */}
      <div className="grid grid-cols-3 text-center text-[10px] font-extrabold uppercase tracking-tight mb-2">
        <div
          className={`transition-colors text-left pl-1 ${
            balance >= 75 ? 'text-[#D4AF37] font-black scale-102' : 'text-[#78716C] dark:text-[#78716C]'
          }`}
        >
          [ Cổ Điển Nguyên Bản ]
        </div>
        <div
          className={`transition-colors ${
            balance >= 40 && balance < 75
              ? 'text-[#FF3366] font-black scale-102'
              : 'text-[#78716C] dark:text-[#78716C]'
          }`}
        >
          [ Cân Bằng Hài Hòa ]
        </div>
        <div
          className={`transition-colors text-right pr-1 ${
            balance < 40 ? 'text-[#E63946] font-black scale-102' : 'text-[#78716C] dark:text-[#78716C]'
          }`}
        >
          [ Phá Cách Táo Bạo ]
        </div>
      </div>

      {/* Interactive Visual Gauge Track */}
      <div className="relative py-2">
        {/* Track Line with dynamic gradient */}
        <div className="relative h-2.5 w-full bg-[#E6E1D8] dark:bg-white/10 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-[#D4AF37] via-[#FF3366] to-[#E63946]"
            style={{ width: '100%' }}
          />
        </div>

        {/* Zone Markers (dividers) */}
        <div className="absolute top-2.5 left-[25%] -translate-x-1/2 w-0.5 h-2.5 bg-black/20 dark:bg-white/30 pointer-events-none" />
        <div className="absolute top-2.5 left-[60%] -translate-x-1/2 w-0.5 h-2.5 bg-black/20 dark:bg-white/30 pointer-events-none" />

        {/* Glowing Slider Knob (Con trượt phát sáng chuyển màu theo vị trí) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-[#0D0B12] border-2 transition-all duration-500 ease-out cursor-pointer z-10 flex items-center justify-center"
          style={{
            left: `${sliderPositionPercent}%`,
            borderColor: zoneColorHex,
            boxShadow: `0 0 16px ${glowColor}, 0 0 6px ${zoneColorHex}`,
          }}
          title={`Hiện tại: ${zoneLabel} (${heritagePercent}% Di sản - ${remixPercent}% Remix)`}
        >
          <div
            className="w-2 h-2 rounded-full transition-colors duration-500"
            style={{ backgroundColor: zoneColorHex }}
          />
        </div>
      </div>

      {/* Item Breakdown & Advice Text */}
      <div className="mt-2.5 pt-2.5 border-t border-[#E6E1D8] dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <p className="text-[#57534E] dark:text-[#D6D3D1] leading-relaxed flex-1 font-medium">
          {advice}
        </p>
        <div className="flex items-center gap-2 shrink-0 text-[10px] font-bold text-[#78716C] dark:text-[#A8A29E]">
          <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
            {traditionalCount} Di sản
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#FF3366]/15 text-[#FF3366] border border-[#FF3366]/30">
            {modernCount} Remix
          </span>
        </div>
      </div>
    </div>
  );
};
