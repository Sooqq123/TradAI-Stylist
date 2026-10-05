/**
 * Việt Phục Remix - Main Application Entry
 * Powered by Vietnamese Cultural Editorial AppShell, Header, and Zustand Store.
 */

import React, { useState, useEffect } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bookmark,
  Check,
  Compass,
  Dices,
  Layers,
  Palette,
  Plus,
  RotateCcw,
  ScanEye,
  ShieldCheck,
  Sparkles,
  Trash2,
  Wand2,
  Share2,
  X,
} from 'lucide-react';
import { AppShell } from './components/layout/AppShell';
import { StyleBuilder } from './components/builder/StyleBuilder';
import { WardrobePanel } from './components/studio/WardrobePanel';
import { OutfitCanvas } from './components/canvas/OutfitCanvas';
import { CulturalBalanceBar } from './components/cultural/CulturalBalanceBar';
import { CulturalGuardrail } from './components/cultural/CulturalGuardrail';
import { CulturalInsightCard } from './components/cultural/CulturalInsightCard';
import { GeminiStylistWidget } from './components/cultural/GeminiStylistWidget';
import { InspirationGallery } from './components/gallery/InspirationGallery';
import { SavedLooks } from './components/gallery/SavedLooks';
import { LookbookExportModal } from './components/export/LookbookExportModal';
import { ContextScannerModal } from './components/ai/ContextScannerModal';
import { RealtimeCopilotWidget } from './components/studio/RealtimeCopilotWidget';
import { CulturalFlashcard } from './components/cultural/CulturalFlashcard';
import { QuickChatDrawer } from './components/ai/QuickChatDrawer';
import { HeritageLookbookShowcase } from './components/lookbook/HeritageLookbookShowcase';
import { ToastNotification, ToastItem, ToastType } from './components/common/ToastNotification';
import { FeedbackFAB } from './components/feedback/FeedbackFAB';
import { FeedbackModal } from './components/feedback/FeedbackModal';
import { FeedbackSection } from './components/feedback/FeedbackSection';
import {
  ALL_FASHION_ITEMS,
  CULTURAL_INSIGHTS,
  MOCK_ACCESSORIES,
  MOCK_BOTTOMS,
  MOCK_FOOTWEAR,
  MOCK_GARMENTS,
  OCCASIONS_META,
  PRESET_OUTFITS,
  STYLES_META,
} from './data/mockData';
import { useOutfitStore } from './store/useOutfitStore';
import {
  FashionItem,
  GarmentType,
  ItemCategory,
  OccasionType,
  Outfit,
  StyleVibe,
} from './types';

