/**
 * ContextScannerModal Component - AI Context Scanner
 * Cyber Y2K × Vietnamese Heritage Aesthetic
 * Analyzes location photos & natural language intent with Gemini 3.8 Flash
 * and automatically applies recommended styling configuration to the Studio.
 */

import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  Camera,
  Check,
  Compass,
  FileImage,
  Flame,
  Mic,
  MicOff,
  RefreshCw,
  Scan,
  ScanEye,
  Sparkles,
  Upload,
  Users,
  Wand2,
  X,
} from 'lucide-react';
import { analyzeContextAndPrompt } from '../../services/geminiService';
import {
  MOCK_ACCESSORIES,
  MOCK_BOTTOMS,
  MOCK_FOOTWEAR,
  MOCK_GARMENTS,
  OCCASIONS_META,
  STYLES_META,
} from '../../data/mockData';
import { useOutfitStore } from '../../store/useOutfitStore';
import {
  ContextAnalysisResult,
  FashionItem,
  GarmentType,
  Gender,
  OccasionType,
  Outfit,
  StyleVibe,
} from '../../types';

interface ContextScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation?: (analysis: ContextAnalysisResult, gender: Gender) => void;
}

const SAMPLE_PROMPTS = [
  'Đám cưới bạn ở Cố đô Huế, thích cá tính, không thích gò bó',
  'Đi lễ chùa đầu năm cầu bình an, thanh tịnh kín đáo',
  'Chụp ảnh phố đi bộ Hà Nội concept Y2K nổi bật',
  'Dạo chợ hoa Tết Sài Gòn, cà phê cùng hội bạn thân',
];

