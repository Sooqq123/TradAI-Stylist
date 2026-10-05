/**
 * BottomSVG Component - Minh Họa Các Loại Quần Đạt Chuẩn Thời Trang Vector 2D
 * Tái tạo 100% phom dáng và chất liệu lụa rủ tự nhiên của Ảnh Số 2:
 * 1. Quần Lụa Trắng / Đen Dáng Suông Ống Rộng (Palazzo Silk Pants):
 *    - Thân trên suôn mượt, không còn các đường sọc kẻ cứng như nan quạt.
 *    - Gấu quần lượn sóng mềm mại với các nếp gập 3D (lớp nếp trước lồi, lớp nếp sau chìm có đổ bóng xám bạc).
 *    - Dải đổ bóng nếp gấp chỉ chạy nhẹ từ chân gấu lên bắp chân (Y=540-595), tạo độ rủ mềm óng ả của tơ tằm.
 * 2. Quần Jeans Ống Suông Y2K: Cạp cao, ống đứng phóng khoáng, đường chỉ may đôi vàng kim.
 * 3. Quần Short Jeans Rách Gấu: Dáng ôm sờn gấu cá tính.
 * 4. Quần Tây Xếp Ly Minimal: Đường ly sắc nét, thanh lịch.
 * Coordinate system: viewBox="0 0 400 640".
 */

import React from 'react';

interface BottomSVGProps {
  id?: string;
  colorHex?: string;
}