export default function App() {
  const {
    currentOutfit,
    savedOutfits,
    validationResult,
    viewMode,
    refreshKey,
    selectedFilters,
    setGarment,
    setBottom,
    setFootwear,
    setHeadwear,
    toggleAccessory,
    removeAccessory,
    setOutfit,
    resetOutfit,
    generateRandomLook,
    setOccasion,
    setStyle,
    setOutfitName,
    saveCurrentOutfit,
    deleteSavedOutfit,
    setViewMode,
    setFilters,
  } = useOutfitStore();

  const [selectedInsightGarment, setSelectedInsightGarment] = useState<GarmentType>('ao_dai');
  const [showInsightModal, setShowInsightModal] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isContextScannerOpen, setIsContextScannerOpen] = useState<boolean>(false);
  const [isQuickChatOpen, setIsQuickChatOpen] = useState<boolean>(false);
  const [quickChatPrompt, setQuickChatPrompt] = useState<string>('');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: ToastType = 'success', subtitle?: string) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type, subtitle }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAskAIAboutItem = (item: FashionItem) => {
    setQuickChatPrompt(`Món ${item.name} (${item.eraOrigin === 'traditional' ? 'cổ phục' : 'remix hiện đại'}) này phối cùng phụ kiện gì để vừa đẹp vừa đúng chuẩn văn hóa nhất?`);
    setIsQuickChatOpen(true);
  };

  const handleSave = () => {
    saveCurrentOutfit();
    addToast('Đã lưu bản phối vào Tủ đồ cá nhân!', 'success', 'Dữ liệu tồn tại bền vững qua localStorage.');
  };

  const handleNewLook = () => {
    generateRandomLook();
    const newLook = useOutfitStore.getState().currentOutfit;
    setViewMode('studio');
    const styleLabel =
      newLook.style === 'vintage'
        ? 'Vintage Di Sản Cổ Điển'
        : newLook.style === 'streetwear'
        ? 'Streetwear Phóng Khoáng'
        : newLook.style === 'y2k'
        ? 'Cyber Y2K Remix'
        : newLook.style === 'minimal'
        ? 'Tối Giản Thanh Lịch'
        : 'Remix Đương Đại';
    addToast(
      'Đã tạo bản phối ngẫu nhiên mới!',
      'success',
      `${newLook.name} • Phong cách ${styleLabel}`
    );
  };

  // Deep-link / Share URL parser: Read ?look=, ?preset=, ?id=, or ?data=
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const lookParam = searchParams.get('look')?.trim();
      const presetParam = searchParams.get('preset')?.trim();
      const idParam = searchParams.get('id')?.trim();
      const dataParam = searchParams.get('data')?.trim();

      const targetIdentifier = lookParam || presetParam || idParam;

      if (!targetIdentifier && !dataParam) return;

      let matchedOutfit: Outfit | undefined;

      // 1. Try finding in PRESET_OUTFITS by ID
      if (targetIdentifier) {
        matchedOutfit = PRESET_OUTFITS.find(
          (p) => p.id.toLowerCase() === targetIdentifier.toLowerCase()
        );

        // 2. Try finding in PRESET_OUTFITS by Name (case-insensitive & whitespace tolerant)
        if (!matchedOutfit) {
          const normalizedTarget = targetIdentifier.toLowerCase().replace(/_/g, ' ');
          matchedOutfit = PRESET_OUTFITS.find((p) => {
            const normalizedName = p.name.toLowerCase();
            return (
              normalizedName === normalizedTarget ||
              normalizedName.includes(normalizedTarget) ||
              normalizedTarget.includes(normalizedName)
            );
          });
        }

        // 3. Try finding in savedOutfits
        if (!matchedOutfit && savedOutfits && savedOutfits.length > 0) {
          matchedOutfit = savedOutfits.find(
            (s) =>
              s.id.toLowerCase() === targetIdentifier.toLowerCase() ||
              s.name.toLowerCase() === targetIdentifier.toLowerCase() ||
              s.name.toLowerCase().includes(targetIdentifier.toLowerCase())
          );
        }
      }

      // 4. If dataParam is present, decode full/compact outfit structure
      if (!matchedOutfit && dataParam) {
        try {
          const parsed = JSON.parse(decodeURIComponent(dataParam));
          if (parsed.garmentId) {
            const g = ALL_FASHION_ITEMS.find((it) => it.id === parsed.garmentId);
            const b = ALL_FASHION_ITEMS.find((it) => it.id === parsed.bottomId);
            const f = ALL_FASHION_ITEMS.find((it) => it.id === parsed.footwearId);
            const h = ALL_FASHION_ITEMS.find((it) => it.id === parsed.headwearId);
            const accs = Array.isArray(parsed.accIds)
              ? parsed.accIds
                  .map((id: string) => ALL_FASHION_ITEMS.find((it) => it.id === id))
                  .filter((it: any): it is FashionItem => Boolean(it))
              : [];

            if (g) {
              matchedOutfit = {
                id: parsed.id || `shared_${Date.now()}`,
                name: parsed.name || 'Bản Phối Chia Sẻ',
                garment: g,
                bottom: b,
                footwear: f,
                headwear: h,
                accessories: accs,
                colorHex: parsed.colorHex || g.colorHex,
                occasion: parsed.occasion || 'du_xuan',
                style: parsed.style || 'y2k',
                culturalBalance: 75,
                tags: ['Được Chia Sẻ', 'Tết 2026'],
                createdAt: new Date().toISOString(),
              };
            }
          }
        } catch (e) {
          console.warn('Failed to parse shared outfit data param', e);
        }
      }

      // 5. If matched, apply to currentOutfit, switch to Studio and notify user
      if (matchedOutfit) {
        setOutfit(matchedOutfit);
        setViewMode('studio');
        addToast(
          'Đã nạp bản phối từ liên kết chia sẻ!',
          'info',
          `Bản phối: "${matchedOutfit.name}"`
        );
      }
    } catch (err) {
      console.error('Error parsing share URL:', err);
    }
  }, []);

  const currentInsight =
    CULTURAL_INSIGHTS.find((ins) => ins.garmentId === (currentOutfit.garment?.garmentType || selectedInsightGarment)) ||
    CULTURAL_INSIGHTS[0];

  const occasionMeta = OCCASIONS_META[currentOutfit.occasion] || OCCASIONS_META.chup_anh_tet;
  const styleMeta = STYLES_META[currentOutfit.style] || STYLES_META.y2k;

  return (
    <AppShell
      onNewLookClick={handleNewLook}
      onOpenScanner={() => setIsContextScannerOpen(true)}
      onRefreshNotice={(msg) =>
        addToast(msg, 'info', 'Dữ liệu giao diện đã được khôi phục trạng thái chuẩn.')
      }
    >
      {/* Toast Notification System */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />

      {/* VIEW MODE 1: STUDIO PHỐI ĐỒ (Comprehensive Editorial Studio) */}
      {viewMode === 'studio' && (
        <div key={`studio-${refreshKey}`} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Canvas & Breakdown (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Quick launcher to AI Scanner & Style Builder */}
            <div className="bg-white dark:bg-[#14111D] rounded-2xl border border-[#E6E1D8] dark:border-white/10 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF3366] to-[#B5179E] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ScanEye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917] dark:text-[#FAF9F6]">
                    AI Context Scanner • Quét ảnh & nhu cầu
                  </h4>
                  <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
                    Tải ảnh không gian hoặc gõ ý định để Gemini Flash tư vấn set đồ chuẩn gu
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => setIsContextScannerOpen(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#FF3366] to-[#B5179E] text-white hover:brightness-110 shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
                  <span>Quét Bối Cảnh</span>
                </button>
                <button
                  onClick={() => setViewMode('builder')}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F5F2EB] dark:bg-white/10 text-[#57534E] dark:text-[#D6D3D1] hover:text-[#1C1917] dark:hover:text-white border border-[#E6E1D8] dark:border-white/10 whitespace-nowrap active:scale-95 cursor-pointer"
                >
                  Wizard 4 Bước
                </button>
              </div>
            </div>

            {/* Quick Benchmark Lookbook Launcher Banner */}
            <div
              onClick={() => setViewMode('lookbook')}
              className="group p-3 rounded-2xl bg-gradient-to-r from-[#24121E] via-[#1B0B13] to-[#120810] border border-[#FF3366]/40 hover:border-[#FF3366] text-white flex items-center justify-between gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer ring-1 ring-white/10"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF3366] to-[#E63946] flex items-center justify-center text-white shadow-xs shrink-0">
                  <Sparkles className="w-4 h-4 text-[#FFD166]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFD166] font-bold">
                      ✦ DIGITAL HERITAGE LOOKBOOK
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#FF3366] transition-colors">
                    Xem 6 bản phối chuẩn (Áo Dài, Ngũ Thân, Bà Ba)
                  </h4>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white/10 group-hover:bg-[#FF3366] text-white transition-all shrink-0">
                Sàn Diễn ➔
              </span>
            </div>

            {/* Editorial Outfit Canvas Card */}
            <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-5 sm:p-6 shadow-sm relative overflow-hidden transition-colors">
              {/* Subtle Ambient Color Glow */}
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-15 dark:opacity-20 pointer-events-none transition-all duration-700"
                style={{ backgroundColor: currentOutfit.colorHex || '#9E2A2B' }}
              />

              {/* Card Header & Title */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#9E2A2B] dark:text-[#E05A47]">
                      LOOK DỰ KIẾN
                    </span>
                    <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
                      • {occasionMeta.label}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={currentOutfit.name}
                    onChange={(e) => setOutfitName(e.target.value)}
                    className="bg-transparent font-editorial font-bold text-xl sm:text-2xl text-[#18181B] dark:text-[#FAFAFA] border-b border-transparent hover:border-[#E5E5E2] dark:hover:border-[#27272A] focus:border-[#9E2A2B] dark:focus:border-[#E05A47] focus:outline-none w-full transition-colors pb-0.5"
                    placeholder="Tên bản phối..."
                  />
                </div>

                <button
                  onClick={resetOutfit}
                  title="Đặt lại bản phối"
                  className="p-2 text-[#71717A] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] rounded-xl hover:bg-[#F8F8F7] dark:hover:bg-[#27272A] transition-colors border border-transparent hover:border-[#E5E5E2] dark:hover:border-[#27272A]"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Cultural Guardrail Banner (Alerts, Etiquette, 1-Click Fix) */}
              <div className="mb-4">
                <CulturalGuardrail />
              </div>

              {/* Cultural Balance Bar (Gauge) */}
              <div className="mb-4">
                <CulturalBalanceBar />
              </div>

              {/* Interactive Layered Outfit Canvas & Compare Engine */}
              <div className="mb-4">
                <OutfitCanvas />
              </div>

              {/* Real-time Stylist Copilot Feedback Widget */}
              <div className="mb-4">
                <RealtimeCopilotWidget />
              </div>

              {/* 3D Cultural Tarot Flashcard (AI Storyteller) */}
              <div className="mb-4">
                <CulturalFlashcard onAskAI={handleAskAIAboutItem} />
              </div>

              {/* Breakdown Slots */}
              <div className="space-y-2 mb-5">
                <div className="text-[11px] font-bold text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E05A47]" />
                    Thành phần bản phối
                  </span>
                  <button
                    onClick={() => setShowInsightModal(true)}
                    className="text-[11px] font-semibold text-[#9E2A2B] dark:text-[#E05A47] hover:underline flex items-center gap-1 normal-case"
                  >
                    <BookOpen className="w-3 h-3" />
                    Triết lý cổ phục
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Bottom */}
                  <div className="bg-[#F8F8F7] dark:bg-[#121214] p-2.5 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] flex items-center justify-between">
                    <div className="truncate pr-1">
                      <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] block font-medium">
                        Quần / Váy
                      </span>
                      <span className="font-semibold text-[#18181B] dark:text-[#FAFAFA] truncate block">
                        {currentOutfit.bottom ? currentOutfit.bottom.name : 'Chưa chọn'}
                      </span>
                    </div>
                    {currentOutfit.bottom && (
                      <button
                        onClick={() => setBottom(undefined)}
                        className="text-[#71717A] hover:text-red-500 p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Footwear */}
                  <div className="bg-[#F8F8F7] dark:bg-[#121214] p-2.5 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] flex items-center justify-between">
                    <div className="truncate pr-1">
                      <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] block font-medium">
                        Giày / Guốc
                      </span>
                      <span className="font-semibold text-[#18181B] dark:text-[#FAFAFA] truncate block">
                        {currentOutfit.footwear ? currentOutfit.footwear.name : 'Chưa chọn'}
                      </span>
                    </div>
                    {currentOutfit.footwear && (
                      <button
                        onClick={() => setFootwear(undefined)}
                        className="text-[#71717A] hover:text-red-500 p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Headwear */}
                  <div className="bg-[#F8F8F7] dark:bg-[#121214] p-2.5 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] flex items-center justify-between">
                    <div className="truncate pr-1">
                      <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] block font-medium">
                        Khăn Vấn / Mũ
                      </span>
                      <span className="font-semibold text-[#18181B] dark:text-[#FAFAFA] truncate block">
                        {currentOutfit.headwear ? currentOutfit.headwear.name : 'Chưa chọn'}
                      </span>
                    </div>
                    {currentOutfit.headwear && (
                      <button
                        onClick={() => setHeadwear(undefined)}
                        className="text-[#71717A] hover:text-red-500 p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Accessories */}
                  <div className="bg-[#F8F8F7] dark:bg-[#121214] p-2.5 rounded-xl border border-[#E5E5E2] dark:border-[#27272A] flex items-center justify-between">
                    <div className="truncate pr-1">
                      <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] block font-medium">
                        Phụ kiện ({currentOutfit.accessories?.length || 0}/4)
                      </span>
                      <span className="font-semibold text-[#18181B] dark:text-[#FAFAFA] truncate block">
                        {currentOutfit.accessories?.length > 0
                          ? currentOutfit.accessories.map((a) => a.name.split(' ')[0]).join(', ')
                          : 'Chưa thêm'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accessories tag list */}
                {currentOutfit.accessories && currentOutfit.accessories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentOutfit.accessories.map((acc) => (
                      <span
                        key={acc.id}
                        className="inline-flex items-center gap-1.5 text-[11px] bg-[#F8F8F7] dark:bg-[#27272A] text-[#18181B] dark:text-[#FAFAFA] px-2.5 py-1 rounded-md border border-[#E5E5E2] dark:border-[#3F3F46]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A2B] dark:bg-[#E05A47]" />
                        <span className="truncate max-w-[130px] font-medium">{acc.name}</span>
                        <button
                          onClick={() => removeAccessory(acc.id)}
                          className="text-[#71717A] hover:text-red-500 ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons: Save & Export Lookbook */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleSave}
                  disabled={!validationResult.isValid}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                    validationResult.isValid
                      ? 'bg-[#F8F8F7] dark:bg-[#121214] text-[#18181B] dark:text-[#FAFAFA] hover:border-[#9E2A2B] dark:hover:border-[#E05A47] border border-[#E5E5E2] dark:border-[#27272A] active:scale-[0.99]'
                      : 'bg-[#E5E5E2] dark:bg-[#27272A] text-[#71717A] dark:text-[#A1A1AA] cursor-not-allowed border border-[#E5E5E2] dark:border-[#27272A]'
                  }`}
                >
                  <Bookmark className="w-4 h-4 stroke-[2.5]" />
                  <span>Lưu Tủ Đồ</span>
                </button>

                <button
                  onClick={() => setIsExportModalOpen(true)}
                  disabled={!validationResult.isValid}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    validationResult.isValid
                      ? 'bg-gradient-to-r from-[#9E2A2B] to-[#B3393B] hover:from-[#802223] hover:to-[#9E2A2B] dark:from-[#E05A47] dark:to-[#EB6B58] text-white shadow-[#9E2A2B]/20 dark:shadow-[#E05A47]/20 active:scale-[0.99]'
                      : 'bg-[#E5E5E2] dark:bg-[#27272A] text-[#71717A] dark:text-[#A1A1AA] cursor-not-allowed border border-[#E5E5E2] dark:border-[#27272A]'
                  }`}
                >
                  <Share2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Lưu & Chia Sẻ Lookbook</span>
                </button>
              </div>
            </div>

            {/* AI Stylist Advisor Widget (Gemini Flash) */}
            <GeminiStylistWidget />

            {/* Cultural Insight Accordion (Heritage, Keep, Remix, Tet Tips) */}
            <CulturalInsightCard />

            {/* Occasion & Style Selector */}
            <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-5 shadow-sm transition-colors">
              <h3 className="text-xs font-bold text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#9E2A2B] dark:text-[#E05A47]" />
                Ngữ Cảnh Dịp Tết & Vibe Thiết Kế
              </h3>

              {/* Occasion Grid */}
              <div className="mb-4">
                <label className="text-xs text-[#52525B] dark:text-[#D4D4D8] block mb-2 font-semibold">
                  Chọn dịp xuất hiện:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(OCCASIONS_META).map((occ) => {
                    const isOccSelected = currentOutfit.occasion === occ.type;
                    return (
                      <button
                        key={occ.type}
                        onClick={() => setOccasion(occ.type)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          isOccSelected
                            ? 'bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 border-[#9E2A2B] dark:border-[#E05A47] text-[#9E2A2B] dark:text-[#E05A47]'
                            : 'bg-[#F8F8F7] dark:bg-[#121214] border-[#E5E5E2] dark:border-[#27272A] text-[#52525B] dark:text-[#A1A1AA] hover:border-[#9E2A2B]/40 dark:hover:border-[#E05A47]/40'
                        }`}
                      >
                        <span className="font-bold text-xs block text-[#18181B] dark:text-[#FAFAFA]">
                          {occ.label}
                        </span>
                        <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] block line-clamp-1">
                          {occ.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Style Vibe Pills */}
              <div>
                <label className="text-xs text-[#52525B] dark:text-[#D4D4D8] block mb-2 font-semibold">
                  Phong cách thẩm mỹ (Style Vibe):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {Object.values(STYLES_META).map((st) => {
                    const isStSelected = currentOutfit.style === st.vibe;
                    return (
                      <button
                        key={st.vibe}
                        onClick={() => setStyle(st.vibe)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isStSelected
                            ? 'bg-[#9E2A2B] dark:bg-[#E05A47] text-white border-transparent shadow-sm'
                            : 'bg-[#F8F8F7] dark:bg-[#121214] border-[#E5E5E2] dark:border-[#27272A] text-[#52525B] dark:text-[#A1A1AA] hover:border-[#9E2A2B]/40 dark:hover:border-[#E05A47]/40'
                        }`}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Wardrobe Customization Panel (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <WardrobePanel />
          </div>

          {/* Section Feedback ở cuối Trang Chủ (Cộng đồng Gen Z Nói Gì Về TradAI Stylist) */}
          <div className="lg:col-span-12 mt-8 sm:mt-12 pt-6 border-t border-[#E6E1D8] dark:border-white/10">
            <FeedbackSection />
          </div>
        </div>
      )}

      {/* VIEW MODE 2: GỢI Ý NHANH (Style Builder 4-step Wizard) */}
      {viewMode === 'builder' && (
        <div key={`builder-${refreshKey}`} className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
          <StyleBuilder
            onComplete={(outfit) => {
              addToast(`Đã kiến tạo thành công: ${outfit.name}`, 'success', 'Bản phối đã được nạp vào Studio Canvas.');
            }}
          />
        </div>
      )}

      {/* VIEW MODE 3: LOOKBOOK CẢM HỨNG (Inspiration Gallery) */}
      {viewMode === 'gallery' && <InspirationGallery key={`gallery-${refreshKey}`} />}

      {/* VIEW MODE 4: TỦ ĐỒ ĐÃ LƯU (Saved Looks) */}
      {viewMode === 'saved' && <SavedLooks key={`saved-${refreshKey}`} />}

      {/* VIEW MODE 5: LOOKBOOK 2.5D DI SẢN (Master Benchmark Lineup & Solo Showcase) */}
      {viewMode === 'lookbook' && (
        <HeritageLookbookShowcase
          key={`lookbook-${refreshKey}`}
          onEquipOutfitSuccess={(name) => {
            addToast(`Đã mặc bản phối "${name}" lên Studio Canvas!`, 'success', 'Tạo hình 2.5D đồng bộ phong cách tham chiếu.');
          }}
        />
      )}

      {/* Cultural Insight Dialog Modal */}
      {showInsightModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] text-[#18181B] dark:text-[#FAFAFA] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl transition-colors">
            <button
              onClick={() => setShowInsightModal(false)}
              className="absolute top-4 right-4 text-[#71717A] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] p-1.5 rounded-lg hover:bg-[#F8F8F7] dark:hover:bg-[#27272A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-[#9E2A2B] dark:text-[#E05A47]" />
              <h2 className="font-editorial text-xl font-bold">
                Cẩm Nang Triết Lý Cổ Phục Việt
              </h2>
            </div>

            {/* Select garment type */}
            <div className="flex gap-2 mb-5">
              {CULTURAL_INSIGHTS.map((insight) => (
                <button
                  key={insight.garmentId}
                  onClick={() => setSelectedInsightGarment(insight.garmentId as GarmentType)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedInsightGarment === insight.garmentId
                      ? 'bg-[#9E2A2B] dark:bg-[#E05A47] text-white shadow-sm'
                      : 'bg-[#F8F8F7] dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] border border-[#E5E5E2] dark:border-[#27272A]'
                  }`}
                >
                  {insight.garmentName}
                </button>
              ))}
            </div>

            {/* Insight detail */}
            {(() => {
              const activeInsight =
                CULTURAL_INSIGHTS.find((i) => i.garmentId === selectedInsightGarment) ||
                CULTURAL_INSIGHTS[0];

              return (
                <div className="space-y-4 text-xs">
                  <div className="bg-[#F8F8F7] dark:bg-[#121214] p-4 rounded-xl border border-[#E5E5E2] dark:border-[#27272A]">
                    <span className="text-[10px] text-[#9E2A2B] dark:text-[#E05A47] font-bold uppercase tracking-wider block mb-1">
                      Niên đại lịch sử
                    </span>
                    <p className="text-[#18181B] dark:text-[#FAFAFA] leading-relaxed font-medium">
                      {activeInsight.historicalPeriod}
                    </p>
                  </div>

                  <div className="bg-[#F8F8F7] dark:bg-[#121214] p-4 rounded-xl border border-[#E5E5E2] dark:border-[#27272A]">
                    <span className="text-[10px] text-[#9E2A2B] dark:text-[#E05A47] font-bold uppercase tracking-wider block mb-1">
                      Triết lý cốt lõi & Giá trị biểu trưng
                    </span>
                    <p className="text-[#18181B] dark:text-[#FAFAFA] leading-relaxed font-medium">
                      {activeInsight.corePhilosophy}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30 p-3.5 rounded-xl">
                      <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider block mb-2">
                        ✓ Yếu tố BẮT BUỘC giữ nguyên (Bản sắc di sản)
                      </span>
                      <ul className="space-y-1.5 text-emerald-950 dark:text-emerald-200 list-disc list-inside">
                        {activeInsight.keepElements.map((el, i) => (
                          <li key={i}>{el}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-500/30 p-3.5 rounded-xl">
                      <span className="text-[10px] text-blue-800 dark:text-blue-400 font-bold uppercase tracking-wider block mb-2">
                        ✦ Yếu tố Gen Z CÓ THỂ Remix phá cách
                      </span>
                      <ul className="space-y-1.5 text-blue-950 dark:text-blue-200 list-disc list-inside">
                        {activeInsight.remixableElements.map((el, i) => (
                          <li key={i}>{el}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-500/30 p-3.5 rounded-xl">
                    <span className="text-[10px] text-amber-800 dark:text-amber-400 font-bold uppercase tracking-wider block mb-1.5">
                      💡 Mẹo phối đồ đương đại (Modern Tips)
                    </span>
                    <ul className="space-y-1 text-amber-950 dark:text-amber-200 list-disc list-inside">
                      {activeInsight.modernTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowInsightModal(false)}
                className="px-5 py-2.5 bg-[#F8F8F7] dark:bg-[#121214] hover:bg-[#E5E5E2] dark:hover:bg-[#27272A] text-[#18181B] dark:text-[#FAFAFA] rounded-xl text-xs font-bold transition-colors border border-[#E5E5E2] dark:border-[#27272A]"
              >
                Đóng cẩm nang
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Lookbook 9:16 Social Export Modal */}
      <LookbookExportModal
        outfit={currentOutfit}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onSaveWardrobe={() => {
          saveCurrentOutfit();
          addToast('Đã lưu bản phối vào Tủ đồ cá nhân!', 'success', 'Dữ liệu được lưu trữ an toàn.');
        }}
        onShowToast={(msg, type) => addToast(msg, type || 'success')}
      />

      {/* AI Context Scanner Modal (Cyber Y2K Heritage Photo & Prompt Scanner) */}
      <ContextScannerModal
        isOpen={isContextScannerOpen}
        onClose={() => setIsContextScannerOpen(false)}
        onApplyRecommendation={(analysis) => {
          addToast(
            'Gemini AI đã phân tích bối cảnh & thiết lập Studio!',
            'success',
            `Không gian: ${analysis.environment}`
          );
        }}
      />

      {/* Quick Ask AI Stylist Bar / Popup Drawer */}
      <QuickChatDrawer
        isOpen={isQuickChatOpen}
        onToggle={() => setIsQuickChatOpen(!isQuickChatOpen)}
        initialPrompt={quickChatPrompt}
        onShowToast={(msg, type) => addToast(msg, type || 'success')}
      />

      {/* Floating Action Button: Đánh Giá & Góp Ý (Cyber Y2K Glassmorphism) */}
      <FeedbackFAB />

      {/* Modal Form: Đánh Giá & Góp Ý Bản Phối */}
      <FeedbackModal
        onShowToast={(msg, type, sub) => addToast(msg, type || 'success', sub)}
      />
    </AppShell>
  );
}