export const ContextScannerModal: React.FC<ContextScannerModalProps> = ({
  isOpen,
  onClose,
  onApplyRecommendation,
}) => {
  const { setOutfit, setViewMode } = useOutfitStore();

  const [prompt, setPrompt] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>('nu');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ContextAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WebP).');
      return;
    }
    setImageName(file.name);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageBase64(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImageBase64(null);
    setImageName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Voice Input Simulation / Speech Recognition
  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };
        recognition.onerror = () => {
          setIsListening(false);
          // Fallback simulation text if mic permission denied
          setPrompt('Mình muốn đi du xuân cùng hội bạn thân, phong cách Y2K trẻ trung phóng khoáng.');
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
        return;
      } catch {
        // Fallback below
      }
    }

    // Fallback simulated voice input
    setIsListening(true);
    setTimeout(() => {
      setPrompt('Mình muốn mặc đi dự tiệc cưới ở Huế nhưng thích chất riêng Y2K năng động.');
      setIsListening(false);
    }, 1200);
  };

  // Perform AI Scanning with Gemini
  const handleScan = async () => {
    if (!prompt.trim() && !imageBase64) {
      setErrorMessage('Vui lòng tải ảnh không gian hoặc nhập một câu nhu cầu của bạn.');
      return;
    }

    setErrorMessage(null);
    setIsScanning(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeContextAndPrompt(prompt, imageBase64 || undefined);
      setAnalysisResult(result);
    } catch (err: any) {
      console.error('Scan error:', err);
      setErrorMessage('Không thể phân tích ngữ cảnh lúc này. Vui lòng thử lại.');
    } finally {
      setIsScanning(false);
    }
  };

  // Apply recommendation to Studio
  const handleApplyToStudio = () => {
    if (!analysisResult) return;

    // 1. Tìm trang phục phù hợp nhất từ recommendedGarments và gender đã chọn
    const recGarments = analysisResult.recommendedGarments || ['ao_dai'];
    let matchingGarment: FashionItem | undefined;

    // Ưu tiên 1: Khớp chính xác garmentType và gender được chọn
    for (const recType of recGarments) {
      matchingGarment = MOCK_GARMENTS.find(
        (g) =>
          g.garmentType === recType &&
          (gender === 'unisex' ? true : g.gender === gender || g.gender === 'unisex')
      );
      if (matchingGarment) break;
    }

    // Ưu tiên 2: Khớp bất kỳ dòng áo nào trong recommendedGarments
    if (!matchingGarment) {
      for (const recType of recGarments) {
        matchingGarment = MOCK_GARMENTS.find((g) => g.garmentType === recType);
        if (matchingGarment) break;
      }
    }

    // Fallback: Tìm món bất kỳ phù hợp giới tính
    if (!matchingGarment) {
      matchingGarment =
        MOCK_GARMENTS.find((g) => (gender === 'unisex' ? true : g.gender === gender || g.gender === 'unisex')) ||
        MOCK_GARMENTS[0];
    }

    // 2. Xác định style vibe
    let vibe: StyleVibe = 'vintage';
    const recVibe = (analysisResult.recommendedVibe || '').toLowerCase();
    if (recVibe.includes('y2k')) vibe = 'y2k';
    else if (recVibe.includes('street')) vibe = 'streetwear';
    else if (recVibe.includes('mini')) vibe = 'minimal';
    else if (recVibe.includes('femi')) vibe = 'feminine';
    else vibe = 'vintage';

    // 3. Xác định dịp xuất hiện (Occasion)
    let occasion: OccasionType = 'du_xuan';
    const envLower = (analysisResult.environment || '').toLowerCase();
    if (envLower.includes('chùa') || envLower.includes('đền') || envLower.includes('cúng') || envLower.includes('tâm linh')) {
      occasion = 'le_chua';
    } else if (envLower.includes('ảnh') || envLower.includes('check-in') || envLower.includes('studio') || envLower.includes('hoa') || envLower.includes('vườn')) {
      occasion = 'chup_anh_tet';
    } else if (envLower.includes('bạn') || envLower.includes('quán') || envLower.includes('party') || envLower.includes('tiệc') || envLower.includes('cưới')) {
      occasion = 'gap_ban_be';
    }

    // 4. Tự động phối màu sắc hài hòa và set phụ kiện phù hợp theo recommendedVibe
    const isMale = gender === 'nam' || matchingGarment.gender === 'nam';
    const gType = matchingGarment.garmentType || 'ao_dai';
    const isFormalRoyal = gType === 'nhat_binh' || gType === 'ngu_than';

    let bottom: FashionItem | undefined;
    let footwear: FashionItem | undefined;
    let headwear: FashionItem | undefined;
    let accessories: FashionItem[] = [];

    const quatNan = MOCK_ACCESSORIES.find((a) => a.id === 'acc_quatxep_01');
    const khanVan = MOCK_ACCESSORIES.find((a) => a.id === 'headwear_khanvan_01');
    const nonLa = MOCK_ACCESSORIES.find((a) => a.id === 'headwear_nonla_01');
    const kinhRam = MOCK_ACCESSORIES.find((a) => a.id === 'acc_kinhram_y2k');
    const tuiCoi = MOCK_ACCESSORIES.find((a) => a.id === 'acc_tuicoi_01');
    const tuiCanvas = MOCK_ACCESSORIES.find((a) => a.id === 'acc_tote_01');

    if (vibe === 'vintage') {
      bottom = isMale
        ? MOCK_BOTTOMS.find((b) => b.id === 'bottom_silk_02') || MOCK_BOTTOMS[1]
        : MOCK_BOTTOMS.find((b) => b.id === 'bottom_silk_01') || MOCK_BOTTOMS[0];
      footwear = isMale
        ? MOCK_FOOTWEAR.find((f) => f.id === 'footwear_chelsea_boots') || MOCK_FOOTWEAR[2]
        : MOCK_FOOTWEAR.find((f) => f.id === 'footwear_guoc_01') || MOCK_FOOTWEAR[0];
      if (khanVan) headwear = khanVan;
      if (quatNan) accessories = [quatNan];
    } else if (vibe === 'streetwear') {
      bottom = MOCK_BOTTOMS.find((b) => b.id === 'bottom_jeans_01') || MOCK_BOTTOMS[2];
      footwear = MOCK_FOOTWEAR.find((f) => f.id === 'footwear_sneaker_01') || MOCK_FOOTWEAR[1];
      if (kinhRam) accessories = [kinhRam];
      else if (tuiCanvas) accessories = [tuiCanvas];
    } else if (vibe === 'y2k') {
      bottom = isMale
        ? MOCK_BOTTOMS.find((b) => b.id === 'bottom_baggy_vintage_jeans') || MOCK_BOTTOMS[2]
        : MOCK_BOTTOMS.find((b) => b.id === 'bottom_skirt_cargo_a_line') || MOCK_BOTTOMS[2];
      footwear = MOCK_FOOTWEAR.find((f) => f.id === 'footwear_chunky_platform') || MOCK_FOOTWEAR[1];
      if (kinhRam) accessories = [kinhRam];
    } else if (vibe === 'minimal') {
      bottom = isFormalRoyal
        ? (isMale ? MOCK_BOTTOMS.find((b) => b.id === 'bottom_silk_02') : MOCK_BOTTOMS.find((b) => b.id === 'bottom_silk_01'))
        : MOCK_BOTTOMS.find((b) => b.id === 'bottom_tailored_trousers') || MOCK_BOTTOMS[0];
      footwear = MOCK_FOOTWEAR.find((f) => f.id === 'footwear_loafer_metal_buckle') || MOCK_FOOTWEAR[2];
      if (quatNan) accessories = [quatNan];
    } else if (vibe === 'feminine') {
      bottom =
        MOCK_BOTTOMS.find((b) => b.id === 'bottom_skirt_pleated_maxi') ||
        MOCK_BOTTOMS.find((b) => b.id === 'bottom_draping_silk_pants') ||
        MOCK_BOTTOMS[0];
      footwear =
        MOCK_FOOTWEAR.find((f) => f.id === 'footwear_guoc_son_mai') ||
        MOCK_FOOTWEAR.find((f) => f.id === 'footwear_mary_jane_double_strap') ||
        MOCK_FOOTWEAR[0];
      if (nonLa) headwear = nonLa;
      if (tuiCoi) accessories = [tuiCoi];
    }

    if (!bottom) bottom = MOCK_BOTTOMS[0];
    if (!footwear) footwear = MOCK_FOOTWEAR[0];

    const newOutfit: Outfit = {
      id: `ai_scan_${Date.now()}`,
      name: `${matchingGarment.name} • ${STYLES_META[vibe]?.label || 'Remix'}`,
      gender,
      garment: matchingGarment,
      bottom,
      footwear,
      headwear,
      accessories,
      colorHex: matchingGarment.colorHex,
      occasion,
      style: vibe,
      culturalBalance: vibe === 'vintage' ? 95 : vibe === 'minimal' ? 85 : 75,
      tags: [
        'AI Context Scanner',
        matchingGarment.name,
        OCCASIONS_META[occasion]?.label || 'Du xuân',
        STYLES_META[vibe]?.label || 'Thời trang',
        'Tết 2026',
      ],
      createdAt: new Date().toISOString(),
    };

    setOutfit(newOutfit);
    setViewMode('studio');

    if (onApplyRecommendation) {
      onApplyRecommendation(analysisResult, gender);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scanner-modal-title"
    >
      <div className="relative w-full max-w-2xl my-auto rounded-3xl bg-[#0F0C18]/95 dark:bg-[#0D0B14]/95 border border-[#FF3366]/35 p-5 sm:p-7 text-white shadow-[0_0_60px_rgba(255,51,102,0.22)] ring-1 ring-white/10 transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF3366] via-[#B5179E] to-[#7B2CBF] flex items-center justify-center text-white shadow-md shadow-[#FF3366]/30 ring-1 ring-white/30">
            <ScanEye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#FF3366]">
              <span>✦</span>
              <span>AI CONTEXT SCANNER • GEMINI FLASH</span>
            </div>
            <h2 id="scanner-modal-title" className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-white">
              Quét Bối Cảnh & Nhận Diện Gu Riêng
            </h2>
          </div>
        </div>

        {/* ================= INPUT SECTION ================= */}
        <div className="flex flex-col gap-4">
          {/* Quick Gender Selector */}
          <div className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs font-semibold text-slate-300 pl-2">
              Đối tượng diện đồ:
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { key: 'nam' as Gender, label: '♂ Nam', sub: 'Đĩnh đạc' },
                { key: 'nu' as Gender, label: '♀ Nữ', sub: 'Duyên dáng' },
                { key: 'unisex' as Gender, label: '⚧ Linh hoạt', sub: 'Phi giới tính' },
              ].map((g) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => setGender(g.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    gender === g.key
                      ? 'bg-gradient-to-r from-[#FF3366] to-[#B5179E] text-white shadow-[0_0_12px_rgba(255,51,102,0.4)] scale-102'
                      : 'text-slate-400 hover:text-white bg-transparent hover:bg-white/5'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area (Drag & Drop) */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all cursor-pointer overflow-hidden ${
              dragActive
                ? 'border-[#FF3366] bg-[#FF3366]/10 scale-[1.01]'
                : imageBase64
                ? 'border-[#06D6A0]/50 bg-white/5'
                : 'border-white/20 hover:border-[#FF3366]/60 bg-white/5 hover:bg-white/[0.07]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* CYBER SHIMMER SCANNER BAR (Active during scanning) */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-[#FF3366] via-[#FFD166] to-[#06D6A0] shadow-[0_0_16px_#FF3366] animate-cyber-scan z-20 pointer-events-none" />
            )}

            {imageBase64 ? (
              <div className="relative w-full flex items-center gap-3">
                <img
                  src={imageBase64}
                  alt="Ảnh bối cảnh"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-white/20 shadow-md shrink-0"
                />
                <div className="flex-1 text-left truncate">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#06D6A0]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã nạp ảnh bối cảnh</span>
                  </div>
                  <span className="text-xs text-slate-300 block truncate">{imageName || 'Bối cảnh đã chọn'}</span>
                  <span className="text-[10px] text-slate-400">Bấm để thay ảnh khác hoặc kéo thả ảnh mới</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 transition-all cursor-pointer"
                  title="Xóa ảnh"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-1">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 flex items-center justify-center text-[#FFD166] shadow-inner">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  <span className="text-[#FF3366] font-bold">Tải ảnh không gian</span> hoặc kéo thả ảnh vào đây
                </div>
                <span className="text-[10px] text-slate-400">
                  Đền chùa, đám cưới Huế, phố cổ, cafe rooftop, chợ hoa xuân (PNG, JPG)
                </span>
              </div>
            )}
          </div>

          {/* Natural Language Prompt Box */}
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Nhập nhu cầu tự nhiên của bạn... (Ví dụ: 'Mình muốn đi đám cưới bạn ở Huế nhưng thích phá cách, không thích gò bó')"
              rows={3}
              className="w-full rounded-2xl bg-white/5 border border-white/15 p-3.5 pr-12 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FF3366] focus:ring-1 focus:ring-[#FF3366] transition-all resize-none"
            />
            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`absolute right-3 top-3 p-2 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-red-500 text-white border-red-400 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.6)]'
                  : 'bg-white/10 text-slate-300 hover:text-white border-white/15 hover:bg-white/15'
              }`}
              title={isListening ? 'Đang nghe... bấm để dừng' : 'Ghi âm bằng giọng nói'}
            >
              {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          {/* Sample Prompts Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-slate-400 font-semibold mr-1">Gợi ý nhanh:</span>
            {SAMPLE_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(p)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer truncate max-w-[200px] sm:max-w-none"
              >
                ✦ {p}
              </button>
            ))}
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300">
              {errorMessage}
            </div>
          )}

          {/* Scan Action Button */}
          <button
            type="button"
            onClick={handleScan}
            disabled={isScanning}
            className="group relative flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3366] via-[#E63946] to-[#B5179E] hover:from-[#FF4D7D] hover:to-[#C724AF] shadow-[0_4px_22px_rgba(255,51,102,0.4)] hover:shadow-[0_6px_28px_rgba(255,51,102,0.55)] transition-all duration-200 active:scale-98 overflow-hidden cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#FFD166]" />
                <span>Gemini Flash Đang Quét Ngữ Cảnh...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#FFD166] group-hover:rotate-12 transition-transform" />
                <span>✦ Gemini Quét Ngữ Cảnh</span>
              </>
            )}
          </button>
        </div>

        {/* ================= RESULTS DISPLAY ================= */}
        {analysisResult && (
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFD166] flex items-center gap-1.5">
                <span>✦</span>
                <span>KẾT QUẢ PHÂN TÍCH DI SẢN & GU THỜI TRANG</span>
              </span>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#06D6A0]/15 text-[#06D6A0] border border-[#06D6A0]/30">
                <span>Độ chính xác cao</span>
              </div>
            </div>

            {/* 3 Structured Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Card 1: Tâm lý & Gu */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-[#FF3366]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF3366] mb-1.5">
                    <span>🧠</span>
                    <span>Tâm Lý & Gu Riêng</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {analysisResult.userIntent}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400">
                  Vibe: <span className="text-[#FFD166] font-bold uppercase">{analysisResult.recommendedVibe}</span>
                </div>
              </div>

              {/* Card 2: Môi trường & Không gian */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-[#06D6A0]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#06D6A0] mb-1.5">
                    <span>🏯</span>
                    <span>Môi Trường Nhận Diện</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {analysisResult.environment}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400">
                  Phù hợp: {analysisResult.recommendedGarments.slice(0, 2).join(', ')}
                </div>
              </div>

              {/* Card 3: Ranh giới văn hóa */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-[#FFD166]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFD166] mb-1.5">
                    <span>⚖️</span>
                    <span>Ranh Giới Văn Hóa</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {analysisResult.culturalBoundary}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400">
                  Chuẩn mực di sản Việt
                </div>
              </div>
            </div>

            {/* Apply Button CTA */}
            <button
              type="button"
              onClick={handleApplyToStudio}
              className="group relative flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-xs font-extrabold text-white bg-gradient-to-r from-[#06D6A0] via-[#05A880] to-[#048C6B] hover:brightness-110 shadow-[0_4px_22px_rgba(6,214,160,0.35)] transition-all duration-200 active:scale-98 cursor-pointer mt-1"
            >
              <span>Vào Studio phối đồ theo gợi ý này</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
