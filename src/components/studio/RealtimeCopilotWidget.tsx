/**
 * RealtimeCopilotWidget Component - Trợ Lý Stylist Phản Hồi Thời Gian Thực
 * Cyber Y2K × Vietnamese Heritage Style
 * Features 300ms debounce, instant heuristic response, non-blocking background Gemini evaluation,
 * and a sleek neon circular match score progress ring.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  RefreshCw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { evaluateOutfitRealtime } from '../../services/geminiService';
import { useOutfitStore } from '../../store/useOutfitStore';
import { CopilotFeedback, Outfit } from '../../types';

interface RealtimeCopilotWidgetProps {
  className?: string;
}

// In-memory fast cache to prevent redundant API calls
const feedbackCache = new Map<string, CopilotFeedback>();

/**
 * Helper to compute RGB to Hue (0 - 360)
 */
function rgbToHue(r: number, g: number, b: number): number {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min) return 0;
  const d = max - min;
  let h = 0;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else if (max === b) h = (r - g) / d + 4;
  return h * 60;
}

/**
 * Evaluates color harmony between two hex colors:
 * - 'tone_sur_tone' (+15)
 * - 'complementary' (+10)
 * - 'neutral' (+10)
 * - 'conflict' (-10)
 */
function evaluateColorHarmony(hex1?: string, hex2?: string): 'tone_sur_tone' | 'complementary' | 'neutral' | 'conflict' {
  if (!hex1 || !hex2) return 'neutral';
  const c1 = hex1.replace('#', '').toUpperCase();
  const c2 = hex2.replace('#', '').toUpperCase();

  if (c1 === c2) return 'tone_sur_tone';

  const neutralHexes = ['FFFFFF', 'F8F9FA', '121212', '111827', '212529', 'F0EBD8', 'FAF0CA', 'FAF9F6', '2B2D42', 'E9ECEF'];
  if (neutralHexes.includes(c1) || neutralHexes.includes(c2)) {
    return 'complementary';
  }

  const r1 = parseInt(c1.substring(0, 2), 16) || 0;
  const g1 = parseInt(c1.substring(2, 4), 16) || 0;
  const b1 = parseInt(c1.substring(4, 6), 16) || 0;
  const r2 = parseInt(c2.substring(0, 2), 16) || 0;
  const g2 = parseInt(c2.substring(2, 4), 16) || 0;
  const b2 = parseInt(c2.substring(4, 6), 16) || 0;

  const h1 = rgbToHue(r1, g1, b1);
  const h2 = rgbToHue(r2, g2, b2);
  const diff = Math.abs(h1 - h2);

  if (diff <= 35 || diff >= 325) {
    return 'tone_sur_tone';
  }
  if ((diff >= 150 && diff <= 210) || (diff >= 100 && diff <= 140)) {
    return 'complementary';
  }
  if (diff > 50 && diff < 100) {
    return 'conflict';
  }
  return 'neutral';
}

/**
 * Computes fast immediate heuristic feedback so the UI never stutters or waits.
 * Base score starts at 70, with dynamic additions/subtractions spanning 45 - 98 points.
 */
