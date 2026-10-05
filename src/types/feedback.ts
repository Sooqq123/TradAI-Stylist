/**
 * Feedback Data Types & Constants for "Việt Phục Remix"
 */

export type FeedbackCategory =
  | 'styling'
  | 'culture'
  | 'ui_ux'
  | 'feature_request'
  | 'other';

export interface FeedbackItem {
  id: string;
  name: string;
  rating: number; // 1 - 5
  category: FeedbackCategory;
  content: string;
  timestamp: number; // Unix timestamp
  likes?: number;
  avatarColor?: string;
  roleBadge?: string;
}

export interface FeedbackCategoryMeta {
  id: FeedbackCategory;
  label: string;
  emoji: string;
  description: string;
  badgeClass: string;
}

export const FEEDBACK_CATEGORIES: FeedbackCategoryMeta[] = [
  {
    id: 'styling',
    label: 'Trải nghiệm phối đồ',
    emoji: '✨',
    description: 'Độ linh hoạt khi mix & match giữa Việt phục và phong cách Gen Z',
    badgeClass: 'bg-[#FF3366]/10 text-[#FF3366] border-[#FF3366]/20',
  },
  {
    id: 'culture',
    label: 'Độ chính xác văn hóa',
    emoji: '🏮',
    description: 'Tính chuẩn mực của cấu trúc ngũ thân, áo dài, áo bà ba và quy tắc di sản',
    badgeClass: 'bg-[#E76F51]/10 text-[#E76F51] border-[#E76F51]/20',
  },
  {
    id: 'ui_ux',
    label: 'Giao diện & Thẩm mỹ',
    emoji: '🎨',
    description: 'Phong cách Cyber Y2K, đồ họa vector 2.5D và trải nghiệm tương tác',
    badgeClass: 'bg-[#7209B7]/10 text-[#7209B7] dark:text-[#B5179E] border-[#7209B7]/20',
  },
  {
    id: 'feature_request',
    label: 'Gợi ý tính năng mới',
    emoji: '💡',
    description: 'Đề xuất thêm trang phục, phụ kiện, AI stylist hoặc công cụ sáng tạo',
    badgeClass: 'bg-[#06D6A0]/10 text-[#06D6A0] border-[#06D6A0]/20',
  },
  {
    id: 'other',
    label: 'Khác',
    emoji: '💬',
    description: 'Những chia sẻ, cảm nghĩ và câu chuyện thời trang khác',
    badgeClass: 'bg-[#4361EE]/10 text-[#4361EE] border-[#4361EE]/20',
  },
];
