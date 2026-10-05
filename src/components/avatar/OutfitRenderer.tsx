/**
 * OutfitRenderer Component - Bộ Dựng Hình 2D Vector Dùng Chung Toàn Ứng Dụng
 * Used by:
 * 1. Studio Canvas (nhân vật toàn thân mặc trang phục)
 * 2. Thumbnail từng món đồ trong WardrobePanel (chỉ render đúng món đó, phóng to phù hợp)
 * 3. Thumbnail bản phối trong Lookbook & Saved Looks (nhân vật mặc đầy đủ bộ đồ)
 * 4. Poster xuất ảnh mạng xã hội
 */

import React from 'react';
import { FashionItem, Outfit } from '../../types';
import { useOutfitStore } from '../../store/useOutfitStore';
import { AccessorySVG } from './AccessorySVG';
import { AvatarBase } from './AvatarBase';
import { BottomSVG } from './BottomSVG';
import { FootwearSVG } from './FootwearSVG';
import { GarmentSVG } from './GarmentSVG';

export interface OutfitRendererProps {
  outfit?: Partial<Outfit>;
  item?: FashionItem; // If rendering a standalone item thumbnail
  mode?: 'avatar' | 'item';
  className?: string;
  isZoomed?: boolean;
  gender?: 'nam' | 'nu';
}

