/**
 * ActiveLayerPills Component - Khay Tháo Phụ Kiện Nhanh (Active Layers Tray)
 * Displays all active items on the outfit with instant detach [X] buttons.
 */

import React from 'react';
import { Layers, Sparkles, X } from 'lucide-react';
import { useOutfitStore } from '../../store/useOutfitStore';

export const ActiveLayerPills: React.FC = () => {
  const {
    currentOutfit,
    setBottom,
    setFootwear,
    setHeadwear,
    removeAccessory,
  } = useOutfitStore();

  const totalLayers =
    1 + // garment
    (currentOutfit.bottom ? 1 : 0) +
    (currentOutfit.footwear ? 1 : 0) +
    (currentOutfit.headwear ? 1 : 0) +
    (currentOutfit.accessories?.length || 0);

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-3 sm:p-4 shadow-sm transition-colors">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#18181B] dark:text-[#FAFAFA]">
          <Layers className="w-4 h-4 text-[#9E2A2B] dark:text-[#E05A47]" />
          <span>Lớp Đang Mặc ({totalLayers} món)</span>
        </div>
        <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
          Gỡ nhanh phụ kiện không cần chuyển tab
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {/* Garment (Permanent base layer) */}
        {currentOutfit.garment && (
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F8F8F7] dark:bg-[#121214] text-[#18181B] dark:text-[#FAFAFA] px-2.5 py-1 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] font-semibold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A2B] dark:bg-[#E05A47]" />
            <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase">Áo:</span>
            <span className="truncate max-w-[130px]">{currentOutfit.garment.name}</span>
          </span>
        )}

        {/* Bottom */}
        {currentOutfit.bottom && (
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F8F8F7] dark:bg-[#121214] text-[#18181B] dark:text-[#FAFAFA] pl-2.5 pr-1.5 py-1 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] font-semibold group shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase">Quần:</span>
            <span className="truncate max-w-[130px]">{currentOutfit.bottom.name}</span>
            <button
              onClick={() => setBottom(undefined)}
              title="Gỡ quần/váy"
              className="p-1 rounded-lg text-[#71717A] hover:text-white hover:bg-red-500 transition-colors ml-0.5"
            >
              <X className="w-3 h-3 stroke-[3]" />
            </button>
          </span>
        )}

        {/* Footwear */}
        {currentOutfit.footwear && (
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F8F8F7] dark:bg-[#121214] text-[#18181B] dark:text-[#FAFAFA] pl-2.5 pr-1.5 py-1 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] font-semibold group shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase">Giày:</span>
            <span className="truncate max-w-[130px]">{currentOutfit.footwear.name}</span>
            <button
              onClick={() => setFootwear(undefined)}
              title="Gỡ giày dép"
              className="p-1 rounded-lg text-[#71717A] hover:text-white hover:bg-red-500 transition-colors ml-0.5"
            >
              <X className="w-3 h-3 stroke-[3]" />
            </button>
          </span>
        )}

        {/* Headwear */}
        {currentOutfit.headwear && (
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F8F8F7] dark:bg-[#121214] text-[#18181B] dark:text-[#FAFAFA] pl-2.5 pr-1.5 py-1 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] font-semibold group shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase">Mũ/Vấn:</span>
            <span className="truncate max-w-[130px]">{currentOutfit.headwear.name}</span>
            <button
              onClick={() => setHeadwear(undefined)}
              title="Gỡ mũ/khăn vấn"
              className="p-1 rounded-lg text-[#71717A] hover:text-white hover:bg-red-500 transition-colors ml-0.5"
            >
              <X className="w-3 h-3 stroke-[3]" />
            </button>
          </span>
        )}

        {/* Accessories */}
        {currentOutfit.accessories &&
          currentOutfit.accessories.map((acc) => (
            <span
              key={acc.id}
              className="inline-flex items-center gap-1.5 text-xs bg-[#F8F8F7] dark:bg-[#121214] text-[#18181B] dark:text-[#FAFAFA] pl-2.5 pr-1.5 py-1 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] font-semibold group shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="truncate max-w-[120px]">{acc.name}</span>
              <button
                onClick={() => removeAccessory(acc.id)}
                title="Gỡ phụ kiện này"
                className="p-1 rounded-lg text-[#71717A] hover:text-white hover:bg-red-500 transition-colors ml-0.5"
              >
                <X className="w-3 h-3 stroke-[3]" />
              </button>
            </span>
          ))}

        {totalLayers === 1 && (
          <span className="text-xs text-[#71717A] dark:text-[#A1A1AA] italic">
            Chưa có phụ kiện hay quần phối thêm. Chọn bên dưới để thử!
          </span>
        )}
      </div>
    </div>
  );
};
