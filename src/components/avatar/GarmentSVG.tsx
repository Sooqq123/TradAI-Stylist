/**
 * GarmentSVG Component - Trang Phục Chính Vector 2D Chuẩn Mực Cao Cấp (Haute Couture)
 * Chuẩn hóa 6 dòng cổ phục di sản chính thống + các thiết kế áo Remix hiện đại:
 * 1. Áo Dài Truyền Thống Nữ (Tà dài buông rủ, tay raglan ôm, cổ lập lĩnh, xẻ tà cao chạm eo)
 * 2. Áo Ngũ Thân Tay Chẽn (Nam phom đứng đĩnh đạc; Nữ chữ A thanh thoát; vạt đè 5 khuy)
 * 3. Áo Nhật Bình Cung Đình (Cổ chữ nhật đối khâm, dải ngũ sắc trước ngực và cổ tay)
 * 4. Áo Giao Lĩnh Cổ Chéo (Cổ chữ V vạt chéo giao nhau, thắt đai lụa buông rủ)
 * 5. Áo Tứ Thân Kinh Bắc (4 vạt áo - 2 vạt trước buộc chéo, áo yếm đào bên trong, thắt lưng lụa)
 * 6. Áo Bà Ba Nam Bộ (Dáng ngắn ngang hông, cổ lá sen, 6 cúc xà cừ, 2 túi đắp bo góc)
 * 7. Áo Remix Hiện Đại (Hoodie zip boxy, Blazer cropped, Corset satin siết eo, Minimalist top)
 * Coordinate system: viewBox="0 0 400 640".
 */

import React from 'react';
import { GarmentType, Gender } from '../../types';

interface GarmentSVGProps {
  garmentType?: GarmentType;
  type?: GarmentType;
  colorHex?: string;
  mode?: 'avatar' | 'thumbnail';
  isStandalone?: boolean;
  gender?: Gender | string;
  itemId?: string;
}