export const BottomSVG: React.FC<BottomSVGProps> = ({
  id = 'bottom_silk_01',
  colorHex,
}) => {
  const darkOutline = '#1A1822';
  const denimStitch = '#E9C46A';

  // 1. Quần Short Jeans Rách Gấu
  if (id === 'bottom_short_ripped') {
    const denimColor = colorHex || '#5B7083';
    return (
      <g className="bottom-short-ripped">
        {/* Short Jeans Body */}
        <path
          d="M174 256 
             L226 256 
             C234 276, 235 298, 233 318 
             L206 322 
             L200 300 
             L194 322 
             L167 318 
             C165 298, 166 276, 174 256 
             Z"
          fill={denimColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Waistband & Belt Loops */}
        <line x1="174" y1="266" x2="226" y2="266" stroke={darkOutline} strokeWidth="1" />
        <circle cx="200" cy="261" r="2.2" fill="#D4AF37" stroke="#7F5539" strokeWidth="0.8" />
        <path d="M200 266 L200 292 Q204 296 206 300" stroke={darkOutline} strokeWidth="1.2" fill="none" />

        {/* Distressed Frayed Hem (Gấu tưa sợi denim cá tính) */}
        <path
          d="M167 318 L170 323 L173 317 L177 324 L181 318 L185 324 L189 318 L194 322"
          stroke="#E9ECEF"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M206 322 L211 324 L215 318 L219 324 L223 318 L227 324 L230 317 L233 318"
          stroke="#E9ECEF"
          strokeWidth="1.2"
          fill="none"
        />
      </g>
    );
  }

  // 2. Quần Jeans Ống Suông Y2K
  if (id === 'bottom_jeans_01') {
    const denimColor = colorHex || '#3A6073';
    return (
      <g className="bottom-jeans">
        {/* Left Leg */}
        <path
          d="M174 256 
             L200 256 
             L200 320 
             L196 594 
             L144 594 
             C152 460, 160 360, 168 300 
             Z"
          fill={denimColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Right Leg */}
        <path
          d="M200 256 
             L226 256 
             C232 300, 240 360, 248 460 
             L256 594 
             L204 594 
             L200 320 
             Z"
          fill={denimColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Waistband & Fly */}
        <line x1="174" y1="266" x2="226" y2="266" stroke={denimStitch} strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="200" cy="261" r="2.2" fill="#D4AF37" stroke="#7F5539" strokeWidth="0.8" />
        <path d="M200 266 L200 292 Q204 296 206 300" stroke={denimStitch} strokeWidth="1.1" fill="none" strokeDasharray="3 2" />

        {/* Side Jean Seams */}
        <path d="M168 300 L144 594" stroke={denimStitch} strokeWidth="1" fill="none" strokeDasharray="4 2" />
        <path d="M232 300 L256 594" stroke={denimStitch} strokeWidth="1" fill="none" strokeDasharray="4 2" />

        {/* Center Jean Wash Highlights */}
        <path d="M172 320 L168 586" stroke="rgba(255,255,255,0.18)" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M228 320 L232 586" stroke="rgba(255,255,255,0.18)" strokeWidth="8" strokeLinecap="round" fill="none" />

        {/* Cuffs */}
        <line x1="144" y1="588" x2="196" y2="588" stroke={denimStitch} strokeWidth="1.2" />
        <line x1="204" y1="588" x2="256" y2="588" stroke={denimStitch} strokeWidth="1.2" />
      </g>
    );
  }

  // 2b. Quần Jean Ống Rộng Baggy Vintage
  if (id === 'bottom_baggy_vintage_jeans') {
    const baggyColor = colorHex || '#5C6B73';
    return (
      <g className="bottom-baggy-jeans">
        {/* Extra Wide Baggy Legs with Drop Crotch & Drape Folds */}
        <path
          d="M172 258 L200 258 L200 340 L194 594 L136 594 C146 450, 154 350, 164 290 Z"
          fill={baggyColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <path
          d="M200 258 L228 258 C236 290, 246 350, 256 450 L264 594 L206 594 L200 340 Z"
          fill={baggyColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Baggy Stacking Creases at Ankles */}
        <path d="M142 560 Q165 572 190 560" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" />
        <path d="M140 575 Q165 586 192 575" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" />
        <path d="M210 560 Q235 572 258 560" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" />
        <path d="M208 575 Q235 586 260 575" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" />
        {/* Contrast stitching */}
        <line x1="172" y1="268" x2="228" y2="268" stroke={denimStitch} strokeWidth="1" strokeDasharray="3 2" />
      </g>
    );
  }

  // 3. Quần Tây May Đo Cạp Cao (Tailored Trousers)
  if (id === 'bottom_trouser_01' || id === 'bottom_tailored_trousers') {
    const trouserColor = colorHex || '#2B2D42';
    return (
      <g className="bottom-trouser">
        <path
          d="M174 254 L200 254 L200 320 L196 594 L146 594 C154 460, 160 360, 168 295 Z"
          fill={trouserColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <path
          d="M200 254 L226 254 C232 295, 240 360, 246 460 L254 594 L204 594 L200 320 Z"
          fill={trouserColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="174" y1="264" x2="226" y2="264" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        {/* Sharp Crease Lines */}
        <line x1="171" y1="266" x2="171" y2="590" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
        <line x1="229" y1="266" x2="229" y2="590" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
      </g>
    );
  }

  // 4. Quần Túi Hộp Techwear & Kaki Cargo
  if (id === 'bottom_parachute_cargo' || id === 'bottom_kaki_multipocket') {
    const cargoColor = colorHex || (id === 'bottom_parachute_cargo' ? '#283618' : '#606C38');
    return (
      <g className="bottom-cargo">
        {/* Loose Techwear Legs with Gathered Cuffs */}
        <path
          d="M172 256 L200 256 L200 325 L190 588 L148 588 C144 480, 150 360, 166 295 Z"
          fill={cargoColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <path
          d="M200 256 L228 256 C234 295, 250 360, 252 480 L210 588 L170 588 L200 325 Z"
          fill={cargoColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* 3D Cargo Side Pockets with Flap */}
        {/* Left Cargo Pocket */}
        <rect x="144" y="380" width="18" height="26" rx="2" fill={cargoColor} stroke={darkOutline} strokeWidth="1.1" />
        <path d="M143 380 L163 380 L163 386 L143 386 Z" fill="rgba(0,0,0,0.25)" stroke={darkOutline} strokeWidth="0.8" />
        {/* Right Cargo Pocket */}
        <rect x="238" y="380" width="18" height="26" rx="2" fill={cargoColor} stroke={darkOutline} strokeWidth="1.1" />
        <path d="M237 380 L257 380 L257 386 L237 386 Z" fill="rgba(0,0,0,0.25)" stroke={darkOutline} strokeWidth="0.8" />
        {/* Parachute Drawstring Toggles at Cuffs */}
        <circle cx="148" cy="588" r="2" fill="#D4AF37" />
        <circle cx="252" cy="588" r="2" fill="#D4AF37" />
      </g>
    );
  }

  // 5. Chân Váy Xếp Ly Dáng Dài (Pleated Maxi Skirt)
  if (id === 'bottom_skirt_pleated_maxi') {
    const skirtColor = colorHex || '#E9D8A6';
    return (
      <g className="bottom-skirt-pleated">
        <path
          d="M174 256 L226 256 L258 535 C226 542, 174 542, 142 535 Z"
          fill={skirtColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Fine Pleat Lines */}
        {[155, 168, 180, 192, 200, 208, 220, 232, 245].map((x, i) => (
          <path
            key={i}
            d={`M${174 + (i * (226 - 174)) / 8} 258 L${x} 538`}
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="0.9"
            fill="none"
          />
        ))}
      </g>
    );
  }

  // 6. Chân Váy Chữ A Kaki Cargo Lửng
  if (id === 'bottom_skirt_cargo_a_line') {
    const skirtColor = colorHex || '#4A5759';
    return (
      <g className="bottom-skirt-cargo">
        <path
          d="M174 256 L226 256 L248 420 L152 420 Z"
          fill={skirtColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Metal Grommet Belt */}
        <line x1="174" y1="268" x2="226" y2="268" stroke="#ADB5BD" strokeWidth="2.5" />
        <circle cx="200" cy="268" r="2.5" fill="#212529" stroke="#E0E1DD" strokeWidth="1" />
        {/* Front Cargo Pockets */}
        <rect x="162" y="320" width="16" height="22" rx="2" fill={skirtColor} stroke={darkOutline} strokeWidth="1" />
        <rect x="222" y="320" width="16" height="22" rx="2" fill={skirtColor} stroke={darkOutline} strokeWidth="1" />
      </g>
    );
  }

  // 7. Chân Váy Bồng Balloon Skirt Thời Thượng
  if (id === 'bottom_skirt_balloon_bubble') {
    const balloonColor = colorHex || '#F7EDE2';
    return (
      <g className="bottom-skirt-balloon">
        {/* Puffed Bubble Hem Shape (Độ phồng ngang hông giới hạn chuẩn từ X=160 đến X=240, không che cánh tay) */}
        <path
          d="M176 256 L224 256 
             C234 290, 240 330, 240 375 
             C240 405, 236 424, 230 430 
             C216 438, 184 438, 170 430 
             C164 424, 160 405, 160 375 
             C160 330, 166 290, 176 256 Z"
          fill={balloonColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Waist Gather Pleats (Nếp nhún xếp ly nhẹ quanh cạp váy) */}
        <path d="M184 258 Q182 278 180 300" stroke={darkOutline} strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M200 258 L200 305" stroke={darkOutline} strokeWidth="0.8" fill="none" opacity="0.25" />
        <path d="M216 258 Q218 278 220 300" stroke={darkOutline} strokeWidth="0.8" fill="none" opacity="0.3" />

        {/* Bubble Hem Volume Highlight (Độ căng mọng bề mặt bóng) */}
        <ellipse cx="200" cy="370" rx="24" ry="14" fill="rgba(255,255,255,0.18)" />

        {/* Inner shadow tucked bubble fold (Nếp gấp phồng lộn ngược vào trong đặc trưng của balloon skirt) */}
        <path
          d="M170 430 C182 437, 218 437, 230 430 C222 434, 178 434, 170 430 Z"
          fill="rgba(0,0,0,0.18)"
        />
      </g>
    );
  }

  // ================= 4. QUẦN LỤA ỐNG RỘNG (PALAZZO SILK PANTS) =================
  // Tái hiện 100% chuẩn mực Ảnh Số 2: Lụa rủ sóng tự nhiên, nếp 3D mềm mại, không kẻ sọc thẳng
  const isBlackSilk = id === 'bottom_silk_02';
  const silkColor = colorHex || (isBlackSilk ? '#181A20' : '#FFFFFF');
  const backPleatColor = isBlackSilk ? '#0D0E12' : '#D6DDE4';
  const foldShadowColor = isBlackSilk ? 'rgba(0, 0, 0, 0.45)' : 'rgba(180, 195, 208, 0.65)';
  const foldHighlightColor = isBlackSilk ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)';

  return (
    <g className="bottom-silk-pants">
      {/* 1. Recessed Back Pleats (Lớp nếp lụa chìm phía sau - tạo chiều sâu 3D ở chân gấu) */}
      {/* Left Back Folds */}
      <path d="M148 590 Q152 584 156 590 Z" fill={backPleatColor} stroke={darkOutline} strokeWidth="0.8" />
      <path d="M172 590 Q176 584 180 590 Z" fill={backPleatColor} stroke={darkOutline} strokeWidth="0.8" />
      {/* Right Back Folds */}
      <path d="M220 590 Q224 584 228 590 Z" fill={backPleatColor} stroke={darkOutline} strokeWidth="0.8" />
      <path d="M244 590 Q248 584 252 590 Z" fill={backPleatColor} stroke={darkOutline} strokeWidth="0.8" />

      {/* 2. Main Flowing Silk Palazzo Pants Body (Thân quần lụa suông rủ tự nhiên) */}
      {/* Left Leg */}
      <path
        d="M174 256 
           L200 256 
           L200 325 
           L198 540 
           L198 592 
           C192 597, 182 597, 176 592 
           C174 590, 170 590, 168 592 
           C162 597, 152 597, 146 592 
           C144 590, 140 590, 138 592 
           C132 597, 124 595, 122 590 
           L122 540 
           C132 450, 148 360, 168 295 
           Z"
        fill={silkColor}
        stroke={darkOutline}
        strokeWidth="1.2"
      />

      {/* Right Leg */}
      <path
        d="M200 256 
           L226 256 
           C232 295, 252 360, 268 450 
           L278 540 
           L278 590 
           C276 595, 268 597, 262 592 
           C260 590, 256 590, 254 592 
           C248 597, 238 597, 232 592 
           C230 590, 226 590, 224 592 
           C218 597, 208 597, 202 592 
           L202 540 
           L200 325 
           Z"
        fill={silkColor}
        stroke={darkOutline}
        strokeWidth="1.2"
      />

      {/* 3. Soft Flowing Silk Drape Shadows (Chỉ loang nhẹ ở vùng gấu chân, không kẻ sọc lên eo) */}
      {/* Left Leg Folds */}
      <path d="M144 590 C146 565, 150 540, 152 525" stroke={foldShadowColor} strokeWidth="1.3" fill="none" />
      <path d="M145 590 C147 565, 151 540, 153 525" stroke={foldHighlightColor} strokeWidth="0.8" fill="none" />

      <path d="M168 590 C169 565, 172 540, 173 525" stroke={foldShadowColor} strokeWidth="1.3" fill="none" />
      <path d="M169 590 C170 565, 173 540, 174 525" stroke={foldHighlightColor} strokeWidth="0.8" fill="none" />

      {/* Right Leg Folds */}
      <path d="M232 590 C231 565, 228 540, 227 525" stroke={foldShadowColor} strokeWidth="1.3" fill="none" />
      <path d="M231 590 C230 565, 227 540, 226 525" stroke={foldHighlightColor} strokeWidth="0.8" fill="none" />

      <path d="M256 590 C254 565, 250 540, 248 525" stroke={foldShadowColor} strokeWidth="1.3" fill="none" />
      <path d="M255 590 C253 565, 249 540, 247 525" stroke={foldHighlightColor} strokeWidth="0.8" fill="none" />

      {/* Center Inseam Divide */}
      <line x1="200" y1="325" x2="200" y2="590" stroke={darkOutline} strokeWidth="1.2" />
    </g>
  );
};