export function computeInstantHeuristic(outfit: Outfit): CopilotFeedback {
  const garment = outfit.garment;
  const bottom = outfit.bottom;
  const footwear = outfit.footwear;
  const garmentName = garment?.name || 'Áo Cổ Phục';
  const garmentType = garment?.garmentType || 'ao_dai';
  const bottomName = bottom?.name || 'Quần';
  const footwearName = footwear?.name || 'Giày dép';
  const accCount = outfit.accessories?.length || 0;

  // 1. Khởi tạo điểm cơ bản từ 70
  let score = 70;
  let balanceScore = outfit.culturalBalance ?? 75;
  const stylistNotes: string[] = [];

  const isFormalRoyal =
    garmentType === 'nhat_binh' ||
    garmentType === 'ngu_than' ||
    garmentName.toLowerCase().includes('nhật bình') ||
    garmentName.toLowerCase().includes('ngũ thân');

  const bottomTags = (bottom?.tags || []).map((t) => t.toLowerCase());
  const bottomNameLower = (bottom?.name || '').toLowerCase();
  const footwearTags = (footwear?.tags || []).map((t) => t.toLowerCase());
  const footwearNameLower = (footwear?.name || '').toLowerCase();

  // Nhận diện lỗi trang phục: quần short ngắn, váy lửng quá gối hoặc dép lê
  const isShortBottom =
    bottomNameLower.includes('short') ||
    bottomNameLower.includes('ngắn') ||
    bottomNameLower.includes('lửng') ||
    bottomNameLower.includes('mini') ||
    bottomTags.some((t) => t.includes('short') || t.includes('ngắn') || t.includes('lửng') || t.includes('mini'));

  const isCasualFootwear =
    footwearNameLower.includes('dép') ||
    footwearNameLower.includes('tông') ||
    footwearNameLower.includes('sandal') ||
    footwearTags.some((t) => t.includes('dép') || t.includes('tông') || t.includes('sandal') || t.includes('xỏ ngón'));

  const hasSilkBottom = bottomTags.some((t) => t.includes('lụa')) || bottomNameLower.includes('lụa');
  const hasTailoredTrouser = bottomTags.some((t) => t.includes('tây') || t.includes('may đo') || t.includes('cashmere')) || bottomNameLower.includes('tây');
  const hasMaxiSkirt = bottomTags.some((t) => t.includes('maxi') || t.includes('xếp ly dài')) || bottomNameLower.includes('maxi');
  const hasDenim = bottomTags.some((t) => t.includes('denim') || t.includes('jean')) || bottomNameLower.includes('jean');

  const isSneaker = footwearTags.some((t) => t.includes('sneaker') || t.includes('thể thao')) || footwearNameLower.includes('sneaker');
  const isWhiteSneaker = isSneaker && (footwearTags.some((t) => t.includes('trắng')) || footwearNameLower.includes('trắng') || footwear?.colorHex?.toUpperCase() === '#FFFFFF');
  const isTraditionalShoes = footwearTags.some((t) => t.includes('guốc') || t.includes('mộc') || t.includes('sơn mài')) || footwearNameLower.includes('guốc');
  const isLoaferOrBoots = footwearTags.some((t) => t.includes('loafer') || t.includes('boots') || t.includes('mary jane')) || footwearNameLower.includes('loafer');

  // --- TRỪ ĐIỂM XUNG ĐỘT (Phối xấu / Lỗi phong cách) ---

  // Xung đột nghiêm trọng: Trang phục trang trọng (Nhật Bình, Ngũ Thân) phối quần short ngắn hoặc dép lê (-35 điểm)
  let hasSevereConflict = false;
  if (isFormalRoyal && (isShortBottom || isCasualFootwear)) {
    score -= 35;
    balanceScore = Math.max(15, balanceScore - 40);
    hasSevereConflict = true;
    stylistNotes.push(
      `Cảnh báo phá vỡ chuẩn mực: ${garmentName} là dòng trang phục cung đình tôn nghiêm, phối cùng ${isShortBottom ? bottomName : footwearName} ngắn/xuề xòa làm phá vỡ phom dáng đoan chính của cổ phục!`
    );
  }

  // Phụ kiện quá tải: hơn 3 phụ kiện hầm hố chen lấn tà áo (-15 điểm)
  if (accCount > 3) {
    score -= 15;
    balanceScore = Math.max(25, balanceScore - 15);
    stylistNotes.push(
      `Set đồ đang bị quá tải phụ kiện (${accCount} món), các chi tiết rườm rà đang lấn át vẻ đẹp thanh thoát của tà áo.`
    );
  }

  // Xung đột màu sắc gay gắt không chủ đích (-10 điểm)
  const garmentHex = outfit.colorHex || garment?.colorHex || '#C53030';
  const bottomHex = bottom?.colorHex || '#F8F9FA';
  const colorHarmony = evaluateColorHarmony(garmentHex, bottomHex);

  if (colorHarmony === 'conflict') {
    score -= 10;
    stylistNotes.push('Sắc độ giữa áo và quần có độ chỏi gắt, thiếu màu trung tính chuyển tiếp mềm mại.');
  } else if (colorHarmony === 'tone_sur_tone') {
    score += 15;
    stylistNotes.push('Phối màu tone-sur-tone liền mạch tạo hiệu ứng kéo dài đôi chân cực kỳ thanh thoát.');
  } else if (colorHarmony === 'complementary') {
    score += 10;
    stylistNotes.push('Bảng màu tương sinh/bổ trợ giúp tà áo nổi bật mà vẫn hòa hợp và dịu mắt.');
  }

  // --- CỘNG ĐIỂM HÀI HÒA & ĐÚNG QUY TẮC PHOM DÁNG ---

  // Đúng quy tắc phom dáng (+10 điểm)
  if (!isShortBottom) {
    if (garmentType === 'ao_dai' && (hasSilkBottom || hasMaxiSkirt)) {
      score += 10;
      balanceScore = Math.min(95, balanceScore + 10);
      stylistNotes.push('Tà áo dài buông lướt trên nền quần lụa suông/váy maxi tạo dòng chảy thị giác mềm mại kinh điển.');
    } else if (garmentType === 'ngu_than' && (hasSilkBottom || hasTailoredTrouser)) {
      score += 10;
      balanceScore = Math.min(95, balanceScore + 10);
      stylistNotes.push('Áo ngũ thân tay chẽn phối cùng quần âu/lụa đứng dáng mang lại thần thái đĩnh đạc, quý phái.');
    } else if (garmentType === 'ba_ba' && hasSilkBottom) {
      score += 10;
      stylistNotes.push('Áo bà ba xẻ tà phối quần lụa suông mềm mại, tôn trọn nét duyên dáng Nam Bộ.');
    } else if (garmentType === 'tu_than' && (hasSilkBottom || hasMaxiSkirt)) {
      score += 10;
      stylistNotes.push('Vạt áo tứ thân buộc chéo trên nền quần suông rủ giữ trọn vẹn nét e ấp Kinh Bắc.');
    }
  }

  // Phá cách hợp lý (+8 điểm)
  if (garmentType === 'ao_dai' && isWhiteSneaker) {
    score += 8;
    stylistNotes.push('Điểm xuyết sneaker trắng tối giản vừa bảo vệ gấu tà khi du xuân dạo phố vừa tạo vibe Gen Z cực năng động!');
  } else if (garmentType === 'ao_dai' && hasDenim) {
    score += 8;
    stylistNotes.push('Combo áo dài truyền thống với quần jeans ống đứng tạo sự giao thoa độc đáo giữa nét thướt tha và streetwear.');
  } else if (isTraditionalShoes && (isFormalRoyal || garmentType === 'ao_dai' || garmentType === 'tu_than')) {
    score += 8;
    balanceScore = Math.min(98, balanceScore + 8);
    stylistNotes.push('Đôi guốc mộc sơn mài nâng gót mộc mạc, tôn trọn cốt cách đoan trang truyền thống.');
  } else if (isLoaferOrBoots && (garmentType === 'ngu_than' || garmentType === 'ao_dai')) {
    score += 7;
    stylistNotes.push('Giày loafer/chelsea boots đem lại vẻ đẹp tân thời, lịch thiệp và chỉn chu cho set cổ phục.');
  }

  // Đảm bảo điểm số trải đều từ 45 đến 98 điểm tuỳ bản phối, không cố định ở 92
  const finalMatchScore = Math.min(98, Math.max(45, score));
  const finalBalanceScore = Math.min(100, Math.max(10, balanceScore));

  let finalComment = stylistNotes.join(' ');
  if (!finalComment) {
    finalComment = `Bản phối ${garmentName} cùng ${bottomName} và ${footwearName} đạt độ cân đối ổn định, giữ được nét thanh nhã du xuân.`;
  }

  // Fun facts di sản
  let fact = 'Hệ 5 cúc khuy cài lệch bên phải của áo ngũ thân tượng trưng cho Ngũ Thường: Nhân, Lễ, Nghĩa, Trí, Tín.';
  if (garmentType === 'ao_dai') {
    fact = 'Đường xẻ tà áo dài ngang hông bắt nguồn từ áo ngũ thân, giúp cử động thoải mái mà vẫn giữ vẻ thanh thoát.';
  } else if (garmentType === 'ba_ba') {
    fact = 'Áo bà ba xẻ tà hông với hai túi đắp tiện dụng là biểu tượng phóng khoáng gắn bó với miền sông nước Nam Bộ.';
  } else if (garmentType === 'nhat_binh') {
    fact = 'Cổ áo hình chữ nhật của áo Nhật Bình được ghép từ các dải màu ngũ sắc tượng trưng cho Ngũ Hành tương sinh.';
  } else if (garmentType === 'giao_linh') {
    fact = 'Áo Giao Lĩnh cổ chéo là dáng áo tôn nghiêm thịnh hành suốt thời Lý - Trần - Hậu Lê của nước ta.';
  } else if (garmentType === 'tu_than') {
    fact = 'Áo Tứ Thân gồm 4 vạt, 2 vạt sau may sống lưng và 2 vạt trước buộc chéo tạo nét duyên dáng của phụ nữ Kinh Bắc.';
  }

  return {
    matchScore: finalMatchScore,
    balanceScore: finalBalanceScore,
    stylistComment: finalComment,
    culturalFact: fact,
  };
}

