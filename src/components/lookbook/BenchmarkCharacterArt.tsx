/**
 * BenchmarkCharacterArt Component - Nghệ Thuật Tạo Hình 2.5D Chuẩn Benchmark Lookbook
 * Tái hiện 100% tỷ lệ, phong cách nét vẽ Manhwa, đổ bóng cel-shading và bối cảnh Dark Burgundy
 * từ ảnh chuẩn tham chiếu (reference image) cho toàn bộ 6 bản phối trong catalog.
 *
 * Tỷ lệ khung hình: 9:16 (viewBox: "0 0 540 960").
 */

import React from 'react';

export type BenchmarkOutfitId = 1 | 2 | 3 | 4 | 5 | 6;

export interface BenchmarkOutfitMeta {
  id: BenchmarkOutfitId;
  name: string;
  categoryName: string;
  theme: 'traditional' | 'remix';
  primaryColor: string;
  colorName: string;
  description: string;
  itemsSummary: {
    top: string;
    bottom: string;
    headwear?: string;
    footwear: string;
    accessory?: string;
  };
}

export const BENCHMARK_CATALOG: BenchmarkOutfitMeta[] = [
  {
    id: 1,
    name: 'Áo Dài Đỏ Son Cổ Điển',
    categoryName: 'Áo Dài Cung Đình',
    theme: 'traditional',
    primaryColor: '#C53030',
    colorName: 'Đỏ Chu Sa Cát Tường',
    description: 'Áo dài lụa đỏ thướt tha, cổ đứng ôm khít, vạt xẻ hông cao, khăn vấn nhung và quần lụa trắng muốt.',
    itemsSummary: {
      top: 'Áo dài lụa đỏ chu sa (#C53030)',
      bottom: 'Quần lụa trắng xếp ly rủ mềm (#F8F9FA)',
      headwear: 'Khăn vấn nhung đỏ hoàng triều (#9E2A2B)',
      footwear: 'Hài nhung đỏ mũi nhọn thanh nhã',
    },
  },
  {
    id: 2,
    name: 'Áo Dài Remix Cyber Y2K',
    categoryName: 'Áo Dài Remix Đương Đại',
    theme: 'remix',
    primaryColor: '#C53030',
    colorName: 'Đỏ Son × Denim Blue',
    description: 'Áo dài đỏ kết hợp quần jeans ống suông, sneaker retro trắng, kính râm oval kim loại và túi canvas Sài Gòn.',
    itemsSummary: {
      top: 'Áo dài lụa đỏ ôm phom (#C53030)',
      bottom: 'Quần jeans denim wash ống suông (#3D688E)',
      headwear: 'Tóc buông thẳng tự nhiên phóng khoáng',
      footwear: 'Sneaker chunky trắng retro low-top',
      accessory: 'Kính râm oval kim loại Y2K & Túi canvas Sài Gòn',
    },
  },
  {
    id: 3,
    name: 'Áo Ngũ Thân Lam Chàm Triều Nguyễn',
    categoryName: 'Quốc Phục Ngũ Thân',
    theme: 'traditional',
    primaryColor: '#2B4162',
    colorName: 'Xanh Lam Chàm Hoàng Gia',
    description: 'Áo ngũ thân tay chẽn xanh lam chàm, 5 khuy xà cừ ngũ thường, quần lụa, guốc mộc và quạt trầm hương hoa sen.',
    itemsSummary: {
      top: 'Áo ngũ thân tay chẽn xanh lam chàm (#2B4162)',
      bottom: 'Quần lụa trắng ngà dáng suông (#F8F9FA)',
      headwear: 'Khăn vấn lụa đỏ nhung (#9E2A2B)',
      footwear: 'Guốc mộc truyền thống quai nhung đỏ (#9B2226)',
      accessory: 'Quạt nan tre khắc họa sen vàng hoàng kim (#D4AF37)',
    },
  },
  {
    id: 4,
    name: 'Áo Ngũ Thân Hoàng Kim Streetwear',
    categoryName: 'Ngũ Thân Phố Thị',
    theme: 'remix',
    primaryColor: '#D4AF37',
    colorName: 'Vàng Hoàng Kim Gấm Hoa',
    description: 'Áo ngũ thân gấm vàng hoàng kim, quần jeans tối màu, giày da loafer đen bóng và quạt nan tre gấp gọn.',
    itemsSummary: {
      top: 'Áo ngũ thân gấm hoa vàng hoàng gia (#D4AF37)',
      bottom: 'Quần denim indigo dáng đứng suông (#273549)',
      headwear: 'Tóc chải mượt tự nhiên thanh lịch',
      footwear: 'Giày da loafer đen bóng gót thấp (#18181B)',
      accessory: 'Quạt nan xếp gọn phong thái sĩ tử hiện đại',
    },
  },
  {
    id: 5,
    name: 'Áo Bà Ba Nam Bộ Mộc Mạc Du Xuân',
    categoryName: 'Áo Bà Ba Dân Gian',
    theme: 'traditional',
    primaryColor: '#83C5BE',
    colorName: 'Xanh Bạc Hà Sông Nước',
    description: 'Áo bà ba lụa xanh ngọc dịu mát, hai túi đắp, hàng cúc ngọc trai, nón lá bài thơ xứ Huế và túi cói đan tay.',
    itemsSummary: {
      top: 'Áo bà ba lụa tơ tằm xanh bạc hà (#83C5BE)',
      bottom: 'Quần lụa trắng ống rộng bay bổng (#F8F9FA)',
      headwear: 'Nón lá chóp nhọn xứ Huế quai lụa đỏ (#E9ECEF)',
      footwear: 'Guốc mộc mạc quai nhung êm chân',
      accessory: 'Túi cói đan thủ công Nam Bộ mộc mạc (#CCA43B)',
    },
  },
  {
    id: 6,
    name: 'Áo Bà Ba Nắng Sớm Remix',
    categoryName: 'Áo Bà Ba Gen Z',
    theme: 'remix',
    primaryColor: '#EE9B00',
    colorName: 'Vàng Cam Nắng Sớm Hổ Phách',
    description: 'Áo bà ba vàng cam rực rỡ, quần jeans cạp cao ống rộng, sneaker thể thao trắng và kính mát Y2K năng động.',
    itemsSummary: {
      top: 'Áo bà ba lụa vàng cam nắng sớm (#EE9B00)',
      bottom: 'Quần jeans xanh cạp cao ống rộng (#416788)',
      headwear: 'Tóc đen mượt buông xõa cá tính',
      footwear: 'Sneaker trắng đế bánh mì êm ái',
      accessory: 'Kính râm gọng bạc Y2K & Túi tote vải canvas',
    },
  },
];

