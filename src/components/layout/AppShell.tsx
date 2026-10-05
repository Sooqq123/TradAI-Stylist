/**
 * AppShell Component - Vietnamese Cultural Editorial Style
 * Root layout container with Sticky Header, viewport height management, and responsive MobileBottomNav.
 */

import React from 'react';
import { Header } from './Header';
import { MobileBottomNav } from './MobileBottomNav';

interface AppShellProps {
  children: React.ReactNode;
  onNewLookClick?: () => void;
  onOpenScanner?: () => void;
  onRefreshNotice?: (message: string) => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  onNewLookClick,
  onOpenScanner,
  onRefreshNotice,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] dark:bg-[#0D0B12] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#2D0B22_0%,#150818_45%,#0D0B12_100%)] text-[#1C1917] dark:text-[#FAF9F6] transition-colors duration-200 antialiased selection:bg-[#FF3366] selection:text-white relative">
      {/* Sticky Top Header */}
      <Header
        onNewLookClick={onNewLookClick}
        onOpenScanner={onOpenScanner}
        onRefreshNotice={onRefreshNotice}
      />

      {/* Main Viewport Workspace - generous bottom padding to prevent any dock overlap */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 pb-32 sm:pb-36 lg:pb-12 flex flex-col">
        {children}
      </main>

      {/* Editorial Footer */}
      <footer className="w-full border-t border-[#E6E1D8] dark:border-white/10 bg-white/70 dark:bg-[#14111D]/80 backdrop-blur-md transition-colors duration-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C] dark:text-[#A8A29E]">
          <div className="flex items-center gap-2">
            <span className="font-cinzel font-bold text-[#1C1917] dark:text-[#FAF9F6] tracking-wider">
              TradAI Stylist
            </span>
            <span className="text-[#FF3366]">✦</span>
            <span>AI-Powered Traditional & Contemporary Fashion Stylist • Tôn vinh mỹ học cổ phục Việt.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Triết lý: Áo Dài • Ngũ Thân • Áo Bà Ba</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#06D6A0]" />
            <span>Cyber Heritage Engine</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Thumb Navigation */}
      <MobileBottomNav />
    </div>
  );
};
