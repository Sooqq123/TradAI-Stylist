/**
 * ItemGrid Component - Lưới Hiển Thị Các Món Đồ Thời Trang
 * 2-3 column responsive grid of ItemCard with instant toggle callbacks.
 */

import React from 'react';
import { PackageOpen } from 'lucide-react';
import { useOutfitStore } from '../../store/useOutfitStore';
import { FashionItem } from '../../types';
import { ItemCard } from './ItemCard';

interface ItemGridProps {
  items: FashionItem[];
}

export const ItemGrid: React.FC<ItemGridProps> = ({ items }) => {
  const {
    currentOutfit,
    setGarment,
    setBottom,
    setFootwear,
    setHeadwear,
    toggleAccessory,
  } = useOutfitStore();

  const isEquipped = (item: FashionItem): boolean => {
    switch (item.category) {
      case 'garment':
        return currentOutfit.garment?.id === item.id;
      case 'bottom':
        return currentOutfit.bottom?.id === item.id;
      case 'footwear':
        return currentOutfit.footwear?.id === item.id;
      case 'headwear':
        return currentOutfit.headwear?.id === item.id;
      case 'accessory':
        return currentOutfit.accessories?.some((a) => a.id === item.id) ?? false;
      default:
        return false;
    }
  };

  const handleToggle = (item: FashionItem) => {
    switch (item.category) {
      case 'garment':
        setGarment(item);
        break;
      case 'bottom':
        if (currentOutfit.bottom?.id === item.id) {
          setBottom(undefined);
        } else {
          setBottom(item);
        }
        break;
      case 'footwear':
        if (currentOutfit.footwear?.id === item.id) {
          setFootwear(undefined);
        } else {
          setFootwear(item);
        }
        break;
      case 'headwear':
        if (currentOutfit.headwear?.id === item.id) {
          setHeadwear(undefined);
        } else {
          setHeadwear(item);
        }
        break;
      case 'accessory':
        toggleAccessory(item);
        break;
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FFFFFF] dark:bg-[#1A1A1E] rounded-2xl border border-[#E5E5E2] dark:border-[#27272A] p-10 text-center flex flex-col items-center justify-center gap-2">
        <PackageOpen className="w-10 h-10 text-[#A1A1AA] stroke-1" />
        <h4 className="font-editorial text-base font-bold text-[#18181B] dark:text-[#FAFAFA]">
          Không tìm thấy món đồ phù hợp
        </h4>
        <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] max-w-xs">
          Vui lòng thử từ khóa tìm kiếm khác hoặc chuyển sang danh mục khác.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 animate-in fade-in duration-150">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isEquipped={isEquipped(item)}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