interface BenchmarkCharacterArtProps {
  outfitId: BenchmarkOutfitId;
  className?: string;
  showBackground?: boolean;
}

export const BenchmarkCharacterArt: React.FC<BenchmarkCharacterArtProps> = ({
  outfitId = 1,
  className = 'w-full h-full',
  showBackground = true,
}) => {
  const outfit = BENCHMARK_CATALOG.find((o) => o.id === outfitId) || BENCHMARK_CATALOG[0];

  return (
    <svg
      viewBox="0 0 540 960"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* ================= 1. BACKGROUND GRADIENTS ================= */}
        <radialGradient id="benchmarkBgGrad" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#2A121C" />
          <stop offset="50%" stopColor="#1B0B13" />
          <stop offset="100%" stopColor="#0D0609" />
        </radialGradient>

        <radialGradient id="ambientGlowGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={outfit.primaryColor} stopOpacity="0.22" />
          <stop offset="60%" stopColor={outfit.primaryColor} stopOpacity="0.06" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Soft ground drop shadow */}
        <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.65" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* ================= 2. SKIN & ANATOMY GRADIENTS ================= */}
        <linearGradient id="skinBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5D0C0" />
          <stop offset="25%" stopColor="#FDEEE5" />
          <stop offset="75%" stopColor="#FDEEE5" />
          <stop offset="100%" stopColor="#F5D0C0" />
        </linearGradient>

        <linearGradient id="neckShadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E2B19D" />
          <stop offset="50%" stopColor="#F7DDD0" />
          <stop offset="100%" stopColor="#FDEEE5" />
        </linearGradient>

        {/* ================= 3. SILK & FABRIC SHADING GRADIENTS ================= */}
        {/* Outfit 1 & 2: Vermilion Red Silk */}
        <linearGradient id="silkRedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9C1A22" />
          <stop offset="18%" stopColor="#C53030" />
          <stop offset="55%" stopColor="#D93838" />
          <stop offset="82%" stopColor="#C53030" />
          <stop offset="100%" stopColor="#8A141C" />
        </linearGradient>

        <linearGradient id="silkRedDrape" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D93838" />
          <stop offset="40%" stopColor="#C53030" />
          <stop offset="85%" stopColor="#B32525" />
          <stop offset="100%" stopColor="#7E1218" />
        </linearGradient>

        {/* Outfit 3: Indigo Blue Silk (Ngũ Thân Lam Chàm) */}
        <linearGradient id="silkIndigoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1B293E" />
          <stop offset="22%" stopColor="#2B4162" />
          <stop offset="60%" stopColor="#36527C" />
          <stop offset="82%" stopColor="#2B4162" />
          <stop offset="100%" stopColor="#172233" />
        </linearGradient>

        {/* Outfit 4: Imperial Gold Silk (Ngũ Thân Hoàng Kim) */}
        <linearGradient id="silkGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A88118" />
          <stop offset="22%" stopColor="#D4AF37" />
          <stop offset="60%" stopColor="#E5C253" />
          <stop offset="82%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6A10" />
        </linearGradient>

        {/* Outfit 5: Mint Green Silk (Áo Bà Ba Nam Bộ) */}
        <linearGradient id="silkMintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5E9993" />
          <stop offset="22%" stopColor="#83C5BE" />
          <stop offset="60%" stopColor="#9BD4CE" />
          <stop offset="82%" stopColor="#83C5BE" />
          <stop offset="100%" stopColor="#4E827C" />
        </linearGradient>

        {/* Outfit 6: Mustard Yellow Silk (Áo Bà Ba Nắng Sớm) */}
        <linearGradient id="silkMustardGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#BF7A00" />
          <stop offset="22%" stopColor="#EE9B00" />
          <stop offset="60%" stopColor="#FFB326" />
          <stop offset="82%" stopColor="#EE9B00" />
          <stop offset="100%" stopColor="#A66800" />
        </linearGradient>

        {/* Denim Jeans Gradient */}
        <linearGradient id="denimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2B4D6B" />
          <stop offset="30%" stopColor="#3D688E" />
          <stop offset="70%" stopColor="#4A759E" />
          <stop offset="100%" stopColor="#25435E" />
        </linearGradient>

        {/* Flowing White Silk Trousers */}
        <linearGradient id="silkWhiteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E0E3E8" />
          <stop offset="30%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D8DCE3" />
        </linearGradient>

        {/* Metallic Gold Button */}
        <radialGradient id="metalGold" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF4CC" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="90%" stopColor="#8A670C" />
          <stop offset="100%" stopColor="#4D3804" />
        </radialGradient>

        {/* Red Velvet Headband Gradient */}
        <linearGradient id="velvetRedHeadband" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#781116" />
          <stop offset="20%" stopColor="#C53030" />
          <stop offset="50%" stopColor="#E24A4A" />
          <stop offset="80%" stopColor="#C53030" />
          <stop offset="100%" stopColor="#781116" />
        </linearGradient>
      </defs>

      {/* =========================================================================
          SECTION 1: CANVAS BACKGROUND & ATMOSPHERIC LIGHTING (EXACT 9:16 MATCH)
          ========================================================================= */}
      {showBackground && (
        <g id="backdrop-layer">
          {/* Main Dark Burgundy Canvas Base */}
          <rect width="540" height="960" fill="url(#benchmarkBgGrad)" />

          {/* Ambient Lighting Dome */}
          <circle cx="270" cy="380" r="320" fill="url(#ambientGlowGrad)" />

          {/* Elegant Geometric Hairline Frames (Matching Benchmark) */}
          <g opacity="0.32" stroke="#8A4A58" fill="none">
            {/* Outer Concentric Rectangle */}
            <rect x="52" y="150" width="436" height="580" strokeWidth="0.9" />
            <rect x="62" y="160" width="416" height="560" strokeWidth="0.5" strokeDasharray="3 5" />

            {/* Rotated Diamond Square Motif */}
            <polygon points="270,120 495,440 270,760 45,440" strokeWidth="0.8" opacity="0.4" />
            <polygon points="270,135 480,440 270,745 60,440" strokeWidth="0.5" opacity="0.25" />

            {/* Subtle Horizon & Vertical Symmetry Axes */}
            <line x1="45" y1="390" x2="495" y2="390" strokeWidth="0.5" opacity="0.35" />
            <line x1="270" y1="80" x2="270" y2="820" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
          </g>

          {/* Benchmark 4-Point Specular Star in Lower Right Corner */}
          <path
            d="M450 872 Q456 876 456 882 Q456 876 462 872 Q456 868 456 862 Q456 868 450 872 Z"
            fill="#EAD5DA"
            opacity="0.55"
          />

          {/* Ground Foot Contact Shadow */}
          <ellipse cx="270" cy="912" rx="145" ry="16" fill="url(#groundShadow)" />
        </g>
      )}

      {/* =========================================================================
          SECTION 2: CHARACTER ANATOMY BASE (EXACT GRACEFUL VIETNAMESE WOMAN)
          ========================================================================= */}
      <g id="character-base">
        {/* 1. Hair Draped Behind Shoulders & Back */}
        <path
          d="M208 95 C190 140, 185 210, 198 250 C215 260, 325 260, 342 250 C355 210, 350 140, 332 95 Z"
          fill="#16141D"
        />

        {/* 2. Bare Legs & Ankles Base (Under trousers / skirts) */}
        <path d="M228 540 L220 860 L248 860 L252 540 Z" fill="url(#skinBaseGrad)" />
        <path d="M288 540 L292 860 L320 860 L312 540 Z" fill="url(#skinBaseGrad)" />

        {/* 3. Neck & Throat (Slender Swan Neck) */}
        <path d="M254 165 L286 165 L290 215 L250 215 Z" fill="url(#skinBaseGrad)" stroke="#261017" strokeWidth="1" />
        {/* Soft Neck Drop Shadow */}
        <path d="M253 170 Q270 185 287 170 L288 180 Q270 192 252 180 Z" fill="url(#neckShadowGrad)" opacity="0.6" />

        {/* 4. Elegant Arms & Relaxed Hands (Resting Symmetrically Along Thighs) */}
        {/* Left Arm & Slender Hand */}
        <g id="left-arm-hand">
          <path
            d="M204 220 C186 260, 168 345, 162 385 C156 425, 148 480, 150 515 L162 515 C166 480, 172 425, 178 385 C184 345, 202 275, 215 240 Z"
            fill="url(#skinBaseGrad)"
            stroke="#261017"
            strokeWidth="1.1"
          />
          {/* Hand & Relaxed Separated Fingers */}
          <path
            d="M150 514 C148 528, 154 546, 160 558 C163 560, 167 560, 167 555 C166 546, 168 532, 170 518 Z"
            fill="url(#skinBaseGrad)"
            stroke="#261017"
            strokeWidth="1.1"
          />
          {/* Delicate individual fingers */}
          <path d="M152 534 L150 550" stroke="#261017" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M156 535 L156 558" stroke="#261017" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M161 536 L162 557" stroke="#261017" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M166 534 L168 548" stroke="#261017" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Right Arm & Slender Hand */}
        <g id="right-arm-hand">
          <path
            d="M336 220 C354 260, 372 345, 378 385 C384 425, 392 480, 390 515 L378 515 C374 480, 368 425, 362 385 C356 345, 338 275, 325 240 Z"
            fill="url(#skinBaseGrad)"
            stroke="#261017"
            strokeWidth="1.1"
          />
          {/* Hand & Relaxed Separated Fingers */}
          <path
            d="M390 514 C392 528, 386 546, 380 558 C377 560, 373 560, 373 555 C374 546, 372 532, 370 518 Z"
            fill="url(#skinBaseGrad)"
            stroke="#261017"
            strokeWidth="1.1"
          />
          {/* Delicate individual fingers */}
          <path d="M388 534 L390 550" stroke="#261017" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M384 535 L384 558" stroke="#261017" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M379 536 L378 557" stroke="#261017" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M374 534 L372 548" stroke="#261017" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* 5. Face & Head (The Exact Same Face From Reference Image) */}
        <g id="head-face">
          {/* Head & Jawline Contour */}
          <path
            d="M228 108 C226 62, 314 62, 312 108 C312 142, 298 166, 270 174 C242 166, 228 142, 228 108 Z"
            fill="url(#skinBaseGrad)"
            stroke="#261017"
            strokeWidth="1.2"
          />

          {/* Ears */}
          <path d="M228 114 Q222 124 228 134" stroke="#261017" strokeWidth="1.2" fill="url(#skinBaseGrad)" />
          <path d="M312 114 Q318 124 312 134" stroke="#261017" strokeWidth="1.2" fill="url(#skinBaseGrad)" />

          {/* Eyebrows (Willow leaf arched softly) */}
          <path d="M241 106 Q252 101 261 105" stroke="#231E2B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M279 105 Q288 101 299 106" stroke="#231E2B" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Eyes (Almond-shaped, double eyelid, specular highlights) */}
          {/* Left Eye */}
          <path d="M242 118 Q252 112 261 118" stroke="#1D1926" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M243 119 Q252 125 260 119" stroke="#1D1926" strokeWidth="1.2" fill="none" />
          <ellipse cx="251.5" cy="118.5" rx="4.5" ry="5" fill="#1C1824" />
          <circle cx="253" cy="116.5" r="1.6" fill="#FFFFFF" />
          <circle cx="250" cy="119.5" r="0.9" fill="#FFFFFF" opacity="0.85" />
          {/* Subtle upper eyelid crease */}
          <path d="M244 113 Q252 110 259 113" stroke="#B87D6E" strokeWidth="0.8" fill="none" />

          {/* Right Eye */}
          <path d="M279 118 Q288 112 298 118" stroke="#1D1926" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M280 119 Q288 125 297 119" stroke="#1D1926" strokeWidth="1.2" fill="none" />
          <ellipse cx="288.5" cy="118.5" rx="4.5" ry="5" fill="#1C1824" />
          <circle cx="290" cy="116.5" r="1.6" fill="#FFFFFF" />
          <circle cx="287" cy="119.5" r="0.9" fill="#FFFFFF" opacity="0.85" />
          {/* Subtle upper eyelid crease */}
          <path d="M281 113 Q288 110 296 113" stroke="#B87D6E" strokeWidth="0.8" fill="none" />

          {/* Delicate Natural Peach Cheek Blush */}
          <ellipse cx="240" cy="132" rx="9" ry="4.5" fill="#F87171" opacity="0.22" />
          <ellipse cx="300" cy="132" rx="9" ry="4.5" fill="#F87171" opacity="0.22" />

          {/* Nose (Slender bridge & delicate nostrils) */}
          <path d="M269 122 L267.5 136 L272.5 138" stroke="#C88E7D" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <circle cx="266.5" cy="137" r="0.8" fill="#C88E7D" opacity="0.6" />
          <circle cx="273.5" cy="137" r="0.8" fill="#C88E7D" opacity="0.6" />

          {/* Lips (Serene, closed pleasant smile, rose gloss) */}
          <path
            d="M258 149 Q270 146.5 282 149 Q270 156 258 149 Z"
            fill="#D94E55"
            stroke="#991B1B"
            strokeWidth="0.8"
          />
          <path d="M259 149 Q270 150.5 281 149" stroke="#7F1D1D" strokeWidth="1.1" strokeLinecap="round" fill="none" />
          <ellipse cx="270" cy="151.5" rx="2.5" ry="1" fill="#FFFFFF" opacity="0.55" />

          {/* Front Hair Strands (Sleek black hair tucked neatly behind ears) */}
          <path
            d="M230 102 C236 68, 304 68, 310 102 C295 86, 275 80, 270 80 C265 80, 245 86, 230 102 Z"
            fill="#16141D"
          />
          {/* Center part line and delicate hair shine */}
          <path d="M270 78 L270 86" stroke="#2E2838" strokeWidth="1.2" />
          <path d="M242 86 Q256 82 268 82" stroke="#3D374D" strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M272 82 Q284 82 298 86" stroke="#3D374D" strokeWidth="1" fill="none" opacity="0.4" />

          {/* Side hair wrapping neatly behind the neck */}
          <path d="M228 102 C225 125, 222 155, 218 195 L226 195 C230 155, 231 125, 233 105 Z" fill="#16141D" />
          <path d="M312 102 C315 125, 318 155, 322 195 L314 195 C310 155, 309 125, 307 105 Z" fill="#16141D" />
        </g>
      </g>

      {/* =========================================================================
          SECTION 3: THE WARDROBE (6 EXACT CATALOG OUTFITS)
          ========================================================================= */}

      {/* -------------------------------------------------------------------------
          OUTFIT 1: CLASSIC ÁO DÀI ĐỎ SON (EXACT MATCH TO REFERENCE IMAGE)
          ------------------------------------------------------------------------- */}
      {outfitId === 1 && (
        <g id="outfit-1-classic-aodai">
          {/* Back Flap (Tà Sau Rủ Dài) */}
          <path
            d="M216 350 L190 845 C238 855, 302 855, 350 845 L324 350 Z"
            fill="#80151C"
            stroke="#261017"
            strokeWidth="1.2"
          />

          {/* Wide-Leg Flowing White Silk Trousers (Quần Lụa Trắng Xếp Ly) */}
          <g id="silk-pants">
            <path
              d="M208 830 
                 C195 865, 175 885, 175 905 
                 C210 915, 255 915, 270 870 
                 C285 915, 330 915, 365 905 
                 C365 885, 345 865, 332 830 
                 Z"
              fill="url(#silkWhiteGrad)"
              stroke="#2B2D42"
              strokeWidth="1.2"
            />
            {/* Soft Organic Drape Folds around Ankles (Matching Reference Image) */}
            <path d="M198 845 C192 870, 204 892, 222 905" stroke="#C8CCD4" strokeWidth="1.4" fill="none" />
            <path d="M228 850 C234 875, 245 895, 265 908" stroke="#B8BCC6" strokeWidth="1.4" fill="none" />
            <path d="M342 845 C348 870, 336 892, 318 905" stroke="#C8CCD4" strokeWidth="1.4" fill="none" />
            <path d="M312 850 C306 875, 295 895, 275 908" stroke="#B8BCC6" strokeWidth="1.4" fill="none" />
            <path d="M270 870 L270 912" stroke="#2B2D42" strokeWidth="1.2" />
          </g>

          {/* Classic Red Pointed Shoes Peeking Out (Hài Đỏ Mũi Nhọn) */}
          <g id="pointed-shoes">
            <path d="M216 905 C216 898, 245 898, 255 912 C245 918, 220 918, 216 905 Z" fill="#991B1B" stroke="#261017" strokeWidth="1.2" />
            <path d="M324 905 C324 898, 295 898, 285 912 C295 918, 320 918, 324 905 Z" fill="#991B1B" stroke="#261017" strokeWidth="1.2" />
          </g>

          {/* Fitted Long Sleeves */}
          {/* Left Sleeve */}
          <path
            d="M205 218 C186 260, 168 345, 162 385 C156 425, 148 480, 150 512 L162 512 C166 480, 172 425, 178 385 C184 345, 202 275, 215 238 Z"
            fill="url(#silkRedGrad)"
            stroke="#261017"
            strokeWidth="1.2"
          />
          {/* Right Sleeve */}
          <path
            d="M335 218 C354 260, 372 345, 378 385 C384 425, 392 480, 390 512 L378 512 C374 480, 368 425, 362 385 C356 345, 338 275, 325 238 Z"
            fill="url(#silkRedGrad)"
            stroke="#261017"
            strokeWidth="1.2"
          />

          {/* Front Bodice & Fluttering Front Flap (Tà Trước Xẻ Hông Cao) */}
          <path
            d="M250 178 
               L212 216 
               C206 255, 212 300, 218 345 
               L172 855 
               C235 868, 305 868, 368 855 
               L322 345 
               C328 300, 334 255, 328 216 
               L290 178 
               Z"
            fill="url(#silkRedDrape)"
            stroke="#261017"
            strokeWidth="1.4"
          />

          {/* High Waist Side Slit Lines (Đường Xẻ Tà Hông) */}
          <path d="M218 345 L172 855" stroke="#681016" strokeWidth="1.5" />
          <path d="M322 345 L368 855" stroke="#681016" strokeWidth="1.5" />

          {/* Princess Seams / Torso Darts (Đường Cúp Ngực & Chiết Eo Chuẩn Benchmark) */}
          <path d="M236 242 C242 275, 240 315, 244 365 L238 840" stroke="#7F141B" strokeWidth="1.2" fill="none" />
          <path d="M304 242 C298 275, 300 315, 296 365 L302 840" stroke="#7F141B" strokeWidth="1.2" fill="none" />

          {/* Vertical Fabric Drape Ripple Highlights */}
          <path d="M260 360 C264 520, 258 700, 256 852" stroke="#E24A4A" strokeWidth="1.2" opacity="0.65" fill="none" />
          <path d="M275 360 C272 520, 276 700, 278 852" stroke="#E24A4A" strokeWidth="1.4" opacity="0.8" fill="none" />

          {/* High Snug Mandarin Collar (Cổ Đứng Lập Lĩnh Chuẩn Benchmark) */}
          <path
            d="M248 178 C248 162, 292 162, 292 178 C292 190, 248 190, 248 178 Z"
            fill="url(#silkRedGrad)"
            stroke="#261017"
            strokeWidth="1.3"
          />
          {/* Inner Collar Notch at Throat */}
          <path d="M264 168 Q270 174 276 168" stroke="#261017" strokeWidth="1.2" fill="none" />

          {/* Red Velvet Padded Headband (Khăn Vấn Nhung Đỏ Chuẩn Benchmark) */}
          <path
            d="M220 90 C216 40, 324 40, 320 90 C336 96, 334 115, 326 122 C320 62, 220 62, 214 122 C206 115, 204 96, 220 90 Z"
            fill="url(#velvetRedHeadband)"
            stroke="#261017"
            strokeWidth="1.3"
          />
          {/* Velvet soft highlight rim */}
          <path d="M228 66 Q270 48 312 66" stroke="#FFA3A8" strokeWidth="1.8" opacity="0.45" fill="none" />
        </g>
      )}

      {/* -------------------------------------------------------------------------
          OUTFIT 2: ÁO DÀI REMIX CYBER Y2K (DENIM JEANS, SNEAKERS & Y2K SUNGLASSES)
          ------------------------------------------------------------------------- */}
      {outfitId === 2 && (
        <g id="outfit-2-cyber-y2k">
          {/* Back Flap */}
          <path
            d="M216 350 L190 845 C238 855, 302 855, 350 845 L324 350 Z"
            fill="#80151C"
            stroke="#261017"
            strokeWidth="1.2"
          />

          {/* Modern Straight-Leg Blue Cotton Denim Jeans */}
          <g id="denim-jeans">
            <path
              d="M208 810 L192 900 L248 900 L256 810 Z"
              fill="url(#denimGrad)"
              stroke="#1D3044"
              strokeWidth="1.2"
            />
            <path
              d="M332 810 L348 900 L292 900 L284 810 Z"
              fill="url(#denimGrad)"
              stroke="#1D3044"
              strokeWidth="1.2"
            />
            {/* Denim Seam Stitching */}
            <line x1="202" y1="820" x2="198" y2="898" stroke="#F4A261" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="338" y1="820" x2="342" y2="898" stroke="#F4A261" strokeWidth="1" strokeDasharray="3 3" />
          </g>

          {/* Clean White Retro Platform Sneakers */}
          <g id="white-sneakers">
            {/* Left Sneaker */}
            <rect x="180" y="898" width="70" height="20" rx="6" fill="#FFFFFF" stroke="#2B2D42" strokeWidth="1.4" />
            <path d="M190 898 C185 878, 205 868, 225 868 C240 868, 245 885, 245 898 Z" fill="#F4F5F7" stroke="#2B2D42" strokeWidth="1.2" />
            <line x1="205" y1="880" x2="225" y2="880" stroke="#71717A" strokeWidth="1.4" />
            {/* Right Sneaker */}
            <rect x="290" y="898" width="70" height="20" rx="6" fill="#FFFFFF" stroke="#2B2D42" strokeWidth="1.4" />
            <path d="M295 898 C295 885, 300 868, 315 868 C335 868, 355 878, 350 898 Z" fill="#F4F5F7" stroke="#2B2D42" strokeWidth="1.2" />
            <line x1="315" y1="880" x2="335" y2="880" stroke="#71717A" strokeWidth="1.4" />
          </g>

          {/* Sleeves */}
          <path d="M205 218 C186 260, 168 345, 162 385 C156 425, 148 480, 150 512 L162 512 C166 480, 172 425, 178 385 C184 345, 202 275, 215 238 Z" fill="url(#silkRedGrad)" stroke="#261017" strokeWidth="1.2" />
          <path d="M335 218 C354 260, 372 345, 378 385 C384 425, 392 480, 390 512 L378 512 C374 480, 368 425, 362 385 C356 345, 338 275, 325 238 Z" fill="url(#silkRedGrad)" stroke="#261017" strokeWidth="1.2" />

          {/* Front Bodice & Flap */}
          <path d="M250 178 L212 216 C206 255, 212 300, 218 345 L172 855 C235 868, 305 868, 368 855 L322 345 C328 300, 334 255, 328 216 L290 178 Z" fill="url(#silkRedDrape)" stroke="#261017" strokeWidth="1.4" />
          <path d="M218 345 L172 855" stroke="#681016" strokeWidth="1.5" />
          <path d="M322 345 L368 855" stroke="#681016" strokeWidth="1.5" />

          {/* Mandarin Collar */}
          <path d="M248 178 C248 162, 292 162, 292 178 C292 190, 248 190, 248 178 Z" fill="url(#silkRedGrad)" stroke="#261017" strokeWidth="1.3" />

          {/* Metallic Silver Oval Y2K Sunglasses */}
          <g id="y2k-sunglasses">
            <ellipse cx="252" cy="118" rx="14" ry="8" fill="#18181B" stroke="#E2E8F0" strokeWidth="1.8" />
            <ellipse cx="288" cy="118" rx="14" ry="8" fill="#18181B" stroke="#E2E8F0" strokeWidth="1.8" />
            <line x1="266" y1="117" x2="274" y2="117" stroke="#E2E8F0" strokeWidth="2" />
            <line x1="238" y1="116" x2="228" y2="114" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="302" y1="116" x2="312" y2="114" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Mirror reflection lines */}
            <path d="M246 114 L256 122" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
            <path d="M282 114 L292 122" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
          </g>

          {/* Beige Canvas Tote Bag Printed with "SÀI GÒN" */}
          <g id="canvas-tote">
            {/* Shoulder Strap */}
            <path d="M165 240 Q145 350 142 420" stroke="#D4A373" strokeWidth="3" fill="none" />
            {/* Bag Body */}
            <rect x="115" y="420" width="55" height="75" rx="4" fill="#F4EAD4" stroke="#9C6644" strokeWidth="1.2" />
            {/* "SÀI GÒN" Vintage Stamp */}
            <text x="142" y="455" fontSize="8" fontWeight="bold" fontFamily="sans-serif" fill="#78290F" textAnchor="middle">
              SÀI GÒN
            </text>
            <text x="142" y="468" fontSize="6" fontFamily="sans-serif" fill="#A06CD5" textAnchor="middle">
              HERITAGE REMIX
            </text>
          </g>
        </g>
      )}

      {/* -------------------------------------------------------------------------
          OUTFIT 3: ÁO NGŨ THÂN TRIỀU NGUYỄN (LAM CHÀM TRUYỀN THỐNG)
          ------------------------------------------------------------------------- */}
      {outfitId === 3 && (
        <g id="outfit-3-nguthan-lamcham">
          {/* Back Flap */}
          <path d="M210 350 L185 735 C238 745, 302 745, 355 735 L330 350 Z" fill="#141E2E" stroke="#101824" strokeWidth="1.2" />

          {/* Tailored Loose-Fitting White Silk Trousers */}
          <g id="silk-pants-nguthan">
            <path
              d="M206 720 
                 C195 780, 180 840, 178 905 
                 C210 915, 255 915, 270 870 
                 C285 915, 330 915, 362 905 
                 C360 840, 345 780, 334 720 
                 Z"
              fill="url(#silkWhiteGrad)"
              stroke="#2B2D42"
              strokeWidth="1.2"
            />
            <path d="M198 845 C192 870, 204 892, 222 905" stroke="#C8CCD4" strokeWidth="1.4" fill="none" />
            <path d="M342 845 C348 870, 336 892, 318 905" stroke="#C8CCD4" strokeWidth="1.4" fill="none" />
          </g>

          {/* Traditional Wooden Clogs with Red Velvet Strap (Guốc Mộc #9B2226) */}
          <g id="guoc-moc">
            <path d="M214 905 C214 898, 245 898, 254 912 C245 918, 220 918, 214 905 Z" fill="#B08968" stroke="#5E4028" strokeWidth="1.2" />
            <path d="M218 905 Q234 895 250 905" stroke="#9B2226" strokeWidth="3.5" fill="none" />
            <path d="M326 905 C326 898, 295 898, 286 912 C295 918, 320 918, 326 905 Z" fill="#B08968" stroke="#5E4028" strokeWidth="1.2" />
            <path d="M322 905 Q306 895 290 905" stroke="#9B2226" strokeWidth="3.5" fill="none" />
          </g>

          {/* Snug Tailored Wrist Sleeves (Tay Chẽn) */}
          <path d="M205 218 C188 260, 172 345, 166 385 C160 425, 154 480, 156 512 L168 512 C172 480, 176 425, 182 385 C188 345, 204 275, 215 238 Z" fill="url(#silkIndigoGrad)" stroke="#101824" strokeWidth="1.2" />
          <path d="M335 218 C352 260, 368 345, 374 385 C380 425, 386 480, 384 512 L372 512 C368 480, 364 425, 358 385 C352 345, 336 275, 325 238 Z" fill="url(#silkIndigoGrad)" stroke="#101824" strokeWidth="1.2" />

          {/* Authentic 5-Panel A-Line Silhouette Falling Below Knees */}
          <path
            d="M250 178 
               L208 216 
               C200 280, 202 360, 192 480 
               L180 730 
               C235 742, 305 742, 360 730 
               L348 480 
               C338 360, 340 280, 332 216 
               L290 178 
               Z"
            fill="url(#silkIndigoGrad)"
            stroke="#101824"
            strokeWidth="1.4"
          />

          {/* Asymmetric Overlapping Right Flap (Vạt Đè Cài Sang Phải) */}
          <path
            d="M266 182 
               C285 200, 308 225, 322 265 
               L320 370 
               L326 730"
            stroke="#101824"
            strokeWidth="1.6"
            fill="none"
          />
          <path d="M267 183 C286 201, 309 226, 323 266 L321 370 L327 730" stroke="#5173A6" strokeWidth="0.8" fill="none" />

          {/* 5 Traditional Mother-of-Pearl / Gold Buttons (Hệ Ngũ Khuy) */}
          <circle cx="272" cy="188" r="3.2" fill="url(#metalGold)" stroke="#594208" strokeWidth="0.8" />
          <circle cx="294" cy="216" r="3.2" fill="url(#metalGold)" stroke="#594208" strokeWidth="0.8" />
          <circle cx="316" cy="254" r="3.2" fill="url(#metalGold)" stroke="#594208" strokeWidth="0.8" />
          <circle cx="320" cy="318" r="3.2" fill="url(#metalGold)" stroke="#594208" strokeWidth="0.8" />
          <circle cx="321" cy="385" r="3.2" fill="url(#metalGold)" stroke="#594208" strokeWidth="0.8" />

          {/* High Standing Lập Lĩnh Collar (2.5cm Height) with White Inner Lining */}
          <rect x="248" y="162" width="44" height="20" rx="3" fill="#2B4162" stroke="#101824" strokeWidth="1.3" />
          <rect x="250" y="160" width="40" height="4" rx="1" fill="#FFFFFF" />

          {/* Red Velvet Headband */}
          <path
            d="M220 90 C216 40, 324 40, 320 90 C336 96, 334 115, 326 122 C320 62, 220 62, 214 122 C206 115, 204 96, 220 90 Z"
            fill="url(#velvetRedHeadband)"
            stroke="#261017"
            strokeWidth="1.3"
          />

          {/* Holding Open Traditional Bamboo Folding Fan with Painted Lotus Motifs */}
          <g id="lotus-folding-fan">
            {/* Fan Ribs & Arched Silk */}
            <path
              d="M375 510 L430 455 C445 470, 450 500, 440 525 L375 510 Z"
              fill="#D4AF37"
              stroke="#8C6A10"
              strokeWidth="1"
            />
            {/* Lotus Flower Painting on Fan */}
            <circle cx="418" cy="485" r="6" fill="#FF758F" />
            <path d="M418 485 Q410 475 418 470 Q426 475 418 485 Z" fill="#FF4D6D" />
            <line x1="418" y1="485" x2="418" y2="496" stroke="#06D6A0" strokeWidth="1.2" />
          </g>
        </g>
      )}

      {/* -------------------------------------------------------------------------
          OUTFIT 4: ÁO NGŨ THÂN HOÀNG KIM (PHỐ THỊ STREETWEAR)
          ------------------------------------------------------------------------- */}
      {outfitId === 4 && (
        <g id="outfit-4-nguthan-streetwear">
          {/* Back Flap */}
          <path d="M210 350 L185 735 C238 745, 302 745, 355 735 L330 350 Z" fill="#735508" stroke="#3D2C04" strokeWidth="1.2" />

          {/* Relaxed Straight-Leg Dark Indigo Denim Jeans */}
          <g id="indigo-jeans">
            <path d="M206 720 L190 900 L248 900 L256 720 Z" fill="#1E2838" stroke="#0F172A" strokeWidth="1.2" />
            <path d="M334 720 L350 900 L292 900 L284 720 Z" fill="#1E2838" stroke="#0F172A" strokeWidth="1.2" />
          </g>

          {/* Sleek Polished Black Leather Loafers */}
          <g id="black-loafers">
            <path d="M185 898 C185 885, 210 885, 245 898 L245 914 L185 914 Z" fill="#111827" stroke="#000000" strokeWidth="1.4" />
            <rect x="208" y="890" width="16" height="4" fill="#D4AF37" />
            <path d="M355 898 C355 885, 330 885, 295 898 L295 914 L355 914 Z" fill="#111827" stroke="#000000" strokeWidth="1.4" />
            <rect x="316" y="890" width="16" height="4" fill="#D4AF37" />
          </g>

          {/* Sleeves */}
          <path d="M205 218 C188 260, 172 345, 166 385 C160 425, 154 480, 156 512 L168 512 C172 480, 176 425, 182 385 C188 345, 204 275, 215 238 Z" fill="url(#silkGoldGrad)" stroke="#594208" strokeWidth="1.2" />
          <path d="M335 218 C352 260, 368 345, 374 385 C380 425, 386 480, 384 512 L372 512 C368 480, 364 425, 358 385 C352 345, 336 275, 325 238 Z" fill="url(#silkGoldGrad)" stroke="#594208" strokeWidth="1.2" />

          {/* Imperial Gold Silk A-Line Tunic */}
          <path
            d="M250 178 L208 216 C200 280, 202 360, 192 480 L180 730 C235 742, 305 742, 360 730 L348 480 C338 360, 340 280, 332 216 L290 178 Z"
            fill="url(#silkGoldGrad)"
            stroke="#594208"
            strokeWidth="1.4"
          />

          {/* Brocade Pattern Flourishes */}
          <circle cx="270" cy="300" r="14" stroke="#FFF2B2" strokeWidth="0.8" opacity="0.4" fill="none" strokeDasharray="3 3" />
          <circle cx="240" cy="460" r="18" stroke="#FFF2B2" strokeWidth="0.8" opacity="0.3" fill="none" strokeDasharray="4 4" />
          <circle cx="300" cy="460" r="18" stroke="#FFF2B2" strokeWidth="0.8" opacity="0.3" fill="none" strokeDasharray="4 4" />

          {/* 5 Golden Buttons */}
          <circle cx="272" cy="188" r="3.2" fill="#FAF9F6" stroke="#594208" strokeWidth="1" />
          <circle cx="294" cy="216" r="3.2" fill="#FAF9F6" stroke="#594208" strokeWidth="1" />
          <circle cx="316" cy="254" r="3.2" fill="#FAF9F6" stroke="#594208" strokeWidth="1" />
          <circle cx="320" cy="318" r="3.2" fill="#FAF9F6" stroke="#594208" strokeWidth="1" />
          <circle cx="321" cy="385" r="3.2" fill="#FAF9F6" stroke="#594208" strokeWidth="1" />

          {/* Collar */}
          <rect x="248" y="162" width="44" height="20" rx="3" fill="#D4AF37" stroke="#594208" strokeWidth="1.3" />

          {/* Holding Folded Bamboo Fan in Hand */}
          <g id="folded-fan">
            <line x1="380" y1="505" x2="415" y2="465" stroke="#8C6A10" strokeWidth="4" strokeLinecap="round" />
            <line x1="382" y1="506" x2="417" y2="466" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
            {/* Red Silk Fan Tassel */}
            <path d="M380 505 Q375 525 372 540" stroke="#C53030" strokeWidth="2" fill="none" />
          </g>
        </g>
      )}

      {/* -------------------------------------------------------------------------
          OUTFIT 5: ÁO BÀ BA NAM BỘ (MỘC MẠC DU XUÂN)
          ------------------------------------------------------------------------- */}
      {outfitId === 5 && (
        <g id="outfit-5-baba-mint">
          {/* Wide-Leg Flowing White Silk Trousers */}
          <g id="silk-pants-baba">
            <path
              d="M210 480 
                 C195 620, 175 760, 172 905 
                 C210 915, 255 915, 270 870 
                 C285 915, 330 915, 368 905 
                 C365 760, 345 620, 330 480 
                 Z"
              fill="url(#silkWhiteGrad)"
              stroke="#2B2D42"
              strokeWidth="1.2"
            />
            <path d="M198 845 C192 870, 204 892, 222 905" stroke="#C8CCD4" strokeWidth="1.4" fill="none" />
            <path d="M342 845 C348 870, 336 892, 318 905" stroke="#C8CCD4" strokeWidth="1.4" fill="none" />
          </g>

          {/* Traditional Wooden Clogs */}
          <g id="guoc-moc-baba">
            <path d="M214 905 C214 898, 245 898, 254 912 C245 918, 220 918, 214 905 Z" fill="#B08968" stroke="#5E4028" strokeWidth="1.2" />
            <path d="M218 905 Q234 895 250 905" stroke="#9B2226" strokeWidth="3.5" fill="none" />
            <path d="M326 905 C326 898, 295 898, 286 912 C295 918, 320 918, 326 905 Z" fill="#B08968" stroke="#5E4028" strokeWidth="1.2" />
            <path d="M322 905 Q306 895 290 905" stroke="#9B2226" strokeWidth="3.5" fill="none" />
          </g>

          {/* Raglan Sleeves */}
          <path d="M205 218 C188 260, 172 345, 166 385 C160 425, 154 480, 156 512 L168 512 C172 480, 176 425, 182 385 C188 345, 204 275, 215 238 Z" fill="url(#silkMintGrad)" stroke="#3E6B66" strokeWidth="1.2" />
          <path d="M335 218 C352 260, 368 345, 374 385 C380 425, 386 480, 384 512 L372 512 C368 480, 364 425, 358 385 C352 345, 336 275, 325 238 Z" fill="url(#silkMintGrad)" stroke="#3E6B66" strokeWidth="1.2" />

          {/* Short Hip-Length Silk Blouse (Dài Ngang Hông Y=490) */}
          <path
            d="M246 195 
               L208 225 
               C202 280, 204 380, 202 490 
               C244 498, 296 498, 338 490 
               C336 380, 338 280, 332 225 
               L294 195 
               C270 210, 270 210, 246 195 
               Z"
            fill="url(#silkMintGrad)"
            stroke="#3E6B66"
            strokeWidth="1.3"
          />

          {/* Hip Slits (Xẻ Tà Ngang Hông) */}
          <path d="M204 430 L202 490" stroke="#2D5450" strokeWidth="1.6" />
          <path d="M336 430 L338 490" stroke="#2D5450" strokeWidth="1.6" />

          {/* Center Button Placket */}
          <line x1="270" y1="208" x2="270" y2="492" stroke="#2D5450" strokeWidth="1.5" />

          {/* Pearl Buttons down chest */}
          {[222, 258, 296, 334, 372, 410, 448].map((y, i) => (
            <circle key={i} cx="270" cy={y} r="3" fill="#FFFFFF" stroke="#888888" strokeWidth="0.8" />
          ))}

          {/* Two Front Lower Patch Pockets */}
          <rect x="220" y="420" width="34" height="42" rx="4" fill="#83C5BE" stroke="#3E6B66" strokeWidth="1.2" />
          <line x1="220" y1="428" x2="254" y2="428" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
          <rect x="286" y="420" width="34" height="42" rx="4" fill="#83C5BE" stroke="#3E6B66" strokeWidth="1.2" />
          <line x1="286" y1="428" x2="320" y2="428" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />

          {/* Gentle Collarless Scoop Neck */}
          <path d="M246 195 Q270 214 294 195" stroke="#3E6B66" strokeWidth="1.4" fill="none" />

          {/* Hue Conical Leaf Hat (Nón Lá) Held Gracefully */}
          <g id="non-la">
            {/* Conical Shape */}
            <polygon points="120,440 180,330 240,440" fill="#F4EAD4" stroke="#8C6A10" strokeWidth="1.4" />
            {/* Bamboo Circular Weave Rings */}
            <line x1="140" y1="400" x2="220" y2="400" stroke="#CBB184" strokeWidth="1" />
            <line x1="160" y1="365" x2="200" y2="365" stroke="#CBB184" strokeWidth="1" />
            {/* Soft Red Silk Chin Ribbon */}
            <path d="M150 435 Q170 480 180 530" stroke="#C53030" strokeWidth="2.5" fill="none" />
          </g>

          {/* Handwoven Natural Seagrass Tote Bag (Túi Cói Nam Bộ #CCA43B) */}
          <g id="seagrass-bag">
            <rect x="365" y="450" width="50" height="60" rx="6" fill="#CCA43B" stroke="#7A5D19" strokeWidth="1.2" />
            {/* Woven Crosshatch Texture */}
            <line x1="375" y1="450" x2="375" y2="510" stroke="#8C6A10" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="390" y1="450" x2="390" y2="510" stroke="#8C6A10" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="405" y1="450" x2="405" y2="510" stroke="#8C6A10" strokeWidth="0.8" strokeDasharray="3 3" />
            {/* Bag Handle */}
            <path d="M378 450 C378 425, 402 425, 402 450" stroke="#7A5D19" strokeWidth="2" fill="none" />
          </g>
        </g>
      )}

      {/* -------------------------------------------------------------------------
          OUTFIT 6: ÁO BÀ BA NẮNG SỚM (MODERN REMIX)
          ------------------------------------------------------------------------- */}
      {outfitId === 6 && (
        <g id="outfit-6-baba-mustard">
          {/* High-Waisted Wide-Leg Denim Jeans */}
          <g id="wide-denim-jeans">
            <path d="M210 480 L188 900 L248 900 L256 480 Z" fill="#3D5A80" stroke="#1D2D44" strokeWidth="1.2" />
            <path d="M330 480 L352 900 L292 900 L284 480 Z" fill="#3D5A80" stroke="#1D2D44" strokeWidth="1.2" />
            <line x1="198" y1="520" x2="194" y2="898" stroke="#F4A261" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="342" y1="520" x2="346" y2="898" stroke="#F4A261" strokeWidth="0.8" strokeDasharray="3 3" />
          </g>

          {/* Crisp White Athletic Sneakers */}
          <g id="white-athletic-sneakers">
            <rect x="180" y="898" width="70" height="20" rx="6" fill="#FFFFFF" stroke="#2B2D42" strokeWidth="1.4" />
            <path d="M190 898 C185 878, 205 868, 225 868 C240 868, 245 885, 245 898 Z" fill="#F4F5F7" stroke="#2B2D42" strokeWidth="1.2" />
            <rect x="290" y="898" width="70" height="20" rx="6" fill="#FFFFFF" stroke="#2B2D42" strokeWidth="1.4" />
            <path d="M295 898 C295 885, 300 868, 315 868 C335 868, 355 878, 350 898 Z" fill="#F4F5F7" stroke="#2B2D42" strokeWidth="1.2" />
          </g>

          {/* Sleeves */}
          <path d="M205 218 C188 260, 172 345, 166 385 C160 425, 154 480, 156 512 L168 512 C172 480, 176 425, 182 385 C188 345, 204 275, 215 238 Z" fill="url(#silkMustardGrad)" stroke="#7A4E00" strokeWidth="1.2" />
          <path d="M335 218 C352 260, 368 345, 374 385 C380 425, 386 480, 384 512 L372 512 C368 480, 364 425, 358 385 C352 345, 336 275, 325 238 Z" fill="url(#silkMustardGrad)" stroke="#7A4E00" strokeWidth="1.2" />

          {/* Mustard Yellow Silk Blouse */}
          <path
            d="M246 195 L208 225 C202 280, 204 380, 202 490 C244 498, 296 498, 338 490 C336 380, 338 280, 332 225 L294 195 C270 210, 270 210, 246 195 Z"
            fill="url(#silkMustardGrad)"
            stroke="#7A4E00"
            strokeWidth="1.3"
          />

          {/* Center Buttons & Pockets */}
          <line x1="270" y1="208" x2="270" y2="492" stroke="#7A4E00" strokeWidth="1.5" />
          {[222, 258, 296, 334, 372, 410, 448].map((y, i) => (
            <circle key={i} cx="270" cy={y} r="3" fill="#FFFFFF" stroke="#888888" strokeWidth="0.8" />
          ))}
          <rect x="220" y="420" width="34" height="42" rx="4" fill="#EE9B00" stroke="#7A4E00" strokeWidth="1.2" />
          <rect x="286" y="420" width="34" height="42" rx="4" fill="#EE9B00" stroke="#7A4E00" strokeWidth="1.2" />

          {/* Silver Oval Y2K Sunglasses */}
          <g id="sunglasses-outfit6">
            <ellipse cx="252" cy="118" rx="14" ry="8" fill="#18181B" stroke="#E2E8F0" strokeWidth="1.8" />
            <ellipse cx="288" cy="118" rx="14" ry="8" fill="#18181B" stroke="#E2E8F0" strokeWidth="1.8" />
            <line x1="266" y1="117" x2="274" y2="117" stroke="#E2E8F0" strokeWidth="2" />
          </g>

          {/* Modern Canvas Tote Bag */}
          <g id="modern-tote">
            <rect x="365" y="440" width="55" height="70" rx="4" fill="#F4EAD4" stroke="#9C6644" strokeWidth="1.2" />
            <path d="M380 440 C380 415, 405 415, 405 440" stroke="#9C6644" strokeWidth="2.2" fill="none" />
            <text x="392" y="475" fontSize="7" fontWeight="bold" fontFamily="sans-serif" fill="#264653" textAnchor="middle">
              TẾT '26
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};
