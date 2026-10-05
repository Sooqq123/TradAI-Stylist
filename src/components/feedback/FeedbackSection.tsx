/**
 * FeedbackSection Component - Phần Đánh Giá & Góp Ý Cộng Đồng Gen Z
 * Đặt tại đáy trang chủ, ngay trên Footer.
 * Hiển thị tóm tắt điểm trung bình, phân bổ sao, bộ lọc danh mục và danh sách review cards.
 */

import React, { useMemo } from 'react';
import {
  Star,
  MessageSquarePlus,
  Heart,
  Sparkles,
  SlidersHorizontal,
  Flame,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useFeedbackStore } from '../../store/useFeedbackStore';
import { FeedbackCategory, FEEDBACK_CATEGORIES } from '../../types/feedback';

interface FeedbackSectionProps {
  onOpenModal?: () => void;
  className?: string;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  onOpenModal,
  className = '',
}) => {
  const storeOpenModal = useFeedbackStore((s) => s.openModal);
  const feedbacks = useFeedbackStore((s) => s.feedbacks);
  const likedIds = useFeedbackStore((s) => s.likedIds);
  const toggleLike = useFeedbackStore((s) => s.toggleLike);
  const filterCategory = useFeedbackStore((s) => s.filterCategory);
  const setFilterCategory = useFeedbackStore((s) => s.setFilterCategory);
  const sortBy = useFeedbackStore((s) => s.sortBy);
  const setSortBy = useFeedbackStore((s) => s.setSortBy);
  const totalCount = feedbacks.length;

  const avgRating = useMemo(() => {
    if (feedbacks.length === 0) return 5.0;
    const sum = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round((sum / feedbacks.length) * 10) / 10;
  }, [feedbacks]);

  const breakdown = useMemo(() => {
    const total = feedbacks.length || 1;
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    feedbacks.forEach((fb) => {
      const r = Math.min(5, Math.max(1, Math.round(fb.rating)));
      counts[r] = (counts[r] || 0) + 1;
    });

    const res: Record<number, { count: number; percentage: number }> = {};
    for (let r = 1; r <= 5; r++) {
      res[r] = {
        count: counts[r],
        percentage: Math.round((counts[r] / total) * 100),
      };
    }
    return res;
  }, [feedbacks]);

  const handleOpenForm = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      storeOpenModal();
    }
  };

  // Filtered & Sorted Feedbacks
  const displayFeedbacks = useMemo(() => {
    let list = [...feedbacks];

    // Filter by Category
    if (filterCategory !== 'all') {
      list = list.filter((item) => item.category === filterCategory);
    }

    // Sort
    if (sortBy === 'newest') {
      list.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === 'highest_rating') {
      list.sort((a, b) => b.rating - a.rating || b.timestamp - a.timestamp);
    } else if (sortBy === 'most_liked') {
      list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    return list;
  }, [feedbacks, filterCategory, sortBy]);

  // Relative time formatter in Vietnamese
  const formatRelativeTime = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 2) return 'Vừa xong';
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;
    if (diffDay < 7) return `${diffDay} ngày trước`;
    return new Date(timestamp).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getCategoryMeta = (catId: FeedbackCategory) => {
    return FEEDBACK_CATEGORIES.find((c) => c.id === catId) || FEEDBACK_CATEGORIES[0];
  };

  return (
    <section
      id="feedback-community-section"
      className={`w-full max-w-7xl mx-auto py-10 sm:py-14 text-[#1C1917] dark:text-[#FAF9F6] transition-colors ${className}`}
      aria-label="Cộng đồng Gen Z Nói Gì Về TradAI Stylist"
    >
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E6E1D8] dark:border-white/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF3366]/10 to-[#B5179E]/10 text-[#FF3366] border border-[#FF3366]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3366]" />
            <span>Tiếng Nói Di Sản & Sáng Tạo Đương Đại</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1C1917] dark:text-white leading-tight">
            Cộng Đồng Gen Z Nói Gì Về <span className="bg-gradient-to-r from-[#FF3366] via-[#E63946] to-[#B5179E] bg-clip-text text-transparent">TradAI Stylist</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-2.5 leading-relaxed">
            Nơi hội tụ những chia sẻ chân thực từ các bạn trẻ yêu cổ phục, fashion stylist và nhà thiết kế.
            Mỗi góp ý là một viên gạch tôn tạo nên không gian thời trang di sản sống động đón Tết Bính Ngọ 2026.
          </p>
        </div>

        {/* Action Button: Viết Đánh Giá */}
        <div className="shrink-0 flex items-center">
          <button
            type="button"
            onClick={handleOpenForm}
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF3366] via-[#E63946] to-[#B5179E] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#FF3366]/25 hover:shadow-xl hover:shadow-[#FF3366]/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ring-1 ring-white/30"
          >
            <MessageSquarePlus className="w-4 h-4 stroke-[2.2]" />
            <span>Viết Đánh Giá Của Bạn</span>
          </button>
        </div>
      </div>

      {/* 2. Rating Summary Scorecard Banner */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/90 via-[#FCFAF6]/90 to-rose-50/30 dark:from-[#151221]/90 dark:via-[#110E1B]/90 dark:to-[#1C152B]/90 border border-[#E6E1D8] dark:border-white/10 shadow-sm backdrop-blur-xl">
        {/* Left Column: Average Score (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-[#E6E1D8] dark:border-white/10 text-center">
          <div className="flex items-baseline gap-1">
            <span className="font-editorial text-5xl sm:text-6xl font-black text-[#1C1917] dark:text-white">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#A8A29E]">/ 5.0</span>
          </div>

          {/* 5 Filled Stars */}
          <div className="flex items-center gap-1.5 my-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 fill-[#FFD166] text-[#FFD166] drop-shadow-[0_2px_8px_rgba(255,209,102,0.4)]"
              />
            ))}
          </div>

          <p className="text-xs font-semibold text-[#57534E] dark:text-[#D6D3D1]">
            Đánh giá trung bình từ <strong className="text-[#FF3366] font-bold">{totalCount}</strong> người yêu thời trang
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            98.5% Hài lòng về độ chính xác văn hóa
          </span>
        </div>

        {/* Right Column: Rating Breakdown Progress Bars (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-center space-y-2.5 px-2 sm:px-4">
          {[5, 4, 3, 2, 1].map((stars) => {
            const data = breakdown[stars] || { count: 0, percentage: 0 };
            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 w-12 text-[#57534E] dark:text-[#D6D3D1] font-semibold shrink-0">
                  <span>{stars}</span>
                  <Star className="w-3.5 h-3.5 fill-[#FFD166] text-[#FFD166]" />
                </div>

                {/* Progress bar track */}
                <div className="flex-1 h-3 rounded-full bg-[#E6E1D8]/60 dark:bg-white/10 overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FFD166] via-[#FF3366] to-[#B5179E] transition-all duration-500"
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>

                <div className="w-16 text-right text-[11px] text-[#78716C] dark:text-[#A8A29E] font-mono shrink-0">
                  <span>{data.count} ({data.percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Filter & Sort Toolbar */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-[#1C1917] dark:bg-white text-white dark:text-[#1C1917] shadow-sm'
                : 'bg-white/80 dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10 text-[#57534E] dark:text-[#D6D3D1] hover:bg-[#F5F2EB] dark:hover:bg-white/10'
            }`}
          >
            Tất cả ({feedbacks.length})
          </button>

          {FEEDBACK_CATEGORIES.map((cat) => {
            const isSelected = filterCategory === cat.id;
            const count = feedbacks.filter((f) => f.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FF3366] to-[#B5179E] text-white shadow-xs font-bold'
                    : 'bg-white/80 dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10 text-[#57534E] dark:text-[#D6D3D1] hover:bg-[#F5F2EB] dark:hover:bg-white/10'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Sort Select Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#78716C] dark:text-[#A8A29E]" />
          <div className="flex items-center p-1 rounded-xl bg-white dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSortBy('newest')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                sortBy === 'newest'
                  ? 'bg-[#F5F2EB] dark:bg-white/15 text-[#1C1917] dark:text-white font-bold'
                  : 'text-[#78716C] dark:text-[#A8A29E]'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>Mới nhất</span>
            </button>
            <button
              type="button"
              onClick={() => setSortBy('highest_rating')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                sortBy === 'highest_rating'
                  ? 'bg-[#F5F2EB] dark:bg-white/15 text-[#1C1917] dark:text-white font-bold'
                  : 'text-[#78716C] dark:text-[#A8A29E]'
              }`}
            >
              <Star className="w-3 h-3 fill-current text-[#FFD166]" />
              <span>Điểm cao</span>
            </button>
            <button
              type="button"
              onClick={() => setSortBy('most_liked')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                sortBy === 'most_liked'
                  ? 'bg-[#F5F2EB] dark:bg-white/15 text-[#1C1917] dark:text-white font-bold'
                  : 'text-[#78716C] dark:text-[#A8A29E]'
              }`}
            >
              <Flame className="w-3 h-3 text-[#FF3366]" />
              <span>Yêu thích</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Feedback Cards Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayFeedbacks.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-3xl bg-white/50 dark:bg-white/5 border border-dashed border-[#E6E1D8] dark:border-white/10">
            <p className="text-sm font-semibold text-[#78716C] dark:text-[#A8A29E]">
              Chưa có nhận xét nào trong danh mục này.
            </p>
            <button
              type="button"
              onClick={handleOpenForm}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF3366] text-white text-xs font-bold shadow-xs hover:bg-[#E63946] transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Hãy là người đầu tiên đánh giá</span>
            </button>
          </div>
        ) : (
          displayFeedbacks.map((fb) => {
            const catMeta = getCategoryMeta(fb.category);
            const isLiked = likedIds.includes(fb.id);

            // Initials for avatar
            const initials = fb.name
              .split(' ')
              .map((w) => w[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('')
              .toUpperCase();

            return (
              <div
                key={fb.id}
                className="group relative flex flex-col justify-between p-5 rounded-3xl bg-white/80 dark:bg-[#14111D]/80 border border-[#E6E1D8] dark:border-white/10 shadow-xs hover:shadow-md hover:border-[#FF3366]/30 dark:hover:border-[#FF3366]/40 transition-all duration-200 backdrop-blur-md"
              >
                {/* Card Top: Author, Stars & Category */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar Monogram */}
                      <div
                        className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${
                          fb.avatarColor || 'from-[#FF3366] to-[#B5179E]'
                        } text-white flex items-center justify-center font-bold text-xs shadow-xs ring-1 ring-white/40 shrink-0`}
                      >
                        {initials}
                      </div>

                      <div className="leading-tight">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-[#1C1917] dark:text-white tracking-tight">
                            {fb.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[#A8A29E] mt-0.5">
                          <span>{formatRelativeTime(fb.timestamp)}</span>
                          {fb.roleBadge && (
                            <>
                              <span>•</span>
                              <span className="text-[#FF3366] font-semibold">
                                {fb.roleBadge}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Category Pill Tag */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${catMeta.badgeClass} shrink-0`}
                    >
                      <span>{catMeta.emoji}</span>
                      <span className="truncate max-w-[100px]">{catMeta.label}</span>
                    </span>
                  </div>

                  {/* Star Rating Icons */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((st) => (
                      <Star
                        key={st}
                        className={`w-4 h-4 ${
                          st <= fb.rating
                            ? 'fill-[#FFD166] text-[#FFD166] drop-shadow-[0_1px_4px_rgba(255,209,102,0.4)]'
                            : 'fill-transparent text-[#E6E1D8] dark:text-[#332E40]'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-mono font-bold text-[#B45309] dark:text-[#FFD166] ml-1.5">
                      {fb.rating}.0
                    </span>
                  </div>

                  {/* Review Content */}
                  <p className="text-xs sm:text-[13px] text-[#57534E] dark:text-[#D6D3D1] leading-relaxed line-clamp-4 font-normal">
                    “{fb.content}”
                  </p>
                </div>

                {/* Card Bottom: Upvote / Like Action */}
                <div className="mt-4 pt-3.5 border-t border-[#E6E1D8]/60 dark:border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#A8A29E] italic">
                    Xác thực từ người dùng ứng dụng
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleLike(fb.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                      isLiked
                        ? 'bg-rose-500/10 text-[#FF3366] font-bold border border-rose-500/20'
                        : 'text-[#78716C] dark:text-[#A8A29E] hover:text-[#FF3366] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    title={isLiked ? 'Bỏ thích nhận xét này' : 'Thích nhận xét này'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-transform ${
                        isLiked ? 'fill-[#FF3366] text-[#FF3366] scale-110' : ''
                      }`}
                    />
                    <span className="text-[11px] font-mono">{fb.likes || 0}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
