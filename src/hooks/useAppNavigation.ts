/**
 * useAppNavigation Hook - Quản lý In-App Navigation History Stack cho Việt Phục Remix
 * Cung cấp bộ 3 nút điều hướng: [Back], [Forward], [Reload]
 * Ngăn ngừa 100% bug reload toàn trang / mất dữ liệu của SPA.
 */

import { useEffect, useCallback } from 'react';
import { useOutfitStore, NavSnapshot } from '../store/useOutfitStore';
import { ViewMode } from '../types';

export interface UseAppNavigationReturn {
  canGoBack: boolean;
  canGoForward: boolean;
  isRefreshing: boolean;
  currentSnapshot: NavSnapshot | null;
  previousSnapshot: NavSnapshot | null;
  nextSnapshot: NavSnapshot | null;
  history: NavSnapshot[];
  currentIndex: number;
  viewMode: ViewMode;
  builderStep: number;
  refreshKey: number;
  goBack: () => void;
  goForward: () => void;
  refreshCurrentView: () => void;
  pushView: (snapshot: Partial<NavSnapshot> & { viewMode: ViewMode }) => void;
  setBuilderStep: (step: number) => void;
}

export function useAppNavigation(): UseAppNavigationReturn {
  const navHistory = useOutfitStore((s) => s.navHistory);
  const navCurrentIndex = useOutfitStore((s) => s.navCurrentIndex);
  const viewMode = useOutfitStore((s) => s.viewMode);
  const builderStep = useOutfitStore((s) => s.builderStep);
  const refreshKey = useOutfitStore((s) => s.refreshKey);
  const isNavRefreshing = useOutfitStore((s) => s.isNavRefreshing);

  const storeGoBack = useOutfitStore((s) => s.goBack);
  const storeGoForward = useOutfitStore((s) => s.goForward);
  const storeRefresh = useOutfitStore((s) => s.refreshCurrentView);
  const storePushNavView = useOutfitStore((s) => s.pushNavView);
  const storeSetBuilderStep = useOutfitStore((s) => s.setBuilderStep);

  const canGoBack = navCurrentIndex > 0;
  const canGoForward = navCurrentIndex < navHistory.length - 1;

  const currentSnapshot = navHistory[navCurrentIndex] || null;
  const previousSnapshot = canGoBack ? navHistory[navCurrentIndex - 1] : null;
  const nextSnapshot = canGoForward ? navHistory[navCurrentIndex + 1] : null;

  const goBack = useCallback(() => {
    if (canGoBack) {
      storeGoBack();
    }
  }, [canGoBack, storeGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward) {
      storeGoForward();
    }
  }, [canGoForward, storeGoForward]);

  const refreshCurrentView = useCallback(() => {
    storeRefresh();
  }, [storeRefresh]);

  const pushView = useCallback(
    (snapshot: Partial<NavSnapshot> & { viewMode: ViewMode }) => {
      storePushNavView(snapshot);
    },
    [storePushNavView]
  );

  const setBuilderStep = useCallback(
    (step: number) => {
      storeSetBuilderStep(step);
    },
    [storeSetBuilderStep]
  );

  // Global Keyboard Shortcuts (Alt + Left Arrow / Alt + Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      if (e.altKey && e.key === 'ArrowLeft') {
        if (canGoBack) {
          e.preventDefault();
          goBack();
        }
      } else if (e.altKey && e.key === 'ArrowRight') {
        if (canGoForward) {
          e.preventDefault();
          goForward();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoBack, canGoForward, goBack, goForward]);

  return {
    canGoBack,
    canGoForward,
    isRefreshing: isNavRefreshing,
    currentSnapshot,
    previousSnapshot,
    nextSnapshot,
    history: navHistory,
    currentIndex: navCurrentIndex,
    viewMode,
    builderStep,
    refreshKey,
    goBack,
    goForward,
    refreshCurrentView,
    pushView,
    setBuilderStep,
  };
}
