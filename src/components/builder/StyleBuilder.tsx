/**
 * StyleBuilder Component - Trình Kiến Tạo Outfit Từng Bước (Gen Z Style Wizard)
 * 4-step interactive wizard with progress bar, state retention, and rule-based recommendation AI.
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  Compass,
  Flame,
  Heart,
  Layers,
  Palette,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Users,
  Wand2,
} from 'lucide-react';
import {
  MOCK_ACCESSORIES,
  MOCK_BOTTOMS,
  MOCK_FOOTWEAR,
  MOCK_GARMENTS,
  OCCASIONS_META,
  STYLES_META,
} from '../../data/mockData';
import { useOutfitStore } from '../../store/useOutfitStore';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { OutfitRenderer } from '../avatar/OutfitRenderer';
import { generateOutfitAdvice } from '../../services/geminiService';
import {
  FashionItem,
  GarmentType,
  OccasionType,
  Outfit,
  StyleVibe,
} from '../../types';
import { GarmentChoice, SelectionSummaryDock } from './SelectionSummaryDock';

export interface StyleBuilderProps {
  onComplete?: (outfit: Outfit) => void;
}

interface PaletteChoice {
  id: string;
  name: string;
  colorHex: string;
  badge: string;
  description: string;
  bgTailwind: string;
}

const TET_COLOR_PALETTES: PaletteChoice[] = [
  {
    id: 'red_vermilion',
    name: 'Đỏ Son May Mắn',
    colorHex: '#C53030',
    badge: 'Vượng Khí & Chiêu Tài',
    description: 'Sắc đỏ chu sa rực rỡ tượng trưng cho vận đỏ, khởi sinh may mắn ngày đầu năm mới.',
    bgTailwind: 'bg-[#C53030]',
  },
  {
    id: 'pink_peach',
    name: 'Hồng Phấn Đào Phai',
    colorHex: '#E29578',
    badge: 'Duyên Dáng & Tươi Trẻ',
    description: 'Sắc hoa đào xứ Bắc e ấp trong sương sớm, mang năng lượng ngọt ngào và tươi mới.',
    bgTailwind: 'bg-[#E29578]',
  },
  {
    id: 'green_young',
    name: 'Xanh Cốm Non',
    colorHex: '#83C5BE',
    badge: 'Sinh Sôi & Hy Vọng',
    description: 'Màu chồi non lộc biếc và dòng sông mùa xuân phương Nam, thanh mát đầy sức sống.',
    bgTailwind: 'bg-[#83C5BE]',
  },
  {
    id: 'blue_indigo',
    name: 'Chàm Cổ Truyền',
    colorHex: '#2B4162',
    badge: 'Đoan Chính & Tri Thức',
    description: 'Sắc lam chàm hoàng gia triều Nguyễn, thể hiện cốt cách đĩnh đạc, tri thức và chiều sâu văn hóa.',
    bgTailwind: 'bg-[#2B4162]',
  },
  {
    id: 'cream_linen',
    name: 'Trắng Ngà Nhã Nhặn',
    colorHex: '#E9D8A6',
    badge: 'Mộc Mạc & Thuần Khiết',
    description: 'Màu sợi tơ tằm thô và vải đũi mộc tự nhiên, thanh tao, trang nhã và hướng đến sống xanh.',
    bgTailwind: 'bg-[#E9D8A6]',
  },
];

export const StyleBuilder: React.FC<StyleBuilderProps> = ({ onComplete }) => {
  const { setOutfit, setViewMode } = useOutfitStore();

  // Wizard Step (1 -> 4) synced with in-app navigation history stack
  const { builderStep, setBuilderStep } = useAppNavigation();
  const currentStep = builderStep || 1;

  // Selections state (retained across steps)
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('chup_anh_tet');
  const [selectedGarment, setSelectedGarment] = useState<GarmentChoice>('ao_dai');
  const [selectedStyle, setSelectedStyle] = useState<StyleVibe>('vintage');
  const [selectedColor, setSelectedColor] = useState<string>('#C53030');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Stepper steps definition
  const stepsMeta = [
    { step: 1, title: 'Dịp Mặc', icon: Compass },
    { step: 2, title: 'Việt Phục', icon: BookOpen },
    { step: 3, title: 'Style Gen Z', icon: Wand2 },
    { step: 4, title: 'Bảng Màu Tết', icon: Palette },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setBuilderStep(currentStep + 1);
    } else {
      handleGenerateRecommendation();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setBuilderStep(currentStep - 1);
    }
  };

  /**
   * Recommendation Algorithm (Rule-based AI Engine)
   * Resolves [Occasion + GarmentChoice + StyleVibe + ColorHex] into a culturally compliant Outfit.
   */
  const handleGenerateRecommendation = async () => {
    setIsGenerating(true);

    try {
      // 1. Resolve Garment Type if 'auto'
      let targetGarmentType: GarmentType = 'ao_dai';
      if (selectedGarment === 'auto') {
        if (selectedOccasion === 'le_chua') {
          targetGarmentType = 'ngu_than'; // Most dignified for temples
        } else if (selectedOccasion === 'gap_ban_be' || selectedStyle === 'streetwear') {
          targetGarmentType = 'ba_ba'; // Free-spirited
        } else {
          targetGarmentType = 'ao_dai'; // Quintessential iconic
        }
      } else {
        targetGarmentType = selectedGarment;
      }

      // 2. Select best Garment item
      const candidateGarments = MOCK_GARMENTS.filter((g) => g.garmentType === targetGarmentType);
      let garment: FashionItem = candidateGarments[0];

      // Prefer color or occasion matching
      const colorMatch = candidateGarments.find(
        (g) => g.colorHex.toLowerCase() === selectedColor.toLowerCase()
      );
      if (colorMatch) {
        garment = colorMatch;
      } else if (selectedOccasion === 'le_chua') {
        // Prefer traditional calm tones
        const tradMatch = candidateGarments.find((g) => g.eraOrigin === 'traditional');
        if (tradMatch) garment = tradMatch;
      } else if (selectedStyle === 'streetwear' || selectedStyle === 'y2k') {
        // Prefer modern cut
        const modernMatch = candidateGarments.find((g) => g.eraOrigin === 'modern');
        if (modernMatch) garment = modernMatch;
      }

      // 3. Select Bottom item (Culturally compliant - NEVER assign MOCK_BOTTOMS[3] short ripped in recommendation)
      let bottom: FashionItem;
      if (selectedOccasion === 'le_chua') {
        // Strict modesty for temple: Silk pants (white or black)
        bottom = targetGarmentType === 'ngu_than' ? MOCK_BOTTOMS[1] : MOCK_BOTTOMS[0];
      } else if (targetGarmentType === 'ngu_than') {
        // Áo Ngũ Thân: Streetwear/Y2K pairs with long jeans; formal/vintage/minimal pairs with elegant silk pants
        if (selectedStyle === 'streetwear' || selectedStyle === 'y2k') {
          bottom = MOCK_BOTTOMS[2]; // Quần jeans ống suông dài
        } else {
          bottom = MOCK_BOTTOMS[1]; // Quần lụa đen đoan trang
        }
      } else if (selectedStyle === 'minimal') {
        // Minimal style: Pure silk pants (white or black)
        bottom = targetGarmentType === 'ba_ba' ? MOCK_BOTTOMS[1] : MOCK_BOTTOMS[0];
      } else if (selectedStyle === 'streetwear' || selectedStyle === 'y2k') {
        bottom = MOCK_BOTTOMS[2]; // Quần jeans ống suông Y2K
      } else if (targetGarmentType === 'ba_ba') {
        bottom = MOCK_BOTTOMS[1]; // Quần lụa đen truyền thống Nam Bộ
      } else {
        // Vintage / Feminine / Default for Áo Dài
        bottom = MOCK_BOTTOMS[0]; // Quần lụa trắng dáng suông
      }
      bottom = bottom || MOCK_BOTTOMS[0];

      // 4. Select Footwear: [0] Guốc mộc, [1] Sneaker trắng, [2] Loafer da đen
      let footwear: FashionItem;
      if (selectedStyle === 'streetwear' || selectedStyle === 'y2k') {
        footwear = MOCK_FOOTWEAR[1]; // Sneaker trắng thể thao
      } else if (selectedStyle === 'minimal') {
        footwear = MOCK_FOOTWEAR[2]; // Giày Loafer da đen
      } else {
        // Vintage or Feminine
        footwear = MOCK_FOOTWEAR[0]; // Guốc mộc quai nhung đỏ
      }
      footwear = footwear || MOCK_FOOTWEAR[0];

      // 5. Select Headwear & Accessories
      // MOCK_ACCESSORIES: [0] Khăn vấn nhung, [1] Nón lá, [2] Kính râm Y2K, [3] Quạt xếp nan tre, [4] Túi canvas Sài Gòn, [5] Túi cói Nam Bộ
      let headwear: FashionItem | undefined = undefined;
      const rawAccessories: (FashionItem | undefined)[] = [];

      if (selectedStyle === 'vintage') {
        headwear = MOCK_ACCESSORIES[0]; // Khăn vấn nhung đỏ
        rawAccessories.push(MOCK_ACCESSORIES[3]); // Quạt xếp nan tre
      } else if (selectedStyle === 'feminine') {
        headwear = MOCK_ACCESSORIES[1]; // Nón lá bài thơ xứ Huế
        rawAccessories.push(MOCK_ACCESSORIES[3]); // Quạt xếp nan tre
        rawAccessories.push(MOCK_ACCESSORIES[5]); // Túi cói Nam Bộ
      } else if (selectedStyle === 'y2k') {
        if (selectedOccasion !== 'le_chua') {
          rawAccessories.push(MOCK_ACCESSORIES[2]); // Kính râm Oval Y2K
          rawAccessories.push(MOCK_ACCESSORIES[4]); // Túi canvas Sài Gòn
        } else {
          // Safe accessories for temple
          rawAccessories.push(MOCK_ACCESSORIES[3]); // Quạt xếp nan tre
        }
      } else if (selectedStyle === 'streetwear') {
        if (selectedOccasion !== 'le_chua') {
          rawAccessories.push(MOCK_ACCESSORIES[2]); // Kính râm Oval Y2K
        }
        rawAccessories.push(MOCK_ACCESSORIES[4]); // Túi canvas Sài Gòn
      } else {
        // Minimal
        rawAccessories.push(MOCK_ACCESSORIES[3]); // Quạt xếp nan tre
      }

      // Safe filtering: Strictly guarantee no undefined objects are added to accessories
      const accessories: FashionItem[] = rawAccessories.filter(
        (item): item is FashionItem => Boolean(item && item.id)
      );

      // 6. Name and cultural score synthesis
      const styleNameVi = STYLES_META[selectedStyle]?.label || 'Remix';
      const occasionNameVi = OCCASIONS_META[selectedOccasion]?.label || 'Tết';
      const garmentNameShort =
        targetGarmentType === 'ao_dai'
          ? 'Áo Dài'
          : targetGarmentType === 'ngu_than'
          ? 'Ngũ Thân'
          : 'Áo Bà Ba';

      let outfitName = `${garmentNameShort} ${styleNameVi} • ${occasionNameVi}`;

      // Gemini AI Stylist Enrichment
      try {
        const advice = await generateOutfitAdvice(
          selectedOccasion,
          selectedStyle,
          targetGarmentType,
          outfitName
        );
        if (advice && advice.stylingTitle) {
          outfitName = advice.stylingTitle;
        }
      } catch (err) {
        console.warn('Gemini advice enrichment fallback:', err);
      }

      const generatedOutfit: Outfit = {
        id: `wizard_${Date.now()}`,
        name: outfitName,
        garment,
        bottom,
        footwear,
        headwear,
        accessories,
        colorHex: selectedColor,
        occasion: selectedOccasion,
        style: selectedStyle,
        culturalBalance:
          selectedStyle === 'vintage'
            ? 95
            : selectedStyle === 'minimal'
            ? 85
            : selectedStyle === 'streetwear'
            ? 65
            : 60,
        tags: [
          'Gemini Stylist AI',
          garmentNameShort,
          styleNameVi,
          occasionNameVi,
          'Tết 2026',
        ],
        createdAt: new Date().toISOString(),
      };

      // Set state into global store
      setOutfit(generatedOutfit);
      setViewMode('studio');

      if (onComplete) {
        onComplete(generatedOutfit);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 py-2">
      {/* Wizard Header with Stepper & Progress Bar */}
      <div className="bg-white dark:bg-[#14111D] rounded-2xl border border-[#E6E1D8] dark:border-white/10 p-5 sm:p-6 shadow-sm transition-colors">
        {/* Stepper Header Title & Navigation Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#57534E] dark:text-[#D6D3D1] hover:text-[#1C1917] dark:hover:text-white bg-[#F5F2EB] dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Quay lại</span>
              </button>
            ) : (
              <div className="w-2" />
            )}

            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#FF3366]">
                <span>✦</span>
                <span>TRÌNH KIẾN TẠO OUTFIT • BƯỚC {currentStep}/4</span>
              </div>
              <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#1C1917] dark:text-[#FAF9F6]">
                {currentStep === 1 && 'Bước 1: Bạn Muốn Diện Trang Phục Vào Dịp Nào?'}
                {currentStep === 2 && 'Bước 2: Chọn Loại Việt Phục Chủ Đạo'}
                {currentStep === 3 && 'Bước 3: Chọn Gu Thẩm Mỹ (Style Vibe Gen Z)'}
                {currentStep === 4 && 'Bước 4: Chọn Bảng Màu Chủ Đạo Tết Bính Ngọ 2026'}
              </h2>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#FF3366]/10 to-[#B5179E]/10 text-[#FF3366] border border-[#FF3366]/30 shadow-2xs">
              {Math.round((currentStep / 4) * 100)}% Hoàn Tất
            </span>
          </div>
        </div>

        {/* Dynamic Visual Stepper Progress Bar */}
        <div className="w-full bg-[#E6E1D8]/60 dark:bg-white/10 h-2 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-[#FF3366] via-[#E63946] to-[#B5179E]"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-2">
          {stepsMeta.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;

            return (
              <div
                key={s.step}
                className={`flex items-center gap-2 text-xs font-semibold transition-colors ${
                  isCurrent
                    ? 'text-[#FF3366]'
                    : isCompleted
                    ? 'text-[#1C1917] dark:text-[#FAF9F6]'
                    : 'text-[#A8A29E] dark:text-[#78716C]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#FF3366] to-[#B5179E] text-white shadow-xs'
                      : isCompleted
                      ? 'bg-[#06D6A0] text-white'
                      : 'bg-[#E6E1D8] dark:bg-white/10 text-[#78716C] dark:text-[#A8A29E]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : s.step}
                </div>
                <span className="hidden md:inline truncate">{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT BODY */}
      <div className="min-h-[360px] flex flex-col justify-between">
        {/* ================= STEP 1: DỊP MẶC ================= */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {[
              {
                id: 'chup_anh_tet' as OccasionType,
                title: 'Chụp Ảnh Tết',
                badge: 'Check-in Rực Rỡ',
                desc: 'Phố ông đồ, chợ hoa xuân, studio concept Tết với màu sắc nổi bật và phụ kiện bắt sáng khung hình.',
                icon: Camera,
              },
              {
                id: 'du_xuan' as OccasionType,
                title: 'Du Xuân Phố Cổ',
                badge: 'Năng Động & Thoáng Mát',
                desc: 'Cà phê hội bạn, dạo bộ ngắm phố phường, ưu tiên phom dáng suông dễ di chuyển cả ngày.',
                icon: Compass,
              },
              {
                id: 'le_chua' as OccasionType,
                title: 'Đi Lễ Đền Chùa',
                badge: 'Trang Nghiêm & Kín Đáo',
                desc: 'Dâng hương cầu an đầu năm, bắt buộc chuẩn mực nghiêm cẩn, kín cổ, kín gối, sắc thái nền nã.',
                icon: Flame,
              },
              {
                id: 'gap_ban_be' as OccasionType,
                title: 'Gặp Gỡ Bạn Bè',
                badge: 'Cá Tính & Phá Cách',
                desc: 'Họp lớp, party tân niên, thoải mái bung xõa phong cách remix Y2K hay streetwear tự do.',
                icon: Users,
              },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = selectedOccasion === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedOccasion(item.id)}
                  className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-200 bg-white dark:bg-[#14111D] flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#FF3366] dark:border-[#FF3366] ring-2 ring-[#FF3366]/25 shadow-[0_0_20px_rgba(255,51,102,0.18)] scale-[1.01]'
                      : 'border-[#E6E1D8] dark:border-white/10 hover:border-[#FF3366]/40 dark:hover:border-white/20 hover:scale-[0.99] active:scale-[0.98]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#FF3366] to-[#B5179E] text-white shadow-xs'
                            : 'bg-[#F5F2EB] dark:bg-white/5 text-[#57534E] dark:text-[#A8A29E]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-normal whitespace-nowrap transition-colors ${
                          isSelected
                            ? 'bg-[#FF3366]/15 text-[#FF3366] border border-[#FF3366]/40 shadow-xs'
                            : 'bg-[#F5F2EB] dark:bg-white/5 text-[#78716C] dark:text-[#A8A29E] border border-[#E6E1D8] dark:border-white/10'
                        }`}
                      >
                        <span className="text-[10px]">✦</span>
                        <span>{item.badge}</span>
                      </span>
                    </div>

                    <h3 className="font-editorial text-base font-bold text-[#1C1917] dark:text-[#FAF9F6] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#78716C] dark:text-[#A8A29E] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E6E1D8]/60 dark:border-white/10 flex items-center justify-between text-xs">
                    <span
                      className={`font-bold ${
                        isSelected
                          ? 'text-[#FF3366]'
                          : 'text-[#78716C] dark:text-[#A8A29E]'
                      }`}
                    >
                      {isSelected ? '✓ Đã Chọn' : 'Chọn dịp này'}
                    </span>
                    <div
                      className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#FF3366] bg-[#FF3366] text-white shadow-xs'
                          : 'border-[#A8A29E] dark:border-[#78716C]'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= STEP 2: VIỆT PHỤC ================= */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {[
              {
                id: 'ao_dai' as GarmentChoice,
                name: 'Áo Dài Truyền Thống',
                badge: 'Thanh Lịch • Biểu Tượng',
                desc: 'Tà áo buông tha thướt, xẻ tà ngang hông mềm mại, tôn vinh nét đẹp duyên dáng uyển chuyển.',
                garmentItem: MOCK_GARMENTS[0],
              },
              {
                id: 'ngu_than' as GarmentChoice,
                name: 'Áo Ngũ Thân Triều Nguyễn',
                badge: 'Khí Chất • Ngũ Thường',
                desc: 'Tay chẽn hoặc tay thụi, 5 khuy xà cừ đoan chính, cấu trúc ngũ hành chuẩn mực cung đình xưa.',
                garmentItem: MOCK_GARMENTS[1],
              },
              {
                id: 'ba_ba' as GarmentChoice,
                name: 'Áo Bà Ba Nam Bộ',
                badge: 'Phóng Khoáng • Mộc Mạc',
                desc: 'Xẻ hai tà hông phóng khoáng, hai túi đắp trước, mang đậm tinh thần sông nước Nam Bộ.',
                garmentItem: MOCK_GARMENTS[2],
              },
              {
                id: 'auto' as GarmentChoice,
                name: 'Gợi Ý Tự Động Cho Tôi',
                badge: 'AI TradStylist Engine',
                desc: 'Hệ thống thông minh tự tính toán chọn dòng áo phù hợp hoàn hảo nhất với dịp mặc của bạn.',
                special: true,
              },
            ].map((item) => {
              const isSelected = selectedGarment === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedGarment(item.id)}
                  className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-200 bg-white dark:bg-[#14111D] flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#FF3366] dark:border-[#FF3366] ring-2 ring-[#FF3366]/25 shadow-[0_0_20px_rgba(255,51,102,0.18)] scale-[1.01]'
                      : 'border-[#E6E1D8] dark:border-white/10 hover:border-[#FF3366]/40 dark:hover:border-white/20 hover:scale-[0.99] active:scale-[0.98]'
                  }`}
                >
                  {/* 2D Vector Item Preview or AI Special Banner */}
                  {item.special ? (
                    <div className="h-32 bg-gradient-to-br from-[#FF3366] via-[#B5179E] to-[#7B2CBF] flex flex-col items-center justify-center text-white p-4 text-center">
                      <Sparkles className="w-8 h-8 mb-2 animate-spin-slow text-[#FFD166]" />
                      <span className="font-bold text-xs uppercase tracking-wider">
                        Trợ Lý Tự Quyết Định
                      </span>
                    </div>
                  ) : (
                    <div className="h-32 relative overflow-hidden bg-[#F5F2EB]/60 dark:bg-white/5 flex items-center justify-center p-3 border-b border-[#E6E1D8]/60 dark:border-white/10">
                      <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        {item.garmentItem && (
                          <OutfitRenderer
                            item={item.garmentItem}
                            mode="item"
                            className="w-full h-full max-h-28 drop-shadow-sm"
                          />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-normal whitespace-nowrap mb-2.5 transition-colors ${
                          isSelected
                            ? 'bg-[#FF3366]/15 text-[#FF3366] border border-[#FF3366]/40 shadow-xs'
                            : 'bg-[#F5F2EB] dark:bg-white/5 text-[#78716C] dark:text-[#A8A29E] border border-[#E6E1D8] dark:border-white/10'
                        }`}
                      >
                        <span className="text-[10px]">✦</span>
                        <span>{item.badge}</span>
                      </span>
                      <h3 className="font-editorial text-sm font-bold text-[#1C1917] dark:text-[#FAF9F6] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#E6E1D8]/60 dark:border-white/10 flex items-center justify-between text-xs">
                      <span
                        className={`font-bold text-[11px] ${
                          isSelected
                            ? 'text-[#FF3366]'
                            : 'text-[#78716C] dark:text-[#A8A29E]'
                        }`}
                      >
                        {isSelected ? '✓ Đang Chọn' : 'Chọn mục này'}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-[#FF3366] bg-[#FF3366] text-white shadow-xs'
                            : 'border-[#A8A29E] dark:border-[#78716C]'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= STEP 3: PHONG CÁCH GEN Z ================= */}
        {currentStep === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {[
              {
                id: 'y2k' as StyleVibe,
                name: 'Cyber Y2K',
                badge: 'Tương Lai & Nổi Bật',
                desc: 'Kính oval kim loại tròng bạc, layer chuỗi ngọc trai xích, tạo vẻ ngoài ấn tượng dẫn đầu trào lưu.',
              },
              {
                id: 'streetwear' as StyleVibe,
                name: 'Streetwear Phố',
                badge: 'Phóng Khoáng & Đô Thị',
                desc: 'Quần jeans ống suông, sneaker chunky đế bánh mì, túi canvas graphic Hà Nội / Sài Gòn năng động.',
              },
              {
                id: 'minimal' as StyleVibe,
                name: 'Tối Giản (Minimal)',
                badge: 'Thanh Thoát & Sang Trọng',
                desc: 'Đường may gãy gọn ẩn giấu, quần âu xếp ly, giày Loafer da đen, tôn vinh chất liệu tơ đũi mộc.',
              },
              {
                id: 'vintage' as StyleVibe,
                name: 'Hoài Cổ Đông Dương',
                badge: 'Nghệ Thuật & Đài Các',
                desc: 'Khăn vấn nhung đỏ, guốc mộc truyền thống, quạt xếp nan tre sơn mài vẽ hoa sen thanh tao.',
              },
              {
                id: 'feminine' as StyleVibe,
                name: 'Nữ Tính Dịu Dàng',
                badge: 'Thuần Khiết & Duyên Dáng',
                desc: 'Gấm hoa nhí pastel, nón lá bài thơ xứ Huế, vòng ngọc cẩm thạch may mắn, tạo nét thướt tha.',
              },
            ].map((item) => {
              const isSelected = selectedStyle === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedStyle(item.id)}
                  className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-200 bg-white dark:bg-[#14111D] flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#FF3366] dark:border-[#FF3366] ring-2 ring-[#FF3366]/25 shadow-[0_0_20px_rgba(255,51,102,0.18)] scale-[1.01]'
                      : 'border-[#E6E1D8] dark:border-white/10 hover:border-[#FF3366]/40 dark:hover:border-white/20 hover:scale-[0.99] active:scale-[0.98]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-normal whitespace-nowrap transition-colors ${
                          isSelected
                            ? 'bg-[#FF3366]/15 text-[#FF3366] border border-[#FF3366]/40 shadow-xs'
                            : 'bg-[#F5F2EB] dark:bg-white/5 text-[#78716C] dark:text-[#A8A29E] border border-[#E6E1D8] dark:border-white/10'
                        }`}
                      >
                        <span className="text-[10px]">✦</span>
                        <span>{item.badge}</span>
                      </span>
                    </div>

                    <h3 className="font-editorial text-base font-bold text-[#1C1917] dark:text-[#FAF9F6] mb-1.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#78716C] dark:text-[#A8A29E] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E6E1D8]/60 dark:border-white/10 flex items-center justify-between text-xs">
                    <span
                      className={`font-bold ${
                        isSelected
                          ? 'text-[#FF3366]'
                          : 'text-[#78716C] dark:text-[#A8A29E]'
                      }`}
                    >
                      {isSelected ? '✓ Đang Chọn' : 'Chọn vibe này'}
                    </span>
                    <div
                      className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#FF3366] bg-[#FF3366] text-white shadow-xs'
                          : 'border-[#A8A29E] dark:border-[#78716C]'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= STEP 4: BẢNG MÀU TẾT ================= */}
        {currentStep === 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {TET_COLOR_PALETTES.map((palette) => {
              const isSelected = selectedColor.toLowerCase() === palette.colorHex.toLowerCase();

              return (
                <div
                  key={palette.id}
                  onClick={() => setSelectedColor(palette.colorHex)}
                  className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-200 bg-white dark:bg-[#14111D] flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#FF3366] dark:border-[#FF3366] ring-2 ring-[#FF3366]/25 shadow-[0_0_20px_rgba(255,51,102,0.18)] scale-[1.01]'
                      : 'border-[#E6E1D8] dark:border-white/10 hover:border-[#FF3366]/40 dark:hover:border-white/20 hover:scale-[0.99] active:scale-[0.98]'
                  }`}
                >
                  <div>
                    {/* Color Swatch Header with Metallic Chrome Ring */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-full shadow-md border-2 border-white dark:border-white/60 ring-2 ring-black/10 dark:ring-white/20 shrink-0 transition-transform group-hover:scale-105"
                        style={{ backgroundColor: palette.colorHex }}
                      />
                      <div className="truncate">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#FF3366] uppercase tracking-wider block">
                          <span>✦</span>
                          <span>{palette.badge}</span>
                        </span>
                        <h3 className="font-editorial text-base font-bold text-[#1C1917] dark:text-[#FAF9F6] truncate">
                          {palette.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-[#78716C] dark:text-[#A8A29E] leading-relaxed">
                      {palette.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E6E1D8]/60 dark:border-white/10 flex items-center justify-between text-xs">
                    <span
                      className={`font-bold ${
                        isSelected
                          ? 'text-[#FF3366]'
                          : 'text-[#78716C] dark:text-[#A8A29E]'
                      }`}
                    >
                      {isSelected ? '✓ Đang Chọn' : 'Chọn sắc màu này'}
                    </span>
                    <div
                      className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#FF3366] bg-[#FF3366] text-white shadow-xs'
                          : 'border-[#A8A29E] dark:border-[#78716C]'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SELECTION SUMMARY DOCK (FIT SUMMARY TRAY & SMART WIZARD CONTROLS) */}
      <SelectionSummaryDock
        selectedOccasion={selectedOccasion}
        selectedGarment={selectedGarment}
        selectedStyle={selectedStyle}
        selectedColor={selectedColor}
        currentStep={currentStep}
        totalSteps={4}
        isGenerating={isGenerating}
        onNext={handleNext}
        onBack={handleBack}
        onGenerate={handleGenerateRecommendation}
      />
    </div>
  );
};
