/**
 * MobileBottomNav Component - Cyber Heritage / Y2K Đông Dương Floating Dock
 * Floating glassmorphism navigation dock strictly visible only on screens <1024px.
 * Solves bottom overlap issues, respects z-index standards, and features neon glow accents.
 */

import React from 'react';
import {
  Bookmark,
  BookOpen,
  Compass,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { useOutfitStore } from '../../store/useOutfitStore';
import { ViewMode } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { viewMode, setViewMode, savedOutfits } = useOutfitStore();

  const navItems: {
    mode: ViewMode;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { mode: 'studio', label: 'Studio', icon: Wand2 },
    { mode: 'lookbook', label: 'Lookbook', icon: Sparkles },
    { mode: 'builder', label: 'Gợi Ý', icon: Compass },
    { mode: 'gallery', label: 'Cảm Hứng', icon: BookOpen },
    {
      mode: 'saved',
      label: 'Đã Lưu',
      icon: Bookmark,
      badge: savedOutfits.length > 0 ? savedOutfits.length : undefined,
    },
  ];

  return (
    <aside
      aria-label="Điều hướng chính trên di động"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-2 px-3 sm:px-4 pointer-events-none"
    >
      <nav className="pointer-events-auto max-w-md mx-auto rounded-full backdrop-blur-2xl bg-white/90 dark:bg-[#120F1D]/90 border border-[#E6E1D8] dark:border-white/15 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.7)] ring-1 ring-black/5 dark:ring-white/10 safe-bottom">
        <div className="grid grid-cols-5 items-center gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = viewMode === item.mode;

            return (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all duration-200 active:scale-90 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF3366]/15 via-[#B5179E]/15 to-[#FF3366]/15 border border-[#FF3366]/30 text-[#FF3366] dark:text-[#FF3366] font-bold shadow-[0_0_12px_rgba(255,51,102,0.2)]'
                    : 'text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#FAF9F6] border border-transparent'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-4.5 h-4.5 transition-all duration-200 ${
                      isActive
                        ? 'scale-110 drop-shadow-[0_0_6px_rgba(255,51,102,0.4)]'
                        : 'scale-100 opacity-80'
                    }`}
                  />
                  {typeof item.badge === 'number' && (
                    <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.5 text-[9px] font-extrabold rounded-full bg-gradient-to-r from-[#FF3366] to-[#B5179E] text-white leading-none shadow-[0_0_8px_rgba(255,51,102,0.6)]">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className="text-[10px] mt-1 tracking-tight leading-none font-semibold">
                  {item.label}
                </span>

                {/* Glowing neon aura dot */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3366] mt-1 shadow-[0_0_8px_#FF3366] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
