/**
 * Gemini AI Fashion Stylist & Cultural Copilot Service
 * Powered by Google Gemini API (model: gemini-flash-latest) with Structured JSON Outputs.
 * Provides real-time context analysis, outfit evaluation, cultural guardrails, and historical storytelling.
 */

import { GoogleGenAI, Type } from '@google/genai';
import {
  ContextAnalysisResult,
  CopilotFeedback,
  GarmentType,
  GuardrailAdvice,
  Outfit,
} from '../types';

export interface OutfitAdvice {
  stylingTitle: string;
  recommendationReason: string;
  culturalTip: string;
  suggestedItemIds: string[];
  auspiciousColors: string[];
  source: 'gemini_api' | 'curated_fallback';
}

const SYSTEM_INSTRUCTION =
  'Bạn là một Stylist Gen Z kiêm Nhà nghiên cứu Cổ phục Việt Nam. Tông giọng sắc sảo, am hiểu thời trang, cởi mở, dùng ngôn ngữ trẻ trung nhưng tuyệt đối chính xác về lịch sử văn hóa.';

export const MODEL_NAME = 'gemini-flash-latest';

/**
 * Fallback cascade for client-side Gemini calls:
 * 'gemini-flash-latest' -> 'gemini-3.8-flash' -> 'gemini-3.1-flash-lite'
 */
async function generateContentWithClientFallback(ai: GoogleGenAI, params: any) {
  const models = [MODEL_NAME, 'gemini-3.8-flash', 'gemini-3.1-flash-lite'];
  let lastErr: any;
  for (const model of models) {
    try {
      return await ai.models.generateContent({
        ...params,
        model,
      });
    } catch (err: any) {
      lastErr = err;
      if (
        err?.status === 404 ||
        err?.status === 503 ||
        err?.message?.includes('not found') ||
        err?.message?.includes('no longer available') ||
        err?.message?.includes('high demand')
      ) {
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

/**
 * Returns a configured GoogleGenAI client instance or null if no API key is available.
 */
function getGeminiClient(): GoogleGenAI | null {
  const apiKey =
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY);

  if (!apiKey) return null;

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ================= 1. CONTEXT & PROMPT ANALYSIS =================

/**
 * Phân tích bối cảnh không gian, trang phục mong muốn và tâm lý người dùng từ văn bản hoặc ảnh tải lên.
 */
export async function analyzeContextAndPrompt(
  textPrompt?: string,
  imageBase64?: string
): Promise<ContextAnalysisResult> {
  const promptText = textPrompt?.trim() || 'Tôi muốn một set Việt phục đẹp đi chơi Tết Bính Ngọ 2026.';

  // 1. Try Backend Proxy
  try {
    const res = await fetch('/api/gemini/analyze-context', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ textPrompt: promptText, imageBase64 }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return data.data as ContextAnalysisResult;
      }
    }
  } catch {
    // Continue to direct SDK
  }

  // 2. Direct Gemini SDK call
  const ai = getGeminiClient();
  if (ai) {
    try {
      const contents: any[] = [];

      if (imageBase64) {
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
        contents.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: cleanBase64,
          },
        });
      }

      const promptContent = imageBase64
        ? `Bạn là Chuyên gia Cố vấn Cổ phục Việt Nam & Giám tuyển thị giác.
Hãy quan sát kỹ bức ảnh đính kèm và phân tích thực tế các đặc trưng trực quan của bức ảnh:
- Nhận diện không gian/địa điểm trong ảnh: trong nhà, ngoài trời, đền chùa/di tích cổ kính, quán cafe/đường phố trẻ trung, sự kiện tiệc tùng/đám cưới sang trọng, hay thiên nhiên vườn hoa.
- Nhận diện tông màu chủ đạo và ánh sáng trong ảnh để gợi ý trang phục hòa hợp hoặc tôn bật trên nền ảnh.
- Kết hợp với yêu cầu chữ nếu có: "${promptText || 'Không có mô tả chữ, hãy dựa hoàn toàn vào khung cảnh và màu sắc trực quan của bức ảnh'}".

Trả về JSON đúng cấu trúc:
{
  "environment": "Mô tả cụ thể không gian và đặc trưng thị giác nhận diện từ ảnh",
  "culturalBoundary": "Ranh giới văn hóa hoặc phép tắc trang phục cần lưu ý tại địa điểm này",
  "userIntent": "Mục đích diện đồ và phong cách phù hợp nhất với bối cảnh ảnh này",
  "recommendedGarments": ["ao_dai", "ngu_than", "ba_ba", "tu_than", "nhat_binh", "giao_linh"],
  "recommendedVibe": "y2k | streetwear | minimal | vintage | feminine"
}`
        : `Hãy phân tích bối cảnh, địa điểm và sở thích phong cách từ yêu cầu của người dùng sau:
"${promptText}"

Hãy phân tích và trả về đúng JSON theo schema được yêu cầu:
- environment: Không gian/địa điểm nhận diện được
- culturalBoundary: Ranh giới văn hóa hoặc phép tắc cần lưu ý tại địa điểm này
- userIntent: Mong muốn, tâm lý hoặc phong cách thời trang của người dùng
- recommendedGarments: Danh sách các dòng áo phù hợp từ ['ao_dai', 'ngu_than', 'ba_ba', 'tu_than', 'nhat_binh', 'giao_linh']
- recommendedVibe: Vibe phong cách đề xuất ('y2k', 'streetwear', 'minimal', 'vintage', hoặc 'feminine')`;

      contents.push({
        text: promptContent,
      });

      const response = await generateContentWithClientFallback(ai, {
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              environment: { type: Type.STRING },
              culturalBoundary: { type: Type.STRING },
              userIntent: { type: Type.STRING },
              recommendedGarments: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              recommendedVibe: { type: Type.STRING },
            },
            required: [
              'environment',
              'culturalBoundary',
              'userIntent',
              'recommendedGarments',
              'recommendedVibe',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.environment && Array.isArray(parsed.recommendedGarments)) {
        return {
          environment: parsed.environment,
          culturalBoundary: parsed.culturalBoundary,
          userIntent: parsed.userIntent,
          recommendedGarments: parsed.recommendedGarments as GarmentType[],
          recommendedVibe: parsed.recommendedVibe || 'vintage',
        };
      }
    } catch (err) {
      console.warn('Gemini analyzeContext error, using smart fallback:', err);
    }
  }

  // 3. Smart Local Heuristic Fallback: 4 bộ gợi ý không gian đa dạng
  const CONTEXT_PRESETS: ContextAnalysisResult[] = [
    {
      // a. Không gian cổ kính / di tích / chùa: Đề xuất Áo Ngũ Thân hoặc Giao Lĩnh (vibe Vintage)
      environment: 'Không gian đền chùa, di tích lịch sử & lăng tẩm cổ kính',
      culturalBoundary: 'Không gian tâm linh tôn nghiêm, tà áo cần khép kín đoan trang, dài quá gối, tránh mặc quần ngắn hay trang phục phá cách phản cảm',
      userIntent: 'Tâm nguyện cầu an, chiêm bái di sản và mong muốn nét đẹp đoan trang, thanh tịnh',
      recommendedGarments: ['ngu_than', 'giao_linh', 'ao_dai'] as GarmentType[],
      recommendedVibe: 'vintage',
    },
    {
      // b. Không gian quán xá / đường phố trẻ trung: Đề xuất Áo Bà Ba hoặc Áo Dài phối Jeans (vibe Streetwear/Y2K)
      environment: 'Quán cà phê vintage, phố đi bộ & góc phố check-in hiện đại',
      culturalBoundary: 'Thoải mái tự do mix-match phụ kiện đô thị, giữ dáng tà áo gọn gàng thoải mái khi di chuyển',
      userIntent: 'Phong cách dạo phố Gen Z phóng khoáng, kết hợp hài hòa giữa nét truyền thống và tinh thần streetwear',
      recommendedGarments: ['ba_ba', 'ao_dai', 'ngu_than'] as GarmentType[],
      recommendedVibe: 'streetwear',
    },
    {
      // c. Sự kiện tiệc tùng / đám cưới: Đề xuất Áo Nhật Bình hoặc Áo Dài gấm (vibe Sang trọng/Minimal)
      environment: 'Sự kiện dạ tiệc, đám cưới truyền thống hoặc không gian tiệc sang trọng',
      culturalBoundary: 'Đề cao sự trang nhã quý phái, chất liệu gấm tơ chỉn chu, tôn vinh nét đẹp vương giả đài các',
      userIntent: 'Khẳng định gu thẩm mỹ kiêu sa, sang trọng và nổi bật trong các dịp lễ hội trọng đại',
      recommendedGarments: ['nhat_binh', 'ao_dai', 'ngu_than'] as GarmentType[],
      recommendedVibe: 'minimal',
    },
    {
      // d. Không gian tự nhiên / vườn hoa: Đề xuất Áo Tứ Thân hoặc Áo Dài tơ tằm (vibe Nữ tính/Thơ mộng)
      environment: 'Vườn hoa xuân, không gian sinh thái tự nhiên & sông nước hữu tình',
      culturalBoundary: 'Hài hòa cùng cảnh sắc thiên nhiên cỏ cây hoa lá, tà áo mềm mại thướt tha buông bay trong gió xuân',
      userIntent: 'Nét duyên dáng thanh xuân tươi mới, thơ mộng và ngọt ngào trong từng khung hình kỷ niệm',
      recommendedGarments: ['tu_than', 'ao_dai', 'ba_ba'] as GarmentType[],
      recommendedVibe: 'feminine',
    },
  ];

  const lower = (promptText || '').toLowerCase();
  const isTemple = lower.includes('chùa') || lower.includes('đền') || lower.includes('lễ') || lower.includes('cúng') || lower.includes('tâm linh') || lower.includes('di tích');
  const isStreet = lower.includes('phố') || lower.includes('dạo') || lower.includes('quán') || lower.includes('cà phê') || lower.includes('coffee') || lower.includes('trà');
  const isParty = lower.includes('tiệc') || lower.includes('cưới') || lower.includes('đám cưới') || lower.includes('dạ tiệc') || lower.includes('huế') || lower.includes('party');
  const isNature = lower.includes('hoa') || lower.includes('vườn') || lower.includes('thiên nhiên') || lower.includes('sông') || lower.includes('đồng') || lower.includes('công viên');

  if (isTemple) return CONTEXT_PRESETS[0];
  if (isStreet) return CONTEXT_PRESETS[1];
  if (isParty) return CONTEXT_PRESETS[2];
  if (isNature) return CONTEXT_PRESETS[3];

  // Nếu người dùng tải ảnh lên (kể cả không gõ chữ):
  // Băm chuỗi base64 của ảnh để tạo seed ngẫu nhiên có ngữ cảnh, đảm bảo các bức ảnh khác nhau ra gợi ý khác nhau!
  if (imageBase64) {
    let hash = 0;
    const step = Math.max(1, Math.floor(imageBase64.length / 300));
    for (let i = 0; i < imageBase64.length; i += step) {
      hash = (hash << 5) - hash + imageBase64.charCodeAt(i);
      hash |= 0;
    }
    const presetIdx = Math.abs(hash) % 4;
    return CONTEXT_PRESETS[presetIdx];
  }

  // Mặc định dạo phố xuân năng động
  return CONTEXT_PRESETS[1];
}

