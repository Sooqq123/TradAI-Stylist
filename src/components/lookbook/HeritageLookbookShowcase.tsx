/**
 * HeritageLookbookShowcase Component - Bộ Sưu Tập Lookbook 2.5D Di Sản Đỉnh Cao
 * Multi-Character Fashion Lineup Sheet & Solo Inspection Stage matching 100% reference benchmark.
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Columns,
  Compass,
  Download,
  Eye,
  Grid,
  Maximize2,
  Minimize2,
  Palette,
  RotateCcw,
  Share2,
  Shirt,
  Sparkles,
  Tag,
  Zap,
} from 'lucide-react';
import {
  BENCHMARK_CATALOG,
  BenchmarkCharacterArt,
  BenchmarkOutfitId,
  BenchmarkOutfitMeta,
} from './BenchmarkCharacterArt';
import { useOutfitStore } from '../../store/useOutfitStore';
import { ALL_FASHION_ITEMS, MOCK_GARMENTS, MOCK_BOTTOMS, MOCK_FOOTWEAR, MOCK_ACCESSORIES } from '../../data/mockData';

interface HeritageLookbookShowcaseProps {
  onEquipOutfitSuccess?: (outfitName: string) => void;
  className?: string;
}

export const HeritageLookbookShowcase: React.FC<HeritageLookbookShowcaseProps> = ({
  onEquipOutfitSuccess,
  className = '',
}) => {
  const {
    currentOutfit,
    setOutfit,
    setViewMode,
  } = useOutfitStore();

  const [selectedOutfitId, setSelectedOutfitId] = useState<BenchmarkOutfitId>(1);
  const [activeFilter, setActiveFilter] = useState<'all' | 'traditional' | 'remix'>('all');
  const [displayMode, setDisplayMode] = useState<'lineup' | 'solo'>('lineup');

  const selectedOutfit =
    BENCHMARK_CATALOG.find((o) => o.id === selectedOutfitId) || BENCHMARK_CATALOG[0];

  const filteredCatalog = BENCHMARK_CATALOG.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.theme === activeFilter;
  });

  // Equip this benchmark outfit into the user's Studio Canvas
  const handleEquipToStudio = (outfit: BenchmarkOutfitMeta) => {
    let garmentItem = ALL_FASHION_ITEMS.find((it) => it.id === 'garment_aodai_01') || MOCK_GARMENTS[0];
    if (outfit.id === 1 || outfit.id === 2) {
      garmentItem = { ...(ALL_FASHION_ITEMS.find((it) => it.id === 'garment_aodai_01') || MOCK_GARMENTS[0]), colorHex: '#C53030' };
    } else if (outfit.id === 3) {
      garmentItem = { ...(ALL_FASHION_ITEMS.find((it) => it.id === 'garment_nguthan_01') || MOCK_GARMENTS[1]), colorHex: '#2B4162' };
    } else if (outfit.id === 4) {
      garmentItem = { ...(ALL_FASHION_ITEMS.find((it) => it.id === 'garment_nguthan_01') || MOCK_GARMENTS[1]), colorHex: '#D4AF37' };
    } else if (outfit.id === 5) {
      garmentItem = { ...(ALL_FASHION_ITEMS.find((it) => it.id === 'garment_baba_01') || MOCK_GARMENTS[2]), colorHex: '#83C5BE' };
    } else if (outfit.id === 6) {
      garmentItem = { ...(ALL_FASHION_ITEMS.find((it) => it.id === 'garment_baba_01') || MOCK_GARMENTS[2]), colorHex: '#EE9B00' };
    }

    let bottomItem = ALL_FASHION_ITEMS.find((it) => it.id === 'bottom_silk_01') || MOCK_BOTTOMS[0];
    if (outfit.id === 2 || outfit.id === 4 || outfit.id === 6) {
      bottomItem = ALL_FASHION_ITEMS.find((it) => it.id === 'bottom_jeans_01') || MOCK_BOTTOMS[1];
    }

    let footItem = MOCK_FOOTWEAR[0];
    if (outfit.id === 2 || outfit.id === 6) {
      footItem = ALL_FASHION_ITEMS.find((it) => it.id === 'foot_sneaker_white') || MOCK_FOOTWEAR[1];
    } else if (outfit.id === 4) {
      footItem = ALL_FASHION_ITEMS.find((it) => it.id === 'foot_loafer_01') || MOCK_FOOTWEAR[2];
    }

    let headItem: any = undefined;
    if (outfit.id === 1 || outfit.id === 3) {
      headItem = ALL_FASHION_ITEMS.find((it) => it.id === 'head_khan_van_nu') || MOCK_ACCESSORIES[0];
    }

    const accList: any[] = [];
    if (outfit.id === 2 || outfit.id === 6) {
      const glasses = ALL_FASHION_ITEMS.find((it) => it.id === 'acc_kinhram_y2k');
      if (glasses) accList.push(glasses);
    } else if (outfit.id === 3 || outfit.id === 4) {
      const fan = ALL_FASHION_ITEMS.find((it) => it.id === 'acc_quat_tram');
      if (fan) accList.push(fan);
    }

    setOutfit({
      ...currentOutfit,
      id: `benchmark_outfit_${outfit.id}_${Date.now()}`,
      name: outfit.name,
      garment: garmentItem,
      bottom: bottomItem,
      footwear: footItem,
      headwear: headItem,
      accessories: accList,
      colorHex: outfit.primaryColor,
      style: outfit.theme === 'traditional' ? 'vintage' : 'y2k',
      occasion: outfit.theme === 'traditional' ? 'chup_anh_tet' : 'du_xuan',
    });

    if (onEquipOutfitSuccess) {
      onEquipOutfitSuccess(outfit.name);
    }
    setViewMode('studio');
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 ${className}`}>
      {/* Top Header & Lookbook Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-[#E63946]/15 text-[#FF3366] border border-[#FF3366]/30 font-bold">
              ✦ DIGITAL HERITAGE LOOKBOOK
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Manhwa 2.5D Art • Chuẩn Tỷ Lệ 8 Đầu
            </span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Lookbook Di Sản & Remix Cổ Phục
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Bộ sưu tập 6 tạo hình nhân vật toàn thân đồng bộ 100% phong cách nét vẽ, ánh sáng và bối cảnh Dark Burgundy từ chuẩn mực nghệ thuật tham chiếu.
          </p>
        </div>

        {/* View Controls & Tab Switches */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Pills */}
          <div className="bg-slate-200/80 dark:bg-white/5 p-1 rounded-xl border border-slate-300 dark:border-white/10 flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-[#1D1926] text-[#E63946] dark:text-[#FF3366] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tất cả ({BENCHMARK_CATALOG.length})
            </button>
            <button
              onClick={() => setActiveFilter('traditional')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === 'traditional'
                  ? 'bg-white dark:bg-[#1D1926] text-[#E63946] dark:text-[#FF3366] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Truyền Thống
            </button>
            <button
              onClick={() => setActiveFilter('remix')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === 'remix'
                  ? 'bg-white dark:bg-[#1D1926] text-[#E63946] dark:text-[#FF3366] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Remix Đương Đại
            </button>
          </div>

          {/* Mode Switch: Lineup vs Solo */}
          <div className="bg-slate-200/80 dark:bg-white/5 p-1 rounded-xl border border-slate-300 dark:border-white/10 flex items-center gap-1">
            <button
              onClick={() => setDisplayMode('lineup')}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                displayMode === 'lineup'
                  ? 'bg-white dark:bg-[#1D1926] text-[#E63946] dark:text-[#FF3366] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Xem Sàn Diễn Đa Bản Phối (Lineup Sheet)"
            >
              <Columns className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDisplayMode('solo')}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                displayMode === 'solo'
                  ? 'bg-white dark:bg-[#1D1926] text-[#E63946] dark:text-[#FF3366] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Soi Chi Tiết Đơn Lẻ (Solo Inspection)"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODE 1: MULTI-CHARACTER LINEUP SHEET (SÀN DIỄN ĐA BẢN PHỐI)
          ========================================================================= */}
      {displayMode === 'lineup' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCatalog.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedOutfitId(item.id);
                setDisplayMode('solo');
              }}
              className="group relative rounded-3xl overflow-hidden bg-[#140C16] border border-white/10 hover:border-[#FF3366]/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF3366]/20 cursor-pointer flex flex-col"
            >
              {/* Top Tag & Theme Badge */}
              <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {item.categoryName}
                </span>
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider text-black shadow-xs"
                  style={{ backgroundColor: item.primaryColor }}
                >
                  {item.theme === 'traditional' ? 'Cổ Truyền' : 'Gen Z Remix'}
                </span>
              </div>

              {/* 9:16 Character View Canvas */}
              <div className="w-full aspect-[9/16] relative overflow-hidden bg-[#1B0B13]">
                <BenchmarkCharacterArt
                  outfitId={item.id}
                  className="w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Subtle Hover Action Pill */}
                <div className="absolute bottom-4 inset-x-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-md text-xs font-bold text-slate-900 dark:text-white shadow-lg flex items-center gap-1.5 border border-white/20">
                    <Eye className="w-3.5 h-3.5 text-[#FF3366]" />
                    <span>Xem chi tiết & Mặc thử</span>
                  </span>
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="p-4 bg-gradient-to-b from-[#1E1120] to-[#120814] border-t border-white/10 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-editorial text-base font-bold text-white group-hover:text-[#FFD166] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 truncate font-mono">
                    ✦ {item.colorName}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEquipToStudio(item);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF3366] to-[#E63946] hover:brightness-110 text-white text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Shirt className="w-3.5 h-3.5" />
                    <span>Mặc thử</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          MODE 2: SOLO HIGH-RESOLUTION INSPECTION STAGE (SOI CHI TIẾT ĐƠN LẺ)
          ========================================================================= */}
      {displayMode === 'solo' && (
        <div className="bg-[#120A16] rounded-3xl border border-white/15 p-4 sm:p-8 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Full-Height Benchmark Canvas Portrait */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 relative group bg-[#1B0B13]">
              <BenchmarkCharacterArt outfitId={selectedOutfit.id} className="w-full h-full" />
              {/* Corner Watermark */}
              <div className="absolute top-4 left-4 z-20 text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                BENCHMARK #0{selectedOutfit.id}
              </div>
            </div>
          </div>

          {/* Right Column: Garment Breakdown, Cultural Lore & Direct Studio Actions */}
          <div className="lg:col-span-6 text-white flex flex-col justify-between h-full space-y-6">
            <div>
              {/* Back to Lineup Button & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setDisplayMode('lineup')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Quay lại Sàn diễn đa mẫu</span>
                </button>

                <span
                  className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-black font-mono"
                  style={{ backgroundColor: selectedOutfit.primaryColor }}
                >
                  {selectedOutfit.theme === 'traditional' ? 'Di Sản Cổ Điển' : 'Remix Đương Đại'}
                </span>
              </div>

              {/* Title & Color Scheme */}
              <h3 className="font-editorial text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {selectedOutfit.name}
              </h3>
              <p className="text-xs text-[#FFD166] font-semibold mt-1 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                <span>Sắc độ chủ đạo: {selectedOutfit.colorName}</span>
              </p>

              {/* Detailed Narrative */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mt-4">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedOutfit.description}
                </p>
              </div>

              {/* Comprehensive Breakdown Slots */}
              <div className="mt-5 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Shirt className="w-3.5 h-3.5 text-[#FF3366]" />
                  <span>Cấu thành trang phục (Deconstructed Items)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Áo Chính (Top)</span>
                    <span className="font-medium text-slate-100">{selectedOutfit.itemsSummary.top}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Quần / Dưới (Bottom)</span>
                    <span className="font-medium text-slate-100">{selectedOutfit.itemsSummary.bottom}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Giày dép (Footwear)</span>
                    <span className="font-medium text-slate-100">{selectedOutfit.itemsSummary.footwear}</span>
                  </div>
                  {selectedOutfit.itemsSummary.headwear && (
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Đầu & Mũ (Headwear)</span>
                      <span className="font-medium text-slate-100">{selectedOutfit.itemsSummary.headwear}</span>
                    </div>
                  )}
                  {selectedOutfit.itemsSummary.accessory && (
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 sm:col-span-2">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Phụ kiện cầm tay (Accessory)</span>
                      <span className="font-medium text-slate-100">{selectedOutfit.itemsSummary.accessory}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions: 1-Click Try On Studio Canvas & Prev/Next Switches */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Prev / Next Pagination */}
              <div className="flex items-center gap-1.5 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedOutfitId((prev) => (prev > 1 ? ((prev - 1) as BenchmarkOutfitId) : 6))
                  }
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Bản phối trước"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono px-2 text-slate-400">
                  {selectedOutfit.id} / 6
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedOutfitId((prev) => (prev < 6 ? ((prev + 1) as BenchmarkOutfitId) : 1))
                  }
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Bản phối tiếp theo"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Main Call to Action: Equip to Studio */}
              <button
                type="button"
                onClick={() => handleEquipToStudio(selectedOutfit)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF3366] via-[#E63946] to-[#B5179E] hover:brightness-110 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF3366]/30 active:scale-95 transition-all cursor-pointer ring-2 ring-white/20"
              >
                <Shirt className="w-4 h-4" />
                <span>✦ Mặc thử bản phối này trên Studio Canvas</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
