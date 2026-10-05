/**
 * NavControls Component - Bộ 3 Nút Điều Hướng [Back], [Forward], [Reload]
 * Thiết kế phong cách Cyber Y2K × Heritage Glassmorphism
 * Tích hợp In-App Navigation History Stack ngăn chặn reload trang ngoài ý muốn.
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { useAppNavigation } from '../../hooks/useAppNavigation';

interface NavControlsProps {
  className?: string;
  onRefreshNotice?: (message: string) => void;
}

export const NavControls: React.FC<NavControlsProps> = ({
  className = '',
  onRefreshNotice,
}) => {
  const {
    canGoBack,
    canGoForward,
    isRefreshing,
    previousSnapshot,
    nextSnapshot,
    currentSnapshot,
    goBack,
    goForward,
    refreshCurrentView,
  } = useAppNavigation();

  const [spinTrigger, setSpinTrigger] = useState(false);

  const handleRefreshClick = () => {
    setSpinTrigger(true);
    refreshCurrentView();
    if (onRefreshNotice) {
      const modeLabel = currentSnapshot?.title || 'màn hình hiện tại';
      onRefreshNotice(`Đã làm mới ${modeLabel}`);
    }
    setTimeout(() => {
      setSpinTrigger(false);
    }, 450);
  };

  const isSpinning = isRefreshing || spinTrigger;

  const backTooltip = canGoBack
    ? `Quay lại: ${previousSnapshot?.title || 'bước trước'} (Alt + ←)`
    : 'Đang ở trang đầu tiên';

  const forwardTooltip = canGoForward
    ? `Đi tới: ${nextSnapshot?.title || 'bước tiếp'} (Alt + →)`
    : 'Không còn trang tiếp theo';

  const reloadTooltip = `Làm mới ${currentSnapshot?.title || 'màn hình hiện tại'}`;

  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-2xl bg-[#F5F2EB]/90 dark:bg-white/5 border border-[#E6E1D8] dark:border-white/10 shadow-xs backdrop-blur-md select-none transition-colors ${className}`}
      role="navigation"
      aria-label="Điều hướng lịch sử nội bộ"
    >
      {/* 1. NÚT QUAY LẠI (BACK) */}
      <div className="relative group">
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack}
          aria-label={backTooltip}
          title={backTooltip}
          className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-150 ${
            canGoBack
              ? 'text-[#57534E] dark:text-[#D6D3D1] hover:text-[#1C1917] dark:hover:text-white hover:bg-white dark:hover:bg-white/10 active:scale-90 cursor-pointer shadow-xs hover:shadow-sm'
              : 'opacity-30 pointer-events-none cursor-not-allowed text-[#A8A29E] dark:text-[#78716C]'
          }`}
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* 2. NÚT ĐI TỚI (FORWARD) */}
      <div className="relative group">
        <button
          type="button"
          onClick={goForward}
          disabled={!canGoForward}
          aria-label={forwardTooltip}
          title={forwardTooltip}
          className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-150 ${
            canGoForward
              ? 'text-[#57534E] dark:text-[#D6D3D1] hover:text-[#1C1917] dark:hover:text-white hover:bg-white dark:hover:bg-white/10 active:scale-90 cursor-pointer shadow-xs hover:shadow-sm'
              : 'opacity-30 pointer-events-none cursor-not-allowed text-[#A8A29E] dark:text-[#78716C]'
          }`}
        >
          <ChevronRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* Đường phân cách siêu mảnh */}
      <div className="w-[1px] h-4 bg-[#E6E1D8] dark:bg-white/10 mx-0.5" />

      {/* 3. NÚT LÀM MỚI (RELOAD / REFRESH) */}
      <div className="relative group">
        <button
          type="button"
          onClick={handleRefreshClick}
          aria-label={reloadTooltip}
          title={reloadTooltip}
          className="flex items-center justify-center w-8 h-8 rounded-xl text-[#57534E] dark:text-[#D6D3D1] hover:text-[#FF3366] dark:hover:text-[#FF3366] hover:bg-white dark:hover:bg-white/10 active:scale-90 transition-all duration-150 cursor-pointer shadow-xs hover:shadow-sm"
        >
          <RotateCw
            className={`w-3.5 h-3.5 stroke-[2.2] transition-transform duration-400 ${
              isSpinning ? 'animate-spin text-[#FF3366]' : ''
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default NavControls;