export const GarmentSVG: React.FC<GarmentSVGProps> = ({
  garmentType,
  type,
  colorHex = '#C5222E',
  mode = 'avatar',
  isStandalone = false,
  gender,
  itemId,
}) => {
  const activeType = garmentType || type || 'ao_dai';
  const isThumb = mode === 'thumbnail' || isStandalone;
  const rawId = React.useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const silkGradId = `silk-grad-${safeId}`;
  const goldGradId = `gold-grad-${safeId}`;
  const pearlGradId = `pearl-grad-${safeId}`;

  // Darker shade for outlines and seam creases
  const darkOutline = '#1A1822';
  const deepShadowStroke = 'rgba(0,0,0,0.25)';
  const highlightStroke = 'rgba(255,255,255,0.25)';

  // ===================== 1. ÁO DÀI TRUYỀN THỐNG =====================
  if (activeType === 'ao_dai' || (!activeType && !isThumb)) {
    return (
      <g className="garment-aodai">
        <defs>
          <linearGradient id={silkGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="85%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
          </linearGradient>
        </defs>

        {/* 1. Back Flap */}
        <path
          d="M174 260 
             L140 542 
             C174 545, 226 545, 260 542 
             L226 260 
             Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <path
          d="M174 260 L140 542 C174 545, 226 545, 260 542 L226 260 Z"
          fill="rgba(0,0,0,0.28)"
        />

        {/* 2. Fitted Raglan Sleeves */}
        {/* Left Sleeve */}
        <g className="aodai-sleeve-left">
          <path
            d="M189 168 
               C168 172, 152 176, 148 180 
               C142 205, 142 235, 144 265 
               C145 295, 146 320, 148 338 
               L158 338 
               C156 320, 154 295, 153 265 
               C152 238, 154 222, 156 218 
               Z"
            fill={colorHex}
            stroke={darkOutline}
            strokeWidth="1.2"
          />
          <path
            d="M153 265 C152 238, 154 222, 156 218 L148 180 C146 195, 145 210, 145 225 L146 265 Z"
            fill="rgba(0,0,0,0.12)"
          />
          <path d="M144 262 Q149 265 153 263" stroke={deepShadowStroke} strokeWidth="0.9" fill="none" />
          <path d="M146 332 Q151 334 156 333" stroke={deepShadowStroke} strokeWidth="0.8" fill="none" />
          <line x1="148" y1="338" x2="158" y2="338" stroke={darkOutline} strokeWidth="1.2" />
        </g>

        {/* Right Sleeve */}
        <g className="aodai-sleeve-right">
          <path
            d="M211 168 
               C232 172, 248 176, 252 180 
               C258 205, 258 235, 256 265 
               C255 295, 254 320, 252 338 
               L242 338 
               C244 320, 246 295, 247 265 
               C248 238, 246 222, 244 218 
               Z"
            fill={colorHex}
            stroke={darkOutline}
            strokeWidth="1.2"
          />
          <path
            d="M247 265 C248 238, 246 222, 244 218 L252 180 C254 195, 255 210, 255 225 L254 265 Z"
            fill="rgba(0,0,0,0.12)"
          />
          <path d="M256 262 Q251 265 247 263" stroke={deepShadowStroke} strokeWidth="0.9" fill="none" />
          <path d="M254 332 Q249 334 244 333" stroke={deepShadowStroke} strokeWidth="0.8" fill="none" />
          <line x1="242" y1="338" x2="252" y2="338" stroke={darkOutline} strokeWidth="1.2" />
        </g>

        {/* 3. Front Bodice & Front Flap */}
        <g className="aodai-front-bodice">
          <path
            d="M189 168 
               L189 154 
               C193 152, 207 152, 211 154 
               L211 168 
               L244 218 
               C240 230, 234 245, 226 260 
               L234 315 
               L244 430 
               L254 538 
               C224 541, 176 541, 146 538 
               L156 430 
               L166 315 
               L174 260 
               C166 245, 160 230, 156 218 
               Z"
            fill={colorHex}
            stroke={darkOutline}
            strokeWidth="1.2"
          />

          <path
            d="M189 168 L189 154 C193 152, 207 152, 211 154 L211 168 L244 218 C240 230, 234 245, 226 260 L234 315 L244 430 L254 538 C224 541, 176 541, 146 538 L156 430 L166 315 L174 260 C166 245, 160 230, 156 218 Z"
            fill={`url(#${silkGradId})`}
          />

          {/* Raglan Diagonal Seams */}
          <path d="M189 168 C175 172, 162 192, 156 218" stroke={darkOutline} strokeWidth="1.1" fill="none" />
          <path d="M211 168 C225 172, 238 192, 244 218" stroke={darkOutline} strokeWidth="1.1" fill="none" />

          {/* Waist Darts & Bust Curves */}
          <path d="M178 206 C176 230, 177 252, 174 262" stroke={darkOutline} strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M222 206 C224 230, 223 252, 226 262" stroke={darkOutline} strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M178 214 Q200 220 222 214" stroke={deepShadowStroke} strokeWidth="0.8" fill="none" />

          {/* Flowing Silk Drape Creases on Front Flap */}
          <path d="M178 275 C176 345, 172 445, 170 536" stroke={deepShadowStroke} strokeWidth="1" fill="none" />
          <path d="M200 275 C200 350, 200 450, 200 537" stroke={highlightStroke} strokeWidth="0.9" fill="none" />
          <path d="M222 275 C224 345, 228 445, 230 536" stroke={deepShadowStroke} strokeWidth="1" fill="none" />

          {/* High Side Slit Outlines */}
          <path d="M174 260 L166 315 L156 430 L146 538" stroke={darkOutline} strokeWidth="1.2" fill="none" />
          <path d="M226 260 L234 315 L244 430 L254 538" stroke={darkOutline} strokeWidth="1.2" fill="none" />

          {/* Mandarin Collar */}
          <path
            d="M189 168 
               C193 171, 207 171, 211 168 
               L211 154 
               C207 152, 193 152, 189 154 
               Z"
            fill={colorHex}
            stroke={darkOutline}
            strokeWidth="1.2"
          />
          <line x1="200" y1="153" x2="200" y2="169" stroke={darkOutline} strokeWidth="1.1" />
          <path d="M190 156 C194 154, 206 154, 210 156" stroke={highlightStroke} strokeWidth="0.7" fill="none" />
        </g>
      </g>
    );
  }

  // ===================== 2. ÁO NHẬT BÌNH CUNG ĐÌNH =====================
  if (activeType === 'nhat_binh') {
    return (
      <g className="garment-nhatbinh">
        {/* Back Flap */}
        <path
          d="M172 260 L138 540 C174 544, 226 544, 262 540 L228 260 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <path
          d="M172 260 L138 540 C174 544, 226 544, 262 540 L228 260 Z"
          fill="rgba(0,0,0,0.24)"
        />

        {/* Wide Royal Sleeves with Five-color Bands (Tay Thụng Cung Đình Viền Ngũ Sắc) */}
        {/* Left Sleeve */}
        <path
          d="M188 166 
             C165 170, 142 176, 136 182 
             C128 220, 126 268, 130 338 
             L162 338 
             C158 285, 156 245, 156 218 
             Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Dải ngũ sắc cổ tay trái */}
        <path d="M130 326 L162 326 L162 329 L130 329 Z" fill="#E63946" />
        <path d="M130 329 L162 329 L162 332 L130 332 Z" fill="#FFD166" />
        <path d="M130 332 L162 332 L162 335 L130 335 Z" fill="#06D6A0" />
        <path d="M130 335 L162 335 L162 338 L130 338 Z" fill="#118AB2" />
        <line x1="130" y1="338" x2="162" y2="338" stroke={darkOutline} strokeWidth="1.2" />

        {/* Right Sleeve */}
        <path
          d="M212 166 
             C235 170, 258 176, 264 182 
             C272 220, 274 268, 270 338 
             L238 338 
             C242 285, 244 245, 244 218 
             Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Dải ngũ sắc cổ tay phải */}
        <path d="M238 326 L270 326 L270 329 L238 329 Z" fill="#E63946" />
        <path d="M238 329 L270 329 L270 332 L238 332 Z" fill="#FFD166" />
        <path d="M238 332 L270 332 L270 335 L238 335 Z" fill="#06D6A0" />
        <path d="M238 335 L270 335 L270 338 L238 338 Z" fill="#118AB2" />
        <line x1="238" y1="338" x2="270" y2="338" stroke={darkOutline} strokeWidth="1.2" />

        {/* Main Bodice */}
        <path
          d="M188 166 
             L188 154 
             C192 152, 208 152, 212 154 
             L212 166 
             L244 218 
             C238 234, 234 250, 230 266 
             L238 330 
             L248 430 
             L256 538 
             C224 541, 176 541, 144 538 
             L152 430 
             L162 330 
             L170 266 
             C166 250, 162 234, 156 218 
             Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Inner white under-collar */}
        <path d="M192 154 C196 151, 204 151, 208 154 L208 159 C204 157, 196 157, 192 159 Z" fill="#FFFFFF" stroke={darkOutline} strokeWidth="0.8" />

        {/* Cổ Áo Chữ Nhật Đối Khâm & Dải Ngũ Sắc Trước Ngực (Rectangular Collar) */}
        <path
          d="M184 154 
             L216 154 
             L216 235 
             L205 235 
             L205 538 
             L195 538 
             L195 235 
             L184 235 
             Z"
          fill="#D4AF37"
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Dải ngũ sắc dọc cổ */}
        <line x1="187" y1="156" x2="187" y2="233" stroke="#E63946" strokeWidth="1.8" />
        <line x1="213" y1="156" x2="213" y2="233" stroke="#E63946" strokeWidth="1.8" />
        <line x1="189.5" y1="156" x2="189.5" y2="233" stroke="#FFD166" strokeWidth="1.8" />
        <line x1="210.5" y1="156" x2="210.5" y2="233" stroke="#FFD166" strokeWidth="1.8" />
        <line x1="192" y1="156" x2="192" y2="233" stroke="#06D6A0" strokeWidth="1.8" />
        <line x1="208" y1="156" x2="208" y2="233" stroke="#06D6A0" strokeWidth="1.8" />
        <line x1="194.5" y1="156" x2="194.5" y2="233" stroke="#118AB2" strokeWidth="1.8" />
        <line x1="205.5" y1="156" x2="205.5" y2="233" stroke="#118AB2" strokeWidth="1.8" />

        {/* Center Split of Đối Khâm */}
        <line x1="200" y1="168" x2="200" y2="538" stroke={darkOutline} strokeWidth="1.3" />

        {/* Royal Jade Clasp */}
        <circle cx="200" cy="180" r="3.2" fill="#06D6A0" stroke="#FFD166" strokeWidth="1" />
        <circle cx="200" cy="225" r="3.2" fill="#06D6A0" stroke="#FFD166" strokeWidth="1" />

        {/* Drape lines */}
        <path d="M174 266 L168 536" stroke={deepShadowStroke} strokeWidth="0.9" fill="none" />
        <path d="M226 266 L232 536" stroke={deepShadowStroke} strokeWidth="0.9" fill="none" />
      </g>
    );
  }

  // ===================== 3. ÁO GIAO LĨNH CỔ CHÉO =====================
  if (activeType === 'giao_linh') {
    return (
      <g className="garment-giaolinh">
        {/* Back Flap */}
        <path
          d="M174 260 L140 540 C176 544, 224 544, 260 540 L226 260 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <path
          d="M174 260 L140 540 C176 544, 224 544, 260 540 L226 260 Z"
          fill="rgba(0,0,0,0.22)"
        />

        {/* Wide Flowing Sleeves (Tay Thụng Rộng Phong Lưu Đại Việt) */}
        {/* Left Sleeve */}
        <path
          d="M188 166 
             C165 170, 144 176, 138 182 
             C128 220, 126 270, 132 340 
             L160 340 
             C156 288, 156 245, 156 218 
             Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="132" y1="340" x2="160" y2="340" stroke={darkOutline} strokeWidth="1.2" />

        {/* Right Sleeve */}
        <path
          d="M212 166 
             C235 170, 256 176, 262 182 
             C272 220, 274 270, 268 340 
             L240 340 
             C244 288, 244 245, 244 218 
             Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="240" y1="340" x2="268" y2="340" stroke={darkOutline} strokeWidth="1.2" />

        {/* Main Body */}
        <path
          d="M188 166 
             L188 154 
             C192 152, 208 152, 212 154 
             L212 166 
             L244 218 
             C238 234, 234 250, 230 262 
             L238 330 
             L248 430 
             L256 538 
             C224 541, 176 541, 144 538 
             L152 430 
             L162 330 
             L170 262 
             C166 250, 162 234, 156 218 
             Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Underlap: Vạt phải đi chéo sang sườn trái */}
        <path
          d="M212 166 L174 260"
          stroke={darkOutline}
          strokeWidth="1.2"
          strokeDasharray="2,2"
          fill="none"
        />

        {/* Overlap: Vạt Trái đè chéo sang sườn phải (Đặc trưng Cổ Chéo Giao Lĩnh) */}
        <path
          d="M188 166 
             C194 176, 206 200, 226 260 
             L234 320 
             L244 430 
             L254 538"
          stroke={darkOutline}
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M186 164 C192 174, 204 198, 224 258"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Silk Waist Sash (Dải Thắt Lưng Lụa Ngang Eo & Nơ Buông Rủ) */}
        <rect x="170" y="256" width="60" height="12" rx="3" fill="#2B2D42" stroke={darkOutline} strokeWidth="1.1" />
        <rect x="171" y="258" width="58" height="8" rx="2" fill="#D90429" opacity="0.85" />
        <circle cx="200" cy="262" r="4.5" fill="#EF233C" stroke={darkOutline} strokeWidth="1" />
        {/* Hanging Ribbons */}
        <path
          d="M198 266 C196 280, 192 310, 190 350 L196 350 C198 310, 201 280, 202 266 Z"
          fill="#D90429"
          stroke={darkOutline}
          strokeWidth="0.9"
        />
        <path
          d="M202 266 C204 282, 208 312, 212 345 L206 345 C202 312, 199 282, 198 266 Z"
          fill="#EF233C"
          stroke={darkOutline}
          strokeWidth="0.9"
        />
      </g>
    );
  }

  // ===================== 4. ÁO TỨ THÂN KINH BẮC =====================
  if (activeType === 'tu_than') {
    return (
      <g className="garment-tuthan">
        {/* Back Flaps (Hai Vạt Sau May Liền Sống Lưng) */}
        <path
          d="M174 260 L140 538 C176 542, 224 542, 260 538 L226 260 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="200" y1="260" x2="200" y2="540" stroke={darkOutline} strokeWidth="1.2" />

        {/* Sleeves */}
        {/* Left Sleeve */}
        <path
          d="M189 168 C168 172, 152 176, 148 180 C142 205, 142 235, 144 265 C145 295, 146 320, 148 338 L158 338 C156 320, 154 295, 153 265 C152 238, 154 222, 156 218 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="148" y1="338" x2="158" y2="338" stroke={darkOutline} strokeWidth="1.2" />

        {/* Right Sleeve */}
        <path
          d="M211 168 C232 172, 248 176, 252 180 C258 205, 258 235, 256 265 C255 295, 254 320, 252 338 L242 338 C244 320, 246 295, 247 265 C248 238, 246 222, 244 218 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="242" y1="338" x2="252" y2="338" stroke={darkOutline} strokeWidth="1.2" />

        {/* Áo Yếm Đào Bên Trong (Peach Pink Camisole Underneath) */}
        <path
          d="M192 168 
             C192 182, 208 182, 208 168 
             L218 214 
             C214 235, 210 252, 208 260 
             L192 260 
             C190 252, 186 235, 182 214 
             Z"
          fill="#FF758F"
          stroke={darkOutline}
          strokeWidth="1.1"
        />
        {/* Yếm Cổ Viền Trắng */}
        <path d="M192 168 C196 172, 204 172, 208 168" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
        <path d="M192 168 C196 172, 204 172, 208 168" stroke={darkOutline} strokeWidth="0.8" fill="none" />

        {/* Hai Vạt Áo Trước Mở Buông & Buộc Vạt Ngang Bụng */}
        {/* Left Front Flap */}
        <path
          d="M188 166 
             L156 218 
             C162 234, 166 248, 172 262 
             L195 272 
             L170 262 
             L164 320 
             L152 430 
             L144 538 
             C158 540, 180 540, 196 538 
             L190 400 
             L196 272 
             Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Right Front Flap */}
        <path
          d="M212 166 
             L244 218 
             C238 234, 234 248, 228 262 
             L205 272 
             L230 262 
             L236 320 
             L248 430 
             L256 538 
             C242 540, 220 540, 204 538 
             L210 400 
             L204 272 
             Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Nút Thắt Vạt Áo Tứ Thân & Dải Thắt Lưng Lụa Lá Mạ */}
        <rect x="176" y="258" width="48" height="10" rx="3" fill="#06D6A0" stroke={darkOutline} strokeWidth="1" />
        <ellipse cx="200" cy="270" rx="7" ry="5.5" fill={colorHex} stroke={darkOutline} strokeWidth="1.2" />
        <circle cx="200" cy="270" r="2.5" fill="#06D6A0" stroke={darkOutline} strokeWidth="0.8" />

        {/* Dải thắt lưng xanh rủ xuống */}
        <path
          d="M197 274 C195 290, 192 320, 189 360 L195 360 C198 320, 200 290, 201 274 Z"
          fill="#06D6A0"
          stroke={darkOutline}
          strokeWidth="0.8"
        />
        <path
          d="M201 274 C203 292, 207 322, 210 355 L205 355 C201 322, 198 292, 197 274 Z"
          fill="#38B000"
          stroke={darkOutline}
          strokeWidth="0.8"
        />
      </g>
    );
  }

  // ===================== 5. ÁO NGŨ THÂN TAY CHẼN (NAM & NỮ) =====================
  if (activeType === 'ngu_than') {
    const isNam = gender === 'nam' || itemId?.includes('nam') || activeType === ('ngu_than_nam' as any);

    return (
      <g className={`garment-nguthan ${isNam ? 'nguthan-nam' : 'nguthan-nu'}`}>
        <defs>
          <radialGradient id={goldGradId} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF4A3" />
            <stop offset="40%" stopColor="#E2B744" />
            <stop offset="85%" stopColor="#9E7318" />
            <stop offset="100%" stopColor="#604207" />
          </radialGradient>
        </defs>

        {/* Back Silhouette */}
        <path
          d={
            isNam
              ? 'M170 260 L142 472 C174 476, 226 476, 258 472 L230 260 Z'
              : 'M174 260 L146 470 C176 474, 224 474, 254 470 L226 260 Z'
          }
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <path
          d={
            isNam
              ? 'M170 260 L142 472 C174 476, 226 476, 258 472 L230 260 Z'
              : 'M174 260 L146 470 C176 474, 224 474, 254 470 L226 260 Z'
          }
          fill="rgba(0,0,0,0.22)"
        />

        {/* Snug Sleeves (Tay Chẽn Thẳng Nho Nhã) */}
        {/* Left Sleeve */}
        <path
          d={
            isNam
              ? 'M188 168 C164 170, 146 174, 142 178 C138 205, 138 235, 140 265 C142 295, 144 320, 146 338 L158 338 C156 320, 154 295, 152 265 C150 238, 152 222, 154 218 Z'
              : 'M189 168 C168 172, 152 176, 148 180 C142 205, 142 235, 144 265 C145 295, 146 320, 148 338 L158 338 C156 320, 154 295, 153 265 C152 238, 154 222, 156 218 Z'
          }
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1={isNam ? '146' : '148'} y1="338" x2="158" y2="338" stroke={darkOutline} strokeWidth="1.2" />

        {/* Right Sleeve */}
        <path
          d={
            isNam
              ? 'M212 168 C236 170, 254 174, 258 178 C262 205, 262 235, 260 265 C258 295, 256 320, 254 338 L242 338 C244 320, 246 295, 248 265 C250 238, 248 222, 246 218 Z'
              : 'M211 168 C232 172, 248 176, 252 180 C258 205, 258 235, 256 265 C255 295, 254 320, 252 338 L242 338 C244 320, 246 295, 247 265 C248 238, 246 222, 244 218 Z'
          }
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="242" y1="338" x2={isNam ? '254' : '252'} y2="338" stroke={darkOutline} strokeWidth="1.2" />

        {/* Main Body (Dáng Chữ A Đoan Trang Dài Ngang Đùi Y=470) */}
        <path
          d={
            isNam
              ? 'M188 168 L188 153 C192 151, 208 151, 212 153 L212 168 L248 218 C244 232, 240 248, 238 265 L242 320 L250 400 L258 472 C226 476, 174 476, 142 472 L150 400 L158 320 L162 265 C160 248, 156 232, 152 218 Z'
              : 'M189 168 L189 154 C193 152, 207 152, 211 154 L211 168 L244 218 C240 232, 236 248, 234 265 L238 320 L248 400 L254 470 C224 473, 176 473, 146 470 L152 400 L162 320 L166 265 C164 248, 160 232, 156 218 Z'
          }
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* White Inner Collar Trim (Lập Lĩnh Nội Diên - Hoàng Triều) */}
        <path
          d="M190 154 C194 151, 206 151, 210 154 L210 150 C206 148, 194 148, 190 150 Z"
          fill="#FFFFFF"
          stroke={darkOutline}
          strokeWidth="0.8"
        />

        {/* Outer Standing Collar (Cổ Lập Lĩnh) */}
        <path
          d="M188 168 C192 171, 208 171, 212 168 L212 154 C208 152, 192 152, 188 154 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="200" y1="153" x2="200" y2="169" stroke={darkOutline} strokeWidth="1" />

        {/* Asymmetrical Right-Overlap Flap (Vạt Đè Cài Sang Phải) */}
        <path
          d="M196 156 C204 164, 218 176, 226 198 C234 218, 236 250, 234 280 C232 310, 234 375, 240 469"
          stroke={darkOutline}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M196 156 C204 164, 218 176, 226 198 C234 218, 236 250, 234 280 C232 310, 234 375, 240 469"
          stroke={highlightStroke}
          strokeWidth="0.8"
          fill="none"
        />

        {/* 5 Metallic Gold Buttons (Hệ Ngũ Khuy Vàng Kim) */}
        {[
          { cx: 201, cy: 162 },
          { cx: 218, cy: 184 },
          { cx: 230, cy: 216 },
          { cx: 234, cy: 265 },
          { cx: 234, cy: 315 },
        ].map((btn, idx) => (
          <g key={idx}>
            <circle cx={btn.cx} cy={btn.cy} r="3" fill={`url(#${goldGradId})`} stroke="#4A3105" strokeWidth="0.8" />
            <circle cx={btn.cx - 0.7} cy={btn.cy - 0.7} r="1.1" fill="#FFFBE6" />
          </g>
        ))}

        {/* Drape Creases */}
        <path d="M174 265 L168 467" stroke={deepShadowStroke} strokeWidth="1" fill="none" />
        <path d="M200 265 L200 468" stroke={highlightStroke} strokeWidth="1" fill="none" />
      </g>
    );
  }

  // ===================== 6. ÁO BÀ BA NAM BỘ =====================
  if (activeType === 'ba_ba') {
    return (
      <g className="garment-baba">
        <defs>
          <radialGradient id={pearlGradId} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E2E6EA" />
            <stop offset="100%" stopColor="#ADB5BD" />
          </radialGradient>
        </defs>

        {/* Sleeves */}
        {/* Left Sleeve */}
        <path
          d="M189 168 C168 172, 152 176, 148 180 C142 205, 142 235, 144 265 C145 295, 146 320, 148 338 L158 338 C156 320, 154 295, 153 265 C152 238, 154 222, 156 218 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="148" y1="338" x2="158" y2="338" stroke={darkOutline} strokeWidth="1.2" />

        {/* Right Sleeve */}
        <path
          d="M211 168 C232 172, 248 176, 252 180 C258 205, 258 235, 256 265 C255 295, 254 320, 252 338 L242 338 C244 320, 246 295, 247 265 C248 238, 246 222, 244 218 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="242" y1="338" x2="252" y2="338" stroke={darkOutline} strokeWidth="1.2" />

        {/* Bodice (Thân Áo Ngắn Ngang Hông Y=325) */}
        <path
          d="M188 168 
             C192 178, 208 178, 212 168 
             L244 218 
             C238 234, 232 250, 228 266 
             L234 324 
             C212 328, 188 328, 166 324 
             L172 266 
             C168 250, 162 234, 156 218 
             Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Soft Lotus Leaf Collar (Cổ Lá Sen Mềm) */}
        <path
          d="M188 168 C188 180, 212 180, 212 168 C208 164, 192 164, 188 168 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <path d="M192 170 Q200 178 208 170" stroke={darkOutline} strokeWidth="1" fill="none" />

        {/* Side Slits */}
        <line x1="168" y1="304" x2="166" y2="324" stroke={darkOutline} strokeWidth="1.3" />
        <line x1="232" y1="304" x2="234" y2="324" stroke={darkOutline} strokeWidth="1.3" />

        {/* Center Placket */}
        <line x1="200" y1="178" x2="200" y2="326" stroke={darkOutline} strokeWidth="1.3" />

        {/* 6 Mother-of-Pearl Buttons */}
        {[188, 208, 228, 248, 268, 288].map((cy, idx) => (
          <g key={idx}>
            <circle cx="200" cy={cy} r="2.8" fill={`url(#${pearlGradId})`} stroke="#495057" strokeWidth="0.7" />
            <circle cx="199.3" cy={cy - 0.7} r="1" fill="#FFFFFF" />
          </g>
        ))}

        {/* Two Curved Front Pockets */}
        {/* Left Pocket */}
        <g className="baba-pocket-left">
          <path
            d="M174 280 L193 280 C193 280, 192 304, 190 307 C188 309, 178 309, 176 307 C174 304, 174 280, 174 280 Z"
            fill={colorHex}
            stroke={darkOutline}
            strokeWidth="1.1"
          />
          <line x1="174" y1="284" x2="193" y2="284" stroke={deepShadowStroke} strokeWidth="0.8" />
        </g>

        {/* Right Pocket */}
        <g className="baba-pocket-right">
          <path
            d="M207 280 L226 280 C226 280, 226 304, 224 307 C222 309, 212 309, 210 307 C208 304, 207 280, 207 280 Z"
            fill={colorHex}
            stroke={darkOutline}
            strokeWidth="1.1"
          />
          <line x1="207" y1="284" x2="226" y2="284" stroke={deepShadowStroke} strokeWidth="0.8" />
        </g>
      </g>
    );
  }


  // ===================== 8. ÁO BLAZER CROPPED DÁNG RỘNG =====================
  if (activeType === 'blazer') {
    return (
      <g className="garment-blazer">
        {/* Structured Power Shoulder Sleeves */}
        {/* Left Sleeve */}
        <path
          d="M186 166 L144 174 L142 220 L146 335 L158 335 L156 218 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="146" y1="335" x2="158" y2="335" stroke={darkOutline} strokeWidth="1.2" />

        {/* Right Sleeve */}
        <path
          d="M214 166 L256 174 L258 220 L254 335 L242 335 L244 218 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <line x1="242" y1="335" x2="254" y2="335" stroke={darkOutline} strokeWidth="1.2" />

        {/* Cropped Bodice (Thân Áo Lửng Ngang Rốn Y=318) */}
        <path
          d="M186 166 L214 166 L248 218 L240 318 L160 318 L152 218 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Peaked Lapels (Cổ Ve Nhọn Sang Trọng) */}
        {/* Left Lapel */}
        <path
          d="M186 166 L174 210 L198 250 L198 318 L186 318 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Right Lapel (Overlapping) */}
        <path
          d="M214 166 L226 210 L202 250 L202 318 L214 318 Z"
          fill={colorHex}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Center V-neck Chest Opening */}
        <path d="M192 166 L200 248 L208 166 Z" fill="#1A1822" />

        {/* Double Buttons */}
        <circle cx="204" cy="270" r="3" fill="#E2B744" stroke={darkOutline} strokeWidth="0.8" />
        <circle cx="204" cy="295" r="3" fill="#E2B744" stroke={darkOutline} strokeWidth="0.8" />

        {/* Chest Welt Pocket */}
        <line x1="168" y1="230" x2="182" y2="230" stroke={darkOutline} strokeWidth="1.2" />
      </g>
    );
  }

  // ===================== 9. ÁO YẾM LỤA CÁCH TÂN (MODERN HERITAGE SILK YẾM) =====================
  if (activeType === 'corset') {
    const yemColor = colorHex || '#C5222E';
    const silkTieColor = '#8A151E';

    return (
      <g className="garment-yem-cach-tan">
        {/* Halter Silk Strap / Dây Yếm Lụa Vắt Qua Cổ */}
        <path
          d="M192 152 
             C195 146, 205 146, 208 152 
             L210 176 
             L190 176 
             Z"
          fill={silkTieColor}
          stroke={darkOutline}
          strokeWidth="1.1"
        />
        {/* Halter Silk Knot / Nút thắt dây yếm sau gáy thanh mảnh */}
        <ellipse cx="200" cy="148" rx="4" ry="2.2" fill="#D4AF37" stroke="#7F5539" strokeWidth="0.8" />
        <circle cx="200" cy="148" r="1.2" fill="#FFF275" />

        {/* Main Yếm Bodice (Thân Áo Yếm Lụa Ôm Nhẹ Eo, Vạt Cánh Sen Kín Đáo Y=316) */}
        <path
          d="M190 174 
             C195 172, 205 172, 210 174 
             C214 186, 226 205, 238 224 
             C236 242, 234 256, 232 268 
             C228 292, 215 316, 200 316 
             C185 316, 172 292, 168 268 
             C166 256, 164 242, 162 224 
             C174 205, 186 186, 190 174 
             Z"
          fill={yemColor}
          stroke={darkOutline}
          strokeWidth="1.3"
        />

        {/* Golden Silk Piping Along Collar (Viền Cổ Áo Yếm Chỉ Vàng) */}
        <path
          d="M190 174 C195 172, 205 172, 210 174"
          stroke="#D4AF37"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Satin Sheen Light Reflections (Độ bóng lụa satin mềm mại) */}
        <path
          d="M192 186 Q200 190 208 186"
          stroke={highlightStroke}
          strokeWidth="1.4"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M180 232 C188 244, 212 244, 220 232"
          stroke={highlightStroke}
          strokeWidth="1.1"
          fill="none"
          opacity="0.65"
        />

        {/* Soft Princess Seam Darts (Đường chiết eo lụa mềm mại, không gọng kim loại) */}
        <path d="M190 220 C190 245, 192 270, 194 295" stroke={deepShadowStroke} strokeWidth="0.9" fill="none" opacity="0.55" />
        <path d="M210 220 C210 245, 208 270, 206 295" stroke={deepShadowStroke} strokeWidth="0.9" fill="none" opacity="0.55" />

        {/* Central Golden Lotus Embroidered Medallion (Họa tiết hoa sen thêu chỉ kim tuyến giữa ngực) */}
        <g className="yem-lotus-embroidery" opacity="0.9">
          <circle cx="200" cy="198" r="2.4" fill="#D4AF37" />
          <path
            d="M196 202 C198 195, 202 195, 204 202 C202 205, 198 205, 196 202 Z"
            fill="#FFF275"
          />
          <path d="M194 204 C195 200, 198 200, 199 204 Z" fill="#E2B744" />
          <path d="M206 204 C205 200, 202 200, 201 204 Z" fill="#E2B744" />
        </g>

        {/* Lotus Petal Hem Border Line (Đường viền vạt cánh sen) */}
        <path
          d="M170 270 C174 292, 186 314, 200 314 C214 314, 226 292, 230 270"
          stroke={deepShadowStroke}
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
      </g>
    );
  }

  // ===================== 10. ÁO BABY TEE Y2K (CROP TOP CỔ TRÒN GEN Z) =====================
  if (activeType === 'baby_tee' || itemId === 'garment_baby_tee') {
    const teeColor = colorHex || '#FF758F';
    const ringerTrimColor = '#FFFFFF';

    return (
      <g className="garment-baby-tee">
        {/* Snug Cap Sleeves (Tay Cộc Ngắn Ôm Sát Bắp Tay) */}
        {/* Left Cap Sleeve */}
        <path
          d="M188 168 
             L148 180 
             C143 194, 142 206, 144 218 
             L158 222 
             L160 218 
             Z"
          fill={teeColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Left Sport Ringer Cuff Binding (Viền Bo Gấu Tay) */}
        <line x1="144" y1="218" x2="158" y2="222" stroke={ringerTrimColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="144" y1="218" x2="158" y2="222" stroke={darkOutline} strokeWidth="0.8" strokeLinecap="round" />

        {/* Right Cap Sleeve */}
        <path
          d="M212 168 
             L252 180 
             C257 194, 258 206, 256 218 
             L242 222 
             L240 218 
             Z"
          fill={teeColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Right Sport Ringer Cuff Binding */}
        <line x1="256" y1="218" x2="242" y2="222" stroke={ringerTrimColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="256" y1="218" x2="242" y2="222" stroke={darkOutline} strokeWidth="0.8" strokeLinecap="round" />

        {/* Cropped Body (Phom Áo Thun Lửng Ôm Sát Ngang Rốn Y=275) */}
        <path
          d="M188 168 
             L212 168 
             L240 218 
             C236 236, 233 255, 231 275 
             C211 278, 189 278, 169 275 
             C167 255, 164 236, 160 218 
             Z"
          fill={teeColor}
          stroke={darkOutline}
          strokeWidth="1.3"
        />

        {/* Sporty Ringer Crewneck Ribbed Collar (Cổ Tròn Bo Viền Thể Thao Gen Z) */}
        <path
          d="M187 167 C191 182, 209 182, 213 167"
          stroke={ringerTrimColor}
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M187 167 C191 182, 209 182, 213 167"
          stroke={darkOutline}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* Y2K Cyber Star & Sparkle Graphic (Họa Tiết Y2K Đương Đại) */}
        <g className="baby-tee-graphic" opacity="0.95">
          <path
            d="M200 214 Q200 220 206 220 Q200 220 200 226 Q200 220 194 220 Q200 220 200 214 Z"
            fill="#FFFFFF"
          />
          <circle cx="209" cy="216" r="1.1" fill="#FFFFFF" />
          <circle cx="192" cy="224" r="1.1" fill="#FFFFFF" />
        </g>

        {/* Twin-needle Cropped Hem Stitch (Đường May Đôi Gấu Áo Lửng) */}
        <path
          d="M170 273 Q200 276 230 273"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.9"
          strokeDasharray="3 2"
          fill="none"
        />
        <line x1="169" y1="275" x2="231" y2="275" stroke={darkOutline} strokeWidth="1.1" />

        {/* Subtle Side Torso Creases */}
        <path d="M162 232 Q166 238 165 248" stroke={deepShadowStroke} strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M238 232 Q234 238 235 248" stroke={deepShadowStroke} strokeWidth="0.8" fill="none" opacity="0.5" />
      </g>
    );
  }

  // ===================== 11. ÁO TANKTOP GÂN CỔ YẾM (RACERBACK / HALTER TANK) =====================
  if (activeType === 'tanktop' || itemId === 'garment_tanktop_yem') {
    const tankColor = colorHex || '#FAF0CA';
    const ribStroke = 'rgba(70, 50, 20, 0.22)';

    return (
      <g className="garment-tanktop-yem">
        {/* Sleeveless Racerback Cutout Bodice (Khoét Sâu Vai Để Lộ Bờ Vai & Cánh Tay) */}
        <path
          d="M189 168 
             L191 160 
             C195 156, 205 156, 209 160 
             L211 168 
             C219 184, 226 204, 238 222 
             C235 245, 232 278, 230 312 
             C210 316, 190 316, 170 312 
             C168 278, 165 245, 162 222 
             C174 204, 181 184, 189 168 
             Z"
          fill={tankColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* High Halter Ribbed Neckband (Cổ Yếm Cao Bo Gân) */}
        <path
          d="M191 160 C195 156, 205 156, 209 160 L211 168 C205 172, 195 172, 189 168 Z"
          fill={tankColor}
          stroke={darkOutline}
          strokeWidth="1.1"
        />
        <line x1="195" y1="159" x2="195" y2="169" stroke={ribStroke} strokeWidth="0.8" />
        <line x1="200" y1="158" x2="200" y2="170" stroke={ribStroke} strokeWidth="0.8" />
        <line x1="205" y1="159" x2="205" y2="169" stroke={ribStroke} strokeWidth="0.8" />

        {/* Deep Armhole Binding Edges (Đường Viền Bo Khoét Nách Sâu Thể Thao) */}
        <path
          d="M189 168 C181 184, 174 204, 162 222"
          stroke={darkOutline}
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M211 168 C219 184, 226 204, 238 222"
          stroke={darkOutline}
          strokeWidth="1.2"
          fill="none"
        />

        {/* Vertical Rib Knit Texture (Họa Tiết Gân Tăm Dọc Thân Áo Co Giãn) */}
        <line x1="184" y1="196" x2="183" y2="311" stroke={ribStroke} strokeWidth="0.85" />
        <line x1="188" y1="178" x2="187" y2="312" stroke={ribStroke} strokeWidth="0.85" />
        <line x1="192" y1="172" x2="191" y2="313" stroke={ribStroke} strokeWidth="0.85" />
        <line x1="196" y1="171" x2="196" y2="314" stroke={ribStroke} strokeWidth="0.85" />
        <line x1="200" y1="171" x2="200" y2="315" stroke={ribStroke} strokeWidth="0.85" />
        <line x1="204" y1="171" x2="204" y2="314" stroke={ribStroke} strokeWidth="0.85" />
        <line x1="208" y1="172" x2="209" y2="313" stroke={ribStroke} strokeWidth="0.85" />
        <line x1="212" y1="178" x2="213" y2="312" stroke={ribStroke} strokeWidth="0.85" />
        <line x1="216" y1="196" x2="217" y2="311" stroke={ribStroke} strokeWidth="0.85" />

        {/* Soft Center Highlight for Rib Volume */}
        <path
          d="M198 174 L198 314 L202 314 L202 174 Z"
          fill="rgba(255,255,255,0.22)"
        />

        {/* Curved Hem Line */}
        <path
          d="M170 312 Q200 316 230 312"
          stroke={darkOutline}
          strokeWidth="1.2"
          fill="none"
        />
      </g>
    );
  }

  // ===================== 12. ÁO SƠ MI CUBAN SHIRT RETRO (CAMP COLLAR) =====================
  if (activeType === 'cuban_shirt' || itemId === 'garment_cuban_shirt') {
    const shirtColor = colorHex || '#0D3B66';
    const accentPrintColor = '#FAF0CA';

    return (
      <g className="garment-cuban-shirt">
        {/* Mid-Bicep Relaxed Sleeves (Tay Áo Lửng Rộng Ngang Bắp Tay) */}
        {/* Left Sleeve */}
        <path
          d="M188 166 
             L144 176 
             C139 196, 137 224, 136 250 
             L154 254 
             L152 222 
             Z"
          fill={shirtColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Left Sleeve Cuff Hem Stitch */}
        <line x1="136" y1="250" x2="154" y2="254" stroke={darkOutline} strokeWidth="1.2" />
        <line x1="137" y1="246" x2="153" y2="250" stroke={deepShadowStroke} strokeWidth="0.8" strokeDasharray="3 2" />

        {/* Right Sleeve */}
        <path
          d="M212 166 
             L256 176 
             C261 196, 263 224, 264 250 
             L246 254 
             L248 222 
             Z"
          fill={shirtColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Right Sleeve Cuff Hem Stitch */}
        <line x1="264" y1="250" x2="246" y2="254" stroke={darkOutline} strokeWidth="1.2" />
        <line x1="263" y1="246" x2="247" y2="250" stroke={deepShadowStroke} strokeWidth="0.8" strokeDasharray="3 2" />

        {/* Relaxed Boxy Bodice (Phom Áo Suông Thẳng Rộng Rãi Ngang Đùi Trên Y=334) */}
        <path
          d="M188 166 
             L212 166 
             L248 222 
             L246 334 
             L154 334 
             L152 222 
             Z"
          fill={shirtColor}
          stroke={darkOutline}
          strokeWidth="1.3"
        />

        {/* Curved Armhole / Underarm Seams following bicep anatomy (Đường may nách áo cong mềm mại theo bắp tay) */}
        <path
          d="M144 176 C152 192, 154 208, 152 222"
          stroke={darkOutline}
          strokeWidth="1.1"
          strokeDasharray="3 1.5"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M152 222 C154 235, 156 248, 154 260"
          stroke={deepShadowStroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M256 176 C248 192, 246 208, 248 222"
          stroke={darkOutline}
          strokeWidth="1.1"
          strokeDasharray="3 1.5"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M248 222 C246 235, 244 248, 246 260"
          stroke={deepShadowStroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Retro Heritage Floral Pattern Accents (Họa Tiết Gốm Lam Đương Đại) */}
        <g className="cuban-retro-pattern" opacity="0.45">
          <circle cx="225" cy="245" r="7" stroke={accentPrintColor} strokeWidth="0.9" fill="none" />
          <path d="M225 240 L225 250 M220 245 L230 245" stroke={accentPrintColor} strokeWidth="0.8" />
          <circle cx="175" cy="300" r="7" stroke={accentPrintColor} strokeWidth="0.9" fill="none" />
          <path d="M175 295 L175 305 M170 300 L180 300" stroke={accentPrintColor} strokeWidth="0.8" />
        </g>

        {/* Chest Patch Pocket (Túi Ngực Đắp Nổi Bên Trái) */}
        <path
          d="M168 228 L188 228 L188 250 L168 250 Z"
          fill={shirtColor}
          stroke={darkOutline}
          strokeWidth="1"
        />
        <line x1="168" y1="232" x2="188" y2="232" stroke={highlightStroke} strokeWidth="1" />

        {/* Camp Collar (Cổ Áo Bẻ Chữ V Mở Rộng Y=168..200 Để Lộ Khoảng Cổ Tự Nhiên) */}
        {/* Darker Inner Collar Facing & Hollow (Vạt lót cổ trong màu sẫm tạo chiều sâu lập thể) */}
        <path
          d="M192 168 L200 200 L208 168 Z"
          fill="rgba(0,0,0,0.42)"
        />
        <path
          d="M194 168 L200 196 L206 168 Z"
          fill="#061B30"
          opacity="0.75"
        />

        {/* Left Lapel (Ve Cổ Trái Bẻ Chữ V Rộng) */}
        <path
          d="M192 168 
             L174 188 
             L182 192 
             L196 200 
             L196 176 
             Z"
          fill={shirtColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Right Lapel (Ve Cổ Phải Bẻ Chữ V Rộng) */}
        <path
          d="M208 168 
             L226 188 
             L218 192 
             L204 200 
             L204 176 
             Z"
          fill={shirtColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Back Collar Fold Band (Chân gáy cổ bẻ nằm phẳng) */}
        <path
          d="M192 168 Q200 164 208 168"
          stroke={darkOutline}
          strokeWidth="1.4"
          fill="none"
        />

        {/* Center Button Placket (Nẹp Cúc Áo Dọc Thân Từ Y=200 Đến Y=334) */}
        <line x1="200" y1="200" x2="200" y2="334" stroke={darkOutline} strokeWidth="1.3" />
        <line x1="203" y1="200" x2="203" y2="334" stroke={deepShadowStroke} strokeWidth="0.8" strokeDasharray="4 2" />

        {/* 5 Retro Buttons (Hàng Cúc Tròn Retro Đều Đặn) */}
        {[214, 240, 266, 292, 318].map((btnY) => (
          <g key={btnY}>
            <circle cx="200" cy={btnY} r="2.4" fill="#E9ECEF" stroke={darkOutline} strokeWidth="0.8" />
            <circle cx="200" cy={btnY} r="0.7" fill="#6C757D" />
          </g>
        ))}

        {/* Straight Hem with Side Slits */}
        <line x1="154" y1="334" x2="246" y2="334" stroke={darkOutline} strokeWidth="1.3" />
        <path d="M154 326 L154 334" stroke={darkOutline} strokeWidth="1.2" />
        <path d="M246 326 L246 334" stroke={darkOutline} strokeWidth="1.2" />
      </g>
    );
  }


  // ===================== 14. THIẾT KẾ ÁO FALLBACK THÔNG MINH =====================
  // (Áo Thun Cổ Tròn / Minimal Top Hiện Đại Phom Vai Trễ Tự Nhiên)
  return (
    <g className="garment-fallback-modern">
      {/* Drop-Shoulder Relaxed Sleeves (Vai Trễ Tự Nhiên) */}
      {/* Left Sleeve */}
      <path
        d="M188 168 L138 184 C134 206, 132 228, 130 250 L152 255 L150 222 Z"
        fill={colorHex}
        stroke={darkOutline}
        strokeWidth="1.2"
      />
      <line x1="130" y1="250" x2="152" y2="255" stroke={darkOutline} strokeWidth="1.2" />

      {/* Right Sleeve */}
      <path
        d="M212 168 L262 184 C266 206, 268 228, 270 250 L248 255 L250 222 Z"
        fill={colorHex}
        stroke={darkOutline}
        strokeWidth="1.2"
      />
      <line x1="270" y1="250" x2="248" y2="255" stroke={darkOutline} strokeWidth="1.2" />

      {/* Boxy Bodice */}
      <path
        d="M188 168 L212 168 L250 222 L246 326 L154 326 L150 222 Z"
        fill={colorHex}
        stroke={darkOutline}
        strokeWidth="1.2"
      />

      {/* Armpit drape creases */}
      <path d="M150 222 C154 234, 156 246, 154 258" stroke={deepShadowStroke} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M250 222 C246 234, 244 246, 246 258" stroke={deepShadowStroke} strokeWidth="1.6" strokeLinecap="round" fill="none" />

      {/* Clean Crewneck Ribbed Collar hugging at Y=168 */}
      <path
        d="M188 168 C192 178, 208 178, 212 168 C208 164, 192 164, 188 168 Z"
        fill={colorHex}
        stroke={darkOutline}
        strokeWidth="1.2"
      />
      <path d="M189 169 Q200 178 211 169" stroke={darkOutline} strokeWidth="0.9" fill="none" />

      {/* Subtle Hem Line */}
      <line x1="154" y1="322" x2="246" y2="322" stroke={deepShadowStroke} strokeWidth="0.8" />
    </g>
  );
};