// ================= 2. REALTIME OUTFIT EVALUATION =================

/**
 * Đánh giá bản phối hiện tại theo thời gian thực: tính điểm match, điểm cân bằng văn hóa,
 * bình luận Gen Z dí dỏm và fun fact lịch sử về món đồ vừa chọn.
 */
export async function evaluateOutfitRealtime(
  outfit: Outfit,
  context: string = 'Du xuân Tết 2026'
): Promise<CopilotFeedback> {
  const garmentName = outfit.garment?.name || 'Cổ phục';
  const bottomName = outfit.bottom?.name || 'Quần';
  const footwearName = outfit.footwear?.name || 'Giày dép';
  const accNames = outfit.accessories?.map((a) => a.name).join(', ') || 'Không có';

  // 1. Try Backend Proxy
  try {
    const res = await fetch('/api/gemini/evaluate-outfit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ outfit, context }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return data.data as CopilotFeedback;
      }
    }
  } catch {
    // Continue to direct SDK
  }

  // 2. Direct Gemini SDK call
  const ai = getGeminiClient();
  if (ai) {
    try {
      const prompt = `Đánh giá bản phối Việt phục sau đây trong bối cảnh "${context}":
- Áo: ${garmentName} (${outfit.garment?.garmentType || 'cổ phục'})
- Quần/Váy: ${bottomName}
- Giày dép: ${footwearName}
- Phụ kiện: ${accNames}
- Vibe phong cách: ${outfit.style}
- Dịp mặc: ${outfit.occasion}

Hãy chấm điểm và nhận xét theo schema:
- matchScore: Điểm ăn ý hài hòa tổng thể từ 0 đến 100
- balanceScore: Thang đo văn hóa (0: Phá cách cực đoan Y2K -> 100: Cổ điển nghiêm cẩn)
- stylistComment: Bình luận 1-2 câu trẻ trung, sắc sảo, dùng từ ngữ Gen Z duyên dáng (slay, keo lì, vibe chất, đỉnh nóc kịch trần)
- culturalFact: 2-3 câu fun fact văn hóa lịch sử thú vị về dáng áo hoặc món đồ trong set này.`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchScore: { type: Type.INTEGER },
              balanceScore: { type: Type.INTEGER },
              stylistComment: { type: Type.STRING },
              culturalFact: { type: Type.STRING },
            },
            required: ['matchScore', 'balanceScore', 'stylistComment', 'culturalFact'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (typeof parsed.matchScore === 'number') {
        return {
          matchScore: Math.min(100, Math.max(0, parsed.matchScore)),
          balanceScore: Math.min(100, Math.max(0, parsed.balanceScore)),
          stylistComment: parsed.stylistComment,
          culturalFact: parsed.culturalFact,
        };
      }
    } catch (err) {
      console.warn('Gemini evaluateOutfit error, using local fallback:', err);
    }
  }

  // 3. Smart Local Heuristic Fallback: Tính toán độ ăn ý và cân bằng văn hóa động (45 - 98 điểm)
  return computeInstantHeuristic(outfit);
}

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
 * Thuật toán đánh giá độ ăn ý (matchScore) và ranh giới văn hóa thời gian thực.
 * Điểm cơ bản 70, trải đều từ 45 đến 98 điểm tuỳ bản phối, loại bỏ hoàn toàn hiện tượng kẹt cứng 92 điểm.
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
  } else if (garmentType === 'ba_ba' && isWhiteSneaker) {
    score += 8;
    stylistNotes.push('Áo bà ba phối cùng sneaker trắng mang lại vẻ đẹp năng động, tươi mới khi du xuân!');
  }

  // --- ĐỒNG BỘ VĂN HÓA VÙNG MIỀN (Regional Cultural Harmony) ---
  const headwearId = outfit.headwear?.id;
  const isNonQuaiThao = headwearId === 'headwear_nonquaithao_01';
  const isNonLa = headwearId === 'headwear_nonla_01';
  const isKhanVan = headwearId === 'headwear_khanvan_01';
  const hasTuiCoi = outfit.accessories?.some((a) => a.id === 'acc_tuicoi_01');
  const hasQuatTram = outfit.accessories?.some((a) => a.id === 'acc_quatxep_01');

  // Lỗi xung đột văn hóa vùng miền: Áo Bà Ba Nam Bộ phối Nón Quai Thao Kinh Bắc (-35 điểm)
  if (garmentType === 'ba_ba' && isNonQuaiThao) {
    score -= 35;
    balanceScore = Math.max(15, balanceScore - 35);
    hasSevereConflict = true;
    stylistNotes.push(
      'Cảnh báo xung đột vùng miền: Áo Bà Ba sông nước Nam Bộ tuyệt đối không phối cùng Nón Quai Thao đặc trưng Kinh Bắc!'
    );
  }

  // Cộng điểm đồng bộ văn hóa chuẩn vùng miền (+8 đến +10 điểm)
  if (garmentType === 'tu_than' && isNonQuaiThao) {
    score += 10;
    balanceScore = Math.min(100, balanceScore + 10);
    stylistNotes.push('Bộ đôi Áo Tứ Thân và Nón Quai Thao tái hiện trọn vẹn nét duyên Kinh Bắc kinh điển!');
  }
  if (garmentType === 'ba_ba' && (isNonLa || hasTuiCoi)) {
    score += 10;
    balanceScore = Math.min(100, balanceScore + 10);
    stylistNotes.push('Áo Bà Ba kết hợp Nón Lá / túi cói mộc mạc đậm đà tình sông nước Nam Bộ.');
  }
  if ((garmentType === 'ngu_than' || garmentType === 'ao_dai' || garmentType === 'nhat_binh') && (isKhanVan || hasQuatTram)) {
    score += 8;
    balanceScore = Math.min(100, balanceScore + 8);
    stylistNotes.push('Khăn vấn / quạt trầm hương nâng tầm khí chất đĩnh đạc, nho nhã truyền thống.');
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

// ================= 3. CULTURAL GUARDRAILS =================

/**
 * Kiểm tra ranh giới văn hóa và cung cấp đề xuất phá cách có chủ đích (Intentional Edgy Alternative).
 */
export async function checkCulturalGuardrail(
  outfit: Outfit,
  context: string = 'Lễ đền chùa'
): Promise<GuardrailAdvice> {
  const isTemple = context.toLowerCase().includes('chùa') || context.toLowerCase().includes('đền') || outfit.occasion === 'le_chua';
  const bottomId = outfit.bottom?.id || '';
  const isShortBottom = bottomId.includes('short');
  const hasSunglasses = outfit.accessories?.some((a) => a.id.includes('kinhram'));

  // 1. Try Backend Proxy
  try {
    const res = await fetch('/api/gemini/guardrail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ outfit, context }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return data.data as GuardrailAdvice;
      }
    }
  } catch {
    // Continue to direct SDK
  }

  // 2. Direct Gemini SDK call
  const ai = getGeminiClient();
  if (ai) {
    try {
      const prompt = `Kiểm tra xem bản phối Việt phục sau có vi phạm thuần phong mỹ tục hoặc ranh giới văn hóa trong bối cảnh "${context}" hay không:
- Dòng áo: ${outfit.garment?.name}
- Dưới: ${outfit.bottom?.name}
- Giày: ${outfit.footwear?.name}
- Phụ kiện: ${outfit.accessories?.map((a) => a.name).join(', ')}
- Dịp: ${outfit.occasion}

Đặc biệt lưu ý:
1. Khi đi lễ chùa hoặc nơi thờ tự tôn nghiêm: TUYỆT ĐỐI không mặc quần đùi/short ngắn, không đeo kính râm khi dâng hương.
2. Áo dài hoặc ngũ thân truyền thống: Không nên mặc không có quần dài lót bên dưới.

Hãy trả về JSON theo schema:
- isBoundaryCrossed: true nếu vi phạm ranh giới văn hóa, false nếu an toàn
- reason: Giải thích ngắn gọn vì sao chưa phù hợp
- gentleSuggestion: Lời khuyên ân cần cách điều chỉnh để vừa giữ chất riêng vừa đúng phép tắc
- intentionalEdgyAlternative: Gợi ý "Phá cách có chủ đích" cho buổi chụp concept nghệ thuật ngoài trời mà không gây phản cảm`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isBoundaryCrossed: { type: Type.BOOLEAN },
              reason: { type: Type.STRING },
              gentleSuggestion: { type: Type.STRING },
              intentionalEdgyAlternative: { type: Type.STRING },
            },
            required: ['isBoundaryCrossed', 'reason', 'gentleSuggestion', 'intentionalEdgyAlternative'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (typeof parsed.isBoundaryCrossed === 'boolean') {
        return parsed as GuardrailAdvice;
      }
    } catch (err) {
      console.warn('Gemini checkCulturalGuardrail error, using local fallback:', err);
    }
  }

  // 3. Smart Local Heuristic Fallback
  if (isTemple && isShortBottom) {
    return {
      isBoundaryCrossed: true,
      reason: 'Quần short cắt ngắn để lộ đùi khi bước vào chốn tôn nghiêm nơi đền chùa là vi phạm quy chuẩn trang nghiêm truyền thống.',
      gentleSuggestion: 'Hãy đổi sang quần lụa suông thanh thoát hoặc quần âu ống rộng; vừa đĩnh đạc kính cẩn vừa tôn trọn vẹn phom dáng chữ A.',
      intentionalEdgyAlternative: 'Nếu chụp ảnh concept Y2K phá cách đường phố, bạn có thể mặc layer quần jeans rách ống suông dài kết hợp cùng sneaker chunky thay vì cắt ngắn.',
    };
  }

  if (isTemple && hasSunglasses) {
    return {
      isBoundaryCrossed: true,
      reason: 'Đeo kính râm đen trong không gian thờ tự dâng hương tạo cảm giác xa cách, chưa trọn vẹn tấm lòng thành kính.',
      gentleSuggestion: 'Nên cất kính râm vào túi đeo chéo khi bước qua cổng tam quan, để gương mặt sáng sủa đón lộc đầu xuân.',
      intentionalEdgyAlternative: 'Bạn có thể gài kính râm lên cổ áo hoặc túi canvas Sài Gòn như một phụ kiện tạo điểm nhấn visual hiện đại.',
    };
  }

  return {
    isBoundaryCrossed: false,
    reason: 'Bản phối hoàn toàn hòa hợp với không gian và chuẩn mực văn hóa ngày Tết.',
    gentleSuggestion: 'Cứ tự tin thả dáng du xuân đón tài lộc năm mới Bính Ngọ 2026 nhé!',
    intentionalEdgyAlternative: 'Có thể thử nghiệm thêm dải khăn lụa hoặc vòng ngọc bội phỉ thúy bên hông để tăng chiều sâu thị giác.',
  };
}

