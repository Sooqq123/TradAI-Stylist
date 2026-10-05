/**
 * ColorPalettePicker Component - Bảng Màu Sắc Cổ Phục & Tân Thời
 * Color swatches in authentic Vietnamese traditional & contemporary hues.
 */

import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useOutfitStore } from '../../store/useOutfitStore';

export interface VietnameseColor {
  id: string;
  name: string;
  colorHex: string;
  meaning: string;
  badge: string;
  textColorClass?: string;
}

export const VIETNAMESE_PALETTES: VietnameseColor[] = [
  {
    id: 'do_chu_sa',
    name: 'Đỏ Chu Sa',
    colorHex: '#9E2A2B',
    meaning: 'Sắc son kinh điển của hỷ sự, vượng khí và may mắn ngày đầu năm.',
    badge: 'Kinh Điển Tết',
  },
  {
    id: 'vang_hoang_yen',
    name: 'Vàng Hoàng Yến',
    colorHex: '#D4AF37',
    meaning: 'Màu ánh kim vương giả triều Nguyễn, đại diện cho phù sa trù phú.',
    badge: 'Vương Giả',
  },
  {
    id: 'xanh_cham_co',
    name: 'Xanh Chàm Cổ',
    colorHex: '#1E3A5F',
    meaning: 'Sắc chàm đoan chính của giới trí thức xưa, sâu thẳm và nho nhã.',
    badge: 'Nho Nhã',
  },
  {
    id: 'hong_canh_sen',
    name: 'Hồng Cánh Sen',
    colorHex: '#D97D8F',
    meaning: 'Sắc hoa sen thanh khiết và hoa đào e ấp, tôn vinh nét duyên ngầm.',
    badge: 'Duyên Dáng',
  },
  {
    id: 'trang_nga',
    name: 'Trắng Ngà Tơ Tằm',
    colorHex: '#F4F1EA',
    meaning: 'Màu tơ lụa thô mộc tự nhiên, thuần khiết và thanh thoát bền vững.',
    badge: 'Thuần Khiết',
    textColorClass: 'text-slate-800',
  },
  {
    id: 'den_tuyen',
    name: 'Đen Tuyền Lãnh Mỹ A',
    colorHex: '#1A1A1A',
    meaning: 'Huyền thoại lụa Nam Bộ nhuộm mủ trái mặc nưa, đen bóng như huyền ngọc.',
    badge: 'Huyền Thoại',
  },
  {
    id: 'xanh_ngoc_bich',
    name: 'Xanh Ngọc Bích',
    colorHex: '#83C5BE',
    meaning: 'Màu ngọc cẩm thạch và dòng sông xuân phương Nam, tươi mới trẻ trung.',
    badge: 'Sinh Khí',
  },
  {
    id: 'tim_hoang_gia',
    name: 'Tím Cố Đô',
    colorHex: '#5C3D75',
    meaning: 'Sắc tím xứ Huế thâm trầm, mang chiều sâu hoài niệm đầy chất thơ.',
    badge: 'Thơ Mộng',
  },
];

export const ColorPalettePicker: React.FC = () => {
  const { currentOutfit, updateColor } = useOutfitStore();
  const currentColor = (currentOutfit.colorHex || '#9E2A2B').toLowerCase();

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E2A2B] dark:text-[#E05A47]">
            BẢNG MÀU SẮC ĐỘ VIỆT
          </span>
          <h3 className="font-editorial text-base font-bold text-[#18181B] dark:text-[#FAFAFA]">
            Sắc Màu Tà Áo & Điểm Nhấn Bản Phối
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#71717A] dark:text-[#A1A1AA]">
          <span className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/10" style={{ backgroundColor: currentOutfit.colorHex }} />
          <span className="font-mono text-[11px] font-bold">{currentOutfit.colorHex}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {VIETNAMESE_PALETTES.map((palette) => {
          const isSelected = currentColor === palette.colorHex.toLowerCase();

          return (
            <button
              key={palette.id}
              onClick={() => updateColor(palette.colorHex)}
              className={`p-3 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between group ${
                isSelected
                  ? 'border-[#9E2A2B] dark:border-[#E05A47] ring-2 ring-[#9E2A2B]/20 dark:ring-[#E05A47]/20 bg-[#FFFFFF] dark:bg-[#1A1A1E] shadow-sm scale-[1.02]'
                  : 'border-[#E5E5E2] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#1A1A1E] hover:border-[#9E2A2B]/40 dark:hover:border-[#E05A47]/40 hover:scale-[0.99]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className="w-8 h-8 rounded-xl shadow-inner border border-black/10 dark:border-white/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: palette.colorHex }}
                  >
                    {isSelected && (
                      <Check className={`w-4 h-4 stroke-[3] ${palette.textColorClass || 'text-white'}`} />
                    )}
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider bg-[#F8F8F7] dark:bg-[#121214] text-[#71717A] dark:text-[#A1A1AA] border border-[#E5E5E2] dark:border-[#27272A]">
                    {palette.badge}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-[#18181B] dark:text-[#FAFAFA] mb-1">
                  {palette.name}
                </h4>
                <p className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] line-clamp-2 leading-relaxed">
                  {palette.meaning}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#E5E5E2] dark:border-[#27272A] flex items-center justify-between text-[10px]">
                <span className="font-mono text-[#71717A] dark:text-[#A1A1AA]">{palette.colorHex}</span>
                <span
                  className={`font-bold ${
                    isSelected ? 'text-[#9E2A2B] dark:text-[#E05A47]' : 'text-transparent group-hover:text-[#71717A]'
                  }`}
                >
                  {isSelected ? 'Đang dùng' : 'Chọn'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
