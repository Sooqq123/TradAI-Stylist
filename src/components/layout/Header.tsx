/**
 * Header Component - Vietnamese Cultural Editorial Style
 * Brand logo, Editorial Navigation, Theme Toggle, and "Tạo Look Mới" CTA.
 */

import React from 'react';
import {
  Bookmark,
  BookOpen,
  Compass,
  Moon,
  Plus,
  ScanEye,
  Sparkles,
  Sun,
  Wand2,
} from 'lucide-react';
import { useOutfitStore } from '../../store/useOutfitStore';
import { ViewMode } from '../../types';
import { NavControls } from './NavControls';

interface HeaderProps {
  onNewLookClick?: () => void;
  onOpenScanner?: () => void;
  onRefreshNotice?: (message: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNewLookClick,
  onOpenScanner,
  onRefreshNotice,
}) => {
  const {
    viewMode,
    setViewMode,
    theme,
    setTheme,
    savedOutfits,
    generateRandomLook,
  } = useOutfitStore();

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const handleCreateNewLook = () => {
    if (onNewLookClick) {
      onNewLookClick();
    } else {
      generateRandomLook();
      setViewMode('studio');
    }
  };

  const navItems: {
    mode: ViewMode;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { mode: 'studio', label: 'Studio Phối Đồ', icon: Wand2 },
    { mode: 'lookbook', label: 'Lookbook 2.5D Di Sản', icon: Sparkles },
    { mode: 'builder', label: 'Gợi Ý Nhanh', icon: Compass },
    { mode: 'gallery', label: 'Cảm Hứng Di Sản', icon: BookOpen },
    {
      mode: 'saved',
      label: 'Đã Lưu',
      icon: Bookmark,
      badge: savedOutfits.length > 0 ? savedOutfits.length : undefined,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200 backdrop-blur-xl border-b bg-white/85 dark:bg-[#0D0B12]/85 border-[#E6E1D8] dark:border-white/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Editorial Monogram + In-App Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setViewMode('studio')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF3366] via-[#E63946] to-[#B5179E] text-white shadow-md shadow-[#FF3366]/25 ring-1 ring-white/30 transition-transform group-hover:scale-105 active:scale-95">
              <span className="font-editorial text-xs font-black tracking-tight">TAS</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FFD166] border-2 border-[#F7F5F0] dark:border-[#0D0B12] flex items-center justify-center shadow-xs">
                <Sparkles className="w-2 h-2 text-slate-900" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-base sm:text-lg font-extrabold tracking-wide text-[#1C1917] dark:text-[#FAF9F6]">
                  TradAI Stylist
                </span>
              </div>
              <span className="text-[10px] text-[#78716C] dark:text-[#A8A29E] tracking-wider uppercase font-semibold hidden md:block">
                AI-Powered Traditional & Contemporary Fashion Stylist
              </span>
            </div>
          </div>

          {/* In-App History Navigation Controls [Back] [Forward] [Reload] */}
          <NavControls onRefreshNotice={onRefreshNotice} className="ml-1 sm:ml-2" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-[#F5F2EB]/90 dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = viewMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#1E192B] text-[#FF3366] dark:text-[#FF3366] border border-[#E6E1D8]/80 dark:border-[#FF3366]/30 shadow-xs font-bold'
                    : 'text-[#57534E] dark:text-[#D6D3D1] hover:text-[#1C1917] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF3366]' : ''}`} />
                <span>{item.label}</span>
                {typeof item.badge === 'number' && (
                  <span className="px-1.5 py-0.2 text-[9px] rounded-full bg-gradient-to-r from-[#FF3366] to-[#B5179E] text-white font-extrabold leading-tight shadow-xs">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Scanner, Theme Toggle & CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* AI Context Scanner Button */}
          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#FF3366] bg-[#FF3366]/10 hover:bg-[#FF3366]/15 border border-[#FF3366]/30 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Mở AI Context Scanner - Quét ảnh hoặc nhu cầu tự nhiên"
            >
              <ScanEye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">✦ AI Scanner</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
            className="p-2 rounded-xl text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-white bg-[#F5F2EB] dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10 transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            title={theme === 'dark' ? 'Giao diện Tối (Mực Nho / Dark Slate)' : 'Giao diện Sáng (Giấy Dó Bạch)'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#FFD166] transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Primary CTA: Tạo Look Mới */}
          <button
            onClick={handleCreateNewLook}
            className="group relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide text-white bg-gradient-to-r from-[#FF3366] via-[#E63946] to-[#B5179E] hover:from-[#FF4D7D] hover:to-[#C724AF] shadow-[0_4px_16px_rgba(255,51,102,0.35)] hover:shadow-[0_6px_22px_rgba(255,51,102,0.5)] transition-all hover:scale-[1.02] active:scale-95 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="whitespace-nowrap">Tạo Look Mới</span>
          </button>
        </div>
      </div>
    </header>
  );
};