// ================= 4. GARMENT STORYTELLING =================

/**
 * Lấy câu chuyện lịch sử và nguồn cảm hứng giám tuyển cho từng dòng cổ phục.
 */
export async function fetchGarmentStory(garmentName: string): Promise<string> {
  // 1. Try Backend Proxy
  try {
    const res = await fetch('/api/gemini/garment-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ garmentName }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.story) {
        return data.story as string;
      }
    }
  } catch {
    // Continue to direct SDK
  }

  // 2. Direct Gemini SDK call
  const ai = getGeminiClient();
  if (ai) {
    try {
      const prompt = `Kể một câu chuyện truyền cảm hứng ngắn gọn (khoảng 3 đoạn ngắn) về lịch sử và vẻ đẹp của dòng cổ phục Việt "${garmentName}".
Tập trung vào:
1. Nguồn gốc lịch sử và bối cảnh ra đời.
2. Triết lý đạo lý hoặc mỹ học gửi gắm trong cấu trúc trang phục.
3. Cách thế hệ trẻ Gen Z hôm nay có thể tiếp nối và làm mới đầy tự hào trong nhịp sống đương đại.`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      if (response.text) {
        return response.text.trim();
      }
    } catch (err) {
      console.warn('Gemini fetchGarmentStory error, using local narrative:', err);
    }
  }

  // 3. Curated Historical Narratives Fallback
  const lower = garmentName.toLowerCase();

  if (lower.includes('ngũ thân')) {
    return `Áo Ngũ Thân ra đời từ thế kỷ 18 dưới triều đại chúa Nguyễn Phúc Khoát và được định chế hoàn bị dưới thời vua Minh Mạng, trở thành quốc phục của người Việt suốt hàng thế kỷ. Cấu trúc năm thân áo tượng trưng cho đạo lý Tứ Thân Phụ Mẫu bao bọc lấy người mặc, cùng hàng 5 chiếc cúc xà cừ đại diện cho Nhân - Lễ - Nghĩa - Trí - Tín.

Với phom dáng chữ A suông rộng kín cổng cao tường, chiếc áo ngũ thân tay chẽn vừa tạo tư thế thẳng lưng đĩnh đạc cho nam giới, vừa toát lên vẻ đoan trang nho nhã của phụ nữ. Tà áo không ôm sát mà buông thẳng, che giấu khuyết điểm và tôn lên phong thái đĩnh đạc của người mặc.

Ngày nay, Gen Z mang ngũ thân trở lại đời sống qua những bản phối giao thoa tinh tế: kết hợp cùng quần âu xếp ly, giày da tối giản hay sneaker năng động dạo phố Tết. Đó không chỉ là mặc lại một bộ đồ cổ, mà là tuyên ngôn tự hào về một di sản tri thức phong nhã nghìn năm.`;
  }

  if (lower.includes('nhật bình')) {
    return `Áo Nhật Bình là thường phục cao quý của bậc Hoàng hậu, Phi tần, Công chúa và mệnh phụ triều Nguyễn từ năm 1807. Tên gọi "Nhật Bình" bắt nguồn từ chiếc cổ áo to bản ghép lại tạo thành hình chữ nhật ngay ngắn trước ngực, viền dải ngũ sắc tượng trưng cho ngũ hành tương sinh.

Mỗi chi tiết trên áo Nhật Bình đều là một tuyệt tác mỹ thuật cung đình Huế: từ hoa văn phượng vũ, mây thủy ba sóng nước đến dải ngũ sắc nơi cổ tay. Chiếc áo thể hiện trọn vẹn vị thế quyền quý, sự trang trọng và chiều sâu văn hóa cung đình đỉnh cao.

Khi được Gen Z remix trong diện mạo mới, Nhật Bình cách tân kết hợp áo croptop lụa bên trong hay phối layer cùng quần suông tạo nên diện mạo vừa đài các kiêu sa, vừa sẵn sàng tỏa sáng trong mọi khung hình du xuân hiện đại.`;
  }

  if (lower.includes('giao lĩnh')) {
    return `Áo Giao Lĩnh (còn gọi là áo tràng vạt) là một trong những dáng áo cổ xưa và tôn nghiêm bậc nhất của người Việt, xuất hiện từ thời Lý, Trần và thịnh hành suốt thời Hậu Lê. Điểm đặc trưng bất hủ là hai vạt cổ chéo giao nhau tạo thành cổ chữ V đoan chính, thắt đai lưng lụa mềm mại.

Chiếc áo mang vẻ đẹp cổ kính, thoát tục như bước ra từ những trang sử vàng son của Đại Việt. Tay áo thụng rộng buông dài thể hiện khí chất phong lưu, tự tại của các bậc danh sĩ và giai nhân thuở xưa.

Trong dòng chảy thời trang đương đại, Giao Lĩnh được giới trẻ yêu thích bởi vẻ đẹp phi giới tính, thanh thoát và đậm chất điện ảnh di sản. Phối Giao Lĩnh cùng quạt nan tre hoặc ngọc bội phỉ thúy mang lại khí chất độc bản không thể trộn lẫn.`;
  }

  if (lower.includes('tứ thân')) {
    return `Áo Tứ Thân là biểu tượng mộc mạc và bền bỉ của người phụ nữ Kinh Bắc xưa, gắn liền với không gian hội Lim và những câu ca Quan họ tha thiết. Chiếc áo gồm bốn vạt vải, hai vạt sau may liền thành sống áo, hai vạt trước buông tự do hoặc buộc lại duyên dáng trước bụng.

Bên trong áo tứ thân là chiếc yếm đào e ấp, thắt lưng lụa xanh màu lá mạ và chiếc nón quai thao nghiêng che duyên dáng. Tứ Thân tượng trưng cho đức tính tảo tần, tình nghĩa sâu nặng của người phụ nữ Việt Nam qua bao thăng trầm.

Hôm nay, tinh thần Tứ Thân được tái sinh đầy cảm hứng khi các nhà thiết kế trẻ kết hợp cấu trúc buộc vạt với chất liệu linen, denim hoặc phối cùng chân váy xếp ly hiện đại, khẳng định sức sống bất diệt của văn hóa dân gian.`;
  }

  if (lower.includes('bà ba')) {
    return `Áo Bà Ba là linh hồn của vùng đất phương Nam trù phú, xuất hiện từ thế kỷ 19 và trở thành người bạn tri kỷ của người dân sông nước Cửu Long. Với phom dáng ngắn ngang hông, xẻ tà hai bên và hàng cúc cài thẳng tắp, áo bà ba tối ưu cho sự linh hoạt, thoáng mát và phóng khoáng.

Vẻ đẹp của áo bà ba nằm ở sự giản dị, chân thành. Dù là chiếc áo nâu sồng lao động hay chiếc áo bà ba lụa gấm thướt tha dạo chợ nổi, nó đều toát lên cốt cách phóng khoáng, hiền hòa và hiếu khách của người Nam Bộ.

Khi bước vào tủ đồ Gen Z Tết 2026, áo bà ba kết hợp cùng nón lá bài thơ, quần jeans ống rộng hay túi cói thủ công mang lại nét đẹp thanh xuân vừa mộc mạc, vừa tràn đầy năng lượng tươi mới.`;
  }

  // Default: Áo Dài
  return `Áo Dài là biểu tượng nhan sắc và tâm hồn Việt Nam qua bao thế hệ. Bắt nguồn từ áo ngũ thân truyền thống, qua bàn tay sáng tạo của các họa sĩ tài hoa đầu thế kỷ 20, chiếc áo dài đã trở thành tuyệt phẩm tôn vinh đường nét duyên dáng, kín đáo mà quyến rũ của người phụ nữ Việt.

Hai tà áo buông lướt mềm mại theo từng bước chân, đường xẻ hông cao trên nền quần lụa suông rộng tạo nên vũ điệu thị giác thanh thoát không trang phục nào sánh được. Áo dài đỏ chu sa, vàng hoàng yến hay trắng tinh khôi luôn là linh hồn của ngày Tết cổ truyền.

Thế hệ Gen Z đón nhận áo dài bằng sự trân trọng và nguồn năng lượng remix không giới hạn: kết hợp cùng sneaker chunky, kính râm oval hay túi canvas đô thị, đưa áo dài bước từ truyền thống bước thẳng vào đời sống thường nhật một cách tự hào.`;
}