export const RealtimeCopilotWidget: React.FC<RealtimeCopilotWidgetProps> = ({
  className = '',
}) => {
  const { currentOutfit } = useOutfitStore();

  // Create unique fingerprint of the outfit state
  const outfitFingerprint = useMemo(() => {
    const accIds = (currentOutfit.accessories || []).map((a) => a.id).sort().join(',');
    return `${currentOutfit.garment?.id || ''}|${currentOutfit.colorHex}|${currentOutfit.bottom?.id || ''}|${currentOutfit.footwear?.id || ''}|${currentOutfit.headwear?.id || ''}|${accIds}|${currentOutfit.occasion}|${currentOutfit.style}`;
  }, [currentOutfit]);

  // Initial fast heuristic state
  const [feedback, setFeedback] = useState<CopilotFeedback>(() => {
    return feedbackCache.get(outfitFingerprint) || computeInstantHeuristic(currentOutfit);
  });
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [showFact, setShowFact] = useState<boolean>(true);

  // Debounce ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Immediately display instant heuristic (<0.1s response)
    const cached = feedbackCache.get(outfitFingerprint);
    if (cached) {
      setFeedback(cached);
      setIsEvaluating(false);
      return;
    }

    const instant = computeInstantHeuristic(currentOutfit);
    setFeedback(instant);

    // 2. Debounce 300ms before calling Gemini API refinement
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsEvaluating(true);

    timerRef.current = setTimeout(async () => {
      try {
        const result = await evaluateOutfitRealtime(
          currentOutfit,
          currentOutfit.occasion === 'le_chua'
            ? 'Đi lễ đền chùa đầu năm'
            : currentOutfit.occasion === 'chup_anh_tet'
            ? 'Chụp ảnh dạo phố Tết'
            : 'Du xuân cùng bạn bè'
        );

        if (result && result.stylistComment) {
          feedbackCache.set(outfitFingerprint, result);
          setFeedback(result);
        }
      } catch (err) {
        // Fallback remains the computed instant heuristic
        console.warn('Realtime copilot evaluation fallback:', err);
      } finally {
        setIsEvaluating(false);
      }
    }, 300);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [outfitFingerprint, currentOutfit]);

  // Calculate score circle attributes
  const score = Math.min(100, Math.max(0, feedback.matchScore));
  const circleRadius = 24;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine score color theme
  let scoreColorHex = '#06D6A0'; // Neon Mint (high score)
  let scoreTextClass = 'text-[#06D6A0]';
  let glowColor = 'rgba(6,214,160,0.35)';

  if (score < 70) {
    scoreColorHex = '#FF3366'; // Cyber Pink
    scoreTextClass = 'text-[#FF3366]';
    glowColor = 'rgba(255,51,102,0.35)';
  } else if (score < 85) {
    scoreColorHex = '#FFD166'; // Warm Gold
    scoreTextClass = 'text-[#FFD166]';
    glowColor = 'rgba(255,209,102,0.35)';
  }

  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-br from-[#120F1D]/95 via-[#181224]/95 to-[#0D0A14]/95 border border-[#FF3366]/30 p-4 text-white shadow-[0_8px_30px_rgba(255,51,102,0.12)] backdrop-blur-md transition-all duration-300 ${className}`}
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20 transition-all duration-500"
        style={{ backgroundColor: scoreColorHex }}
      />

      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#FF3366] to-[#B5179E] flex items-center justify-center text-white shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF3366]">
                STYLIST COPILOT
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06D6A0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06D6A0]" />
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-300 block">
              Phản Hồi Trực Tiếp • Realtime
            </span>
          </div>
        </div>

        {/* Evaluating Indicator */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          {isEvaluating ? (
            <span className="inline-flex items-center gap-1 text-[#FFD166] animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Đang lắng nghe...</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[#06D6A0]">
              <CheckCircle2 className="w-3 h-3" />
              <span>Tức thì (0.3s)</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content: Circular Match Score Ring + Gen Z Stylist Comment */}
      <div className="flex items-start gap-3.5">
        {/* Neon Circular Progress Ring */}
        <div className="relative shrink-0 flex flex-col items-center justify-center">
          <div
            className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500"
            style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
          >
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60">
              {/* Background Track */}
              <circle
                cx="30"
                cy="30"
                r={circleRadius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="4"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="30"
                cy="30"
                r={circleRadius}
                fill="none"
                stroke={scoreColorHex}
                strokeWidth="4.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            {/* Score Text in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-base font-black tracking-tight leading-none ${scoreTextClass}`}>
                {score}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                Điểm
              </span>
            </div>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">
            Ăn ý
          </span>
        </div>

        {/* Stylist Gen Z Comment Card */}
        <div className="flex-1 min-w-0">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors relative">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FFD166] mb-1">
              <Sparkles className="w-3 h-3 text-[#FFD166]" />
              <span>Góc Nhìn Stylist:</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium italic">
              "{feedback.stylistComment}"
            </p>
          </div>
        </div>
      </div>

      {/* Cultural Fun Fact Accordion / Pill */}
      {feedback.culturalFact && (
        <div className="mt-3 pt-2.5 border-t border-white/10">
          <button
            type="button"
            onClick={() => setShowFact(!showFact)}
            className="w-full flex items-center justify-between text-left text-[11px] font-bold text-[#06D6A0] hover:text-[#06D6A0]/80 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Fun Fact Di Sản Về Món Đồ</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              {showFact ? 'Thu gọn ▲' : 'Xem thêm ▼'}
            </span>
          </button>

          {showFact && (
            <p className="mt-1.5 text-[11px] text-slate-300 leading-relaxed bg-[#06D6A0]/10 border border-[#06D6A0]/25 rounded-xl p-2.5 animate-in fade-in duration-200">
              ✦ {feedback.culturalFact}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
