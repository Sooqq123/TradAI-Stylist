/**
 * CulturalInsightCard Component - Thẻ Giải Nghĩa Tri Thức Di Sản (Heritage Insight Accordion)
 * 4 concise educational sections: Di sản, Nên giữ, Có thể Remix, and Mẹo mặc Tết.
 */

import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Lock,
  Scissors,
  ScrollText,
  Sparkles,
} from 'lucide-react';
import { CULTURAL_INSIGHTS } from '../../data/mockData';
import { useOutfitStore } from '../../store/useOutfitStore';
import { GarmentType } from '../../types';

export const CulturalInsightCard: React.FC = () => {
  const { currentOutfit } = useOutfitStore();
  const currentGarmentType: GarmentType = currentOutfit.garment?.garmentType || 'ao_dai';

  const insight =
    CULTURAL_INSIGHTS.find((i) => i.garmentId === currentGarmentType) || CULTURAL_INSIGHTS[0];

  const [activeSection, setActiveSection] = useState<'heritage' | 'keep' | 'remix' | 'tet' | null>(
    'heritage'
  );

  const toggleSection = (section: 'heritage' | 'keep' | 'remix' | 'tet') => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-4 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E5E2] dark:border-[#27272A]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 text-[#9E2A2B] dark:text-[#E05A47] flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] block leading-none">
              CẨM NANG TRI THỨC CỔ PHỤC
            </span>
            <h4 className="font-editorial text-sm font-bold text-[#18181B] dark:text-[#FAFAFA]">
              {insight.garmentName}
            </h4>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#9E2A2B] dark:text-[#E05A47] bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 px-2 py-0.5 rounded-lg border border-[#9E2A2B]/20 dark:border-[#E05A47]/30">
          Cổ Phục Di Sản
        </span>
      </div>

      {/* Accordion 4 Items */}
      <div className="space-y-2">
        {/* 1. 📜 Di sản (Heritage) */}
        <div className="rounded-xl border border-[#E5E5E2] dark:border-[#27272A] overflow-hidden transition-colors">
          <button
            onClick={() => toggleSection('heritage')}
            className="w-full p-3 flex items-center justify-between text-left bg-[#F8F8F7] dark:bg-[#121214] hover:bg-[#EFEFEA] dark:hover:bg-[#1f1f24] transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#18181B] dark:text-[#FAFAFA]">
              <ScrollText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>📜 Di sản (Heritage) • Nguồn gốc lịch sử</span>
            </div>
            {activeSection === 'heritage' ? (
              <ChevronUp className="w-4 h-4 text-[#71717A]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#71717A]" />
            )}
          </button>
          {activeSection === 'heritage' && (
            <div className="p-3 text-xs text-[#52525B] dark:text-[#D4D4D8] space-y-1.5 bg-[#FFFFFF] dark:bg-[#1A1A1E] leading-relaxed animate-in fade-in duration-150">
              <p>
                <strong className="text-[#18181B] dark:text-[#FAFAFA]">Niên đại:</strong>{' '}
                {insight.historicalPeriod}
              </p>
              <p>
                <strong className="text-[#18181B] dark:text-[#FAFAFA]">Triết lý:</strong>{' '}
                {insight.corePhilosophy}
              </p>
            </div>
          )}
        </div>

        {/* 2. 🔒 Nên giữ (Keep) */}
        <div className="rounded-xl border border-[#E5E5E2] dark:border-[#27272A] overflow-hidden transition-colors">
          <button
            onClick={() => toggleSection('keep')}
            className="w-full p-3 flex items-center justify-between text-left bg-[#F8F8F7] dark:bg-[#121214] hover:bg-[#EFEFEA] dark:hover:bg-[#1f1f24] transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>🔒 Nên giữ (Keep) • Yếu tố cốt lõi bất biến</span>
            </div>
            {activeSection === 'keep' ? (
              <ChevronUp className="w-4 h-4 text-[#71717A]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#71717A]" />
            )}
          </button>
          {activeSection === 'keep' && (
            <div className="p-3 text-xs bg-[#FFFFFF] dark:bg-[#1A1A1E] leading-relaxed animate-in fade-in duration-150">
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {insight.keepElements.map((el, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 3. ✂️ Có thể Remix (Remix) */}
        <div className="rounded-xl border border-[#E5E5E2] dark:border-[#27272A] overflow-hidden transition-colors">
          <button
            onClick={() => toggleSection('remix')}
            className="w-full p-3 flex items-center justify-between text-left bg-[#F8F8F7] dark:bg-[#121214] hover:bg-[#EFEFEA] dark:hover:bg-[#1f1f24] transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-purple-800 dark:text-purple-300">
              <Scissors className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>✂️ Có thể Remix (Remix) • Vùng sáng tạo Gen Z</span>
            </div>
            {activeSection === 'remix' ? (
              <ChevronUp className="w-4 h-4 text-[#71717A]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#71717A]" />
            )}
          </button>
          {activeSection === 'remix' && (
            <div className="p-3 text-xs bg-[#FFFFFF] dark:bg-[#1A1A1E] leading-relaxed animate-in fade-in duration-150">
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {insight.remixableElements.map((el, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">✦</span>
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 4. 💡 Mẹo mặc Tết */}
        <div className="rounded-xl border border-[#E5E5E2] dark:border-[#27272A] overflow-hidden transition-colors">
          <button
            onClick={() => toggleSection('tet')}
            className="w-full p-3 flex items-center justify-between text-left bg-[#F8F8F7] dark:bg-[#121214] hover:bg-[#EFEFEA] dark:hover:bg-[#1f1f24] transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>💡 Mẹo mặc Tết • Tạo dáng & phong cách du xuân</span>
            </div>
            {activeSection === 'tet' ? (
              <ChevronUp className="w-4 h-4 text-[#71717A]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#71717A]" />
            )}
          </button>
          {activeSection === 'tet' && (
            <div className="p-3 text-xs bg-[#FFFFFF] dark:bg-[#1A1A1E] leading-relaxed animate-in fade-in duration-150">
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {insight.modernTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
