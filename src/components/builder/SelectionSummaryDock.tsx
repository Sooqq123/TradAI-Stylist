/**
 * SelectionSummaryDock Component - Fit Summary Tray & Smart Wizard Controls
 * Cyber Heritage / Y2K Đông Dương Aesthetic
 * Fixed/Sticky above MobileBottomNav on small viewports (<1024px) and docked cleanly on desktop.
 */

import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Compass,
  Flame,
  Sparkles,
  Users,
  Wand2,
} from 'lucide-react';
import { OCCASIONS_META, STYLES_META } from '../../data/mockData';
import { GarmentType, OccasionType, StyleVibe } from '../../types';

export type GarmentChoice = GarmentType | 'auto';

export interface SelectionSummaryDockProps {
  selectedOccasion: OccasionType;
  selectedGarment: GarmentChoice;
  selectedStyle: StyleVibe;
  selectedColor: string;
  currentStep: number;
  totalSteps: number;
  isGenerating?: boolean;
  onNext: () => void;
  onBack: () => void;
  onGenerate: () => void;
}

export const SelectionSummaryDock: React.FC<SelectionSummaryDockProps> = ({
  selectedOccasion,
  selectedGarment,
  selectedStyle,
  selectedColor,
  currentStep,
  totalSteps = 4,
  isGenerating = false,
  onNext,
  onBack,
  onGenerate,
}) => {
  // Map occasion to icon
  const getOccasionIcon = (type: OccasionType) => {
    switch (type) {
      case 'chup_anh_tet':
        return <Camera className="w-3.5 h-3.5 text-[#FF3366]" />;
      case 'du_xuan':
        return <Compass className="w-3.5 h-3.5 text-[#06D6A0]" />;
      case 'le_chua':
        return <Flame className="w-3.5 h-3.5 text-[#FFD166]" />;
      case 'gap_ban_be':
        return <Users className="w-3.5 h-3.5 text-[#B5179E]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#FF3366]" />;
    }
  };

  const garmentLabel =
    selectedGarment === 'auto'
      ? 'AI Tự Động'
      : selectedGarment === 'ao_dai'
      ? 'Áo Dài'
      : selectedGarment === 'ngu_than'
      ? 'Ngũ Thân'
      : 'Áo Bà Ba';

  const occasionLabel = OCCASIONS_META[selectedOccasion]?.label || 'Dịp Tết';
  const styleLabel = STYLES_META[selectedStyle]?.label || 'Cyber Heritage';

  return (
    <aside
      aria-label="Tóm tắt lựa chọn và điều hướng"
      className="sticky bottom-[72px] sm:bottom-[76px] lg:bottom-4 z-30 w-full transition-all duration-300 pointer-events-auto"
    >
      <div className="rounded-2xl backdrop-blur-2xl bg-white/95 dark:bg-[#14111D]/90 border border-[#E6E1D8] dark:border-white/15 p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.65)] ring-1 ring-black/5 dark:ring-white/10 flex flex-col md:flex-row items-center justify-between gap-3.5">
        {/* FIT SUMMARY TRAY */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A8A29E] mr-1">
            <span className="text-[#FF3366] text-xs">✦</span>
            <span>Fit Đang Phối:</span>
          </div>

          {/* Dịp mặc Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F2EB] dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10 text-xs font-semibold text-[#1C1917] dark:text-[#FAF9F6] shadow-2xs">
            {getOccasionIcon(selectedOccasion)}
            <span className="truncate max-w-[130px] sm:max-w-none">{occasionLabel}</span>
          </div>

          {/* Dòng áo Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F2EB] dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10 text-xs font-semibold text-[#1C1917] dark:text-[#FAF9F6] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3366]" />
            <span>{garmentLabel}</span>
          </div>

          {/* Style Vibe Sticker */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF3366]/10 via-[#B5179E]/10 to-[#06D6A0]/10 border border-[#FF3366]/30 text-xs font-bold text-[#E63946] dark:text-[#FF3366] shadow-2xs">
            <span className="text-[10px]">✦</span>
            <span className="truncate max-w-[120px] sm:max-w-none">{styleLabel}</span>
          </div>

          {/* Metallic Chrome Ring for Chosen Color */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5F2EB] dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10 text-xs text-[#78716C] dark:text-[#A8A29E]"
            title={`Mã màu: ${selectedColor}`}
          >
            <div
              className="w-4 h-4 rounded-full border-2 border-white dark:border-white/60 shadow-sm ring-2 ring-black/10 dark:ring-white/20 shrink-0"
              style={{ backgroundColor: selectedColor }}
            />
            <span className="text-[10px] font-mono uppercase hidden sm:inline">{selectedColor}</span>
          </div>
        </div>

        {/* STEP CONTROLS (QUAY LẠI / TIẾP TỤC) */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E6E1D8]/60 dark:border-white/10">
          {currentStep > 1 && (
            <button
              onClick={onBack}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-[#57534E] dark:text-[#D6D3D1] hover:text-[#1C1917] dark:hover:text-white bg-[#F5F2EB] dark:bg-white/5 hover:bg-[#ECE7DD] dark:hover:bg-white/10 border border-[#E6E1D8] dark:border-white/10 transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Quay Lại</span>
            </button>
          )}

          {currentStep < totalSteps ? (
            <button
              onClick={onNext}
              className="group relative flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3366] via-[#E63946] to-[#B5179E] hover:from-[#FF4D7D] hover:to-[#C724AF] shadow-[0_4px_20px_rgba(255,51,102,0.35)] hover:shadow-[0_6px_25px_rgba(255,51,102,0.5)] transition-all duration-200 active:scale-95 cursor-pointer overflow-hidden"
            >
              {/* Subtle shimmer sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

              <span className="tracking-wide">Tiếp Tục</span>
              <span className="text-[#FFD166] text-xs">✦</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          ) : (
            <button
              onClick={onGenerate}
              disabled={isGenerating}
              className="group relative flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3366] via-[#B5179E] to-[#7B2CBF] hover:from-[#FF4D7D] hover:to-[#9D4EDD] shadow-[0_6px_25px_rgba(255,51,102,0.45)] hover:shadow-[0_8px_30px_rgba(181,23,158,0.55)] transition-all duration-200 active:scale-95 cursor-pointer overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {/* Subtle shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-[#FFD166]" />
                  <span className="tracking-wide">Đang Phối Đồ Thông Minh...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#FFD166] group-hover:rotate-12 transition-transform duration-300" />
                  <span className="tracking-wide">Tạo Bản Phối & Xem Trong Studio</span>
                  <span className="text-[#FFD166] text-xs">✦</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