// ================= 5. LEGACY STYLING ADVICE (BACKWARD COMPATIBILITY) =================

export async function generateOutfitAdvice(
  occasion: string,
  style: string,
  garmentType: string,
  outfitName?: string
): Promise<OutfitAdvice> {
  try {
    const res = await fetch('/api/gemini/advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ occasion, style, garmentType, outfitName }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return {
          stylingTitle: data.data.stylingTitle || 'Tư Vấn Giám Tuyển Gemini Stylist',
          recommendationReason: data.data.recommendationReason,
          culturalTip: data.data.culturalTip,
          suggestedItemIds: Array.isArray(data.data.suggestedItemIds)
            ? data.data.suggestedItemIds
            : [],
          auspiciousColors: Array.isArray(data.data.auspiciousColors)
            ? data.data.auspiciousColors
            : ['#C53030', '#2B4162'],
          source: 'gemini_api',
        };
      }
    }
  } catch {
    // Continue to SDK or fallback
  }

  const ai = getGeminiClient();
  if (ai) {
    try {
      const prompt = `Bạn là Nhà giám tuyển & Cố vấn thời trang cổ phục Việt Nam cho Gen Z Tết 2026.
Hãy phân tích cách phối giữa:
- Dòng áo: ${garmentType}
- Dịp mặc: ${occasion}
- Vibe phong cách: ${style}
${outfitName ? `- Tên bản phối: ${outfitName}` : ''}

Hãy đưa ra lời khuyên về phom dáng, màu sắc may mắn đầu năm và triết lý gìn giữ bản sắc.
Trả về JSON theo schema:
{
  "stylingTitle": "Tiêu đề tư vấn ngắn gọn, cuốn hút cho Gen Z",
  "recommendationReason": "Phân tích vì sao bản phối này hòa hợp (2-3 câu).",
  "culturalTip": "Lời khuyên văn hóa quan trọng cần lưu ý (2 câu).",
  "auspiciousColors": ["Màu 1", "Màu 2"],
  "suggestedItemIds": ["garment_aodai_01", "bottom_silk_01", "footwear_guoc_01"]
}`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return {
        stylingTitle: parsed.stylingTitle || 'Tư Vấn Giám Tuyển Gemini AI',
        recommendationReason: parsed.recommendationReason,
        culturalTip: parsed.culturalTip,
        suggestedItemIds: Array.isArray(parsed.suggestedItemIds) ? parsed.suggestedItemIds : [],
        auspiciousColors: Array.isArray(parsed.auspiciousColors)
          ? parsed.auspiciousColors
          : ['#C53030', '#2B4162'],
        source: 'gemini_api',
      };
    } catch {
      // Fallback
    }
  }

  // High-Fidelity Curated Fallback
  const gType = (garmentType || 'ao_dai').toLowerCase();
  const st = (style || 'y2k').toLowerCase();

  let stylingTitle = 'Việt Phục Di Sản • Cân Bằng Hài Hòa Tết 2026';
  let recommendationReason =
    'Sự giao thoa tinh tế giữa cấu trúc cổ phục truyền thống và điểm xuyết phụ kiện đương đại giúp tôn trọn vóc dáng thanh nhã và phong thái du xuân tự tin.';
  let culturalTip =
    'Giữ cấu trúc tà áo buông phẳng tự nhiên, cài khuy chỉnh tề khi dâng hương hoặc chúc Tết trưởng bối.';
  let auspiciousColors = ['Đỏ Chu Sa (#C53030)', 'Xanh Lam Chàm (#2B4162)', 'Vàng Hoàng Cúc (#D4AF37)'];
  let suggestedItemIds = ['garment_aodai_01', 'bottom_silk_01', 'footwear_guoc_01'];

  if (gType.includes('ngu_than') || gType.includes('ngũ thân')) {
    stylingTitle = 'Ngũ Thân Phong Nhã • Quý Anh Quý Cô Tràng An';
    recommendationReason =
      'Phom áo ngũ thân tay chẽn buông thẳng tạo tư thế lưng đĩnh đạc, kết hợp cùng quần lụa suông hoặc quần âu cạp cao toát lên vẻ trang trọng quý phái.';
    culturalTip =
      'Hệ 5 cúc khuy cài lệch bên phải tượng trưng cho Ngũ Thường (Nhân - Lễ - Nghĩa - Trí - Tín), luôn cài đủ khuy để giữ phong thái nho nhã.';
    suggestedItemIds = ['garment_nguthan_01', 'bottom_silk_01', 'footwear_guoc_01', 'acc_khan_van_nam'];
  } else if (gType.includes('nhat_binh') || gType.includes('nhật bình')) {
    stylingTitle = 'Nhật Bình Cung Đình • Vương Giả & Đài Các';
    recommendationReason =
      'Cổ áo viền ngũ sắc bản to mang lại vẻ đẹp quyền quý, lộng lẫy chuẩn tinh thần hoàng gia triều Nguyễn cho các khung hình check-in đầu năm.';
    culturalTip =
      'Áo Nhật Bình nên phối cùng quần lụa trắng ngà hoặc đen tuyền dáng suông rộng, kèm hoa tai ngọc hoặc quạt trầm để tôn trọn vẻ đoan trang.';
    suggestedItemIds = ['garment_nhatbinh_01', 'bottom_silk_01', 'acc_quat_tram', 'head_khan_van_nu'];
  } else if (gType.includes('ba_ba') || gType.includes('bà ba')) {
    stylingTitle = 'Bà Ba Nam Bộ • Duyên Dáng & Phóng Khoáng';
    recommendationReason =
      'Chất liệu lụa mềm xẻ tà hai bên hông tạo cảm giác nhẹ nhàng, linh hoạt, rất thích hợp cho những buổi dạo chợ hoa xuân hay cà phê bạn bè.';
    culturalTip =
      'Có thể phối cùng nón lá hoặc túi cói thủ công, khăn rằn vắt vai để tăng chất thơ mộc mạc miền sông nước.';
    suggestedItemIds = ['garment_baba_01', 'bottom_silk_01', 'footwear_guoc_01'];
  } else if (gType.includes('tu_than') || gType.includes('tứ thân')) {
    stylingTitle = 'Tứ Thân Dân Gian • Nét Duyên Kinh Bắc';
    recommendationReason =
      'Dải thắt lưng lụa đào buộc chéo trước bụng cùng nón ba tầm tạo điểm nhấn thắt đáy lưng ong đầy duyên dáng của phụ nữ Bắc Bộ xưa.';
    culturalTip =
      'Bốn vạt áo tượng trưng cho tứ thân phụ mẫu, vạt áo trước buộc chéo tạo nét e ấp, tình tứ trong ngày hội xuân.';
    suggestedItemIds = ['garment_tuthan_01', 'bottom_silk_01', 'footwear_guoc_01'];
  }

  if (st.includes('y2k') || st.includes('street')) {
    stylingTitle += ' (Remix Đương Đại)';
    recommendationReason +=
      ' Điểm xuyết cùng sneaker da trắng low-top hoặc kính râm oval mang lại vibe Cyber Heritage cực chiến!';
    auspiciousColors = ['Đỏ Son Neon (#FF3366)', 'Vàng Kim Hoàng Cúc (#FFD166)', 'Xanh Bạc Hà (#06D6A0)'];
  }

  return {
    stylingTitle,
    recommendationReason,
    culturalTip,
    suggestedItemIds,
    auspiciousColors,
    source: 'curated_fallback',
  };
}

