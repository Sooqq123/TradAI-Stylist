/**
 * CanvasControls Component - Thanh Công Cụ Nổi Trên Sân Khấu Canvas
 * Reset, Zoom/Detail Inspect, Quick Snapshot, and Compare Slider Toggle.
 */

import React from 'react';
import {
  Camera,
  Maximize2,
  MoveHorizontal,
  RotateCcw,
  Sparkles,
  ZoomIn,
} from 'lucide-react';

interface CanvasControlsProps {
  onReset: () => void;
  onToggleCompare: () => void;
  isCompareOpen: boolean;
  onToggleZoom: () => void;
  isZoomed: boolean;
  onSnapshot: () => void;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  onReset,
  onToggleCompare,
  isCompareOpen,
  onToggleZoom,
  isZoomed,
  onSnapshot,
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FFFFFF]/85 dark:bg-[#1A1A1E]/85 backdrop-blur-md border border-[#E5E5E2] dark:border-[#27272A] shadow-md transition-all">
      {/* Compare Slider Toggle Button */}
      <button
        onClick={onToggleCompare}
        title={isCompareOpen ? 'Tắt đối chiếu' : 'Bật chế độ đối chiếu Nguyên bản vs Remix'}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          isCompareOpen
            ? 'bg-[#9E2A2B] dark:bg-[#E05A47] text-white shadow-sm'
            : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] hover:bg-[#F8F8F7] dark:hover:bg-[#27272A]'
        }`}
      >
        <MoveHorizontal className="w-3.5 h-3.5 stroke-[2.5]" />
        <span className="hidden sm:inline">Đối Chiếu</span>
      </button>

      {/* Zoom / Inspect Detail Button */}
      <button
        onClick={onToggleZoom}
        title={isZoomed ? 'Thu nhỏ canvas' : 'Phóng to chi tiết phom áo'}
        className={`p-2 rounded-xl text-xs font-bold transition-all ${
          isZoomed
            ? 'bg-[#9E2A2B] dark:bg-[#E05A47] text-white shadow-sm'
            : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] hover:bg-[#F8F8F7] dark:hover:bg-[#27272A]'
        }`}
      >
        <ZoomIn className="w-4 h-4 stroke-[2]" />
      </button>

      {/* Quick Snapshot / Save Look Button */}
      <button
        onClick={onSnapshot}
        title="Chụp ảnh nhanh bản phối để lưu hoặc chia sẻ"
        className="p-2 rounded-xl text-xs font-bold text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] hover:bg-[#F8F8F7] dark:hover:bg-[#27272A] transition-all"
      >
        <Camera className="w-4 h-4 stroke-[2]" />
      </button>

      {/* Reset to Default Button */}
      <button
        onClick={onReset}
        title="Đặt lại bản phối về mặc định"
        className="p-2 rounded-xl text-xs font-bold text-[#52525B] dark:text-[#A1A1AA] hover:text-red-500 hover:bg-[#F8F8F7] dark:hover:bg-[#27272A] transition-all"
      >
        <RotateCcw className="w-4 h-4 stroke-[2]" />
      </button>
    </div>
  );
};
