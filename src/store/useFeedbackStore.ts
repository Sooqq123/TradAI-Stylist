/**
 * Feedback Store - Quản lý độc lập toàn bộ state và dữ liệu Đánh Giá & Góp Ý
 * Tuân thủ 100% Non-Regression Constraints:
 * - Tách biệt độc lập khỏi useOutfitStore
 * - Lưu trữ bền vững qua localStorage
 * - Hỗ trợ Optimistic UI update khi thêm review mới
 */

import { create } from 'zustand';
import { FeedbackItem, FeedbackCategory } from '../types/feedback';

const STORAGE_KEY = 'vietphuc_remix_feedback_v1';
const LIKED_STORAGE_KEY = 'vietphuc_remix_feedback_liked_ids';

const INITIAL_FEEDBACK_ITEMS: FeedbackItem[] = [
  {
    id: 'fb_seed_01',
    name: 'Trần Hoàng Linh (Gen Z Stylist)',
    rating: 5,
    category: 'culture',
    content:
      'Cực kỳ ấn tượng với tính năng Cultural Guardrail! Hệ thống cảnh báo rất tinh tế khi mình thử mix đồ quá lố, nhưng vẫn mở cho phép layer áo Baby Tee Y2K bên trong áo ngũ thân. Một sự cân bằng mẫu mực giữa bảo tồn di sản và tư duy thời trang trẻ.',
    timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
    likes: 42,
    avatarColor: 'from-[#FF3366] to-[#E63946]',
    roleBadge: 'Heritage Lover',
  },
  {
    id: 'fb_seed_02',
    name: 'Nguyễn Minh Châu',
    rating: 5,
    category: 'styling',
    content:
      'Outfit Baby Tee Y2K layer cùng Áo Dài tà mỏng và Chân Váy Xếp Ly Maxi lên hình lookbook xuất sắc! Mình vừa xuất ảnh 9:16 để đăng story Tết, bạn bè ai cũng hỏi xin link ứng dụng để tự phối.',
    timestamp: Date.now() - 1000 * 60 * 60 * 18, // 18 hours ago
    likes: 35,
    avatarColor: 'from-[#7209B7] to-[#B5179E]',
    roleBadge: 'Top Contributor',
  },
  {
    id: 'fb_seed_03',
    name: 'Lê Quốc Bảo (Fashion Designer)',
    rating: 5,
    category: 'ui_ux',
    content:
      'Giao diện Cyber Y2K pha trộn chất liệu di sản cực cuốn. Thao tác điều hướng có bộ 3 nút Back, Forward, Reload không hề bị văng trang hay mất outfit đang phối dở. Avatar vector 2D hiển thị mượt và rõ nét từng đường chỉ cúc áo!',
    timestamp: Date.now() - 1000 * 60 * 60 * 36, // 1.5 days ago
    likes: 29,
    avatarColor: 'from-[#4361EE] to-[#3A0CA3]',
    roleBadge: 'UI Enthusiast',
  },
  {
    id: 'fb_seed_04',
    name: 'Đỗ Phương Uyên',
    rating: 5,
    category: 'feature_request',
    content:
      'Tủ đồ đã bổ sung thêm rất nhiều chân váy xòe balloon và giày chunky platform cạp cao cực trendy. Nếu đợt tới app cập nhật thêm nón quai thao cyberpunk hoặc quạt xếp thêu họa tiết thì tuyệt vời hơn nữa!',
    timestamp: Date.now() - 1000 * 60 * 60 * 54, // 2 days ago
    likes: 18,
    avatarColor: 'from-[#06D6A0] to-[#118AB2]',
    roleBadge: 'Trendsetter',
  },
  {
    id: 'fb_seed_05',
    name: 'Vũ Đức Anh',
    rating: 5,
    category: 'styling',
    content:
      'Bản phối Áo Ngũ Thân Tay Chẽn nam mix cùng Quần Parachute Cargo dù và Chelsea Boots siêu đứng form. Tôn trọn nét phong độ lịch lãm của cổ phục mà lại phóng khoáng, trẻ trung đón xuân.',
    timestamp: Date.now() - 1000 * 60 * 60 * 80, // 3 days ago
    likes: 24,
    avatarColor: 'from-[#E76F51] to-[#F4A261]',
    roleBadge: 'Streetwear Fan',
  },
  {
    id: 'fb_seed_06',
    name: 'Hoàng Kim Ngân',
    rating: 4,
    category: 'culture',
    content:
      'Phần Cẩm Nang Triết Lý Cổ Phục viết rất sâu sắc và có tâm. Giải thích rõ ràng nguồn gốc từ triều Nguyễn đến trang phục dân dã Nam Bộ. Rất tự hào về văn hóa Việt khi trải nghiệm app này!',
    timestamp: Date.now() - 1000 * 60 * 60 * 120, // 5 days ago
    likes: 15,
    avatarColor: 'from-[#B5179E] to-[#FF3366]',
    roleBadge: 'Cultural Scholar',
  },
];