export const OutfitRenderer: React.FC<OutfitRendererProps> = ({
  outfit,
  item,
  mode = 'avatar',
  className = 'w-full h-full',
  isZoomed = false,
  gender: propGender,
}) => {
  const storeGender = useOutfitStore((s) => s.mannequinGender);

  // ================= MODE 1: STANDALONE ITEM THUMBNAIL =================
  if (mode === 'item' && item) {
    if (item.category === 'garment') {
      // Focus on the garment
      const gType = (item.garmentType || 'ao_dai') as string;
      const isShortTop =
        [
          'ba_ba',
          'baby_tee',
          'corset',
          'tanktop',
          'blazer',
          'cuban_shirt',
        ].includes(gType) ||
        item.id.includes('baba') ||
        item.id.includes('blazer') ||
        item.id.includes('tee') ||
        item.id.includes('corset');

      const isMidLength = gType === 'ngu_than';

      // Áo ngắn/lửng (ba_ba, croptop...) dùng đúng viewBox tập trung thân trên '130 145 140 200'
      // Áo ngang đùi (ngũ thân): '125 140 150 340'
      // Áo tà dài qua gối (áo dài, nhật bình, giao lĩnh, tứ thân): '120 135 160 410'
      const viewBox = isShortTop
        ? '130 145 140 200'
        : isMidLength
        ? '125 140 150 340'
        : '120 135 160 410';

      return (
        <svg
          viewBox={viewBox}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <GarmentSVG
            type={gType as any}
            garmentType={gType as any}
            colorHex={item.colorHex}
            gender={item.gender}
            itemId={item.id}
            isStandalone={true}
          />
        </svg>
      );
    }

    if (item.category === 'bottom') {
      // Focus on pants or skirts
      const isSkirt = item.id.includes('skirt');
      const viewBox = isSkirt ? '140 250 120 250' : '140 245 120 355';
      return (
        <svg
          viewBox={viewBox}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <BottomSVG id={item.id} colorHex={item.colorHex} />
        </svg>
      );
    }

    if (item.category === 'footwear') {
      // Focus on the feet / shoes
      return (
        <svg
          viewBox="150 540 100 55"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <FootwearSVG id={item.id} colorHex={item.colorHex} />
        </svg>
      );
    }

    if (item.category === 'headwear') {
      // Focus on the hat / headwear
      let viewBox = '150 45 100 65';
      if (item.id === 'headwear_nonla_01') {
        viewBox = '120 20 160 100';
      } else if (item.id === 'headwear_nonquaithao_01') {
        // Nón Quai Thao: Vành nón rộng 168px và dải quai thao rủ dài xuống ngực
        viewBox = '110 32 180 252';
      } else if (item.id === 'headwear_khanvan_01') {
        viewBox = '152 38 96 56';
      } else if (item.id === 'headwear_beret_01') {
        viewBox = '154 42 92 52';
      }
      return (
        <svg
          viewBox={viewBox}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <AccessorySVG id={item.id} colorHex={item.colorHex} />
        </svg>
      );
    }

    if (item.category === 'accessory') {
      // Focus on the accessory
      let viewBox = '150 80 100 80';
      if (item.id === 'acc_kinhram_y2k') {
        viewBox = '165 88 70 30';
      } else if (item.id === 'acc_futuristic_cyber_shades') {
        // Kính ma trận vuốt bạc cyberpunk ôm sống mũi
        viewBox = '156 97 88 22';
      } else if (item.id === 'acc_pearl_punk_choker') {
        // Vòng cổ choker hạt ngọc trai mix xích punk ôm sát cổ
        viewBox = '182 146 36 30';
      } else if (item.id === 'acc_headphones_retro') {
        viewBox = '155 168 90 48';
      } else if (item.id === 'acc_daychuyen_ngoctrai') {
        viewBox = '180 180 40 30';
      } else if (item.id === 'acc_silver_shoulder_bag') {
        // Túi kẹp nách baguette da bóng Y2K kẹp bên sườn trái
        viewBox = '118 176 54 74';
      } else if (item.id === 'acc_quatxep_01') {
        // Quạt nan tre cầm tại lòng bàn tay phải (247, 365) xòe chéo lên và tua rua rủ thẳng
        viewBox = '232 286 86 134';
      } else if (item.id === 'acc_tote_01' || item.id === 'acc_tuicoi_01') {
        // Túi canvas / túi cói vắt qua cổ tay trái (153, 340) buông dọc bên hông trái
        viewBox = '126 336 52 100';
      } else if (item.id === 'acc_vongngoc_01') {
        viewBox = '225 275 30 60';
      }

      return (
        <svg
          viewBox={viewBox}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <AccessorySVG id={item.id} colorHex={item.colorHex} />
        </svg>
      );
    }
  }

  // ================= MODE 2: FULL DRESSED AVATAR =================
  const garment = outfit?.garment;
  const garmentColor = outfit?.colorHex || garment?.colorHex || '#C53030';
  const bottom = outfit?.bottom;
  const footwear = outfit?.footwear;
  const headwear = outfit?.headwear;
  const accessories = outfit?.accessories || [];
  const gender = (propGender || storeGender || outfit?.gender || garment?.gender || 'nu') as 'nam' | 'nu';

  const viewBox = isZoomed ? '70 20 260 590' : '0 0 400 640';

  const rawId = React.useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const glowId = `glow-${safeId}`;

  return (
    <svg
      viewBox={viewBox}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Ambient colored lighting gradient */}
        <radialGradient id={glowId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={garmentColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Filter 1: Tạo bóng đổ tiếp xúc mềm mại cho trang phục (clothing-depth-shadow) */}
        <filter
          id="clothing-depth-shadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="3.5"
            floodColor="#0A0812"
            floodOpacity="0.4"
          />
        </filter>

        {/* Filter 2: Tạo bóng đổ sắc nét cho phụ kiện kim loại & mũ nón (accessory-contact-shadow) */}
        <filter
          id="accessory-contact-shadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="2.5"
            stdDeviation="2"
            floodColor="#000000"
            floodOpacity="0.45"
          />
        </filter>
      </defs>

      {/* Background Soft Glow */}
      <circle cx="200" cy="260" r="170" fill={`url(#${glowId})`} />

      {/* Layer 0: Avatar Humanoid Base (Hair back, skin, face, eyes, neutral undergarments) */}
      <AvatarBase
        gender={gender}
        skinTone="#F6D2BD"
        hairColor="#1A1822"
        underwearColor="#242132"
        showUnderwear={!garment && !bottom}
        showHeadband={gender !== 'nam'}
      />

      {/* Layer 1: Quần / Váy (Bottoms) - nằm dưới tà áo */}
      {bottom && (
        <g className="layer-bottom">
          <BottomSVG id={bottom.id} colorHex={bottom.colorHex} />
        </g>
      )}

      {/* Layer 2: Giày dép (Footwear) - khớp bàn chân */}
      {footwear && (
        <g className="layer-footwear">
          <FootwearSVG id={footwear.id} colorHex={footwear.colorHex} />
        </g>
      )}

      {/* Layer 3: Thân áo Việt phục chính (Garment) - áp dụng filter clothing-depth-shadow */}
      {garment && (
        <g className="layer-garment" filter="url(#clothing-depth-shadow)">
          <GarmentSVG
            type={garment.garmentType || 'ao_dai'}
            garmentType={garment.garmentType || 'ao_dai'}
            colorHex={garmentColor}
            gender={garment.gender || (gender as any)}
            itemId={garment.id}
          />
        </g>
      )}

      {/* Layer 4: Phụ kiện cầm tay / quàng cổ (Accessories) - áp dụng filter accessory-contact-shadow */}
      {accessories.length > 0 && (
        <g className="layer-accessories" filter="url(#accessory-contact-shadow)">
          {accessories.map((acc) => (
            <AccessorySVG key={acc.id} id={acc.id} colorHex={acc.colorHex} />
          ))}
        </g>
      )}

      {/* Layer 5: Mũ & Khăn vấn (Headwear on head) - áp dụng filter accessory-contact-shadow */}
      {headwear && (
        <g className="layer-headwear" filter="url(#accessory-contact-shadow)">
          <AccessorySVG id={headwear.id} colorHex={headwear.colorHex} />
        </g>
      )}
    </svg>
  );
};
