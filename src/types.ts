/**
 * Việt Phục Remix - Type Definitions
 * Data contract for Vietnamese traditional and contemporary fashion remix studio,
 * AI Stylist Copilot, and Cultural Guardrail Engine.
 */

export type Gender = 'nam' | 'nu' | 'unisex';

export type GarmentType =
  | 'ao_dai'
  | 'ngu_than'
  | 'ba_ba'
  | 'tu_than'
  | 'nhat_binh'
  | 'giao_linh'
  | 'baby_tee'
  | 'corset'
  | 'blazer'
  | 'tanktop'
  | 'cuban_shirt';

export type OccasionType = 'chup_anh_tet' | 'du_xuan' | 'le_chua' | 'gap_ban_be';

export type StyleVibe = 'y2k' | 'streetwear' | 'minimal' | 'vintage' | 'feminine';

export type ItemCategory = 'garment' | 'bottom' | 'footwear' | 'headwear' | 'accessory';

export type EraOrigin = 'traditional' | 'modern';

export interface FashionItem {
  id: string;
  name: string;
  category: ItemCategory;
  garmentType?: GarmentType;
  gender?: Gender;
  rendererKey?: string;
  eraOrigin: EraOrigin;
  imageUrl?: string;
  colorHex: string;
  tags: string[];
  description: string;
  material?: string;
  culturalNote?: string;
}

export interface CulturalInsight {
  garmentId: GarmentType | string;
  garmentName: string;
  historicalPeriod: string;
  corePhilosophy: string;
  keepElements: string[];
  remixableElements: string[];
  modernTips: string[];
  silhouetteGuide?: string;
}

export interface CulturalRule {
  id: string;
  incompatibleIds: [string, string];
  severity: 'warning' | 'violation';
  reason: string;
  suggestion: string;
  contextOccasion?: OccasionType;
}

export interface Outfit {
  id: string;
  name: string;
  gender?: Gender;
  garment: FashionItem;
  bottom?: FashionItem;
  footwear?: FashionItem;
  headwear?: FashionItem;
  accessories: FashionItem[];
  colorHex: string;
  occasion: OccasionType;
  style: StyleVibe;
  culturalBalance: number; // 0 (100% Street/Y2K modern) to 100 (100% Pure Heritage)
  matchScore?: number;     // Điểm ăn ý hài hòa tổng thể (0-100)
  tags: string[];
  isIntentionalRemix?: boolean; // Chế độ 'Phá cách có chủ đích' (Intentional Edgy Remix)
  createdAt?: string;
}

export type ViewMode = 'studio' | 'builder' | 'gallery' | 'saved' | 'lookbook';

export type ThemeMode = 'light' | 'dark';

export interface ValidationResult {
  isValid: boolean;
  warnings: CulturalRule[];
  violations: CulturalRule[];
}

export interface FilterState {
  occasion: OccasionType | 'all';
  style: StyleVibe | 'all';
  category: ItemCategory | 'all';
  era: 'all' | EraOrigin;
  gender?: Gender | 'all';
  searchKeyword: string;
}

export interface OccasionMeta {
  type: OccasionType;
  label: string;
  subtitle: string;
  iconName: string;
  recommendedVibes: StyleVibe[];
  dressCodeNote: string;
}

export interface StyleMeta {
  vibe: StyleVibe;
  label: string;
  description: string;
  colorPalette: string[];
}

// ================= AI STYLIST & COPILOT TYPES =================

/**
 * Kết quả phân tích ngữ cảnh không gian và ý định của người dùng từ Text hoặc Image input.
 */
export interface ContextAnalysisResult {
  environment: string;        // Không gian/Địa điểm nhận diện được (ví dụ: 'Đền chùa cổ kính', 'Quán cà phê phố cổ')
  culturalBoundary: string;   // Ranh giới văn hóa cần lưu ý (ví dụ: 'Trang phục cần kín đáo, tránh lộ đùi/vai')
  userIntent: string;         // Tâm lý/Sở thích của người dùng (ví dụ: 'Thích phong cách Y2K nổi bật nhưng vẫn tôn trọng di sản')
  recommendedGarments: GarmentType[];
  recommendedVibe: string;
}

/**
 * Phản hồi Copilot theo thời gian thực khi người dùng phối từng món đồ.
 */
export interface CopilotFeedback {
  matchScore: number;         // Điểm ăn ý outfit (0-100)
  balanceScore: number;       // Thang đo văn hóa (0: Phá cách cực đoan -> 100: Cổ điển nghiêm cẩn)
  stylistComment: string;     // Bình luận vui vẻ, trẻ trung chuẩn Gen Z
  culturalFact: string;       // 2-3 câu fun fact về món đồ vừa chọn
}

/**
 * Tư vấn rào chắn bảo tồn văn hóa (Guardrail Advice)
 */
export interface GuardrailAdvice {
  isBoundaryCrossed: boolean;
  reason: string;
  gentleSuggestion: string;
  intentionalEdgyAlternative: string; // Chế độ "Phá cách có chủ đích"
}