function loadStoredFeedbacks(): FeedbackItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FEEDBACK_ITEMS));
      return INITIAL_FEEDBACK_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_FEEDBACK_ITEMS;
  } catch (e) {
    console.warn('Lỗi đọc feedbacks từ localStorage:', e);
    return INITIAL_FEEDBACK_ITEMS;
  }
}

function loadLikedIds(): string[] {
  try {
    const raw = localStorage.getItem(LIKED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

interface FeedbackStoreState {
  feedbacks: FeedbackItem[];
  likedIds: string[];
  isModalOpen: boolean;
  filterCategory: FeedbackCategory | 'all';
  sortBy: 'newest' | 'highest_rating' | 'most_liked';

  // Actions
  openModal: () => void;
  closeModal: () => void;
  setFilterCategory: (cat: FeedbackCategory | 'all') => void;
  setSortBy: (sort: 'newest' | 'highest_rating' | 'most_liked') => void;
  addFeedback: (item: {
    name: string;
    rating: number;
    category: FeedbackCategory;
    content: string;
  }) => void;
  toggleLike: (id: string) => void;

  // Computed Getters
  getAverageRating: () => number;
  getTotalCount: () => number;
  getRatingBreakdown: () => Record<number, { count: number; percentage: number }>;
}

export const useFeedbackStore = create<FeedbackStoreState>((set, get) => ({
  feedbacks: loadStoredFeedbacks(),
  likedIds: loadLikedIds(),
  isModalOpen: false,
  filterCategory: 'all',
  sortBy: 'newest',

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  setFilterCategory: (cat) => set({ filterCategory: cat }),
  setSortBy: (sort) => set({ sortBy: sort }),

  addFeedback: ({ name, rating, category, content }) => {
    const avatarGradients = [
      'from-[#FF3366] to-[#E63946]',
      'from-[#7209B7] to-[#B5179E]',
      'from-[#4361EE] to-[#3A0CA3]',
      'from-[#06D6A0] to-[#118AB2]',
      'from-[#E76F51] to-[#F4A261]',
      'from-[#FFD166] to-[#F4A261]',
    ];
    const randomGradient =
      avatarGradients[Math.floor(Math.random() * avatarGradients.length)];

    const newItem: FeedbackItem = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      rating,
      category,
      content: content.trim(),
      timestamp: Date.now(),
      likes: 1,
      avatarColor: randomGradient,
      roleBadge: 'Gen Z Stylist',
    };

    set((state) => {
      // Optimistic UI update: prepend to beginning of array
      const updated = [newItem, ...state.feedbacks];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Lỗi ghi feedback vào localStorage:', err);
      }
      return { feedbacks: updated };
    });
  },

  toggleLike: (id: string) => {
    set((state) => {
      const alreadyLiked = state.likedIds.includes(id);
      const nextLikedIds = alreadyLiked
        ? state.likedIds.filter((item) => item !== id)
        : [...state.likedIds, id];

      const nextFeedbacks = state.feedbacks.map((fb) => {
        if (fb.id === id) {
          const currentLikes = fb.likes || 0;
          return {
            ...fb,
            likes: alreadyLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1,
          };
        }
        return fb;
      });

      try {
        localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(nextLikedIds));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFeedbacks));
      } catch {
        // ignore
      }

      return {
        likedIds: nextLikedIds,
        feedbacks: nextFeedbacks,
      };
    });
  },

  getAverageRating: () => {
    const list = get().feedbacks;
    if (list.length === 0) return 5.0;
    const sum = list.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round((sum / list.length) * 10) / 10;
  },

  getTotalCount: () => {
    return get().feedbacks.length;
  },

  getRatingBreakdown: () => {
    const list = get().feedbacks;
    const total = list.length || 1;
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    list.forEach((fb) => {
      const r = Math.min(5, Math.max(1, Math.round(fb.rating)));
      counts[r] = (counts[r] || 0) + 1;
    });

    const breakdown: Record<number, { count: number; percentage: number }> = {};
    for (let r = 1; r <= 5; r++) {
      breakdown[r] = {
        count: counts[r],
        percentage: Math.round((counts[r] / total) * 100),
      };
    }
    return breakdown;
  },
}));
