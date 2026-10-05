/**
 * InspirationGallery Component - Thư Viện Cảm Hứng Tết (Curated Editorial Lookbook)
 * Realtime Search, Tag Filter Chips, Favorite Heart toggles, and "Remix Look Này" CTA.
 */

import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  Check,
  Compass,
  Filter,
  Heart,
  Search,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react';
import { OCCASIONS_META, PRESET_OUTFITS, STYLES_META } from '../../data/mockData';
import { useOutfitStore } from '../../store/useOutfitStore';
import { Outfit } from '../../types';
import { OutfitRenderer } from '../avatar/OutfitRenderer';
import { EmptyStateView } from './EmptyStateView';

export const InspirationGallery: React.FC = () => {
  const { setOutfit, setViewMode } = useOutfitStore();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('vietphuc_liked_outfits');
        if (stored) return new Set(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
    return new Set(['preset_01', 'preset_02']);
  });
  const [remixToast, setRemixToast] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('vietphuc_liked_outfits', JSON.stringify(Array.from(next)));
        } catch (e) {
          console.error(e);
        }
      }
      return next;
    });
  };

  const filterChips: { id: string; label: string }[] = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'Áo Dài', label: 'Áo Dài' },
    { id: 'Áo Ngũ Thân', label: 'Áo Ngũ Thân' },
    { id: 'Áo Bà Ba', label: 'Áo Bà Ba' },
    { id: 'Y2K', label: 'Y2K' },
    { id: 'Streetwear', label: 'Streetwear' },
    { id: 'Đi Lễ Chùa', label: 'Đi Lễ Chùa' },
  ];

  const filteredPresets = useMemo(() => {
    return PRESET_OUTFITS.filter((outfit) => {
      // 1. Tag filter
      if (selectedTag !== 'all') {
        const hasTag = outfit.tags.some(
          (t) => t.toLowerCase() === selectedTag.toLowerCase()
        );
        const hasGarmentType =
          selectedTag === 'Áo Dài' && outfit.garment.garmentType === 'ao_dai';
        const hasNguThan =
          selectedTag === 'Áo Ngũ Thân' && outfit.garment.garmentType === 'ngu_than';
        const hasBaBa =
          selectedTag === 'Áo Bà Ba' && outfit.garment.garmentType === 'ba_ba';
        const hasOccasion =
          selectedTag === 'Đi Lễ Chùa' && outfit.occasion === 'le_chua';
        const hasStyle =
          selectedTag === 'Y2K' && outfit.style === 'y2k';
        const hasStreet =
          selectedTag === 'Streetwear' && outfit.style === 'streetwear';

        if (
          !hasTag &&
          !hasGarmentType &&
          !hasNguThan &&
          !hasBaBa &&
          !hasOccasion &&
          !hasStyle &&
          !hasStreet
        ) {
          return false;
        }
      }

      // 2. Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = outfit.name.toLowerCase().includes(q);
        const matchGarment = outfit.garment.name.toLowerCase().includes(q);
        const matchTags = outfit.tags.some((t) => t.toLowerCase().includes(q));
        const matchStyle = STYLES_META[outfit.style]?.label.toLowerCase().includes(q) ?? false;
        const matchOccasion =
          OCCASIONS_META[outfit.occasion]?.label.toLowerCase().includes(q) ?? false;

        if (!matchName && !matchGarment && !matchTags && !matchStyle && !matchOccasion) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedTag]);

  const handleRemix = (outfit: Outfit) => {
    setOutfit(outfit);
    setViewMode('studio');
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Editorial Header Banner */}
      <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm transition-colors">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9E2A2B] dark:text-[#E05A47] bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 px-3 py-1 rounded-full border border-[#9E2A2B]/20 dark:border-[#E05A47]/30">
              LOOKBOOK CẢM HỨNG DI SẢN
            </span>
            <span className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
              • {PRESET_OUTFITS.length} Bản Phối Tuyển Chọn
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#18181B] dark:text-[#FAFAFA]">
            Thư Viện Cổ Phục Đương Đại
          </h2>

          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] max-w-2xl leading-relaxed">
            Tuyển chọn các set đồ giao thoa di sản chuẩn chỉnh nhất cho mọi dịp: dạo phố cổ, chiêm bái đền chùa, dạ tiệc, cà phê hội bạn. Chọn một bản phối và nhấn <strong className="text-[#9E2A2B] dark:text-[#E05A47]">Remix Look Này</strong> để tự do biến tấu trong Studio.
          </p>
        </div>

        <button
          onClick={() => setViewMode('studio')}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#9E2A2B] dark:bg-[#E05A47] hover:brightness-110 shadow-sm transition-all whitespace-nowrap self-start md:self-auto"
        >
          <Wand2 className="w-4 h-4" />
          <span>Vào Studio Tự Phối</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-4 shadow-sm transition-colors flex flex-col gap-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Realtime Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bản phối, dòng áo (Áo Dài, Ngũ Thân), tag phong cách..."
              className="w-full bg-[#F8F8F7] dark:bg-[#121214] text-[#18181B] dark:text-[#FAFAFA] placeholder:text-[#A1A1AA] dark:placeholder:text-[#71717A] text-xs rounded-xl pl-9 pr-8 py-2.5 border border-[#E5E5E2] dark:border-[#27272A] focus:outline-none focus:border-[#9E2A2B] dark:focus:border-[#E05A47] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#71717A] hover:text-[#18181B] dark:hover:text-[#FAFAFA]"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <span className="text-xs text-[#71717A] dark:text-[#A1A1AA] self-end sm:self-auto font-medium">
            Hiển thị <strong>{filteredPresets.length}</strong> / {PRESET_OUTFITS.length} bản phối
          </span>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar border-t border-[#E5E5E2] dark:border-[#27272A] pt-3">
          {filterChips.map((chip) => {
            const isActive = selectedTag === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedTag(chip.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-[#9E2A2B] dark:bg-[#E05A47] text-white shadow-sm scale-[1.02]'
                    : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] border border-[#E5E5E2] dark:border-[#27272A]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Curated Outfits Grid or Empty State */}
      {filteredPresets.length === 0 ? (
        <EmptyStateView
          type="search"
          onAction={() => {
            setSearchQuery('');
            setSelectedTag('all');
          }}
          actionLabel="Xóa bộ lọc tìm kiếm"
          customMessage={`Không tìm thấy bản phối nào phù hợp với từ khóa "${searchQuery}".`}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPresets.map((outfit) => {
            const isFav = favorites.has(outfit.id);

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

                  {/* Favorite Heart Button */}
                  <button
                    onClick={() => toggleFavorite(outfit.id)}
                    title={isFav ? 'Bỏ yêu thích' : 'Yêu thích look này'}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                      isFav
                        ? 'bg-rose-600 text-white scale-110'
                        : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/70'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Card Details */}
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

                    {/* Component breakdown */}
                    <div className="text-xs text-[#71717A] dark:text-[#A1A1AA] space-y-1 mb-3">
                      <p className="line-clamp-1">
                        <span className="font-semibold text-[#52525B] dark:text-[#D4D4D8]">Áo:</span>{' '}
                        {outfit.garment.name}
                      </p>
                      {outfit.bottom && (
                        <p className="line-clamp-1">
                          <span className="font-semibold text-[#52525B] dark:text-[#D4D4D8]">Quần:</span>{' '}
                          {outfit.bottom.name}
                        </p>
                      )}
                      {outfit.footwear && (
                        <p className="line-clamp-1">
                          <span className="font-semibold text-[#52525B] dark:text-[#D4D4D8]">Giày:</span>{' '}
                          {outfit.footwear.name}
                        </p>
                      )}
                    </div>

                    {/* Cultural tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {outfit.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-[#F8F8F7] dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA] px-1.5 py-0.5 rounded border border-[#E5E5E2] dark:border-[#27272A] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Remix CTA Button */}
                  <button
                    onClick={() => handleRemix(outfit)}
                    className="w-full py-2.5 bg-[#F8F8F7] dark:bg-[#121214] hover:bg-[#9E2A2B] hover:text-white dark:hover:bg-[#E05A47] dark:hover:text-white text-[#18181B] dark:text-[#FAFAFA] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-[#E5E5E2] dark:border-[#27272A] group-hover:border-[#9E2A2B] dark:group-hover:border-[#E05A47]"
                  >
                    <Wand2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Remix Look Này</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
