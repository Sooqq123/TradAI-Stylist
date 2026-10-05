/**
 * CulturalFlashcard Component - Thẻ Tương Tác Văn Hóa 3D (Fashion Tarot / Collector Card Y2K)
 * Lật 3D mượt mà bằng CSS transform: rotateY(180deg).
 * Hiển thị mặt trước với thông tin món đồ, mặt sau với 2-3 câu "Bạn có biết?" do Gemini biên soạn.
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Compass,
  MessageSquare,
  RotateCcw,
  Sparkles,
  Tag,
  Zap,
} from 'lucide-react';
import { useOutfitStore } from '../../store/useOutfitStore';
import { FashionItem } from '../../types';

interface CulturalFlashcardProps {
  item?: FashionItem;
  className?: string;
  onAskAI?: (item: FashionItem) => void;
}

/**
 * Curated 2-3 sentence engaging fun facts for cultural items
 */
function getCuratedFunFact(item: FashionItem): { era: string; fact: string; rarity: string } {
  const name = item.name.toLowerCase();
  const id = item.id.toLowerCase();
  const category = item.category;

  if (name.includes('nhật bình') || id.includes('nhat_binh')) {
    return {
      era: 'Triều Nguyễn • Thế kỷ XIX',
      rarity: 'HERITAGE ARCHIVE ★★★★★',
      fact: 'Dải cúc cài trước ngực áo Nhật Bình ghép lại thành một hình chữ nhật đặc trưng, là "đồng phục" lộng lẫy của các công chúa và hoàng hậu triều Nguyễn mỗi dịp đại lễ!',
    };
  }

  if (name.includes('ngũ thân') || id.includes('ngu_than')) {
    return {
      era: 'Triều Nguyễn • Định chế thời Minh Mạng',
      rarity: 'QUỐC PHỤC DI SẢN ★★★★★',
      fact: '5 chiếc khuy cài không chỉ để giữ áo mà tượng trưng cho 5 đức tính của người quân tử: Nhân - Lễ - Nghĩa - Trí - Tín, cùng 5 thân áo bao bọc đạo lý tứ thân phụ mẫu.',
    };
  }

  if (name.includes('bà ba') || id.includes('ba_ba')) {
    return {
      era: 'Nam Bộ • Thế kỷ XIX',
      rarity: 'DÂN GIAN PHÓNG KHOÁNG ★★★★☆',
      fact: 'Được du nhập và biến tấu ở Nam Bộ từ thế kỷ XIX, áo bà ba có 2 túi đắp to tiện dụng cùng đường xẻ tà 2 bên giúp việc cử động và di chuyển cực kỳ phóng khoáng!',
    };
  }

  if (name.includes('tứ thân') || id.includes('tu_than')) {
    return {
      era: 'Kinh Bắc • Cổ truyền Đại Việt',
      rarity: 'DI SẢN QUAN HỌ ★★★★★',
      fact: 'Bốn vạt áo tượng trưng cho tứ thân phụ mẫu (cha mẹ mình và cha mẹ người thương), thắt lưng lụa đào duyên dáng gắn kết tình nghĩa phu thê son sắt!',
    };
  }

  if (name.includes('giao lĩnh') || id.includes('giao_linh')) {
    return {
      era: 'Triều Lê Sơ • Thế kỷ XV',
      rarity: 'HOÀNG TRIỀU KINH ĐIỂN ★★★★★',
      fact: 'Áo Giao Lĩnh cổ chéo vạt sang phải là dáng áo tôn nghiêm thịnh hành bậc nhất thời Lý - Trần - Lê, biểu trưng cho sự ngay thẳng và đạo phong nho nhã.',
    };
  }

  if (name.includes('áo dài') || id.includes('ao_dai')) {
    return {
      era: 'Hà Nội & Sài Gòn • Thế kỷ XX - Nay',
      rarity: 'BIỂU TƯỢNG QUỐC GIA ★★★★★',
      fact: 'Đường xẻ tà áo dài cao tới eo kết hợp cùng quần lụa suông bắt nguồn từ bước tiến cách tân áo Lemur và Lê Phổ thập niên 1930, tôn trọn nét thanh tao thuần Việt.',
    };
  }

  if (name.includes('khăn vấn') || id.includes('khan_van')) {
    return {
      era: 'Bắc Bộ & Cung Đình Huế',
      rarity: 'VẬT PHẨM TRANG TRỌNG ★★★★☆',
      fact: 'Khăn vấn được xếp nếp chữ Nhất hoặc chữ Nhân tinh tế, giúp cố định mái tóc gọn gàng và tôn lên vầng trán sáng sủa của người mặc.',
    };
  }

  if (name.includes('quạt') || id.includes('quat')) {
    return {
      era: 'Làng nghề Chàng Sơn & Huế',
      rarity: 'PHỤ KIỆN PHONG LƯU ★★★★☆',
      fact: 'Chiếc quạt trầm hương vừa để che nắng du xuân vừa tỏa hương thơm dịu nhẹ, là phụ kiện thanh tao kinh điển của các tao nhân mặc khách đất Thần Kinh.',
    };
  }

  if (name.includes('guốc') || id.includes('guoc')) {
    return {
      era: 'Dân gian thế kỷ XIX',
      rarity: 'KỶ NIỆM HOÀI NIỆM ★★★☆☆',
      fact: 'Tiếng lách cách rộn ràng của đôi guốc mộc quai nhung từng là thanh âm đặc trưng của các thiếu nữ Tràng An mỗi mùa trẩy hội chùa Hương.',
    };
  }

  if (name.includes('sneaker') || item.eraOrigin === 'modern') {
    return {
      era: 'Cyber Y2K • Thời đại số đương đại',
      rarity: 'REMIX ĐƯƠNG ĐẠI ★★★★☆',
      fact: 'Sự kết hợp giữa sneaker thể thao hiện đại và tà áo cổ phục tạo nên bản phối Cyber Heritage đầy năng lượng, mang di sản bước thẳng vào đời sống thường nhật!',
    };
  }

  return {
    era: 'Văn hóa Cổ truyền Việt Nam',
    rarity: 'DI SẢN VIỆT PHỤC ★★★★☆',
    fact: 'Mỗi đường kim mũi chỉ trên tà áo Việt đều gửi gắm triết lý hòa hợp với thiên nhiên và sự khiêm nhường, phong nhã của tiền nhân.',
  };
}

