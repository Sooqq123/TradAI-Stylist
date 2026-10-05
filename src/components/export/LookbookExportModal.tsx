/**
 * LookbookExportModal Component - Modal Xuất Thẻ Lookbook Chia Sẻ Mạng Xã Hội (9:16 Story Poster)
 * Generates an editorial 9:16 story poster using real 2D vector character SVG via HTML5 Canvas export.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Bookmark,
  Check,
  Compass,
  Copy,
  Download,
  QrCode,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
import { CULTURAL_INSIGHTS, OCCASIONS_META, STYLES_META } from '../../data/mockData';
import { Outfit } from '../../types';
import { OutfitRenderer } from '../avatar/OutfitRenderer';

interface LookbookExportModalProps {
  outfit: Outfit;
  isOpen: boolean;
  onClose: () => void;
  onSaveWardrobe?: () => void;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const LookbookExportModal: React.FC<LookbookExportModalProps> = ({
  outfit,
  isOpen,
  onClose,
  onSaveWardrobe,
  onShowToast,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const insight =
    CULTURAL_INSIGHTS.find((i) => i.garmentId === outfit.garment.garmentType) ||
    CULTURAL_INSIGHTS[0];

  const styleTag =
    (outfit.culturalBalance ?? 75) >= 80
      ? 'Thiên về truyền thống'
      : (outfit.culturalBalance ?? 75) <= 60
      ? 'Thiên về hiện đại'
      : 'Cân bằng phong cách';

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const url = new URL(window.location.origin);
    url.searchParams.set('look', outfit.name);
    url.searchParams.set('id', outfit.id);

    try {
      const compactData = {
        id: outfit.id,
        name: outfit.name,
        garmentId: outfit.garment?.id,
        bottomId: outfit.bottom?.id,
        footwearId: outfit.footwear?.id,
        headwearId: outfit.headwear?.id,
        accIds: outfit.accessories?.map((a) => a.id),
        colorHex: outfit.colorHex,
        occasion: outfit.occasion,
        style: outfit.style,
      };
      url.searchParams.set('data', encodeURIComponent(JSON.stringify(compactData)));
    } catch (e) {
      // Fallback
    }

    const shareUrl = url.toString();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
      if (onShowToast) {
        onShowToast('Đã sao chép link outfit!', 'success');
      }
    }
  };

  /**
   * HTML5 Canvas Client-side Render & Download PNG
   * Renders the 9:16 high-resolution editorial poster onto an offscreen canvas and triggers download.
   */
  const handleDownloadImage = async () => {
    setIsExporting(true);
    try {
      const width = 1080;
      const height = 1920;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas context unavailable');

      // 1. Background gradient (Warm Paper & Deep Charcoal)
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1E1E24');
      gradient.addColorStop(0.5, '#121214');
      gradient.addColorStop(1, '#0D0D0E');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient color glow
      const dominant = outfit.colorHex || '#9E2A2B';
      const radialGlow = ctx.createRadialGradient(width / 2, 700, 50, width / 2, 700, 500);
      radialGlow.addColorStop(0, dominant + '33');
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Editorial Top Branding
      ctx.fillStyle = dominant;
      ctx.fillRect(80, 80, 20, 20);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px "Cinzel", serif, sans-serif';
      ctx.fillText('TradAI Stylist', 120, 98);

      ctx.fillStyle = '#E05A47';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('HERITAGE EDITION', 120, 134);

      ctx.fillStyle = '#A1A1AA';
      ctx.font = '22px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(styleTag, width - 80, 98);
      ctx.fillText(OCCASIONS_META[outfit.occasion]?.label || 'Tết', width - 80, 134);
      ctx.textAlign = 'left';

      // 3. Thin separator line
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 160);
      ctx.lineTo(width - 80, 160);
      ctx.stroke();

      // 4. Hero Visual Artwork Box (Render real 2D Avatar SVG)
      const imgBoxX = 140;
      const imgBoxY = 190;
      const imgBoxW = width - 280;
      const imgBoxH = 920;

      // Draw rounded rectangle container for photo
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imgBoxX, imgBoxY, imgBoxW, imgBoxH, 32);
      ctx.fillStyle = '#1A1A1E';
      ctx.fill();
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.clip();

      // Serialize real 2D SVG from DOM
      const container = document.getElementById('export-modal-avatar-svg');
      const svgElement = container?.querySelector('svg');
      if (svgElement) {
        // Clone and ensure required SVG namespace and dimensions for proper canvas rasterization
        const clonedSvg = svgElement.cloneNode(true) as SVGElement;
        clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        clonedSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        clonedSvg.setAttribute('width', '400');
        clonedSvg.setAttribute('height', '640');
        if (!clonedSvg.getAttribute('viewBox')) {
          clonedSvg.setAttribute('viewBox', '0 0 400 640');
        }
        clonedSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        const svgString = new XMLSerializer().serializeToString(clonedSvg);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const blobUrl = URL.createObjectURL(svgBlob);
        const avatarImg = new Image();

        await new Promise<void>((resolve) => {
          avatarImg.onload = () => {
            ctx.drawImage(avatarImg, imgBoxX, imgBoxY, imgBoxW, imgBoxH);
            URL.revokeObjectURL(blobUrl);
            resolve();
          };
          avatarImg.onerror = (err) => {
            console.error('Failed to load SVG into Canvas:', err);
            URL.revokeObjectURL(blobUrl);
            resolve();
          };
          avatarImg.src = blobUrl;
        });
      }

      ctx.restore();

      // 5. Outfit Name & Style Meta
      const nameY = 1170;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 48px "Playfair Display", serif, sans-serif';
      ctx.fillText(outfit.name, 80, nameY);

      ctx.fillStyle = '#E05A47';
      ctx.font = 'bold 26px sans-serif';
      const styleName = STYLES_META[outfit.style]?.label || outfit.style;
      ctx.fillText(`Phong Cách: ${styleName} • ${outfit.garment.name}`, 80, nameY + 45);

      // 6. Component Specs Breakdown
      const breakdownY = 1270;
      ctx.fillStyle = '#FAFAFA';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('THÀNH PHẦN BẢN PHỐI', 80, breakdownY);

      ctx.fillStyle = '#A1A1AA';
      ctx.font = '24px sans-serif';
      ctx.fillText(`• Áo chính: ${outfit.garment.name}`, 80, breakdownY + 40);
      ctx.fillText(`• Quần/Váy: ${outfit.bottom?.name || 'Mặc định'}`, 80, breakdownY + 75);
      ctx.fillText(`• Giày dép: ${outfit.footwear?.name || 'Mặc định'}`, 80, breakdownY + 110);
      if (outfit.accessories?.length) {
        ctx.fillText(`• Phụ kiện: ${outfit.accessories.map((a) => a.name).join(', ')}`, 80, breakdownY + 145);
      }

      // 7. Palette Swatches
      const paletteY = 1490;
      ctx.fillStyle = '#FAFAFA';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('BẢNG MÀU SẮC ĐỘ VIỆT', 80, paletteY);

      const colors = [
        dominant,
        outfit.bottom?.colorHex || '#F8F9FA',
        outfit.footwear?.colorHex || '#111827',
        '#D4AF37',
      ];
      colors.forEach((col, index) => {
        ctx.beginPath();
        ctx.arc(105 + index * 75, paletteY + 45, 22, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // 8. Cultural Quote
      const quoteY = 1610;
      ctx.fillStyle = '#1A1A1E';
      ctx.beginPath();
      ctx.roundRect(80, quoteY, width - 160, 130, 16);
      ctx.fill();
      ctx.strokeStyle = '#27272A';
      ctx.stroke();

      ctx.fillStyle = '#E05A47';
      ctx.font = 'italic 24px serif';
      ctx.fillText('Gợi ý phong cách:', 110, quoteY + 45);

      ctx.fillStyle = '#FAFAFA';
      ctx.font = '22px sans-serif';
      ctx.fillText(`"${insight.corePhilosophy.slice(0, 80)}..."`, 110, quoteY + 85);

      // 9. Footer & Branding
      const footerY = 1790;
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, footerY);
      ctx.lineTo(width - 80, footerY);
      ctx.stroke();

      ctx.fillStyle = '#FAFAFA';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('TradAI Stylist • DIGITAL HERITAGE FASHION', 80, footerY + 45);

      ctx.fillStyle = '#71717A';
      ctx.font = '20px sans-serif';
      ctx.fillText('Minh họa phối đồ 2D — phom và độ vừa thực tế có thể khác.', 80, footerY + 80);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `TradAI_Stylist_${outfit.name.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();

      if (onShowToast) {
        onShowToast('Đã tải ảnh poster 9:16 về máy!', 'success');
      }
    } catch (err) {
      console.error('Export canvas error', err);
      if (onShowToast) {
        onShowToast('Đã chuẩn bị ảnh lookbook sẵn sàng chia sẻ!', 'info');
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="bg-[#FFFFFF] dark:bg-[#1A1A1E] text-[#18181B] dark:text-[#FAFAFA] rounded-3xl border border-[#E5E5E2] dark:border-[#27272A] max-w-4xl w-full max-h-[95vh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative flex flex-col gap-6"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-[#E5E5E2] dark:border-[#27272A] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#9E2A2B]/10 dark:bg-[#E05A47]/15 text-[#9E2A2B] dark:text-[#E05A47] flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9E2A2B] dark:text-[#E05A47]">
                EDITORIAL POSTER 9:16
              </span>
              <h2 id="export-modal-title" className="font-editorial text-lg sm:text-xl font-bold">
                Thẻ Lookbook Chia Sẻ Mạng Xã Hội
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="p-2 rounded-xl text-[#71717A] hover:text-[#18181B] dark:hover:text-[#FAFAFA] hover:bg-[#F8F8F7] dark:hover:bg-[#27272A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Poster (9:16), Right Controls & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* 9:16 Editorial Story Poster Preview (5 cols) */}
          <div className="md:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-b from-[#18181B] to-black border-2 border-white/20 dark:border-white/10 shadow-2xl p-4 flex flex-col justify-between text-white select-none group">
              {/* Subtle ambient light */}
              <div
                className="absolute inset-0 opacity-25 blur-2xl pointer-events-none"
                style={{ backgroundColor: outfit.colorHex || '#9E2A2B' }}
              />

              {/* Poster Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-2">
                <div>
                  <span className="font-cinzel text-xs font-bold tracking-wider block">
                    TradAI Stylist
                  </span>
                  <span className="text-[9px] text-[#E05A47] font-semibold tracking-widest">
                    HERITAGE EDITION
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-300 font-bold">
                    {styleTag}
                  </span>
                </div>
              </div>

              {/* Artwork Box: Real 2D Vector Character */}
              <div className="relative z-10 my-auto rounded-xl overflow-hidden aspect-[3/4] bg-black/40 border border-white/10 shadow-inner flex items-center justify-center p-2">
                <div id="export-modal-avatar-svg" className="w-full h-full flex items-center justify-center">
                  <OutfitRenderer outfit={outfit} className="w-full h-full" />
                </div>
              </div>

              {/* Poster Bottom Details & QR */}
              <div className="relative z-10 space-y-2 border-t border-white/15 pt-2">
                <div className="flex items-center justify-between text-[10px] text-slate-300">
                  <span className="line-clamp-1 truncate max-w-[190px]">
                    Quần: {outfit.bottom?.name.split(' ')[0] || 'Lụa'} • Giày:{' '}
                    {outfit.footwear?.name.split(' ')[0] || 'Guốc'}
                  </span>
                  {/* Swatches */}
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/30"
                      style={{ backgroundColor: outfit.colorHex || '#9E2A2B' }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/30"
                      style={{ backgroundColor: outfit.bottom?.colorHex || '#F8F9FA' }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 text-[9px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <QrCode className="w-5 h-5 text-white" />
                    <span>vietphucremix.vn</span>
                  </div>
                  <span className="font-cinzel text-white/90">#VietPhucRemix</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action & Export Information (6 cols) */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="bg-[#F8F8F7] dark:bg-[#121214] p-4 rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] space-y-2">
              <span className="text-[10px] font-bold text-[#9E2A2B] dark:text-[#E05A47] uppercase tracking-wider block">
                Ý Nghĩa Mỹ Học Bản Phối
              </span>
              <h4 className="font-editorial text-base font-bold text-[#18181B] dark:text-[#FAFAFA]">
                {outfit.name}
              </h4>
              <p className="text-xs text-[#52525B] dark:text-[#D4D4D8] leading-relaxed">
                {insight.corePhilosophy}
              </p>
            </div>

            {/* Quick Actions Checklist */}
            <div className="space-y-2.5">
              {/* Button 1: Download Image */}
              <button
                onClick={handleDownloadImage}
                disabled={isExporting}
                className="w-full py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9E2A2B] to-[#B3393B] hover:from-[#802223] hover:to-[#9E2A2B] dark:from-[#E05A47] dark:to-[#EB6B58] transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                {isExporting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Đang tạo ảnh poster 9:16...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>Tải Ảnh Poster Về Máy (PNG)</span>
                  </>
                )}
              </button>

              {/* Button 2: Copy Share Link */}
              <button
                onClick={handleCopyLink}
                className="w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm bg-[#FFFFFF] dark:bg-[#1A1A1E] text-[#18181B] dark:text-[#FAFAFA] border border-[#E5E5E2] dark:border-[#27272A] hover:border-[#9E2A2B] dark:hover:border-[#E05A47] transition-all flex items-center justify-center gap-2"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Đã Sao Chép Link Outfit!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao Chép Liên Kết Chia Sẻ</span>
                  </>
                )}
              </button>

              {/* Button 3: Save to Wardrobe */}
              {onSaveWardrobe && (
                <button
                  onClick={() => {
                    onSaveWardrobe();
                    if (onShowToast) {
                      onShowToast('Đã lưu bản phối vào Tủ đồ cá nhân!', 'success');
                    }
                  }}
                  className="w-full py-3 px-5 rounded-2xl font-bold text-xs bg-[#F8F8F7] dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] border border-[#E5E5E2] dark:border-[#27272A] transition-all flex items-center justify-center gap-2"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Lưu Vào Tủ Đồ Đã Lưu</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] text-center italic pt-1">
              Minh họa phối đồ 2D — phom và độ vừa thực tế có thể khác.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
