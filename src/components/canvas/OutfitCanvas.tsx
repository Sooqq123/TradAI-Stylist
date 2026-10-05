/**
 * OutfitCanvas Component - Sân Khấu Trực Quan Hóa Trang Phục 2D Vector
 * Displays the full-body animated 2D vector character with layered SVG clothing,
 * dynamic color fill, responsive framing without clipping, and required studio note.
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  Bookmark,
  Compass,
  Eye,
  Info,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';
import { useOutfitStore } from '../../store/useOutfitStore';
import { FashionItem } from '../../types';
import { OutfitRenderer } from '../avatar/OutfitRenderer';
import { CanvasControls } from './CanvasControls';
import { CompareSlider } from './CompareSlider';

export const OutfitCanvas: React.FC = () => {
  const {
    currentOutfit,
    resetOutfit,
    saveCurrentOutfit,
    validationResult,
  } = useOutfitStore();

  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<FashionItem | null>(null);
  const [snapshotPreview, setSnapshotPreview] = useState<boolean>(false);
  const [snapshotFlash, setSnapshotFlash] = useState<boolean>(false);

  const dominantColor = currentOutfit.colorHex || '#C53030';
  const balance = currentOutfit.culturalBalance ?? 75;

  let styleTag = 'Cân bằng phong cách';
  if (balance >= 80) {
    styleTag = 'Thiên về truyền thống';
  } else if (balance <= 60) {
    styleTag = 'Thiên về hiện đại';
  }

  const handleSnapshot = () => {
    setSnapshotFlash(true);
    setTimeout(() => setSnapshotFlash(false), 250);
    setSnapshotPreview(true);
  };

  return (
    <div className="relative w-full flex flex-col gap-2">
      {/* Compare Slider Modal or Embedded Stage */}
      {isCompareOpen ? (
        <CompareSlider
          currentOutfit={currentOutfit}
          onClose={() => setIsCompareOpen(false)}
        />
      ) : (
        /* MAIN CANVAS STAGE */
        <div
          className={`relative w-full rounded-2xl overflow-hidden border border-[#E5E5E2] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#1A1A1E] shadow-lg transition-all duration-300 ${
            isZoomed ? 'aspect-[3/5] sm:aspect-[9/16]' : 'aspect-[3/4]'
          }`}
        >
          {/* Subtle Ambient Color Lighting */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25 blur-3xl transition-all duration-700 -z-0"
            style={{
              background: `radial-gradient(circle at 50% 35%, ${dominantColor} 0%, transparent 70%)`,
            }}
          />

          {/* Minimalist Dark Moody Backdrop with Faint Cyber-Retro & Traditional Line Art */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 dark:opacity-20 -z-0">
            <svg viewBox="0 0 400 400" className="w-[88%] h-[88%] text-slate-800 dark:text-amber-200/50 stroke-current" fill="none">
              {/* Outer Trống Đồng / Solar Ring */}
              <circle cx="200" cy="200" r="180" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="200" cy="200" r="160" strokeWidth="0.8" />
              <circle cx="200" cy="200" r="120" strokeWidth="0.8" strokeDasharray="2 4" />
              <circle cx="200" cy="200" r="70" strokeWidth="0.8" />
              {/* Central Star / Sun Rays */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x1 = 200 + 20 * Math.cos(angle);
                const y1 = 200 + 20 * Math.sin(angle);
                const x2 = 200 + 65 * Math.cos(angle);
                const y2 = 200 + 65 * Math.sin(angle);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" />;
              })}
              {/* Geometric Cyber Lines */}
              <line x1="20" y1="200" x2="380" y2="200" strokeWidth="0.6" strokeDasharray="6 8" />
              <line x1="200" y1="20" x2="200" y2="380" strokeWidth="0.6" strokeDasharray="6 8" />
            </svg>
          </div>

          {/* Paper Texture Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Camera Snapshot Flash Overlay */}
          {snapshotFlash && (
            <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-250 pointer-events-none" />
          )}

          {/* Floating Controls Bar at Top Right */}
          <div className="absolute top-3 right-3 z-30">
            <CanvasControls
              onReset={resetOutfit}
              onToggleCompare={() => setIsCompareOpen((prev) => !prev)}
              isCompareOpen={isCompareOpen}
              onToggleZoom={() => setIsZoomed((prev) => !prev)}
              isZoomed={isZoomed}
              onSnapshot={handleSnapshot}
            />
          </div>

          {/* Top Left: Style Alignment Indicator */}
          <div className="absolute top-3 left-3 z-30 flex items-center gap-2 flex-wrap max-w-[calc(100%-140px)]">
            {/* Style Alignment Tag */}
            <div className="hidden sm:flex px-3 py-1.5 rounded-xl bg-[#FFFFFF]/85 dark:bg-[#1A1A1E]/85 backdrop-blur-md border border-[#E5E5E2] dark:border-[#27272A] shadow-sm items-center gap-1.5 text-xs font-bold">
              <Compass className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E05A47]" />
              <span className="text-[#18181B] dark:text-[#FAFAFA]">
                {styleTag}
              </span>
            </div>

            <button
              onClick={() => setShowHotspots((prev) => !prev)}
              title="Bật/Tắt nhãn món đồ"
              className={`p-1.5 rounded-xl backdrop-blur-md border text-xs font-bold transition-all ${
                showHotspots
                  ? 'bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 text-[#9E2A2B] dark:text-[#E05A47] border-[#9E2A2B]/30 dark:border-[#E05A47]/30'
                  : 'bg-[#FFFFFF]/85 dark:bg-[#1A1A1E]/85 text-[#71717A] dark:text-[#A1A1AA] border-[#E5E5E2] dark:border-[#27272A]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ================= VECTOR 2D CHARACTER STAGE ================= */}
          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-5 z-10 select-none">
            <div className="relative w-full max-w-[340px] h-full flex items-center justify-center">
              <OutfitRenderer
                outfit={currentOutfit}
                isZoomed={isZoomed}
                className="w-full h-full max-h-[96%]"
              />

              {/* Hotspot Pins on Avatar */}
              {showHotspots && (
                <>
                  {/* Pin 1: Áo chính */}
                  {currentOutfit.garment && (
                    <div
                      onClick={() => setActiveHotspot(currentOutfit.garment)}
                      className="absolute top-[35%] left-[16%] z-30 cursor-pointer hover:scale-110 transition-transform"
                      title={currentOutfit.garment.name}
                    >
                      <span className="flex h-5 w-5 relative items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9E2A2B] opacity-50" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#9E2A2B] dark:bg-[#E05A47] text-white text-[9px] font-bold items-center justify-center shadow-md">
                          1
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Pin 2: Quần */}
                  {currentOutfit.bottom && (
                    <div
                      onClick={() => setActiveHotspot(currentOutfit.bottom!)}
                      className="absolute bottom-[28%] right-[16%] z-30 cursor-pointer hover:scale-110 transition-transform"
                      title={currentOutfit.bottom.name}
                    >
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 text-white text-[9px] font-bold items-center justify-center shadow-md">
                        2
                      </span>
                    </div>
                  )}

                  {/* Pin 3: Giày */}
                  {currentOutfit.footwear && (
                    <div
                      onClick={() => setActiveHotspot(currentOutfit.footwear!)}
                      className="absolute bottom-[5%] left-[22%] z-30 cursor-pointer hover:scale-110 transition-transform"
                      title={currentOutfit.footwear.name}
                    >
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 text-white text-[9px] font-bold items-center justify-center shadow-md">
                        3
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Bottom Bar: Outfit Name & Material */}
          <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between text-xs pointer-events-none">
            <div className="bg-[#FFFFFF]/90 dark:bg-[#1A1A1E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] shadow-sm pointer-events-auto">
              <span className="font-editorial font-bold text-[#18181B] dark:text-[#FAFAFA]">
                {currentOutfit.name}
              </span>
            </div>

            <div className="bg-[#FFFFFF]/90 dark:bg-[#1A1A1E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] shadow-sm font-semibold text-[#52525B] dark:text-[#D4D4D8] pointer-events-auto">
              {currentOutfit.garment?.material || 'Lụa tơ tằm'}
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Studio Note (Yêu cầu thiết kế) */}
      <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] text-center italic">
        Minh họa phối đồ 2D — phom và độ vừa thực tế có thể khác.
      </p>

      {/* HOTSPOT DETAIL MODAL POPUP */}
      {activeHotspot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] text-[#18181B] dark:text-[#FAFAFA] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] max-w-sm w-full p-5 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveHotspot(null)}
              className="absolute top-4 right-4 text-[#71717A] hover:text-[#18181B] dark:hover:text-[#FAFAFA] p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Item 2D Vector Preview */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F8F8F7] dark:bg-[#121214] mb-3 border border-[#E5E5E2] dark:border-[#27272A] flex items-center justify-center p-4">
              <OutfitRenderer item={activeHotspot} mode="item" className="w-full h-full max-h-36" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E2A2B] dark:text-[#E05A47]">
              {activeHotspot.category} •{' '}
              {activeHotspot.eraOrigin === 'traditional' ? 'Truyền Thống' : 'Hiện Đại'}
            </span>

            <h4 className="font-editorial text-base font-bold mb-1">
              {activeHotspot.name}
            </h4>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed mb-3">
              {activeHotspot.description}
            </p>

            {activeHotspot.material && (
              <p className="text-[11px] text-[#52525B] dark:text-[#D4D4D8] mb-3">
                <span className="font-semibold">Chất liệu:</span> {activeHotspot.material}
              </p>
            )}

            <button
              onClick={() => setActiveHotspot(null)}
              className="w-full py-2 bg-[#F8F8F7] dark:bg-[#121214] hover:bg-[#9E2A2B] hover:text-white dark:hover:bg-[#E05A47] dark:hover:text-white rounded-xl text-xs font-bold transition-colors border border-[#E5E5E2] dark:border-[#27272A]"
            >
              Đóng chi tiết
            </button>
          </div>
        </div>
      )}

      {/* QUICK SNAPSHOT PREVIEW MODAL */}
      {snapshotPreview && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] text-[#18181B] dark:text-[#FAFAFA] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] max-w-sm w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 text-center">
            <button
              onClick={() => setSnapshotPreview(false)}
              className="absolute top-4 right-4 text-[#71717A] hover:text-[#18181B] dark:hover:text-[#FAFAFA] p-1.5 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E2A2B] dark:text-[#E05A47]">
              SNAPSHOT MINH HỌA 2D
            </span>
            <h3 className="font-editorial text-lg font-bold mt-0.5 mb-3">
              {currentOutfit.name}
            </h3>

            {/* Dressed Avatar Card */}
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#F8F8F7] dark:bg-[#121214] mb-3 border border-[#E5E5E2] dark:border-[#27272A] p-3 flex items-center justify-center">
              <OutfitRenderer outfit={currentOutfit} className="w-full h-full" />
            </div>

            {/* Cultural Advisory Banner in snapshot preview */}
            {!validationResult.isValid && (
              <div className="mb-3 p-3 bg-amber-500/10 dark:bg-amber-950/25 border border-amber-500/35 rounded-xl text-left flex items-start gap-2.5 animate-in fade-in duration-200">
                <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                    Lưu ý cân bằng văn hóa
                  </p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-200 leading-relaxed">
                    {validationResult.violations[0]?.reason ||
                      'Bản phối có yếu tố cần lưu tâm. Bạn có thể bấm "Áp dụng gợi ý thanh lịch" hoặc bật "Chế độ Phá cách" ở khung Cố vấn.'}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                disabled={!validationResult.isValid}
                onClick={() => {
                  if (!validationResult.isValid) return;
                  saveCurrentOutfit();
                  setSnapshotPreview(false);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                  validationResult.isValid
                    ? 'bg-[#9E2A2B] dark:bg-[#E05A47] text-white hover:brightness-110 cursor-pointer'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed border border-zinc-300 dark:border-zinc-700'
                }`}
                title={!validationResult.isValid ? 'Xem gợi ý ở khung Cố Vấn Văn Hóa trước khi lưu' : 'Lưu bản phối'}
              >
                <Bookmark className="w-4 h-4" />
                {validationResult.isValid ? 'Lưu Vào Tủ Đồ' : 'Xem Cố Vấn Để Lưu'}
              </button>
              <button
                onClick={() => setSnapshotPreview(false)}
                className="px-4 py-2.5 bg-[#F8F8F7] dark:bg-[#121214] text-[#18181B] dark:text-[#FAFAFA] hover:bg-[#E5E5E2] dark:hover:bg-[#27272A] rounded-xl text-xs font-bold border border-[#E5E5E2] dark:border-[#27272A] transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