export const CulturalFlashcard: React.FC<CulturalFlashcardProps> = ({
  item: propItem,
  className = '',
  onAskAI,
}) => {
  const { currentOutfit } = useOutfitStore();
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Active item: propItem > currentOutfit.garment
  const activeItem = propItem || currentOutfit.garment;

  if (!activeItem) return null;

  const info = getCuratedFunFact(activeItem);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className={`h-[320px] w-full relative ${className}`}>
      {/* 3D Flip Card Container */}
      <div
        onClick={handleCardClick}
        className="group perspective-1000 h-[320px] w-full relative cursor-pointer select-none"
        title="Bấm hoặc chạm để lật thẻ xem Fun Facts lịch sử"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
          }
        }}
      >
        <div
          className={`relative w-full h-full rounded-2xl transition-transform duration-700 transform-style-3d shadow-xl shadow-black/20 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ================= FRONT FACE ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl bg-[#120F1D] bg-gradient-to-br from-[#1A162B] via-[#120F1D] to-[#0A0812] border-2 border-slate-300/40 p-4 sm:p-5 flex flex-col justify-between overflow-hidden ring-1 ring-white/20 backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              backgroundColor: '#120F1D',
            }}
          >
            {/* Holographic Sheen Overlay */}
            <div className="absolute inset-0 holographic-sheen opacity-15 pointer-events-none rounded-2xl" />

            {/* Card Header & Collector Badges */}
            <div className="relative z-10 flex items-center justify-between gap-2 shrink-0">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#FFD166] flex items-center gap-1">
                <span>✦</span>
                <span>{info.rarity}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/15 font-semibold">
                {activeItem.gender === 'nam'
                  ? '♂ Quý Anh'
                  : activeItem.gender === 'nu'
                  ? '♀ Quý Cô'
                  : '⚧ Phi giới tính'}
              </span>
            </div>

            {/* Center Visual Art Frame */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center p-2.5 shadow-inner border border-white/20 relative group-hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundColor: `${activeItem.colorHex || '#9E2A2B'}30`,
                }}
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                  style={{ backgroundColor: activeItem.colorHex || '#FF3366' }}
                />
                {activeItem.imageUrl ? (
                  <img
                    src={activeItem.imageUrl}
                    alt={activeItem.name}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                ) : (
                  <Sparkles
                    className="w-10 h-10"
                    style={{ color: activeItem.colorHex || '#FFD166' }}
                  />
                )}
              </div>

              {/* Title & Era */}
              <h3 className="font-editorial text-base sm:text-lg font-bold text-white text-center mt-2.5 tracking-tight line-clamp-1">
                {activeItem.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#06D6A0] font-semibold mt-0.5">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{info.era}</span>
              </div>
            </div>

            {/* Bottom Flip Indicator */}
            <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 shrink-0">
              <span className="flex items-center gap-1.5 text-[#FF3366] font-bold">
                <RotateCcw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Chạm để lật thẻ</span>
              </span>
              <span className="text-[10px] text-slate-400">Xem bí mật lịch sử ➔</span>
            </div>
          </div>

          {/* ================= BACK FACE ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl bg-[#140F20] bg-gradient-to-br from-[#151024] via-[#1B1128] to-[#0E0B1A] border-2 border-[#FFD166]/50 p-4 sm:p-5 flex flex-col justify-between overflow-hidden ring-1 ring-[#FFD166]/30 rotate-y-180 backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              backgroundColor: '#140F20',
            }}
          >
            {/* Holographic Sheen Overlay */}
            <div className="absolute inset-0 holographic-sheen opacity-20 pointer-events-none rounded-2xl" />

            {/* Back Header */}
            <div className="relative z-10 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#FFD166]">
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#FFD166]" />
                <span className="truncate">BẠN CÓ BIẾT? (CULTURAL FUN FACT)</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono shrink-0">
                #AI HERITAGE
              </span>
            </div>

            {/* Center Story Content */}
            <div className="relative z-10 flex-1 overflow-y-auto pr-1 my-2 flex flex-col justify-center space-y-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                <p className="text-xs sm:text-[13px] text-slate-100 leading-relaxed font-medium italic">
                  "{info.fact}"
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 shrink-0">
                <BookOpen className="w-3 h-3 text-[#06D6A0] shrink-0" />
                <span className="line-clamp-1">Trích lục từ kho tàng văn hóa & di sản Việt Nam.</span>
              </div>
            </div>

            {/* Back Actions */}
            <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAskAI) onAskAI(activeItem);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3366] to-[#B5179E] hover:brightness-110 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Hỏi Gemini về món này</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
                title="Lật lại mặt trước"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
