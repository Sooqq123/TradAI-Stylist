/**
 * CompareSlider Component - Thanh Trượt Đối Chiếu "Nguyên Bản vs Gen Z Remix"
 * Interactive before/after split slider allowing tactile dragging to compare heritage vs remix styling.
 * Uses identical 2D vector character avatar, pose, and scale on both sides.
 */

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Compass,
  MoveHorizontal,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { MOCK_ACCESSORIES, MOCK_BOTTOMS, MOCK_FOOTWEAR, MOCK_GARMENTS } from '../../data/mockData';
import { Outfit } from '../../types';
import { OutfitRenderer } from '../avatar/OutfitRenderer';

interface CompareSliderProps {
  currentOutfit: Outfit;
  onClose?: () => void;
}

export const CompareSlider: React.FC<CompareSliderProps> = ({ currentOutfit, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100%
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Track exact container width to keep 1:1 scale on both sides
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateWidth();
      });
      resizeObserver.observe(el);
    }

    window.addEventListener('resize', updateWidth);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // Traditional baseline outfit based on current garment type
  const traditionalBaseline = React.useMemo<Outfit>(() => {
    const gType = currentOutfit.garment?.garmentType || 'ao_dai';
    let baseGarment = MOCK_GARMENTS[0]; // Áo dài đỏ
    let baseBottom = MOCK_BOTTOMS[0]; // Quần lụa trắng
    let baseFootwear = MOCK_FOOTWEAR[0]; // Guốc mộc
    let baseHeadwear = MOCK_ACCESSORIES[0]; // Khăn vấn

    if (gType === 'ngu_than') {
      baseGarment = MOCK_GARMENTS[1]; // Ngũ thân lam chàm
      baseBottom = MOCK_BOTTOMS[1]; // Quần lụa đen
      baseFootwear = MOCK_FOOTWEAR[2]; // Loafer / guốc
      baseHeadwear = MOCK_ACCESSORIES[0]; // Khăn vấn
    } else if (gType === 'ba_ba') {
      baseGarment = MOCK_GARMENTS[2]; // Áo bà ba xanh
      baseBottom = MOCK_BOTTOMS[0]; // Quần lụa trắng
      baseFootwear = MOCK_FOOTWEAR[0]; // Guốc mộc
      baseHeadwear = MOCK_ACCESSORIES[1]; // Nón lá
    }

    return {
      id: 'traditional_baseline',
      name: `${baseGarment.name} (Nguyên Bản)`,
      garment: baseGarment,
      bottom: baseBottom,
      footwear: baseFootwear,
      headwear: baseHeadwear,
      accessories: [MOCK_ACCESSORIES[3]], // Quạt xếp
      colorHex: baseGarment.colorHex,
      occasion: 'le_chua',
      style: 'vintage',
      culturalBalance: 98,
      tags: ['Nguyên Bản', 'Truyền Thống'],
    };
  }, [currentOutfit.garment?.garmentType]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handlePointerUp]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5E5E2] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#1A1A1E] shadow-xl p-4 sm:p-5 flex flex-col gap-3">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <MoveHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-editorial text-sm sm:text-base font-bold text-[#18181B] dark:text-[#FAFAFA]">
              Đối Chiếu Trực Quan: Nguyên Bản vs Hiện Đại
            </h4>
            <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
              Kéo thanh trượt ngang để so sánh phom dáng cổ điển và bản phối cách tân trên cùng nhân vật.
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#71717A] hover:text-[#18181B] dark:hover:text-[#FAFAFA] hover:bg-[#F8F8F7] dark:hover:bg-[#27272A]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Slider Canvas Stage */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        className="relative w-full aspect-[3/4] sm:aspect-[4/3] rounded-xl overflow-hidden select-none cursor-ew-resize bg-[#F8F8F7] dark:bg-[#121214] border border-[#E5E5E2] dark:border-[#27272A]"
      >
        {/* RIGHT SIDE: Current Gen Z Remix Outfit (Full Background) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2">
          <div className="w-full h-full max-w-[340px]">
            <OutfitRenderer outfit={currentOutfit} />
          </div>

          {/* Top Tag Right */}
          <div className="absolute top-3 right-3 bg-purple-950/80 backdrop-blur-md border border-purple-500/40 text-purple-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Đang Phối</span>
          </div>
        </div>

        {/* LEFT SIDE: Traditional Baseline (Clipped Overlay) */}
        <div
          className="absolute inset-0 h-full overflow-hidden p-2 bg-[#F1EFEA] dark:bg-[#161619]"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="absolute inset-0 h-full flex items-center justify-center p-2"
            style={{ width: containerWidth > 0 ? `${containerWidth}px` : '100%' }}
          >
            <div className="w-full h-full max-w-[340px]">
              <OutfitRenderer outfit={traditionalBaseline} />
            </div>
          </div>

          {/* Top Tag Left */}
          <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Nguyên Bản</span>
          </div>
        </div>

        {/* DIVIDER HANDLE */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-2xl pointer-events-none transition-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Centered Draggable Badge */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#18181B] text-white border-2 border-white rounded-full p-2 shadow-2xl flex items-center justify-center">
            <MoveHorizontal className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-[#71717A] dark:text-[#A1A1AA] pt-1">
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
          ◀ Kéo sang trái: Ngắm phom dáng Cổ Điển
        </span>
        <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold">
          Kéo sang phải: Khám phá bản phối Hiện Đại ▶
        </span>
      </div>
    </div>
  );
};
