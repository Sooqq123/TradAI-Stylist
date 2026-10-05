/**
 * WardrobePanel Component - Bảng Điều Khiển Tủ Đồ Thời Trang (Outfit Studio Customizer)
 * Category tabs, realtime search, active layer detach tray, color swatches, and item grid.
 */

import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Filter,
  Palette,
  Search,
  Shirt,
  Sparkles,
  X,
} from 'lucide-react';
import { ALL_FASHION_ITEMS, CULTURAL_INSIGHTS } from '../../data/mockData';
import { useOutfitStore } from '../../store/useOutfitStore';
import { EraOrigin, FashionItem } from '../../types';
import { ActiveLayerPills } from './ActiveLayerPills';
import { ColorPalettePicker } from './ColorPalettePicker';
import { ItemGrid } from './ItemGrid';

type WardrobeTab = 'garment' | 'bottom' | 'footwear' | 'accessories' | 'color';

interface TabItem {
  id: WardrobeTab;
  label: string;
  badgeCount?: number;
}

export const WardrobePanel: React.FC = () => {
  const {
    currentOutfit,
    selectedFilters,
    setFilters,
  } = useOutfitStore();

  const [activeTab, setActiveTab] = useState<WardrobeTab>('garment');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEra, setSelectedEra] = useState<'all' | EraOrigin>('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'nu' | 'nam'>('all');

  // Filter items according to active category, search query, era, and gender
  const filteredItems = useMemo(() => {
    return ALL_FASHION_ITEMS.filter((item) => {
      // 1. Tab category filter
      if (activeTab === 'garment' && item.category !== 'garment') return false;
      if (activeTab === 'bottom' && item.category !== 'bottom') return false;
      if (activeTab === 'footwear' && item.category !== 'footwear') return false;
      if (
        activeTab === 'accessories' &&
        item.category !== 'accessory' &&
        item.category !== 'headwear'
      ) {
        return false;
      }
      if (activeTab === 'color') return false; // Color tab handles palette separately

      // 2. Gender filter
      if (selectedGender !== 'all') {
        const itemGender = item.gender;
        if (itemGender && itemGender !== 'unisex' && itemGender !== selectedGender) {
          return false;
        }
      }

      // 3. Era filter
      if (selectedEra !== 'all' && item.eraOrigin !== selectedEra) return false;

      // 4. Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchMaterial = item.material?.toLowerCase().includes(q) ?? false;
        if (!matchName && !matchTags && !matchDesc && !matchMaterial) return false;
      }

      return true;
    });
  }, [activeTab, selectedGender, selectedEra, searchQuery]);

  // Count items per category based on active gender and era filters
  const counts = useMemo(() => {
    const matchFilters = (item: FashionItem) => {
      // Gender filter
      if (selectedGender !== 'all') {
        const itemGender = item.gender;
        if (itemGender && itemGender !== 'unisex' && itemGender !== selectedGender) {
          return false;
        }
      }
      // Era filter
      if (selectedEra !== 'all' && item.eraOrigin !== selectedEra) {
        return false;
      }
      return true;
    };

    return {
      garment: ALL_FASHION_ITEMS.filter((i) => i.category === 'garment' && matchFilters(i)).length,
      bottom: ALL_FASHION_ITEMS.filter((i) => i.category === 'bottom' && matchFilters(i)).length,
      footwear: ALL_FASHION_ITEMS.filter((i) => i.category === 'footwear' && matchFilters(i)).length,
      accessories: ALL_FASHION_ITEMS.filter(
        (i) => (i.category === 'accessory' || i.category === 'headwear') && matchFilters(i)
      ).length,
    };
  }, [selectedGender, selectedEra]);

  const tabs: TabItem[] = [
    { id: 'garment', label: 'Trang Phục Chính', badgeCount: counts.garment },
    { id: 'bottom', label: 'Quần & Váy', badgeCount: counts.bottom },
    { id: 'footwear', label: 'Giày Dép', badgeCount: counts.footwear },
    { id: 'accessories', label: 'Phụ Kiện & Nón', badgeCount: counts.accessories },
    { id: 'color', label: 'Màu Sắc Áo Tà' },
  ];

  // Cultural tip for active tab
  const garmentInsight =
    CULTURAL_INSIGHTS.find((i) => i.garmentId === currentOutfit.garment?.garmentType) ||
    CULTURAL_INSIGHTS[0];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 1. Quick Layer Detach Tray (Active Layer Pills) */}
      <ActiveLayerPills />

      {/* 2. Control Bar: Search & Category Navigation */}
      <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-4 shadow-sm transition-colors flex flex-col gap-3.5">
        {/* Realtime Search & Filter Rows */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm áo dài, ngũ thân, sneaker, kính râm, khăn vấn..."
              className="w-full bg-[#F8F8F7] dark:bg-[#121214] text-[#18181B] dark:text-[#FAFAFA] placeholder:text-[#A1A1AA] dark:placeholder:text-[#71717A] text-xs rounded-xl pl-9 pr-8 py-2.5 border border-[#E5E5E2] dark:border-[#27272A] focus:outline-none focus:border-[#9E2A2B] dark:focus:border-[#E05A47] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#71717A] hover:text-[#18181B] dark:hover:text-[#FAFAFA] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Filter Badges: Giới tính & Nguồn gốc */}
          {activeTab !== 'color' && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Gender Filter: [Tất cả | Nữ (♀) | Nam (♂)] */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] mr-0.5 font-medium hidden sm:inline">
                  Giới tính:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedGender('all')}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedGender === 'all'
                      ? 'bg-[#18181B] dark:bg-[#FAFAFA] text-white dark:text-slate-900 shadow-xs'
                      : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#71717A] dark:text-[#A1A1AA] border border-[#E5E5E2] dark:border-[#27272A] hover:text-[#18181B] dark:hover:text-[#FAFAFA]'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGender('nu')}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedGender === 'nu'
                      ? 'bg-[#E63946] text-white shadow-xs'
                      : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#71717A] dark:text-[#A1A1AA] border border-[#E5E5E2] dark:border-[#27272A] hover:text-[#18181B] dark:hover:text-[#FAFAFA]'
                  }`}
                  title="Chỉ hiển thị trang phục Nữ & Unisex"
                >
                  Nữ (♀)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGender('nam')}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedGender === 'nam'
                      ? 'bg-[#1D3557] text-white shadow-xs'
                      : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#71717A] dark:text-[#A1A1AA] border border-[#E5E5E2] dark:border-[#27272A] hover:text-[#18181B] dark:hover:text-[#FAFAFA]'
                  }`}
                  title="Chỉ hiển thị trang phục Nam & Unisex"
                >
                  Nam (♂)
                </button>
              </div>

              {/* Divider */}
              <div className="h-4 w-px bg-[#E5E5E2] dark:bg-[#27272A] hidden sm:block mx-0.5" />

              {/* Era Filter Badges: [Tất cả | Truyền thống | Gen Z Remix] */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] mr-0.5 font-medium hidden sm:inline">
                  Nguồn gốc:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedEra('all')}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedEra === 'all'
                      ? 'bg-[#18181B] dark:bg-[#FAFAFA] text-white dark:text-slate-900 shadow-xs'
                      : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#71717A] dark:text-[#A1A1AA] border border-[#E5E5E2] dark:border-[#27272A] hover:text-[#18181B] dark:hover:text-[#FAFAFA]'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEra('traditional')}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedEra === 'traditional'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#71717A] dark:text-[#A1A1AA] border border-[#E5E5E2] dark:border-[#27272A] hover:text-[#18181B] dark:hover:text-[#FAFAFA]'
                  }`}
                >
                  Truyền thống
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEra('modern')}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedEra === 'modern'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#71717A] dark:text-[#A1A1AA] border border-[#E5E5E2] dark:border-[#27272A] hover:text-[#18181B] dark:hover:text-[#FAFAFA]'
                  }`}
                >
                  Gen Z Remix
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category Tabs with Smooth Sliding Style */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar border-t border-[#E5E5E2] dark:border-[#27272A] pt-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-[#9E2A2B] dark:bg-[#E05A47] text-white shadow-sm scale-[1.01]'
                    : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] border border-[#E5E5E2] dark:border-[#27272A]'
                }`}
              >
                {tab.id === 'color' ? (
                  <Palette className="w-3.5 h-3.5" />
                ) : (
                  <Shirt className="w-3.5 h-3.5" />
                )}
                <span>{tab.label}</span>
                {typeof tab.badgeCount === 'number' && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono leading-tight ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#E5E5E2] dark:bg-[#27272A] text-[#71717A] dark:text-[#A1A1AA]'
                    }`}
                  >
                    {tab.badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Context Insight Banner */}
        {activeTab === 'garment' && (
          <div className="bg-[#F8F8F7] dark:bg-[#121214] rounded-xl p-3 border border-[#E5E5E2] dark:border-[#27272A] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#9E2A2B] dark:text-[#E05A47] shrink-0" />
              <div>
                <span className="font-bold text-[#18181B] dark:text-[#FAFAFA] block">
                  3 Dòng Áo Trụ Cột: Áo Dài • Áo Ngũ Thân • Áo Bà Ba
                </span>
                <span className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
                  Đang chọn: {currentOutfit.garment?.name} ({garmentInsight.historicalPeriod.slice(0, 48)}...)
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'accessories' && (
          <div className="bg-[#F8F8F7] dark:bg-[#121214] rounded-xl p-3 border border-[#E5E5E2] dark:border-[#27272A] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-[11px] text-[#52525B] dark:text-[#D4D4D8]">
                Mẹo phối phụ kiện: Giữ tối đa 3-4 phụ kiện để giữ nét thanh lịch của di sản, tránh bị rườm rà.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Panel Content: ItemGrid or ColorPalettePicker */}
      {activeTab === 'color' ? (
        <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-5 shadow-sm transition-colors">
          <ColorPalettePicker />
        </div>
      ) : (
        <ItemGrid items={filteredItems} />
      )}
    </div>
  );
};
