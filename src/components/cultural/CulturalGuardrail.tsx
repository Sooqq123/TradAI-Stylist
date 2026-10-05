/**
 * CulturalGuardrail Component - Cố Vấn Văn Hóa & Phong Cách Remix
 * Tông giọng đồng hành, cởi mở, không phán xét, tích hợp chế độ "Phá cách có chủ đích".
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Compass,
  Flame,
  Info,
  RotateCcw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wand2,
  Zap,
} from 'lucide-react';
import { MOCK_BOTTOMS } from '../../data/mockData';
import { useOutfitStore } from '../../store/useOutfitStore';
import { CulturalRule } from '../../types';
import { CulturalGuardrailModal } from './CulturalGuardrailModal';

export const CulturalGuardrail: React.FC = () => {
  const {
    currentOutfit,
    validationResult,
    setBottom,
    removeAccessory,
    setIntentionalRemix,
  } = useOutfitStore();

  const [fixSuccessMsg, setFixSuccessMsg] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRule, setSelectedRule] = useState<CulturalRule | null>(null);

  // 1-Click Safe Path
  const handleApplySafePath = (rule?: CulturalRule) => {
    if (
      rule?.incompatibleIds.includes('bottom_parachute_cargo') ||
      rule?.incompatibleIds.includes('bottom_short_ripped') ||
      currentOutfit.bottom?.id === 'bottom_parachute_cargo'
    ) {
      setBottom(MOCK_BOTTOMS[0]); // Quần Lụa Trắng Dáng Suông
      setFixSuccessMsg('Đã thay bằng Quần Lụa Trắng Dáng Suông thanh lịch!');
      setTimeout(() => setFixSuccessMsg(null), 3000);
      return;
    }

    if (rule?.incompatibleIds.includes('acc_kinhram_y2k')) {
      removeAccessory('acc_kinhram_y2k');
      setFixSuccessMsg('Đã tháo kính râm để tôn vinh sự thanh tịnh chốn thờ tự!');
      setTimeout(() => setFixSuccessMsg(null), 3000);
      return;
    }

    setBottom(MOCK_BOTTOMS[0]);
    setFixSuccessMsg('Đã điều chỉnh trang phục hài hòa chuẩn mực di sản!');
    setTimeout(() => setFixSuccessMsg(null), 3000);
  };

  // 1-Click Creative Path (Intentional Edgy Remix)
  const handleEnableCreativePath = () => {
    setIntentionalRemix(true);
    setFixSuccessMsg('Đã kích hoạt chế độ "Phá Cách Có Chủ Đích"!');
    setTimeout(() => setFixSuccessMsg(null), 3000);
  };

  // Case 0: Currently in "Intentional Edgy Remix" mode
  if (currentOutfit.isIntentionalRemix) {
    return (
      <div className="rounded-2xl bg-gradient-to-r from-[#FF3366]/10 via-[#B5179E]/10 to-[#7B2CBF]/10 border border-[#FF3366]/35 p-3.5 sm:p-4 text-white shadow-[0_0_24px_rgba(255,51,102,0.15)] transition-all animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF3366] to-[#B5179E] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Flame className="w-4 h-4 text-[#FFD166]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF3366]">
                  EXPERIMENTAL REMIX
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#FF3366]/20 text-[#FFD166] border border-[#FF3366]/30 font-bold">
                  Biến Tấu Đương Đại
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5 font-medium">
                Set đồ đang ở chế độ phá cách nghệ thuật. Đã mở khóa lưu trữ & xuất Lookbook!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIntentionalRemix(false)}
            className="text-[11px] font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto"
          >
            Quay lại chuẩn mực
          </button>
        </div>
      </div>
    );
  }

  // Case 1: Active Incompatibility / Caution Notice (Amber Banner)
  const hasViolations = validationResult.violations.length > 0;
  const hasWarnings = validationResult.warnings.length > 0;

  if (hasViolations || hasWarnings) {
    const activeRule = hasViolations
      ? validationResult.violations[0]
      : validationResult.warnings[0];

    return (
      <>
        <div className="rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/40 p-4 shadow-[0_0_25px_rgba(245,158,11,0.12)] transition-all duration-300 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
              <Compass className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              {/* Header Title */}
              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Góc Nhìn Cố Vấn Văn Hóa
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRule(activeRule);
                    setIsModalOpen(true);
                  }}
                  className="text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3 h-3" />
                  <span>Xem tư vấn chi tiết</span>
                </button>
              </div>

              {/* Point of Cultural Touch */}
              <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed font-medium mb-3">
                🛑 <strong>Điểm chạm văn hóa:</strong> {activeRule.reason}
              </p>

              {/* 2 Fast Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-500/20">
                {/* Button 1: Safe Path */}
                <button
                  type="button"
                  onClick={() => handleApplySafePath(activeRule)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#06D6A0] to-[#048C6B] hover:brightness-110 shadow-xs transition-all active:scale-95 cursor-pointer"
                  title="Áp dụng phương án trang nhã, bảo tồn trọn vẹn nét tôn nghiêm"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Áp dụng gợi ý thanh lịch</span>
                </button>

                {/* Button 2: Creative Path */}
                <button
                  type="button"
                  onClick={handleEnableCreativePath}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF3366] to-[#B5179E] hover:brightness-110 shadow-xs transition-all active:scale-95 cursor-pointer"
                  title="Bật chế độ biến tấu nghệ thuật ngoài phố cho concept Lookbook"
                >
                  <Flame className="w-3.5 h-3.5 text-[#FFD166]" />
                  <span>Giữ nguyên & Gắn nhãn Phá Cách</span>
                </button>

                {/* Success Toast / Notification */}
                {fixSuccessMsg && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-in fade-in ml-auto">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{fixSuccessMsg}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Advisory Modal */}
        <CulturalGuardrailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          rule={selectedRule}
        />
      </>
    );
  }

  // Case 2: Fully Compliant Look (Harmonious Heritage)
  return (
    <div className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30 p-3.5 shadow-xs transition-colors flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 text-xs text-emerald-900 dark:text-emerald-300">
        <div className="w-7 h-7 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div>
          <span className="font-bold block">Trang phục chuẩn mực di sản</span>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
            Hài hòa mỹ cảm truyền thống, tự tin du xuân và chụp ảnh Tết!
          </span>
        </div>
      </div>
    </div>
  );
};