// ================= 5. QUICK ASK STYLIST AI =================

export interface QuickStylistAnswer {
  answer: string;
  suggestedItemId?: string;
  suggestedItemName?: string;
  source?: 'gemini_api' | 'curated_fallback';
}

/**
 * Cố vấn phong cách nhanh: Gọi trực tiếp Gemini API với System Instruction chuyên biệt.
 * Khi offline / không có API key, tự động chuyển sang bộ phân tích từ khóa theo vóc dáng, địa điểm, bối cảnh.
 */
export async function askStylistQuickQuestion(
  question: string,
  outfitSummary?: string
): Promise<QuickStylistAnswer> {
  const trimmedQ = question.trim();
  if (!trimmedQ) {
    return {
      answer: 'Bạn đang băn khoăn về vóc dáng, cách chọn áo dài, ngũ thân hay phụ kiện đi tiệc? Hãy đặt câu hỏi để mình cố vấn chi tiết nhé!',
      suggestedItemId: 'garment_aodai_01',
      suggestedItemName: 'Áo Dài Truyền Thống',
      source: 'curated_fallback',
    };
  }

  const QUICK_SYSTEM_INSTRUCTION =
    'Bạn là Stylist thời trang Gen Z kiêm Chuyên gia Cổ phục Việt Nam. Trả lời đúng trọng tâm câu hỏi của người dùng bằng tiếng Việt tự nhiên, súc tích trong 2-3 câu, đưa ra lời khuyên thực tế theo vóc dáng, địa điểm hoặc bối cảnh.';

  // 1. Thử gọi qua Backend Proxy nếu có
  try {
    const res = await fetch('/api/gemini/quick-ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: trimmedQ, outfitSummary }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data?.answer) {
        return {
          answer: data.data.answer,
          suggestedItemId: data.data.suggestedItemId,
          suggestedItemName: data.data.suggestedItemName,
          source: 'gemini_api',
        };
      }
    }
  } catch {
    // Chuyển sang gọi SDK trực tiếp
  }

  // 2. Thử gọi trực tiếp Gemini SDK phía client
  const ai = getGeminiClient();
  if (ai) {
    try {
      const prompt = `Bối cảnh trang phục hiện tại: ${outfitSummary || 'Áo Cổ Phục Việt Nam'}.
Câu hỏi của người dùng: "${trimmedQ}".

Hãy trả lời đúng trọng tâm câu hỏi của người dùng bằng tiếng Việt tự nhiên, súc tích trong 2-3 câu, đưa ra lời khuyên thực tế theo vóc dáng, địa điểm hoặc bối cảnh.
Nếu có một món đồ thời trang cụ thể muốn gợi ý (ví dụ: áo dài, áo tấc, quần lụa, sneaker, guốc mộc, khăn vấn, kính râm...), hãy điền tên món và mã id (nếu biết).
Trả về JSON đúng cấu trúc:
{
  "answer": "câu trả lời 2-3 câu súc tích",
  "suggestedItemName": "Tên món đồ (nếu có)",
  "suggestedItemId": "id món đồ (nếu có)"
}`;

      const response = await generateContentWithClientFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: QUICK_SYSTEM_INSTRUCTION,
        },
      });

      const raw = response.text?.trim() || '';
      let parsed: any = {};
      try {
        parsed = JSON.parse(raw);
      } catch {
        const match = raw.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            parsed = JSON.parse(match[0]);
          } catch {
            // Ignore
          }
        }
      }

      const answer = parsed.answer || (raw && !raw.startsWith('{') ? raw : null);
      if (answer) {
        return {
          answer,
          suggestedItemId: parsed.suggestedItemId || undefined,
          suggestedItemName: parsed.suggestedItemName || undefined,
          source: 'gemini_api',
        };
      }
    } catch (err) {
      console.warn('[Gemini Quick Stylist] Lỗi API, chuyển sang offline fallback theo ngữ cảnh:', err);
    }
  }

  // 3. OFFLINE FALLBACK: Phân tích sâu từ khóa theo vóc dáng, địa điểm, bối cảnh
  return getContextualOfflineAnswer(trimmedQ, outfitSummary);
}

