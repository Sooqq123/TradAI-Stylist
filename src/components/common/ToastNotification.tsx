/**
 * ToastNotification Component - Hệ Thống Thông Báo Thời Gian Thực
 * Self-dismissing notifications for actions: Save, Color change, Cultural warnings, Copy link.
 */

import React, { useEffect } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'info' | 'error';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  subtitle?: string;
  duration?: number;
}

interface ToastNotificationProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toasts,
  onDismiss,
}) => {
  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = setTimeout(() => {
      onDismiss(latest.id);
    }, latest.duration || 3200);

    return () => clearTimeout(timer);
  }, [toasts, onDismiss]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
        let borderClass = 'border-emerald-500/40 bg-[#FFFFFF] dark:bg-[#1A1A1E] text-[#18181B] dark:text-[#FAFAFA]';

        if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
          borderClass = 'border-amber-500/50 bg-[#FFFFFF] dark:bg-[#1A1A1E] text-[#18181B] dark:text-[#FAFAFA]';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
          borderClass = 'border-red-500/50 bg-[#FFFFFF] dark:bg-[#1A1A1E] text-[#18181B] dark:text-[#FAFAFA]';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
          borderClass = 'border-blue-500/40 bg-[#FFFFFF] dark:bg-[#1A1A1E] text-[#18181B] dark:text-[#FAFAFA]';
        }

        return (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto rounded-2xl p-3.5 shadow-2xl border flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-200 transition-all ${borderClass}`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <div>
                <p className="text-xs font-bold leading-tight">{toast.message}</p>
                {toast.subtitle && (
                  <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] mt-0.5 leading-snug">
                    {toast.subtitle}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg text-[#71717A] hover:text-[#18181B] dark:hover:text-[#FAFAFA] hover:bg-[#F8F8F7] dark:hover:bg-[#27272A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
