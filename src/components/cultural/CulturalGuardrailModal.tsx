/**
 * CulturalGuardrailModal Component - Cố Vấn Văn Hóa & Thời Trang Tinh Tế
 * Hỗ trợ 2 hướng đi: Safe Path (Gợi ý thanh lịch) & Creative Path ("Phá cách có chủ đích")
 * Tông giọng cởi mở, không chỉ trích hay cấm đoán.
 */

import React from 'react';
import {
  ArrowRight,
  Check,
  Compass,
  Flame,
  Info,
  Palette,
  Shield,
  ShieldAlert,
  Sparkles,
  Wand2,
  X,
  Zap,
} from 'lucide-react';
import { MOCK_BOTTOMS } from '../../data/mockData';
import { useOutfitStore } from '../../store/useOutfitStore';
import { CulturalRule } from '../../types';

interface CulturalGuardrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  rule?: CulturalRule | null;
  onShowToast?: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const CulturalGuardrailModal: React.FC<CulturalGuardrailModalProps> = ({
  isOpen,
  onClose,
  rule,
  onShowToast,
}) => {
  const { currentOutfit, setBottom, removeAccessory, setIntentionalRemix } = useOutfitStore();

  if (!isOpen) return null;

  const currentBottom = currentOutfit.bottom;
  const isShortOrDistressed =
    currentBottom?.id === 'bottom_parachute_cargo' ||
    currentBottom?.id === 'bottom_short_ripped' ||
    rule?.incompatibleIds.includes('bottom_parachute_cargo') ||
    rule?.incompatibleIds.includes('bottom_short_ripped');

  // Handle Safe Path: Apply elegant recommendation
  const handleApplySafePath = () => {
    if (isShortOrDistressed) {
      setBottom(MOCK_BOTTOMS[0]); // Quần Lụa Trắng Dáng Suông
      if (onShowToast) {
        onShowToast('Đã chuyển sang Quần Lụa Trắng Dáng Suông thanh lịch!', 'success');
      }
    } else if (rule?.incompatibleIds.includes('acc_kinhram_y2k')) {
      removeAccessory('acc_kinhram_y2k');
      if (onShowToast) {
        onShowToast('Đã tháo kính râm khi vào không gian đền chùa!', 'info');
      }
    } else {
      setBottom(MOCK_BOTTOMS[0]);
      if (onShowToast) {
        onShowToast('Đã tinh chỉnh trang phục hài hòa di sản!', 'success');
      }
    }
    onClose();
  };

  // Handle Creative Path: Intentional Edgy Remix
  const handleEnableCreativePath = () => {
    setIntentionalRemix(true);
    if (onShowToast) {
      onShowToast(
        'Đã kích hoạt chế độ "Phá Cách Có Chủ Đích"!',
        'success'
      );
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guardrail-modal-title"
    >
      <div className="relative w-full max-w-xl my-auto rounded-3xl bg-[#0F0C18]/95 dark:bg-[#0D0B14]/95 border border-amber-500/40 p-5 sm:p-7 text-white shadow-[0_0_60px_rgba(245,158,11,0.2)] ring-1 ring-white/10 transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-[#FF3366] flex items-center justify-center text-white shadow-md shadow-amber-500/30 ring-1 ring-white/30">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
              <span>✦</span>
              <span>CỐ VẤN VĂN HÓA & THỜI TRANG REMIX</span>
            </div>
            <h2 id="guardrail-modal-title" className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-white">
              Góc Nhìn Cân Bằng Di Sản
            </h2>
          </div>
        </div>

        {/* 3 Pillars of Empathy */}
        <div className="flex flex-col gap-3.5 mb-6">
          {/* Pillar 1: Cultural Touchpoint */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
            <span className="text-base select-none shrink-0 mt-0.5">🛑</span>
            <div>
              <h4 className="text-xs font-bold text-amber-400 mb-1">
                Điểm Chạm Văn Hóa
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {rule?.reason ||
                  'Cách phối này có thể gây hiểu lầm hoặc mất đi sự trang nghiêm tại không gian tâm linh, đền chùa hoặc các nghi lễ trang trọng ngày Tết.'}
              </p>
            </div>
          </div>

          {/* Pillar 2: Elegant Suggestion (Safe Path) */}
          <div className="p-3.5 rounded-2xl bg-[#06D6A0]/10 border border-[#06D6A0]/25 flex items-start gap-3">
            <span className="text-base select-none shrink-0 mt-0.5">💡</span>
            <div>
              <h4 className="text-xs font-bold text-[#06D6A0] mb-1">
                Gợi Ý Tinh Tế (Safe Path)
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {rule?.suggestion ||
                  'Nếu bạn muốn giữ nét năng động, hãy thử thay bằng quần lụa đen ống suông xắn gấu nhẹ hoặc quần âu cạp cao. Phom dáng sẽ vừa giữ vững vẻ thanh lịch vừa tôn dáng tà áo.'}
              </p>
            </div>
          </div>

          {/* Pillar 3: Intentional Edgy Mode (Creative Path) */}
          <div className="p-3.5 rounded-2xl bg-[#FF3366]/10 border border-[#FF3366]/25 flex items-start gap-3">
            <span className="text-base select-none shrink-0 mt-0.5">⚡</span>
            <div>
              <h4 className="text-xs font-bold text-[#FF3366] mb-1">
                Chế Độ 'Phá Cách Có Chủ Đích' (Creative Path)
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Nếu đây là concept chụp ảnh thời trang nghệ thuật (Editorial / Runway ngoài phố), bạn có thể bật chế độ Phá Cách. Hệ thống sẽ gắn nhãn <strong>'Biến Tấu Đương Đại'</strong> cho Lookbook của bạn để người xem thấu hiểu trọn vẹn ý đồ nghệ thuật.
              </p>
            </div>
          </div>
        </div>

        {/* 2 Fast Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
          {/* Button 1: Safe Path */}
          <button
            type="button"
            onClick={handleApplySafePath}
            className="w-full sm:flex-1 py-3 px-4 rounded-2xl text-xs font-extrabold text-white bg-gradient-to-r from-[#06D6A0] to-[#048C6B] hover:brightness-110 shadow-md shadow-[#06D6A0]/25 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Áp dụng gợi ý thanh lịch</span>
          </button>

          {/* Button 2: Creative Path */}
          <button
            type="button"
            onClick={handleEnableCreativePath}
            className="w-full sm:flex-1 py-3 px-4 rounded-2xl text-xs font-extrabold text-white bg-gradient-to-r from-[#FF3366] via-[#E63946] to-[#B5179E] hover:brightness-110 shadow-md shadow-[#FF3366]/25 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-[#FFD166]" />
            <span>Giữ nguyên & Gắn nhãn Phá Cách</span>
          </button>
        </div>
      </div>
    </div>
  );
};