// Alias tương thích
export const askQuickStylistQuestion = askStylistQuickQuestion;

/**
 * Bộ tri thức di sản offline: Phân tích câu hỏi theo vóc dáng, địa điểm, bối cảnh thực tế.
 */
export function getContextualOfflineAnswer(question: string, _outfitSummary?: string): QuickStylistAnswer {
  const q = question.toLowerCase();

  // 1. Vóc dáng thấp / lùn / chiều cao khiêm tốn / hack dáng
  if (
    q.includes('thấp') ||
    q.includes('lùn') ||
    q.includes('chiều cao') ||
    q.includes('khiêm tốn') ||
    q.includes('hack dáng') ||
    q.includes('ngắn')
  ) {
    return {
      answer:
        'Chiều cao khiêm tốn hoàn toàn diện cổ phục cực tôn dáng! Bí quyết là chọn tà áo lửng vừa qua gối khoảng 10-15cm kết hợp cùng quần tây may đo cạp cao hoặc giày sneaker chunky độn đế để kéo dài đôi chân. Tránh tà áo dài chạm đất hoặc quần thụng quá lùng bùng nhé.',
      suggestedItemId: 'footwear_chunky_sneaker',
      suggestedItemName: 'Giày Sneaker Chunky Platform Độn Đế',
      source: 'curated_fallback',
    };
  }

  // 2. Vóc dáng đậm / mập / béo / tròn trịa / bụng / to con
  if (
    q.includes('béo') ||
    q.includes('mập') ||
    q.includes('đậm') ||
    q.includes('ngoại cỡ') ||
    q.includes('plussize') ||
    q.includes('bụng') ||
    q.includes('to')
  ) {
    return {
      answer:
        'Với vóc dáng tròn trịa, áo ngũ thân tay chẽn hoặc áo tấc dáng suông buông thẳng là "chân ái" giúp giấu khuyết điểm vòng hai cực kỳ khéo léo. Bạn nên ưu tiên chất liệu lụa cát hoặc đũi có độ đứng phom vừa phải, phối tone màu trầm thanh lịch như xanh lam chàm hay rêu đậm.',
      suggestedItemId: 'garment_nguthan_01',
      suggestedItemName: 'Áo Ngũ Thân Tay Chẽn Nam/Nữ',
      source: 'curated_fallback',
    };
  }

  // 3. Vóc dáng gầy / mảnh mai / ốm
  if (
    q.includes('gầy') ||
    q.includes('ốm') ||
    q.includes('mảnh') ||
    q.includes('nhỏ con')
  ) {
    return {
      answer:
        'Dáng người mảnh khảnh diện áo tấc tay thụng hoặc phối layer áo ngũ thân bên ngoài áo thun/baby tee sẽ tạo độ phồng sang trọng và đầy đặn hơn. Hãy chọn gam màu tươi sáng như hoàng yến, hồng đào hoặc kem be cùng họa tiết dệt gấm chìm để thêm phần khí chất.',
      suggestedItemId: 'garment_aotac_01',
      suggestedItemName: 'Áo Tấc Cung Đình Tay Thụng',
      source: 'curated_fallback',
    };
  }

  // 4. Bối cảnh Huế / Cố đô / Đại Nội / Lăng tẩm
  if (
    q.includes('huế') ||
    q.includes('đại nội') ||
    q.includes('lăng') ||
    q.includes('cố đô') ||
    q.includes('sông hương')
  ) {
    return {
      answer:
        'Check-in tại Huế hoặc không gian rêu phong cổ kính, set Áo Tấc tay thụng hoặc Áo Ngũ Thân kết hợp nón bài thơ hoặc khăn vấn là chuẩn "chàng thơ / nàng thơ xứ thần kinh" 100 điểm. Gam màu tím hoa cà, vàng cung đình hay xanh ngọc bích sẽ cực kỳ hòa quyện với tường thành cổ kính.',
      suggestedItemId: 'head_khan_van_nu',
      suggestedItemName: 'Khăn Vấn Lụa Quý Tộc',
      source: 'curated_fallback',
    };
  }

  // 5. Đi đám cưới / tiệc cưới / hôn lễ / lễ thành hôn
  if (
    q.includes('cưới') ||
    q.includes('tiệc') ||
    q.includes('hôn lễ') ||
    q.includes('dự tiệc') ||
    q.includes('dạ hội')
  ) {
    return {
      answer:
        'Đi dự đám cưới hay tiệc trang trọng, bạn nên chọn áo ngũ thân hoặc áo dài lụa tơ tằm với gam màu tươi vui như đỏ chu sa, hồng cánh sen hay xanh ngọc bích để chúc phúc cho gia chủ. Tránh diện nguyên cây trắng toát hoặc áo có tà xẻ quá cao để giữ gìn sự lịch thiệp, tôn trọng ngày trọng đại.',
      suggestedItemId: 'garment_nguthan_nu',
      suggestedItemName: 'Áo Ngũ Thân Lụa Gấm Quý Phái',
      source: 'curated_fallback',
    };
  }

  // 6. Đi chùa / đền / phủ / chốn tâm linh / viếng lễ
  if (
    q.includes('chùa') ||
    q.includes('đền') ||
    q.includes('phủ') ||
    q.includes('tâm linh') ||
    q.includes('viếng') ||
    q.includes('dâng hương')
  ) {
    return {
      answer:
        'Khi viếng chùa chiền và không gian tâm linh, quy tắc bất biến là tà áo cài kín cổ cúc, vạt buông thẳng và bắt buộc mặc cùng quần dài suông qua mắt cá chân. Tuyệt đối không phối với chân váy ngắn, quần ngố hay chất liệu quá xuyên thấu để giữ trọn sự thanh tịnh, trang nghiêm.',
      suggestedItemId: 'bottom_silk_01',
      suggestedItemName: 'Quần Lụa Trắng Dáng Suông',
      source: 'curated_fallback',
    };
  }

  // 7. Hà Nội / Phố cổ / Hồ Gươm / Cầu Long Biên
  if (
    q.includes('hà nội') ||
    q.includes('phố cổ') ||
    q.includes('hồ gươm') ||
    q.includes('long biên') ||
    q.includes('tràng an')
  ) {
    return {
      answer:
        'Dạo phố cổ Hà Nội hay bờ hồ, hãy mix áo dài truyền thống hoặc áo ngũ thân cùng một đôi loafer da bóng hoặc sneaker trắng và túi kẹp nách Y2K. Phong cách vừa giữ được nét thanh lịch Tràng An, vừa cực kỳ phóng khoáng và êm chân khi tản bộ.',
      suggestedItemId: 'footwear_loafer_leather',
      suggestedItemName: 'Giày Loafer Da Bóng Đính Khóa Kim Loại',
      source: 'curated_fallback',
    };
  }

  // 8. Sài Gòn / Miền Tây / Nam Bộ
  if (
    q.includes('sài gòn') ||
    q.includes('miền tây') ||
    q.includes('nam bộ') ||
    q.includes('bà ba')
  ) {
    return {
      answer:
        'Ở Sài Gòn hay miền Tây sông nước đầy nắng ấm, áo bà ba lụa cách tân phối quần ống rộng và guốc mộc là bản phối tuyệt đối thoải mái, thanh mát. Bạn có thể phối thêm kính râm ma trận viền bạc để tạo điểm nhấn Gen Z cá tính.',
      suggestedItemId: 'garment_baba_01',
      suggestedItemName: 'Áo Bà Ba Nam Bộ Cách Tân',
      source: 'curated_fallback',
    };
  }

  // 9. Giày dép / Sneaker / Guốc / Loafer / Chelsea Boots
  if (
    q.includes('giày') ||
    q.includes('sneaker') ||
    q.includes('guốc') ||
    q.includes('boots') ||
    q.includes('loafer')
  ) {
    return {
      answer:
        'Nếu muốn phong thái cổ điển trang nhã, guốc mộc sơn mài hoặc loafer da là lựa chọn hoàn hảo. Còn nếu theo đuổi phong cách Gen Z Remix đường phố, một đôi chunky sneaker độn đế hoặc Chelsea boots da lì sẽ nâng tầm outfit cực ngầu và hiện đại.',
      suggestedItemId: 'footwear_chunky_sneaker',
      suggestedItemName: 'Giày Sneaker Chunky Platform Độn Đế',
      source: 'curated_fallback',
    };
  }

  // 10. Phụ kiện đầu: Khăn vấn / nón lá / nón quai thao / tóc
  if (
    q.includes('khăn') ||
    q.includes('nón') ||
    q.includes('đầu') ||
    q.includes('tóc') ||
    q.includes('mũ')
  ) {
    return {
      answer:
        'Khăn vấn giúp định hình khung mặt đĩnh đạc, quý phái chuẩn phong thái cung đình khi chụp ảnh chân dung hoặc dự tiệc. Còn nón lá bài thơ hay quạt xếp lại mang đến nét dịu dàng, thơ mộng khi chụp ảnh góc rộng ngoài trời.',
      suggestedItemId: 'head_khan_van_nu',
      suggestedItemName: 'Khăn Vấn Lụa Cao Cấp',
      source: 'curated_fallback',
    };
  }

  // 11. Phong cách Gen Z / Y2K / Streetwear / Remix
  if (
    q.includes('y2k') ||
    q.includes('remix') ||
    q.includes('streetwear') ||
    q.includes('gen z') ||
    q.includes('chất') ||
    q.includes('ngầu')
  ) {
    return {
      answer:
        'Công thức remix Việt phục đỉnh chóp của Gen Z: Khoác áo ngũ thân mở cúc bên ngoài áo Baby Tee Y2K, phối cùng quần parachute cargo ống rộng và kính râm cyber. Vừa tôn vinh văn hóa cội nguồn, vừa khẳng định chất riêng không lẫn vào đâu được!',
      suggestedItemId: 'y2k_baby_tee',
      suggestedItemName: 'Áo Baby Tee Y2K Cropped',
      source: 'curated_fallback',
    };
  }

  // 12. Màu sắc / phong thủy / ngũ hành / mệnh
  if (
    q.includes('màu') ||
    q.includes('mệnh') ||
    q.includes('phong thủy') ||
    q.includes('hợp')
  ) {
    return {
      answer:
        'Cổ phục Việt ứng dụng triết lý Ngũ Sắc tương sinh: Đỏ (may mắn, hỷ khí), Xanh lam chàm (bình an, trí tuệ), Vàng hoàng cúc (thịnh vượng, cao quý), Trắng (tinh khôi). Bạn hãy chọn gam màu tôn nước da và hòa hợp với không gian nơi mình đến nhé.',
      suggestedItemId: 'garment_aodai_01',
      suggestedItemName: 'Áo Dài Truyền Thống Màu Sắc May Mắn',
      source: 'curated_fallback',
    };
  }

  // Mặc định phản hồi động theo câu hỏi thực tế, không rập khuôn câu tĩnh
  const cleanQ = question.trim().replace(/[?.!]+$/, '');
  return {
    answer: `Về thắc mắc "${cleanQ}", nguyên tắc cốt lõi khi phối cổ phục là giữ cấu trúc tà áo buông phẳng tự nhiên và phần vai áo cân đối. Tùy vóc dáng và bối cảnh xuất hiện, bạn có thể tự do nhấn nhá thêm phụ kiện hiện đại như loafer, túi xách hay quạt xếp để set đồ vừa tôn dáng vừa mang dấu ấn riêng!`,
    suggestedItemId: 'acc_quat_tram',
    suggestedItemName: 'Quạt Trầm Hương Điêu Khắc',
    source: 'curated_fallback',
  };
}
